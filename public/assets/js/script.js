"use strict";

// STICKY NAVIGATION
window.addEventListener("scroll", function () {
    if (window.innerWidth > 767) {
        let navigation = document.querySelector(".navigation");
        let navHeight = navigation.getBoundingClientRect().height;
        navigation.classList.toggle("sticky", window.scrollY > navHeight);
    }
});

// NAVIGATION TOGGLE
const btnToggle = document.querySelector(".navbar-toggle");
const navLinksContainer = document.querySelector(".navbar-links");
const navCloseBtn = document.querySelector(".navbar-cancel-button");
const overlay = document.querySelector(".overlay");
const navIcons = document.querySelector(".navbar-icons-container");

function hideOverlay() {
    overlay.classList.remove("dark-overlay");
}

function removeShow() {
    navLinksContainer.classList.remove("show");
}

btnToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    navLinksContainer.classList.toggle("show");
    overlay.classList.toggle("dark-overlay");
});
document.addEventListener("click", function (event) {
    if (
        !navLinksContainer.contains(event.target) &&
        !btnToggle.contains(event.target)
    ) {
        removeShow();
        hideOverlay();
    }
});
navCloseBtn.addEventListener("click", function () {
    removeShow();
    hideOverlay();
});
overlay.addEventListener("click", function () {
    hideOverlay();
});
navIcons.addEventListener("click", function () {
    hideOverlay();
});

// // ACTIVE LINK

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
        link.classList.add("active");
    }
});

// COUNTER ANIMATION

function animateCounters(selector, increment) {
    let displayValues = document.querySelectorAll(selector);
    let interval = 1000;

    displayValues.forEach((valueDisplay) => {
        let startValue = 0;

        let dataVal = valueDisplay.getAttribute("data-val");
        let isPercentage = dataVal.includes("%");

        let numericValue = isPercentage
            ? parseFloat(dataVal)
            : parseInt(dataVal);

        let endValue = isPercentage ? (numericValue / 100) * 100 : numericValue;

        let duration = endValue !== 0 ? Math.round(interval / endValue) : 0;

        let counter = setInterval(function () {
            startValue += increment;
            valueDisplay.textContent = isPercentage
                ? `${startValue}%`
                : startValue;
            if (startValue >= endValue) {
                clearInterval(counter);
            }
        }, duration);
    });
}

function createIntersectionObserver(targetSection, animationFunction) {
    let animationTriggered = false;

    return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !animationTriggered) {
                animationFunction(".counter", 1);
                animationTriggered = true;
                observer.disconnect();
            }
        });
    });
}

function exclusiveIntersectionObserver(targetSection, animationFunction) {
    let animationTriggered = false;

    return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !animationTriggered) {
                animationFunction(".exclusive-counter", 10);
                animationTriggered = true;
                observer.disconnect();
            }
        });
    });
}

let targetHomeSection = document.getElementById("home-counter");
let targetInfoSection = document.getElementById("info-counter");
let targetExclusiveSection = document.getElementById("exclusive");

let observerHome = createIntersectionObserver(
    targetHomeSection,
    animateCounters
);
let observerInfo = createIntersectionObserver(
    targetInfoSection,
    animateCounters
);
let observerExclusive = exclusiveIntersectionObserver(
    targetExclusiveSection,
    animateCounters
);

if (targetInfoSection) {
    observerInfo.observe(targetInfoSection);
}
if (targetExclusiveSection) {
    observerExclusive.observe(targetExclusiveSection);
}
if (targetHomeSection) {
    observerHome.observe(targetHomeSection);
}

// FOOTER GALLLERY POPUP
const galleryImages = Array.from(document.querySelectorAll(".gallery-image"));
const popup = document.querySelector(".gallery-popup");
const closeBtn = document.querySelector(".popup-close-svg");
const imageIndexElement = document.querySelector(".index");
const leftArrowElement = document.querySelector(".popup-left");
const rightArrowElement = document.querySelector(".popup-right");
const largeImageElement = document.querySelector(".large-image");
const leftSideElement = document.querySelector(".popup-left-arrow");
const rightSideElement = document.querySelector(".popup-right-arrow");
let currentIndex = 0;

galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        updateImage(index);
        togglePopup();
    });
});

const updateImage = (newIndex) => {
    const imagePath = `assets/img/jeweler2-gallery-pic${newIndex + 1}.webp`;
    largeImageElement.src = imagePath;
    imageIndexElement.innerHTML = `${newIndex + 1} / ${galleryImages.length}`;
    currentIndex = newIndex;
};

const togglePopup = () => {
    popup.classList.toggle("active");
};

leftArrowElement.addEventListener("click", () => {
    if (currentIndex > 0) {
        updateImage(currentIndex - 1);
    } else if (currentIndex === 0) {
        updateImage(galleryImages.length - 1);
    }
});

rightArrowElement.addEventListener("click", () => {
    if (currentIndex < galleryImages.length - 1) {
        updateImage(currentIndex + 1);
    } else if (currentIndex === galleryImages.length - 1) {
        updateImage(0);
    }
});

largeImageElement.addEventListener("click", () => {
    if (currentIndex < galleryImages.length - 1) {
        updateImage(currentIndex + 1);
    } else if (currentIndex === galleryImages.length - 1) {
        updateImage(0);
    }
});

imageIndexElement.addEventListener("click", () => {
    if (currentIndex < galleryImages.length - 1) {
        updateImage(currentIndex + 1);
    } else if (currentIndex === galleryImages.length - 1) {
        updateImage(0);
    }
});

popup.addEventListener("click", (event) => {
    if (
        ![
            largeImageElement,
            leftSideElement,
            rightSideElement,
            imageIndexElement,
        ].includes(event.target)
    ) {
        togglePopup();
    }
});

// SCROLL TO TOP
const scrollTop = document.querySelector(".scroll-top");
scrollTop.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
});

// PRODUCT PREVIEW HOME PAGE
const homePageOverlay = document.querySelectorAll(".home-page-overlay");
const previewButton = document.querySelectorAll(".product-preview-button");
const closePreviewBtn = document.querySelectorAll(".preview-close-button");
previewButton.forEach((btn, index) => {
    btn.addEventListener("click", function () {
        const home = homePageOverlay[index];
        home.classList.toggle("active");
    });
});
closePreviewBtn.forEach((close, index) => {
    close.addEventListener("click", function () {
        const home = homePageOverlay[index];
        home.classList.remove("active");
    });
});

// PRODUCT PREVIEW PRODUCT PAGE
const productPageOverlay = document.querySelectorAll(".product-page-overlay");
previewButton.forEach((btn, index) => {
    btn.addEventListener("click", function () {
        const product = productPageOverlay[index];
        product.classList.toggle("active");
    });
});
closePreviewBtn.forEach((close, index) => {
    close.addEventListener("click", function () {
        const product = productPageOverlay[index];
        product.classList.remove("active");
    });
});

// ACTIVESS
const previewOptionsMaterial = document.querySelectorAll(
    ".preview-options-material"
);
previewOptionsMaterial.forEach((option) => {
    option.addEventListener("click", function () {
        previewOptionsMaterial.forEach((otherOption) => {
            otherOption.classList.remove("active");
        });

        option.classList.add("active");
    });
});

const previewSizes = document.querySelectorAll(".preview-size");
previewSizes.forEach((size) => {
    size.addEventListener("click", function () {
        previewSizes.forEach((otherSize) => {
            otherSize.classList.remove("active");
        });

        size.classList.add("active");
    });
});

// INPUT STEPPER NUMBER

function createSteppers(containerClass, minValue, maxValue, stepValue) {
    const containers = document.querySelectorAll(`.${containerClass}`);

    containers.forEach((container) => {
        const input = container.querySelector(".preview-user-info-input");
        const decrementBtn = container.querySelector(
            ".preview-user-info-button-decrement"
        );
        const incrementBtn = container.querySelector(
            ".preview-user-info-button-increment"
        );

        decrementBtn.addEventListener("click", () => {
            updateValue(-stepValue);
        });

        incrementBtn.addEventListener("click", () => {
            updateValue(stepValue);
        });

        function updateValue(change) {
            let newValue = parseInt(input.value) + change;
            newValue = Math.min(Math.max(newValue, minValue), maxValue);
            input.value = newValue;
        }
    });
}

// Usage
createSteppers("stepper-container", 1, 100, 1);

// ADD TO WISHLIST
const productWishBtn = document.querySelectorAll(".product-wish-button");
const productWishIcon = document.querySelectorAll(".product-wish-icon");
const addToWishlist = document.querySelectorAll(".add-to-wishlist");

productWishBtn.forEach((btn, index) => {
    btn.addEventListener("click", function () {
        productWishIcon[index].classList.toggle("hide");
        addToWishlist[index].classList.toggle("active");
        btn.classList.toggle("active");
    });
});

// PRODUCT DETAIL IMAGES CAROUSEL
const jewelryImage = document.querySelector(".product-jewelry-image");
const productImageButton = document.querySelector(".product-jewelry-full");
const productZoomButton = document.querySelector(".product-jewelry-zoom-box");
const productZoomImage = document.querySelector(".product-zoom-image");
productZoomButton?.addEventListener("click", function () {
    jewelryImage.style.transform = "translateX(-100%)";
    productZoomImage.style.transform = "translateX(-100%)";
    jewelryImage.style.transition = "all 0.5s";
    productZoomImage.style.transition = "all 0.5s";
});

productImageButton?.addEventListener("click", function () {
    jewelryImage.style.transform = "translateX(0)";
    productZoomImage.style.transform = "translateX(0%)";
    jewelryImage.style.transition = "all 0.5s";
    productZoomImage.style.transition = "all 0.5s";
});

// ACTIVE PRODUCT DETAILS LINK

const detailsPage = window.location.pathname;
const productDetailOptions = document.querySelectorAll(
    ".product-jewelry-option"
);

productDetailOptions.forEach((option) => {
    option.addEventListener("click", function () {
        productDetailOptions.forEach((opt) => {
            opt.classList.remove("activate");
        });

        this.classList.add("activate");
    });
});

// NAVBAR USER LOGIN

document.addEventListener("DOMContentLoaded", function () {
    var navbarUserButton = document.querySelector(
        ".navbar-user-button-container"
    );
    var loginBox = document.querySelector(".login-box");

    navbarUserButton.addEventListener("click", function (event) {
        event.stopPropagation();

        loginBox.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!loginBox.contains(event.target)) {
            loginBox.classList.remove("active");
        }
    });

    loginBox.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    var loginCloseButton = document.querySelector(".login-close-button");
    loginCloseButton.addEventListener("click", function () {
        loginBox.classList.remove("active");
    });
});

// NAVBAR CART NAVIGATION
const navbarCartContainer = document.querySelector(".navbar-cart-icon");
const cartCloseButton = document.querySelector(".cart-close-button");
const cartCollection = document.querySelector(".cart-collection");
navbarCartContainer.addEventListener("click", function () {
    cartCollection.classList.toggle("active");
});
cartCloseButton.addEventListener("click", function () {
    cartCollection.classList.remove("active");
});

// LOGIN FIXED BOX

const loginFixedBox = document.querySelector(".login-fixed-box");
const fixedCloseBtn = document.querySelector(".fixed-close-button");
const navRespBtn = document.querySelector(".navbar-user-mobile");
navRespBtn.addEventListener("click", function () {
    if (window.innerWidth < 767) {
        loginFixedBox.classList.toggle("active");
    }
});
fixedCloseBtn.addEventListener("click", function () {
    loginFixedBox.classList.remove("active");
});

// PRODUCT FILTER
const filterBtn = document.querySelector(".product-filter-hover");
const filterToggle = document.querySelector(".filter-toggle");

function handleDocumentClick(event) {
    if (
        !filterToggle?.contains(event.target) &&
        event.target !== filterToggle
    ) {
        filterToggle?.classList.remove("active");
    }
}

filterBtn?.addEventListener("click", function (event) {
    event.stopPropagation();
    filterToggle.classList.toggle("active");
});

document.body.addEventListener("click", handleDocumentClick);

// FILTER SLIDER

window.onload = function () {
    slideMin();
    slideMax();
};

const minVal = document.querySelector(".min-val");
const maxVal = document.querySelector(".max-val");
const priceInputMin = document.querySelector(".min-input");
const priceInputMax = document.querySelector(".max-input");
const minGap = 0;
const sliderMinValue = parseInt(minVal?.min);
const sliderMaxValue = parseInt(maxVal?.max);
function slideMin() {
    let gap = parseInt(maxVal?.value) - parseInt(minVal?.value);
    if (gap <= minGap) {
        minVal.value = parseInt(maxVal.value) - minGap;
    }
    priceInputMin.value = minVal?.value;
}
function slideMax() {
    let gap = parseInt(maxVal.value) - parseInt(minVal.value);
    if (gap <= minGap) {
        maxVal.value = parseInt(minVal.value) + minGap;
    }
    priceInputMax.value = maxVal.value;
}

function setMinInput() {
    let minPrice = parseInt(priceInputMin.value);
    if (minPrice < sliderMinValue) {
        priceInputMin.value = sliderMinValue;
    }
    minVal.value = priceInputMin.value;
    slideMin();
}

function setMaxInput() {
    let maxPrice = parseInt(priceInputMax.value);
    if (maxPrice < sliderMaxValue) {
        priceInputMax.value = sliderMaxValue;
    }
    maxVal.value = priceInputMax.value;
    slideMax();
}

// EYE PASSWORD

const eyeIcon = document.getElementById("eyeicon");
const showPassword = document.getElementById("login-password");

eyeIcon?.addEventListener("click", function () {
    const type =
        showPassword?.getAttribute("type") === "password" ? "text" : "password";
    showPassword?.setAttribute("type", type);
});
