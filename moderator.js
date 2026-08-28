"use strict";

const STORAGE_KEY = "lumeraProducts";

const productsList =
    document.getElementById("productsList");

const productCount =
    document.getElementById("productCount");

const addProductButton =
    document.getElementById("addProductButton");

const productModal =
    document.getElementById("productModal");

const closeModalButton =
    document.getElementById("closeModalButton");

const cancelButton =
    document.getElementById("cancelButton");

const productForm =
    document.getElementById("productForm");

const modalTitle =
    document.getElementById("modalTitle");

const productId =
    document.getElementById("productId");

const productName =
    document.getElementById("productName");

const productDescription =
    document.getElementById("productDescription");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productStock =
    document.getElementById("productStock");

const productImage =
    document.getElementById("productImage");


const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Oversized Knit",
        description: "Мягкий трикотажный свитер свободного кроя.",
        category: "Одежда",
        price: 89,
        stock: 14,
        image: ""
    },
    {
        id: 2,
        name: "Ceramic Set",
        description: "Минималистичный набор керамической посуды.",
        category: "Для дома",
        price: 64,
        stock: 8,
        image: ""
    },
    {
        id: 3,
        name: "Leather Wallet",
        description: "Компактный кошелёк из натуральной кожи.",
        category: "Аксессуары",
        price: 59,
        stock: 21,
        image: ""
    },
    {
        id: 4,
        name: "Everyday Sneakers",
        description: "Универсальные кроссовки для повседневной носки.",
        category: "Одежда",
        price: 112,
        stock: 11,
        image: ""
    }
];


function getProducts() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        saveProducts(DEFAULT_PRODUCTS);

        return [...DEFAULT_PRODUCTS];
    }

    try {

        const parsed =
            JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            throw new Error();
        }

        return parsed;

    } catch {

        saveProducts(DEFAULT_PRODUCTS);

        return [...DEFAULT_PRODUCTS];
    }
}


function saveProducts(products) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
    );
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function renderProducts() {

    const products =
        getProducts();

    productsList.innerHTML = "";

    productCount.textContent =
        `${products.length} ${
            products.length === 1
                ? "товар"
                : products.length < 5
                    ? "товара"
                    : "товаров"
        }`;


    if (products.length === 0) {

        productsList.innerHTML = `
            <div class="empty-products">
                <h3>Товаров пока нет</h3>

                <p>
                    Добавьте первый товар в каталог.
                </p>
            </div>
        `;

        return;
    }


    products.forEach((product, index) => {

        const card =
            document.createElement("article");

        card.className =
            "moderator-product-card";


        card.innerHTML = `

            <div class="moderator-product-image">

                ${
                    product.image

                    ? `
                        <img
                            src="${escapeHTML(product.image)}"
                            alt="${escapeHTML(product.name)}"
                        >
                    `

                    : `
                        <div class="product-placeholder">
                            ${String(index + 1).padStart(2, "0")}
                        </div>
                    `
                }

            </div>


            <div class="moderator-product-info">

                <span class="product-category">
                    ${escapeHTML(product.category)}
                </span>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p>
                    ${escapeHTML(product.description)}
                </p>

            </div>


            <div class="moderator-product-price">
                $${Number(product.price).toFixed(2)}
            </div>


            <div class="moderator-product-stock">
                ${product.stock} шт.
            </div>


            <div class="moderator-product-actions">

                <button
                    class="edit-product"
                    data-id="${product.id}"
                >
                    Изменить
                </button>

                <button
                    class="delete-product"
                    data-id="${product.id}"
                >
                    Удалить
                </button>

            </div>

        `;


        productsList.appendChild(card);

    });
}


function openAddProduct() {

    productForm.reset();

    productId.value = "";

    modalTitle.textContent =
        "Новый товар";

    productModal.classList.add("active");

    productName.focus();
}


function openEditProduct(id) {

    const products =
        getProducts();

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        return;
    }


    productId.value =
        product.id;

    productName.value =
        product.name;

    productDescription.value =
        product.description;

    productCategory.value =
        product.category;

    productPrice.value =
        product.price;

    productStock.value =
        product.stock;

    productImage.value =
        product.image || "";


    modalTitle.textContent =
        "Изменить товар";


    productModal.classList.add("active");

    productName.focus();
}


function closeModal() {

    productModal.classList.remove("active");

}


function saveProduct(event) {

    event.preventDefault();


    const name =
        productName.value.trim();

    const description =
        productDescription.value.trim();

    const category =
        productCategory.value;

    const price =
        Number(productPrice.value);

    const stock =
        Number(productStock.value);

    const image =
        productImage.value.trim();


    if (!name || !description) {

        alert("Заполните название и описание.");

        return;
    }


    if (
        !Number.isFinite(price) ||
        price < 0
    ) {

        alert("Введите корректную цену.");

        return;
    }


    if (
        !Number.isInteger(stock) ||
        stock < 0
    ) {

        alert("Введите корректный остаток.");

        return;
    }


    const products =
        getProducts();


    const editingId =
        productId.value;


    if (editingId) {

        const product =
            products.find(
                item => item.id === Number(editingId)
            );


        if (product) {

            product.name =
                name;

            product.description =
                description;

            product.category =
                category;

            product.price =
                price;

            product.stock =
                stock;

            product.image =
                image;

        }

    } else {

        products.push({

            id: Date.now(),

            name,

            description,

            category,

            price,

            stock,

            image

        });

    }


    saveProducts(products);

    closeModal();

    renderProducts();

}


function deleteProduct(id) {

    const products =
        getProducts();

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        return;
    }


    const confirmed =
        confirm(
            `Удалить "${product.name}"?`
        );


    if (!confirmed) {
        return;
    }


    const newProducts =
        products.filter(
            item => item.id !== id
        );


    saveProducts(newProducts);

    renderProducts();
}


/* =========================================
   САЙДЕР / КЛИКИ
========================================= */

addProductButton.addEventListener(
    "click",
    openAddProduct
);


closeModalButton.addEventListener(
    "click",
    closeModal
);


cancelButton.addEventListener(
    "click",
    closeModal
);


productForm.addEventListener(
    "submit",
    saveProduct
);


productModal.addEventListener(
    "click",
    event => {

        if (event.target === productModal) {
            closeModal();
        }

    }
);


productsList.addEventListener(
    "click",
    event => {

        const editButton =
            event.target.closest(
                ".edit-product"
            );

        const deleteButton =
            event.target.closest(
                ".delete-product"
            );


        if (editButton) {

            openEditProduct(
                Number(
                    editButton.dataset.id
                )
            );

        }


        if (deleteButton) {

            deleteProduct(
                Number(
                    deleteButton.dataset.id
                )
            );

        }

    }
);


/* =========================================
   ВЫХОД
========================================= */

document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "index.html";

        }
    );


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    renderProducts
);