// initializing cart, total
let cart = [];
let total = 0;

// function to add items to the cart
function addToCart(itemName, itemPrice, quantity = 1) {
  let qt = quantity;

  // Validate the quantity based on the itemName (if needed)
  if (itemName === "Beastie Boys - Ill Communication Vinyl Record") {
    const inputElements = document.getElementsByClassName("quantity1");
    qt = parseInt(inputElements[0].value);
    if (isNaN(qt) || qt === 0) {
      return;
    }
  } else if (itemName === "Coldplay - Parachutes Vinyl Record") {
    const inputElements = document.getElementsByClassName("quantity2");
    qt = parseInt(inputElements[0].value);
    if (isNaN(qt) || qt === 0) {
      return;
    }
  } else if (itemName === "Taylor Swift - 1989 Vinyl Record") {
    const inputElements = document.getElementsByClassName("quantity3");
    qt = parseInt(inputElements[0].value);
    if (isNaN(qt) || qt === 0) {
      return;
    }
  } else if (itemName === "Harry Styles - Love on Tour Official Merchandise") {
    const inputElements = document.getElementsByClassName("quantity4");
    qt = parseInt(inputElements[0].value);
    if (isNaN(qt) || qt === 0) {
      return;
    }
  } else if (itemName === "Backstreet Boys - Dont Go Mug") {
    const inputElements = document.getElementsByClassName("quantity5");
    qt = parseInt(inputElements[0].value);
    if (isNaN(qt) || qt === 0) {
      return;
    }
  } else if (itemName === "Taylor Swift - The Eras Tour White T-Shirt") {
    const inputElements = document.getElementsByClassName("quantity6");
    qt = parseInt(inputElements[0].value);
    if (isNaN(qt) || qt === 0) {
      return;
    }
  }

  // Check if the item is already in the cart
  let itemIndex = cart.findIndex(item => item.name === itemName);
  if (itemIndex !== -1) {
    // Updating the quantity
    cart[itemIndex].quantity += qt;
  } else {
    // If the item is not in the cart, add it to the cart
    alert(`${itemName} x ${qt} is added to cart`);
    cart.push({ name: itemName, price: itemPrice, quantity: qt });
  }

  // Updating the total
  total += itemPrice * qt;
  updateCart();
}

// function to update the cart and total
function updateCart() {
  // Getting the cart list element
  let cartList = document.getElementById("cartList");

  // Clearing the cart list element
  cartList.innerHTML = "";

  // Updating the cart list element with the items in the cart
  cart.forEach(item => {
    let li = document.createElement("li");
    li.innerText = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
    cartList.appendChild(li);
  });

  // Updating the total element
  document.getElementById("total").innerText = `Total: $${total}`;
}

// function to clear the cart and total
function clearCart() {
  cart = [];
  total = 0;
  updateCart();
}

// function for express delivery
function expressChecked() {
  let expressDelivery = document.getElementById("ExpressDelivery").checked;
  let expressDiv = document.getElementById("express");
  expressDiv.innerHTML = "";

  if (expressDelivery) {
    let li = document.createElement("li");
    li.innerText = "Express fee $20";
    expressDiv.appendChild(li);
    total += 20;
    updateCart();
  } else {
    total -= 20;
    updateCart();
  }
}

// function for checkout
function checkout() {
  // Getting the user information from the form
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let expressDelivery = document.getElementById("ExpressDelivery").checked;

  if (cart.length === 0) {
    alert("Your cart is Empty. Please add some Items to your cart before Checking Out.");
    return;
  }

  if (!name || !email) {
    alert("Provide your Name and your Email to continue.");
    return;
  }

  if (email && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    alert("Not a valid email.");
    return;
  }

  // Creating an order object with the cart, total, and user information
  let order = {
    cart: cart,
    total: total,
    user: {
      name: name,
      email: email,
      expressDelivery: expressDelivery
    }
  };

  // Sending the order to the server using local storage
  localStorage.setItem("order", JSON.stringify(order));
  window.location.href = "Checkout.html";
  console.log("Order:", order);

  // Clearing the cart and total
  clearCart();
}
