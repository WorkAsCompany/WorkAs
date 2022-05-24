"use strict";
import { app } from "../bibliotecas/datosFirebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    updateDoc,
    arrayUnion,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
/*  --- CLASE BD_FIREBASE ---  */
//Tenemos todas las fuciones o procedimientos de la clase BD_FIREBASE que nos pueden ser utiles para atacar a la base de datos de firebase.

class BD_Firebase {
    constructor() {
        this.db = getFirestore(app);
        this.almacen = getStorage(app);
        this.usu = "";

    }

    //Devuelve la conexión al servicio Firestone.
    getBD() {
        return this.db;
    }

    //Devuelve la id del usuario que ha iniciado sesión.
    setUsu(usu) {
        this.usu = usu;
    }

    //Devuelve la id del usuario que ha iniciado sesión.
    getUsu() {
        return this.usu;
    }

    //Devuelve el enlace de la colección.
    devolverEnlace(id) {
        return collection(this.getBD(), id);
    }

    //Devuelve la coleccion.
    devolverColeccion(id) {
        var coleccion = getDocs(this.devolverEnlace(id));
        return coleccion;
    }

    //Añade un usuario a la bd.
    anyadirUsuario(usuario) {
        return addDoc(this.devolverEnlace("empresa"), usuario);
    }

    //Añade un empleado a la bd.
    anyadirEmpleado(empleado) {
        return addDoc(this.devolverEnlace("empleado"), empleado);
    }

    //Devuelve un documento de empresa. 
    devolverEmpresa(id) {
        var idRef = doc(this.devolverEnlace("empresa"), id);
        var coleccion = getDoc(idRef);
        return coleccion;
    }

    //Devuelve un documento de empleado. 
    devolverEmpleado(id) {
        var idRef = doc(this.devolverEnlace("empleado"), id);
        var coleccion = getDoc(idRef);
        return coleccion;
    }

    //Devuelve un documento de usuario. 
    devolverConsultaFiltrarUsuarioId(id) {
        var consulta = query(
            this.devolverEnlace("empresa"),
            where("id", "==", `${id}`)
        );
        return getDocs(consulta);
    }

    //Devuelve un documento de empleado por id. 
    devolverConsultaFiltrarEmpleadoId(id) {
        var consulta = query(
            this.devolverEnlace("empleado"),
            where("id", "==", `${id}`)
        );
        return getDocs(consulta);
    }

    //Devuelve un documento de empleado por correo. 
    devolverConsultaFiltrarEmpleadoCorreo(correo) {
        var consulta = query(
            this.devolverEnlace("empleado"),
            where("correo", "==", `${correo}`)
        );
        return getDocs(consulta);
    }

    //Añade un empleado al array de empleados de una empresa.
    actualizarArrayEmpleadoEmpresa(idEmpresa, empleado) {
        var empresa = doc(this.devolverEnlace("empresa"), idEmpresa);

        return updateDoc(empresa, {
            empleados: arrayUnion(empleado)
        });
    }

    //Añade un tablón de anuncio al array de tablonAnuncios de una empresa.
    actualizarArrayTablonAnuncioEmpresa(idEmpresa, tablon) {
        var empresa = doc(this.devolverEnlace("empresa"), idEmpresa);

        return updateDoc(empresa, {
            tablonAnuncios: arrayUnion(tablon)
        });
    }

    //Elimina un empleado del array de empleados de una empresa.
    eliminarEmpleadoEmpresa(idEmpleado) {
        deleteDoc(doc(this.devolverEnlace("empleado"), idEmpleado));
    }

    //Elimina un tablon de anuncio del array de tablonAnuncios de una empresa.
    eliminarTablonEmpresa(idEmpresa, tablonAnuncio) {
        var idRef = doc(this.devolverEnlace("empresa"), idEmpresa);;

        return updateDoc(idRef, {
            tablonAnuncios: tablonAnuncio
        });
    }

    //Modifica un empleado del array de empleados de una empresa.
    actualizarEmpleado(idEmpleado, empleado) {
        var idRef = doc(this.devolverEnlace("empleado"), idEmpleado);
        return updateDoc(idRef, {
            dni: empleado.dni,
            nombre: empleado.nombre,
            apellidos: empleado.apellidos,
            puestoTrabajo: empleado.puestoTrabajo,
            turno: empleado.turno
        });
    }

    //Modifica el id de un empleado.
    actualizarIdEmpleado(idEmpleado, id) {
        var idRef = doc(this.devolverEnlace("empleado"), idEmpleado);
        return updateDoc(idRef, {
            id: id
        });
    }

    //Devuelve la lista de empleados que pertenecen a la empresa.
    devolverEmpleadosEmpresa(idEmpresa) {
        var consulta = query(
            this.devolverEnlace("empleado"),
            where("idEmpresa", "==", `${idEmpresa}`)
        );
        return getDocs(consulta);
    }

    //Modifica la imagen de perfil según el usuario.
    actualizarImgPerfil(id, ruta, usuario) {
        var idRef = doc(this.devolverEnlace(usuario), id);
        return updateDoc(idRef, {
            iconoPerfil: ruta
        });
    }

    //Sube una imagen al storage que ofrece firebase.
    subirImgBD(ruta, file) {
        var almacenRef = ref(this.almacen, ruta);
        return uploadBytes(almacenRef, file);
    }

    //Descarga una imagen del storage de firebase.
    descargarImgBD(ruta) {
        var almacenRef = ref(this.almacen, ruta);
        return getDownloadURL(almacenRef)
    }

    modificarTurnoEmpleado(empleado, turno) {
        var idRef = doc(this.devolverEnlace("empleado"), empleado.id);
        return updateDoc(idRef, {
            turno: turno
        });
    }

    /*TABLON*/

    //Devuelve un documento de un anuncio. 
    devolverAnuncio(id) {
        var idRef = doc(this.devolverEnlace("tablonAnuncio"), id);
        var coleccion = getDoc(idRef);
        return coleccion;
    }

    //Añade un anuncio a la bd.
    anyadirAnuncio(anuncio) {
        return addDoc(this.devolverEnlace("tablonAnuncio"), anuncio);
    }

    //Modifica la imagen del anuncio.
    actualizarImgAnuncio(id, ruta) {
        var idRef = doc(this.devolverEnlace("tablonAnuncio"), id);
        return updateDoc(idRef, {
            imgAnuncio: ruta
        });
    }

    //Modifica la imagen del anuncio.
    actualizarImgAnuncio(id, ruta) {
        var idRef = doc(this.devolverEnlace("tablonAnuncio"), id);
        return updateDoc(idRef, {
            imgAnuncio: ruta
        });
    }

    //Modifica las visitas del anuncio.
    actualizarVisitas(id, visitas) {
        var idRef = doc(this.devolverEnlace("tablonAnuncio"), id);
        return updateDoc(idRef, {
            visualizaciones: visitas
        });
    }

    //Modifica los likes del anuncio.
    actualizarLikes(id, likes, arrayUsuarioLikes) {
        var idRef = doc(this.devolverEnlace("tablonAnuncio"), id);
        return updateDoc(idRef, {
            arrayUsuarioLikes: arrayUsuarioLikes,
            likes: likes
        });
    }

    //Añade un comentario al anuncio.
    actualizarArrayAnuncio(idAnuncio, comentario) {
        var anuncio = doc(this.devolverEnlace("tablonAnuncio"), idAnuncio);

        return updateDoc(anuncio, {
            comentarios: arrayUnion(comentario)
        });
    }

    //Devuelve los anuncios que pertenecen a la empresa.
    devolverAnunciosEmpresa(idEmpresa) {
        var consulta = query(
            this.devolverEnlace("tablonAnuncio"),
            where("idEmpresa", "==", `${idEmpresa}`),
            orderBy("fPubli", "desc")
        );
        return getDocs(consulta);
    }

    //Devuelve los 3 anuncios con más visitas.
    devolverAnunciosEmpresaMasVistos(idEmpresa) {
        var consulta = query(
            this.devolverEnlace("tablonAnuncio"),
            where("idEmpresa", "==", `${idEmpresa}`),
            orderBy("visualizaciones", "desc"),
            limit(3)
        );
        return getDocs(consulta);
    }

    //Elimina un anuncio de la empresa.
    eliminarAnuncioEmpresa(idAnuncio) {
        return deleteDoc(doc(this.devolverEnlace("tablonAnuncio"), idAnuncio));
    }

    //Modifica el array de usuarios notificados del anuncio.
    actualizarArrayNotificacionesAnuncio(idAnuncio, usuNotificado) {
        var anuncio = doc(this.devolverEnlace("tablonAnuncio"), idAnuncio);

        return updateDoc(anuncio, {
            arrayUsuarioNotificados: arrayUnion(usuNotificado)
        });
    }

    /*CALENDARIO*/

    //Añade un día festivo a la bd.
    anyadirDiaFest(diaFest) {
        return addDoc(this.devolverEnlace("calendario"), diaFest);
    }

    //Devuelve un día festivo.
    devolverDiaFest(id) {
        var idRef = doc(this.devolverEnlace("calendario"), id);
        var coleccion = getDoc(idRef);
        return coleccion;
    }

    //Devuelve la lista de días festivos que pertenecen a la empresa.
    devolverDiasFest(idEmpresa) {
        var consulta = query(
            this.devolverEnlace("calendario"),
            where("idEmpresa", "==", `${idEmpresa}`),
            orderBy("fDiaFest", "asc")
        );
        return getDocs(consulta);
    }

    //Elimina un día festivo.
    eliminarDiaFest(idDiaFest) {
        deleteDoc(doc(this.devolverEnlace("calendario"), idDiaFest));
    }

    //Añade una solicitud a la bd.
    anyadirSolicitudDias(diaSolicitud) {
        return addDoc(this.devolverEnlace("diaSolicitud"), diaSolicitud);
    }

    //Devuelve un día solicitado.
    devolverDiaSolicitado(id) {
        var idRef = doc(this.devolverEnlace("diaSolicitud"), id);
        var coleccion = getDoc(idRef);
        return coleccion;
    }

    //Devuelve la lista de días solicitados que pertenecen a la empresa.
    devolverDiasSolicitadosEmpresa(idEmpresa) {
        var consulta = query(
            this.devolverEnlace("diaSolicitud"),
            where("idEmpresa", "==", `${idEmpresa}`),
            orderBy("fEnviada", "asc")
        );
        return getDocs(consulta);
    }

    //Devuelve la lista de días solicitados que pertenecen al empleado.
    devolverDiasSolicitadosEmpleado(idEmpresa, idEmpleado) {
        var consulta = query(
            this.devolverEnlace("diaSolicitud"),
            where("idEmpresa", "==", `${idEmpresa}`),
            where("idEmpleado", "==", `${idEmpleado}`),
            orderBy("fEnviada", "asc")
        );
        return getDocs(consulta);
    }

    //Actualiza atributos de la solicitud.
    actualizarDiaSolicitud(id, resolucion) {
        var idRef = doc(this.devolverEnlace("diaSolicitud"), id);
        return updateDoc(idRef, {
            aceptada: resolucion.aceptada,
            descResolucion: resolucion.descResolucion,
            pendiente: resolucion.pendiente,           
        });
    }

    //Devuelve la lista de días solicitados según si están pendientes que pertenecen a la empresa.
    devolverDiasSolicitadosSegunEstadoEmpresa(idEmpresa, pendiente) {
        var fecha;

        if(pendiente) {
            fecha = new Date();
            fecha.setDate(fecha.getDate() - 1);
        } else {
            fecha = new Date(0);
        }

        var consulta = query(
            this.devolverEnlace("diaSolicitud"),
            where("idEmpresa", "==", `${idEmpresa}`),
            where("pendiente", "==", pendiente),
            where("fComienzo", ">=", fecha),
            orderBy("fComienzo", "asc")
        );
        return getDocs(consulta);
    }

    //Devuelve la lista de días solicitados según si están pendientes que pertenecen al empleado.
    devolverDiasSolicitadosSegunEstadoEmpleado(idEmpresa, idEmpleado, pendiente) {
        var fecha;

        if(pendiente) {
            fecha = new Date();
            fecha.setDate(fecha.getDate() - 1);
        } else {
            fecha = new Date(0);
        }
        
        var consulta = query(
            this.devolverEnlace("diaSolicitud"),
            where("idEmpresa", "==", `${idEmpresa}`),
            where("idEmpleado", "==", `${idEmpleado}`),
            where("pendiente", "==", pendiente),
            where("fComienzo", ">=", fecha),
            orderBy("fComienzo", "asc")
        );
        return getDocs(consulta);
    }

    /*CHAT*/

    //Devuelve un documento de un chat. 
    devolverChat(id) {
        var idRef = doc(this.devolverEnlace("chat"), id);
        var coleccion = getDoc(idRef);
        return coleccion;
    }

    //Elimina un chat.
    eliminarChat(idChat) {
        deleteDoc(doc(this.devolverEnlace("chat"), idChat));
    }

    //Devuelve la lista de chats que pertenecen a la empresa.
    devolverChatsEmpresa(idEmpresa) {
        var consulta = query(
            this.devolverEnlace("chat"),
            where("idEmpresa", "==", `${idEmpresa}`)
        );
        return getDocs(consulta);
    }

    //Actualiza el estado del usuario.
    actualizarEstadoConectado(id, conectado, tipoUsu) {
        var idRef = doc(this.devolverEnlace(tipoUsu), id);
        return updateDoc(idRef, {
            conectado: conectado
        });
    }

    //Añade un chat a la bd.
    anyadirChat(chat) {
        return addDoc(this.devolverEnlace("chat"), chat);
    }

    //Añade el chat seleccionado al usuario.
    actualizarChatSlc(id, chatSlc, tipoUsu) {
        var idRef = doc(this.devolverEnlace(tipoUsu), id);

        return updateDoc(idRef, {
            chatSlc: chatSlc
        });
    }
    
    //Añade un mensaje a la conversacion.
    actualizarConversacion(idChat, nMsgSinLeer, msg) {
        var chat = doc(this.devolverEnlace("chat"), idChat);
        nMsgSinLeer++;

        return updateDoc(chat, {
            fLastMsg: msg.fecha,
            nMsgSinLeer: nMsgSinLeer,
            conversacion: arrayUnion(msg)
        });
    }

    //Actualiza el nº de mensajes sin leer.
    actualizarNMsgSinLeer(idChat, nMsgSinLeer) {
        var chat = doc(this.devolverEnlace("chat"), idChat);

        return updateDoc(chat, {
            nMsgSinLeer: nMsgSinLeer
        });
    }
}

//Exportamos.
export { BD_Firebase };