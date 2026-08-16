// script.js

function showPage(pageId, clickedButton = null) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active-page");
    }

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    updateHeader(pageId);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function updateHeader(page) {

    const title = document.getElementById("pageTitle");
    const subtitle = document.getElementById("pageSubtitle");

    const titles = {

        dashboard: [
            "Sustainability Dashboard",
            "Real-time environmental intelligence for your school"
        ],

        water: [
            "Water Intelligence",
            "Monitor water usage and detect unusual patterns"
        ],

        energy: [
            "Energy Intelligence",
            "Monitor and optimize school energy consumption"
        ],

        waste: [
            "Waste Intelligence",
            "AI-powered waste monitoring and management"
        ],

        analytics: [
            "AI Analytics",
            "Intelligent analysis of sustainability patterns"
        ],

        predictions: [
            "AI Predictions",
            "Predicted sustainability events"
        ],

        settings: [
            "Settings",
            "Configure EcoNexus AI"
        ]

    };

    if (titles[page]) {
        title.textContent = titles[page][0];
        subtitle.textContent = titles[page][1];
    }
}


function updateSimulator() {

    const water =
        Number(document.getElementById("waterSlider").value);

    const energy =
        Number(document.getElementById("energySlider").value);

    const waste =
        Number(document.getElementById("wasteSlider").value);

    document.getElementById("waterValue").textContent =
        water + "%";

    document.getElementById("energyValue").textContent =
        energy + "%";

    document.getElementById("wasteValue").textContent =
        waste + "%";

    let score =
        84 +
        water * 0.15 +
        energy * 0.10 +
        waste * 0.12;

    score = Math.min(score,100);

    document.getElementById("predictedScore").textContent =
        Math.round(score);
}


function showNotifications() {

    showToast(
        "🔔 2 sustainability alerts need attention."
    );
}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    },3000);
}


function scanWaste() {

    const input =
        document.getElementById("wasteImage");

    const result =
        document.getElementById("scanResult");

    if (!input.files.length) {
        return;
    }

    const file = input.files[0];

    result.innerHTML = `
        <div style="
            margin-top:20px;
            padding:15px;
            background:#eaf7ef;
            border-radius:10px;
        ">
            🤖 <strong>AI analyzing...</strong>
        </div>
    `;

    setTimeout(() => {

        const name =
            file.name.toLowerCase();

        let category = "♻️ Recyclable";

        if (
            name.includes("banana") ||
            name.includes("food") ||
            name.includes("apple")
        ) {
            category = "🟢 Organic";
        }

        else if (
            name.includes("paper") ||
            name.includes("bottle") ||
            name.includes("plastic")
        ) {
            category = "🔵 Recyclable";
        }

        else {
            category = "⚫ Other";
        }

        result.innerHTML = `
            <div style="
                margin-top:20px;
                padding:18px;
                background:#eaf7ef;
                border-radius:10px;
                color:#08794a;
            ">
                <strong>🤖 AI Result</strong>
                <h3 style="margin:8px 0;">
                    ${category}
                </h3>
                <p>Prototype classification complete.</p>
            </div>
        `;

    },1200);
}


document.addEventListener(
    "DOMContentLoaded",
    function() {
        updateSimulator();
    }
);