"use strict";

window.onload = function() {

    var doc = document;
    var arrayImagenes = ["./././img/carrusel1.jpg", "./././img/carrusel2.jpg", "./././img/carrusel3.jpg", "./././img/carrusel4.jpg"];

    var imgCarrusel1 = doc.getElementById("imgCarrusel1");
    var imgCarrusel2 = doc.getElementById("imgCarrusel2");
    imgCarrusel1.setAttribute("src", `${arrayImagenes[0]}`);
    imgCarrusel2.setAttribute("src", `${arrayImagenes[1]}`);

    var contador1 = 1;
    var contador2 = 2;
    var segundos = 0;
    var tiempoTransicion = 0;
    var desplazamiento = 0;
    //Cada 2 segundos se mostrará una imagen distinta hasta el final del array y después volverá a comenzar desde la primera posición
    setInterval(() => {
        if (contador1 == arrayImagenes.length) {
            contador1 = 0;
        }
        if (contador2 == arrayImagenes.length) {
            contador2 = 0;
        }
        if (segundos == 4) {
            var transicion = setInterval(() => {
                if (tiempoTransicion === 100) {
                    imgCarrusel1.setAttribute("src", `${arrayImagenes[contador1]}`);
                    tiempoTransicion = 0;
                    desplazamiento = 0;
                    clearInterval(transicion);
                }
                imgCarrusel1.style.right = `${desplazamiento}%`;
                tiempoTransicion++;
                desplazamiento++;
            }, 10);
        }
        if (segundos == 7) {
            imgCarrusel2.setAttribute("src", `${arrayImagenes[contador2]}`);
            contador1++;
            contador2++;
            segundos = 0;
        }
        segundos++;
    }, 1000);
};