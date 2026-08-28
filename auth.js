"use strict";

/*
    ВСТАВЬ СЮДА ДАННЫЕ СВОЕГО SUPABASE-ПРОЕКТА
*/

const SUPABASE_URL =
    "https://YOUR-PROJECT.supabase.co";

const SUPABASE_KEY =
    "YOUR-PUBLISHABLE-KEY";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================
   LOGIN
========================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                document.getElementById("loginEmail").value.trim();

            const password =
                document.getElementById("loginPassword").value;

            const message =
                document.getElementById("loginMessage");


            message.textContent = "Входим...";


            const { error } =
                await supabaseClient.auth.signInWithPassword({
                    email,
                    password
                });


            if (error) {

                message.textContent =
                    "Не удалось войти. Проверьте email и пароль.";

                return;
            }


            window.location.href =
                "account.html";
        }
    );
}


/* =========================
   REGISTER
========================= */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document.getElementById("registerEmail")
                .value
                .trim();

            const password =
                document.getElementById("registerPassword")
                .value;

            const confirmPassword =
                document.getElementById("registerPasswordConfirm")
                .value;

            const message =
                document.getElementById("registerMessage");


            if (password !== confirmPassword) {

                message.textContent =
                    "Пароли не совпадают.";

                return;
            }


            message.textContent =
                "Создаём аккаунт...";


            const { data, error } =
                await supabaseClient.auth.signUp({
                    email,
                    password
                });


            if (error) {

                message.textContent =
                    error.message;

                return;
            }


            if (data.session) {

                window.location.href =
                    "account.html";

                return;
            }


            message.textContent =
                "Аккаунт создан. Проверьте почту для подтверждения.";
        }
    );
}