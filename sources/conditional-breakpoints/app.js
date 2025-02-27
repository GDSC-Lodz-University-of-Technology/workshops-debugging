const cartItemsWrapper = document.querySelector('.cart-items');
const totalPrice = document.querySelector('.total-price');
const discountedPrice = document.querySelector('.discounted-price');
const button = document.querySelector('button');
const generalDiscountInput = document.querySelector('#general-discount');

const cartItems = [
    {id: 1, name: "Laptop", category: "electronics", price: 1000, discount: 10},
    {id: 2, name: "Shoes", category: "fashion", price: 100, discount: 20},
    {id: 3, name: "Phone", category: "electronics", price: 500, discount: 15},
    {id: 4, name: "Book", category: "books", price: 30, discount: 5},
    {id: 5, name: "Jeans", category: "fashion", price: 60, discount: 0},
];

function printCartItems(items) {
    cartItemsWrapper.innerHTML = '';
    const allCartItems = document.createDocumentFragment();
    for (const cartItem of items) {
        const cartItemWrapper = document.createElement('li');
        cartItemWrapper.textContent = `${cartItem.name}, price: ${cartItem.price}, ${cartItem.discountedPrice ? 'discounted price: ' + cartItem.discountedPrice : ''}`;
        allCartItems.append(cartItemWrapper);
    }
    cartItemsWrapper.append(allCartItems);
}

function getTotalPrice(items) {
    return items.reduce((sum, current) => {
        sum += current.price;
        return sum;
    }, 0)
}

function getTotalDiscountedPrice(items) {
    return items.reduce((sum, current) => {
        if (typeof current.discountedPrice === 'number') {
            sum += current.discountedPrice;
        }
        return sum;
    }, 0)
}

function calculateDiscount() {
    const generalDiscount = Number(generalDiscountInput.value);
    const copiedCartItems = structuredClone(cartItems);
    for (const cartItem of copiedCartItems) {
        if (cartItem.discount === 0) {
            continue;
        }
        if (generalDiscount > cartItem.discount) {
            cartItem.discountedPrice = cartItem.price - generalDiscount;
        } else {
            cartItem.discountedPrice = cartItem.price - cartItem.discount;
        }

    }
    printCartItems(copiedCartItems);
    discountedPrice.textContent = getTotalDiscountedPrice(copiedCartItems).toString();
}

printCartItems(cartItems);
totalPrice.textContent = getTotalPrice(cartItems).toString();
button.addEventListener('click', calculateDiscount);
