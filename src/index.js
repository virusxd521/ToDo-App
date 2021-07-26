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
const inside_ul_style = document.querySelector(".all-inserts");
const filter_buttons = document.querySelector(".filter-buttons");
const end_of_ul_buttons = document.querySelector(".controll-buttons");
const main = document.querySelector("main");
// Dark / white theme 

console.log(window.screen.width);


function changeElementsBasedSize(){
    if(screen.availWidth >= 1000){
        end_of_ul_buttons.insertBefore(filter_buttons, clear_all_button);
        filter_buttons.setAttribute("class", "aaa");
    } else if(
        screen.availWidth <= 1000 &&
        filter_buttons.parentNode.tagName === "DIV"
    ) {
        end_of_ul_buttons.removeChild(filter_buttons);
        main.appendChild(filter_buttons);
        filter_buttons.classList.remove("aaa");
        filter_buttons.classList.add("filter-buttons", "mt-4");
    }
}

window.addEventListener("DOMContentLoaded", event => {
    changeElementsBasedSize();
});

window.addEventListener("resize", event => {
    changeElementsBasedSize();
})

function switchToDarkTheme(event){
    event.target.attributes.src.value = "./styles/images/icon-sun.svg";
    header.style.backgroundImage = "url(./styles/images/bg-mobile-dark.jpg)";
    body.style.backgroundColor = "hsl(235, 24%, 19%)";
    for (let i = 0; i < form.children.length; i++){
        form.children[i].style.backgroundColor = "hsl(237, 14%, 26%)";
        form.children[i].style.color = "white";
    }
    for(let i = 0; i < ul_children.length; i++){                
        console.log(ul_children[i]);
        for(let j = 0; j < ul_children[i].children.length; j++){
            if(ul_children[i].children[j].tagName === "INPUT"){
                console.log(ul_children[i].children[j]);
                ul_children[i].children[j].style.backgroundColor = "hsl(237, 14%, 26%)";
            } else if(ul_children[i].children[j].tagName === "SPAN"){
                ul_children[i].children[j].style.color = "white";
            }
        }
    }
    inside_ul_style.style.backgroundColor = "hsl(237, 14%, 26%)";
    filter_buttons.style.backgroundColor = "hsl(237, 14%, 26%)";    
}

function switchToDefaultTheme(event){
    body.style.backgroundColor = "rgb(246, 246, 246)";
    header.style.backgroundImage = "url(./styles/images/bg-mobile-light.jpg)";
    event.target.attributes.src.value = "./styles/images/icon-moon.svg";

    for (let i = 0; i < form.children.length; i++){
        form.children[i].style.backgroundColor = "white";
        form.children[i].style.color = "black";
    }

    for(let i = 0; i < ul_children.length; i++){                
        console.log(ul_children[i]);
        for(let j = 0; j < ul_children[i].children.length; j++){
            if(ul_children[i].children[j].tagName === "INPUT"){
                console.log(ul_children[i].children[j]);
                ul_children[i].children[j].style.backgroundColor = "white";
            } else if(ul_children[i].children[j].tagName === "SPAN"){
                ul_children[i].children[j].style.color = "rgb(110, 110, 110)";
            }
        }
    }

    inside_ul_style.style.backgroundColor = "white";
    filter_buttons.style.backgroundColor = "white";
}

header_div.addEventListener("click", event => {
    if (event.target.tagName === "IMG"){ 
        if(event.target.attributes.src.value === "./styles/images/icon-moon.svg"){
            switchToDarkTheme(event);
        } else if(event.target.attributes.src.value === "./styles/images/icon-sun.svg"){
            switchToDefaultTheme(event);
        }
    }
})

// the remove button

// the done button

function markAsDone(circleButton, text_span){

    circleButton.addEventListener("click", event => {
        if(event.target.checked === false){
            event.target.setAttribute("class", "gradient-click");
            text_span.style.textDecoration = "line-through";
            allStateObj.completed.arrOfCompleted.push(circleButton.parentNode);
            const idx = allStateObj.active.arrOfActive.indexOf(circleButton.parentNode);
            allStateObj.active.arrOfActive.splice(idx, 1);
            itemsLeft_removing();
            event.target.checked = true;
        } else {
            event.target.setAttribute("class", "");
            text_span.style.textDecoration = "none";
            itemsLeft_adding();
            allStateObj.active.arrOfActive.push(circleButton.parentNode);
            const idx = allStateObj.completed.arrOfCompleted.indexOf(circleButton.parentNode);
            allStateObj.completed.arrOfCompleted.splice(idx, 1);
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
    li.setAttribute("draggable", "true");
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

    for(let i = 0; i < ul_children.length; i++){
        ul_children[i].addEventListener("dragstart", event => {
            ul_children[i].classList.add("dragging");
        })
    }

    for(let i = 0; i < ul_children.length; i++){
        if(!allStateObj.active.arrOfActive.includes(ul_children[i])){
            allStateObj.active.arrOfActive.push(ul_children[i]);
            allStateObj.all.arrOfAll.push(ul_children[i]);
        }
    }   
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
                elements_arr_remove.push(ul_children[i]);  
            }
        }
    }
    for(let i = 0; i < elements_arr_remove.length; i++){
        ul.removeChild(elements_arr_remove[i]);
        const idx  = allStateObj.completed.arrOfCompleted.indexOf(elements_arr_remove[i]);
        allStateObj.completed.arrOfCompleted.splice(idx, 1);
        allStateObj.all.arrOfAll.splice(idx, 1);

    }   
});

// drag and drop
ul.addEventListener("dragend", event => {
    for(let i = 0; i < ul_children.length; i++){
        ul_children[i].classList.remove("dragging");
    } 
})

ul.addEventListener("dragover", event => {
    event.preventDefault();
    const afterElement = afterPositionDrag(ul, event.clientY);
    const draggable = document.querySelector(".dragging");
    if(afterElement === null){
        ul.appendChild(draggable);
    } else {
        ul.insertBefore(draggable, afterElement);
    }
});

function afterPositionDrag(theUlElement, yPosition){
    const draggableElements = [...theUlElement.querySelectorAll("li:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = yPosition - box.top - box.height / 2; 
        if( offset < 0 && offset > closest.offset ){
            return {offset: offset, element: child};
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY}).element;
}

//  all active Completed filters

function allItemsShow(event, list){
    event.target.style.color = "navy";
    for(let i = 0; i < list.all.arrOfAll.length; i++){
        ul.appendChild(list.all.arrOfAll[i]);
        
    }  
}

function activeItems(event, list){
    event.target.style.color = "navy";
    for(let i = 0; i < list.active.arrOfActive.length; i++){
        ul.appendChild(list.active.arrOfActive[i]);
    }

    for(let i = 0; i < list.completed.arrOfCompleted.length; i++){
        if(list.completed.arrOfCompleted[i].parentNode !== null && 
            list.completed.arrOfCompleted[i].parentNode !== undefined){
                ul.removeChild(list.completed.arrOfCompleted[i]);
            }   
    }
}

function completedItems(event, list){
    event.target.style.color = "navy";
    for(let i = 0; i < list.completed.arrOfCompleted.length; i++){
        ul.appendChild(list.completed.arrOfCompleted[i]);    
    }  

    for(let i = 0; i < list.active.arrOfActive.length; i++){
        ul.removeChild(list.active.arrOfActive[i]);  
    }
}

let allStateObj = {
    active: {
        name: "ACTIVE",
        arrOfActive: []
    },
    completed: {
        name:  "COMPLETED",
        arrOfCompleted: []
    },
    all: {
        name: "ALL",
        arrOfAll: []
    }     
}

filter_buttons.addEventListener("click", event => {
    const classes_of_element = event.target.textContent.trim();
    const textAfterUpper = classes_of_element.toUpperCase();
    if(textAfterUpper === "ACTIVE"){
        activeItems(event, allStateObj);
    } else if(textAfterUpper === "COMPLETED"){
        completedItems(event, allStateObj);
    } else if(textAfterUpper === "ALL"){
        allItemsShow(event, allStateObj); 
    }
})







