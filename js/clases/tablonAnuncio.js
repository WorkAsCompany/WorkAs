import { RotarTurno } from "./rotarTurno.js";
import * as Plantilla from "../bibliotecas/plantilla.js";  
import * as General from "../bibliotecas/general.js";

import { onSnapshot, where, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
   
   /*  --- BIBLIOTECA TABLÓN DE ANUNCIO ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con los tablones de anuncio.
var doc = document;

var anuncioSlc;

class TablonAnuncio extends RotarTurno {
    constructor() {
        super();
    }

    aumentarVisita = async() => {
        var visitas = anuncioSlc.data().visualizaciones;
        visitas++;

        await this.actualizarVisitas(anuncioSlc.id, visitas)

        doc.getElementById("spanVisitas").innerHTML = visitas;

        anuncioSlc = await this.devolverAnuncio(anuncioSlc.id);
    }

    mostrarComentarios = async() => {
        var divComentario = doc.getElementById("divComentarios");
        var comentarios = "";
        for (let i = 0; i < anuncioSlc.data().comentarios.length; i++) {
            var tipoUsuario = anuncioSlc.data().comentarios[i].tipoUsuario;

            if(tipoUsuario === "empresa") {
                var usuario = await this.devolverEmpresa(anuncioSlc.data().comentarios[i].idUsuario);
            } else {
                var usuario = await this.devolverEmpleado(anuncioSlc.data().comentarios[i].idUsuario);
            }
            
            var texto = anuncioSlc.data().comentarios[i].texto;

            comentarios = Plantilla.crearComentario(texto, usuario.data(), tipoUsuario) + comentarios;
        }

        doc.getElementById("nComentarios").innerHTML = anuncioSlc.data().comentarios.length;
        divComentario.innerHTML = comentarios;
    }

    enviarComentario = async() => {
        var texto = doc.getElementById("txtArea").value.trim();
        var usuario = await this.devolverEmpresa(this.getUsu().id);

        var tipoUsuario = usuario.data() == undefined ? "empleado" : "empresa";
        if(texto === "") {
            return;
        }

        var comentario = {
            idUsuario: this.getUsu().id,
            texto: texto,
            tipoUsuario: tipoUsuario
        }
        var texto = doc.getElementById("txtArea").value = "";

        await this.actualizarArrayAnuncio(anuncioSlc.id, comentario);
        anuncioSlc = await this.devolverAnuncio(anuncioSlc.id);

        this.mostrarComentarios();
    }

    asignarEvEnviarComentario() {
        doc.getElementById("enlEnviarComentario").addEventListener(
            "click",
            (e) => {
                this.enviarComentario();
            },
            false
        );
    }

    quitarLike = async(imgLike) => {
        var likes = anuncioSlc.data().likes;
        likes--;
        var arrayUsuarioLikes = anuncioSlc.data().arrayUsuarioLikes;
        arrayUsuarioLikes.splice(arrayUsuarioLikes.indexOf(this.getUsu().id), 1);
        
        await this.actualizarLikes(anuncioSlc.id, likes, arrayUsuarioLikes);

        imgLike.classList.remove("pulsado");
        imgLike.src = "./img/iconoLike.png";

        doc.getElementById("spanLike").innerHTML = likes;

        anuncioSlc = await this.devolverAnuncio(anuncioSlc.id);
    }

    darLike = async(imgLike) => {
        var likes = anuncioSlc.data().likes;
        likes++;
        var arrayUsuarioLikes = anuncioSlc.data().arrayUsuarioLikes;
        arrayUsuarioLikes.push(this.getUsu().id)

        await this.actualizarLikes(anuncioSlc.id, likes, arrayUsuarioLikes);

        imgLike.classList.add("pulsado");
        imgLike.src = "./img/iconoLikePulsado.png";[].slice

        doc.getElementById("spanLike").innerHTML = likes;

        anuncioSlc = await this.devolverAnuncio(anuncioSlc.id);
    }

    asignarEvDarLike() {
        doc.getElementById("imgLike").addEventListener(
            "click",
            (e) => {
                if (e.target.classList.contains("pulsado")) {
                    this.quitarLike(e.target)
                } else {
                    this.darLike(e.target)
                }
            },
            false
        );
    }

    eliminarAnuncioTablon = async(idAnuncio) => {
        await this.eliminarAnuncioEmpresa(idAnuncio);
        this.mostrarTablonAnuncio("empresa");

        alert = General.crearAlert("El anuncio se ha eliminado correctamente.", "exitoAlert");
        doc.getElementById("divTablones").insertBefore(alert, doc.getElementById("tituloDivLista"));
    }

    asignarEvEliminarAnuncioTablon() {
        doc.getElementById("imgEliminarAnuncioTablon").addEventListener(
            "click",
            (e) => {
                this.eliminarAnuncioTablon(e.target.parentNode.id);
            },
            false
        );
    }

    mostrarAnuncio = async(id, tipoUsu) => {
        anuncioSlc = await this.devolverAnuncio(id);

        doc.getElementById("principal").innerHTML = Plantilla.crearAnuncioPlantillaEmpresa(anuncioSlc.data(), this.getUsu().id, tipoUsu, anuncioSlc.id);
        doc.getElementById("principal").innerHTML += Plantilla.crearCanvasEstadisticas();

        this.asignarEvDarLike();
        this.asignarEvEnviarComentario();
        this.mostrarComentarios();
        this.aumentarVisita();

        if(doc.getElementById("imgEliminarAnuncioTablon") != null) {
            this.asignarEvEliminarAnuncioTablon();
        }
    }

    asignarEvMostrarAnuncio(tipoUsu) {
        for (let i = 0; i < doc.getElementsByClassName("cardAnuncio").length; i++) {
            doc.getElementsByClassName("cardAnuncio")[i].addEventListener(
                "click",
                (e) => {
                    this.mostrarAnuncio(e.target.offsetParent.id, tipoUsu);
                },
                false
            );
        }
    }

    ocultarTablon(tablon) {
        if(tablon.classList.contains("ocultar")) {
            tablon.classList.remove("ocultar")
        } else {
            tablon.classList.add("ocultar")
        }
    }

    asignarEvOcultarTablon() {
        for (let i = 0; i < doc.getElementsByClassName("tituloMesTablon").length; i++) {
            doc.getElementsByClassName("tituloMesTablon")[i].addEventListener(
                "click",
                (e) => {
                    this.ocultarTablon(e.target.nextSibling);
                },
                false
            );
        }
    }

    eliminarAnuncio = async(idAnuncio) =>  {
        await this.eliminarAnuncioEmpresa(idAnuncio);
        this.mostrarTablonAnuncio("empresa");

        alert = General.crearAlert("El anuncio se ha eliminado correctamente.", "exitoAlert");
        doc.getElementById("divTablones").insertBefore(alert, doc.getElementById("tituloDivLista"));
    }

    asignarEvEliminarAnuncio() {
        for (let i = 0; i < doc.getElementsByClassName("imgEliminarAnuncio").length; i++) {
            doc.getElementsByClassName("imgEliminarAnuncio")[i].addEventListener(
                "click",
                (e) => {
                    this.eliminarAnuncio(e.target.offsetParent.id);
                    e.stopPropagation();
                },
                false
            );
        }
    }

    mostrarTablonAnuncio = async(tipoUsu) => {
        doc.getElementById("principal").innerHTML = `<div id="divTablones" class="animate__animated animate__fadeIn animate__lower">
                                                        <h2 id='tituloDivLista' class="row g-3">Listar Tablón de Anuncios</h2><hr>
                                                     </div>`;

        doc.getElementById("principal").innerHTML += Plantilla.crearCanvasEstadisticas();

        var idEmpresa = null;                                             
        if(tipoUsu === "empleado") {
            idEmpresa = await this.devolverEmpleado(this.getUsu().id);
        }                                             
        var arrayAnuncios = await this.devolverAnunciosEmpresa(idEmpresa == null ? this.getUsu().id : idEmpresa.data().idEmpresa);

        const month = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        var mes = "";
        var anyo = "";
        var divTablonMes;
        var tablonMes

        if (arrayAnuncios.docs.length > 0) {
            arrayAnuncios.docs.map((anuncio) => {
                var date = new Date(anuncio.data().fPubli.seconds * 1000);
                if(date.getMonth() != mes || (date.getMonth() == mes && date.getFullYear() != anyo)) {
                    divTablonMes = doc.createElement("div");
                    divTablonMes.classList.add("divTablonMes");
                    divTablonMes.innerHTML = `<h2 class="tituloMesTablon">${month[date.getMonth()]}, ${date.getFullYear()}</h2>`;

                    tablonMes = doc.createElement("div");
                    tablonMes.classList.add("tablonMes");

                    divTablonMes.appendChild(tablonMes);
                    doc.getElementById("divTablones").appendChild(divTablonMes);
                }

                tablonMes.innerHTML += Plantilla.creardivAnuncioEnTablon(anuncio, tipoUsu);

                mes = date.getMonth();
                anyo = date.getFullYear();

            });

            this.asignarEvMostrarAnuncio(tipoUsu);
            this.asignarEvOcultarTablon();

            if(tipoUsu === "empresa") {
                this.asignarEvEliminarAnuncio();
            }

        } else {
            div.innerHTML = `<p class="mensajeInfo">No hay empleados anuncios publicados todavía.</p>`;
        }
        /*doc.getElementById("principal").innerHTML = Plantilla.crearAnuncioPlantillaEmpresa(anuncioSlc.data(), this.getUsu().id);

        this.asignarEvDarLike();
        this.asignarEvEnviarComentario();
        this.mostrarComentarios();
        this.aumentarVisita();*/
    }

    asignarEvMostrarTablonAnuncio(tipoUsu) {
        doc.getElementById("asideListarTablon").addEventListener(
            "click",
            (e) => {
                this.mostrarTablonAnuncio(tipoUsu);
            },
            false
        );
    }

    crearContenidoParrafos() {
        var txtArea = doc.getElementsByClassName("inputParrafo")
        var parrafos = "";
        for (let i = 0; i < txtArea.length; i++) {
            if(txtArea[i].value !== "") {
                parrafos += `<p>${txtArea[i].value}</p>`;
            }
        }
        return parrafos;
    }

    crearParrafo() {
        var parrafos = doc.getElementsByClassName("inputParrafo");
        var poderAnyadir = true;

        for (let i = 0; i < parrafos.length; i++) {
            if(parrafos[i].value === "") {
                poderAnyadir = false;
            }
        }

        if(poderAnyadir) {
            doc.getElementById("divParrafos").appendChild(Plantilla.crearDivAgregarParrafo());

        }
    }

    asignarEvCrearParrafo() {
        doc.getElementById("divAnyadirParrafo").addEventListener(
            "click",
            (e) => {
                this.crearParrafo()
            },
            false
        );
    }

    //Genera un código de 8 carácteres aleatorios.
    generarCodTablon() {
        var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var codigo = "";
        for (var i = 0; i < 8; i++) {
            codigo += `${caracteres.charAt(Math.floor(Math.random() * caracteres.length))}`;
        }
        return codigo;
    }

    crearAnuncio = async() => {
        var div = doc.getElementById("principalCrearAnuncio");
        var alert;

        var fPubli = new Date();
        var idEmpresa = this.getUsu().id;
        var titulo = doc.getElementById("inputTitulo").value.trim();
        var subtitulo = doc.getElementById("inputSubtitulo").value.trim();
        var autor = doc.getElementById("inputAutor").value.trim();
        var nEnlace = doc.getElementById("inputNombreEnl").value.trim();
        var enlace = doc.getElementById("inputEnl").value.trim();
        var contenido = this.crearContenidoParrafos();

        var file = ($('#inputAnyadirImg'))[0].files[0];

        if (this.comprobarRazSocial(titulo) && this.comprobarRazSocial(autor) && contenido !== "" && file != undefined && (/\.(jpg|png|gif|jpeg)$/i).test(file.name) && !(nEnlace !== "" && enlace === "") && !(nEnlace === "" && enlace !== "")) {
            var anuncio = {
                titulo: titulo,
                subtitulo: subtitulo,
                autor: autor,
                fPubli: fPubli,
                imgAnuncio: "",
                contenido: contenido,
                nEnlace: nEnlace,
                enlace: enlace,
                visualizaciones: 0,
                likes: 0,
                arrayUsuarioLikes: [],
                arrayUsuarioNotificados: [],
                comentarios: [],
                idEmpresa: idEmpresa
            }

            doc.getElementById("parrafosAnuncio").innerHTML =   `<div id="divParrafos">
                                                                    <div class="form-floating divInputParrafo">
                                                                        <textarea class="form-control inputParrafo" placeholder="Escribe un párrafo"></textarea>
                                                                        <label>Escribe un párrafo</label>
                                                                    </div>
                                                                </div>
                                                                <div id="divAnyadirParrafo">
                                                                    <img src="./img/añadir.png" alt="">
                                                                </div>`

            var nombreImg = `${this.generarCodTablon()}.${file.name.substr( (file.name.lastIndexOf(".")+1 - file.name.length) )}`;
            await this.subirImgBD(`imgAnuncio/${nombreImg}`, file);

            var ruta = await this.descargarImgBD(`imgAnuncio/${nombreImg}`);

            anuncio.imgAnuncio = ruta;
            var anuncio = await this.anyadirAnuncio(anuncio);

            doc.getElementById("formAnuncio").reset();
            this.mostrarTablonAnuncio("empresa");

            alert = General.crearAlert("El anuncio se ha creado correctamente.", "exitoAlert");
            doc.getElementById("divTablones").insertBefore(alert, doc.getElementById("tituloDivLista"));

        } else {
            if(contenido === "") {
                alert = General.crearAlert("No se ha podido crear el anuncio, debes introducir al menos un párrafo.", "errorAlert");
                div.insertBefore(alert, doc.getElementById("tituloDivCrearAnuncio"));
            } else if(nEnlace !== "" && enlace === "") {
                alert = General.crearAlert("No se ha podido crear el anuncio, rellene el campo del enlace.", "errorAlert");
                div.insertBefore(alert, doc.getElementById("tituloDivCrearAnuncio"));
            } else if(nEnlace === "" && enlace !== "") {
                alert = General.crearAlert("No se ha podido crear el anuncio, rellene el campo del nombre del enlace.", "errorAlert");
                div.insertBefore(alert, doc.getElementById("tituloDivCrearAnuncio"));
            } else {
                alert = General.crearAlert("No se ha podido crear el anuncio, error en la introducción de datos.", "errorAlert");
                div.insertBefore(alert, doc.getElementById("tituloDivCrearAnuncio"));
            }
        }   
    }

    asignarEvBtnCrearAnuncio() {
        doc.getElementById("btnCrearAnuncio").addEventListener(
            "click",
            (e) => {
                this.crearAnuncio();
            },
            false
        );
    }

    divCrearAnuncio() {
        doc.getElementById("principal").innerHTML = Plantilla.crearDivCrearAnuncio();
        doc.getElementById("principal").innerHTML += Plantilla.crearCanvasEstadisticas();
        doc.getElementById("divFormCrearAnuncio").innerHTML += Plantilla.crearFormularioAnuncio();

        this.asignarEvBtnCrearAnuncio();
        General.evTeclaEnterForm("btnCrearAnuncio", "inputCrearForm");
        this.asignarEvCrearParrafo();
    }

    asignarEvDivCrearAnuncio() {
        doc.getElementById("asideCrearAnuncio").addEventListener(
            "click",
            (e) => {
                this.divCrearAnuncio();
            },
            false
        );
    }

    mostrarEstadisticasTablones = async() =>  {
        var div = doc.getElementById("bodyEstadisticasAnuncio");

        var arrayAnuncios = await this.devolverAnunciosEmpresa(this.getUsu().id);
        /*var empresa = await this.devolverEmpresa(this.getUsu().id);
        var nEmpleados = await this.devolverEmpleadosEmpresa(this.getUsu().id);*/
        var anunciosMasVistos = await this.devolverAnunciosEmpresaMasVistos(this.getUsu().id);
        var divMasVistos = "<div>";
        var nVisitas = 0, nLikes = 0, nComentarios = 0, engagement = 0;

        if (arrayAnuncios.docs.length === 0) {
            div.innerHTML = "No se han creado anuncios todavía.";
            return;
        }

        arrayAnuncios.docs.map((anuncio) => {
            nVisitas += anuncio.data().visualizaciones
            nLikes += anuncio.data().likes
            nComentarios += anuncio.data().comentarios.length        
        });

        engagement = (nLikes+nComentarios)/nVisitas*100;
        engagement = Math.round((engagement + Number.EPSILON) * 100) / 100;
        anunciosMasVistos.docs.map((anuncio) => {
            divMasVistos += `<div class="anunciosMasVisto">
                                <img src="${anuncio.data().imgAnuncio}" alt="">
                                <div><span>${anuncio.data().titulo}</span></div>
                                <div>                     
                                    <span>${anuncio.data().visualizaciones}</span>
                                    <img src="./img/iconoVisitas.png" alt="">
                                </div>
                            </div>`;
        });

        divMasVistos += "</div>";
        var estadisticas = {
            nVisitas: nVisitas,
            nLikes: nLikes,
            nComentarios: nComentarios,
            engagement: engagement,
            anunciosMasVistos: divMasVistos
        };
        div.innerHTML = Plantilla.crearDivEstadisticas(estadisticas);
    }

    asignarEvMostrarEstadisticasTablones() {
        doc.getElementById("asideEstadisticasTablon").addEventListener(
            "click",
            (e) => {
                this.mostrarEstadisticasTablones();
            },
            false
        );
    }

    mostrarToastAnuncioNuevo = async() =>  {
        var usuSesion = await this.devolverEmpleado(this.getUsu().id);
        var divContenedorToast = doc.getElementById("divToastTablonAnuncio");

        const q = query(this.devolverEnlace("tablonAnuncio"), where("idEmpresa", "==", usuSesion.data().idEmpresa), orderBy("fPubli", "desc"), limit(3));
        onSnapshot(q, {includeMetadataChanges: true}, async(snapshot) => {
            var promesas = [];
            snapshot.docChanges().forEach((anuncio) => {
                if(anuncio.type === "added" && !anuncio.doc.data().arrayUsuarioNotificados.includes(usuSesion.id) && usuSesion.data().conectado) {
                    promesas.push(this.actualizarArrayNotificacionesAnuncio(anuncio.doc.id, usuSesion.id));
                    divContenedorToast.appendChild(General.eventoToastAnuncio(Plantilla.crearToastAnuncio(anuncio.doc)));
                    contenido += Plantilla.crearToastAnuncio(anuncio.doc);
                   
                }
            })

            if(promesas.length > 0) {
                this.asignarEvToastDirigirAnuncio();
                promesas = await Promise.allSettled(promesas);         
            }
        });
    }

    toastDirigirAnuncio(idAnuncio, tipoUsu) {
        this.mostrarAnuncio(idAnuncio, tipoUsu);
    }

    asignarEvToastDirigirAnuncio() {
        var toasts = doc.getElementsByClassName("toast");
        for (let i = 0; i < toasts.length; i++) {
            toasts[i].addEventListener(
                "click",
                (e) => {
                    this.toastDirigirAnuncio(toasts[i].id, "empleado");
                },
                false
            );
        }
    }
}

//Exportamos.
export { TablonAnuncio };