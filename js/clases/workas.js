"use strict";
import { BD_Firebase } from "./bd_firebase.js";
import * as Plantilla from "../bibliotecas/plantilla.js";
import * as Calendario from "../bibliotecas/calendario.js";

/*  --- BIBLIOTECA WORKAS ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con nuestra aplicación principal.
var doc = document;
var opAside;

var arrayEmpleados = [];
var empleadoEnEdicion;

var arrayTurnoDiurno = [];
var arrayTurnoMixto = [];
var arrayTurnoNocturno = [];

class Workas extends BD_Firebase {
    constructor() {
        super();
    }

    desactivarActivarBotones(clase, desactivar) {
        if(desactivar) {
            for (let i = 0; i < doc.getElementsByClassName(clase).length; i++) {
                doc.getElementsByClassName(clase)[i].setAttribute("disabled","disabled")
            }
        } else {
            for (let i = 0; i < doc.getElementsByClassName(clase).length; i++) {
                doc.getElementsByClassName(clase)[i].removeAttribute("disabled")
            }
        }
    }

    //Recoge los datos del formulario y si son correctos crea un nuevo empleado y lo añade a la empresa correspondiente.
    opAnyadirEmpleado = async() => {
        var div = doc.getElementById("divPrincipalTabla");

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
                div.getElementsByClassName("error")[0].innerHTML = "(*) Error, ya existe el empleado.";
                div.getElementsByClassName("error")[0].classList.remove("ocultar");
            } else {
                doc.getElementById("formCrearEmpleado").reset();
                await this.anyadirEmpleado(empleado);
                div.innerHTML = `<p class="infoMensajeCorrecto">Empleado creado correctamente.</p>`;
                this.opListarEmpleados();
            }
        } else {
            div.getElementsByClassName("error")[0].innerHTML = "(*) Error en la introducción de datos.";
            div.getElementsByClassName("error")[0].classList.remove("ocultar");
        }
    }

    //Asigna el evento de crear usuario al botón del formulario.
    asignarEvAnyadirEmpleado() {
        var btn = doc.getElementById("btnCrearEmpleado");
        btn.addEventListener(
            "click",
            (e) => {
                this.opAnyadirEmpleado();
            },
            false
        );
    }

    //Lista los empleados de una empresa en una tabla, con funciones de modificar y eliminar a este.
    opListarEmpleados = async() => {
        var div = doc.getElementById("divPrincipalTabla");
        div.innerHTML = "<h2 id='tituloListEmpleado'>Listado de Empleados</h2>";

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
                                        <th class="celda">Código empleado</th>
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

        await this.eliminarEmpleadoEmpresa(btn.parentNode.parentNode.id);
        this.opListarEmpleados();
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
        
        var empleadoMod = {
            dni: doc.getElementById("txtEditarDni").value,
            nombre: doc.getElementById("txtEditarNombre").value,
            apellidos: doc.getElementById("txtEditarApellidos").value,
            correo: doc.getElementById("txtEditarEmail").value,
            puestoTrabajo: doc.getElementById("txtEditarPuestoTrabajo").value,
            turno: doc.getElementById("turnoEditarJornada").value
        }

        await this.actualizarEmpleado( empleadoEnEdicion.id, empleadoMod);
    }

    //Asigna el evento guardar la edición de los datos del empleado en la bd.
    asignarBtnEvTerminarEditarEmpleado() {
        var btnEditar = doc.getElementById("btnEditarEmpleado");

        btnEditar.addEventListener(
            "click",
            (e) => {

                this.terminarEditarEmpleado();
                this.opListarEmpleados();
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











    

    modificarTurno = (btn) => {
        this.desactivarActivarBotones("btnTurno", true);
        var promesas = []; 

        if (btn === "diurnoToMixto") {
            for (let empleado of arrayTurnoDiurno) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Mixto")
                promesas.push(promesa);
            }
            for (let empleado of arrayTurnoMixto) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Diurno")
                promesas.push(promesa);
            }

        } else if (btn === "diurnoToNocturno") {
             this.modificarTurnoEmpleado(arrayTurnoDiurno, "Nocturno");
             this.modificarTurnoEmpleado(arrayTurnoNocturno, "Diurno");

        } else if (btn === "mixtoToDiurno") {
             this.modificarTurnoEmpleado(arrayTurnoMixto, "Diurno");
             this.modificarTurnoEmpleado(arrayTurnoDiurno, "Mixto");

        } else if (btn === "mixtoToNocturno") {
             this.modificarTurnoEmpleado(arrayTurnoMixto, "Nocturno");
             this.modificarTurnoEmpleado(arrayTurnoNocturno, "Mixto");

        } else if (btn === "nocturnoToDiurno") {
             this.modificarTurnoEmpleado(arrayTurnoNocturno, "Diurno");
             this.modificarTurnoEmpleado(arrayTurnoDiurno, "Nocturno");

        } else if (btn === "nocturnoToMixto") {
             this.modificarTurnoEmpleado(arrayTurnoNocturno, "Mixto");
             this.modificarTurnoEmpleado(arrayTurnoMixto, "Nocturno");

        }
        
        return Promise.all(promesas);


        /*console.log("fddf")
        
        console.log(arrayTurnoDiurno)
        console.log(arrayTurnoMixto)
        console.log(arrayTurnoNocturno)*/
    }

    asigarEvBtnModificarTurno(puesto) {
        var btn = doc.getElementsByClassName("btnTurno");
        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener(
                "click",
                async(e) => {
                    var ye = await this.modificarTurno(e.target.id);
                    console.log(ye)
                    console.log(2)
                    this.crearArrayTurno(puesto, true);
                    console.log(arrayTurnoDiurno)
                    console.log(arrayTurnoMixto)
                    console.log(arrayTurnoNocturno)
                    arrayTurnoDiurno = [];
                    arrayTurnoMixto = [];
                    arrayTurnoNocturno = [];

                },
                false
            );
        }
    }

    crearArrayTurno = async(puesto, sobreescribir) =>  {
        var empleados = await this.devolverEmpleadosEmpresa(this.getUsu().id);
        empleados = empleados.docs.filter(empleado => empleado.data().puestoTrabajo.toLowerCase() === puesto.toLowerCase());

        empleados.map((empleado) => {
            console.log(empleado.data().turno)
            if (empleado.data().turno === "Diurno") {
                arrayTurnoDiurno.push(empleado);
            } else if (empleado.data().turno === "Mixto") {
                arrayTurnoMixto.push(empleado);
            } else if (empleado.data().turno === "Nocturno") {
                arrayTurnoNocturno.push(empleado);
            }
        });

        if(sobreescribir) {
            doc.getElementById("cardTurnoDiurno").getElementsByClassName("divCardEmpleados")[0].innerHTML = Plantilla.crearFilasCardRotarTurno(arrayTurnoDiurno);
            doc.getElementById("cardTurnoMixto").getElementsByClassName("divCardEmpleados")[0].innerHTML = Plantilla.crearFilasCardRotarTurno(arrayTurnoMixto);
            doc.getElementById("cardTurnoNocturno").getElementsByClassName("divCardEmpleados")[0].innerHTML = Plantilla.crearFilasCardRotarTurno(arrayTurnoNocturno);
        }
        this.desactivarActivarBotones("btnTurno", false);

    }

    buscarEmpleadoPorPuesto = async(puesto) =>  {
        var div = doc.getElementById("divCardRotarTurno");
        div.innerHTML = "";
        var inputBuscar = doc.getElementById("inputBuscarPorPuesto");

        if(puesto != undefined) {
            inputBuscar.value = puesto;
        }

        await this.crearArrayTurno(inputBuscar.value, false)

        div.innerHTML += Plantilla.crearCardRotarTurno("diurno", inputBuscar.value, arrayTurnoDiurno);
        div.innerHTML += Plantilla.crearCardRotarTurno("mixto", inputBuscar.value, arrayTurnoMixto);
        div.innerHTML += Plantilla.crearCardRotarTurno("nocturno", inputBuscar.value, arrayTurnoNocturno);

        this.asigarEvBtnModificarTurno(inputBuscar.value);
        inputBuscar.value = "";
    }

    asignarEvBuscarEmpleadoPorPuesto() {
        var btn = doc.getElementById("btnBuscarEmpleadoPuesto");
        btn.addEventListener(
            "click",
            (e) => {
                this.buscarEmpleadoPorPuesto();
                arrayTurnoDiurno = [];
                arrayTurnoMixto = [];
                arrayTurnoNocturno = [];
            },
            false
        );
    }

    rotarEmpleados() {
        doc.getElementById("principal").innerHTML = Plantilla.crearDivRotarTurno();
        this.asignarEvBuscarEmpleadoPorPuesto();
    }

    asignarEvRotarEmpleados() {
        var btn = doc.getElementById("asideRotarTurno");
        btn.addEventListener(
            "click",
            (e) => {
                this.rotarEmpleados();
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

    modificarPaginaOpNavIconoPerfil = async() => {
        var empresa = await this.devolverEmpresa(this.getUsu().id);
        var imgPerfil = (empresa.data().iconoPerfil === "") ? "./img/empresaIcono.png" : await this.descargarImgBD(empresa.data().iconoPerfil);
        var nEmpleados = await this.devolverEmpleadosEmpresa(this.getUsu().id);

        opAside.innerHTML = Plantilla.crearOpAsideNavPerfil();
        doc.getElementById("principal").innerHTML = Plantilla.crearDivInfoDatosEmpresa(await this.devolverEmpresa(this.getUsu().id), imgPerfil, nEmpleados.docs.length);

        doc.getElementById("btnActualizarImgPerfil").addEventListener(
            "click",
            async(e) => {
                var file = ($('#inputAnyadirImg'))[0].files[0];
                var nombreImg = `${this.getUsu().id}.${file.name.substr( (file.name.lastIndexOf(".")+1 - file.name.length) )}`;

                await this.subirImgBD(`iconosPerfil/${nombreImg}`, file);
                await this.actualizarImgPerfilEmpresa(this.getUsu().id, `iconosPerfil/${nombreImg}`);

                var ruta = await this.descargarImgBD(`iconosPerfil/${nombreImg}`);

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

        var imgPerfil = (empresa.data().iconoPerfil === "") ? "./img/empresaIcono.png" : await this.descargarImgBD(empresa.data().iconoPerfil);

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

        for (let i = 0; i < iconoPerfil.length; i++) {
            iconoPerfil[i].addEventListener(
                "click",
                async(e) => {
                    await this.modificarPaginaOpNavIconoPerfil();
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
        doc.getElementById("contenido").outerHTML = Plantilla.crearPaginaInicialEmpleado(await this.devolverEmpleado(this.getUsu().id));
        var opTablonAnuncio = doc.getElementById("enlTablonAnuncio");
        var opPerfil = doc.getElementById("iconoPerfil");
        var opCalendario = doc.getElementById("enlCalendario");

        this.mostrarDatosEmpleado();
        this.asignarEvColapsarAside();

        this.asignarEvOpListarTablonAnuncioEmpleado(opTablonAnuncio);

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
        );
    }






    quitarTablonAnuncio = async(btn) => {
        var empresa = await this.devolverEmpresa(this.getUsu().id);
        var array = empresa.data().tablonAnuncios;
        array.splice(btn.id, 1);

        await this.eliminarTablonEmpresa(this.getUsu().id, array);

        this.opListarTablonAnuncio(false);
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

}
//Exportamos.
export { Workas };