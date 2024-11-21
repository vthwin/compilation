import { menuArray } from "./data.js";

const mainEl = document.getElementsByTagName("main")[0];
const foodMenuSection = document.getElementById("food-container");
let orderCheckoutSection = false;
let checkOutSection = document.getElementById("checkout-container");
let cart = {}; // cart object to hold item -> quantity mapping

// Function to generate food cards
function generateFoodCard() {
    let foodHtml = "";
    menuArray.forEach((food) => {
        foodHtml += `
            <div class="food" id="food-sec">
                <span class="food-emoji">${food.emoji}</span>
                <div class="food-info">
                    <h2 class="food-name">${food.name}</h2>
                    <p class="food-ingredients">${food.ingredients.join(
                        ", "
                    )}</p>  
                    <p class="food-price">$${food.price}</p>
                </div>
                <button class="add-btn" data-name="${food.name}">+</button>
            </div>
        `;
    });
    foodMenuSection.innerHTML = foodHtml;
}

generateFoodCard();

// Function to calculate the total price
function calculateTotalPrice() {
    let totalPrice = menuArray.reduce((total, food) => {
        if (food.name in cart) {
            total += cart[food.name] * food.price;
        }
        return total;
    }, 0);

    document.getElementById("total-price").textContent = `$${totalPrice}`;
}

// Function to generate an order item
function generateOrder(item) {
    let orderContainerEl = document.getElementById("order-items-con");
    const foodObj = menuArray.find((food) => food.name === item);

    if (!(item in cart)) {
        cart[item] = 1;
        orderContainerEl.innerHTML += `
            <div id="${item}" class="food-item">
                <div class="food-checkout-info">
                    <p>${foodObj.name}</p>
                    <p class="quantity"></p>
                    <button data-remove="${foodObj.name}">remove</button>
                </div>
                <p class="price">$${foodObj.price * cart[item]}</p>
            </div>
        `;
    } else {
        cart[item] += 1;
        document.querySelector(
            `#${item} .quantity`
        ).textContent = `x${cart[item]}`;
        document.querySelector(`#${item} .price`).textContent = `$${
            foodObj.price * cart[item]
        }`;
    }

    calculateTotalPrice();
}

// Event listener for adding items to the cart
foodMenuSection.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        if (!orderCheckoutSection) {
            checkOutSection.innerHTML += `
                <section class="order-checkout">
                    <h2 id="order-header">Your order</h2>
                    <div id="order-items-con"></div>
                    <div class="price">
                        <p>Total price:</p>
                        <p id="total-price">$0</p>
                    </div>
                    <button id="order-btn">Complete order</button>
                </section>
            `;
            orderCheckoutSection = true;
        }
        generateOrder(e.target.dataset.name);
    }
});

// Handle removal of items from the cart
checkOutSection.addEventListener("click", (e) => {
    if (e.target.dataset.remove) {
        const foodName = e.target.dataset.remove;
        if (cart[foodName] === 1) {
            document.getElementById(foodName).remove();
            delete cart[foodName];
        } else {
            cart[foodName] -= 1;
            document.querySelector(`#${foodName} .quantity`).textContent =
                cart[foodName] > 1 ? `x${cart[foodName]}` : "";
            document.querySelector(`#${foodName} .price`).textContent = `$${
                menuArray.find((food) => food.name === foodName).price *
                cart[foodName]
            }`;
        }
        if (Object.keys(cart).length === 0) {
            checkOutSection.innerHTML = "";
            orderCheckoutSection = false;
        } else {
            calculateTotalPrice();
        }
    } else if (e.target.id === "order-btn") {
        generatePayModal();
    }
});

// Function to generate the payment modal
function generatePayModal() {
    mainEl.innerHTML += `
        <div id="pay-modal">
            <form>
                <fieldset>
                    <legend>Purchase Information</legend>
                    <label for='name'>
                        <input id="name" name="name" type='text' placeholder='Enter your name'>
                    </label>
                    <label for='credit-card'>
                        <input id="credit-card" name="credit-card" type='text' min-length="16" placeholder='Enter card number'>
                    </label>
                    <label for='cvv'>
                        <input id="cvv" name="cvv" type='text' placeholder='Enter your CVV'>
                    </label>
                </fieldset>
                <button id="pay-btn">Pay</button>
            </form>
        </div>
    `;
}

// Event listener for the payment form
mainEl.addEventListener("click", (e) => {
    if (e.target.id === "pay-btn") {
        e.preventDefault();

        // Access form data
        let formData = new FormData(document.querySelector("#pay-modal form"));
        let name = formData.get("name");

        document.getElementById("pay-modal").remove();

        // Clear the checkout section and show the thank-you message
        document.getElementById("checkout-container").innerHTML = "";
        document.getElementById("checkout-container").innerHTML = `
            <div class="thank-you-message">
                <h2>Thanks, ${name}! Your order is on its way!</h2>
            </div>
        `;
    }
});
