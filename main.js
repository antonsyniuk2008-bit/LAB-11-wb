
const products = [
    {
        id: 1,
        title: "Ноутбук Apple MacBook Pro 16",
        price: 99999,
        category: "Ноутбуки",
        image: "https://placehold.co/300x200?text=MacBook"
    },
    {
        id: 2,
        title: "Samsung Galaxy S24",
        price: 39999,
        category: "Смартфони",
        image: "https://placehold.co/300x200?text=Samsung"
    },
    {
        id: 3,
        title: "Sony WH-1000XM5",
        price: 14999,
        category: "Навушники",
        image: "https://placehold.co/300x200?text=Sony"
    },
    {
        id: 4,
        title: "LG UltraGear 27",
        price: 18999,
        category: "Монітори",
        image: "https://placehold.co/300x200?text=LG"
    }
];

const container = document.getElementById("products-container");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("error-message");
const cartCount = document.getElementById("cart-count");

let cart = [];

// Імітація затримки
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Отримання товарів
async function fetchProducts() {
    await delay(2500);
    return products;
}

// Відображення товарів
function renderProducts(products) {
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Категорія: ${product.category}</p>
            <p><strong>${product.price.toLocaleString("uk-UA")} грн</strong></p>
            <button data-id="${product.id}">Купити</button>
        </div>
    `).join("");
}

// Додавання товарів до кошика
container.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        const id = Number(event.target.dataset.id);
        const product = products.find(item => item.id === id);

        if (product) {
            cart.push(product);
            cartCount.textContent = cart.length;
            alert("Товар додано до кошика!");
        }
    }
});

// Завантаження сторінки
async function initShop() {
    loader.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    container.innerHTML = "";

    try {
        const loadedProducts = await fetchProducts();
        renderProducts(loadedProducts);
    } catch (error) {
        errorMessage.textContent = "Помилка завантаження товарів.";
        errorMessage.classList.remove("hidden");
        console.error(error);
    } finally {
        loader.classList.add("hidden");
    }
}

initShop();