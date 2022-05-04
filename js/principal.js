"use strict";
import { Workas } from "./clases/workas.js";
import { Formulario } from "./clases/formulario.js";
import * as Plantilla from "./bibliotecas/plantilla.js";
window.onload = function() {
    var doc = document;

    var workas = new Workas();
    var formulario = new Formulario();

    var btnEmpleado = doc.getElementById("enlaceEmpleado");
    var btnEmpresa = doc.getElementById("enlaceEmpresa");

    formulario.selecBtnEmpresa(btnEmpleado, btnEmpresa);
    Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), formulario.crearFormLoginEmpresa());
    formulario.asignarEvComprobarInputRequeridos();
    formulario.asignarEvComprobarFormTiempoReal();

    //Asignamos el evento para cambiar de formulario al clicar el botón empleado
    btnEmpleado.addEventListener(
        "click",
        (e) => {
            formulario.selecBtnEmpleado(btnEmpleado, btnEmpresa);
            Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), formulario.crearFormLoginEmpleado());
            formulario.cambiarFormRegistrarLoginEmpleado();
            formulario.asignarEvComprobarFormTiempoReal();
            formulario.asignarEvComprobarInputRequeridos();
            formulario.asignarEvIniciarSesionRegistro("inicioEmpleado");
            formulario.loguearTeclaEnter("btnLoginRegistrar");
        },
        false
    );
    //Asignamos el evento para cambiar de formulario al clicar el botón empresa
    btnEmpresa.addEventListener(
        "click",
        (e) => {
            formulario.selecBtnEmpresa(btnEmpleado, btnEmpresa);
            Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), formulario.crearFormLoginEmpresa());
            formulario.cambiarFormRegistrarLogin();
            formulario.asignarEvComprobarFormTiempoReal();
            formulario.asignarEvComprobarInputRequeridos();
            formulario.asignarEvIniciarSesionRegistro("inicioEmpresa");
            formulario.loguearTeclaEnter("btnLoginRegistrar");
        },
        false
    );

    formulario.asignarEvIniciarSesionRegistro("inicioEmpresa");
    formulario.cambiarFormRegistrarLogin();
    formulario.loguearTeclaEnter("btnLoginRegistrar");

    formulario.comprobarSesion();
};