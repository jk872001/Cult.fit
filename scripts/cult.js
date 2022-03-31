import { navbar } from "../components/navbar.js";
import { footer } from "../components/footer.js";

document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer();


document.getElementById("icon").addEventListener("click", () => {
    window.location.href = "index.html";
});


document.getElementById("cart").addEventListener("click", () => {
    window.location.href = "cart.html";
});


document.getElementById("userPic").addEventListener("click", () => {
    window.location.href = "login.html";
});


function login_counter() {
    let cart_data_1 = JSON.parse(localStorage.getItem("cart_data")) || [];

    document.getElementById('cart_count').textContent = cart_data_1.length;
}

login_counter();