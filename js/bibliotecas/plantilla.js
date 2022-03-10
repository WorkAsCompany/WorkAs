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

//Añade al DOM lo que sería la estructura de la página web si se ha iniciado sesión como empresa.
export const crearPaginaInicialEmpresa = (usu) => {
    return `<header id="cabecera">
                <div class="logotipo">
                    <a href="./index.html"><img src="./img/logoSinFondo.svg" alt=""></a>
                </div>
                <h1 class="nombreEmpresa">Empresa: ${usu.data().rznSocial}</h1>
                <nav class="navMenu">
                    <ul>
                    <li><a>Empleado</a>
                        <ul>
                            <li id="listAnyadirEmp" class="listOpcionesEmpleado"><a>Añadir</a></li>
                            <li id="listListarEmp" class="listOpcionesEmpleado"><a>Listar</a></li>
                        </ul>
                    </li>
                    <li><a id="enlCalendario">Calendario</a></li>
                    <li><a>Tablón Anuncio</a>
                        <ul>
                            <li id="listCrearTablonAnuncio" class="listOpcionesTablonAnuncio"><a>Crear</a></li>
                            <li id="listListarTablonAnuncio" class="listOpcionesTablonAnuncio"><a>Listar</a></li>
                        </ul>
                    </li>
                    <li><a href="">Cerrar Sesión</a></li>
                    <li id="iconoPerfil"><img src="./img/empresaIcono.png" alt=""></li>
                    </ul>
                </nav>
            </header>
            <div id="principal"><img id="imgInicioWorkas" src="././././img/imgInicioWorkas.png" alt=""></div>`;
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
            <div id="principal"><img id="imgInicioWorkas" src="././././img/imgInicioWorkas.png" alt=""></div>`;
};

//Crea la estructura de como se va a mostrar los datos del empleado en una fila de una tabla, con los botones de borrar y editar.
export const crearFilaDatosEmpleado = (empleado) => {
    return `<div id="${empleado.id}" class="fila">
                <div class="celda codEmpleado">${empleado.data().codEmpleado}</div>
                <div class="celda dni editable">${empleado.data().dni}</div>
                <div class="celda apellidos editable">${empleado.data().apellidos}</div>
                <div class="celda nombre editable">${empleado.data().nombre}</div>
                <div class="celda correo">${empleado.data().correo}</div>
                <div class="celda puestoTrabajo editable">${empleado.data().puestoTrabajo}</div>
                <div class="celda turno editable">${empleado.data().turno}</div>
                <div class="divBtnEmpleado" class="celda">
                    <button class="btnEditar editarSi" type="button"><img src="././././img/editar.png" /></button> 
                    <button class="btnEliminar" type="button"><img src="././././img/eliminar.png" /></button>
                </div>
            </div>`;
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

//Crea un div que mostrará datos de la empresa que ha iniciado sesión, estará oculto.
export const crearDivInfoDatosEmpresa = (empresa) => {
    return `<div class="infoPerfil ocultar">
                <div class="imgPerfil"><img src="./img/empresaIcono.png" alt=""></div>
                <div class="nombreCompleto">${empresa.data().rznSocial}</div>
                <div class="id">ID: <span>${empresa.data().id}</span></div>
                <div class="correo">Correo: <span>${empresa.data().correo}</span></div>
                <div class="cp">CP: <span>${empresa.data().cp}</span></div>
                <div class="dir">Dir: <span>${empresa.data().dir}</span></div>
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