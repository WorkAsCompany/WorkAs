"use strict";
import { app, autentificacion } from "../bibliotecas/datosFirebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    onSnapshot,
    doc,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    deleteDoc,
    deleteField
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

        updateDoc(idRef, {
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
    actualizarIdEmpleado(idEmpleado, empleado) {
        var idRef = doc(this.devolverEnlace("empleado"), idEmpleado);
        updateDoc(idRef, {
            id: empleado.id
        });
        return idEmpleado;
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
        updateDoc(idRef, {
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
        updateDoc(idRef, {
            imgAnuncio: ruta
        });
    }

    //Modifica la imagen del anuncio.
    actualizarImgAnuncio(id, ruta) {
        var idRef = doc(this.devolverEnlace("tablonAnuncio"), id);
        updateDoc(idRef, {
            imgAnuncio: ruta
        });
    }

    //Modifica las visitas del anuncio.
    actualizarVisitas(id, visitas) {
        var idRef = doc(this.devolverEnlace("tablonAnuncio"), id);
        updateDoc(idRef, {
            visualizaciones: visitas
        });
    }

    //Modifica los likes del anuncio.
    actualizarLikes(id, likes, arrayUsuarioLikes) {
        var idRef = doc(this.devolverEnlace("tablonAnuncio"), id);
        updateDoc(idRef, {
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

}

//Exportamos.
export { BD_Firebase };