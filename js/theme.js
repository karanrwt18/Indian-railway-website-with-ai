/* =========================================
   RAILSETU - Dark Mode Toggle
   ========================================= */

(function initTheme() {
    // Page load pe saved theme apply karo
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
    // Button ka icon update karo (jab DOM ready ho)
    document.addEventListener("DOMContentLoaded", updateThemeIcon);
})();

function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    
    updateThemeIcon();
    
    // Toast message
    if (typeof toast === "function") {
        toast(isDark ? "🌙 Dark mode ON" : "☀️ Light mode ON");
    }
}

function updateThemeIcon() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const isDark = document.body.classList.contains("dark-mode");
    btn.textContent = isDark ? "☀️" : "🌙";
    btn.title = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
}