let img_side = document.querySelector(".img_side");
let menu_side = document.querySelector(".menu_side");
let menuLarge = document.querySelectorAll(".menuLarge");

window.addEventListener("DOMContentLoaded", () => {
  menuLarge.forEach((item, idx) => {
    item.style.transitionDelay = (idx * 0.2) + "s";
    item.classList.add("on");
    
    item.addEventListener("click", ()=> {
      menuLarge.forEach((otherItem) => {
console.log(otherItem)
        if(otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
      item.classList.toggle("active");
    });
  });
  img_side.classList.add("on");      
});
