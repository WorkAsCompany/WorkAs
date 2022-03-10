"use strict";
/*  --- BIBLIOTECA CALENDARIO ---  */
import * as Plantilla from "./plantilla.js";
var doc = document;
var urlCal = "https://holidays.abstractapi.com/v1/?api_key=533e34e406694d238940aec2d4c08f7f&country=ES&year=2020";

//Devuelve una promesa
export function devolverPromesa(url) {
    var peticion = new Request(url, {
        method: "GET",
        headers: new Headers({
            "Content-type": "application/x-www-form-urlencoded",
        }),
    });

    return new Promise((resolver, rechazar) => {
        fetch(peticion)
            .then((respuesta) => {
                return respuesta.json();
            })
            .then((datos) => {
                resolver(datos);
            })
            .catch(() => {
                rechazar(new Error("Ha habido un error."));
            });
    });
}

//Modifica la información del calendario del día seleccionado.
export function modificarInfoCalendario() {
    var dias = doc.getElementsByClassName("calendarioDia");
    for (let i = 0; i < dias.length; i++) {
        dias[i].addEventListener(
            "click",
            (e) => {
                var infoCal = doc.getElementById("calendarioInfo");
                infoCal.innerHTML = dias[i].getElementsByClassName("infoCalOculta")[0].innerHTML;
            },
            false
        );
    }
}

//Devuelve un div con los días festivos de un mes.
export function crearCalendarioMes(calendario, mes) {
    var calendarioMes = "";
    for (let i = 0; i < calendario.length; i++) {
        calendarioMes += Plantilla.crearDiaCalendario(calendario[i], mes);
    }
    return calendarioMes;
}

//Asignación a cada enlace del mes la propiedad de mostrar los días festivos de ese mes.
export function evMesEnero() {
    var mes = doc.getElementById("enero");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "January, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=01`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "January");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesFebrero() {
    var mes = doc.getElementById("febrero");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "February, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=02`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "February");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesMarzo() {
    var mes = doc.getElementById("marzo");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "March, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=03`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "March");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesAbril() {
    var mes = doc.getElementById("abril");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "April, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=04`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "April");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesMayo() {
    var mes = doc.getElementById("mayo");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "May, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=05`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "May");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesJunio() {
    var mes = doc.getElementById("junio");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "June, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=06`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "June");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesJulio() {
    var mes = doc.getElementById("julio");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "July, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=07`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "July");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesAgosto() {
    var mes = doc.getElementById("agosto");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "August, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=08`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "August");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesSeptiembre() {
    var mes = doc.getElementById("septiembre");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "September, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=09`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "September");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesOctubre() {
    var mes = doc.getElementById("octubre");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "October, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=10`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "October");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesNoviembre() {
    var mes = doc.getElementById("noviembre");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "November, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=11`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "November");
            modificarInfoCalendario();
        },
        false
    );
}

export function evMesDiciembre() {
    var mes = doc.getElementById("diciembre");
    mes.addEventListener(
        "click",
        async(e) => {
            doc.getElementById("mesTituloCal").innerHTML = "December, ";
            var mesPromesa = await devolverPromesa(`${urlCal}&month=12`);
            doc.getElementById("calendarioMes").innerHTML = crearCalendarioMes(mesPromesa, "December");
            modificarInfoCalendario();
        },
        false
    );
}

//Recopilación de todos los eventos del menú de meses.
export function evMeses() {
    evMesEnero();
    evMesFebrero();
    evMesMarzo();
    evMesAbril();
    evMesMayo();
    evMesJunio();
    evMesJulio();
    evMesAgosto();
    evMesSeptiembre();
    evMesOctubre();
    evMesNoviembre();
    evMesDiciembre();
}

//Exportamos.
export * from './calendario.js'