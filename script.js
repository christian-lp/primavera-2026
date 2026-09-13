let nombreActual = "";
let mensajeActual = "";
let remitenteActual = "";


/* CAMBIAR PANTALLAS */

function cambiarPantalla(actual, nueva) {

    document
        .getElementById(actual)
        .classList.remove("activa");

    document
        .getElementById(nueva)
        .classList.add("activa");
}


function mostrarFormulario() {

    cambiarPantalla(
        "inicio",
        "formularioPantalla"
    );
}


function volverInicio() {

    cambiarPantalla(
        "formularioPantalla",
        "inicio"
    );
}


/* CREAR TARJETA */

function crearTarjeta() {

    const nombre =
        document
            .getElementById("nombre")
            .value
            .trim();

    const mensaje =
        document
            .getElementById("mensaje")
            .value
            .trim();

    const remitente =
        document
            .getElementById("remitente")
            .value
            .trim();


    if (nombre === "") {

        alert(
            "Escribí el nombre de la persona 🌸"
        );

        return;
    }


    if (mensaje === "") {

        alert(
            "Escribí un mensaje lindo 💌"
        );

        return;
    }


    nombreActual = nombre;

    mensajeActual = mensaje;

    remitenteActual =
        remitente !== ""
            ? remitente
            : "Alguien que te quiere";


    cambiarPantalla(
        "formularioPantalla",
        "sobrePantalla"
    );
}


/* ABRIR SOBRE */

function abrirSobre() {

    const sobre =
        document.getElementById("sobre");

    sobre.classList.add("abierto");


    setTimeout(() => {

        mostrarTarjeta();

    }, 900);
}


/* MOSTRAR TARJETA */

function mostrarTarjeta() {

    document
        .getElementById("tituloTarjeta")
        .textContent =
        "🌸 Para " + nombreActual + " 🌸";


    document
        .getElementById("mensajeTarjeta")
        .textContent =
        mensajeActual;


    document
        .getElementById("firmaTarjeta")
        .textContent =
        "Con cariño, " +
        remitenteActual +
        " ❤️";


    cambiarPantalla(
        "sobrePantalla",
        "tarjetaPantalla"
    );

}


/* GENERAR LINK */

function generarLink() {

    const url =
        new URL(
            window.location.href
        );


    url.search = "";


    url.searchParams.set(
        "nombre",
        nombreActual
    );


    url.searchParams.set(
        "mensaje",
        mensajeActual
    );


    url.searchParams.set(
        "de",
        remitenteActual
    );


    return url.toString();
}


/* COPIAR */

async function copiarLink() {

    const link =
        generarLink();


    try {

        await navigator
            .clipboard
            .writeText(link);


        mostrarNotificacion(
            "Link copiado 🌸"
        );

    }

    catch {

        prompt(
            "Copiá este enlace:",
            link
        );

    }

}


/* COMPARTIR */

async function compartirTarjeta() {

    const link =
        generarLink();


    const texto =
        "🌸 Te mandaron una tarjeta de Primavera 💐";


    if (navigator.share) {

        try {

            await navigator.share({

                title:
                    "Tarjeta de Primavera 🌸",

                text: texto,

                url: link

            });

        }

        catch {

            console.log(
                "Se canceló el compartir"
            );
        }

    }

    else {

        await copiarLink();

    }

}


/* CREAR OTRA */

function crearOtra() {

    document
        .getElementById("nombre")
        .value = "";

    document
        .getElementById("mensaje")
        .value = "";

    document
        .getElementById("remitente")
        .value = "";


    document
        .getElementById("sobre")
        .classList
        .remove("abierto");


    cambiarPantalla(
        "tarjetaPantalla",
        "formularioPantalla"
    );

}


/* NOTIFICACIÓN */

function mostrarNotificacion(texto) {

    const notificacion =
        document.getElementById(
            "notificacion"
        );


    notificacion.textContent =
        texto;


    notificacion.classList.add(
        "mostrar"
    );


    setTimeout(() => {

        notificacion
            .classList
            .remove("mostrar");

    }, 2200);

}


/* PÉTALOS */

function crearPetalo() {

    const petalo =
        document.createElement("div");


    petalo.classList.add(
        "petalo"
    );


    const flores = [

        "🌸",
        "🌷",
        "🌼",
        "🌺",
        "💮"

    ];


    petalo.textContent =
        flores[
            Math.floor(
                Math.random()
                * flores.length
            )
        ];


    petalo.style.left =
        Math.random() * 100
        + "vw";


    petalo.style.fontSize =
        15
        + Math.random() * 20
        + "px";


    petalo.style.animationDuration =
        6
        + Math.random() * 7
        + "s";


    document
        .getElementById("petalos")
        .appendChild(petalo);


    setTimeout(() => {

        petalo.remove();

    }, 14000);

}


setInterval(
    crearPetalo,
    650
);


/* LEER LINK COMPARTIDO */

function revisarParametros() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const nombre =
        parametros.get("nombre");

    const mensaje =
        parametros.get("mensaje");

    const de =
        parametros.get("de");


    if (
        nombre &&
        mensaje
    ) {

        nombreActual =
            nombre;

        mensajeActual =
            mensaje;

        remitenteActual =
            de ||
            "Alguien especial";


        document
            .getElementById("inicio")
            .classList
            .remove("activa");


        document
            .getElementById(
                "sobrePantalla"
            )
            .classList
            .add("activa");

    }

}


revisarParametros();