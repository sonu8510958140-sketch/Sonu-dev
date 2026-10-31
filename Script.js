const searchForm = document.querySelector("#men-search");

if (searchForm) {
    const searchInput = searchForm.querySelector("#product-search");
    const productCards = [...document.querySelectorAll("[data-product-card]")];
    const searchStatus = document.querySelector("#search-status");
    const noProductsMessage = document.querySelector("#no-products");

    function filterProducts(query) {
        const normalizedQuery = query.trim().toLowerCase();
        let visibleCount = 0;

        for (const card of productCards) {
            const matches = card.dataset.search.includes(normalizedQuery);
            card.hidden = !matches;
            if (matches) visibleCount += 1;
        }

        noProductsMessage.classList.toggle("hidden", visibleCount > 0);
        searchStatus.textContent = normalizedQuery
            ? `${visibleCount} ${visibleCount === 1 ? "product" : "products"} found.`
            : `${visibleCount} products available.`;
    }

    const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
    searchInput.value = initialQuery;
    filterProducts(initialQuery);

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        filterProducts(query);

        const url = new URL(window.location.href);
        if (query) {
            url.searchParams.set("q", query);
        } else {
            url.searchParams.delete("q");
        }
        window.history.replaceState(null, "", url);
    });
}

function productDetailUrl({ id, name, price, image, category, description }) {
    const url = new URL("/product%20detail%20.html", window.location.origin);
    url.search = new URLSearchParams({
        id,
        name,
        price,
        image,
        category,
        description,
    });
    return url.href;
}

for (const card of document.querySelectorAll("[data-product-card]")) {
    if (card.id === "product-detail") continue;

    const heading = card.querySelector("h2, h3");
    const image = card.querySelector("img");
    if (!heading || !image) continue;

    if (document.body.dataset.page !== "home" && !card.querySelector("[data-add-to-cart]")) {
        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.dataset.addToCart = "";
        addButton.className = "mt-3 self-start rounded-xl bg-black px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
        addButton.textContent = "Add to Cart";
        heading.insertAdjacentElement("afterend", addButton);
    }
}

for (const shopLink of document.querySelectorAll('a[href^="/products/"]')) {
    const card = shopLink.closest("article");
    const heading = card?.querySelector("h2, h3");
    const image = card?.querySelector("img");
    const priceText = card?.querySelector("p.text-xl")?.textContent ?? "";
    if (!card || !heading || !image) continue;

    shopLink.href = productDetailUrl({
        id: new URL(shopLink.href).pathname.split("/").pop(),
        name: heading.textContent.trim(),
        price: priceText.replace(/[^\d.]/g, ""),
        image: image.src,
        category: card.querySelector("p")?.textContent.trim() || "Trendora collection",
        description: `A thoughtfully selected ${heading.textContent.trim()} from the Trendora collection.`,
    });
}

const productDetail = document.querySelector("#product-detail");
if (productDetail) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "";
    const name = params.get("name") || "";
    const price = Number(params.get("price"));
    const image = params.get("image") || "";
    let imageUrl;
    try {
        imageUrl = new URL(image);
    } catch (error) {
        imageUrl = null;
    }

    if (!/^[a-z\d-]+$/i.test(id) || !name.trim() || name.length > 120
        || !Number.isFinite(price) || price <= 0
        || !imageUrl || imageUrl.protocol !== "https:") {
        productDetail.classList.add("hidden");
        document.querySelector("#product-error").classList.remove("hidden");
    } else {
        productDetail.dataset.productId = id;
        productDetail.dataset.productName = name;
        productDetail.dataset.productPrice = String(price);

        const productImage = document.querySelector("#product-image");
        productImage.src = imageUrl.href;
        productImage.alt = name;
        document.querySelector("#product-name").textContent = name;
        document.querySelector("#product-price").textContent = `Rs ${price.toLocaleString("en-IN")}`;
        document.querySelector("#product-category").textContent =
            params.get("category") || "Trendora collection";
        document.querySelector("#product-description").textContent =
            params.get("description") || `A thoughtfully selected ${name} from the Trendora collection.`;

        const backLink = document.querySelector("#back-to-collection");
        const collection = id.startsWith("kids-") ? "/kid"
            : id.startsWith("womens-") || id.includes("dress") || id.includes("cardigan") ? "/women"
                : "/men";
        backLink.href = collection;
        backLink.textContent = `← Back to ${collection === "/kid" ? "Kids" : collection === "/women" ? "Women" : "Men"} collection`;
        document.title = `${name} | Trendora`;
    }
}

const cartStorageKey = "trendora-cart";
const cartStatus = document.querySelector("#cart-status");
const cartItemsContainer = document.querySelector("#cart-items");
const cartError = document.querySelector("#cart-error");
const cartCards = [...document.querySelectorAll("[data-product-card]")];

function readCart() {
    const savedCart = localStorage.getItem(cartStorageKey);
    if (!savedCart) return [];

    const cart = JSON.parse(savedCart);
    if (!Array.isArray(cart) || cart.some((item) => (
        typeof item.id !== "string"
        || typeof item.name !== "string"
        || !Number.isFinite(item.price)
        || !Number.isInteger(item.quantity)
        || item.quantity < 1
        || typeof item.image !== "string"
    ))) {
        throw new Error("Cart data is invalid.");
    }
    return cart;
}

function updateCartCounts(cart) {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    for (const count of document.querySelectorAll("[data-cart-count]")) {
        count.textContent = String(itemCount);
    }
}

function saveCart(cart) {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    updateCartCounts(cart);
}

let currentCart;
try {
    currentCart = readCart();
    updateCartCounts(currentCart);
} catch (error) {
    console.error("Unable to read the shopping cart:", error);
    if (cartError) cartError.classList.remove("hidden");
    if (cartStatus) cartStatus.textContent = "The cart could not be loaded.";
}

for (const button of document.querySelectorAll("[data-add-to-cart]")) {
    button.addEventListener("click", () => {
        if (!currentCart) return;

        const card = button.closest("[data-product-card]");
        const productId = card.dataset.productId;
        const existingProduct = currentCart.find((item) => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            currentCart.push({
                id: productId,
                name: card.dataset.productName,
                price: Number(card.dataset.productPrice),
                quantity: 1,
                image: card.querySelector("img").src,
            });
        }

        try {
            saveCart(currentCart);
            if (cartStatus) {
                const addedProduct = currentCart.find((item) => item.id === productId);
                cartStatus.textContent = `${addedProduct.name} added to cart.`;
            }
        } catch (error) {
            console.error("Unable to save the shopping cart:", error);
            if (cartStatus) cartStatus.textContent = "Unable to save the cart. Please try again.";
        }
    });
}

if (cartItemsContainer && currentCart) {
    const emptyCart = document.querySelector("#empty-cart");
    const cartSummary = document.querySelector("#cart-summary");
    const cartTotal = document.querySelector("#cart-total");

    function renderCart() {
        cartItemsContainer.replaceChildren();
        emptyCart.classList.toggle("hidden", currentCart.length > 0);
        cartSummary.classList.toggle("hidden", currentCart.length === 0);

        let total = 0;
        for (const item of currentCart) {
            total += item.price * item.quantity;

            const row = document.createElement("article");
            row.className = "flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center";

            const image = document.createElement("img");
            image.src = item.image;
            image.alt = item.name;
            image.referrerPolicy = "no-referrer";
            image.className = "h-36 w-full rounded-xl bg-slate-100 object-cover sm:w-32";

            const details = document.createElement("div");
            details.className = "flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between";

            const productInfo = document.createElement("div");
            const name = document.createElement("h2");
            name.className = "font-bold";
            name.textContent = item.name;
            const quantity = document.createElement("p");
            quantity.className = "text-sm text-slate-600";
            quantity.textContent = `Quantity: ${item.quantity}`;
            productInfo.append(name, quantity);

            const price = document.createElement("p");
            price.className = "font-bold";
            price.textContent = `Rs ${(item.price * item.quantity).toLocaleString("en-IN")}`;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.dataset.removeCartItem = item.id;
            removeButton.className = "self-start rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-100 sm:self-auto";
            removeButton.textContent = "Remove";

            details.append(productInfo, price, removeButton);
            row.append(image, details);
            cartItemsContainer.append(row);
        }

        cartTotal.textContent = `Rs ${total.toLocaleString("en-IN")}`;
        updateCartCounts(currentCart);
    }

    cartItemsContainer.addEventListener("click", (event) => {
        const removeButton = event.target.closest("[data-remove-cart-item]");
        if (!removeButton) return;

        currentCart = currentCart.filter((item) => item.id !== removeButton.dataset.removeCartItem);
        try {
            saveCart(currentCart);
            renderCart();
            cartStatus.textContent = "Item removed from cart.";
        } catch (error) {
            console.error("Unable to update the shopping cart:", error);
            cartError.classList.remove("hidden");
        }
    });

    renderCart();
}

const checkoutItems = document.querySelector("#checkout-items");
if (checkoutItems) {
    const checkoutContent = document.querySelector("#checkout-content");
    const checkoutEmpty = document.querySelector("#checkout-empty");
    const checkoutForm = document.querySelector("#checkout-form");
    const checkoutStatus = document.querySelector("#checkout-status");
    const checkoutError = document.querySelector("#checkout-error");

    if (!currentCart) {
        checkoutContent.classList.add("hidden");
        checkoutError.classList.remove("hidden");
    } else if (currentCart.length === 0) {
        checkoutContent.classList.add("hidden");
        checkoutEmpty.classList.remove("hidden");
    } else {
        let total = 0;
        for (const item of currentCart) {
            const lineTotal = item.price * item.quantity;
            total += lineTotal;

            const row = document.createElement("div");
            row.className = "flex items-start justify-between gap-4";

            const itemDetails = document.createElement("div");
            const itemName = document.createElement("p");
            itemName.className = "font-semibold";
            itemName.textContent = item.name;
            const itemQuantity = document.createElement("p");
            itemQuantity.className = "mt-1 text-sm text-slate-600";
            itemQuantity.textContent = `Quantity: ${item.quantity}`;
            itemDetails.append(itemName, itemQuantity);

            const itemPrice = document.createElement("p");
            itemPrice.className = "shrink-0 font-semibold";
            itemPrice.textContent = `Rs ${lineTotal.toLocaleString("en-IN")}`;
            row.append(itemDetails, itemPrice);
            checkoutItems.append(row);
        }

        document.querySelector("#checkout-total").textContent =
            `Rs ${total.toLocaleString("en-IN")}`;

        checkoutForm.addEventListener("submit", (event) => {
            event.preventDefault();
            checkoutStatus.textContent =
                "Checkout preview only: no order was submitted and no payment was taken. Connect an order backend and payment provider to complete checkout.";
            checkoutStatus.classList.remove("hidden");
        });
    }
}