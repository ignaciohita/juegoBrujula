/*global cordova, CompassError*/
var pluginListo = false;

function dispositivoListo() {
    "use strict";

    pluginListo = true;
    document.getElementById("botonJugar").style.display = "block";
}

function inicioAplicacion() {
    "use strict";

    document.addEventListener("deviceready", dispositivoListo);
    document.getElementById("botonJugar").style.display = "none";
}

function registrarIntento() {
    "use strict";

    if (pluginListo) {
        document.getElementById("botonJugar").style.display = "none";

        navigator.compass.getCurrentHeading(
            function (posicion) {
                var gradosAbsolutos;

                if (posicion.magneticHeading > 180) {
                    gradosAbsolutos = 360 - posicion.magneticHeading;
                } else {
                    gradosAbsolutos = posicion.magneticHeading;
                }

                if ((gradosAbsolutos) < 1) {
                    navigator.notification.alert("¡Enhorabuena! ¡Has encontrado la posición norte con una precisión del " + (100 - gradosAbsolutos).toString() + "%!");
                } else {
                    navigator.notification.alert("¡Fallaste! ¡Estás a " + Math.round(gradosAbsolutos).toString() + " grados del norte!");
                }

                document.getElementById("botonJugar").style.display = "block";
            },
            function (posicionError) {
                switch (posicionError.code) {
                case CompassError.COMPASS_INTERNAL_ERR:
                    navigator.notification.alert("Error en la brújula");
                    break;
                case CompassError.COMPASS_NOT_SUPPORTED:
                    navigator.notification.alert("No hay brújula");
                    break;
                default:
                    navigator.notification.alert("Error desconocido");
                    break;
                }
            }
        );
    }
}
