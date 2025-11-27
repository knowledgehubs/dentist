// =====================================================
// MAIN.JS — Dark Mode + Language + Mobile Menu (Fully Working)
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
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");

    function applyTheme(theme) {
      if (theme === "dark") {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
      } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
      }
    }

    applyTheme(savedTheme || "light");

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const isDark = body.classList.contains("dark-mode");
        const newTheme = isDark ? "light" : "dark";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
      });
    }

    // ================================
    // 2) LANGUAGE SWITCHER
    // ================================
    const langToggle = document.getElementById("langToggle");
    const savedLang = localStorage.getItem("lang") || "en";

    function applyLanguage(lang) {
      body.setAttribute("data-lang", lang);
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

      document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
        el.textContent = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      });

      const langText = langToggle.querySelector(".lang-text");
      if (langText) {
        langText.textContent = lang === "ar" ? "EN" : "AR";
      }
    }

    applyLanguage(savedLang);

    if (langToggle) {
      langToggle.addEventListener("click", () => {
        const current = body.getAttribute("data-lang");
        const newLang = current === "en" ? "ar" : "en";
        applyLanguage(newLang);
        localStorage.setItem("lang", newLang);
      });
    }

    // ================================
    // 3) MOBILE MENU (المهم جداً)
    // ================================
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const mobileNav = document.getElementById("mobileNav");

    // افتح القائمة
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener("click", () => {
        mobileNav.classList.add("active");
      });
    }

    // اغلق القائمة
    if (closeBtn && mobileNav) {
      closeBtn.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    }

    // اغلاق عند الضغط على رابط
    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });
  });
})();
// === DOWNLOAD PORTFOLIO AS PDF ===
(function () {
    const downloadBtn = document.getElementById("downloadCV");

    if (!downloadBtn) return;

    downloadBtn.addEventListener("click", function () {

        // العنصر المراد تحويله PDF
        const element = document.querySelector(".portfolio-container") || document.body;

        const opt = {
            margin:       0,
            filename:     'Dr_Micky_Portfolio.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    });
})();
