document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const items = Array.from(document.querySelectorAll(".merch-item"));
    const scrollLeftBtn = document.querySelector(".scroll-left");
    const scrollRightBtn = document.querySelector(".scroll-right");

    let currentIndex = 0;
    const totalItems = items.length;
    const itemWidth = items[0].offsetWidth + 10; // Width + gap

    // Clone first and last items for smooth infinite loop
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);

    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, items[0]);

    // Update item list after cloning
    const updatedItems = document.querySelectorAll(".merch-item");

    // Position carousel at first real item (offset due to cloning)
    carousel.style.transform = `translateX(-${itemWidth}px)`;

    function updateCarousel(index, animate = true) {
        if (!animate) {
            carousel.style.transition = "none";
        } else {
            carousel.style.transition = "transform 0.5s ease-in-out";
        }
        const offset = -(index + 1) * itemWidth;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    function moveRight() {
        currentIndex++;
        updateCarousel(currentIndex);

        // If we reach the cloned last item, reset instantly
        setTimeout(() => {
            if (currentIndex >= totalItems) {
                currentIndex = 0;
                updateCarousel(currentIndex, false);
            }
        }, 500);
    }

    function moveLeft() {
        currentIndex--;
        updateCarousel(currentIndex);

        // If we reach the cloned first item, reset instantly
        setTimeout(() => {
            if (currentIndex < 0) {
                currentIndex = totalItems - 1;
                updateCarousel(currentIndex, false);
            }
        }, 500);
    }

    // Auto-scroll every 3 seconds
    setInterval(moveRight, 3000);

    // Button controls
    scrollLeftBtn.addEventListener("click", moveLeft);
    scrollRightBtn.addEventListener("click", moveRight);
});
