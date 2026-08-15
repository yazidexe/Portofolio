// ===========================
// script.js — Yuma Portofolio
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portofolio loaded!');
});

// =========================
// MODAL
// =========================

function openProjectImage(image, title) {
    const modal = document.getElementById("projectModal");
    const modalImage = document.getElementById("projectModalImage");
    const modalTitle = document.getElementById("projectModalTitle");

    modalImage.src = image;
    modalImage.alt = `Screenshot ${title}`;
    modalTitle.textContent = title;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeProjectImage() {
    const modal = document.getElementById("projectModal");

    modal.classList.remove("active");

    document.body.style.overflow = "";
}

document
    .getElementById("projectModal")
    .addEventListener("click", function (event) {

        if (event.target === this) {
            closeProjectImage();
        }

    });

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeProjectImage();
    }

});


// =========================
// KASIR PROJECT
// =========================

const kasirPages = [
    {
        key: "register",
        image: "assets/images/kasir/register.jpg",
        title: "Register Petugas"
    },
    {
        key: "dashboard",
        image: "assets/images/kasir/dashboard.jpg",
        title: "Dashboard"
    },
    {
        key: "products",
        image: "assets/images/kasir/products.jpg",
        title: "Products"
    },
    {
        key: "customers",
        image: "assets/images/kasir/customers.jpg",
        title: "Customers"
    },
    {
        key: "sales",
        image: "assets/images/kasir/sales.jpg",
        title: "Sales"
    },
    {
        key: "history",
        image: "assets/images/kasir/history.jpg",
        title: "History"
    },
    {
        key: "struk",
        image: "assets/images/kasir/struk.jpg",
        title: "Struk"
    }
];

let kasirCurrentIndex = 1; // default: dashboard

function goToKasirPage(index) {

    if (index < 0 || index >= kasirPages.length) return;

    kasirCurrentIndex = index;

    const page = kasirPages[index];

    const image        = document.getElementById("kasirImage");
    const browserTitle = document.getElementById("kasirBrowserTitle");
    const tabs         = document.querySelectorAll(".kasir-tab");

    // fade transition
    image.style.opacity = "0";
    setTimeout(() => {
        image.src           = page.image;
        image.alt           = page.title;
        image.style.opacity = "1";
    }, 180);

    browserTitle.textContent = page.title;

    tabs.forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
    });

    // sync mobile dots
    syncKasirDots(index);

    // scroll active tab into view (mobile)
    if (tabs[index]) {
        tabs[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
}

// Called from HTML onclick (tab buttons)
function changeKasirPage(key, title, button) {
    const index = kasirPages.findIndex(p => p.key === key);
    if (index !== -1) goToKasirPage(index);
}


// =========================
// KASIR TOUCH SWIPE (mobile)
// =========================

function syncKasirDots(index) {
    const dots = document.querySelectorAll(".kasir-swipe-dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

document.addEventListener("DOMContentLoaded", () => {

    // Build swipe dots
    const dotsContainer = document.getElementById("kasirDots");
    if (dotsContainer) {
        kasirPages.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.className = "kasir-swipe-dot" + (i === kasirCurrentIndex ? " active" : "");
            dotsContainer.appendChild(dot);
        });
    }

    // Touch swipe on kasir screenshot
    const swipeTarget = document.querySelector(".kasir-screenshot");

    if (!swipeTarget) return;

    let touchStartX = 0;
    let touchStartY = 0;

    swipeTarget.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    swipeTarget.addEventListener("touchend", (e) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;

        // Only react to horizontal swipes (not vertical scrolling)
        if (Math.abs(deltaX) < 40 || Math.abs(deltaY) > Math.abs(deltaX)) return;

        if (deltaX < 0) {
            // swipe kiri → next
            goToKasirPage(kasirCurrentIndex + 1);
        } else {
            // swipe kanan → prev
            goToKasirPage(kasirCurrentIndex - 1);
        }
    }, { passive: true });

});