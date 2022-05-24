import { TablonAnuncio } from "./tablonAnuncio.js";

import * as Plantilla from "../bibliotecas/plantilla.js";  
import * as General from "../bibliotecas/general.js";

   /*  --- CLASE CALENDARIO ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con los días festivos y días solicitados para vacaciones por los empleados.
var doc = document;

var solicitudEnResolucion = "";

class Calendario extends TablonAnuncio {
    constructor() {
        super();
    }

    mostrarDivCalendario(tipoUsu) {       
        doc.getElementById("principal").innerHTML = Plantilla.crearDivCalendario();

        if(tipoUsu === "empresa") {
            doc.getElementById("principal").innerHTML += Plantilla.crearDivFormDiaFest(); 
            doc.getElementById("principal").innerHTML += Plantilla.crearModalResolucionDiaSol(); 
            this.asignarEvBtnResolverResolucion();
            General.evTeclaEnterForm("btnResolucionSol", "inputResolucionDia");
            General.evTeclaEnterForm("btnAnyadirDiaFest", "inputAnyadirDiaFest");

        } else {
            doc.getElementById("principal").innerHTML += Plantilla.crearDivFormSolicitarDias();  

        }

        this.asignarEvBtnMostrarPendientes(tipoUsu);
        this.asignarEvBtnMostrarResueltas(tipoUsu);
        this.mostrarDiasFestivos(tipoUsu);
        this.mostrarSolicitudesPendientes(tipoUsu);
    }

    mostrarDiasFestivos = async(tipoUsu) => {
        var div = doc.getElementById("divCalDiasFest");
        div.innerHTML = "";

        var filas = "";

        if(tipoUsu === "empresa") {
            var diasFest = await this.devolverDiasFest(this.getUsu().id);
        } else {
            var empleado = await this.devolverEmpleado(this.getUsu().id)
            var diasFest = await this.devolverDiasFest(empleado.data().idEmpresa);
        }

        var arrayDias = diasFest.docs;

        if (arrayDias.length > 0) {
            arrayDias.map((dias) => {
                filas += `${Plantilla.crearFilaDiaFestivo(dias, tipoUsu)}`;
            });

            div.innerHTML += filas;

        } else {
            div.innerHTML = `<p class="mensajeInfo">No se ha añadido ningún día festivo tadavía.</p>`;
        } 

        if(tipoUsu === "empresa") {
            this.asignarEvOpQuitarDiaFest();
        }
    }

    anyadirFestivo = async() => {
        var div = doc.getElementById("calendario");
        var arrayColor = ["azul", "rojoOscuro", "purpura", "cianOscuro", 
        "verde", "naranja", "rosa", "amarillo", 
        "oliva", "rojoclaro"];
        var alert;

        var nombre = doc.getElementById("inputNomFest").value.trim();
        var fDiaFest = doc.getElementById("inputFDiaFest");
        var enlace = doc.getElementById("inputEnlInteres").value.trim();
        var color = doc.querySelector('input[name="radioColor"]:checked').value

        if (this.comprobarRazSocial(nombre) && fDiaFest.value !== "" && arrayColor.includes(color)) {
            var diaFest = {
                nombre: nombre,
                fDiaFest: fDiaFest.valueAsDate,
                enlace: enlace,
                color: color,
                idEmpresa: this.getUsu().id
            }

            alert = General.crearAlert("Día festivo creado correctamente.", "exitoAlert");
            doc.getElementById("formCrearDiaFest").reset();

            var dia = await this.anyadirDiaFest(diaFest);

            this.mostrarDiasFestivos("empresa");
            div.insertBefore(alert, doc.getElementById("tituloCalendario"));  

        } else {
            alert = General.crearAlert("Error en la introducción de datos.", "errorAlert");
            div.insertBefore(alert, doc.getElementById("tituloCalendario"));
        }
    }

    asignarEvAnyadirFestivo() {
        var btn = doc.getElementById("btnAnyadirDiaFest");
        btn.addEventListener(
            "click",
            (e) => {
                if(doc.getElementById("btnSolResueltas").classList.contains("btnMenuDiasSolSlc")) {
                    doc.getElementById("btnSolPendientes").classList.add("btnMenuDiasSolSlc");
                    doc.getElementById("btnSolResueltas").classList.remove("btnMenuDiasSolSlc");
                }
                this.anyadirFestivo();
            },
            false
        );
    }

    //Elimina un día festivo de la bd.
    quitarDiaFest = async(idDiaFest) => {
        var div = doc.getElementById("divCalDiasFest");
        div.innerHTML = "";
        var alert;

        var diaFest = await this.devolverDiaFest(idDiaFest);
        await this.eliminarDiaFest(idDiaFest);
        
        this.mostrarDiasFestivos("empresa");
        alert = General.crearAlert(`El día festivo ${diaFest.data().nombre} se ha eliminado correctamente.`, "exitoAlert");
        doc.getElementById("calendario").insertBefore(alert, doc.getElementById("tituloCalendario"));
    }

    //Asigna el evento de borrar un día festivo a los botones de elimiar.
    asignarEvOpQuitarDiaFest() {
        var btnBorrar = doc.getElementsByClassName("btnEliminar");

        for (let i = 0; i < btnBorrar.length; i++) {
            btnBorrar[i].addEventListener(
                "click",
                (e) => {
                    this.quitarDiaFest(e.target.id);
                },
                false
            );
        }
    }

    mostrarHistorialSolicitudes = async(tipoUsu) => {
        var div = doc.getElementById("divCalDiasFest");
        div.innerHTML = "";

        var filas = "";

        if(tipoUsu === "empresa") {
            var diasFest = await this.devolverDiasFest(this.getUsu().id);
        } else {
            var empleado = await this.devolverEmpleado(this.getUsu().id)
            var diasFest = await this.devolverDiasFest(empleado.data().idEmpresa);
        }

        var arrayDias = diasFest.docs;

        if (arrayDias.length > 0) {
            arrayDias.map((dias) => {
                filas += `${Plantilla.crearFilaDiaFestivo(dias, tipoUsu)}`;
            });

            div.innerHTML += filas;

        } else {
            div.innerHTML = `<p class="mensajeInfo">No se ha añadido ningún día festivo tadavía.</p>`;
        } 

        if(tipoUsu === "empresa") {
            this.asignarEvOpQuitarDiaFest();
        }
    }

    mostrarSolicitudesPendientes = async(tipoUsu) => {
        var div = doc.getElementById("divCalSolicitud");
        div.innerHTML = "";
        var arrayDias;

        var empleado;

        if(tipoUsu === "empresa") {
            var diasSol = await this.devolverDiasSolicitadosSegunEstadoEmpresa(this.getUsu().id, true);

        } else {
            empleado = await this.devolverEmpleado(this.getUsu().id)
            var diasSol = await this.devolverDiasSolicitadosSegunEstadoEmpleado(empleado.data().idEmpresa, this.getUsu().id, true);
        }

        arrayDias = diasSol.docs.sort((a, b) => a.data().fEnviada > b.data().fEnviada) ;

        if (arrayDias.length > 0) {
            arrayDias.map(async(dias) => {
                if(tipoUsu === "empresa") {
                    empleado = await this.devolverEmpleado(dias.data().idEmpleado);
                    div.innerHTML += `${Plantilla.crearFilaDiaSolicitado(dias, tipoUsu, empleado)}`;
                    this.asignarEvEnlAbrirModalResolucion();

                } else {
                    div.innerHTML += `${Plantilla.crearFilaDiaSolicitado(dias, tipoUsu, empleado)}`;
                }
            });

        } else {
            div.innerHTML = `<p class="mensajeInfo">No hay ninguna solicitud pendiente tadavía.</p>`;
        } 

    }

    btnSolicitarDias = async() => {
        var div = doc.getElementById("calendario");
        var fecha = new Date();
        var fechaAyer = new Date(fecha)
        fechaAyer.setDate(fechaAyer.getDate() - 1)

        var empleado = await this.devolverEmpleado(this.getUsu().id)
        var arrayAsuntos = ["Asuntos propios", "Días compensación horas extra", 
                            "Días compensación jornada irregular", "Vacaciones"];
        var alert;

        var fComienzo = doc.getElementById("inputFDiaComienzo");
        var fFin = doc.getElementById("inputFDiaFin");
        var asunto = doc.getElementById("slcOpcionesAsuntos").value.trim();
        var descripcion = doc.getElementById("txtAreaDesc").value.trim();

        if (fComienzo.value !== "" && fComienzo.valueAsDate >= fechaAyer && fFin.value !== "" && fFin.valueAsDate >= fComienzo.valueAsDate && arrayAsuntos.includes(asunto)) {
            var diaSolicitud = {
                fComienzo: fComienzo.valueAsDate,
                fFin: fFin.valueAsDate,
                fEnviada: fecha,
                asunto: asunto,
                descSolicitud: descripcion,
                descResolucion: "",
                pendiente: true,
                aceptada: false,
                idEmpleado: this.getUsu().id,
                idEmpresa: empleado.data().idEmpresa
            }

            alert = General.crearAlert("La solicitud ha sido enviada correctamente.", "exitoAlert");
            doc.getElementById("formSolicitarDiasAsunto").reset();

            var dia = await this.anyadirSolicitudDias(diaSolicitud);

            this.mostrarSolicitudesPendientes("empleado");
            div.insertBefore(alert, doc.getElementById("tituloCalendario"));  

        } else {
            alert = General.crearAlert("Error en la introducción de datos.", "errorAlert");
            div.insertBefore(alert, doc.getElementById("tituloCalendario"));
        }
    }

    asignarEvBtnSolicitarDias() {
        var btn = doc.getElementById("btnSolicitarDias");
        btn.addEventListener(
            "click",
            (e) => {
                this.btnSolicitarDias();
            },
            false
        );
    }

    resolverSolicitud = async() => {
        var div = doc.getElementById("calendario");
        var diaSol = await this.devolverDiaSolicitado(solicitudEnResolucion);
        var alert;

        var radioEstadoSol = doc.querySelector('input[name="radioEstadoSol"]:checked').value;
        var descripcion = doc.getElementById("txtAreaDescResol").value.trim();

        if (radioEstadoSol !== "") {
            var resolucion = {
                aceptada: radioEstadoSol === "true" ? true : false,
                descResolucion: descripcion,
                pendiente: false,   
            }

            alert = General.crearAlert("La resolución ha sido enviada correctamente.", "exitoAlert");
            doc.getElementById("formResolucionDia").reset();

            var dia = await this.actualizarDiaSolicitud(diaSol.id, resolucion);

            this.mostrarSolicitudesPendientes("empresa");
            div.insertBefore(alert, doc.getElementById("tituloCalendario"));  

        } else {
            alert = General.crearAlert("Error en la introducción de datos.", "errorAlert");
            div.insertBefore(alert, doc.getElementById("tituloCalendario"));
        }

    }

    asignarEvBtnResolverResolucion() {
        var btn = doc.getElementById("btnResolucionSol");

        btn.addEventListener(
            "click",
            (e) => {
                this.resolverSolicitud();
            },
            false
        );
    }

    asignarEvEnlAbrirModalResolucion() {
        var enl = doc.getElementsByClassName("enlResponderSol");

        for (let i = 0; i < enl.length; i++) {
            enl[i].addEventListener(
                "click",
                (e) => {
                    solicitudEnResolucion = enl[i].id;
                },
                false
            );
        }
    }

    deshacerResolucion = async(idDia) => {
        var resolucion = {
            aceptada: false,
            descResolucion: "",
            pendiente: true,   
        }

        await this.actualizarDiaSolicitud(idDia, resolucion);
        this.mostrarSolicitudesPendientes("empresa")
    }

    asignarEvEnlDeshacerResolucion() {
        var enl = doc.getElementsByClassName("enlDeshacerSol");

        for (let i = 0; i < enl.length; i++) {
            enl[i].addEventListener(
                "click",
                (e) => {
                    this.deshacerResolucion(enl[i].id);
                    doc.getElementById("btnSolPendientes").classList.add("btnMenuDiasSolSlc");
                    doc.getElementById("btnSolResueltas").classList.remove("btnMenuDiasSolSlc");
                    doc.getElementById("tituloSolicitud").innerHTML = "Pendientes";
                },
                false
            );
        }
    }

    asignarEvBtnMostrarPendientes(tipoUsu) {
        var btn = doc.getElementById("btnSolPendientes");

        btn.addEventListener(
            "click",
            (e) => {
                this.mostrarSolicitudesPendientes(tipoUsu);
                if(!btn.classList.contains("btnMenuDiasSolSlc")) {
                    e.target.classList.add("btnMenuDiasSolSlc");
                    doc.getElementById("btnSolResueltas").classList.remove("btnMenuDiasSolSlc");
                    doc.getElementById("tituloSolicitud").innerHTML = "Pendientes";
                }
            },
            false
        );
    }

    mostrarSolicitudesResueltas = async(tipoUsu) => {
        var div = doc.getElementById("divCalSolicitud");
        var arrayDias = [];
        var arrayDiasExpirados = [];
        var fechaHoy = new Date();
        fechaHoy.setDate(fechaHoy.getDate() - 1)
        div.innerHTML = "";
        var empleado;

        if(tipoUsu === "empresa") {
            var diasSol = await this.devolverDiasSolicitadosSegunEstadoEmpresa(this.getUsu().id, false);
            var empleados =  await this.devolverEmpleadosEmpresa(this.getUsu().id)
        } else {
            empleado = await this.devolverEmpleado(this.getUsu().id)
            var diasSol = await this.devolverDiasSolicitadosSegunEstadoEmpleado(empleado.data().idEmpresa, this.getUsu().id, false);
        }

        arrayDiasExpirados = diasSol.docs.filter(dia => new Date(dia.data().fFin.seconds * 1000) < fechaHoy);
        arrayDiasExpirados = arrayDiasExpirados.sort((a, b) => a.data().fFin < b.data().fFin)
        arrayDias = diasSol.docs.filter(dia => new Date(dia.data().fFin.seconds * 1000) > fechaHoy);
        arrayDias = arrayDias.concat(arrayDiasExpirados);

        if (arrayDias.length > 0) {
            arrayDias.map(async(dias) => {
                if(tipoUsu === "empresa") {
                    empleado = empleados.docs.filter(empleadoEmpresa => empleadoEmpresa.id ===  dias.data().idEmpleado)[0];
                    div.innerHTML += `${Plantilla.crearFilaDiaSolicitado(dias, tipoUsu, empleado)}`;
                    this.asignarEvEnlDeshacerResolucion();

                } else {
                    div.innerHTML += `${Plantilla.crearFilaDiaSolicitado(dias, tipoUsu, empleado)}`;
                }
            });

        } else {
            div.innerHTML = `<p class="mensajeInfo">No hay ninguna solicitud resuelta tadavía.</p>`;
        } 

    }

    asignarEvBtnMostrarResueltas(tipoUsu) {
        var btn = doc.getElementById("btnSolResueltas");

        btn.addEventListener(
            "click",
            (e) => {
                this.mostrarSolicitudesResueltas(tipoUsu);
                if(!btn.classList.contains("btnMenuDiasSolSlc")) {
                    e.target.classList.add("btnMenuDiasSolSlc");
                    doc.getElementById("btnSolPendientes").classList.remove("btnMenuDiasSolSlc");
                    doc.getElementById("tituloSolicitud").innerHTML = "Resueltas";
                }
            },
            false
        );
    }

}

//Exportamos.
export { Calendario };