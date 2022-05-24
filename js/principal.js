"use strict";
import { Formulario } from "./clases/formulario.js";
import * as Plantilla from "./bibliotecas/plantilla.js";
import * as General from "./bibliotecas/general.js";

window.onload = function() {
    var doc = document;

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
            General.evTeclaEnterForm("btnLoginRegistrar", "inputForm");
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
            General.evTeclaEnterForm("btnLoginRegistrar", "inputForm");
        },
        false
    );

    formulario.asignarEvIniciarSesionRegistro("inicioEmpresa");
    formulario.cambiarFormRegistrarLogin();
    General.evTeclaEnterForm("btnLoginRegistrar", "inputForm");

    formulario.comprobarSesion();
};