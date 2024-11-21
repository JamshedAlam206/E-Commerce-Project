// script.js

// Array to hold cart items
let cart = [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if it exists
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 }); // Add new product
    }
    updateCart();
}

// Function to update the cart table
function updateCart() {
    const cartTable = document.getElementById("cart-table");
    const totalPriceElement = document.getElementById("total-price");

    // Clear the existing table rows
    cartTable.innerHTML = "";

    // Add rows for each cart item
    let totalPrice = 0;
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartTable.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    // Update total price
    totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to change the quantity of a product in the cart
function changeQuantity(productName, change) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName); // Remove item if quantity is 0
        }
        updateCart();
    }
}

// Function for the search bar
function searchProduct() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product-item");

    products.forEach(product => {
        const productName = product.querySelector("h3").innerText.toLowerCase();
        product.style.display = productName.includes(searchInput) ? "block" : "none";
    });
}

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items to the cart before checking out.");
        return;
    }

    const confirmation = confirm("Are you sure you want to proceed to checkout?");
    if (confirmation) {
        alert("Thank you for your purchase! Your order has been placed.");
        cart = []; // Clear the cart after checkout
        updateCart();
    }
}

// Add smooth scrolling for navigation links
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetSection = link.getAttribute("href").replace("#", "");
        scrollToSection(targetSection);
    });
});

// Initial setup
updateCart();
