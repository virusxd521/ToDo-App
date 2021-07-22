const bootstrap = require('bootstrap');
const header_div = document.getElementsByClassName("div")[0];
const header = document.querySelector("header");
header.style.backgroundImage = "url(./styles/images/bg-mobile-light.jpg)";
const body = document.querySelector("body");
const form = document.querySelector("#form");


header_div.addEventListener("click", event => {
    if (event.target.tagName === "IMG"){
        
        function switchToDarkTheme(){
            event.target.attributes.src.value = "./styles/images/icon-sun.svg";
            header.style.backgroundImage = "url(./styles/images/bg-mobile-dark.jpg)";
            body.style.backgroundColor = "rgb(50, 42, 78)";
        }

        function switchToDefaultTheme(){
            body.style.backgroundColor = "rgb(246, 246, 246)";
            header.style.backgroundImage = "url(./styles/images/bg-mobile-light.jpg)";
            event.target.attributes.src.value = "./styles/images/icon-moon.svg";
        }

        if(event.target.attributes.src.value === "./styles/images/icon-moon.svg"){
            switchToDarkTheme();
        } else if(event.target.attributes.src.value === "./styles/images/icon-sun.svg"){
            switchToDefaultTheme();
        }

    }
    
})


form.addEventListener("submit", event => {
    event.preventDefault();
  
});








