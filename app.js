"use strict";

const PRODUCTS_KEY = "lumeraProducts";


/* =========================================
   ДЕМО-ТОВАРЫ
========================================= */

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Oversized Knit",
        brand: "North Studio",
        description: "Мягкий трикотажный свитер свободного кроя.",
        category: "Одежда",
        price: 89,
        stock: 14,
        image: "",
        badge: "NEW"
    },

    {
        id: 2,
        name: "Ceramic Set",
        brand: "Form Objects",
        description: "Минималистичный набор керамической посуды.",
        category: "Для дома",
        price: 64,
        stock: 8,
        image: "",
        badge: "HOT"
    },

    {
        id: 3,
        name: "Leather Wallet",
        brand: "Morrow Studio",
        description: "Компактный кошелёк из натуральной кожи.",
        category: "Аксессуары",
        price: 59,
        stock: 21,
        image: "",
        badge: ""
    },

    {
        id: 4,
        name: "Everyday Sneakers",
        brand: "Forma Collective",
        description: "Универсальные кроссовки для повседневной носки.",
        category: "Одежда",
        price: 112,
        stock: 11,
        image: "",
        badge: "-20%"
    }
];


/* =========================================
   STORAGE
========================================= */

function getProducts() {

    const saved =
        localStorage.getItem(PRODUCTS_KEY);


    if (!saved) {

        localStorage.setItem(
            PRODUCTS_KEY,
            JSON.stringify(DEFAULT_PRODUCTS)
        );

        return [...DEFAULT_PRODUCTS];
    }


    try {

        const products =
            JSON.parse(saved);


        if (!Array.isArray(products)) {
            throw new Error();
        }


        return products;

    } catch {

        localStorage.setItem(
            PRODUCTS_KEY,
            JSON.stringify(DEFAULT_PRODUCTS)
        );

        return [...DEFAULT_PRODUCTS];
    }
}


/* =========================================
   HTML SECURITY
========================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================
   PRODUCT COLOR
========================================= */

function getProductClass(index) {

    const classes = [
        "image-one",
        "image-two",
        "image-three",
        "image-four"
    ];

    return classes[
        index % classes.length
    ];
}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts(
    products = getProducts()
) {

    const grid =
        document.getElementById("productsGrid");


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    if (products.length === 0) {

        grid.innerHTML = `

            <div class="empty-catalog">

                <h3>
                    Товаров пока нет
                </h3>

                <p>
                    Скоро здесь появятся новые товары.
                </p>

            </div>

        `;

        return;
    }


    products.forEach(
        (product, index) => {

            const article =
                document.createElement("article");

            article.className =
                "product-card";


            const imageClass =
                getProductClass(index);


            article.innerHTML = `

                <div
                    class="product-image ${imageClass}"
                >

                    ${
                        product.badge
                            ? `
                                <span class="product-badge">
                                    ${escapeHTML(product.badge)}
                                </span>
                            `
                            : ""
                    }


                    <button
                        class="favorite-button"
                        data-id="${product.id}"
                        aria-label="Добавить в избранное"
                    >
                        ♡
                    </button>


                    ${
                        product.image
                            ? `
                                <img
                                    src="${escapeHTML(product.image)}"
                                    alt="${escapeHTML(product.name)}"
                                >
                            `
                            : `
                                <div class="product-image-label">
                                    ${String(index + 1).padStart(2, "0")}
                                </div>
                            `
                    }

                </div>


                <div class="product-info">

                    <div>

                        <h3>
                            ${escapeHTML(product.name)}
                        </h3>

                        <p>
                            ${escapeHTML(product.brand || product.category)}
                        </p>

                    </div>


                    <strong>
                        $${Number(product.price).toFixed(2)}
                    </strong>

                </div>

            `;


            grid.appendChild(article);

        }
    );

}


/* =========================================
   FILTERS
========================================= */

function setupFilters() {

    const buttons =
        document.querySelectorAll(
            ".filter-button"
        );


    if (!buttons.length) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(
                    item =>
                        item.classList.remove("active")
                );


                button.classList.add("active");


                const filter =
                    button.textContent.trim();


                const products =
                    getProducts();


                if (
                    filter === "Все"
                ) {

                    renderProducts(products);

                    return;
                }


                let category;


                if (filter === "Дом") {
                    category = "Для дома";
                }

                else if (
                    filter === "Аксессуары"
                ) {
                    category = "Аксессуары";
                }

                else {
                    category = filter;
                }


                const filtered =
                    products.filter(
                        product =>
                            product.category === category
                    );


                renderProducts(filtered);

            }
        );

    });

}


/* =========================================
   FAVORITES
========================================= */

function setupFavorites() {

    const grid =
        document.getElementById(
            "productsGrid"
        );


    if (!grid) {
        return;
    }


    grid.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".favorite-button"
                );


            if (!button) {
                return;
            }


            button.classList.toggle(
                "is-favorite"
            );


            button.textContent =
                button.classList.contains("is-favorite")
                    ? "♥"
                    : "♡";

        }
    );

}


/* =========================================
   CART
========================================= */

let cartCount = 0;


function setupCart() {

    const cartButton =
        document.querySelector(
            ".cart-button"
        );


    if (!cartButton) {
        return;
    }


    cartButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            alert(
                "Корзина будет подключена на следующем этапе."
            );

        }
    );

}


/* =========================================
   ACCOUNT BUTTON
========================================= */

function setupAccountButton() {

    const accountButton =
        document.getElementById(
            "accountButton"
        );


    if (!accountButton) {
        return;
    }


    accountButton.href =
        "login.html";

}


/* =========================================
   SEARCH
========================================= */

function setupSearch() {

    const searchButton =
        document.querySelector(
            ".icon-button"
        );


    const grid =
        document.getElementById(
            "productsGrid"
        );


    if (!searchButton || !grid) {
        return;
    }


    searchButton.addEventListener(
        "click",
        () => {

            const query =
                prompt(
                    "Введите название товара:"
                );


            if (!query) {
                return;
            }


            const products =
                getProducts();


            const result =
                products.filter(
                    product =>
                        product.name
                            .toLowerCase()
                            .includes(
                                query.toLowerCase()
                            )
                );


            renderProducts(result);

        }
    );

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProducts();

        setupFilters();

        setupFavorites();

        setupCart();

        setupAccountButton();

        setupSearch();

    }
);