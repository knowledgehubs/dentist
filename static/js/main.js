// ===============================
// DARK MODE TOGGLE
// ===============================

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark-mode");
} else {
    body.classList.remove("dark-mode");
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

