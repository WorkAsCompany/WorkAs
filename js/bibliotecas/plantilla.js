"use strict";
/*  --- BIBLIOTECA PLANTILLA ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para interactuar con el DOM.
var doc = document;
const month = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var contadorCollapse = 1;

//Añade el elemento pasado por parámetro a otro elemento con la id pasada por parámetro.
export const anyadirElemento = (id, elemento) => {
    doc.getElementById(id).appendChild(elemento);
}

//Limpia el formulario pasado por parámetro.
export const limpiar = (formulario) => {
    formulario.reset();
}

//Añade o reemplaza un elemento según si existe este. Se introduce el elemento Padre, el elemento hijo, y el nuevo elemento.
export const RemplazarElemHijo = (padre, hijo, nuevoElemento) => {
    if (hijo == null) {
        padre.appendChild(nuevoElemento);
    } else {
        padre.replaceChild(nuevoElemento, hijo);
    }
}

//Devulve la estructura del formulario de login de la empresa.
export const devolverFormLoginEmpresa = () => {
    return `<h2>Iniciar sesión</h2>
            <fieldset>
                <legend>Correo electrónico*</legend><label for="correo"></label><input id="correo" class="inputForm" name="correo"
                    type="email" required="required" placeholder="Introduce el correo"><img class="desaparecer"
                    src="./././img/correcto.png"><img class="desaparecer" src="./././img/incorrecto.png"><span
                    class="error ocultar">Este campo es obligatorio</span>
            </fieldset>
            <fieldset>
                <legend>Contraseña*</legend><label for="contrasenya"></label><input id="contrasenya" class="inputForm inputPsswd"
                    name="contrasenya" type="password" required="required" placeholder="Introduce la contraseña"><img
                    class="mostrarPsswd" src="./././img/mostrarPsswd.png"><img class="desaparecer mostrarPsswd"
                    src="./././img/ocultarPsswd.png"><span class="error ocultar">Este campo es obligatorio</span>
            </fieldset>
            <div id="btnForm"><input id="btnLoginRegistrar" type="button" value="Iniciar sesión"></div><span id="errorLoginSingup"
                class="error ocultar"></span>
            <p id="enlRegistrarLogin" class="enlLogin">¿No tienes cuenta? <a>Registrarse</a></p>`;
}

//Devulve la estructura del formulario de registro de la empresa.
export const devolverFormRegistroEmpresa = () => {
    return `<h2>Registrarse</h2>
            <fieldset>
                <legend>Correo electrónico*</legend><label for="correo"></label><input id="correo" class="inputForm"
                    name="correo" type="email" required="required" placeholder="Ejemplo: nombre@gmail.com..."><img
                    class="desaparecer" src="./././img/correcto.png"><img class="desaparecer"
                    src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span>
            </fieldset>
            <fieldset>
                <legend>Nombre o razón social*</legend><label for="razon_social"></label><input id="razonSocial"
                    class="inputForm" name="razon_social" type="text" required="required"
                    placeholder="Introduce la razón social de tu empresa"><img class="desaparecer"
                    src="./././img/correcto.png"><img class="desaparecer" src="./././img/incorrecto.png"><span
                    class="error ocultar">Este campo es obligatorio</span>
            </fieldset>
            <div id="cpDir">
                <fieldset>
                    <legend>Dirección</legend><label for="direccion"></label><input id="direccion" class="inputForm"
                        name="direccion" type="text" placeholder="Ejemplo: Calle Rey Don Juan II, núm 24"><img
                        class="desaparecer" src="./././img/correcto.png"><img class="desaparecer"
                        src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span>
                </fieldset>
                <fieldset>
                    <legend>C.P.*</legend><label for="cod_postal"></label><input id="codPostal" class="inputForm"
                        name="cod_postal" type="text" required="required" placeholder="Ejemplo: 03630"><img
                        class="desaparecer" src="./././img/correcto.png"><img class="desaparecer"
                        src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span>
                </fieldset>
            </div>
            <fieldset>
                <legend>Contraseña*</legend><label for="contrasenya"></label><input id="contrasenya"
                    class="inputForm inputPsswd" name="contrasenya" type="password" required="required"
                    placeholder="Introduce la contraseña"><img class="mostrarPsswd" src="./././img/mostrarPsswd.png"><img
                    class="desaparecer mostrarPsswd" src="./././img/ocultarPsswd.png"><span class="error ocultar">Este campo
                    es obligatorio</span>
            </fieldset>
            <fieldset>
                <legend>Repetir contraseña*</legend><label for="repetir_contrasenya"></label><input id="repetirContrasenya"
                    class="inputForm inputPsswd" name="repetir_contrasenya" type="password" required="required"
                    placeholder="Repite la contraseña"><img class="mostrarPsswd" src="./././img/mostrarPsswd.png"><img
                    class="desaparecer mostrarPsswd" src="./././img/ocultarPsswd.png"><span class="error ocultar">Este campo
                    es obligatorio</span>
            </fieldset>
            <div id="aceptarPoliticas"><input type="checkbox" id="checkAceptarPoliticas" class="inputForm"
                    name="aceptar_politicas"><label for=""> He leído y acepto la </label> <a>política de privacidad.</a><span
                    class="error ocultar">(*) Este campo es obligatorio</span></div>
            <div id="btnForm"><input id="btnLoginRegistrar" type="button" value="Crear cuenta"></div><span
                id="errorLoginSingup" class="error ocultar">Error</span>
            <p id="enlRegistrarLogin" class="enlRegistrar">¿Tienes ya una cuenta? <a>Iniciar sesión</a></p>`;
}

//Devulve la estructura del formulario de login de la empleado.
export const devolverFormLoginEmpleado = () => {
    return `<h2>Iniciar sesión</h2>
            <fieldset>
                <legend>Correo Electrónico*</legend><label for="correo"></label><input id="correo" class="inputForm" name="correo"
                    type="email" required="required" placeholder="Correo"><img class="desaparecer" src="./././img/correcto.png"><img
                    class="desaparecer" src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span>
            </fieldset>
            <fieldset>
                <legend>Código empleado*</legend><label for="cod_empleado"></label><input id="codEmpleado"
                    class="inputForm inputPsswd" name="cod_empleado" type="password" required="required"
                    placeholder="Formato: 8 carácteres(números y letras)"><img class="mostrarPsswd"
                    src="./././img/mostrarPsswd.png"><img class="desaparecer mostrarPsswd" src="./././img/ocultarPsswd.png"><span
                    class="error ocultar">Este campo es obligatorio</span>
            </fieldset>
            <div id="btnForm"><input id="btnLoginRegistrar" type="button" value="Iniciar sesión"></div><span id="errorLoginSingup"
                class="error ocultar">Error</span>
            <p id="enlRegistrarLogin" class="enlLogin">¿No tienes cuenta? <a>Registrarse</a></p>`;
}

//Devulve la estructura del formulario de registro del empleado.
export const devolverFormRegistroEmpleado = () => {
    return `<h2>Registrarse</h2>
            <fieldset>
                <legend>Correo Electrónico*</legend><label for="correo"></label><input id="correo" class="inputForm" name="correo"
                    type="email" required="required" placeholder="Correo"><img class="desaparecer" src="./././img/correcto.png"><img
                    class="desaparecer" src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span>
            </fieldset>
            <fieldset>
                <legend>Código empleado*</legend><label for="cod_empleado"></label><input id="codEmpleado"
                    class="inputForm inputPsswd" name="cod_empleado" type="password" required="required"
                    placeholder="Formato: 8 carácteres(números y letras)"><img class="mostrarPsswd"
                    src="./././img/mostrarPsswd.png"><img class="desaparecer mostrarPsswd" src="./././img/ocultarPsswd.png"><span
                    class="error ocultar">Este campo es obligatorio</span>
            </fieldset>
            <div id="btnForm"><input id="btnLoginRegistrar" type="button" value="Crear cuenta"></div><span id="errorLoginSingup"
                class="error ocultar">Error</span>
            <p id="enlRegistrarLogin" class="enlRegistrar">¿Tienes ya una cuenta? <a>Iniciar sesión</a></p>`;
}

//Devulve la estructura del formulario de crear un empleado.
export const devolverCrearEmpleadoForm = () => {
    return `<div class="modal fade" id="modalAnyadirEmpleado" tabindex="-1" aria-labelledby="modalAnyadirEmpleadoLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalAnyadirEmpleadoLabel">Añadir Empleado</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div id="divFormCrearEmpleado" class="modal-body">
                        <form id="formCrearEmpleado">
                            <div class="mb-3">
                                <label for="txtDni" class="form-label">DNI</label>
                                <input type="text" class="form-control inputAnyadirEmpleado" id="txtDni" placeholder="Introduce el dni">
                                <div id="dniMsgError" class="form-text">We'll never share your email with anyone
                                    else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtNombre" class="form-label">Nombre Empleado</label>
                                <input type="text" class="form-control inputAnyadirEmpleado" id="txtNombre" placeholder="Introduce el nombre">
                                <div id="nombreEmpeladoMsgError" class="form-text">We'll never share your email
                                    with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtApellidos" class="form-label">Apellidos Empleado</label>
                                <input type="text" class="form-control inputAnyadirEmpleado" id="txtApellidos" placeholder="Introduce los apellidos">
                                <div id="apellidosEmpeladoMsgError" class="form-text">We'll never share your
                                    email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEmail" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control inputAnyadirEmpleado" id="txtEmail" placeholder="Introduce el email">
                                <div id="emailMsgError" class="form-text">We'll never share your email with
                                    anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtPuestoTrabajo" class="form-label">Puesto trabajo</label>
                                <input type="text" class="form-control inputAnyadirEmpleado" id="txtPuestoTrabajo"
                                    placeholder="Introduce el puesto de trabajo">
                                <div id="puestoMsgError" class="form-text">We'll never share your email with
                                    anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="turnoJornada" class="form-label">Elije el turno</label>
                                <select id="turnoJornada" class="form-select inputAnyadirEmpleado" aria-label="Select">
                                    <option value="noSelec">No seleccionado</option>
                                    <option value="Diurno">Diurno</option>
                                    <option value="Mixto">Mixto</option>
                                    <option value="Nocturno">Nocturno</option>
                                </select>
                                <p class="error ocultar">(*) Error en la introducción de datos.</p>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button id="btnCrearEmpleado" type="button" class="btn btn-primary" data-bs-dismiss="modal">Añadir</button>
                    </div>
                </div>
            </div>
        </div>`;
}

//Devulve la estructura del formulario de crear un empleado.
export const devolverEditarEmpleadoForm = () => {
    return `<div class="modal fade" id="modalEditarEmpleado" tabindex="-1" aria-labelledby="modalEditarEmpleadoLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalEditarEmpleadoLabel">Editar Empleado</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div id="divFormEditarEmpleado" class="modal-body">
                        <form id="formEditarEmpleado">
                            <div class="mb-3">
                                <label for="txtEditarDni" class="form-label">DNI</label>
                                <input type="text" class="form-control inputEditarEmpleado" id="txtEditarDni" placeholder="Introduce el dni">
                                <div id="dniMsgError" class="form-text">We'll never share your email with anyone
                                    else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEditarNombre" class="form-label">Nombre Empleado</label>
                                <input type="text" class="form-control inputEditarEmpleado" id="txtEditarNombre" placeholder="Introduce el nombre">
                                <div id="nombreEmpeladoMsgError" class="form-text">We'll never share your email
                                    with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEditarApellidos" class="form-label">Apellidos Empleado</label>
                                <input type="text" class="form-control inputEditarEmpleado" id="txtEditarApellidos" placeholder="Introduce los apellidos">
                                <div id="apellidosEmpeladoMsgError" class="form-text">We'll never share your
                                    email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEditarEmail" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control inputEditarEmpleado" id="txtEditarEmail" placeholder="Introduce el email" disabled>
                                <div id="emailMsgError" class="form-text">We'll never share your email with
                                    anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEditarPuestoTrabajo" class="form-label">Puesto trabajo</label>
                                <input type="text" class="form-control inputEditarEmpleado" id="txtEditarPuestoTrabajo"
                                    placeholder="Introduce el puesto de trabajo">
                                <div id="puestoMsgError" class="form-text">We'll never share your email with
                                    anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="turnoJornada" class="form-label">Elije el turno</label>
                                <select id="turnoEditarJornada" class="form-select inputEditarEmpleado" aria-label="Select">
                                    <option value="noSelec">No seleccionado</option>
                                    <option value="Diurno">Diurno</option>
                                    <option value="Mixto">Mixto</option>
                                    <option value="Nocturno">Nocturno</option>
                                </select>
                                <p class="error ocultar">(*) Error en la introducción de datos.</p>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button id="btnEditarEmpleado" type="button" class="btn btn-primary" data-bs-dismiss="modal">Editar</button>
                    </div>
                </div>
            </div>
        </div>`;
}

//Añade al DOM lo que sería la estructura de la página web si se ha iniciado sesión como empresa.
export const crearPaginaInicialEmpresa = (usu, imgPerfil) => {
    return `<nav id="navBarPrincipal" class="navbar navbar-expand-lg navbar-dark">
                <div class="container-fluid">
                    <div class="divLogotipo navbar-brand">
                        <a href="./index.html">
                            <img src="./img/logoSinFondo.svg" alt="icono WorkAs">
                            <span class="tituloNav">WorkAs</span>
                        </a>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class="navbar-nav me-auto mb-2 mb-lg-0"></div>
                        <ul class="navbar-nav">
                            <li id="opNavEmpleados" class="nav-item">
                                <a class="nav-link active" aria-current="page">Empleados</a>
                            </li>
                            <li id="opNavCalendario" class="nav-item">
                                <a class="nav-link active" aria-current="page">Calendario</a>
                            </li>
                            <li id="opNavTablon" class="nav-item">
                                <a class="nav-link active" aria-current="page">Tablón</a>
                            </li>
                            <li id="opNavLogout" class="nav-item">
                                <a class="nav-link active" aria-current="page">Cerrar sesión</a>
                            </li>                            
                            <li id="iconoPerfil" class="divIconoPerfil collapse navbar-collapse">
                                <img class="imgIconoPerfil" src="${imgPerfil}" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                <button id="btnChat" type="button" class="btn">
                    <input type="image" src="./img/chatServicio.png">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        0
                        <span class="visually-hidden">unread messages</span>
                    </span>
                </button>
            </nav>
            <aside id="asidePrincipal">
                <div class="asideTitulo">
                    <h3 class="asideElInfo ocultarAsideHover ocultarElAside">Opciones</h3>
                    <img id="btnColapsarAside" class="asideNoCollapse" src="./img/abrirAside.png" alt="">
                </div>
                <div id="asideOpciones">
                </div>
                <div id="iconoPerfilAside" class="divIconoPerfil">
                    <img class="imgIconoPerfil" src="${imgPerfil}" alt="">
                </div>
            </aside>
            <div id="principal"></div>`;
};

//Añade al DOM lo que sería la estructura de la página web si se ha iniciado sesión como empleado.
export const crearPaginaInicialEmpleado = (usu, imgPerfil) => {
    return `<nav id="navBarPrincipal" class="navbar navbar-expand-lg navbar-dark">
                <div class="container-fluid">
                    <div class="divLogotipo navbar-brand">
                        <a href="./index.html">
                            <img src="./img/logoSinFondo.svg" alt="icono WorkAs">
                            <span class="tituloNav">WorkAs</span>
                        </a>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class="navbar-nav me-auto mb-2 mb-lg-0"></div>
                        <ul class="navbar-nav">
                            <li id="opNavCalendario" class="nav-item">
                                <a class="nav-link active" aria-current="page">Calendario</a>
                            </li>
                            <li id="opNavTablon" class="nav-item">
                                <a class="nav-link active" aria-current="page">Tablón</a>
                            </li>
                            <li id="opNavLogout" class="nav-item">
                                <a class="nav-link active" aria-current="page">Cerrar sesión</a>
                            </li>
                            <li id="iconoPerfil" class="divIconoPerfil collapse navbar-collapse">
                                <img class="imgIconoPerfil" src="${imgPerfil}" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                <button id="btnChat" type="button" class="btn">
                    <input type="image" src="./img/chatServicio.png">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        0
                        <span class="visually-hidden">unread messages</span>
                    </span>
                </button>
                <div aria-live="polite" aria-atomic="true" class="">
                    <div id="divToastTablonAnuncio" class="toast-container"></div>
                </div>
            </nav>
            <aside id="asidePrincipal">
                <div class="asideTitulo">
                    <h3 class="asideElInfo ocultarAsideHover ocultarElAside">Opciones</h3>
                    <img id="btnColapsarAside" class="asideNoCollapse" src="./img/abrirAside.png" alt="">
                </div>
                <div id="asideOpciones">
                </div>
                <div id="iconoPerfilAside" class="divIconoPerfil">
                    <img class="imgIconoPerfil" src="${imgPerfil}" alt="">
                </div>
            </aside>
            <div id="principal"></div>`;
};

//Devuelve la estructura de las opciones de empleados.
export const crearOpAsideNavEmpleados = () => {
    var estadoAside = doc.getElementById("contenido").classList.contains("noColapsarContenido");
    return `<div id="asideAnyadirEmpleado" class="divServicioAside" data-bs-toggle="modal" data-bs-target="#modalAnyadirEmpleado">
                <img src="./img/anyadirEmpleadoServicio.png" alt="">
                <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                    <p>Añadir</p>
                    <p>Añadir empleado</p>
                </div>
            </div>
            <div id="asideRotarTurno" class="divServicioAside">
                <img src="./img/rotarTurnoServicio.png" alt="">
                <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                    <p>Rotar Turno</p>
                    <p>Rotar turno del empleado</p>
                </div>
            </div>
            <div id="asideAdministrarEmpleado" class="divServicioAside">
                <img src="./img/imgAdministrarEmpleado.png" alt="">
                <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                    <p>Administrar</p>
                    <p>Administrar empleado</p>
                </div>
            </div>`;
}

//Devuelve la estructura de las opciones del perfil de usuario.
export const crearOpAsideNavPerfil = () => {
    var estadoAside = doc.getElementById("contenido").classList.contains("noColapsarContenido");
    return `<div id="asideCambiarImgPerfil" class="divServicioAside" data-bs-toggle="modal" data-bs-target="#modalIconoPerfil">
                <img src="./img/empleadoIcono.png" alt="">
                <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                    <p>Actualizar</p>
                    <p>Actualizar icono de perfil</p>
                </div>
            </div>`;
}

//Devuelve la estructura de las opciones del tablón de anuncio.
export const crearOpAsideNavTablonAnuncio = (tipoUsuario) => {
    var estadoAside = doc.getElementById("contenido").classList.contains("noColapsarContenido");
    if(tipoUsuario === "empleado") {
        return `<div id="asideListarTablon" class="divServicioAside">
                    <img src="./img/tablonNoticiaServicio.png" alt="">
                    <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                        <p>Listar</p>
                        <p>Listar tablón anuncio</p>
                    </div>
                </div>`;
    } else {
        return `<div id="asideCrearAnuncio" class="divServicioAside">
                    <img src="./img/agregarAnuncio.png" alt="">
                    <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                        <p>Crear</p>
                        <p>Crear anuncio</p>
                    </div>
                </div>
                <div id="asideListarTablon" class="divServicioAside">
                    <img src="./img/tablonNoticiaServicio.png" alt="">
                    <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                        <p>Listar</p>
                        <p>Listar tablón anuncio</p>
                    </div>
                </div>
                <div id="asideEstadisticasTablon" class="divServicioAside" data-bs-toggle="offcanvas" data-bs-target="#canvasEstadisticas" aria-controls="offcanvasTop">
                    <img src="./img/iconoEstadisticas.png" alt="">
                    <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                        <p>Datos</p>
                        <p>Estadísticas del tablón</p>
                    </div>
                </div>`;
    }
}

//Devuelve la estructura de las opciones del calendario.
export const crearOpAsideNavCalendario = (tipoUsuario) => {
    var estadoAside = doc.getElementById("contenido").classList.contains("noColapsarContenido");
    if(tipoUsuario === "empleado") {
        return `<div id="asideSolicitarDia" class="divServicioAside" data-bs-toggle="offcanvas" data-bs-target="#formSolicitarDias" aria-controls="offcanvasTop">
                    <img src="./img/solicitarDia.png" alt="">
                    <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                        <p>Solicitar</p>
                        <p>Solicitar días</p>
                    </div>
                </div>`;
    } else {
        return `<div id="asideAnyadirFestivo" class="divServicioAside" data-bs-toggle="offcanvas" data-bs-target="#formDiaFest" aria-controls="offcanvasTop">
                    <img src="./img/agregarDiaFest.png" alt="">
                    <div class="asideElInfo ${estadoAside ? "ocultarAsideClic": "ocultarAsideHover"} ocultarElAside">
                        <p>Añadir</p>
                        <p>Añadir día festivo</p>
                    </div>
                </div>`;
    }
}

//Crea la estructura de como se va a mostrar los datos del empleado en una fila de una tabla, con los botones de borrar y editar.
export const crearFilaDatosEmpleado = (empleado) => {
    var imgPerfil = (empleado.data().iconoPerfil === "") ? "./img/empleadoIcono.png" : empleado.data().iconoPerfil;

    return `<tr id="${empleado.id}" class="fila">
                <td class="celda imgEmpleadoTabla"><img src="${imgPerfil}" alt=""></td>
                <td class="celda dni editable">${empleado.data().dni}</td>
                <td class="celda apellidos editable">${empleado.data().apellidos}</td>
                <td class="celda nombre editable">${empleado.data().nombre}</td>
                <td class="celda correo">${empleado.data().correo}</td>
                <td class="celda puestoTrabajo editable">${empleado.data().puestoTrabajo}</td>
                <td class="celda turno editable">${empleado.data().turno}</td>
                <td class="divBtnEmpleado" class="celda">
                    <input class="btnEditar editarSi" data-bs-toggle="modal" data-bs-target="#modalEditarEmpleado" type="image" src="././././img/editar.png" alt="">
                    <input class="btnEliminar" type="image" src="././././img/eliminar.png" alt="">
                </td>
            </tr>`;
}


//Crea un div que mostrará datos de la empresa que ha iniciado sesión.
export const crearDivInfoDatosEmpresa = (empresa, iconoPerfil, nEmpleados) => {
    return `<div id="cardMostrarDatosEmpresa" class="card mb-3" style="max-width: 800px;">
                <div class="row g-0">
                <div id="divImgIconoPerfilDatos" class="col-md-4">
                    <img id="imgIconoPerfilDatos" class="imgIconoPerfil" src="${iconoPerfil}" class="img-fluid rounded-start" alt="icono perfil">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">
                            <div class="nombreCompleto">${empresa.data().rznSocial}</div>
                        </h5>
                        <p class="card-text">
                            <div class="correo">Correo: <span>${empresa.data().correo}</span></div>
                        </p>
                        <p class="card-text">
                            <div class="cp">CP: <span>${empresa.data().cp}</span></div>
                        </p>
                        <p class="card-text">
                            <div class="dir">Dir: <span>${empresa.data().dir}</span></div>
                        </p>
                        <p class="card-text">
                            <div class="nEmpleados">Nº empleados: <span>${nEmpleados}</span></div>
                        </p>
                    </div>
                </div>
                </div>
            </div>
    
            <div id="modalIconoPerfil" class="modal fade" tabindex="-1" aria-labelledby="modalIconoPerfilLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalIconoPerfilLabel">Modificar Icono Perfil</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">                      
                            Subir icono perfil:<br>
                            <input id="inputAnyadirImg" type="file" accept="image/*" name="archivosubido">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button id="btnActualizarImgPerfil" type="button" class="btn btn-primary" data-bs-dismiss="modal">Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>`;
}

//Crea un div que mostrará datos del empleado que ha iniciado sesión.
export const crearDivInfoDatosEmpleado = (empleado, iconoPerfil, empresaEmpleado) => {
    return `<div id="cardMostrarDatosEmpresa" class="card mb-3" style="max-width: 800px;">
                <div class="row g-0">
                <div id="divImgIconoPerfilDatos" class="col-md-4">
                    <img id="imgIconoPerfilDatos" class="imgIconoPerfil" src="${iconoPerfil}" class="img-fluid rounded-start" alt="icono perfil">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">
                            <div class="nombreCompleto">${empleado.data().nombre} ${empleado.data().apellidos}</div>
                        </h5>
                        <p class="card-text">
                            <div class="empresaEmpleado">Empresa: <span>${empresaEmpleado.data().rznSocial}</span></div>
                        </p>
                        <p class="card-text">
                            <div class="dni">Dni: <span>${empleado.data().dni}</span></div>
                        </p>
                        <p class="card-text">
                            <div class="correo">Correo: <span>${empleado.data().correo}</span></div>
                        </p>
                        <p class="card-text">
                            <div class="puestoTrabajo">Puesto Trabajo: <span>${empleado.data().puestoTrabajo}</span></div>
                        </p>
                        <p class="card-text">
                            <div class="turno">Turno: <span>${empleado.data().turno}</span></div>
                        </p>
                    </div>
                </div>
                </div>
            </div>
    
            <div id="modalIconoPerfil" class="modal fade" tabindex="-1" aria-labelledby="modalIconoPerfilLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalIconoPerfilLabel">Modificar Icono Perfil</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">                      
                            Subir icono perfil:<br>
                            <input id="inputAnyadirImg" type="file" accept="image/*" name="archivosubido">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button id="btnActualizarImgPerfil" type="button" class="btn btn-primary" data-bs-dismiss="modal">Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>`;
}

export const crearDivRotarTurno = () => {
    return `<h2 id='tituloListEmpleado'>Rotar Turno de Empleados</h2><hr>
            <div id="divBuscadorPuesto" class="offset-2 offset-sm-0 col-8 col-sm-3 col-xxl-2">
                <div id="msgPuestoTrabajo">Mostrando resultados de <span id="spanPuestoTrabajo">.....</span></div>
                <div class="input-group align-items-center">
                    <input id="inputBuscarPorPuesto" class="inputBuscarPorPuesto" type="text" placeholder="Buscar puesto"
                        aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div id="divBtnBuscarEmpleadoPuesto">
                        <input id="btnBuscarEmpleadoPuesto" type="image" src="./img/lupa.png">
                    </div>
                </div>
            </div>
            <div id="divCardRotarTurno"></div>`;
}

export const crearFilasCardRotarTurno = (empleados) => {
    var filas = `<div class='animate__animated animate__fadeIn animate__faster'><table>
                 <tr><th></th><th>Dni</th><th>Nombre</th></tr>`;

    if(empleados.length === 0 ) {
        filas = "No hay empleados";
    } else {
        
        for (let i = 0; i < empleados.length; i++) {
            filas += `<tr><td>${i+1}.</td><td>${empleados[i].data().dni}</td> <td>${empleados[i].data().nombre}</td></tr>`;
        }
    }

    filas += "</table></div>";
    return filas;
}

export const crearCardRotarTurno = (turno) => {
    var imgTurno, divBotones, tituloTurno, idCard;
    var imgDiurno = "./img/imgTurnoDiurno.png";
    var imgMixto = "./img/imgTurnoMixto.png";
    var imgNocturno = "./img/imgTurnoNocturno.png";

    if (turno === "diurno") {
        idCard = "cardTurnoDiurno";
        imgTurno = imgDiurno;
        tituloTurno = `Diurno`;
        divBotones = `<div class="divBtnCambiarTurno">
                        <button id="diurnoToMixto" class="btnTurno btnMixto"><img src="${imgMixto}" alt="" />Mixto</button>
                        <button id="diurnoToNocturno" class="btnTurno btnNocturno"><img src="${imgNocturno}" alt="" />Nocturno</button>
                      </div>`;
    } else if (turno === "mixto") {
        idCard = "cardTurnoMixto";
        imgTurno = imgMixto;
        tituloTurno = `Mixto`;
        divBotones = `<div class="divBtnCambiarTurno">
                        <button id="mixtoToDiurno" class="btnTurno btnDiurno"><img src="${imgDiurno}" alt="" />Diurno</button>
                        <button id="mixtoToNocturno" class="btnTurno btnNocturno"><img src="${imgNocturno}" alt="" />Nocturno</button>
                      </div>`;
    } else if (turno === "nocturno") {
        idCard= "cardTurnoNocturno";
        imgTurno = imgNocturno;
        tituloTurno = `Nocturno`;
        divBotones = `<div class="divBtnCambiarTurno">
                        <button id="nocturnoToDiurno" class="btnTurno btnDiurno"><img src="${imgDiurno}" alt="" />Diurno</button>
                        <button id="nocturnoToMixto" class="btnTurno btnMixto"><img src="${imgMixto}" alt="" />Mixto</button>
                      </div>`;
    } else {
        return "";
    }

    return `<div id="${idCard}" class="card cardTurno animate__animated animate__backInDown">
                <div class="cardTurnoImg">
                    <img src="${imgTurno}" class="card-img-top" alt="imagen turno">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${tituloTurno}</h5>
                    <div class="divCardEmpleados">
                        <p>No hay empleados</p>
                    </div>
                </div>
                <div class="card-body">
                    ${divBotones}
                </div>
            </div>`;
}

//Crea plantilla formulario anuncio.
export const crearFormularioAnuncio = () => {
    return `<form id="formAnuncio" class="row g-3">

                <div class="col-12">
                    <label for="inputTitulo" class="form-label">Título*</label>
                    <input type="text" class="form-control inputCrearForm" id="inputTitulo" placeholder="Introduce el título">
                </div>

                <div class="col-12">
                    <label for="inputSubtitulo" class="form-label">Subtítulo</label>
                    <input type="text" class="form-control inputCrearForm" id="inputSubtitulo" placeholder="Introduce el subtítulo">
                </div>

                <div class="col-sm-6">
                    <label for="inputAutor" class="form-label">Autor*</label>
                    <input type="text" class="form-control inputCrearForm" id="inputAutor" placeholder="Introduce el autor">
                </div>
                <div class="col-sm-6">
                    <label for="inputImg" class="form-label">Imagen*</label>
                    <input type="file" accept="image/*" class="form-control inputCrearForm" id="inputAnyadirImg">
                </div>

                <div class="col-sm-6">
                    <label for="inputNombreEnl" class="form-label">Nombre enlace</label>
                    <input type="text" class="form-control inputCrearForm" id="inputNombreEnl" placeholder="Introduce el nombre del enlace">
                </div>
                <div class="col-sm-6">
                    <label for="inputEnl" class="form-label">Enlace</label>
                    <input type="url" class="form-control inputCrearForm" id="inputEnl" placeholder="Introduce el enlace">
                </div>

                <div class="col-12">
                    <button id="btnCrearAnuncio" type="button" class="btn btn-primary">Crear Anuncio</button>
                </div>
            </form>`;
}

//Crea un div para agregar un párrafo al anuncio.
export const crearDivAgregarParrafo = () => {
    var parrafo = doc.createElement("div");
    parrafo.classList.add("form-floating", "divInputParrafo");
    parrafo.innerHTML = `<textarea class="form-control inputParrafo inputCrearForm" placeholder="Escribe un párrafo"></textarea>
                         <label>Escribe un párrafo</label>`;
                         
    return parrafo;
}

//Crea plantilla formulario anuncio.
export const crearDivCrearAnuncio = () => {
    return `<div id="principalCrearAnuncio" class="container-fluid animate__animated animate__fadeIn">
                <h2 id='tituloDivCrearAnuncio' class="row g-3">Crear Anuncio</h2><hr>
                <div id="divCrearAnuncio" class="row g-3">
                    <div id="divFormCrearAnuncio" class="col-md-6 container-fluid">
                        <h3>Formulario Anuncio</h3>
                    </div>
                    <div id="divParrafosAnuncio" class="col-md-6">
                        <h3>Párrafos</h3>
                        <div id="parrafosAnuncio">
                            <div id="divParrafos">
                                <div class="form-floating divInputParrafo">
                                    <textarea class="form-control inputParrafo" placeholder="Escribe un párrafo"></textarea>
                                    <label>Escribe un párrafo</label>
                                </div>
                            </div>
                            <div id="divAnyadirParrafo">
                                <img src="./img/añadir.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

//Crea una plantilla de como se va a mostrar los comentarios.
export const crearComentario = (texto, usuario, tipoUsuario) => {
    if(tipoUsuario === "empleado") {
        var nombre =`${usuario.nombre} ${usuario.apellidos}`;
    } else {
        var nombre = usuario.rznSocial;
    }
    return `<div class="comentario">
                <div class="comentarioImgPerfil">
                    <img src="${usuario.iconoPerfil}" alt="">
                </div>
                <div class="comentarioContenido">
                    <h4>${nombre}</h4>
                    <p>${texto}</p>
                </div>
            </div>`;
}

//Crea una plantilla para mostrar las estadísticas totales de los anuncios.
export const crearCanvasEstadisticas = () => {
    return `<div class="offcanvas offcanvas-end" tabindex="-1" id="canvasEstadisticas" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 id="offcanvasRightLabel">Estadísticas Anuncios</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" style="filter: invert(0)"></button>
                </div>
                <div id="bodyEstadisticasAnuncio" class="offcanvas-body"></div>
            </div>`;
}

//Crea el contenido de las estadísticas totales de los anuncios.
export const crearDivEstadisticas = (estadisticas) => {
    return `<div>
                <div class="divEstadistica">
                    <span><img src="./img/iconoVisitas.png" alt="">Nº Visitas </span>
                    <span id="estVisitas">${estadisticas.nVisitas}</span>
                </div>
                <div class="divEstadistica">
                    <span><img src="./img/iconoLikePulsado.png" alt="">Nº Likes </span>
                    <span id="estLikes">${estadisticas.nLikes}</span>
                </div>
                <div class="divEstadistica">
                    <span><img src="./img/iconoComentario.png" alt="">Nº comentarios </span>
                    <span id="estComentarios">${estadisticas.nComentarios}</span>
                </div>
                <div class="divEstadistica">
                    <span><img src="./img/iconoEstadisticas.png" alt="">Engagement</span>
                    <span id="estEngagement ">${estadisticas.engagement}%</span>
                </div>
            </div>
            <div>
                <h5>Los más vistos</h5>
                <div>
                    ${estadisticas.anunciosMasVistos}
                </div>
            </div>`;
}

//Crea una plantilla de como se va a mostrar el tablón de anuncio.
export const crearAnuncioPlantillaEmpresa = (anuncio, idUsuario, tipoUsu, idTablon) => {
    var date = new Date(anuncio.fPubli.seconds * 1000);
    var likeDado = false;
    var imgEliminar = "";

    for (let i = 0; i < anuncio.arrayUsuarioLikes.length; i++) {
        if(anuncio.arrayUsuarioLikes.includes(idUsuario)) {
            likeDado = true;
        }
    }

    if(tipoUsu === "empresa") {
        imgEliminar = `<div id="${idTablon}" class="divImgEliminarAnuncio2"><img id="imgEliminarAnuncioTablon" src="./img/iconoEliminar.png" alt=""></div>`;
    }

    var iconoLike = likeDado ? "./img/iconoLikePulsado.png" : "./img/iconoLike.png";
    var classLike = likeDado ? "pulsado" : "";

    return `<div class="plantillaAnuncio animate__animated animate__fadeIn">
                ${imgEliminar}
                <div class="divPortada">
                    <div>
                        <div class="divFechaAutorAnuncio">
                            <span class="divAutorAnuncio">${anuncio.autor}</span>
                            <span class="divFPubliAnuncio">
                                ${date.getDate()+
                                "/"+(date.getMonth()+1)+
                                "/"+date.getFullYear()}
                            </span>
                        </div>
                        <h3 class="divTituloAnuncio">${anuncio.titulo}</h3>
                        <h4 class="divSubtituloAnuncio">${anuncio.subtitulo}</h4>
                    </div>
                    <div class="divImgAnuncio">
                        <img src="${anuncio.imgAnuncio}" alt="">
                    </div>
                </div>
                <div id="parrafosAnuncioSlc">
                    ${anuncio.contenido}
                </div>
                <div class="divFeedback">
                    <span class="divVisualizacionesAnuncio">
                        <img id="imgVisitas" src="./img/iconoVisitas.png" alt="">
                        <span id="spanVisitas">${anuncio.visualizaciones}</span>
                    </span>
                    <span class="divLikesAnuncio">
                        <img id="imgLike" class="${classLike}" src="${iconoLike}" alt="">
                        <span id="spanLike">${anuncio.likes}</span>
                    </span>
                </div>
                <div class="divEnlaceAnuncio">
                    <a href="${anuncio.enlace}" target="_blank">${anuncio.nEnlace}</a>
                </div>
                <div class="divComentariosAnuncio">
                    <h3>Comentarios(<span id="nComentarios">${anuncio.comentarios.length}</span>)</h3>
                    <div id="txtAreaComentario" class="form-floating">
                        <textarea id="txtArea" class="form-control inputParrafo" placeholder="Escribe un comentario"></textarea>
                        <label>Escribe un comentario</label>
                    </div>
                    <div id="divEnlEnviarComentario">
                        <a id="enlEnviarComentario">Enviar comentario</a>
                    </div>
                    <div id="divComentarios"></div>
                </div>
            </div>`;
}

export const creardivAnuncioEnTablon = (anuncio, tipoUsu) => {
    var date = new Date(anuncio.data().fPubli.seconds * 1000);
    var imgEliminar = "";
    if(tipoUsu === "empresa") {
        imgEliminar = `<img src="./img/iconoEliminar.png" class="imgEliminarAnuncio" alt="">`;
    }
    
    return `    <div id="${anuncio.id}" class="card cardAnuncio">
                    <img src="${anuncio.data().imgAnuncio}" class="card-img-top" alt="">
                    ${imgEliminar}
                    <img src="./img/chinchetaAnuncio.png" class="imgChincheta" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${anuncio.data().titulo}</h5>
                            <p class="card-text">${anuncio.data().subtitulo}</p>
                        </div>
                        <div class="card-body divEstadisticasAnuncio">
                            <div>
                                <img src="./img/iconoVisitas.png" alt="">
                                <span>${anuncio.data().visualizaciones}</span>
                            </div>
                            <div>
                                <img src="./img/iconoLikePulsado.png" alt="">
                                <span>${anuncio.data().likes}</span>
                            </div>
                            <div>
                                <img src="./img/iconoComentario.png" alt="">
                                <span>${anuncio.data().comentarios.length}</span>
                            </div>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">
                                Publicado el
                                ${" ",date.getDate()+
                                "/"+(date.getMonth()+1)+
                                "/"+date.getFullYear()}  
                            </small>
                        </div>
                    </div>`;
}

//Devuelve un toast con la información del anuncio.
export const crearToastAnuncio = (anuncio) => {
    var fecha = new Date(anuncio.data().fPubli.seconds * 1000);
    fecha = crearFormatoFechaChat(fecha);

    return `<div id="${anuncio.id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="${anuncio.data().imgAnuncio}" class="rounded me-2" alt="">
                    <strong class="me-auto">¡Nuevo Anuncio!</strong>
                    <small class="text-muted">${fecha}</small>
                </div>
                <div class="toast-body">
                    ${anuncio.data().titulo}
                </div>
            </div>`;
}

/* CALENDARIO */
//Crea un div del calendario.
export const crearDivCalendario = () => {
    return `<div id="calendario">
                <h2 id="tituloCalendario">Calendario</h2>
                <hr>
                <div id="divMenuCalendarioMovil">
                    <span>Días festivos</span>
                    <span>Solicitudes</span>
                </div>
                <div id="divCalendario">
                <div class="divCalendarioOp">
                    <h3>Días Festivos</h3>
                    <div id="divCalDiasFest"></div>
                </div>
                <div class="divCalendarioOp">
                    <h3>Solicitudes <span id="tituloSolicitud">Pendientes</span></h3>
                    <div id="divMenuDiasSol">
                        <input id="btnSolPendientes" class="btnMenuDiasSol btnMenuDiasSolSlc" type="image" src="././././img/iconoListCheck.png" alt="">
                        <input id="btnSolResueltas" class="btnMenuDiasSol" type="image" src="././././img/iconoHistorial.png" alt="">
                    </div>
                    <div id="divCalSolicitud"></div>
                </div>
                </div>
            </div>`;
}

//Crea una fila del día festivo.
export const crearFilaDiaFestivo = (diaFest, tipoUsu) => {
    var fecha = new Date(diaFest.data().fDiaFest.seconds * 1000);
    var dia = fecha.getDate()>=10 ? fecha.getDate() : `0${fecha.getDate()}`;
    var enlace = diaFest.data().enlace !== "" ? `href="${diaFest.data().enlace}" target="_blank"` : "";

    var btnEl = tipoUsu === "empresa" ? `<input id="${diaFest.id}" class="btnEliminar" type="image" src="././././img/eliminar.png" alt="">` : "";
    return `<div class="divFilaDiaFest">
                <a ${enlace}>
                    <div class="divNDiaFest ${diaFest.data().color}">${dia}</div>
                    <div class="divContenidoDiaFest">
                        <p class="divDiaFestNombre">${diaFest.data().nombre}</p>
                        <p class="divDiaFestFecha"><small>${dia} - ${month[(fecha.getMonth())].toLocaleLowerCase()} - ${fecha.getFullYear()}</small></p>
                    </div>
                </a>
                ${btnEl}
            </div>`;
}

//Crea una fila del día solicitado.
export const crearFilaDiaSolicitado = (diaSol, tipoUsu, empleado) => {
    var fEnviada = new Date(diaSol.data().fEnviada.seconds * 1000);
    var fechaHoy = new Date();
    fechaHoy.setDate(fechaHoy.getDate() - 1);
    var fComienzo = new Date(diaSol.data().fComienzo.seconds * 1000);
    var fFin = new Date(diaSol.data().fFin.seconds * 1000);
    var claseEstado = `bordePendiente`;
    var estado = `<div class="estadoSol amarillo">Pendiente</div>`;
    var desc = "";
    var enCurso = "";

    if(!diaSol.data().pendiente) {
        if(fFin < fechaHoy) {
            claseEstado = `bordeExpirado`;
            estado = `<div class="estadoSol cianOscuro">Expirada</div>`;
        } else if (diaSol.data().aceptada) {
            claseEstado = `bordeAceptada`;
            estado = `<div class="estadoSol oliva">Aceptada</div>`;
            enCurso = "En curso...";
        } else {
            claseEstado = `bordeRechazada`;
            estado = `<div class="estadoSol rojoOscuro">Rechazada</div>`;
        }

        desc = `<div class="accordion" id="accordion${contadorCollapse}">`;

        if(diaSol.data().descSolicitud !== "") {
            desc += `<div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${contadorCollapse}col1" aria-expanded="true" aria-controls="collapse${contadorCollapse}col1">
                                <strong>Descripción empleado</strong>
                            </button>
                        </h2>
                        <div id="collapse${contadorCollapse}col1" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion${contadorCollapse}">
                            <div class="accordion-body">
                                ${diaSol.data().descSolicitud}
                            </div>
                        </div>
                    </div>`;
        }

        if(diaSol.data().descResolucion !== "") {
            desc += `<div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${contadorCollapse}col2" aria-expanded="false" aria-controls="collapse${contadorCollapse}col2">
                            <strong>Respuesta empresa</strong>
                        </button>
                        </h2>
                        <div id="collapse${contadorCollapse}col2" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            ${diaSol.data().descResolucion}
                        </div>
                        </div>
                    </div>`;
        }

        desc += `</div>`;
    } else {
        if(diaSol.data().descSolicitud !== "") {
            desc = `<div class="accordion" id="accordion${contadorCollapse}">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${contadorCollapse}col1" aria-expanded="true" aria-controls="collapse${contadorCollapse}col1">
                                    <strong>Descripción empleado</strong>
                                </button>
                            </h2>
                            <div id="collapse${contadorCollapse}col1" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion${contadorCollapse}">
                                <div class="accordion-body">
                                    ${diaSol.data().descSolicitud}
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    }

    var enl = tipoUsu === "empresa" && diaSol.data().pendiente
        ? `<a id="${diaSol.id}" class="enlResponderSol" data-bs-toggle="modal" data-bs-target="#modalResolucionDiaSol">Responder</a>`
        : "<div></div>";

    if(tipoUsu === "empresa" && enl === "<div></div>") {
        var enl = tipoUsu === "empresa" && !diaSol.data().pendiente && fComienzo >= fechaHoy
        ? `<a id="${diaSol.id}" class="enlDeshacerSol">Deshacer</a>`
        : `<div>${enCurso !== "" ? enCurso : ""}</div>`;
    }

    contadorCollapse++;
    return `<div class="divFilaDiaSolicitado ${claseEstado}">
                <div class="divEstadoSolicitud ${claseEstado}">
                    ${estado}
                </div>
                <div class="divAsunto"><strong>Asunto:</strong> ${diaSol.data().asunto}</div>
                <div class="divSolicitante"><strong>Solicitante:</strong> ${empleado.data().nombre } ${empleado.data().apellidos }</div>
                <div class="divFechaSolicitud">
                    <img src="./img/calendarioDiaSolicitado.png" alt="">
                    <span><strong>Desde:</strong> ${crearFormatoAnyoChat(fComienzo)} </span>  
                    <span><strong> , Hasta:</strong> ${crearFormatoAnyoChat(fFin)}</span>                 
                </div>
                <div class="divDescSol">
                    ${desc}
                </div>
                <div class="divFooterDiaSol">
                    ${enl}
                    <small class="fechaEnviado">${crearFormatoFechaChat(fEnviada)}</small>
                </div>
            </div><hr>`;
}

//Crea un modal con el formulario de resolucion del día solicitado.
export const crearModalResolucionDiaSol = () => {
    return `<div id="modalResolucionDiaSol" class="modal fade" tabindex="-1" aria-labelledby="modalResolucionDiaSolLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalResolucionDiaSolLabel">Resolución</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body"> 
                            <form id="formResolucionDia">                     
                                <div>
                                    <label for="radioResol" class="form-label">Estado*</label>
                                    <div>
                                        <input type="radio" class="btn-check inputResolucionDia" name="radioEstadoSol" value="true" id="aceptarSol" autocomplete="off" checked>
                                        <label class="btn btn-outline-success" for="aceptarSol">Aceptar</label>
                                        
                                        <input type="radio" class="btn-check inputResolucionDia" name="radioEstadoSol" value="false" id="rechazarSol" autocomplete="off">
                                        <label class="btn btn-outline-danger" for="rechazarSol">Rechazar</label>
                                    </div>
                                </div>
                                <div>
                                    <label for="txtAreaDescResol" class="form-label inputResolucionDia">Descripción resolución</label>
                                    <textarea class="form-control" id="txtAreaDescResol" rows="2"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button id="btnResolucionSol" type="button" class="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>`;
}

//Crea un div del formulario para añadir un día festivo.
export const crearDivFormDiaFest = () => {
    var contenido = "";
    var arrayColor = ["azul", "rojoOscuro", "purpura", "cianOscuro", 
                      "verde", "naranja", "rosa", "amarillo", 
                      "oliva", "rojoclaro"];
    
    for (let i = 0; i < arrayColor.length; i++) {
        contenido += `  <div class="form-check">
                            <input class="form-check-input ${arrayColor[i]} inputAnyadirDiaFest" type="radio" name="radioColor" value="${arrayColor[i]}" ${i === 0 ? "checked" : ""}>
                        </div>`;
    }
    return `<div class="offcanvas offcanvas-end" tabindex="-1" id="formDiaFest" aria-labelledby="formDiaFestLabel">
                <div class="offcanvas-header">
                    <h5 id="formDiaFestLabel">Crear Día Festivo</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body container-fluid">
                    <form id="formCrearDiaFest" class="row g-3">
                        <div class="col-md-6">
                            <label for="inputNomFest" class="form-label">Nombre*</label>
                            <input type="text" class="form-control inputAnyadirDiaFest" id="inputNomFest" placeholder="Nombre del día festivo">
                        </div>
                        <div class="col-md-6">
                            <label for="inputFDiaFest" class="form-label">Fecha*</label>
                            <input type="date" class="form-control inputAnyadirDiaFest" id="inputFDiaFest">
                        </div>
                        <div class="col-12">
                            <label for="inputEnlInteres" class="form-label">Enlace de interés</label>
                            <input type="url" class="form-control inputAnyadirDiaFest" id="inputEnlInteres" placeholder="Enlace de interés">
                        </div>
                        <div class="col-12 radioColorCalendario">
                            <label for="radioColor" class="form-label">Color festivo*</label>
                            <div class="divRadioColores">
                                ${contenido}
                            </div>
                        </div>
                        <div class="col-12">
                            <button id="btnAnyadirDiaFest" type="button" class="btn btn-primary" data-bs-dismiss="offcanvas" aria-label="Close">Añadir</button>
                        </div>
                    </form>
                </div>
            </div>`;
}

//Crea un div del formulario para solicitar días.
export const crearDivFormSolicitarDias = () => {
    var opciones = "<option value='0' selected>Seleccionar</option>";
    var arrayAsuntos = ["Asuntos propios", "Días compensación horas extra", 
                        "Días compensación jornada irregular", "Vacaciones"];
    
    for (let i = 0; i < arrayAsuntos.length; i++) {
        opciones += `<option value="${arrayAsuntos[i]}">${arrayAsuntos[i]}</option>`;
    }
    return `<div class="offcanvas offcanvas-end" tabindex="-1" id="formSolicitarDias" aria-labelledby="formDiaFestLabel">
                <div class="offcanvas-header">
                    <h5 id="formDiaFestLabel">Solicitar Días</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body container-fluid">
                    <form id="formSolicitarDiasAsunto" class="row g-3">
                        <div class="col-md-6">
                            <label for="inputFDiaComienzo" class="form-label">Desde*</label>
                            <input type="date" class="form-control inputSolicitarDias" id="inputFDiaComienzo">
                        </div>
                        <div class="col-md-6">
                            <label for="inputFDiaFin" class="form-label">Hasta*</label>
                            <input type="date" class="form-control inputSolicitarDias" id="inputFDiaFin">
                        </div>
                        <div class="col-12">
                            <label for="slcOpcionesAsuntos" class="form-label">Asunto*</label>
                            <select id="slcOpcionesAsuntos" class="form-select inputSolicitarDias" aria-label="Select">
                                ${opciones}
                            </select>
                        </div>
                        <div class="col-12">
                            <label for="txtAreaDesc" class="form-label">Descripción Asunto</label>
                            <textarea class="form-control" id="txtAreaDesc" rows="2"></textarea>
                        </div>
                        <div class="col-12">
                            <button id="btnSolicitarDias" type="button" class="btn btn-primary" data-bs-dismiss="offcanvas" aria-label="Close">Añadir</button>
                        </div>
                    </form>
                </div>
            </div>`;
}

/* CHAT */
//Crea formato hora del chat.
export const crearFormatoHoraChat = (fecha) => {
    return `${fecha.getHours()}:${(fecha.getMinutes()>=10 ? fecha.getMinutes(): `0${fecha.getMinutes()}`)}`;
}

//Crea formato año del chat.
export const crearFormatoAnyoChat = (fecha) => {
    return `${fecha.getDate()}/${(fecha.getMonth()+1)}/${fecha.getFullYear().toString().substring(2)}`;
}

//Crea formato fecha del chat.
export const crearFormatoFechaChat = (fecha) => {
    var fechaActual = new Date();

    if((fechaActual.getDate()-fecha.getDate()) === 0) {
        return crearFormatoHoraChat(fecha);
    } else if((fechaActual.getDate()-fecha.getDate()) === 1) {
        return "ayer";
    } else {
        return crearFormatoAnyoChat(fecha);
    }
}

//Crea formato del día de la conversación.
export const crearDivMostrarDiaConversacion = (fecha) => {
    var fechaActual = new Date();
    if((fechaActual.getDate()-fecha.getDate()) === 0) {
        return `<div class="divCambioDiaChat">Hoy</div>`;
    } else if((fechaActual.getDate()-fecha.getDate()) === 1) {
        return `<div class="divCambioDiaChat">Ayer</div>`;
    } else {
        return `<div class="divCambioDiaChat">${fecha.getDate()} de ${month[(fecha.getMonth())].toLocaleLowerCase()} de ${fecha.getFullYear()}</div>`;
    }
}

//Crea una fila de usuario del chat.
export const crearFilaListUsuChat = (usuario, chat, chatSlc) => {
    var nombreChat = "";
    var iconoPerfil = "";
    var nMsg = 0;

    var lastMsg = (chat.data().conversacion == null || chat.data().conversacion.length === 0)
        ? "No hay mensajes todavía."
        : chat.data().conversacion[chat.data().conversacion.length-1] ;

    var date = (chat.data().conversacion != null && chat.data().conversacion.length !== 0)
        ? chat.data().conversacion[chat.data().conversacion.length-1].fecha 
        : "";

    var condicion = usuario.id === lastMsg.idUsu && chat.data().nMsgSinLeer > 0 && chat.id !== chatSlc;
    var mostrarNmsgSinLeer = condicion
        ? `<span class="badge bg-danger">${chat.data().nMsgSinLeer}</span>` 
        : "";

    if(date !== "") {
        date = new Date(date.seconds * 1000);
        date = crearFormatoFechaChat(date);
    }
    var conectadoClass = usuario.data().conectado ? "conectado" : "desconectado";

    if(usuario.data().tipoUsu === "empresa") {
        nombreChat = usuario.data().rznSocial;
        iconoPerfil = usuario.data().iconoPerfil ? usuario.data().iconoPerfil : "./img/empresaIcono.png";
    } else {
        nombreChat = `${usuario.data().nombre} ${usuario.data().apellidos}`;
        iconoPerfil = usuario.data().iconoPerfil ? usuario.data().iconoPerfil : "./img/empleadoIcono.png";
    }
    nMsg = nMsg === 0 
        ? ""
        : nMsg < 100 
            ? `<h5><span class="badge bg-danger">${nMsg}+</span></h5>`
            : `<h5><span class="badge bg-danger">99+</span></h5>`;

    return `<div id="${chat.id}" class="divUsuarioChat">
                <div class="chatListImgPerfil">
                    <img src="${iconoPerfil}" alt="">
                    <div id="${usuario.id}" class="iconoConectado ${conectadoClass}">
                </div>
                </div>
                <div class="chatListContenido">
                    <h5 class="nombreUsuGrupoChat">${nombreChat}</h5>
                    <p class="lastMsgChat">${lastMsg.mensaje == undefined ? "No hay mensajes todavía." : lastMsg.mensaje}</p>
                </div>
                <div class="chatListFechaOnline">
                    <h5>${mostrarNmsgSinLeer}</h5>
                    <p class="fechaLastMsg">${date}</p>
                </div>
            </div>`;
}

//Crea una plantilla del mensaje del chat.
export const crearPlantillaMensaje = (msg, esUsuSesion) => {
    var divMsg = "";
    var date = msg.fecha;

    date = new Date(date.seconds * 1000);
    date =  crearFormatoHoraChat(date);

    if(esUsuSesion) {
        divMsg =`<div class="msgConversacion msgUsu1">
                    <p class="msgTxt">${msg.mensaje}</p>
                    <p class="msgFecha">${date}</p>
                </div>`;
    } else {
        divMsg =`<div class="msgConversacion msgUsu2">
                    <p class="msgTxt">${msg.mensaje}</p>
                    <p class="msgFecha">${date}</p>
                </div>`;
    }

    return divMsg;
}

//Crea una plantilla del chat.
export const crearPlantillaChat = () => {
    return `<div id="divChat" class="animate__animated animate__fadeIn">
                <div id="divChatConversacion" class="ocultar">
                    <div id="headerChatUsuario">
                        <img id="btnVolverListChat" src="./img/abrirAside.png" alt="">
                        <div id="imgChatSlc"></div>
                        <h4 id="nombreUsuChatSlc"></h4>
                    </div>
                    <div id="conversacion"></div>
                    <div id="divInputChatUsuario">
                        <textarea id="inputMsgChat" class="inputEnviarMsg" placeholder="Escribe tu mensaje">
                        </textarea>
                        <div id="divIconosInputMsg">
                            <input id="inputEnviarMsg" type="image" src="./img/iconoEnviarMsg.svg" alt="">
                        </div>
                    </div>
                </div>
                <div id="divChatListadoUsuarios">
                    <div id="headerListadoUsuarios">
                        <h2>Chat</h2>             
                        <input id="inputBuscarUsuarioChat" type="text" placeholder="Buscar">
                    </div>
                    <div id="listadoUsuarios">
                        <div id="listadoUsuariosChat"></div>
                    </div>
                </div>
            </div>
            </div><div id="divModales"></div>`;
}

//Exportamos.
export * from './plantilla.js'