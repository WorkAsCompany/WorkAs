"use strict";
import { BD_Firebase } from "./bd_firebase.js";
import { RotarTurno } from "./rotarTurno.js";

import * as Plantilla from "../bibliotecas/plantilla.js";
import * as General from "../bibliotecas/general.js";

/*  --- BIBLIOTECA WORKAS ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con nuestra aplicación principal.
var doc = document;
var opAside;

var arrayEmpleados = [];
var empleadoEnEdicion;

var anuncioSlc;

class Workas extends RotarTurno {
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
        var alert;

        var dni = doc.getElementById("txtDni").value.trim();
        var nombre = doc.getElementById("txtNombre").value.trim();
        var apellidos = doc.getElementById("txtApellidos").value.trim();
        var correo = doc.getElementById("txtEmail").value.trim();
        var puestoTrabajo = doc.getElementById("txtPuestoTrabajo").value.trim();
        var turno = doc.getElementById("turnoJornada").value;
        var codEmpleado = this.generarCodEmpleado();

        if (this.comprobarCorreo(correo) && this.comprobarDni(dni) && this.comprobarRazSocial(nombre) && this.comprobarRazSocial(apellidos) && this.comprobarRazSocial(puestoTrabajo) && turno !== "noSelec") {
            var empleado = {
                idEmpresa: this.getUsu().id,
                dni: dni,
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                puestoTrabajo: puestoTrabajo,
                turno: turno,
                codEmpleado: codEmpleado,
                iconoPerfil: ""
            }

            var existeEmpleado = await this.devolverConsultaFiltrarEmpleadoCorreo(empleado.correo);

            if (existeEmpleado.docs.length > 0) {
                alert = General.crearAlert("Error, ya existe el empleado.", "errorAlert");
                div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));

            } else {
                alert = General.crearAlert("Empleado creado correctamente.", "exitoAlert");
                doc.getElementById("formCrearEmpleado").reset();
                await this.anyadirEmpleado(empleado);
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
        if (empleados.docs.length > 0) {
            empleados.docs.map((empleado) => {

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
    
            await this.actualizarEmpleado( empleadoEnEdicion.id, empleadoMod);
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

    //Muestra la página principal con todas las funciones correspondientes si se ha iniciado sesión como empresa.
    crearPaginaInicialWorkasEmpresa = async() => {
        var iconoPerfil = doc.getElementsByClassName("imgIconoPerfil");
        var empresa = await this.devolverEmpresa(this.getUsu().id);

        var imgPerfil = (empresa.data().iconoPerfil === "") ? "./img/empresaIcono.png" : empresa.data().iconoPerfil;

        doc.getElementById("contenidoFormulario").id = "contenido";
        doc.getElementById("contenido").classList.add("colapsarContenido");
        doc.getElementById("contenido").innerHTML = Plantilla.crearPaginaInicialEmpresa(empresa, imgPerfil);
        opAside = doc.getElementById("asideOpciones");

        //this.mostrarDatosEmpresa();
        this.modificarPaginaOpNavEmpleados();
        this.asignarEvColapsarAside();
        
        doc.getElementById("opNavEmpleados").addEventListener(
            "click",
            (e) => {
                this.modificarPaginaOpNavEmpleados();
            },
            false
        );

        doc.getElementById("opNavTablon").addEventListener(
            "click",
            (e) => {
                this.modificarPaginaOpNavTablonAnuncio();
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

        var imgPerfil = (empleado.data().iconoPerfil === "") ? "./img/empleadoIcono.png" : empleado.data().iconoPerfil;

        doc.getElementById("contenidoFormulario").id = "contenido";
        doc.getElementById("contenido").classList.add("colapsarContenido");
        doc.getElementById("contenido").innerHTML = Plantilla.crearPaginaInicialEmpleado(empleado, imgPerfil);
        opAside = doc.getElementById("asideOpciones");

        this.asignarEvColapsarAside();
        
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
                this.modificarPaginaOpNavTablonAnuncio();
            },
            false
        );
    }










    aumentarVisita = async() => {
        var visitas = anuncioSlc.data().visualizaciones;
        visitas++;

        await this.actualizarVisitas(anuncioSlc.id, visitas)

        doc.getElementById("spanVisitas").innerHTML = visitas;

        anuncioSlc = await this.devolverAnuncio(anuncioSlc.id);
    }

    mostrarComentarios = async() => {
        var divComentario = doc.getElementById("divComentarios");
        var comentarios = "";
        for (let i = 0; i < anuncioSlc.data().comentarios.length; i++) {
            var tipoUsuario = anuncioSlc.data().comentarios[i].tipoUsuario;

            if(tipoUsuario === "empresa") {
                var usuario = await this.devolverEmpresa(anuncioSlc.data().comentarios[i].idUsuario);
            } else {
                var usuario = await this.devolverEmpleado(anuncioSlc.data().comentarios[i].idUsuario);
            }
            
            var texto = anuncioSlc.data().comentarios[i].texto;

            comentarios += Plantilla.crearComentario(texto, usuario.data(), tipoUsuario);
        }

        divComentario.innerHTML = comentarios;
    }

    enviarComentario = async() => {
        var texto = doc.getElementById("txtArea").value.trim();
        var usuario = await this.devolverEmpresa(this.getUsu().id);

        var tipoUsuario = usuario.data() == undefined ? "empleado" : "empresa";
        if(texto === "") {
            return;
        }

        var comentario = {
            idUsuario: this.getUsu().id,
            texto: texto,
            tipoUsuario: tipoUsuario
        }
        var texto = doc.getElementById("txtArea").value = "";

        await this.actualizarArrayAnuncio(anuncioSlc.id, comentario);
        anuncioSlc = await this.devolverAnuncio(anuncioSlc.id);

        this.mostrarComentarios();
    }

    asignarEvEnviarComentario() {
        doc.getElementById("enlEnviarComentario").addEventListener(
            "click",
            (e) => {
                this.enviarComentario();
            },
            false
        );
    }

    quitarLike = async(imgLike) => {
        var likes = anuncioSlc.data().likes;
        likes--;
        var arrayUsuarioLikes = anuncioSlc.data().arrayUsuarioLikes;
        arrayUsuarioLikes.splice(arrayUsuarioLikes.indexOf(this.getUsu().id), 1);
        
        await this.actualizarLikes(anuncioSlc.id, likes, arrayUsuarioLikes);

        imgLike.classList.remove("pulsado");
        imgLike.src = "./img/iconoLike.png";

        doc.getElementById("spanLike").innerHTML = likes;

        anuncioSlc = await this.devolverAnuncio(anuncioSlc.id);
    }

    darLike = async(imgLike) => {
        var likes = anuncioSlc.data().likes;
        likes++;
        var arrayUsuarioLikes = anuncioSlc.data().arrayUsuarioLikes;
        arrayUsuarioLikes.push(this.getUsu().id)

        await this.actualizarLikes(anuncioSlc.id, likes, arrayUsuarioLikes);

        imgLike.classList.add("pulsado");
        imgLike.src = "./img/iconoLikePulsado.png";[].slice

        doc.getElementById("spanLike").innerHTML = likes;

        anuncioSlc = await this.devolverAnuncio(anuncioSlc.id);
    }

    asignarEvDarLike() {
        doc.getElementById("imgLike").addEventListener(
            "click",
            (e) => {
                if (e.target.classList.contains("pulsado")) {
                    this.quitarLike(e.target)
                } else {
                    this.darLike(e.target)
                }
            },
            false
        );
    }

    mostrarTablonAnuncio = async() => {
        anuncioSlc = await this.devolverAnuncio("KgTx0OORxKZykYURF534");

        doc.getElementById("principal").innerHTML = Plantilla.crearAnuncioPlantillaEmpresa(anuncioSlc.data(), this.getUsu().id);

        this.asignarEvDarLike();
        this.asignarEvEnviarComentario();
        this.mostrarComentarios();
        this.aumentarVisita();
    }

    asignarEvMostrarTablonAnuncio() {
        doc.getElementById("asideListarTablon").addEventListener(
            "click",
            (e) => {
                this.mostrarTablonAnuncio();
            },
            false
        );
    }

    crearContenidoParrafos() {
        var txtArea = doc.getElementsByClassName("inputParrafo")
        var parrafos = "";
        for (let i = 0; i < txtArea.length; i++) {
            if(txtArea[i].value !== "") {
                parrafos += `<p>${txtArea[i].value}</p>`;
            }
        }
        return parrafos;
    }

    crearParrafo() {
        var parrafos = doc.getElementsByClassName("inputParrafo");
        var poderAnyadir = true;

        for (let i = 0; i < parrafos.length; i++) {
            if(parrafos[i].value === "") {
                poderAnyadir = false;
            }
        }

        if(poderAnyadir) {
            doc.getElementById("divParrafos").appendChild(Plantilla.crearDivAgregarParrafo());

        }
    }

    asignarEvCrearParrafo() {
        doc.getElementById("divAnyadirParrafo").addEventListener(
            "click",
            (e) => {
                this.crearParrafo()
            },
            false
        );
    }

    crearAnuncio = async() => {
        var div = doc.getElementById("principalCrearAnuncio");
        var alert;

        var fPubli = new Date();
        var idEmpresa = this.getUsu().id;
        var titulo = doc.getElementById("inputTitulo").value.trim();
        var subtitulo = doc.getElementById("inputSubtitulo").value.trim();
        var autor = doc.getElementById("inputAutor").value.trim();
        var nEnlace = doc.getElementById("inputNombreEnl").value.trim();
        var enlace = doc.getElementById("inputEnl").value.trim();
        var contenido = this.crearContenidoParrafos();

        var file = ($('#inputAnyadirImg'))[0].files[0];



        if (true) {
            var anuncio = {
                titulo: titulo,
                subtitulo: subtitulo,
                autor: autor,
                fPubli: fPubli,
                imgAnuncio: "",
                contenido: contenido,
                nEnlace: nEnlace,
                enlace: enlace,
                visualizaciones: 0,
                likes: 0,
                arrayUsuarioLikes: [],
                comentarios: [],
                idEmpresa: idEmpresa
            }

            doc.getElementById("parrafosAnuncio").innerHTML =   `<div id="divParrafos">
                                                                    <div class="form-floating divInputParrafo">
                                                                        <textarea class="form-control inputParrafo" placeholder="Escribe un párrafo"></textarea>
                                                                        <label>Escribe un párrafo</label>
                                                                    </div>
                                                                </div>
                                                                <div id="divAnyadirParrafo">
                                                                    <img src="./img/añadir.png" alt="">
                                                                </div>`

            var anuncio = await this.anyadirAnuncio(anuncio);
            console.log(anuncio);
            console.log(anuncio.id);
            var nombreImg = `${anuncio.id}.${file.name.substr( (file.name.lastIndexOf(".")+1 - file.name.length) )}`;
            await this.subirImgBD(`imgAnuncio/${nombreImg}`, file);

            var ruta = await this.descargarImgBD(`imgAnuncio/${nombreImg}`);

            await this.actualizarImgAnuncio(anuncio.id, ruta);
            doc.getElementById("formAnuncio").reset();

        } else {
            alert = General.crearAlert("Error en la introducción de datos.", "errorAlert");
            div.insertBefore(alert, doc.getElementById("tituloListEmpleado"));
        }   
    }

    asignarEvBtnCrearAnuncio() {
        doc.getElementById("btnCrearAnuncio").addEventListener(
            "click",
            (e) => {
                this.crearAnuncio();
            },
            false
        );
    }

    divCrearAnuncio() {
        doc.getElementById("principal").innerHTML = Plantilla.crearDivCrearAnuncio();
        doc.getElementById("divFormCrearAnuncio").innerHTML += Plantilla.crearFormularioAnuncio();

        this.asignarEvBtnCrearAnuncio();
        this.asignarEvCrearParrafo();
    }

    asignarEvDivCrearAnuncio() {
        doc.getElementById("asideCrearAnuncio").addEventListener(
            "click",
            (e) => {
                this.divCrearAnuncio();
            },
            false
        );
    }

    modificarPaginaOpNavTablonAnuncio() {
        opAside.innerHTML = Plantilla.crearOpAsideNavTablonAnuncio();

        this.asignarEvDivCrearAnuncio();
        this.asignarEvMostrarTablonAnuncio();

    }





    quitarTablonAnuncio = async(btn) => {
        var empresa = await this.devolverEmpresa(this.getUsu().id);
        var array = empresa.data().tablonAnuncios;
        array.splice(btn.id, 1);

        await this.eliminarTablonEmpresa(this.getUsu().id, array);

        this.opListarTablonAnuncio(false);
    }

    //Añade al DOM el formulario de creación de un tablón de anuncio.
    crearFormTablonAnuncio() {
        var div = doc.getElementById("principal");
        div.innerHTML = `<form id="formCrearTablonAnuncio" action=''>
                            <fieldset>
                            <legend>Introduce el título</legend>
                            <input id="txtTitulo" type="text" placeholder="Introduce el título">
                            </fieldset>	
                            <fieldset>
                            <legend>Tipo Plantilla</legend>
                            <input type="radio" class="plantillaTablon" name="plantillaTablon" value="plantilla1" checked>Plantilla 1<br>
                            <input type="radio" class="plantillaTablon" name="plantillaTablon" value="plantilla2">Plantilla 2<br>
                            </fieldset>	
                            <fieldset>
                            <legend>Introduce el autor</legend>
                            <input id="txtAutor" type="text" placeholder="Introduce el autor">
                            </fieldset>	
                            <fieldset>
                            <label for="selecImagen">Elije una imagen</label>
                               <select name="selecImagen" id="selecImagen">
                                   <option value="noSelec">No seleccionado</option>
                                   <option value="././././img/slcImgEmpresa.jpg">Empresa</option>
                                   <option value="././././img/slcImgReunion.jpg">Reunión</option>
                                   <option value="././././img/slcImgRevisionMedica.jpg">Médico</option>
                                   <option value="././././img/slcImgObras.jpg">Obras</option>
                                   <option value="././././img/slcImgVacaciones.jpg">Vacaciones</option>
                                   <option value="././././img/slcImgNavidad.jpg">Navidad</option>
                                </select> 
                            </fieldset>
                            <fieldset>
                            <legend>Contenido del tablón</legend>
                            <textarea id="contenidoTablon" name="contenidoTablon" rows="35" cols="150"></textarea>
                            </fieldset>		
                            <p class="error ocultar">(*) Error en la introducción de datos.</p>
                            <div id="divBtnCrearTablon"><input id="btnCrearTablon" type="button" value="Crear"></div>
                        </form>`;
    }

    //Recoge los datos del formulario y si son correctos creará un objeto "tablón de anuncio" y lo añadirá al array de tablonAnuncios de una empresa.
    opCrearTablonAnuncio = async() => {
        var div = doc.getElementById("principal");

        var titulo = doc.getElementById("txtTitulo").value.trim();
        var rutaImagen = doc.getElementById("selecImagen").value.trim();
        var contenido = doc.getElementById("contenidoTablon").value.trim();
        var autor = doc.getElementById("txtAutor").value.trim();
        var fPubli = new Date();
        var plantilla;
        for (let i = 0; i < doc.getElementsByClassName("plantillaTablon").length; i++) {
            if (doc.getElementsByClassName("plantillaTablon")[i].checked) {
                plantilla = doc.getElementsByClassName("plantillaTablon")[i].value;
            }
        }

        if (this.comprobarRazSocial(titulo) && rutaImagen !== "noSelec" && contenido !== "" && this.comprobarRazSocial(autor)) {
            var tablonAnuncio = {
                titulo: titulo,
                rutaImagen: rutaImagen,
                contenido: contenido,
                fPubli: fPubli,
                autor: autor,
                plantilla: plantilla
            }


            await this.actualizarArrayTablonAnuncioEmpresa(this.getUsu().id, tablonAnuncio);
            div.innerHTML = `<p class="infoMensajeCorrecto">Anuncio creado correctamente.</p>`;
            this.opListarTablonAnuncio(true);
        } else {
            div.getElementsByClassName("error")[0].innerHTML = "(*) Error en la introducción de datos.";
            div.getElementsByClassName("error")[0].classList.remove("ocultar");
        }
    }

    //Asigna el evento al botón del form de recoger los datos del formulario y añadir el objeto tablón de anuncio a la bd de una empresa.
    asignarEvCrearTablonAnuncio() {
        var btn = doc.getElementById("btnCrearTablon");
        btn.addEventListener(
            "click",
            (e) => {
                this.opCrearTablonAnuncio();
            },
            false
        );
    }

    //Asigna el evento de añadir el formulario al DOM y asignar al botón de este el evento de añadir un tablón de anuncios a la empresa correspondiente.
    asignarEvOpCrearTablonAnuncio(btn) {
        btn.addEventListener(
            "click",
            (e) => {
                this.crearFormTablonAnuncio();
                this.asignarEvCrearTablonAnuncio();
            },
            false
        );
    }

    //Lista el array de tablonAnuncios y lo mostrará al DOM de distinta forma según la plantilla que tenga el tablón.
    opListarTablonAnuncio = async(anyadido) => {
        var div = doc.getElementById("principal");
        if (!anyadido) {
            div.innerHTML = "";
        }
        var empresa = await this.devolverEmpresa(this.getUsu().id);
        if (empresa.data().tablonAnuncios.length > 0) {
            for (let i = 0; i < empresa.data().tablonAnuncios.length; i++) {
                if (empresa.data().tablonAnuncios[i].plantilla === "plantilla1") {
                    div.innerHTML += Plantilla.crearTablonPlantillaEmpresa1(empresa.data().tablonAnuncios[i], i);
                } else if (empresa.data().tablonAnuncios[i].plantilla === "plantilla2") {
                    div.innerHTML += Plantilla.crearTablonPlantillaEmpresa2(empresa.data().tablonAnuncios[i], i);
                }
            }

        } else {
            div.innerHTML = `<p class="mensajeInfo">No hay ningún tablón de anuncio añadido todavía.</p>`;
        }

        this.asignarEvOpBorrarTablonAnuncio();
    }

    //Lista el array de tablonAnuncios que tenga la empresa en la que el empleado está registrado y lo mostrará al DOM de distinta forma según la plantilla que tenga el tablón.
    opListarTablonAnuncioEmpleado = async() => {
        var div = doc.getElementById("principal");
        div.innerHTML = "";

        var empleado = await this.devolverEmpleado(this.getUsu().id);
        var empresa = await this.devolverEmpresa(empleado.data().idEmpresa);

        if (empresa.data().tablonAnuncios.length > 0) {
            for (let i = 0; i < empresa.data().tablonAnuncios.length; i++) {
                if (empresa.data().tablonAnuncios[i].plantilla === "plantilla1") {
                    div.innerHTML += Plantilla.crearTablonPlantillaEmpleado1(empresa.data().tablonAnuncios[i]);
                } else if (empresa.data().tablonAnuncios[i].plantilla === "plantilla2") {
                    div.innerHTML += Plantilla.crearTablonPlantillaEmpleado2(empresa.data().tablonAnuncios[i]);
                }
            }

        } else {
            div.innerHTML = `<p class="mensajeInfo">La empresa no ha publicado ningún tablón de anuncio todavía.</p>`;
        }
    }

    //Asigna el evento de listar el array de tablonAnuncios al botón.
    asignarEvOpListarTablonAnuncio(btn) {
        btn.addEventListener(
            "click",
            (e) => {
                this.opListarTablonAnuncio(false);
            },
            false
        );
    }

    //Asigna el evento de listar el array de tablonAnuncios que tiene la empresa a la que el empleado está registrado.
    asignarEvOpListarTablonAnuncioEmpleado(btn) {
        btn.addEventListener(
            "click",
            (e) => {
                this.opListarTablonAnuncioEmpleado();
            },
            false
        );
    }

    //Borra el tablón de anuncio seleccionado de la bd y vuelve a listar el array tablonAnuncios.
    quitarTablonAnuncio = async(btn) => {
        var empresa = await this.devolverEmpresa(this.getUsu().id);
        var array = empresa.data().tablonAnuncios;
        array.splice(btn.id, 1);

        await this.eliminarTablonEmpresa(this.getUsu().id, array);

        this.opListarTablonAnuncio(false);
    }

    //Asigna el evento de borrar tabón de anuncio al botón eliminar.
    asignarEvOpBorrarTablonAnuncio() {
        var btnBorrar = doc.getElementsByClassName("btnEliminarTablon");
        for (let i = 0; i < btnBorrar.length; i++) {
            btnBorrar[i].addEventListener(
                "click",
                (e) => {
                    this.quitarTablonAnuncio(e.target);
                },
                false
            );
        }
    }

}
//Exportamos.
export { Workas };