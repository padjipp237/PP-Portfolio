```javascript
/* =========================================================
   P.P. PORTFOLIO
   Interaction Layer
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       Scroll Reveal
       ----------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".section, .feature-section, .project-card, .timeline-item, .k9-grid > div"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* -----------------------------------------------------
       Navigation Background
       ----------------------------------------------------- */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* -----------------------------------------------------
       Current Section Detection
       ----------------------------------------------------- */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".navbar nav a");


    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                navigationLinks.forEach((link) => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    ) {

                        link.classList.add("active");

                    }

                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });


    /* -----------------------------------------------------
       Footer Year
       ----------------------------------------------------- */

    const footerYear = document.querySelector(
        "footer span:first-child"
    );

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} P.P.`;

    }

});
```

