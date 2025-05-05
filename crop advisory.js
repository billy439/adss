const optionMenu = document.querySelector(".select-menu"),
      selectBtn = optionMenu.querySelector(".select-btn"),
      sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () => {
    optionMenu.classList.toggle("active");
});

// Handle click on anchor links inside options
const optionLinks = optionMenu.querySelectorAll(".option a");

optionLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const selectedText = link.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedText;
        optionMenu.classList.remove("active");
        // allow navigation to the href normally
    });
});
