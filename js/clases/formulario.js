import { Workas } from "./workas.js";
import * as Plantilla from "../bibliotecas/plantilla.js";  
import { autentificacion } from "../bibliotecas/datosFirebase.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
   
   /*  --- BIBLIOTECA FORMULARIO ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con los formularios.
var doc = document;

class Formulario extends Workas {
    constructor() {
        super();
    }
 
    
    //Permite iniciar sesión o registrarse con la tecla enter.
    loguearTeclaEnter(id) {
        var inputs = doc.getElementsByClassName("inputForm");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("keypress", function onEvent(event) {
                if (event.key === "Enter") {
                    doc.getElementById(id).click();
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
        form.innerHTML = Plantilla.devolverFormLoginEmpresa();

        return form;
    }

    //Devuelve el formulario de registro de empresa.
    crearFormRegistroEmpresa() {
        var form = doc.createElement("form");
        form.setAttribute("action", "");
        form.setAttribute("id", "formulario");
        form.innerHTML = Plantilla.devolverFormRegistroEmpresa();

        return form;
    }

    //Devuelve el formulario de login de empleado.
    crearFormLoginEmpleado() {
        var form = doc.createElement("form");
        form.setAttribute("action", "");
        form.setAttribute("id", "formulario");
        form.innerHTML = Plantilla.devolverFormLoginEmpleado();

        return form;
    }

    //Devuelve el formulario de registro de empleado.
    crearFormRegistroEmpleado() {
        var form = doc.createElement("form");
        form.setAttribute("action", "");
        form.setAttribute("id", "formulario");
        form.innerHTML = Plantilla.devolverFormRegistroEmpleado();

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
                    tablonAnuncios: [],
                    iconoPerfil: ""
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
                    tablonAnuncios: [],
                    iconoPerfil: ""
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
                    codEmpleado: codEmpleado,
                    iconoPerfil: ""
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
                    codEmpleado: codEmpleado,
                    iconoPerfil: ""
                }
            }
        }

        return usuario;
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

    //Genera un código de 8 carácteres aleatorios.
    generarCodEmpleado() {
        var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var codigo = "";
        for (var i = 0; i < 8; i++) {
            codigo += `${caracteres.charAt(Math.floor(Math.random() * caracteres.length))}`;
        }
        return codigo;
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
                    doc.body.classList.add("bodyFondo");
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

    //Añade al DOM un formulario de creación de empleado.
    opcrearFormEmpleado() {
        var div = doc.getElementById("principal");
        div.innerHTML += Plantilla.devolverCrearEmpleadoForm();
    }
}

//Exportamos.
export { Formulario };