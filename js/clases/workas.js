"use strict";
import { Chat } from "./chat.js";

import * as Plantilla from "../bibliotecas/plantilla.js";
import * as General from "../bibliotecas/general.js";

/*  --- CLASE WORKAS ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con nuestra aplicación principal.
var doc = document;
var opAside;

var arrayEmpleados = [];
var empleadoEnEdicion;

class Workas extends Chat {
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
                tipoUsu: "empleado"
            }

            var existeEmpleadoCorreo = await this.devolverConsultaFiltrarEmpleadoCorreo(empleado.correo);
            var existeEmpleadoDni = await this.devolverConsultaFiltrarEmpleadoDni(empleado.dni);

            if (existeEmpleadoCorreo.docs.length > 0 || existeEmpleadoDni.docs.length > 0) {
                alert = General.crearAlert("Error, ya existe el empleado.", "errorAlert");
                div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));

            } else {
                alert = General.crearAlert("Empleado creado correctamente.", "exitoAlert");
                doc.getElementById("formCrearEmpleado").reset();

                var usuAnyadido = await this.anyadirEmpleado(empleado);
                var arrayEmpleados = await this.devolverEmpleadosEmpresa(this.getUsu().id);

                chat = {
                    arrayUsuariosChat: [this.getUsu().id, usuAnyadido.id],
                    conversacion: null,
                    nMsgSinLeer: 0,
                    idEmpresa: this.getUsu().id,
                    fLastMsg: null
                }
                arrayAnyadirChat += this.anyadirChat(chat);

                arrayEmpleados.docs.map((empleado) => {

                    if(empleado.id !== usuAnyadido.id) {
                        chat = {
                            arrayUsuariosChat: [empleado.id, usuAnyadido.id],
                            conversacion: null,
                            nMsgSinLeer: 0,
                            idEmpresa: this.getUsu().id,
                            fLastMsg: null
                        }
    
                        arrayAnyadirChat += this.anyadirChat(chat);
                    }
                });

                await Promise.all(arrayAnyadirChat);
                this.opListarEmpleados();
                div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));            
            }
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
        var promesas = [];

        var empleado = await this.devolverEmpleado(btn.parentNode.parentNode.id)
        var chats = await this.devolverChatsEmpresa(empleado.data().idEmpresa);

        chats.docs.map((chat) => {
            if(chat.data().arrayUsuariosChat.includes(empleado.id)) {
                promesas.push(this.eliminarChat(chat.id));
            }
        });

        await Promise.all(promesas);
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

        General.evTeclaEnterForm("btnCrearEmpleado", "inputAnyadirEmpleado");
        General.evTeclaEnterForm("btnEditarEmpleado", "inputEditarEmpleado");
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
        General.evTeclaEnterForm("btnSolicitarDias", "inputSolicitarDias");

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

        var imgPerfil = (empresa.data().iconoPerfil === "") ? "./img/empresaIcono.png" : empresa.data().iconoPerfil;

        if(doc.getElementById("contenidoFormulario") != null) {
            doc.getElementById("contenidoFormulario").id = "contenido";
        }
        doc.getElementById("contenido").classList.add("colapsarContenido");
        doc.getElementById("contenido").innerHTML = Plantilla.crearPaginaInicialEmpresa(empresa, imgPerfil);
        opAside = doc.getElementById("asideOpciones");

        var divChat = doc.getElementById("btnChat");

        this.modificarPaginaOpNavEmpleados();
        this.asignarEvColapsarAside();
        this.chatMostrarMsgChat();
        
        doc.getElementById("opNavEmpleados").addEventListener(
            "click",
            (e) => {
                divChat.classList.remove("ocultar");
                doc.getElementById("asidePrincipal").classList.remove("contenidoChat");
                doc.getElementById("contenido").classList.remove("contenidoChat");
                this.modificarPaginaOpNavEmpleados();
            },
            false
        );

        doc.getElementById("opNavTablon").addEventListener(
            "click",
            (e) => {
                divChat.classList.remove("ocultar");
                doc.getElementById("asidePrincipal").classList.remove("contenidoChat");
                doc.getElementById("contenido").classList.remove("contenidoChat");
                this.modificarPaginaOpNavTablonAnuncio("empresa");
            },
            false
        );

        doc.getElementById("opNavCalendario").addEventListener(
            "click",
            (e) => {
                divChat.classList.remove("ocultar");
                doc.getElementById("asidePrincipal").classList.remove("contenidoChat");
                doc.getElementById("contenido").classList.remove("contenidoChat");
                this.modificarPaginaOpNavCalendario("empresa");
            },
            false
        );

        doc.getElementById("btnChat").addEventListener(
            "click",
            async(e) => {
                divChat.classList.add("ocultar");
                doc.getElementById("asidePrincipal").classList.add("contenidoChat");
                doc.getElementById("contenido").classList.add("contenidoChat");
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
        await this.actualizarEstadoConectado(empresa.id, true, "empresa")
    }

    crearPaginaInicialWorkasEmpleado = async() => {
        var iconoPerfil = doc.getElementsByClassName("imgIconoPerfil");
        var empleado = await this.devolverEmpleado(this.getUsu().id);

        var imgPerfil = (empleado.data().iconoPerfil === "") ? "./img/empleadoIcono.png" : empleado.data().iconoPerfil;

        if(doc.getElementById("contenidoFormulario") != null) {
            doc.getElementById("contenidoFormulario").id = "contenido";
        }
        doc.getElementById("contenido").classList.add("colapsarContenido");
        doc.getElementById("contenido").innerHTML = Plantilla.crearPaginaInicialEmpleado(empleado, imgPerfil);
        opAside = doc.getElementById("asideOpciones");

        var divChat = doc.getElementById("btnChat");

        this.asignarEvColapsarAside();
        this.mostrarToastAnuncioNuevo();
        this.modificarPaginaOpNavCalendario("empleado");
        this.chatMostrarMsgChat();

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
                doc.getElementById("asidePrincipal").classList.remove("contenidoChat");
                doc.getElementById("contenido").classList.remove("contenidoChat");
                this.modificarPaginaOpNavTablonAnuncio("empleado");
            },
            false
        );

        doc.getElementById("opNavCalendario").addEventListener(
            "click",
            (e) => {
                divChat.classList.remove("ocultar");
                doc.getElementById("asidePrincipal").classList.remove("contenidoChat");
                doc.getElementById("contenido").classList.remove("contenidoChat");
                this.modificarPaginaOpNavCalendario("empleado");
            },
            false
        );

        doc.getElementById("btnChat").addEventListener(
            "click",
            async(e) => {
                divChat.classList.add("ocultar");
                doc.getElementById("asidePrincipal").classList.add("contenidoChat");
                doc.getElementById("contenido").classList.add("contenidoChat");
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
        await this.actualizarEstadoConectado(empleado.id, true, "empleado");
    }
}
//Exportamos.
export { Workas };