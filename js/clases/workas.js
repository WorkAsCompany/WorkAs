"use strict";
import { BD_Firebase } from "./bd_firebase.js";
import * as Plantilla from "../bibliotecas/plantilla.js";
import * as Calendario from "../bibliotecas/calendario.js";
import { app, autentificacion } from "../bibliotecas/datosFirebase.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
/*  --- BIBLIOTECA WORKAS ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con nuestra aplicación principal.
var doc = document;

class Workas extends BD_Firebase {
    constructor() {
        super();
    }

    //Permite iniciar sesión o registrarse con la tecla enter.
    loguearTeclaEnter() {
        var inputs = doc.getElementsByClassName("inputForm");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("keypress", function onEvent(event) {
                if (event.key === "Enter") {
                    doc.getElementById("btnLoginRegistrar").click();
                }
            });
        }
    }

    //Muestra el botón empresa como seleccionado y el de empleado como no seleccionado.
    selecBtnEmpresa(btnEmpleado, btnEmpresa) {
        btnEmpleado.classList.remove("seleccionado");
        btnEmpresa.classList.remove("noSeleccionado");
        btnEmpleado.classList.add("noSeleccionado");
        btnEmpresa.classList.add("seleccionado");
    }

    //Muestra el botón empleado como seleccionado y el de empresa como no seleccionado.
    selecBtnEmpleado(btnEmpleado, btnEmpresa) {
        btnEmpleado.classList.remove("noSeleccionado");
        btnEmpresa.classList.remove("seleccionado");
        btnEmpleado.classList.add("seleccionado");
        btnEmpresa.classList.add("noSeleccionado");
    }

    //Devuelve el formulario de login de la empresa.
    crearFormLoginEmpresa() {
        var form = doc.createElement("form");
        form.setAttribute("action", "");
        form.setAttribute("id", "formulario");
        form.innerHTML = `<h2>Iniciar sesión</h2><fieldset><legend>Correo electrónico*</legend><label for="correo"></label><input id="correo" class="inputForm"  name="correo" type="email" required="required" placeholder="Introduce el correo"><img class="desaparecer" src="./././img/correcto.png"><img class="desaparecer" src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                      <fieldset><legend>Contraseña*</legend><label for="contrasenya"></label><input id="contrasenya" class="inputForm inputPsswd"  name="contrasenya" type="password" required="required" placeholder="Introduce la contraseña"><img class="mostrarPsswd" src="./././img/mostrarPsswd.png"><img class="desaparecer mostrarPsswd" src="./././img/ocultarPsswd.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                      <div id="btnForm"><input id="btnLoginRegistrar" type="button" value="Iniciar sesión"></div><span id="errorLoginSingup" class="error ocultar"></span>
                      <p id="enlRegistrarLogin" class="enlLogin">¿No tienes cuenta? <a>Registrarse</a></p>`;

        return form;
    }

    //Devuelve el formulario de registro de empresa.
    crearFormRegistroEmpresa() {
        var form = doc.createElement("form");
        form.setAttribute("action", "");
        form.setAttribute("id", "formulario");
        form.innerHTML = `<h2>Registrarse</h2><fieldset><legend>Correo electrónico*</legend><label for="correo"></label><input id="correo" class="inputForm" name="correo" type="email" required="required" placeholder="Ejemplo: nombre@gmail.com..."><img class="desaparecer" src="./././img/correcto.png"><img class="desaparecer" src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                      <fieldset><legend>Nombre o razón social*</legend><label for="razon_social"></label><input id="razonSocial" class="inputForm"  name="razon_social" type="text" required="required" placeholder="Introduce la razón social de tu empresa"><img class="desaparecer" src="./././img/correcto.png"><img class="desaparecer" src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                      <div id="cpDir"><fieldset><legend>Dirección</legend><label for="direccion"></label><input id="direccion" class="inputForm"  name="direccion" type="text" placeholder="Ejemplo: Calle Rey Don Juan II, núm 24"><img class="desaparecer" src="./././img/correcto.png"><img class="desaparecer" src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                      <fieldset><legend>C.P.*</legend><label for="cod_postal"></label><input id="codPostal" class="inputForm"  name="cod_postal" type="text" required="required" placeholder="Ejemplo: 03630"><img class="desaparecer" src="./././img/correcto.png"><img class="desaparecer" src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset></div>
                      <fieldset><legend>Contraseña*</legend><label for="contrasenya"></label><input id="contrasenya" class="inputForm inputPsswd"  name="contrasenya" type="password" required="required" placeholder="Introduce la contraseña"><img class="mostrarPsswd" src="./././img/mostrarPsswd.png"><img class="desaparecer mostrarPsswd" src="./././img/ocultarPsswd.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                      <fieldset><legend>Repetir contraseña*</legend><label for="repetir_contrasenya"></label><input id="repetirContrasenya" class="inputForm inputPsswd"  name="repetir_contrasenya" type="password" required="required" placeholder="Repite la contraseña"><img class="mostrarPsswd" src="./././img/mostrarPsswd.png"><img class="desaparecer mostrarPsswd" src="./././img/ocultarPsswd.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                      <div id="aceptarPoliticas"><input type="checkbox" id="checkAceptarPoliticas" class="inputForm" name="aceptar_politicas"><label for=""> He leído y acepto la </label><a>política de privacidad.</a><span class="error ocultar">(*) Este campo es obligatorio</span></div>
                      <div id="btnForm"><input id="btnLoginRegistrar" type="button" value="Crear cuenta"></div><span id="errorLoginSingup" class="error ocultar">Error</span>
                      <p id="enlRegistrarLogin" class="enlRegistrar">¿Tienes ya una cuenta? <a>Iniciar sesión</a></p>`;

        return form;
    }

    //Devuelve el formulario de login de empleado.
    crearFormLoginEmpleado() {
        var form = doc.createElement("form");
        form.setAttribute("action", "");
        form.setAttribute("id", "formulario");
        form.innerHTML = `<h2>Iniciar sesión</h2><fieldset><legend>Correo Electrónico*</legend><label for="correo"></label><input id="correo" class="inputForm"  name="correo" type="email" required="required" placeholder="Correo"><img class="desaparecer" src="./././img/correcto.png"><img class="desaparecer" src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                      <fieldset><legend>Código empleado*</legend><label for="cod_empleado"></label><input id="codEmpleado" class="inputForm inputPsswd"  name="cod_empleado" type="password" required="required" placeholder="Formato: 8 carácteres(números y letras)"><img class="mostrarPsswd" src="./././img/mostrarPsswd.png"><img class="desaparecer mostrarPsswd" src="./././img/ocultarPsswd.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                      <div id="btnForm"><input id="btnLoginRegistrar" type="button" value="Iniciar sesión"></div><span id="errorLoginSingup" class="error ocultar">Error</span>
                      <p id="enlRegistrarLogin" class="enlLogin">¿No tienes cuenta? <a>Registrarse</a></p>`;

        return form;
    }

    //Devuelve el formulario de registro de empleado.
    crearFormRegistroEmpleado() {
        var form = doc.createElement("form");
        form.setAttribute("action", "");
        form.setAttribute("id", "formulario");
        form.innerHTML = `<h2>Registrarse</h2><fieldset><legend>Correo Electrónico*</legend><label for="correo"></label><input id="correo" class="inputForm"  name="correo" type="email" required="required" placeholder="Correo"><img class="desaparecer" src="./././img/correcto.png"><img class="desaparecer" src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                        <fieldset><legend>Código empleado*</legend><label for="cod_empleado"></label><input id="codEmpleado" class="inputForm inputPsswd"  name="cod_empleado" type="password" required="required" placeholder="Formato: 8 carácteres(números y letras)"><img class="mostrarPsswd" src="./././img/mostrarPsswd.png"><img class="desaparecer mostrarPsswd" src="./././img/ocultarPsswd.png"><span class="error ocultar">Este campo es obligatorio</span></fieldset>
                        <div id="btnForm"><input id="btnLoginRegistrar" type="button" value="Crear cuenta"></div><span id="errorLoginSingup" class="error ocultar">Error</span>
                        <p id="enlRegistrarLogin" class="enlRegistrar">¿Tienes ya una cuenta? <a>Iniciar sesión</a></p>`;

        return form;
    }

    //Asigna el evento de mostrar y ocultar el contenido del input contraseña clicando la imagen.
    asignarEvMostrarPsswd(id) {
        if (doc.getElementById(id) != null) {
            //Asigna el evento a la primera imagen que mostrará el contenido del input.
            doc.getElementById(id).parentNode.getElementsByTagName("img")[0].addEventListener(
                "click",
                (e) => {
                    doc.getElementById(id).parentNode.getElementsByTagName("img")[0].classList.add("desaparecer");
                    doc.getElementById(id).parentNode.getElementsByTagName("img")[1].classList.remove("desaparecer");
                    doc.getElementById(id).setAttribute("type", "text");
                },
                false
            );
            //Asigna el evento a la segunda imagen que ocultará el contenido del input.
            doc.getElementById(id).parentNode.getElementsByTagName("img")[1].addEventListener(
                "click",
                (e) => {
                    doc.getElementById(id).parentNode.getElementsByTagName("img")[0].classList.remove("desaparecer");
                    doc.getElementById(id).parentNode.getElementsByTagName("img")[1].classList.add("desaparecer");
                    doc.getElementById(id).setAttribute("type", "password");
                },
                false
            );
        }
    }

    //Devuelve un booleano comprobando que se cumpla la expresión regular del valor introducido por parámetro.
    comprobarExpReg(valor, expReg) {
        if (expReg.test(valor)) {
            return true;
        } else {
            return false;
        }
    }

    //Devuelve el valor del input comprobando que este exista. 
    devolverValorSiExiste(id) {
        if (doc.getElementById(id) !== null) {
            return doc.getElementById(id).value.trim();
        } else {
            return null;
        }
    }

    //Diversas funciones para comprobar que el valor del input es correcto.
    comprobarRazSocial(razSocial) {
        var expRazSocial = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s,.'-]{2,100}$/;
        return razSocial != null && razSocial != "" && this.comprobarExpReg(razSocial, expRazSocial);
    }

    comprobarDir(dir) {
        var expDir = /^[a-zA-Z0-9\s,.'-]{5,100}$/;
        return dir != null && dir != "" && this.comprobarExpReg(dir, expDir);
    }

    comprobarDni(dni) {
        var expDni = /^[0-9]{8,8}[A-Za-z]$/;
        return dni != null && dni != "" && this.comprobarExpReg(dni, expDni);
    }

    comprobarCorreo(correo) {
        var expCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        return correo != null && correo != "" && this.comprobarExpReg(correo, expCorreo);
    }

    comprobarCP(cp) {
        var expCP = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
        return cp != null && cp != "" && this.comprobarExpReg(cp, expCP);
    }

    comprobarContrasenya(psswd) {
        var noValido = /\s/;
        return psswd != null && psswd != "" && psswd.length >= 8 && !this.comprobarExpReg(psswd, noValido);
    }

    comprobarContrasenyaCorrecta(psswd, psswd2) {
        return psswd === psswd2;
    }

    //Cambiará el diseño del input en función de si es valido o no.
    mostrarInputValido(id, valido, mensaje) {
        //Si es válido mostrará el borde del input de color verde junto a un tick verde.
        if (valido) {
            doc.getElementById(id).classList.remove("incorrecto");
            doc.getElementById(id).classList.add("correcto");
            doc.getElementById(id).parentNode.getElementsByTagName("img")[0].classList.remove("desaparecer");
            doc.getElementById(id).parentNode.getElementsByTagName("img")[1].classList.add("desaparecer");
            doc.getElementById(id).parentNode.getElementsByTagName("span")[0].classList.add("ocultar");
        }
        //Si no es válido mostrará el borde del input de color rojo junto a una cruz roja además de un mensaje informando al usuario del error.
        else {
            doc.getElementById(id).classList.remove("correcto");
            doc.getElementById(id).classList.add("incorrecto");
            doc.getElementById(id).parentNode.getElementsByTagName("img")[0].classList.add("desaparecer");
            doc.getElementById(id).parentNode.getElementsByTagName("img")[1].classList.remove("desaparecer");
            doc.getElementById(id).parentNode.getElementsByTagName("span")[0].innerHTML = `(*) ${mensaje}`;
            doc.getElementById(id).parentNode.getElementsByTagName("span")[0].classList.remove("ocultar");
        }
    }

    //Comprueba que todos los inputs que son requeridos estén rellenados, mostrando mensaje de error si no es así.
    comprobarInputRequeridos() {
        var input = doc.getElementById("formulario").getElementsByClassName("inputForm");
        for (let i = 0; i < input.length; i++) {
            //Monstará mensaje de error si tiene el atributo required.
            if (input[i].hasAttribute("required")) {
                input[i].parentNode.getElementsByClassName("error")[0].innerHTML = "(*) Este campo es obligatorio";
                input[i].parentNode.getElementsByClassName("error")[0].classList.remove("ocultar");
                input[i].classList.remove("correcto");
                input[i].classList.add("incorrecto");
                //Si no es un input de contraseña mostrará una imagen de una cruz roja.
                if (!input[i].classList.contains("inputPsswd")) {
                    input[i].parentNode.getElementsByTagName("img")[0].classList.add("desaparecer");
                    input[i].parentNode.getElementsByTagName("img")[1].classList.remove("desaparecer");
                }
                //Si el input es el checkbox de aceptar políticas solo mostrará un mensaje de error.
            } else if (input[i].id === "checkAceptarPoliticas") {
                if (doc.getElementById("checkAceptarPoliticas").checked) {
                    doc.getElementById("aceptarPoliticas").getElementsByTagName("span")[0].classList.add("ocultar");
                } else {
                    doc.getElementById("aceptarPoliticas").getElementsByTagName("span")[0].classList.remove("ocultar");
                }

            }

        }

    }

    //Asigna un evento al botón de iniciar sesión o registrarse de comprobar que todos los inputs requeridos estén rellenados.
    asignarEvComprobarInputRequeridos() {
        doc.getElementById("btnLoginRegistrar").addEventListener(
            "click",
            (e) => {
                this.comprobarInputRequeridos();
            },
            false
        );

    }

    //Comprueba y muestra que todos los inputs del formulario se hayan rellenado correctamente o que los requeridos no estén vacios. 
    comprobarFormTiempoReal() {
        var correo = this.devolverValorSiExiste("correo");
        var razSocial = this.devolverValorSiExiste("razonSocial");
        var dir = this.devolverValorSiExiste("direccion");
        var cp = this.devolverValorSiExiste("codPostal");
        var psswd = this.devolverValorSiExiste("contrasenya");
        var repPsswd = this.devolverValorSiExiste("repetirContrasenya");

        var dni = this.devolverValorSiExiste("dni");
        var codEmpl = this.devolverValorSiExiste("codEmpleado");

        if (this.comprobarCorreo(correo)) {
            this.mostrarInputValido("correo", true);
        } else if (correo != "" && doc.getElementById("correo") != null) {
            this.mostrarInputValido("correo", false, "Tiene que seguir el formato de email x@x.x");
        }

        if (this.comprobarRazSocial(razSocial)) {
            this.mostrarInputValido("razonSocial", true);
        } else if (razSocial != "" && doc.getElementById("razonSocial") != null) {
            this.mostrarInputValido("razonSocial", false, "Tiene que contener al menos 2 carácteres");
        }

        if (this.comprobarDir(dir)) {
            this.mostrarInputValido("direccion", true);
        } else if (dir != "" && doc.getElementById("direccion") != null) {
            this.mostrarInputValido("direccion", false, "Tiene que contener al menos 5 carácteres");
        }

        if (this.comprobarCP(cp)) {
            this.mostrarInputValido("codPostal", true);
        } else if (cp != "" && doc.getElementById("codPostal") != null) {
            this.mostrarInputValido("codPostal", false, "Debe tener 5 números correctos");
        }

        if (this.comprobarDni(dni)) {
            doc.getElementById("dni").classList.remove("incorrecto");
            this.mostrarInputValido("dni", true);
        } else if (dni != "" && doc.getElementById("dni") != null) {
            this.mostrarInputValido("dni", false, "Debe empezar con 8 números y terminar con una letra");
        }

        //En el caso de las contraseñas no mostrará una imagen de tick verde o cruz roja, debido a que tiene una imagen para poder mostrar la contraseña y ocultarla.
        if (this.comprobarContrasenya(psswd)) {
            doc.getElementById("contrasenya").classList.remove("incorrecto");
            doc.getElementById("contrasenya").classList.add("correcto");
            doc.getElementById("contrasenya").parentNode.getElementsByTagName("span")[0].classList.add("ocultar");
        } else if (psswd != "" && doc.getElementById("contrasenya") != null) {
            doc.getElementById("contrasenya").classList.remove("correcto");
            doc.getElementById("contrasenya").classList.add("incorrecto");
            doc.getElementById("contrasenya").parentNode.getElementsByTagName("span")[0].innerHTML = "(*) Tiene que contener al menos 8 carácteres";
            doc.getElementById("contrasenya").parentNode.getElementsByTagName("span")[0].classList.remove("ocultar");
        }

        if (this.comprobarContrasenyaCorrecta(psswd, repPsswd) && this.comprobarContrasenya(repPsswd)) {
            doc.getElementById("repetirContrasenya").classList.remove("incorrecto");
            doc.getElementById("repetirContrasenya").classList.add("correcto");
            doc.getElementById("repetirContrasenya").parentNode.getElementsByTagName("span")[0].classList.add("ocultar");
        } else if (repPsswd != "" && doc.getElementById("repetirContrasenya") != null) {
            doc.getElementById("repetirContrasenya").classList.remove("correcto");
            doc.getElementById("repetirContrasenya").classList.add("incorrecto");
            doc.getElementById("repetirContrasenya").parentNode.getElementsByTagName("span")[0].innerHTML = "(*) La contraseña no coincide con la introducida";
            doc.getElementById("repetirContrasenya").parentNode.getElementsByTagName("span")[0].classList.remove("ocultar");
        }

        if (this.comprobarContrasenya(codEmpl)) {
            doc.getElementById("codEmpleado").classList.remove("incorrecto");
            doc.getElementById("codEmpleado").classList.add("correcto");
            doc.getElementById("codEmpleado").parentNode.getElementsByTagName("span")[0].classList.add("ocultar");
        } else if (codEmpl != "" && doc.getElementById("codEmpleado") != null) {
            doc.getElementById("codEmpleado").classList.remove("correcto");
            doc.getElementById("codEmpleado").classList.add("incorrecto");
            doc.getElementById("codEmpleado").parentNode.getElementsByTagName("span")[0].innerHTML = "(*) Debe tener exactamente 8 carácteres";
            doc.getElementById("codEmpleado").parentNode.getElementsByTagName("span")[0].classList.remove("ocultar");
        }
        //Asignaremos los eventos de mostrarla y ocultarla.
        this.asignarEvMostrarPsswd("contrasenya");
        this.asignarEvMostrarPsswd("repetirContrasenya");
        this.asignarEvMostrarPsswd("codEmpleado");
    }

    //Asigna al body el evento de que al clicar compruebe que el formulario esté correcto, facilitando al usuario información de manera más sencilla.
    asignarEvComprobarFormTiempoReal() {
        doc.body.addEventListener(
            "click",
            (e) => {
                this.comprobarFormTiempoReal();
            },
            false
        );
    }

    //Devulve un objeto usuario o un string vacío según si los datos del formulario son correctos, se pasará por parámetro si es del formulario de login o de registro.
    devolverUsuarioForm(tipoForm) {
        var correo = this.devolverValorSiExiste("correo");
        var rznSocial = this.devolverValorSiExiste("razonSocial");
        var dir = this.devolverValorSiExiste("direccion");
        var cp = this.devolverValorSiExiste("codPostal");
        var psswd = this.devolverValorSiExiste("contrasenya");
        var repPsswd = this.devolverValorSiExiste("repetirContrasenya");
        var codEmpleado = this.devolverValorSiExiste("codEmpleado");

        var usuario = "";

        if (tipoForm === "login") {
            if (this.comprobarCorreo(correo) && this.comprobarContrasenya(psswd)) {
                usuario = {
                    id: "",
                    correo: correo,
                    rznSocial: "",
                    dir: "",
                    cp: "",
                    psswd: psswd,
                    repetirPsswd: "",
                    tablonAnuncios: []
                }
            }
        } else if (tipoForm === "singup") {
            var checkPoliticas = doc.getElementById("checkAceptarPoliticas");
            if (this.comprobarCorreo(correo) && this.comprobarRazSocial(rznSocial) && this.comprobarDir(dir) && this.comprobarCP(cp) && this.comprobarContrasenya(psswd) && this.comprobarContrasenyaCorrecta(psswd, repPsswd) && this.comprobarContrasenya(repPsswd) && checkPoliticas.checked) {
                usuario = {
                    id: "",
                    correo: correo,
                    rznSocial: rznSocial,
                    dir: dir,
                    cp: cp,
                    psswd: psswd,
                    repetirPsswd: repPsswd,
                    tablonAnuncios: []
                }
            }
        } else if (tipoForm === "loginEmpleado") {
            if (this.comprobarCorreo(correo) && this.comprobarContrasenya(codEmpleado)) {
                var usuario = {
                    idEmpresa: "",
                    dni: "",
                    nombre: "",
                    apellidos: "",
                    correo: correo,
                    puestoTrabajo: "",
                    turno: "",
                    codEmpleado: codEmpleado
                }
            }
        } else if (tipoForm === "registroEmpleado") {
            if (this.comprobarCorreo(correo) && this.comprobarContrasenya(codEmpleado)) {
                var usuario = {
                    idEmpresa: "",
                    dni: "",
                    nombre: "",
                    apellidos: "",
                    correo: correo,
                    puestoTrabajo: "",
                    turno: "",
                    codEmpleado: codEmpleado
                }
            }
        }

        return usuario;
    }

    //Crea un empleado y lo añade a la bd.
    crearUsuarioEmpleado(empleado) {
        createUserWithEmailAndPassword(autentificacion, empleado.correo, empleado.codEmpleado)
            .then((credenciales) => {
                return this.devolverConsultaFiltrarEmpleadoCorreo(empleado.correo);
            }).then((datos) => {
                this.setUsu(datos.docs[0]);
                this.crearPaginaInicialWorkasEmpleado();
            })
            .catch((error) => {

                doc.getElementById("errorLoginSingup").innerHTML = "(*) Error, cuenta ya creada.";
                doc.getElementById("errorLoginSingup").classList.remove("ocultar");
            });
    };

    //Crea un usuario y lo añade a la bd, además de mostrar la interfaz de empresa.
    crearUsuario(usuario) {
        createUserWithEmailAndPassword(autentificacion, usuario.correo, usuario.psswd)
            .then((credenciales) => {
                delete usuario.psswd;
                delete usuario.repetirPsswd;
                usuario.id = credenciales.user.uid;
                return this.anyadirUsuario(usuario);
            }).then((datos) => {
                this.setUsu(datos);
                this.crearPaginaInicialWorkasEmpresa();
            })
            .catch((error) => {

                doc.getElementById("errorLoginSingup").innerHTML = "(*) Error, cuenta ya creada.";
                doc.getElementById("errorLoginSingup").classList.remove("ocultar");
            });
    };

    //Comprueba el empleado.
    iniciarSesionEmpleado(empleado) {
        signInWithEmailAndPassword(autentificacion, empleado.correo, empleado.codEmpleado)
            .then((credenciales) => {
                return this.devolverConsultaFiltrarEmpleadoCorreo(empleado.correo);
            }).then((datos) => {
                if (datos.docs[0] !== undefined) {
                    this.setUsu(datos.docs[0]);
                    this.crearPaginaInicialWorkasEmpleado();
                } else {
                    doc.getElementById("errorLoginSingup").innerHTML = "(*) Error, el usuario no está registrado como empleado.";
                    doc.getElementById("errorLoginSingup").classList.remove("ocultar");
                }
            })
            .catch((error) => {
                doc.getElementById("errorLoginSingup").innerHTML = "(*) Error, el usuario no existe.";
                doc.getElementById("errorLoginSingup").classList.remove("ocultar");
            });
    };

    //Comprueba el usuario, además de mostrar la interfaz de empresa.
    iniciarSesion(usuario) {
        signInWithEmailAndPassword(autentificacion, usuario.correo, usuario.psswd)
            .then((credenciales) => {
                return this.devolverConsultaFiltrarUsuarioId(credenciales.user.uid);
            }).then((datos) => {
                if (datos.docs[0] !== undefined) {
                    this.setUsu(datos.docs[0]);
                    this.crearPaginaInicialWorkasEmpresa();
                } else {
                    doc.getElementById("errorLoginSingup").innerHTML = "(*) Error, el usuario no está registrado como empresa.";
                    doc.getElementById("errorLoginSingup").classList.remove("ocultar");
                }
            })
            .catch((error) => {
                doc.getElementById("errorLoginSingup").innerHTML = "(*) Error, el usuario no existe.";
                doc.getElementById("errorLoginSingup").classList.remove("ocultar");
            });
    };

    //Asigna al botón el evento de que al clicar se inicie sesión o se registre según si es empresa o empleado.
    asignarEvIniciarSesionRegistro(tipoForm) {
        var btnLoginRegistrar = doc.getElementById("btnLoginRegistrar");
        btnLoginRegistrar.addEventListener(
            "click",
            (e) => {
                if (tipoForm === "inicioEmpresa") {
                    var usuario = this.devolverUsuarioForm("login");
                    if (usuario !== "") {
                        this.iniciarSesion(usuario);
                    }
                } else if (tipoForm === "registroEmpresa") {
                    var usuario = this.devolverUsuarioForm("singup");
                    if (usuario !== "") {
                        this.crearUsuario(usuario);
                    }
                } else if (tipoForm === "inicioEmpleado") {
                    var usuario = this.devolverUsuarioForm("loginEmpleado");
                    if (usuario !== "") {
                        this.iniciarSesionEmpleado(usuario);
                    }
                } else if (tipoForm === "registroEmpleado") {
                    var usuario = this.devolverUsuarioForm("registroEmpleado");
                    if (usuario !== "") {
                        this.crearUsuarioEmpleado(usuario);
                    }
                }
            },
            false
        );
    }

    //Al darle click al enlace cambiará entre el formulario de login y registro de empresa.
    cambiarFormRegistrarLogin() {
        var enlRegistrarLogin = doc.getElementById("enlRegistrarLogin").getElementsByTagName("a")[0];

        enlRegistrarLogin.addEventListener(
            "click",
            (e) => {
                if (doc.getElementById("enlRegistrarLogin").classList.contains("enlLogin")) {
                    Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), this.crearFormRegistroEmpresa());
                    this.asignarEvIniciarSesionRegistro("registroEmpresa");
                } else if (doc.getElementById("enlRegistrarLogin").classList.contains("enlRegistrar")) {
                    Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), this.crearFormLoginEmpresa());
                    this.asignarEvIniciarSesionRegistro("inicioEmpresa");
                }
                //Se le vuelve a asignar el mismo evento al enlace.
                this.cambiarFormRegistrarLogin()
                this.asignarEvComprobarFormTiempoReal();
                this.asignarEvComprobarInputRequeridos();
                this.loguearTeclaEnter();
            },
            false
        );
    }

    //Al darle click al enlace cambiará entre el formulario de login y registro de empleado.
    cambiarFormRegistrarLoginEmpleado() {
        var enlRegistrarLogin = doc.getElementById("enlRegistrarLogin").getElementsByTagName("a")[0];

        enlRegistrarLogin.addEventListener(
            "click",
            (e) => {
                if (doc.getElementById("enlRegistrarLogin").classList.contains("enlLogin")) {
                    Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), this.crearFormRegistroEmpleado());
                    this.asignarEvIniciarSesionRegistro("registroEmpleado");
                } else if (doc.getElementById("enlRegistrarLogin").classList.contains("enlRegistrar")) {
                    Plantilla.RemplazarElemHijo(doc.getElementById("formLogin"), doc.getElementById("formulario"), this.crearFormLoginEmpleado());
                    this.asignarEvIniciarSesionRegistro("inicioEmpleado");
                }
                //Se le vuelve a asignar el mismo evento al enlace.
                this.cambiarFormRegistrarLoginEmpleado()
                this.asignarEvComprobarFormTiempoReal();
                this.asignarEvComprobarInputRequeridos();
                this.loguearTeclaEnter();
            },
            false
        );
    }

    //Añade al DOM un formulario de creación de empleado.
    opcrearFormEmpleado() {
        var div = doc.getElementById("principal");
        div.innerHTML = `<form id="formCrearEmpleado" action=''>
                        <fieldset>
                        <legend>DNI</legend>
                        <input id="txtDni" type="text" placeholder="Introduce el dni">
                        </fieldset>	
                         <fieldset>
                         <legend>Nombre Empleado</legend>
                            <input id="txtNombre" type="text" placeholder="Introduce el nombre">
                         </fieldset>		
                         <fieldset>
                         <legend>Apellidos Empleado</legend>
                            <input id="txtApellidos" type="text" placeholder="Introduce los apellidos">
                         </fieldset>
                         <fieldset>
                         <legend>Correo electrónico</legend>
                            <input id="txtEmail" type="email" placeholder="Introduce el email">
                         </fieldset>
                         <fieldset>
                         <legend>Puesto trabajo</legend>
                            <input id="txtPuestoTrabajo" type="text" placeholder="Introduce el puesto de trabajo">
                         </fieldset>
                         <fieldset>
                         <label for="turnoJornada">Elije el turno</label>
                            <select name="turnoJornada" id="turnoJornada">
                                <option value="noSelec">No seleccionado</option>
                                <option value="Diurno">Diurno</option>
                                <option value="Mixto">Mixto</option>
                                <option value="Nocturno">Nocturno</option>
                            </select> 
                         </fieldset>
                         <p class="error ocultar">(*) Error en la introducción de datos.</p>
                         <div id="divBtnCrearEmpleado"><input id="btnCrearEmpleado" type="button" value="Crear"></div>
                        </form>`;
    }

    //Genera un código de 8 carácteres aleatorios.
    generarCodEmpleado() {
        var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var codigo = "";
        for (var i = 0; i < 8; i++) {
            codigo += `${caracteres.charAt(Math.floor(Math.random() * caracteres.length))}`;
        }
        return codigo;
    }

    //Recoge los datos del formulario y si son correctos crea un nuevo empleado y lo añade a la empresa correspondiente.
    opAnyadirEmpleado = async() => {
        var div = doc.getElementById("principal");

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
                codEmpleado: codEmpleado
            }

            var existeEmpleado = await this.devolverConsultaFiltrarEmpleadoCorreo(empleado.correo);

            if (existeEmpleado.docs.length > 0) {
                div.getElementsByClassName("error")[0].innerHTML = "(*) Error, ya existe el empleado.";
                div.getElementsByClassName("error")[0].classList.remove("ocultar");
            } else {
                await this.anyadirEmpleado(empleado);
                div.innerHTML = `<p class="infoMensajeCorrecto">Empleado creado correctamente.</p>`;
                this.opListarEmpleados(true);
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

    //Asigna el evento de crear el formulario y añadirle el evento de crear empleado a este.
    asignarEvOpAnyadirEmpleado(btn) {
        btn.addEventListener(
            "click",
            (e) => {
                this.opcrearFormEmpleado();
                this.asignarEvAnyadirEmpleado();
            },
            false
        );
    }

    //Lista los empleados de una empresa en una tabla, con funciones de modificar y eliminar a este.
    opListarEmpleados = async(anyadido) => {
        var div = doc.getElementById("principal");
        if (!anyadido) {
            div.innerHTML = "<h2 id='tituloListEmpleado'>Listado de Empleados</h2>";
        }
        var filas = "";
        var empleados = await this.devolverEmpleadosEmpresa(this.getUsu().id);

        if (empleados.docs.length > 0) {
            empleados.docs.map((empleado) => {
                filas += `${Plantilla.crearFilaDatosEmpleado(empleado)}`;
            });

            div.innerHTML += `<div class="tabla"><div class="cabeceraTabla"><div class="celda">Código empleado</div><div class="celda">DNI</div><div class="celda">Apellidos</div><div class="celda">Nombre</div>
            <div class="celda">Correo</div><div class="celda">Puesto Trabajo</div><div class="celda">Turno</div><div class="celda"></div></div>${filas}</div>`;
        } else {
            div.innerHTML = `<p class="mensajeInfo">No hay empleados añadidos todavía.</p>`;
        }

        this.asignarEvOpBorrarEmpleado();
        this.asignarBtnEvEditarEmpleado();
    }

    //Elimina a un empleado de la bd y vuelve a listar a los empleados.
    quitarEmpleado = async(btn) => {
        //var divEmpleado = btn.parentNode.parentNode.parentNode;
        var div = doc.getElementById("principal");
        div.innerHTML = "";

        await this.eliminarEmpleadoEmpresa(btn.parentNode.parentNode.parentNode.id);
        this.opListarEmpleados(false);
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

    //Permite editar los datos de un empleado con inputs.
    editarEmpleado(btn) {
        var divEmpleado = btn.parentNode.parentNode.parentNode;
        var editable = divEmpleado.getElementsByClassName("editable");

        for (let i = 0; i < editable.length; i++) {
            var contenido = editable[i].textContent;

            if (editable[i].classList.contains("turno")) {
                if (contenido === "Diurno") {
                    editable[i].innerHTML = `<select name="turnoJornada" id="turnoJornada">
                                                <option value="Diurno">Diurno</option>
                                                <option value="Mixto">Mixto</option>
                                                <option value="Nocturno">Nocturno</option>
                                            </select> `;
                } else if (contenido === "Mixto") {
                    editable[i].innerHTML = `<select name="turnoJornada" id="turnoJornada">
                                                <option value="Mixto">Mixto</option>
                                                <option value="Diurno">Diurno</option>                                            
                                                <option value="Nocturno">Nocturno</option>
                                            </select> `;
                } else if (contenido === "Nocturno") {
                    editable[i].innerHTML = `<select name="turnoJornada" id="turnoJornada">
                                                <option value="Nocturno">Nocturno</option>
                                                <option value="Diurno">Diurno</option>
                                                <option value="Mixto">Mixto</option>
                                            </select> `;
                }
            } else {
                editable[i].innerHTML = `<input type="text" value ="${contenido}">`;
            }
        }
    }

    //Permite confirmar los cambios de la edición del empleado y añadirlos a la bd, cogiendo los valores de los inputs.
    terminarEditarEmpleado = async(btn) => {
        var divEmpleado = btn.parentNode.parentNode.parentNode;
        var editable = divEmpleado.getElementsByClassName("editable");
        var dni, apellidos, nombre, puestoTrabajo, turno;

        for (let i = 0; i < editable.length; i++) {
            if (editable[i].classList.contains("dni")) {
                dni = editable[i].getElementsByTagName("input")[0].value.trim();
                editable[i].innerHTML = dni;
            } else if (editable[i].classList.contains("apellidos")) {
                apellidos = editable[i].getElementsByTagName("input")[0].value.trim();
                editable[i].innerHTML = apellidos;
            } else if (editable[i].classList.contains("nombre")) {
                nombre = editable[i].getElementsByTagName("input")[0].value.trim();
                editable[i].innerHTML = nombre;
            } else if (editable[i].classList.contains("puestoTrabajo")) {
                puestoTrabajo = editable[i].getElementsByTagName("input")[0].value.trim();
                editable[i].innerHTML = puestoTrabajo;
            } else if (editable[i].classList.contains("turno")) {
                turno = editable[i].getElementsByTagName("select")[0].value;
                editable[i].innerHTML = turno;
            }
        }

        var empleadoMod = {
            dni: dni,
            nombre: nombre,
            apellidos: apellidos,
            puestoTrabajo: puestoTrabajo,
            turno: turno
        }

        await this.actualizarEmpleado(divEmpleado.id, empleadoMod);
    }

    //Desactiva o activa los botones de editar según el parámetro.
    desactivarBtnEditar(btnEditar, desactivar) {
        if (desactivar) {
            for (let i = 0; i < btnEditar.length; i++) {
                if (btnEditar[i].classList.contains("editarSi")) {
                    btnEditar[i].setAttribute("disabled", "disabled");
                }
            }
        } else {
            for (let i = 0; i < btnEditar.length; i++) {
                if (btnEditar[i].classList.contains("editarSi")) {
                    btnEditar[i].removeAttribute("disabled");
                }
            }
        }
    }

    //Asigna los eventos de editar y de confirmar la edición a los botones editar.
    asignarBtnEvEditarEmpleado() {
        var btnEditar = doc.getElementById("principal").getElementsByClassName("btnEditar");
        for (let i = 0; i < btnEditar.length; i++) {
            btnEditar[i].addEventListener(
                "click",
                (e) => {
                    if (e.target.parentNode.classList.contains("editarSi")) {
                        this.editarEmpleado(e.target);
                        e.target.parentNode.classList.add("editarNo");
                        e.target.parentNode.classList.remove("editarSi");
                        e.target.parentNode.classList.add("btnConfirmar");
                        e.target.parentNode.classList.remove("btnEditar");
                        e.target.parentNode.innerHTML = `<img src="././././img/confirmar.png" />`;
                        this.desactivarBtnEditar(btnEditar, true);
                    } else {
                        this.terminarEditarEmpleado(e.target);
                        e.target.parentNode.classList.add("editarSi");
                        e.target.parentNode.classList.remove("editarNo");
                        e.target.parentNode.classList.add("btnEditar");
                        e.target.parentNode.classList.remove("btnConfirmar");
                        e.target.parentNode.innerHTML = `<img src="././././img/editar.png" />`;
                        this.desactivarBtnEditar(btnEditar, false);
                    }
                },
                false
            );
        }
    }

    //Asigna el evento de listar empleados al botón listar.
    asignarEvOpListarEmpleados(btn) {
        btn.addEventListener(
            "click",
            (e) => {
                this.opListarEmpleados(false);
            },
            false
        );
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



    //Muestra la página principal con todas las funciones correspondientes si se ha iniciado sesión como empresa.
    crearPaginaInicialWorkasEmpresa = async() => {
        doc.getElementById("contenido").outerHTML = Plantilla.crearPaginaInicialEmpresa(await this.devolverEmpresa(this.getUsu().id));
        var opcionEmpleados = doc.getElementsByClassName("listOpcionesEmpleado");
        var opcionTablonAnuncio = doc.getElementsByClassName("listOpcionesTablonAnuncio");
        var opPerfil = doc.getElementById("iconoPerfil");
        var opCalendario = doc.getElementById("enlCalendario");
        this.mostrarDatosEmpresa();

        //Añade las funciones a los elementos de menú de empleado.
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
        );
    }

    crearPaginaInicialWorkasEmpleado = async() => {
        doc.getElementById("contenido").outerHTML = Plantilla.crearPaginaInicialEmpleado(await this.devolverEmpleado(this.getUsu().id));
        var opTablonAnuncio = doc.getElementById("enlTablonAnuncio");
        var opPerfil = doc.getElementById("iconoPerfil");
        var opCalendario = doc.getElementById("enlCalendario");
        this.mostrarDatosEmpleado();

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
}
//Exportamos.
export { Workas };