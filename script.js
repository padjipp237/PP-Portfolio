/* =========================================================
   P.P. PORTFOLIO
   Interaction Layer
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       Elements
       ----------------------------------------------------- */

    const navbar = document.querySelector(".navbar");
    const navigationLinks = document.querySelectorAll(".navbar nav a");
    const sections = document.querySelectorAll("section[id]");


    /* -----------------------------------------------------
       Scroll Reveal
       ----------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".section, .feature-section, .project-card, .timeline-item, .k9-grid > div"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("revealed");
                    revealObserver.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element, index) => {

            element.classList.add("reveal");

            /*
               Slight stagger for groups of cards.
               CSS controls the actual animation.
            */
            if (
                element.classList.contains("project-card") ||
                element.classList.contains("timeline-item") ||
                element.parentElement?.classList.contains("k9-grid")
            ) {
                element.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
            }

            revealObserver.observe(element);

        });

    } else {

        /*
           Older browsers: show everything normally.
        */
        revealElements.forEach((element) => {
            element.classList.add("revealed");
        });

    }


    /* -----------------------------------------------------
       Navigation Background
       ----------------------------------------------------- */

    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    /* -----------------------------------------------------
       Smooth Navigation
       ----------------------------------------------------- */

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            /*
               Update the URL without jumping.
            */
            history.pushState(null, "", targetId);

        });

    });


    /* -----------------------------------------------------
       Current Section Detection
       ----------------------------------------------------- */

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                const visibleSections = [...entries]
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio
                    );

                if (!visibleSections.length) {
                    return;
                }

                const activeSection = visibleSections[0].target.id;

                navigationLinks.forEach((link) => {

                    const linkTarget = link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        linkTarget === `#${activeSection}`
                    );

                });

            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: [0.1, 0.25, 0.5]
            }
        );


        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


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
