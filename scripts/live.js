import { navbar } from "../components/navbar.js";
import { footer } from "../components/footer.js";

document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer();

document.getElementById("icon").addEventListener("click", () => {
    window.location.href = "index.html";
});


function login_counter() {
    let cart_data_1 = JSON.parse(localStorage.getItem("cart_data")) || [];

    document.getElementById('cart_count').textContent = cart_data_1.length;
}

login_counter();

document.getElementById("cart").addEventListener("click", () => {
    window.location.href = "cart.html";
});

document.getElementById("userPic").addEventListener("click", () => {
    window.location.href = "login.html";
});

document.getElementById('continue_btn').onclick = () => {
    if (document.getElementById('login_input').value == '12345') {
        document.getElementById('login_div').innerHTML = "";

        document.getElementById('login_div').innerText = "OTP is sent to your phone number";

        let input = document.createElement("input");
        input.id = "login_input";
        input.setAttribute("placeholder", "Enter OTP (123)");
        
        let btn = document.createElement("button");
        btn.textContent = "Verify OTP";
        btn.id = "login_verify_btn";
        btn.onclick = () => {
            if (input.value == "123") {
                alert("Login Successfull");
                window.location.href = 'eat.html';
            }
            else {
                alert("Wrong OTP");
            }
        }

        document.getElementById('login_div').append(input, btn);
    }
    else {
        alert("wrong credentials");
    }
}
