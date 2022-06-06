import { Calendario } from "./calendario.js";

import * as Plantilla from "../bibliotecas/plantilla.js";  

import { onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

   /*  --- CLASE CHAT ---  */
//Tenemos todas las fuciones o procedimientos que nos pueden ser utiles para trabajar con los días festivos y días solicitados para vacaciones por los empleados.
var doc = document;

var chatSlc = "";
var contChat = 0;

class Chat extends Calendario {
    constructor() {
        super();
    }

    chatMostrarMsgChat = async() => {
        var usuSesion = await this.devolverEmpresa(this.getUsu().id);
        const chats = await onSnapshot(this.devolverEnlace("chat"), (chats) => {
            var nMsg = 0;
            chats.docs.map((chat) => {
                if(chat.data().conversacion != null && chat.data().conversacion.length > 0 && chat.data().arrayUsuariosChat.includes(usuSesion.id) && chat.data().conversacion[chat.data().conversacion.length-1].idUsu != usuSesion.id) {
                    nMsg += chat.data().nMsgSinLeer;
                }
            });
            nMsg = nMsg === 0 ? "0": nMsg < 100 ? `${nMsg}+`: "99+";
            doc.getElementById("btnChat").getElementsByClassName("badge")[0].innerHTML = "";
            doc.getElementById("btnChat").getElementsByClassName("badge")[0].innerHTML = nMsg;

        });
    }

    mostrarMsgConversacion = async(chat, nMsgSinLeer) =>  {
        doc.getElementById("conversacion").innerHTML = "";
        var usuSesion = await this.devolverEmpresa(this.getUsu().id);
        var conver = "";

            if(chatSlc === chat.id && chat.data().conversacion != null) {
                var conversacion = chat.data().conversacion;
                var cambioDia = new Date(0);
                for (let i = 0; i < conversacion.length; i++) {
                    var fechaMsg = new Date(conversacion[i].fecha.seconds * 1000)

                    if(fechaMsg.getDay() !== cambioDia.getDay()) {
                        conver += Plantilla.crearDivMostrarDiaConversacion(fechaMsg);
                        cambioDia = new Date(conversacion[i].fecha.seconds * 1000)
                    }

                    /*if(nMsgSinLeer !== 0 && nMsgSinLeer === (conversacion.length-i) && chat.data().conversacion[chat.data().conversacion.length-1].idUsu) {
                        conver += "<div class='divMsgSinLeer'>Mensajes no leídos</div>";
                    }*/

                    var esUsuSesion = conversacion[i].idUsu === usuSesion.id;

                    conver += Plantilla.crearPlantillaMensaje(conversacion[i], esUsuSesion);
                }
            }

        contChat++;
        doc.getElementById("conversacion").innerHTML = conver;
        doc.getElementById("conversacion").scrollTop = doc.getElementById("conversacion").scrollHeight;
    }

    enviarMensajeChat = async() =>  {
        var inputTxt = doc.getElementsByClassName("emojionearea-editor")[0];

        if(inputTxt.innerHTML === "") return;

        var msg =   {
                        idUsu: this.getUsu().id,
                        fecha: new Date(),
                        mensaje: inputTxt.innerHTML
                    };

        var chat = await this.devolverChat(chatSlc);
        await this.actualizarConversacion(chatSlc, chat.data().nMsgSinLeer, msg);

        inputTxt.innerHTML = "";
    }

    asignarEvEnviarMensajeChat() {
        var btn = doc.getElementById("inputEnviarMsg");
        btn.addEventListener(
            "click",
            (e) => {
                this.enviarMensajeChat();
            },
            false
        );
    }

    slcUsuListChat = async(tipoUsu, idChat) => {
        if(chatSlc !== "") {
            var msg = await this.actualizarNMsgSinLeer(idChat, 0);
        }

        chatSlc = idChat;

        if(tipoUsu === "empresa") {
            var empleadosArray = await this.devolverEmpleadosEmpresa(this.getUsu().id);
            var usuSesion = await this.devolverEmpresa(this.getUsu().id);
        } else {
            var usuSesion = await this.devolverEmpleado(this.getUsu().id);
            var empresaEmpleado = await this.devolverEmpresa(usuSesion.data().idEmpresa);
            var empleadosArray = await this.devolverEmpleadosEmpresa(usuSesion.data().idEmpresa);
        }

        var nMsgSinLeer =  await this.devolverChat(chatSlc);
        doc.getElementById("divChatConversacion").classList.remove("ocultar")
        doc.getElementById("divChatConversacion").classList.add("animate__animated", "animate__fadeIn")

        await this.actualizarNMsgSinLeer(chatSlc, 0);
        doc.getElementsByClassName("emojionearea-editor")[0].innerHTML = "";

        const chats = await onSnapshot(this.devolverEnlace("chat"), (chats) => {

            chats.docs.map((chat) => {

                if(chatSlc === chat.id) {
                    if(doc.getElementById("divChatConversacion") == null) return;
                    var idUsu = chat.data().arrayUsuariosChat;
                    idUsu.splice(chat.data().arrayUsuariosChat.indexOf(usuSesion.id), 1);
                    idUsu = idUsu[0];
                    var usu = empleadosArray.docs.filter(usu => usu.id === idUsu)[0];
                    contChat = 0;
                    if(tipoUsu === "empresa") {
                        doc.getElementById("imgChatSlc").innerHTML = usu.data().iconoPerfil ? `<img src="${usu.data().iconoPerfil}" alt="">` : "<img src='./img/empleadoIcono.png' alt=''>";
                        doc.getElementById("nombreUsuChatSlc").innerHTML = `${usu.data().nombre} ${usu.data().apellidos}`;

                        this.mostrarMsgConversacion(chat, nMsgSinLeer.data().nMsgSinLeer);     

                    } else if(idUsu !== empresaEmpleado.id) {
                        doc.getElementById("imgChatSlc").innerHTML = usu.data().iconoPerfil ? `<img src="${usu.data().iconoPerfil}" alt="">` : "<img src='./img/empleadoIcono.png' alt=''>";
                        doc.getElementById("nombreUsuChatSlc").innerHTML = `${usu.data().nombre} ${usu.data().apellidos}`;

                        this.mostrarMsgConversacion(chat, nMsgSinLeer.data().nMsgSinLeer);

                    } else if(idUsu === empresaEmpleado.id) {
                        doc.getElementById("imgChatSlc").innerHTML = empresaEmpleado.data().iconoPerfil ? `<img src="${empresaEmpleado.data().iconoPerfil}" alt="">` : "<img src='./img/empresaIcono.png' alt=''>";
                        doc.getElementById("nombreUsuChatSlc").innerHTML = empresaEmpleado.data().rznSocial;

                        this.mostrarMsgConversacion(chat, nMsgSinLeer.data().nMsgSinLeer);
                    }
                }
            });  
        });
    }

    asignarEvSlcUsuListChat(tipoUsu) {
        var divChats = doc.getElementsByClassName("divUsuarioChat");
        if(doc.getElementById("btnVolverListChat")) {
            this.asignarEvVolverListChat();
        }
        for (let i = 0; i < divChats.length; i++) {
            divChats[i].addEventListener(
                "click",
                async(e) => {
                    this.slcUsuListChat(tipoUsu, divChats[i].id);
                    doc.getElementById("divChatConversacion").classList.add("zIndexChat")
                },
                false
            );
        }
    }

    asignarEvVolverListChat() {
        var btnVolver = doc.getElementById("btnVolverListChat");
        btnVolver.addEventListener(
            "click",
            async(e) => {
                doc.getElementById("divChatConversacion").classList.remove("zIndexChat")
            },
            false
        );
    }

    modificarPaginaOpNavChat = async(tipoUsu) => {
        if(tipoUsu === "empresa") {

        }

        doc.getElementById("principal").innerHTML = Plantilla.crearPlantillaChat();
        this.obtenerListadoUsuariosChat(tipoUsu);

        //Emojis
        $(doc).ready(function() {
            $("#inputMsgChat").emojioneArea({
                pickerPosition: "top"
            });
        })
    }

    obtenerListadoUsuariosChat = async (tipoUsu) => {
        var divListadoUsu = doc.getElementById("listadoUsuariosChat");
        this.asignarEvEnviarMensajeChat();

        if(tipoUsu === "empresa") {
            var usuSesion = await this.devolverEmpresa(this.getUsu().id);
            var empleadosArray = await this.devolverEmpleadosEmpresa(this.getUsu().id);

            const usuarios = await onSnapshot(this.devolverEnlace("empleado"), (usuarios) => {
                usuarios.docs.map((usuario) => {
                    if(doc.getElementById("divChat") && doc.getElementById(usuario.id) != undefined) {
                        var conectadoClass = usuario.data().conectado ? "conectado" : "desconectado";
                        doc.getElementById(usuario.id).classList.remove("conectado");
                        doc.getElementById(usuario.id).classList.remove("desconectado");
                        doc.getElementById(usuario.id).classList.add(conectadoClass);
                    }
                })
            });

            const chats = await onSnapshot(this.devolverEnlace("chat"), (chats) => {
                divListadoUsu.innerHTML = "";
                chats = chats.docs.sort((a, b) => a.data().fLastMsg < b.data().fLastMsg) 
                chats.map((chat) => {
                    var idUsu = chat.data().arrayUsuariosChat;
                    idUsu.splice(chat.data().arrayUsuariosChat.indexOf(usuSesion.id), 1);
                    idUsu = idUsu[0];
    
                    var usu = empleadosArray.docs.filter(usu => usu.id ===  idUsu);
                    if(usu != undefined && usuSesion.id === chat.data().idEmpresa && chat.data().arrayUsuariosChat.includes(usuSesion.id)) {
    
                        divListadoUsu.innerHTML += Plantilla.crearFilaListUsuChat(usu[0], chat, chatSlc);
                    }
                });  

                this.asignarEvSlcUsuListChat(tipoUsu);
            }); 

        } else if(tipoUsu === "empleado") {
            var usuSesion = await this.devolverEmpleado(this.getUsu().id);
            var empresaEmpleado = await this.devolverEmpresa(usuSesion.data().idEmpresa);
            var empleadosArray = await this.devolverEmpleadosEmpresa(usuSesion.data().idEmpresa);

            const usuarios = await onSnapshot(this.devolverEnlace("empleado"), (usuarios) => {
                usuarios.docs.map((usuario) => {

                    if(doc.getElementById("divChat") && doc.getElementById(usuario.id) != undefined) {
     
                        var conectadoClass = usuario.data().conectado ? "conectado" : "desconectado";
                        doc.getElementById(usuario.id).classList.remove("conectado");
                        doc.getElementById(usuario.id).classList.remove("desconectado");
                        doc.getElementById(usuario.id).classList.add(conectadoClass);
                    }
                })
            });

            const empresa = await onSnapshot(this.devolverEnlace("empresa"), (empresas) => {
                empresas.docs.map((empresa) => {
                    if(doc.getElementById("divChat") && doc.getElementById(empresa.id) != undefined) {
                        var conectadoClass = empresa.data().conectado ? "conectado" : "desconectado";
                        doc.getElementById(empresa.id).classList.remove("conectado");
                        doc.getElementById(empresa.id).classList.remove("desconectado");
                        doc.getElementById(empresa.id).classList.add(conectadoClass);
                    }
                })
            });

            const chats = await onSnapshot(this.devolverEnlace("chat"), (chats) => {
                divListadoUsu.innerHTML = "";
                chats = chats.docs.sort((a, b) => a.data().fLastMsg < b.data().fLastMsg) 

                chats.map((chat) => {
                    var idUsu = chat.data().arrayUsuariosChat;
                    idUsu.splice(chat.data().arrayUsuariosChat.indexOf(usuSesion.id), 1);
                    var usu = empleadosArray.docs.filter(usu => usu.id === idUsu[0]);

                    if(idUsu[0] === usuSesion.data().idEmpresa) {
                        usu = empresaEmpleado;
                        
                    } else if(usu.length > 0) {
                        usu = usu[0];
                    } else {
                        usu = null;
                    }

                    if(usu != null && usuSesion.data().idEmpresa === chat.data().idEmpresa && chat.data().arrayUsuariosChat.includes(usu.id) && chat.data().arrayUsuariosChat.includes(usuSesion.id)) {
                        divListadoUsu.innerHTML += Plantilla.crearFilaListUsuChat(usu, chat, chatSlc);
                    }

                });  

                this.asignarEvSlcUsuListChat(tipoUsu);
            }); 
        }
        
        //Filtrar nombre usuario por input.
        $(doc).ready(function() {
            $("#inputBuscarUsuarioChat").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $(".nombreUsuGrupoChat").filter(function() {
                    $(this.parentNode.parentNode).toggle($(this).text()
                    .toLowerCase().indexOf(value) > -1)
                });
            });
        });
        doc.getElementsByClassName("emojionearea-editor")[0].innerHTML = "";
    };
}

//Exportamos.
export { Chat };