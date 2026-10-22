// ----- Modo oscuro -----
const btnTheme = document.querySelector("#btn-theme");
const body = document.querySelector("body");

btnTheme.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        btnTheme.textContent = "Modo oscuro";
    } else {
        btnTheme.textContent = "Modo claro";
    }
});

// ----- Formulario -----
const formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");

const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function marcarError(input, idMensaje, texto) {
    input.classList.add("error");
    document.querySelector(idMensaje).textContent = texto;
}

function marcarCorrecto(input, idMensaje) {
    input.classList.remove("error");
    document.querySelector(idMensaje).textContent = "";
}

function validarTexto(input, idMensaje, texto) {
    if (input.value.trim() === "") {
        marcarError(input, idMensaje, texto);
        return false;
    }
    marcarCorrecto(input, idMensaje);
    return true;
}

function validarEmail() {
    const valor = email.value.trim();

    if (valor === "") {
        marcarError(email, "#error-email", "El correo es obligatorio");
        return false;
    }
    if (!patronEmail.test(valor)) {
        marcarError(email, "#error-email", "Correo no válido (ejemplo: nombre@dominio.com)");
        return false;
    }
    marcarCorrecto(email, "#error-email");
    return true;
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreOk = validarTexto(nombre, "#error-nombre", "El nombre es obligatorio");
    const apellidoOk = validarTexto(apellido, "#error-apellido", "El apellido es obligatorio");
    const emailOk = validarEmail();

    if (nombreOk && apellidoOk && emailOk) {
        console.log("Formulario correcto");
    }
});