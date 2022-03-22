"use strict";
import { Workas } from "./clases/workas.js";
import * as Plantilla from "./bibliotecas/plantilla.js";
window.onload = function() {
    var doc = document;
    var workas = new Workas();

    var btnEmpleado = doc.getElementById("enlaceEmpleado");
    var btnEmpresa = doc.getElementById("enlaceEmpresa");

    workas.selecBtnEmpresa(btnEmpleado, btnEmpresa);
    Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), workas.crearFormLoginEmpresa());
    workas.asignarEvComprobarInputRequeridos();
    workas.asignarEvComprobarFormTiempoReal();

    //Asignamos el evento para cambiar de formulario al clicar el botón empleado
    btnEmpleado.addEventListener(
        "click",
        (e) => {
            workas.selecBtnEmpleado(btnEmpleado, btnEmpresa);
            Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), workas.crearFormLoginEmpleado());
            workas.cambiarFormRegistrarLoginEmpleado();
            workas.asignarEvComprobarFormTiempoReal();
            workas.asignarEvComprobarInputRequeridos();
            workas.asignarEvIniciarSesionRegistro("inicioEmpleado");
        },
        false
    );
    //Asignamos el evento para cambiar de formulario al clicar el botón empresa
    btnEmpresa.addEventListener(
        "click",
        (e) => {
            workas.selecBtnEmpresa(btnEmpleado, btnEmpresa);
            Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), workas.crearFormLoginEmpresa());
            workas.cambiarFormRegistrarLogin();
            workas.asignarEvComprobarFormTiempoReal();
            workas.asignarEvComprobarInputRequeridos();
            workas.asignarEvIniciarSesionRegistro("inicioEmpresa");
        },
        false
    );
    workas.asignarEvIniciarSesionRegistro("inicioEmpresa");
    workas.cambiarFormRegistrarLogin();
};