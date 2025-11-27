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
      body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
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
    // 3) MOBILE MENU
    // ================================
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (menuBtn && mobileNav) {
      menuBtn.addEventListener("click", () => {
        mobileNav.classList.add("active");
      });
    }

    if (closeBtn && mobileNav) {
      closeBtn.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    }

    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });
  });
})();

// =====================================================
// PDF DOWNLOAD — Working Perfectly
// =====================================================
// =====================================================
// PDF DOWNLOAD — Robust version (waits for html2pdf, shows loading, error handling)
// =====================================================
(function () {
  const downloadBtn = document.getElementById("downloadCV");
  if (!downloadBtn) return;

  // small spinner element (will be injected)
  function setLoading(state) {
    if (state) {
      downloadBtn.setAttribute("disabled", "true");
      downloadBtn.classList.add("loading");
      if (!downloadBtn.querySelector(".spinner")) {
        const sp = document.createElement("span");
        sp.className = "spinner";
        sp.style.marginLeft = "6px";
        sp.innerHTML = `<svg width="14" height="14" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-width="4" d="M25 5a20 20 0 1 0 20 20" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.9s" repeatCount="indefinite" /></path></svg>`;
        downloadBtn.appendChild(sp);
      }
    } else {
      downloadBtn.removeAttribute("disabled");
      downloadBtn.classList.remove("loading");
      const sp = downloadBtn.querySelector(".spinner");
      if (sp) sp.remove();
    }
  }

  async function waitForHtml2Pdf(timeout = 5000) {
    const start = Date.now();
    while (typeof window.html2pdf === "undefined") {
      if (Date.now() - start > timeout) throw new Error("html2pdf not loaded");
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 100));
    }
    return window.html2pdf;
  }

  downloadBtn.addEventListener("click", async function () {
    try {
      setLoading(true);

      // ensure library is present
      await waitForHtml2Pdf(7000); // 7s timeout

      // the element to capture
      const element = document.querySelector(".portfolio-container") || document.body;

      // small pre-adjustments for print (optional)
      element.classList.add("html2pdf-active");

      const opt = {
        margin: 12, // small margin
        filename: `Dr_Micky_Portfolio_${(new Date()).toISOString().slice(0,10)}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
      };

      // trigger download (returns a Promise)
      await window.html2pdf().from(element).set(opt).save();

      // cleanup
      element.classList.remove("html2pdf-active");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("PDF generation error:", err);
      // user friendly alert
      alert("فشل تنزيل الملف. تحقق من Console للمزيد من التفاصيل (html2pdf).");
    }
  });
})();
