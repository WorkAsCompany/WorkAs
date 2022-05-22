"use strict";
import { Calendario } from "./calendario.js";

import * as Plantilla from "../bibliotecas/plantilla.js";
import * as General from "../bibliotecas/general.js";

import { onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

/*  --- BIBLIOTECA WORKAS ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con nuestra aplicación principal.
var doc = document;
var opAside;

var arrayEmpleados = [];
var empleadoEnEdicion;

var chatSlc = "";

class Workas extends Calendario {
    constructor() {
        super();
    }

    colapsarAside(btn) {
        if (btn.classList.contains("asideNoCollapse")) {
            btn.classList.add("asideCollapse");
            btn.classList.remove("asideNoCollapse");
            doc.getElementById("contenido").classList.add("noColapsarContenido");
            doc.getElementById("contenido").classList.remove("colapsarContenido");
            for (let i = 0; i < doc.getElementById("asidePrincipal").getElementsByClassName("ocultarElAside").length; i++) {
                doc.getElementById("asidePrincipal").getElementsByClassName("ocultarElAside")[i].classList.add("ocultarAsideClic");
                doc.getElementById("asidePrincipal").getElementsByClassName("ocultarElAside")[i].classList.remove("ocultarAsideHover");
            }
        } else {
            btn.classList.add("asideNoCollapse");
            btn.classList.remove("asideCollapse");
            doc.getElementById("contenido").classList.add("colapsarContenido");
            doc.getElementById("contenido").classList.remove("noColapsarContenido");
            for (let i = 0; i < doc.getElementById("asidePrincipal").getElementsByClassName("ocultarElAside").length; i++) {
                doc.getElementById("asidePrincipal").getElementsByClassName("ocultarElAside")[i].classList.remove("ocultarAsideClic");
                doc.getElementById("asidePrincipal").getElementsByClassName("ocultarElAside")[i].classList.add("ocultarAsideHover");
            }
        }
    }

    asignarEvColapsarAside() {
        var btnColapsar = doc.getElementById("btnColapsarAside");
            btnColapsar.addEventListener(
                "click",
                (e) => {
                    this.colapsarAside(e.target);
                },
                false
            );
    }

    //Recoge los datos del formulario y si son correctos crea un nuevo empleado y lo añade a la empresa correspondiente.
    opAnyadirEmpleado = async() => {
        var div = doc.getElementById("divPrincipalTabla");
        var alert, chat, arrayAnyadirChat = [];

        var dni = doc.getElementById("txtDni").value.trim();
        var nombre = doc.getElementById("txtNombre").value.trim();
        var apellidos = doc.getElementById("txtApellidos").value.trim();
        var correo = doc.getElementById("txtEmail").value.trim();
        var puestoTrabajo = doc.getElementById("txtPuestoTrabajo").value.trim();
        var turno = doc.getElementById("turnoJornada").value;
        var codEmpleado = this.generarCodEmpleado();

        if (this.comprobarCorreo(correo) && this.comprobarDni(dni) && this.comprobarRazSocial(nombre) && this.comprobarRazSocial(apellidos) && this.comprobarRazSocial(puestoTrabajo) && turno !== "noSelec") {
            var empleado = {
                id: "",
                idEmpresa: this.getUsu().id,
                dni: dni,
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                puestoTrabajo: puestoTrabajo,
                turno: turno,
                codEmpleado: codEmpleado,
                iconoPerfil: "",
                conectado: false,
                chatSlc: "",
                statusChat: null,
                tipoUsu: "empleado"
            }

            var existeEmpleado = await this.devolverConsultaFiltrarEmpleadoCorreo(empleado.correo);

            if (existeEmpleado.docs.length > 0) {
                alert = General.crearAlert("Error, ya existe el empleado.", "errorAlert");
                div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));

            } else {
                alert = General.crearAlert("Empleado creado correctamente.", "exitoAlert");
                doc.getElementById("formCrearEmpleado").reset();

                var usuAnyadido = await this.anyadirEmpleado(empleado);
                var arrayEmpleados = await this.devolverEmpleadosEmpresa(this.getUsu().id);

                chat = {
                    arrayUsuariosChat: [this.getUsu().id, usuAnyadido.id],
                    tipoConver: "privado",
                    conversacion: null,
                    nMsgSinLeer: 0,
                    capacidadGrupo: 2,
                    nombreGrupo: "",
                    imgGrupo: "",
                    infoGrupo: "",
                    pinGrupo: null,
                    idEmpresa: this.getUsu().id,
                    fLastMsg: null
                }
                arrayAnyadirChat += this.anyadirChat(chat);

                arrayEmpleados.docs.map((empleado) => {

                    if(empleado.id !== usuAnyadido.id) {
                        chat = {
                            arrayUsuariosChat: [empleado.id, usuAnyadido.id],
                            tipoConver: "privado",
                            conversacion: null,
                            nMsgSinLeer: 0,
                            capacidadGrupo: 2,
                            nombreGrupo: "",
                            imgGrupo: "",
                            infoGrupo: "",
                            pinGrupo: null,
                            idEmpresa: this.getUsu().id,
                            fLastMsg: null
                        }
    
                        arrayAnyadirChat += this.anyadirChat(chat);
                    }
                });

                await Promise.all(arrayAnyadirChat);
                this.opListarEmpleados();
                div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));            }
        } else {
            alert = General.crearAlert("Error en la introducción de datos.", "errorAlert");
            div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));
        }   
    }

    //Asigna el evento de crear usuario al botón del formulario.
    asignarEvAnyadirEmpleado() {
        var btn = doc.getElementById("btnCrearEmpleado");
        btn.addEventListener(
            "click",
            (e) => {

                if(doc.getElementById("divPrincipalTabla") == null) {
                    var divTabla = doc.createElement("div")
                    divTabla.id = "divPrincipalTabla";
                    doc.getElementById("divPrincipalRotarTurno").remove();
                    doc.getElementById("principal").appendChild(divTabla);
                    this.opListarEmpleados();
                }

                this.opAnyadirEmpleado();
            },
            false
        );
    }

    //Lista los empleados de una empresa en una tabla, con funciones de modificar y eliminar a este.
    opListarEmpleados = async() => {
        var div = doc.getElementById("divPrincipalTabla");
        div.innerHTML = "<h2 id='tituloListEmpleado'>Listado de Empleados</h2><hr>";

        var filas = "";
        var empleados = await this.devolverEmpleadosEmpresa(this.getUsu().id);
        arrayEmpleados = empleados.docs;

        if (arrayEmpleados.length > 0) {
            arrayEmpleados.map((empleado) => {
                filas += `${Plantilla.crearFilaDatosEmpleado(empleado)}`;
            });

            div.innerHTML += `<table id="tablaEmpleados" class="display animate__animated animate__fadeIn animate__slow" style="width:100%">
                                <thead class="cabeceraTabla">
                                    <tr>
                                        <th class="celda">Perfil</th>
                                        <th class="celda">DNI</th>
                                        <th class="celda">Apellidos</th>
                                        <th class="celda">Nombre</th>
                                        <th class="celda">Correo</th>
                                        <th class="celda">Puesto Trabajo</th>
                                        <th class="celda">Turno</th>
                                        <th class="celda"></th>
                                    </tr>
                                </thead>
                                <tbody>${filas}</tbody>
                               </table>`;
        } else {
            div.innerHTML = `<p class="mensajeInfo">No hay empleados añadidos todavía.</p>`;
        } 

        //Realizará la tabla con dataTables
        /*$(doc).ready(function() {
            $('#tablaEmpleados').DataTable({
                responsive: true
            });
        } ); */
        $(doc).ready(function() {    
            $('#tablaEmpleados').DataTable({
                responsive: true,
                retrieve: true,
                columnDefs: [
                    { responsivePriority: 1, targets: 0 },
                    { responsivePriority: 2, targets: -1 }
                ],
                "language": {
                        "lengthMenu": "Mostrar _MENU_ registros",
                        "zeroRecords": "No se encontraron resultados",
                        "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sSearch": "Buscar:",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast":"Último",
                            "sNext":"Siguiente",
                            "sPrevious": "Anterior"
                         },
                         "sProcessing":"Procesando...",
                    }
            });     
        });

        this.asignarEvOpBorrarEmpleado();
        this.asignarBtnEvEditarEmpleado();
    }

    //Elimina a un empleado de la bd y vuelve a listar a los empleados.
    quitarEmpleado = async(btn) => {
        //var divEmpleado = btn.parentNode.parentNode.parentNode;
        var div = doc.getElementById("divPrincipalTabla");
        div.innerHTML = "";
        var alert;

        var empleado = await this.devolverEmpleado(btn.parentNode.parentNode.id)
        await this.eliminarEmpleadoEmpresa(btn.parentNode.parentNode.id);
        
        this.opListarEmpleados();
        alert = General.crearAlert(`El empleado ${empleado.data().nombre} ${empleado.data().apellidos} se ha eliminado correctamente.`, "exitoAlert");
        div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));
    }

    //Asigna el evento de borrar un empleado a los botones de elimiar.
    asignarEvOpBorrarEmpleado() {
        var btnBorrar = doc.getElementsByClassName("btnEliminar");

        for (let i = 0; i < btnBorrar.length; i++) {
            btnBorrar[i].addEventListener(
                "click",
                (e) => {
                    this.quitarEmpleado(e.target);
                },
                false
            );
        }
    }

    //Permite editar los datos de un empleado con inputs en el modal.
    editarEmpleado() {

        doc.getElementById("txtEditarDni").value = empleadoEnEdicion.data().dni;
        doc.getElementById("txtEditarNombre").value = empleadoEnEdicion.data().nombre;
        doc.getElementById("txtEditarApellidos").value = empleadoEnEdicion.data().apellidos;
        doc.getElementById("txtEditarEmail").value = empleadoEnEdicion.data().correo;
        doc.getElementById("txtEditarPuestoTrabajo").value = empleadoEnEdicion.data().puestoTrabajo;

        for (let i = 0; i < doc.getElementById("turnoEditarJornada").getElementsByTagName("option").length; i++) {

            if(doc.getElementById("turnoEditarJornada").getElementsByTagName("option")[i].value === empleadoEnEdicion.data().turno) {
                doc.getElementById("turnoEditarJornada").options.item(i).selected = 'selected'
            }
        }
    }

    //Permite confirmar los cambios de la edición del empleado y añadirlos a la bd, cogiendo los valores de los inputs del modal.
    terminarEditarEmpleado = async() => {
        var div = doc.getElementById("divPrincipalTabla");
        var alert;

        var dni = doc.getElementById("txtEditarDni").value.trim();
        var nombre = doc.getElementById("txtEditarNombre").value.trim();
        var apellidos = doc.getElementById("txtEditarApellidos").value.trim();
        var puestoTrabajo = doc.getElementById("txtEditarPuestoTrabajo").value.trim();
        var turno = doc.getElementById("turnoEditarJornada").value;

        if (this.comprobarDni(dni) && this.comprobarRazSocial(nombre) && this.comprobarRazSocial(apellidos) && this.comprobarRazSocial(puestoTrabajo) && turno !== "noSelec") {
            var empleadoMod = {
                dni: dni,
                nombre: nombre,
                apellidos: apellidos,
                puestoTrabajo: puestoTrabajo,
                turno: turno
            }

            var resultado = await this.actualizarEmpleado( empleadoEnEdicion.id, empleadoMod);

            this.opListarEmpleados();

            alert = General.crearAlert(`El empleado ${nombre} ${apellidos} se ha modificado correctamente.`, "exitoAlert");
            div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));

        } else {
            alert = General.crearAlert(`El empleado ${empleadoEnEdicion.data().nombre} ${empleadoEnEdicion.data().apellidos} no se ha modificado correctamente.`, "errorAlert");
            div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));

        }
    }

    //Asigna el evento guardar la edición de los datos del empleado en la bd.
    asignarBtnEvTerminarEditarEmpleado() {
        var btnEditar = doc.getElementById("btnEditarEmpleado");

        btnEditar.addEventListener(
            "click",
            (e) => {
                this.terminarEditarEmpleado();
            },
            false
        );
        
    }

    //Asigna el evento de editar un empleado.
    asignarBtnEvEditarEmpleado() {
        var btnEditar = doc.getElementById("divPrincipalTabla").getElementsByClassName("btnEditar");
        for (let i = 0; i < btnEditar.length; i++) {
            btnEditar[i].addEventListener(
                "click",
                (e) => {

                    empleadoEnEdicion = arrayEmpleados[i];
                    this.editarEmpleado();
                },
                false
            );
        }
    }

    //Añadirá al DOM un div con información del empleado que ha iniciado sesión.
    mostrarDatosEmpleado = async() => {
        var empleado = await this.devolverEmpleado(this.getUsu().id);
        var divIconoEmpleado = doc.getElementById("iconoPerfil");
        divIconoEmpleado.innerHTML += Plantilla.crearDivInfoDatosEmpleado(empleado);
    }

    //Añadirá al DOM un div con información de la empresa que ha iniciado sesión.
    mostrarDatosEmpresa = async() => {
        var empresa = await this.devolverEmpresa(this.getUsu().id);
        var divIconoEmpresa = doc.getElementById("iconoPerfil");
        divIconoEmpresa.innerHTML += Plantilla.crearDivInfoDatosEmpresa(empresa);
    }

    administrarEmpleados() {
        doc.getElementById("principal").innerHTML = `<div id="divPrincipalTabla"></div>`;
        doc.getElementById("principal").innerHTML += `<div id="divModales"></div>`;

        doc.getElementById("divModales").innerHTML += Plantilla.devolverCrearEmpleadoForm();
        doc.getElementById("divModales").innerHTML += Plantilla.devolverEditarEmpleadoForm();

        this.opListarEmpleados();
        this.asignarBtnEvTerminarEditarEmpleado();
        this.asignarEvAnyadirEmpleado();
    }

    asignarEvAdministrarEmpleados() {
        var btn = doc.getElementById("asideAdministrarEmpleado");
        btn.addEventListener(
            "click",
            (e) => {
                this.administrarEmpleados();
            },
            false
        );
    }

    modificarPaginaOpNavEmpleados() {
        opAside.innerHTML = Plantilla.crearOpAsideNavEmpleados();

        this.asignarEvAdministrarEmpleados();
        this.administrarEmpleados();
        this.asignarEvRotarEmpleados();
    }

    //Modifica el icono de perfil del usuario.
    modificarPaginaOpNavIconoPerfil = async(tipoUsuario) => {
        opAside.innerHTML = Plantilla.crearOpAsideNavPerfil();

        if(tipoUsuario === "empresa") {
            var empresa = await this.devolverEmpresa(this.getUsu().id);
            var imgPerfil = (empresa.data().iconoPerfil === "") ? "./img/empresaIcono.png" : empresa.data().iconoPerfil;
            var nEmpleados = await this.devolverEmpleadosEmpresa(this.getUsu().id);
            doc.getElementById("principal").innerHTML = Plantilla.crearDivInfoDatosEmpresa(await this.devolverEmpresa(this.getUsu().id), imgPerfil, nEmpleados.docs.length);


        } else if(tipoUsuario === "empleado") {
            var empleado = await this.devolverEmpleado(this.getUsu().id);
            var empleadoEmpresa = await this.devolverEmpresa(empleado.data().idEmpresa);
            var imgPerfil = (empleado.data().iconoPerfil === "") ? "./img/empleadoIcono.png" : empleado.data().iconoPerfil;
            doc.getElementById("principal").innerHTML = Plantilla.crearDivInfoDatosEmpleado(await this.devolverEmpleado(this.getUsu().id), imgPerfil, empleadoEmpresa);

        }

        doc.getElementById("btnActualizarImgPerfil").addEventListener(
            "click",
            async(e) => {
                var file = ($('#inputAnyadirImg'))[0].files[0];
                var nombreImg = `${this.getUsu().id}.${file.name.substr( (file.name.lastIndexOf(".")+1 - file.name.length) )}`;

                await this.subirImgBD(`iconosPerfil/${nombreImg}`, file);

                var ruta = await this.descargarImgBD(`iconosPerfil/${nombreImg}`);

                await this.actualizarImgPerfil(this.getUsu().id, ruta, tipoUsuario);

                for (let i = 0; i < document.getElementsByClassName("imgIconoPerfil").length; i++) {
                    document.getElementsByClassName("imgIconoPerfil")[i].src = ruta;
                }
            },
            false
        );
    }

    modificarPaginaOpNavTablonAnuncio(tipoUsu) {
        opAside.innerHTML = Plantilla.crearOpAsideNavTablonAnuncio(tipoUsu);

        if(tipoUsu === "empresa") {
            this.asignarEvDivCrearAnuncio();
            this.asignarEvMostrarEstadisticasTablones();
        }

        this.asignarEvMostrarTablonAnuncio(tipoUsu);
        this.mostrarTablonAnuncio(tipoUsu);

    }

    modificarPaginaOpNavCalendario(tipoUsu) {
        opAside.innerHTML = Plantilla.crearOpAsideNavCalendario(tipoUsu);
        this.mostrarDivCalendario(tipoUsu)

        if(tipoUsu === "empresa") {
            this.asignarEvAnyadirFestivo();

        } else {
            this.asignarEvBtnSolicitarDias();

        }

    }

    //Muestra la página principal con todas las funciones correspondientes si se ha iniciado sesión como empresa.
    crearPaginaInicialWorkasEmpresa = async() => {
        var iconoPerfil = doc.getElementsByClassName("imgIconoPerfil");
        var empresa = await this.devolverEmpresa(this.getUsu().id);
        await this.actualizarEstadoConectado(empresa.id, true, "empresa")

        var imgPerfil = (empresa.data().iconoPerfil === "") ? "./img/empresaIcono.png" : empresa.data().iconoPerfil;

        if(doc.getElementById("contenidoFormulario") != null) {
            doc.getElementById("contenidoFormulario").id = "contenido";
        }
        doc.getElementById("contenido").classList.add("colapsarContenido");
        doc.getElementById("contenido").innerHTML = Plantilla.crearPaginaInicialEmpresa(empresa, imgPerfil);
        opAside = doc.getElementById("asideOpciones");

        var divChat = doc.getElementById("btnChat");

        //this.mostrarDatosEmpresa();
        this.modificarPaginaOpNavEmpleados();
        this.asignarEvColapsarAside();
        this.chatMostrarMsgChat();
        
        doc.getElementById("opNavEmpleados").addEventListener(
            "click",
            (e) => {
                divChat.classList.remove("ocultar");
                this.modificarPaginaOpNavEmpleados();
            },
            false
        );

        doc.getElementById("opNavTablon").addEventListener(
            "click",
            (e) => {
                divChat.classList.remove("ocultar");
                this.modificarPaginaOpNavTablonAnuncio("empresa");
            },
            false
        );

        doc.getElementById("opNavCalendario").addEventListener(
            "click",
            (e) => {
                divChat.classList.remove("ocultar");
                this.modificarPaginaOpNavCalendario("empresa");
            },
            false
        );

        doc.getElementById("btnChat").addEventListener(
            "click",
            async(e) => {
                divChat.classList.add("ocultar");
                this.modificarPaginaOpNavChat("empresa");
            },
            false
        );

        doc.getElementById("opNavLogout").addEventListener(
            "click",
            async(e) => {
                this.cerrarSesion();
                await this.actualizarEstadoConectado(empresa.id, false, "empresa");
            },
            false
        );

        window.addEventListener(
            "beforeunload", 
            async(e) => {
                await this.actualizarEstadoConectado(empresa.id, false, "empresa");
            },
            false
        );

        for (let i = 0; i < iconoPerfil.length; i++) {
            iconoPerfil[i].addEventListener(
                "click",
                async(e) => {
                    await this.modificarPaginaOpNavIconoPerfil("empresa");
                },
                false
            );
        }


        /*//Añade las funciones a los elementos de menú de empleado.
        var opcionTablonAnuncio = doc.getElementsByClassName("listOpcionesTablonAnuncio");
        var opPerfil = doc.getElementById("iconoPerfil");
        var opCalendario = doc.getElementById("enlCalendario");
        for (let i = 0; i < opcionEmpleados.length; i++) {
            if (opcionEmpleados[i].id === "listAnyadirEmp") {
                this.asignarEvOpAnyadirEmpleado(opcionEmpleados[i]);
            } else if (opcionEmpleados[i].id === "listListarEmp") {
                this.asignarEvOpListarEmpleados(opcionEmpleados[i]);
            }
        }

        //Añade las funciones a los elementos de menú de tablón de anuncio.
        for (let i = 0; i < opcionTablonAnuncio.length; i++) {
            if (opcionTablonAnuncio[i].id === "listCrearTablonAnuncio") {
                this.asignarEvOpCrearTablonAnuncio(opcionTablonAnuncio[i]);
            } else if (opcionTablonAnuncio[i].id === "listListarTablonAnuncio") {
                this.asignarEvOpListarTablonAnuncio(opcionTablonAnuncio[i]);
            }
        }

        opCalendario.addEventListener(
            "click",
            () => {
                var calendario = doc.createElement("div");
                calendario.setAttribute("id", "calendarioFestivos");
                calendario.innerHTML = Plantilla.crearDivCalendarioInfo();
                calendario.innerHTML += Plantilla.crearDivCalendarioGeneral();
                doc.getElementById("principal").innerHTML = "<h2 id='tituloCal'>Calendario de Días Festivos</h2>";
                doc.getElementById("principal").appendChild(calendario);
                Calendario.evMeses();
            },
            false
        );

        opPerfil.addEventListener(
            "mouseover",
            (e) => {
                doc.getElementById("iconoPerfil").getElementsByClassName("infoPerfil")[0].classList.remove("ocultar");
            },
            false
        );

        opPerfil.addEventListener(
            "mouseout",
            (e) => {
                doc.getElementById("iconoPerfil").getElementsByClassName("infoPerfil")[0].classList.add("ocultar");
            },
            false
        );*/
    }

    crearPaginaInicialWorkasEmpleado = async() => {
        var iconoPerfil = doc.getElementsByClassName("imgIconoPerfil");
        var empleado = await this.devolverEmpleado(this.getUsu().id);
        await this.actualizarEstadoConectado(empleado.id, true, "empleado");

        var imgPerfil = (empleado.data().iconoPerfil === "") ? "./img/empleadoIcono.png" : empleado.data().iconoPerfil;

        doc.getElementById("contenidoFormulario").id = "contenido";
        doc.getElementById("contenido").classList.add("colapsarContenido");
        doc.getElementById("contenido").innerHTML = Plantilla.crearPaginaInicialEmpleado(empleado, imgPerfil);
        opAside = doc.getElementById("asideOpciones");

        var divChat = doc.getElementById("btnChat");

        this.asignarEvColapsarAside();
        this.mostrarToastAnuncioNuevo();
        this.modificarPaginaOpNavTablonAnuncio("empleado");
        this.chatMostrarMsgChat();

        /*doc.getElementById("").addEventListener(
            "click",
            (e) => {
 
            },
            false
        );*/

        for (let i = 0; i < iconoPerfil.length; i++) {
            iconoPerfil[i].addEventListener(
                "click",
                async(e) => {
                    await this.modificarPaginaOpNavIconoPerfil("empleado");
                },
                false
            );
        }

        doc.getElementById("opNavTablon").addEventListener(
            "click",
            (e) => {
                divChat.classList.remove("ocultar");
                this.modificarPaginaOpNavTablonAnuncio("empleado");
            },
            false
        );

        doc.getElementById("opNavCalendario").addEventListener(
            "click",
            (e) => {
                divChat.classList.remove("ocultar");
                this.modificarPaginaOpNavCalendario("empleado");
            },
            false
        );

        doc.getElementById("btnChat").addEventListener(
            "click",
            async(e) => {
                divChat.classList.add("ocultar");
                this.modificarPaginaOpNavChat("empleado");
            },
            false
        );

        doc.getElementById("opNavLogout").addEventListener(
            "click",
            async(e) => {
                this.cerrarSesion();
                await this.actualizarEstadoConectado(empleado.id, false, "empleado");
            },
            false
        );

        window.addEventListener(
            "beforeunload", 
            async(e) => {
                await this.actualizarEstadoConectado(empleado.id, false, "empleado");
            },
            false
        );
    }






















    mostrarListadoUsuChat = async(tipoUsu) => {
        var conversacion = [
            {
                idUsu: "",
                fecha: new Date(),
                mensaje: ""
            }
        ]

        var pinGrupo = [
            {
                texto: "",
                fPubli: new Date(),
                imgPin: "",
                enlaces: []
            }
        ]

        var status = {
            info: "",
            emoji: ""
        }

    }

    chatMostrarMsgChat = async() => {
        var usuSesion = await this.devolverEmpresa(this.getUsu().id);
        const chats = await onSnapshot(this.devolverEnlace("chat"), (chats) => {
            var nMsg = 0;
            chats.docs.map((chat) => {
                if(chat.data().conversacion != null && chat.data().conversacion.length > 0 && chat.data().arrayUsuariosChat.includes(usuSesion.id) && chat.data().conversacion[chat.data().conversacion.length-1].idUsu != usuSesion.id) {
                    nMsg += chat.data().nMsgSinLeer;
                }
            });
            nMsg = nMsg === 0 ? "0": nMsg < 100 ? `${nMsg}+`: "99+";
            doc.getElementById("btnChat").getElementsByClassName("badge")[0].innerHTML = "";
            doc.getElementById("btnChat").getElementsByClassName("badge")[0].innerHTML = nMsg;

        });
    }

    mostrarMsgConversacion = async(chat, nMsgSinLeer) =>  {
        doc.getElementById("conversacion").innerHTML = "";
        var usuSesion = await this.devolverEmpresa(this.getUsu().id);
        var conver = "";

            if(chatSlc === chat.id && chat.data().conversacion != null) {
                var conversacion = chat.data().conversacion;
                var cambioDia = new Date(0);
                for (let i = 0; i < conversacion.length; i++) {
                    var fechaMsg = new Date(conversacion[i].fecha.seconds * 1000)

                    if(fechaMsg.getDay() !== cambioDia.getDay()) {
                        conver += Plantilla.crearDivMostrarDiaConversacion(fechaMsg);
                        cambioDia = new Date(conversacion[i].fecha.seconds * 1000)
                    }

                    if(nMsgSinLeer !== 0 && nMsgSinLeer === (conversacion.length-i) && chat.data().conversacion[chat.data().conversacion.length-1].idUsu != usuSesion.id) {
                        conver += "<div class='divMsgSinLeer'>Mensajes no leídos</div>";
                    }

                    var esUsuSesion = conversacion[i].idUsu === usuSesion.id;

                    conver += Plantilla.crearPlantillaMensaje(conversacion[i], esUsuSesion);
                }
            }

        doc.getElementById("conversacion").innerHTML = conver;
        doc.getElementById("conversacion").scrollTop = doc.getElementById("conversacion").scrollHeight;
    }

    enviarMensajeChat = async() =>  {
        var inputTxt = doc.getElementsByClassName("emojionearea-editor")[0];

        if(inputTxt.innerHTML === "") return;

        var msg =   {
                        idUsu: this.getUsu().id,
                        fecha: new Date(),
                        mensaje: inputTxt.innerHTML
                    };

        var chat = await this.devolverChat(chatSlc);
        await this.actualizarConversacion(chatSlc, chat.data().nMsgSinLeer, msg);

        inputTxt.innerHTML = "";
    }

    asignarEvEnviarMensajeChat() {
        var btn = doc.getElementById("inputEnviarMsg");
        btn.addEventListener(
            "click",
            (e) => {
                this.enviarMensajeChat();
            },
            false
        );
    }

    slcUsuListChat = async(tipoUsu) => {
        if(tipoUsu === "empresa") {
            var empleadosArray = await this.devolverEmpleadosEmpresa(this.getUsu().id);
            var usuSesion = await this.devolverEmpresa(this.getUsu().id);
        } else {
            var usuSesion = await this.devolverEmpleado(this.getUsu().id);
            var empresaEmpleado = await this.devolverEmpresa(usuSesion.data().idEmpresa);
            var empleadosArray = await this.devolverEmpleadosEmpresa(usuSesion.data().idEmpresa);
        }

        var nMsgSinLeer =  await this.devolverChat(chatSlc);
        doc.getElementById("divChatConversacion").classList.remove("ocultar")
        doc.getElementById("divChatConversacion").classList.add("animate__animated", "animate__fadeIn")

        await this.actualizarNMsgSinLeer(chatSlc, 0);
        doc.getElementsByClassName("emojionearea-editor")[0].innerHTML = "";

        const chats = await onSnapshot(this.devolverEnlace("chat"), (chats) => {

            chats.docs.map((chat) => {

                if(chatSlc === chat.id) {
                    var idUsu = chat.data().arrayUsuariosChat;
                    idUsu.splice(chat.data().arrayUsuariosChat.indexOf(usuSesion.id), 1);
                    idUsu = idUsu[0];
                    console.log(idUsu)
                    var usu = empleadosArray.docs.filter(usu => usu.id === idUsu)[0];

                    if(tipoUsu === "empresa") {
                        doc.getElementById("imgChatSlc").innerHTML = usu.data().iconoPerfil ? `<img src="${usu.data().iconoPerfil}" alt="">` : "<img src='./img/empleadoIcono.png' alt=''>";
                        doc.getElementById("nombreUsuChatSlc").innerHTML = `${usu.data().nombre} ${usu.data().apellidos}`;

                        this.mostrarMsgConversacion(chat, nMsgSinLeer.data().nMsgSinLeer);     

                    } else if(idUsu !== empresaEmpleado.id) {
                        doc.getElementById("imgChatSlc").innerHTML = usu.data().iconoPerfil ? `<img src="${usu.data().iconoPerfil}" alt="">` : "<img src='./img/empleadoIcono.png' alt=''>";
                        doc.getElementById("nombreUsuChatSlc").innerHTML = `${usu.data().nombre} ${usu.data().apellidos}`;

                        this.mostrarMsgConversacion(chat, nMsgSinLeer.data().nMsgSinLeer);

                    } else if(idUsu === empresaEmpleado.id) {
                        doc.getElementById("imgChatSlc").innerHTML = empresaEmpleado.data().iconoPerfil ? `<img src="${empresaEmpleado.data().iconoPerfil}" alt="">` : "<img src='./img/empresaIcono.png' alt=''>";
                        doc.getElementById("nombreUsuChatSlc").innerHTML = empresaEmpleado.data().rznSocial;

                        this.mostrarMsgConversacion(chat, nMsgSinLeer.data().nMsgSinLeer);
                    }

                    

                    /*var conversacion = chat.data().conversacion;

                    if (conversacion == null) return;

                    for (let i = 0; i < conversacion.length; i++) {
                        doc.getElementById("conversacion"). innerHTML = this.getUsu().id === conversacion[i].idUsu 
                        ? Plantilla.crearPlantillaMensaje(conversacion[i].mensaje, true) 
                        : Plantilla.crearPlantillaMensaje(conversacion[i].mensaje, false);
                    }*/
                }
            });  
        });
    }

    asignarEvSlcUsuListChat(tipoUsu) {
        var divChats = doc.getElementsByClassName("divUsuarioChat");
        this.asignarEvVolverListChat();
        for (let i = 0; i < divChats.length; i++) {
            divChats[i].addEventListener(
                "click",
                async(e) => {
                    chatSlc = divChats[i].id;
                    this.slcUsuListChat(tipoUsu);
                    doc.getElementById("divChatConversacion").classList.add("zIndexChat")
                },
                false
            );
        }
    }

    asignarEvVolverListChat() {
        var btnVolver = doc.getElementById("btnVolverListChat");
        btnVolver.addEventListener(
            "click",
            async(e) => {
                doc.getElementById("divChatConversacion").classList.remove("zIndexChat")
            },
            false
        );
    }

    modificarPaginaOpNavChat = async(tipoUsu) => {
        opAside.innerHTML = Plantilla.crearOpAsideChat(tipoUsu);


        if(tipoUsu === "empresa") {

        }

        doc.getElementById("principal").innerHTML = Plantilla.crearPlantillaChat();
        this.obtenerListadoUsuariosChat(tipoUsu)

        //Emojis
        $(doc).ready(function() {
            $("#inputMsgChat").emojioneArea({
                pickerPosition: "top"
            });
        })
    }

    obtenerListadoUsuariosChat = async (tipoUsu) => {
        var divListadoUsu = doc.getElementById("listadoUsuariosChat");
        this.asignarEvEnviarMensajeChat();

        if(tipoUsu === "empresa") {
            var usuSesion = await this.devolverEmpresa(this.getUsu().id);
            var empleadosArray = await this.devolverEmpleadosEmpresa(this.getUsu().id);
            /*var arrayChat = await this.devolverColeccion("chat");*/

            const usuarios = await onSnapshot(this.devolverEnlace("empleado"), (usuarios) => {
                usuarios.docs.map((usuario) => {
                    if(doc.getElementById("divChat") && doc.getElementById(usuario.id) != undefined) {
                        var conectadoClass = usuario.data().conectado ? "conectado" : "desconectado";
                        doc.getElementById(usuario.id).classList.remove("conectado");
                        doc.getElementById(usuario.id).classList.remove("desconectado");
                        doc.getElementById(usuario.id).classList.add(conectadoClass);
                    }
                })
            });

            const chats = await onSnapshot(this.devolverEnlace("chat"), (chats) => {
                divListadoUsu.innerHTML = "";
                chats = chats.docs.sort((a, b) => a.data().fLastMsg < b.data().fLastMsg) 
                chats.map((chat) => {
                    var idUsu = chat.data().arrayUsuariosChat;
                    idUsu.splice(chat.data().arrayUsuariosChat.indexOf(usuSesion.id), 1);
                    idUsu = idUsu[0];
    
                    var usu = empleadosArray.docs.filter(usu => usu.id ===  idUsu);
                    if(usuSesion.id === chat.data().idEmpresa && chat.data().arrayUsuariosChat.includes(usuSesion.id)) {
    
                        divListadoUsu.innerHTML += Plantilla.crearFilaListUsuChat(usu[0], chat, chatSlc);
                    }
                });  

                this.asignarEvSlcUsuListChat(tipoUsu);
            }); 

        } else if(tipoUsu === "empleado") {
            var usuSesion = await this.devolverEmpleado(this.getUsu().id);
            var empresaEmpleado = await this.devolverEmpresa(usuSesion.data().idEmpresa);
            var empleadosArray = await this.devolverEmpleadosEmpresa(usuSesion.data().idEmpresa);

            const usuarios = await onSnapshot(this.devolverEnlace("empleado"), (usuarios) => {
                usuarios.docs.map((usuario) => {

                    if(doc.getElementById("divChat") && doc.getElementById(usuario.id) != undefined) {
     
                        var conectadoClass = usuario.data().conectado ? "conectado" : "desconectado";
                        doc.getElementById(usuario.id).classList.remove("conectado");
                        doc.getElementById(usuario.id).classList.remove("desconectado");
                        doc.getElementById(usuario.id).classList.add(conectadoClass);
                    }
                })
            });

            const empresa = await onSnapshot(this.devolverEnlace("empresa"), (empresa) => {
                empresa = empresa.docs[0];

                if(doc.getElementById("divChat") && doc.getElementById(empresa.id) != undefined) {
                    var conectadoClass = empresa.data().conectado ? "conectado" : "desconectado";
                    doc.getElementById(empresa.id).classList.remove("conectado");
                    doc.getElementById(empresa.id).classList.remove("desconectado");
                    doc.getElementById(empresa.id).classList.add(conectadoClass);
                }
            });

            const chats = await onSnapshot(this.devolverEnlace("chat"), (chats) => {
                divListadoUsu.innerHTML = "";
                chats = chats.docs.sort((a, b) => a.data().fLastMsg < b.data().fLastMsg) 

                chats.map((chat) => {
                    var idUsu = chat.data().arrayUsuariosChat;
                    idUsu.splice(chat.data().arrayUsuariosChat.indexOf(usuSesion.id), 1);
                    var usu = empleadosArray.docs.filter(usu => usu.id === idUsu[0]);

                    if(idUsu[0] === usuSesion.data().idEmpresa) {
                        usu = empresaEmpleado;
                        
                    } else if(usu.length > 0) {
                        usu = usu[0];
                    } else {
                        usu = null;
                    }

                    if(usu != null && usuSesion.data().idEmpresa === chat.data().idEmpresa && chat.data().arrayUsuariosChat.includes(usu.id) && chat.data().arrayUsuariosChat.includes(usuSesion.id)) {
                        divListadoUsu.innerHTML += Plantilla.crearFilaListUsuChat(usu, chat, chatSlc);
                    }

                });  

                this.asignarEvSlcUsuListChat(tipoUsu);
            }); 
        }
        
        //Filtrar nombre usuario por input.
        $(doc).ready(function() {
            $("#inputBuscarUsuarioChat").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $(".nombreUsuGrupoChat").filter(function() {
                    $(this.parentNode.parentNode).toggle($(this).text()
                    .toLowerCase().indexOf(value) > -1)
                });
            });
        });
        doc.getElementsByClassName("emojionearea-editor")[0].innerHTML = "";
    };
}
//Exportamos.
export { Workas };