// Übersetzungen für Mehrsprachigkeit
const translations = {
    de: {
        loginTitle: "Login",
        registerTitle: "Registrierung",
        usernamePlaceholder: "Benutzername",
        emailPlaceholder: "E-Mail",
        passwordPlaceholder: "Passwort",
        confirmPasswordPlaceholder: "Passwort bestätigen",
        loginButton: "Login",
        registerButton: "Registrieren",
        registerText: "Noch kein Konto?",
        registerLink: "Registrieren",
        registerRedirect: "Registrieren.html",
        loginRedirect: "index.html",
        alreadyHaveAccount: "Schon ein Konto?",
        loginLink: "Einloggen",
        fillFields: "Bitte alle Felder ausfüllen!",
        passwordsDontMatch: "Passwörter stimmen nicht überein!",
        userExists: "Benutzer existiert bereits!",
        registrationSuccess: "Registrierung erfolgreich! Jetzt einloggen.",
        loginSuccess: "Login erfolgreich!",
        wrongCredentials: "Falscher Benutzername oder Passwort!",
        captchaError: "Bitte bestätigen Sie, dass Sie kein Roboter sind!",
        showLogs: "Logs anzeigen",
        downloadLogs: "Logs herunterladen"
    },
    en: {
        loginTitle: "Login",
        registerTitle: "Register",
        usernamePlaceholder: "Username",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        confirmPasswordPlaceholder: "Confirm Password",
        loginButton: "Login",
        registerButton: "Register",
        registerText: "No account yet?",
        registerLink: "Register",
        registerRedirect: "Register.html",
        loginRedirect: "index.html",
        alreadyHaveAccount: "Already have an account?",
        loginLink: "Login",
        fillFields: "Please fill in all fields!",
        passwordsDontMatch: "Passwords do not match!",
        userExists: "User already exists!",
        registrationSuccess: "Registration successful! Now log in.",
        loginSuccess: "Login successful!",
        wrongCredentials: "Incorrect username or password!",
        captchaError: "Please confirm that you are not a robot!",
        showLogs: "Show Logs",
        downloadLogs: "Download Logs"
    }
};
 
// Logging-Funktion
function logEvent(eventType, user, action) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} | ${eventType} | ${user} | ${action}`;
 
    // Logs aus LocalStorage abrufen
    let logs = JSON.parse(localStorage.getItem("app_logs")) || [];
    logs.push(logEntry);
 
    // Logs wieder speichern
    localStorage.setItem("app_logs", JSON.stringify(logs));
 
    console.log("Log gespeichert:", logEntry);
}
 
// Funktion zur Sprachänderung
function changeLanguage(lang) {
    console.log("Sprachänderung ausgelöst:", lang);
    localStorage.setItem("language", lang);
 
    if (!translations[lang]) {
        console.error("Fehler: Sprache nicht gefunden!", lang);
        return;
    }
 
    document.getElementById("form-title").innerText = translations[lang][document.title === "Registrierung" ? "registerTitle" : "loginTitle"];
    document.getElementById("username").placeholder = translations[lang].usernamePlaceholder;
 
    if (document.getElementById("email")) {
        document.getElementById("email").placeholder = translations[lang].emailPlaceholder;
    }
    if (document.getElementById("password")) {
        document.getElementById("password").placeholder = translations[lang].passwordPlaceholder;
    }
    if (document.getElementById("confirm-password")) {
        document.getElementById("confirm-password").placeholder = translations[lang].confirmPasswordPlaceholder;
    }
 
    document.querySelector("button").innerText = translations[lang][document.title === "Registrierung" ? "registerButton" : "loginButton"];
    document.getElementById("toggle-text").innerHTML = document.title === "Registrierung"
        ? `${translations[lang].alreadyHaveAccount} <a href="${translations[lang].loginRedirect}" id="login-link">${translations[lang].loginLink}</a>`
        : `${translations[lang].registerText} <a href="${translations[lang].registerRedirect}" id="register-link">${translations[lang].registerLink}</a>`;
}
 
document.addEventListener("DOMContentLoaded", () => {
    let savedLang = localStorage.getItem("language") || "de";
    console.log("Gespeicherte Sprache:", savedLang);
    document.getElementById("language").value = savedLang;
    changeLanguage(savedLang);
});
 
// Login & Registrierung Funktion
function handleAuth() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email") ? document.getElementById("email").value : null;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password") ? document.getElementById("confirm-password").value : null;
    const message = document.getElementById("message");
    const captchaResponse = grecaptcha.getResponse();
    const lang = localStorage.getItem("language") || "de";
 
    if (!username || !password || (email !== null && !email)) {
        message.innerText = translations[lang].fillFields;
        return;
    }
 
    if (!captchaResponse) {
        message.innerText = translations[lang].captchaError;
        return;
    }
 
    if (document.title === "Registrierung") {
        if (!confirmPassword) {
            message.innerText = translations[lang].fillFields;
            return;
        }
        if (password !== confirmPassword) {
            message.style.color = "red";
            message.innerText = translations[lang].passwordsDontMatch;
            return;
        }
        if (localStorage.getItem(username)) {
            message.style.color = "red";
            message.innerText = translations[lang].userExists;
        } else {
            localStorage.setItem(username, password);
            message.style.color = "green";
            message.innerText = translations[lang].registrationSuccess;
            logEvent("REGISTER", username, "Benutzer registriert");
            setTimeout(() => {
                window.location.href = translations[lang].loginRedirect;
            }, 1000);
        }
    } else {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            message.style.color = "green";
            message.innerText = translations[lang].loginSuccess;
            logEvent("LOGIN", username, "Benutzer hat sich eingeloggt");
            setTimeout(() => {
                alert("Glückwunsch! Du bist eingeloggt.");
            }, 500);
        } else {
            message.style.color = "red";
            message.innerText = translations[lang].wrongCredentials;
        }
    }
}
 
// Logs als Datei herunterladen
function downloadLogs() {
    let logs = JSON.parse(localStorage.getItem("app_logs")) || [];
    let logText = logs.join("\n");
    let blob = new Blob([logText], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "logs.txt";
    link.click();
}