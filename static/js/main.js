// main.js
// Robust Dark Mode toggle with fallbacks, accessibility, and system preference support

(function () {
  // Wait for DOM ready to avoid null elements
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    const body = document.body;
    // try id first, then class fallback
    let themeToggle = document.getElementById("themeToggle") || document.querySelector(".theme-toggle");

    // If there's no toggle in DOM, exit gracefully but still apply saved theme
    const savedTheme = localStorage.getItem("theme");

    // Apply saved theme or system preference
    function applyTheme(theme) {
      if (theme === "dark") {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
      } else if (theme === "light") {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
      } else {
        // theme === null => follow system preference
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
          body.classList.add("dark-mode");
          body.classList.remove("light-mode");
        } else {
          body.classList.remove("dark-mode");
          body.classList.add("light-mode");
        }
      }
      updateToggleUI();
    }

    function updateToggleUI() {
      // Update icon / aria-pressed if toggle exists
      if (!themeToggle) return;
      const icon = themeToggle.querySelector("i");
      const isDark = body.classList.contains("dark-mode");

      // update icon classes (fontawesome)
      if (icon) {
        icon.classList.remove("fa-moon", "fa-sun");
        icon.classList.add(isDark ? "fa-sun" : "fa-moon");
      }

      // aria
      themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      // optional: update title
      themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    }

    // initial apply
    if (savedTheme === "dark" || savedTheme === "light") {
      applyTheme(savedTheme);
    } else {
      applyTheme(null); // follow system
    }

    // If toggle absent, nothing else to do
    if (!themeToggle) {
      // debug: expose for console checks
      window.__themeToggleMissing = true;
      return;
    }

    // Click handler
    themeToggle.addEventListener("click", function (e) {
      const isDark = body.classList.contains("dark-mode");
      if (isDark) {
        applyTheme("light");
        localStorage.setItem("theme", "light");
      } else {
        applyTheme("dark");
        localStorage.setItem("theme", "dark");
      }
    });

    // also respond to system preference changes (optional)
    if (window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener && mq.addEventListener("change", (e) => {
        const saved = localStorage.getItem("theme");
        if (!saved) {
          applyTheme(null);
        }
      });
    }
  });
})();
