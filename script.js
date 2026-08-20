// script.js
const SUPABASE_URL = "https://imeamrrcrerolzwfwxec.supabase.co";
const SUPABASE_KEY = "sb_publishable_mO7pFU7YMEaxDPrP7eW8og_tBUBS1t6";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
// SIGN UP
async function signUp() {

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    const message = document.getElementById("auth-message");

    if (!name || !email || !password) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "#e45757";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "#e45757";
        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                name: name
            }
        }
    });

    if (error) {
        message.textContent = error.message;
        message.style.color = "#e45757";
        return;
    }

    message.textContent =
        "Account created! Check your email to verify it.";
    message.style.color = "#08794a";
}
async function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const message = document.getElementById("auth-message");

    if (!email || !password) {
        message.textContent = "Please enter your email and password.";
        message.style.color = "#e45757";
        return;
    }

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        message.textContent = error.message;
        message.style.color = "#e45757";
        return;
    }

    // Login successful
    message.textContent = "Login successful! 🌱";
    message.style.color = "#08794a";

    // Open EcoNexus dashboard
    setTimeout(() => {
        document.getElementById("auth-screen").style.display = "none";

        // Show dashboard
        const dashboard = document.getElementById("dashboard");
        if (dashboard) {
            dashboard.classList.add("active-page");
        }
    }, 500);
}
// SWITCH TO SIG, UP
function showSignup() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("auth-message").textContent = "";
}


// SWITCH TO LOGIN
function showLogin() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("auth-message").textContent = "";
}


// LOGOUT
async function logout() {

    await supabaseClient.auth.signOut();

    document.getElementById("auth-screen").style.display = "flex";
}
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
       ],
        
        ecopoints: [
    "Eco-Points Economy",
    "Class Gamification system powered by EcoNexus AI"
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
// Check if user is already logged in
async function checkUser() {

    const { data } = await supabaseClient.auth.getSession();

    if (data.session) {

        const user = data.session.user;

        // Email must be verified
        if (user.email_confirmed_at) {

            document.getElementById("auth-screen").style.display = "none";

            const dashboard =
                document.getElementById("dashboard");

            if (dashboard) {
                dashboard.classList.add("active-page");
            }
        }
    }
}


// Detect login/logout automatically
supabaseClient.auth.onAuthStateChange((event, session) => {

    if (event === "SIGNED_IN" && session) {

        document.getElementById("auth-screen").style.display = "none";

        const dashboard =
            document.getElementById("dashboard");

        if (dashboard) {
            dashboard.classList.add("active-page");
        }
    }

    if (event === "SIGNED_OUT") {

        document.getElementById("auth-screen").style.display = "flex";
    }

});


// Run when website opens
document.addEventListener("DOMContentLoaded", () => {
    checkUser();
});