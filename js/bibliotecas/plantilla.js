"use strict";
/*  --- BIBLIOTECA PLANTILLA ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para interactuar con el DOM.
var doc = document;

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
                <legend>C.P.*</legend><label for="cod_postal"></label><input accept="image/png,image/jpeg" type="file"><img
                    class="desaparecer" src="./././img/correcto.png"><img class="desaparecer"
                    src="./././img/incorrecto.png"><span class="error ocultar">Este campo es obligatorio</span>
            </fieldset>
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
                    name="aceptar_politicas"><label for=""> He leído y acepto la </label><a>política de privacidad.</a><span
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
                                <input type="text" class="form-control" id="txtDni" placeholder="Introduce el dni">
                                <div id="dniMsgError" class="form-text">We'll never share your email with anyone
                                    else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtNombre" class="form-label">Nombre Empleado</label>
                                <input type="text" class="form-control" id="txtNombre" placeholder="Introduce el nombre">
                                <div id="nombreEmpeladoMsgError" class="form-text">We'll never share your email
                                    with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtApellidos" class="form-label">Apellidos Empleado</label>
                                <input type="text" class="form-control" id="txtApellidos" placeholder="Introduce los apellidos">
                                <div id="apellidosEmpeladoMsgError" class="form-text">We'll never share your
                                    email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEmail" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" id="txtEmail" placeholder="Introduce el email">
                                <div id="emailMsgError" class="form-text">We'll never share your email with
                                    anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtPuestoTrabajo" class="form-label">Puesto trabajo</label>
                                <input type="text" class="form-control" id="txtPuestoTrabajo"
                                    placeholder="Introduce el puesto de trabajo">
                                <div id="puestoMsgError" class="form-text">We'll never share your email with
                                    anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="turnoJornada" class="form-label">Elije el turno</label>
                                <select id="turnoJornada" class="form-select" aria-label="Select">
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
                                <input type="text" class="form-control" id="txtEditarDni" placeholder="Introduce el dni">
                                <div id="dniMsgError" class="form-text">We'll never share your email with anyone
                                    else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEditarNombre" class="form-label">Nombre Empleado</label>
                                <input type="text" class="form-control" id="txtEditarNombre" placeholder="Introduce el nombre">
                                <div id="nombreEmpeladoMsgError" class="form-text">We'll never share your email
                                    with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEditarApellidos" class="form-label">Apellidos Empleado</label>
                                <input type="text" class="form-control" id="txtEditarApellidos" placeholder="Introduce los apellidos">
                                <div id="apellidosEmpeladoMsgError" class="form-text">We'll never share your
                                    email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEditarEmail" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" id="txtEditarEmail" placeholder="Introduce el email">
                                <div id="emailMsgError" class="form-text">We'll never share your email with
                                    anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="txtEditarPuestoTrabajo" class="form-label">Puesto trabajo</label>
                                <input type="text" class="form-control" id="txtEditarPuestoTrabajo"
                                    placeholder="Introduce el puesto de trabajo">
                                <div id="puestoMsgError" class="form-text">We'll never share your email with
                                    anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="turnoJornada" class="form-label">Elije el turno</label>
                                <select id="turnoEditarJornada" class="form-select" aria-label="Select">
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
                            <img src="./img/logoSinFondo.svg" alt="icono empresa">
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
                            <li id="iconoPerfil" class="divIconoPerfil collapse navbar-collapse">
                                <img class="imgIconoPerfil" src="${imgPerfil}" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                <button id="btnChat" type="button" class="btn">
                    <input type="image" src="./img/chatServicio.png">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
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
export const crearPaginaInicialEmpleado = (usu) => {
    return `<header id="cabecera">
                <div class="logotipo">
                    <a href="./index.html"><img src="./img/logoSinFondo.svg" alt=""></a>
                </div>
                <h1 class="nombreEmpleado">Empleado: ${usu.data().nombre}</h1>
                <nav class="navMenu">
                    <ul>
                        <li><a id="enlCalendario">Calendario</a></li>
                        <li><a id="enlTablonAnuncio">Tablón Anuncio</a></li>
                        <li><a href="">Cerrar Sesión</a></li>
                        <li id="iconoPerfil"><img src="./img/empleadoIcono.png" alt=""></li>
                    </ul>
                </nav>
            </header>
            <aside id="asidePrincipal">
                <div class="asideTitulo">
                    <h3 class="asideElInfo ocultarAsideHover ocultarElAside">Opciones</h3>
                    <img id="btnColapsarAside" class="asideNoCollapse" src="./img/abrirAside.png" alt="">
                </div>
                <div id="asideOpciones">
                </div>
                <div id="iconoPerfilAside">
                    <img src="./img/miFotoPerfil.jpg" alt="">
                </div>
            </aside>
            <div id="principal"><img id="imgInicioWorkas" src="././././img/imgInicioWorkas.png" alt=""></div>`;
};

//Devuelve la estructura de las opciones de empleados.
export const crearOpAsideNavEmpleados = () => {
    return `<div id="asideAnyadirEmpleado" class="divServicioAside" data-bs-toggle="modal" data-bs-target="#modalAnyadirEmpleado">
                <img src="./img/anyadirEmpleadoServicio.png" alt="">
                <div class="asideElInfo ocultarAsideHover ocultarElAside">
                    <p>Añadir</p>
                    <p>Añadir empleado</p>
                </div>
            </div>
            <div id="asideRotarTurno" class="divServicioAside">
                <img src="./img/rotarTurnoServicio.png" alt="">
                <div class="asideElInfo ocultarAsideHover ocultarElAside">
                    <p>Rotar Turno</p>
                    <p>Rotar turno del empleado</p>
                </div>
            </div>
            <div id="asideAdministrarEmpleado" class="divServicioAside">
                <img src="./img/imgAdministrarEmpleado.png" alt="">
                <div class="asideElInfo ocultarAsideHover ocultarElAside">
                    <p>Administrar</p>
                    <p>Administrar empleado</p>
                </div>
            </div>`;
}

//Devuelve la estructura de las opciones del perfil de usuario.
export const crearOpAsideNavPerfil = () => {
    return `<div id="asideCambiarImgPerfil" class="divServicioAside" data-bs-toggle="modal" data-bs-target="#modalIconoPerfil">
                <img src="./img/empleadoIcono.png" alt="">
                <div class="asideElInfo ocultarAsideHover ocultarElAside">
                    <p>Actualizar</p>
                    <p>Actualizar icono de perfil</p>
                </div>
            </div>`;
}

//Crea la estructura de como se va a mostrar los datos del empleado en una fila de una tabla, con los botones de borrar y editar.
export const crearFilaDatosEmpleado = (empleado) => {
    return `<tr id="${empleado.id}" class="fila">
                <td class="celda codEmpleado">${empleado.data().codEmpleado}</td>
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

//Crea una plantilla de como se va a mostrar el tablón de anuncio.
export const crearTablonPlantillaEmpresa1 = (tablon, pos) => {
    var date = new Date(tablon.fPubli.seconds * 1000);
    console.log(tablon);
    return `<div class="tablonAnuncio"><img id="${pos}" class="btnEliminarTablon" src="././././img/eliminar.png" />
                <div class="divTituloTablon"><h1>${tablon.titulo}</h1></div>
                <div class="divImagenTablonIzq"><img src="${tablon.rutaImagen}" alt=""></div>
                <div class="divContenido">${tablon.contenido}</div>
                <div class="divFooterTablon">
                <div class="divAutor">Autor: ${tablon.autor}</div>
                    <div class="divFPubli">Fecha Publicación: <span>${date.getDate()+
                        "/"+(date.getMonth()+1)+
                        "/"+date.getFullYear()+
                        " "+date.getHours()+
                        ":"+date.getMinutes()+
                        ":"+date.getSeconds()}</span>
                    </div>
                </div>
            </div>`;
}

//Crea otra plantilla de como se va a mostrar el tablón de anuncio.
export const crearTablonPlantillaEmpresa2 = (tablon, pos) => {
    var date = new Date(tablon.fPubli.seconds * 1000);
    return `<div class="tablonAnuncio"><img id="${pos}" class="btnEliminarTablon" src="././././img/eliminar.png" />
                <div class="divTituloTablon"><h1>${tablon.titulo}</h1></div>
                <div class="divImagenTablonDrch"><img src="${tablon.rutaImagen}" alt=""></div>
                <div class="divContenido">${tablon.contenido}</div>
                <div class="divFooterTablon">
                <div class="divAutor">Autor: ${tablon.autor}</div>
                    <div class="divFPubli">Fecha Publicación: <span>${date.getDate()+
                        "/"+(date.getMonth()+1)+
                        "/"+date.getFullYear()+
                        " "+date.getHours()+
                        ":"+date.getMinutes()+
                        ":"+date.getSeconds()}</span>
                    </div>
                </div>
            </div>`;
}

//Crea una plantilla de como se va a mostrar el tablón de anuncio para empleado.
export const crearTablonPlantillaEmpleado1 = (tablon) => {
    var date = new Date(tablon.fPubli.seconds * 1000);
    console.log(tablon);
    return `<div class="tablonAnuncio">
                <div class="divTituloTablon"><h1>${tablon.titulo}</h1></div>
                <div class="divImagenTablonIzq"><img src="${tablon.rutaImagen}" alt=""></div>
                <div class="divContenido">${tablon.contenido}</div>
                <div class="divFooterTablon">
                <div class="divAutor">Autor: ${tablon.autor}</div>
                    <div class="divFPubli">Fecha Publicación: <span>${date.getDate()+
                        "/"+(date.getMonth()+1)+
                        "/"+date.getFullYear()+
                        " "+date.getHours()+
                        ":"+date.getMinutes()+
                        ":"+date.getSeconds()}</span>
                    </div>
                </div>
            </div>`;
}

//Crea otra plantilla de como se va a mostrar el tablón de anuncio para empleado.
export const crearTablonPlantillaEmpleado2 = (tablon) => {
    var date = new Date(tablon.fPubli.seconds * 1000);
    return `<div class="tablonAnuncio">
                <div class="divTituloTablon"><h1>${tablon.titulo}</h1></div>
                <div class="divImagenTablonDrch"><img src="${tablon.rutaImagen}" alt=""></div>
                <div class="divContenido">${tablon.contenido}</div>
                <div class="divFooterTablon">
                <div class="divAutor">Autor: ${tablon.autor}</div>
                    <div class="divFPubli">Fecha Publicación: <span>${date.getDate()+
                        "/"+(date.getMonth()+1)+
                        "/"+date.getFullYear()+
                        " "+date.getHours()+
                        ":"+date.getMinutes()+
                        ":"+date.getSeconds()}</span>
                    </div>
                </div>
            </div>`;
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

//Crea un div que mostrará datos del empleado que ha iniciado sesión, estará oculto.
export const crearDivInfoDatosEmpleado = (empleado) => {
    return `<div class="infoPerfil ocultar">
                <div class="imgPerfil"><img src="./img/empleadoIcono.png" alt=""></div>
                <div class="nombreCompleto">${empleado.data().nombre} ${empleado.data().apellidos}</div>
                <div class="dni">Dni: <span>${empleado.data().dni}</span></div>
                <div class="correo">Correo: <span>${empleado.data().correo}</span></div>
                <div class="puestoTrabajo">Puesto Trabajo: <span>${empleado.data().puestoTrabajo}</span></div>
                <div class="turno">Turno: <span>${empleado.data().turno}</span></div>
            </div>`;
}

//Crea un div con datos del día festivo pasado por parámetro.
export const crearDiaCalendario = (dia, mes) => {
    return `<div class="calendarioDia">
                <div class="calendario">
                    ${dia.date_day} <em>${dia.week_day}</em>
                </div>
                <div class="desaparecer infoCalOculta">
                    <div>
                        <div><span class="diaInfoLetra">${dia.date_day}</span>, <span class="diaInfoNum">${dia.week_day}</span></div>
                        <div class="mesInfo">${mes}</div>
                    </div>
                    <div id="infoDiaSelec">
                        <div><span class="atributo">Nombre:</span> ${dia.name}</div>
                        <div><span class="atributo">Tipo:</span> ${dia.type}</div>
                        <div><span class="atributo">Ubicación:</span> ${dia.location}</div>
                    </div>
                </div>
            </div>`;
}

//Crea un div que tendrá un menú de los meses y el contenido de los días festivos.
export const crearDivCalendarioGeneral = () => {
    return `<div id="calendarioGeneral">
                <h2><span id="mesTituloCal"></span>2022</h2>
                <div class="enlMesesCalendario">
                    <span id="enero">JAN</span>
                    <span id="febrero">FEB</span>
                    <span id="marzo">MAR</span>
                    <span id="abril">APR</span>
                    <span id="mayo">MAY</span>
                    <span id="junio">JUN</span>
                    <span id="julio">JUL</span>
                    <span id="agosto">AUG</span>
                    <span id="septiembre">SEP</span>
                    <span id="octubre">OCT</span>
                    <span id="noviembre">NOV</span>
                    <span id="diciembre">DEC</span>
                </div>
                <div id="calendarioMes"></div>
            </div>`;
}

//Crea un div que contendrá información del día festivo.
export const crearDivCalendarioInfo = () => {
    return `<div id="calendarioInfo">
                <div>
                    <div><span class="diaInfoLetra">Información</span></div>
                    <div class="mesInfo">Día</div>
                </div>
                <div>
                    <div><span class="atributo">Selecciona un mes y un día.</span></div>
                    <div><span class="atributo">Nombre:</span> no Seleccionado</div>
                    <div><span class="atributo">Tipo:</span> no Seleccionado</div>
                    <div><span class="atributo">Ubicación</span>: no Seleccionado</div>
                </div>
            </div>`;
}

//Exportamos.
export * from './plantilla.js'