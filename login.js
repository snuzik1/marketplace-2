"use strict";


const roleButtons =
    document.querySelectorAll(".role-button");

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");


let selectedRole = "buyer";


/* =========================
   ВЫБОР РОЛИ
========================= */

roleButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            roleButtons.forEach(
                item =>
                    item.classList.remove("active")
            );


            button.classList.add("active");


            selectedRole =
                button.dataset.role;

        }
    );

});


/* =========================
   LOGIN
========================= */

loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();


        if (!email || !password) {

            loginMessage.textContent =
                "Заполните все поля.";

            return;
        }


        /*
            Учебные данные.

            Покупатель:
            любой email + любой пароль

            Модератор:
            email = moderator@lumera.local
            пароль = 1234
        */


        if (selectedRole === "moderator") {

            if (
                email !== "moderator@lumera.local" ||
                password !== "1234"
            ) {

                loginMessage.textContent =
                    "Неверные данные модератора.";

                return;
            }


            localStorage.setItem(
                "lumeraRole",
                "moderator"
            );

            localStorage.setItem(
                "lumeraUser",
                email
            );


            window.location.href =
                "moderator.html";


            return;
        }


        /*
            ПОКУПАТЕЛЬ
        */

        localStorage.setItem(
            "lumeraRole",
            "buyer"
        );

        localStorage.setItem(
            "lumeraUser",
            email
        );


        window.location.href =
            "account.html";

    }
);