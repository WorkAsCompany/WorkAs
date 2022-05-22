"use strict";
import { BD_Firebase } from "./bd_firebase.js";
import * as Plantilla from "../bibliotecas/plantilla.js";

import * as General from "../bibliotecas/general.js";

/*  --- CLASE ROTAR TURNO ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con la rotación de turnos de los empleados pertenecientes a una empresa.
var doc = document;

var arrayTurnoDiurno = [];
var arrayTurnoMixto = [];
var arrayTurnoNocturno = [];

class RotarTurno extends BD_Firebase {
    constructor() {
        super();
    }

    modificarTurno = (btn) => {
        General.desactivarActivarBotones("btnTurno", true);
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
            for (let empleado of arrayTurnoDiurno) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Nocturno")
                promesas.push(promesa);
            }
            for (let empleado of arrayTurnoNocturno) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Diurno")
                promesas.push(promesa);
            }

        } else if (btn === "mixtoToDiurno") {
            for (let empleado of arrayTurnoMixto) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Diurno")
                promesas.push(promesa);
            }
            for (let empleado of arrayTurnoDiurno) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Mixto")
                promesas.push(promesa);
            }

        } else if (btn === "mixtoToNocturno") {
            for (let empleado of arrayTurnoMixto) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Nocturno")
                promesas.push(promesa);
            }
            for (let empleado of arrayTurnoNocturno) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Mixto")
                promesas.push(promesa);
            }

        } else if (btn === "nocturnoToDiurno") {
            for (let empleado of arrayTurnoNocturno) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Diurno")
                promesas.push(promesa);
            }
            for (let empleado of arrayTurnoDiurno) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Nocturno")
                promesas.push(promesa);
            }

        } else if (btn === "nocturnoToMixto") {
            for (let empleado of arrayTurnoNocturno) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Mixto")
                promesas.push(promesa);
            }
            for (let empleado of arrayTurnoMixto) {
                var promesa = this.modificarTurnoEmpleado(empleado, "Nocturno")
                promesas.push(promesa);
            }
        }
        
        return Promise.all(promesas);
    }

    asigarEvBtnModificarTurno(puesto) {
        var btn = doc.getElementsByClassName("btnTurno");
        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener(
                "click",
                async(e) => {
                    await this.modificarTurno(btn[i].id);
                    this.crearArrayTurno(puesto);
                    arrayTurnoDiurno = [];
                    arrayTurnoMixto = [];
                    arrayTurnoNocturno = [];

                },
                false
            );
        }
    }

    crearArrayTurno = async(puesto) =>  {
        var empleados = await this.devolverEmpleadosEmpresa(this.getUsu().id);
        empleados = empleados.docs.filter(empleado => empleado.data().puestoTrabajo.toLowerCase() === puesto.toLowerCase());

        empleados.map((empleado) => {
            if (empleado.data().turno === "Diurno") {
                arrayTurnoDiurno.push(empleado);
            } else if (empleado.data().turno === "Mixto") {
                arrayTurnoMixto.push(empleado);
            } else if (empleado.data().turno === "Nocturno") {
                arrayTurnoNocturno.push(empleado);
            }
        });

        doc.getElementById("cardTurnoDiurno").getElementsByClassName("divCardEmpleados")[0].innerHTML = Plantilla.crearFilasCardRotarTurno(arrayTurnoDiurno);
        doc.getElementById("cardTurnoMixto").getElementsByClassName("divCardEmpleados")[0].innerHTML = Plantilla.crearFilasCardRotarTurno(arrayTurnoMixto);
        doc.getElementById("cardTurnoNocturno").getElementsByClassName("divCardEmpleados")[0].innerHTML = Plantilla.crearFilasCardRotarTurno(arrayTurnoNocturno);

        General.desactivarActivarBotones("btnTurno", false);
    }

    buscarEmpleadoPorPuesto = async() =>  {
        var inputBuscar = doc.getElementById("inputBuscarPorPuesto");
        doc.getElementById("spanPuestoTrabajo").innerHTML = inputBuscar.value;

        await this.crearArrayTurno(inputBuscar.value)

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
        if(doc.getElementById("divPrincipalTabla") != null) {
            doc.getElementById("divPrincipalTabla").remove();
        }

        var divRotar = doc.createElement("div")
        divRotar.id = "divPrincipalRotarTurno";
        doc.getElementById("principal").appendChild(divRotar);

        doc.getElementById("divPrincipalRotarTurno").innerHTML = Plantilla.crearDivRotarTurno();
        this.asignarEvBuscarEmpleadoPorPuesto();

        var div = doc.getElementById("divCardRotarTurno");
        div.innerHTML += Plantilla.crearCardRotarTurno("diurno");
        div.innerHTML += Plantilla.crearCardRotarTurno("mixto");
        div.innerHTML += Plantilla.crearCardRotarTurno("nocturno");
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
}

//Exportamos.
export { RotarTurno };