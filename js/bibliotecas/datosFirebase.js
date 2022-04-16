"use strict";
// Importar las funcones necesarias desde su biblioteca
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
// Configurar el objeto con los datos de acceso de Firestone
const firebaseConfig = {

    apiKey: "AIzaSyDzsobdXJouaPL19f7Iiu9z57V7AXMp-wg",

    authDomain: "workas-3442c.firebaseapp.com",

    projectId: "workas-3442c",

    storageBucket: "workas-3442c.appspot.com",

    messagingSenderId: "1001579221052",

    appId: "1:1001579221052:web:9bb867be1490b8932e3339",
};

// Crear el enlace a la aplicación
const app = initializeApp(firebaseConfig);
const autentificacion = getAuth(app);

// Exportar el objeto aplicación.
export { app, autentificacion };