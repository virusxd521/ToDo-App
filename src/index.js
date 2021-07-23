const bootstrap = require('bootstrap');
const header_div = document.getElementsByClassName("div")[0];
const header = document.querySelector("header");
header.style.backgroundImage = "url(./styles/images/bg-mobile-light.jpg)";
const body = document.querySelector("body");
const form = document.querySelector("#form");
const ul = document.getElementById("ul-items");
const ul_children = ul.children;
const number_of_items = document.querySelector("#number-of-items");
const clear_all_button = document.querySelector("#clear-all-button");
let itemsCounter = 0;
const textOfItemLeft = `items left`;


// Dark / white theme 

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

// the remove button

// the done button

function markAsDone(circleButton, text_span){

    circleButton.addEventListener("click", event => {
        if(event.target.checked === false){
            event.target.style.backgroundColor = "navy";
            text_span.style.textDecoration = "line-through";
            itemsLeft_removing();
            event.target.checked = true;
        } else {
            event.target.style.backgroundColor = "white";
            text_span.style.textDecoration = "none";
            itemsLeft_adding();
            event.target.checked = false;
        }
    
        
        
    });
}


function itemsLeft_adding(){
        itemsCounter += 1;
        number_of_items.textContent = `${itemsCounter} ${textOfItemLeft}`;

}

function itemsLeft_removing(){
    if(itemsCounter === "0" || itemsCounter === 0){
        number_of_items.textContent = ` there aren't ${textOfItemLeft}`;
    } else {
        itemsCounter -= 1;
        number_of_items.textContent = `${itemsCounter} ${textOfItemLeft}`;
    }

}






form.addEventListener("submit", event => {
    event.preventDefault();
    const li = document.createElement("li");
    const theInput = event.target.children[1];
    const input_button = document.createElement("input");
    const span = document.createElement("span");
    const image = document.createElement("img");
    image.src = "../styles/images/icon-cross.svg";
    span.textContent = theInput.value;
    input_button.type = "button";
    li.appendChild(input_button);
    li.appendChild(span);
    li.appendChild(image);
    ul.appendChild(li);
    

    markAsDone(input_button, span);

    // adding items to the list and updating the counter
    if (theInput !== ""){
        itemsLeft_adding();
    }
    

    // Removing items by clicking the x button and updating the counter
    image.addEventListener("click", event => {
        ul.removeChild(li);
        itemsLeft_removing();
    });
    
});


// clear Completed
clear_all_button.addEventListener("click", event => {
    const elements_arr_remove = [];
    for(let i = 0; i < ul_children.length; i++ ){
        let tags_inder_li = ul_children[i].children;
        for(let j = 0; j < tags_inder_li.length; j++){
            let inner_span_element = tags_inder_li[j];  
            if(inner_span_element.tagName === "SPAN" &&
               inner_span_element.style.textDecoration === "line-through"
            ){
                itemsLeft_removing();
                elements_arr_remove.push(ul_children[i]);
                
            }
        }
        

    }
    for(let i = 0; i < elements_arr_remove.length; i++){
        ul.removeChild(elements_arr_remove[i]);
    }
    
});

//  all active Completed filters

// drag and drop

// keep styleeing the darkmode & desktop layout