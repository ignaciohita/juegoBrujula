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

        navigator.compass.getCurrentHeading(function (posicion) {
            if (Math.abs(posicion.magneticHeading) < 1) {
                navigator.notification.alert("¡Enhorabuena! ¡Has encontrado la posición norte con una precisión del " + (100 - Math.abs(posicion.magneticHeading)).toString() + "%!");
            } else {
                navigator.notification.alert("¡Fallaste! ¡Estás a " + Math.abs(posicion.magneticHeading).toString() + " grados del norte!");
            }

            document.getElementById("botonJugar").style.display = "block";
        }, function (posicionError) {
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
        });
    }
}
