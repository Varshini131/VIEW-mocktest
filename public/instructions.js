// Instructions Page JS

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            // Redirect to exam page
            window.location.href = "exam.html";
        });
    }
});