// =====================================================
// MAIN.JS — Dark Mode + Language Switcher (Fully Working)
// =====================================================

(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    const body = document.body;

    // ================================
    // 1) DARK MODE
    // ================================
    let themeToggle = document.getElementById("themeToggle") || document.querySelector(".theme-toggle");
    const savedTheme = localStorage.getItem("theme");

    function applyTheme(theme) {
      if (theme === "dark") {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
      } else if (theme === "light") {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        body.classList.toggle("dark-mode", prefersDark);
        body.classList.toggle("light-mode", !prefersDark);
      }
      updateToggleUI();
    }

    function updateToggleUI() {
      if (!themeToggle) return;
      const icon = themeToggle.querySelector("i");
      const isDark = body.classList.contains("dark-mode");

      if (icon) {
        icon.classList.remove("fa-moon", "fa-sun");
        icon.classList.add(isDark ? "fa-sun" : "fa-moon");
      }
      themeToggle.setAttribute("aria-pressed", isDark);
      themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    }

    applyTheme(savedTheme || null);

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const isDark = body.classList.contains("dark-mode");
        applyTheme(isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      });
    }

    // ================================
    // 2) LANGUAGE SWITCHER
    // ================================
    const langToggle = document.getElementById("langToggle");
    const savedLang = localStorage.getItem("lang") || "en";

    // apply initial language
    applyLanguage(savedLang);

    if (langToggle) {
      langToggle.addEventListener("click", () => {
        const newLang = body.getAttribute("data-lang") === "en" ? "ar" : "en";
        applyLanguage(newLang);
        localStorage.setItem("lang", newLang);
      });
    }

    // Function to apply EN or AR
    function applyLanguage(lang) {
      body.setAttribute("data-lang", lang);

      // Change direction for Arabic
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

      // Update all text elements with data-en / data-ar
      document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
        el.textContent = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      });

      // Update the language button text (AR ↔ EN)
      const langText = langToggle.querySelector(".lang-text");
      if (langText) {
        langText.textContent = lang === "ar" ? "EN" : "AR";
      }
    }
  });
})();
