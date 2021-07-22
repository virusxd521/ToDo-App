const bootstrap = require('bootstrap');
const header_div = document.getElementsByClassName("div")[0];
const header = document.querySelector("header");
header.style.backgroundImage = "url(./styles/images/bg-mobile-light.jpg)";
const body = document.querySelector("body");

header_div.addEventListener("click", event => {
    if (event.target.tagName === "IMG"){
        if(event.target.attributes.src.value === "./styles/images/icon-moon.svg"){
            event.target.attributes.src.value = "./styles/images/icon-sun.svg";
            header.style.backgroundImage = "url(./styles/images/bg-mobile-dark.jpg)";
            body.style.backgroundColor = "rgb(50, 42, 78)";
        } else if(event.target.attributes.src.value === "./styles/images/icon-sun.svg"){
            body.style.backgroundColor = "white";
            header.style.backgroundImage = "url(./styles/images/bg-mobile-light.jpg)";
            event.target.attributes.src.value = "./styles/images/icon-moon.svg";
            
            
        }
        console.log(event.target);
        console.log(event.target.attributes.src.value);
    }
    
})



