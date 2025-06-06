

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#main-menu");
    const icon = toggle.querySelector("i");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            const isExpanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!isExpanded));

            menu.classList.toggle("collapsed");
            menu.classList.toggle("expanded");
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");
            toggle.classList.toggle("open");
        });

        // Close when clicking a link //

        const navLinks = menu.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.add("collapsed");
                menu.classList.remove("expanded");
                toggle.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
        });
    });

    // Auto close when clicking outside // 

    document.addEventListener("click", (event) => {

        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnToggle = toggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains("expanded")) {
            menu.classList.add("collapsed");
            menu.classList.remove("expanded");
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        }
    });
    
    }
});