document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        reveals.forEach(el => el.classList.add("reveal-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    reveals.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".services-category");

    categories.forEach(category => {
        const header = category.querySelector(".services-category-header");
        if (!header) return;

        header.addEventListener("click", () => {
            const isOpen = category.classList.contains("is-open");

            // închide toate categoriile
            categories.forEach(c => c.classList.remove("is-open"));

            if (!isOpen) {
                // deschide categoria curentă
                category.classList.add("is-open");

                // dacă ai .reveal înăuntru, fă-le imediat vizibile
                category.querySelectorAll(".reveal").forEach(el => {
                    el.classList.add("reveal-visible");
                });

                // scroll corect după ce layout-ul s-a stabilizat
                requestAnimationFrame(() => {
                    header.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest"
                    });
                });
            }
        });
    });
});

let index = 0;
const track = document.querySelector(".gallery-slide-track");
const slides = document.querySelectorAll(".gallery-slide-track img");

function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector(".gallery-btn.next").addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlider();
});

document.querySelector(".gallery-btn.prev").addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
});