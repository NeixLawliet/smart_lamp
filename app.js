// ==============================================
// SET IP ESP32
// ==============================================
const ESP = "http://192.168.4.1";  // AP mode default

// ==============================================
// POWER BUTTON
// ==============================================
document.querySelector("button.group").addEventListener("click", () => {
    fetch(`${ESP}/power?state=toggle`);
});

// ==============================================
// BRIGHTNESS SLIDER
// ==============================================
const brightnessSlider = document.querySelector("input[type=range]");

brightnessSlider.addEventListener("input", () => {
    fetch(`${ESP}/brightness?value=${brightnessSlider.value}`);
});

// ==============================================
// COLOR PICKER
// ==============================================
document.querySelectorAll("input[name=color]").forEach((circle) => {
    circle.addEventListener("change", () => {
        const div = circle.parentNode.children[1];
        const color = getComputedStyle(div).backgroundColor;

        // Fake hue: random 0-255 (karena rgb → hue rumit)
        let hueValue = Math.floor(Math.random() * 255);

        fetch(`${ESP}/set_hue?hue=${hueValue}`);
    });
});

// ==============================================
// PRESET BUTTONS
// ==============================================
document.querySelectorAll("button.group").forEach(btn => {
    btn.addEventListener("click", () => {
        let label = btn.innerText.trim().toLowerCase();

        if (["reading", "sleep", "focus", "party"].includes(label)) {
            fetch(`${ESP}/preset?mode=${label}`);
        }
    });
});
