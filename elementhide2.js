document.addEventListener("DOMContentLoaded", function () {
    console.log("Running!");

    localStorage.setItem("removeElementsOnNextVisit", "true");

    function removeElements() {
        console.log("deleting...");

        const selectors = [
            "div.page > div:nth-child(2) > div:nth-child(1)",
            "body > div:nth-child(7) > div.left-col > div.content-shadow > div.page.inner-block > div:nth-child(2)",
            "body > div:nth-child(7) > div.left-col > div.content-shadow > div.page.inner-block > div.adm-item.adm-level-1"
        ];

        let found = false;
        document.querySelectorAll(selectors.join(", ")).forEach(el => {
            console.log("deleted:", el);
            el.remove();
            found = true;
        });

        if (!found) {
            console.log("Not Found...");
        }
    }

    let lastUrl = window.location.pathname;
    setInterval(() => {
        if (window.location.pathname !== lastUrl) {
            console.log("Found new URL:", window.location.pathname);
            lastUrl = window.location.pathname;

            if (window.location.pathname === "/o-shkole/struktura" && localStorage.getItem("removeElementsOnNextVisit") === "true") {
                console.log("at the target = deleting...");
                removeElements();
            }
        }
    }, 500);

    const observer = new MutationObserver(() => {
        if (window.location.pathname === "/o-shkole/struktura") {
            console.log("DOM changed...");
            removeElements();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});