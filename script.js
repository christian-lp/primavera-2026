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

/* GENERAR LINK */

function generarLink() {

    const datos = {
        n: nombreActual,
        m: mensajeActual,
        d: remitenteActual
    };

    const json =
        JSON.stringify(datos);

    const bytes =
        new TextEncoder()
            .encode(json);

    let binario = "";

    bytes.forEach(byte => {
        binario +=
            String.fromCharCode(byte);
    });

    const codigo =
        btoa(binario)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

    return (
        window.location.origin +
        "/?t=" +
        codigo +
        "&v=" +
        Date.now()
    );
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

function compartirTarjeta() {

    mostrarMenuCompartir();
}


function mostrarMenuCompartir() {

    let menu =
        document.getElementById("menuCompartir");


    if (!menu) {

        menu =
            document.createElement("div");


        menu.id =
            "menuCompartir";


        menu.innerHTML = `

            <div class="share-overlay">

                <div class="share-box">

                    <button
                        class="cerrar-share"
                        onclick="cerrarMenuCompartir()">
                        ✕
                    </button>


                    <h2>
                        Compartir tarjeta 🌸
                    </h2>


                    <p>
                        Elegí cómo querés enviarla
                    </p>


                    <div class="share-opciones">

                        <button
                            onclick="compartirWhatsApp()"
                            class="share-btn whatsapp">

                            <i class="fa-brands fa-whatsapp"></i>
                            WhatsApp

                        </button>


                        <button
                            onclick="compartirInstagram()"
                            class="share-btn instagram">

                            <i class="fa-brands fa-instagram"></i>
                            Instagram

                        </button>


                        <button
                            onclick="compartirTelegram()"
                            class="share-btn telegram">

                            <i class="fa-brands fa-telegram"></i>
                            Telegram

                        </button>


                        <button
                            onclick="compartirFacebook()"
                            class="share-btn facebook">

                            <i class="fa-brands fa-facebook"></i>
                            Facebook

                        </button>


                        <button
                            onclick="compartirNativo()"
                            class="share-btn importante">

                            📲 Más opciones

                        </button>


                        <button
                            onclick="copiarLink()"
                            class="share-btn">

                            🔗 Copiar enlace

                        </button>

                    </div>


                    <p class="nota-share">

                        En celular, "Más opciones"
                        puede mostrar Instagram,
                        WhatsApp, Messenger y otras apps.

                    </p>


                </div>

            </div>

        `;


        document.body
            .appendChild(menu);
    }


    menu.style.display =
        "block";
}



function cerrarMenuCompartir() {

    const menu =
        document.getElementById(
            "menuCompartir"
        );


    if (menu) {

        menu.style.display =
            "none";
    }

}



async function compartirWhatsApp() {

    const link =
        generarLink();

    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(link);

    window.open(
        url,
        "_blank"
    );
}

async function compartirInstagram() {

    const link = generarLink();

    const texto =
        "🌹 Te enviaron una rosa por el Día de la Primavera 💐";

    if (navigator.share) {

        try {

            await navigator.share({
                title: "Te enviaron una rosa 🌹",
                text: texto,
                url: link
            });

        } catch (error) {

            console.log(
                "Compartir cancelado",
                error
            );

        }

    } else {

        try {

            await navigator.clipboard.writeText(link);

            mostrarNotificacion(
                "Link copiado 💜"
            );

        } catch (error) {

            prompt(
                "Copiá este enlace:",
                link
            );

        }

    }
}

function compartirTelegram() {

    const link =
        generarLink();


    const texto =
        "🌹 Te enviaron una rosa 💐";


    const url =

        "https://t.me/share/url?url=" +

        encodeURIComponent(link) +

        "&text=" +

        encodeURIComponent(texto);


    window.open(
        url,
        "_blank"
    );
}



function compartirFacebook() {

    const link =
        generarLink();


    const url =

        "https://www.facebook.com/sharer/sharer.php?u=" +

        encodeURIComponent(link);


    window.open(
        url,
        "_blank"
    );
}


async function compartirNativo() {

    const link =
        generarLink();


    const texto =

        "🌹 Te enviaron una rosa por el Día de la Primavera 💐";


    if (navigator.share) {

        try {

            await navigator.share({

                title:
                    "Te enviaron una rosa 🌹",

                text:
                    texto,

                url:
                    link

            });

        }

        catch (error) {

            console.log(
                "Compartir cancelado"
            );

        }

    }

    else {

        mostrarNotificacion(
            "Tu navegador no permite compartir directamente"
        );

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

    const codigo =
        parametros.get("t");


    // Si no viene una tarjeta compartida,
    // mostramos la página normal.
    if (!codigo) {
        return;
    }


    try {

        let base64 =
            codigo
                .replace(/-/g, "+")
                .replace(/_/g, "/");


        while (
            base64.length % 4 !== 0
        ) {

            base64 += "=";

        }


        const binario =
            atob(base64);


        const bytes =
            new Uint8Array(
                binario.length
            );


        for (
            let i = 0;
            i < binario.length;
            i++
        ) {

            bytes[i] =
                binario.charCodeAt(i);

        }


        const json =
            new TextDecoder()
                .decode(bytes);


        const datos =
            JSON.parse(json);


        console.log(
            "Tarjeta recibida:",
            datos
        );


        if (
            !datos.n ||
            !datos.m
        ) {

            console.error(
                "La tarjeta no tiene datos válidos"
            );

            return;

        }


        nombreActual =
            datos.n;

        mensajeActual =
            datos.m;

        remitenteActual =
            datos.d ||
            "Alguien especial";


        // Ocultar todas las pantallas primero

        document
            .querySelectorAll(".pantalla")
            .forEach(pantalla => {

                pantalla.classList.remove(
                    "activa"
                );

            });


        // Mostrar solamente el sobre

        document
            .getElementById(
                "sobrePantalla"
            )
            .classList
            .add("activa");


        // Por si el sobre había quedado abierto

        document
            .getElementById("sobre")
            .classList
            .remove("abierto");

    }

    catch (error) {

        console.error(
            "Error leyendo tarjeta:",
            error
        );

    }

}


revisarParametros();
