"use strict";

const images = [...document.querySelectorAll(".image-gallery")];
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");
const largeName = document.querySelector(".large-image");
const imageIndex = document.querySelector(".index");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const imgLarge = document.querySelector(".large-image");
const arrows = document.querySelector(".arrows");
const arrowsR = document.querySelector(".arrowR");
let index = 0;

images.forEach((item, i) => {
    item.addEventListener("click", () => {
        updateImage(i);
        popup.classList.toggle("active");
    });
});

const updateImage = (i) => {
    let path = `assets/img/jeweler2-gallery-pic${i + 1}.webp`;
    largeName.src = path;
    imageIndex.innerHTML = `${i + 1} / 6`;
    index = i;
};
// closeBtn.addEventListener("click", () => {
//   popup.classList.toggle("active");
// });

leftArrow.addEventListener("click", () => {
    if (index > 0) {
        updateImage(index - 1);
    } else if (index === 0) {
        updateImage(5);
    }
});

imgLarge.addEventListener("click", () => {
    if (index < images.length - 1) {
        updateImage(index + 1);
    } else if (index === images.length - 1) {
        updateImage(0);
    }
});

rightArrow.addEventListener("click", () => {
    if (index < images.length - 1) {
        updateImage(index + 1);
    } else if (index === images.length - 1) {
        updateImage(0);
    }
});

popup.addEventListener("click", (event) => {
    console.log(event);
    if (
        event.target !== imgLarge &&
        event.target !== arrows &&
        event.target !== arrowsR
    ) {
        popup.classList.toggle("active");
        // popup.style.backgroundColor = "red";
    } // Set opacity to 0
});
