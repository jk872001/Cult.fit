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

<<<<<<< HEAD
=======
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

>>>>>>> parent of 80c6096 (added backend files)
function login_counter() {
    let cart_data_1 = JSON.parse(localStorage.getItem("cart_data")) || [];

    document.getElementById('cart_count').textContent = cart_data_1.length;
}
login_counter();





// -----------------------------------------------------start-------------------------------------------------------------------------------


import local_Storage from "../scripts/local_Storage.js";


// ------------------------------------------------------slider js-----------------------------------------------------------------------



let slide = document.querySelector('#sliders');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');

btn1.onclick = () => {
    slide.style.transform = 'translateX(0px)';
    btn1.classList.add("active");
    btn2.classList.remove("active");
    btn3.classList.remove("active");
}

btn2.onclick = () => {
    slide.style.transform = 'translateX(-100%)';
    btn1.classList.remove("active");
    btn2.classList.add("active");
    btn3.classList.remove("active");
}

btn3.onclick = () => {
    slide.style.transform = 'translateX(-200%)';
    btn1.classList.remove("active");
    btn2.classList.remove("active");
    btn3.classList.add("active");
}

document.getElementById('left_arrow_btn').onclick = () => {
    slide.style.transform = 'translateX(`${previous}%`)';
}

document.getElementById('right_arrow_btn').onclick = () => {
    slide.style.transform = 'translateX(`${previous}%`)';
}

let count = 0;
setInterval(function () {
    // console.log(count);
    if (count < -200) {
        count = 0;
    }
    if (count == 0) {
        slide.style.transform = 'translateX(-100%)';
        btn1.classList.remove("active");
        btn2.classList.add("active");
        btn3.classList.remove("active");
    }
    if (count == -100) {
        slide.style.transform = 'translateX(-200%)';
        btn1.classList.remove("active");
        btn2.classList.remove("active");
        btn3.classList.add("active");
    }

    if (count == -200) {
        slide.style.transform = 'translateX(0%)';
        btn1.classList.add("active");
        btn2.classList.remove("active");
        btn3.classList.remove("active");
    }
    count -= 100;
}, 4000);


// --------------------------------------------------------------end of slider js-------------------------------------------------------------------------------------



// ------------------------------------------------------------------append data on dom--------------------------------------------------------------------------------



let url = "http://localhost:4000/eat";

let getData = async () => {
    try {
        let fetched = await fetch(url);
        let dataFetched = await fetched.json();
        return dataFetched;
    }
    catch (error) {
        console.log(error);
    }
}

let data = await getData();
console.log(data);


const displayData = (array) => {
    document.getElementById('dish_item').innerHTML = "";

    array.map((items) => {
        let div = document.createElement("div");

        let imgDiv = document.createElement("div");
        imgDiv.id = "imgDiv";

        let image = document.createElement("img");
        image.src = items.img_url;
        imgDiv.append(image);

        let name = document.createElement("p");
        name.textContent = items.name;
        name.id = "nameid"

        let type = document.createElement("span");
        type.setAttribute("id", "vegan_type");
        type.textContent = items.type;

        let cal = document.createElement("span");
        cal.textContent = `${items.cal} Cal`;
        cal.style.borderRight = "1px solid gray";
        cal.className = "fiber";

        let fiber = document.createElement("span");
        fiber.textContent = items.fiber;
        fiber.className = "fiber";

        let price_div = document.createElement("div");
        price_div.id = "priceDiv";
        let price = document.createElement("span");
        price.textContent = `₹ ${items.price}`;
        price.style.fontWeight = "600";

        let str_price = document.createElement("span");
        str_price.textContent = `₹ ${items.str_price}`;
        str_price.style.textDecoration = "line-through";
        str_price.className = "fiber";

        let btn = document.createElement("button");
        btn.textContent = "ADD";
        btn.onclick = () => {
            local_Storage(items);
            login_counter();
        }

        price_div.append(price, str_price, btn);

        // image.onclick = () => {
        //     localStorage.setItem("product_page_data", JSON.stringify(items));
        //     window.location.href = 'product.html';
        // }

        div.append(imgDiv, name, type, cal, fiber, price_div);

        document.getElementById('dish_item').append(div);
    });
}

displayData(data);


// ------------------------------------------------------------end of append data------------------------------------------------------




// -------------------------------------------------------------------filter methods ---------------------------------------------------


let veg_filter = document.querySelector("#veg_span");
let flag = false;

veg_filter.onclick = () => {
    veg_filter.style.color = "rgb(138, 221, 48)";
    veg_filter.style.border = "1px solid rgb(138, 221, 48)";
    veg_filter.style.backgroundColor = "rgb(216,242,188)"
    let veg_arr = [];

    data.map((item) => {
        if (item.type == '🟢') {
            veg_arr.push(item);
        }
    });

    if (flag) {
        flag = false;
    }
    else {
        flag = true;
    }

    if (flag) {
        displayData(veg_arr);
    }
    else {
        displayData(data);
        veg_filter.style.color = "rgb(180, 180, 180)";
        veg_filter.style.border = "1px solid rgb(180, 180, 180)";
        veg_filter.style.backgroundColor = "white";
    }
}

let filter_sort = document.querySelector("#filter_img_class");
let filter_overlay = document.getElementById('filter_overlay');
let flag1 = false;

filter_sort.onclick = () => {
    if (!flag1) {
        filter_overlay.style.display = "block";
        filter_sort.style.color = "rgb(234,6,120)";
        flag1 = true;
    }
    else {
        filter_overlay.style.display = "none";
        filter_sort.style.color = "rgb(75, 75, 75)";
        flag1 = false;
    }
}

document.getElementById('cancel').onclick = () => {
    if (flag1) {
        filter_overlay.style.display = "none";
        filter_sort.style.color = "rgb(75, 75, 75)";
        flag1 = false;
    }
}


// ---------------------------overlay filter----------------------------------


let cal_span1 = document.getElementById('cal_span1');
let cal_span2 = document.getElementById('cal_span2');
let cal_span3 = document.getElementById('cal_span3');
let cal_span4 = document.getElementById('cal_span4');

let ul_list = document.getElementById('item_select');
let list = document.getElementById('ul_list');

ul_list.onclick = () => {
    if (!flag1) {
        list.style.display = "block";
        list.style.backgroundColor = "white";
        flag1 = true;
    }
    else {
        list.style.display = "none";
        flag1 = false;
    }
}


// -----------------------------------Filters------------------------------


document.getElementById('zero').onclick = () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.cal >= 0 && item.cal <= 200) {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
}

document.getElementById('two').onclick = () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.cal >= 200 && item.cal <= 500) {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
}

document.getElementById('four').onclick = () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.cal >= 500) {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
}


// ------------------------------------apply----------------------------


let check1 = document.getElementById('check1');
let check2 = document.getElementById('check2');
let check3 = document.getElementById('check3');
let check4 = document.getElementById('check4');

document.getElementById('apply').onclick = () => {
    let veg_arr = [];

    if (check1.checked) {
        data.map((item) => {
            if (item.fiber == "High protein") {
                veg_arr.push(item);
            }
        });
    }

    if (check2.checked) {
        data.map((item) => {
            if (item.cal >= 0 && item.cal <= 200) {
                veg_arr.push(item);
            }
        });
    }

    if (check3.checked) {
        data.map((item) => {
            if (item.fiber == "High fiber") {
                veg_arr.push(item);
            }
        });
    }

    if (check4.checked) {
        data.map((item) => {
            if (item.type == '🟢') {
                veg_arr.push(item);
            }
        });
    }
    filter_overlay.style.display = "none";
    console.log(veg_arr);

    displayData(veg_arr);
}

document.getElementById('clear_all').onclick = () => {
    displayData(veg_arr);
}


// Variety filters ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

document.getElementById("rice").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "3 Layer Rice Bowls") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});

document.getElementById("indian").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "Indian Thalis") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});

document.getElementById("khichdis").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "Khichdis") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});

document.getElementById("multi").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "Multigrain Pizzas") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});

document.getElementById("bev").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "Beverages") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});

document.getElementById("curr").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "Fit Curries") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});

document.getElementById("bread").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "Bread & Rice") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});

document.getElementById("nonV").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "Non-Veg Curries") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});

document.getElementById("kulcha").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "Kulcha Burger") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});

document.getElementById("salads").addEventListener("click", () => {
    let veg_arr = [];

    data.map((item) => {
        if (item.variety == "Signature Salads") {
            veg_arr.push(item);
        }
    });
    displayData(veg_arr);
});
