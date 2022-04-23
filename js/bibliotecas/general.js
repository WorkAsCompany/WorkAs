"use strict";
/*  --- BIBLIOTECA GENERAL ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para el resto de clases o bibliotecas de nuestra aplicación.
var doc = document;
var contadorAlerts = 1;

export const crearAlert = (msg, tipoAlert) => {
    var alert = doc.createElement("div");
    var idAlert = `alert${contadorAlerts}`;

    alert.id = idAlert;
    alert.classList.add("animate__animated", "animate__flipInX")

    setTimeout(function() {
        if(doc.getElementById(idAlert) != null) {
            doc.getElementById(idAlert).remove("animate__fadeOut");
        }

    },6000);

   setTimeout(function() {
        if(doc.getElementById(idAlert) != null) {
            doc.getElementById(idAlert).classList.remove("animate__flipInX");
            doc.getElementById(idAlert).classList.add("animate__fadeOut");
        }

    },5000);

    if(tipoAlert === "exitoAlert") {
        alert.innerHTML = `<div class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                    <div>
                        ${msg}
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>`;
    } else if(tipoAlert === "errorAlert") {
        alert.innerHTML = `<div class="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                        ${msg}
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>`;
    }
    contadorAlerts++;
    return alert;
}

//Crea un div que contendrá información del día festivo.
export const desactivarActivarBotones = (clase, desactivar) => {
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

//Exportamos.
export * from './general.js'