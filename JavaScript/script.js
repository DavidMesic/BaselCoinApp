//#region Sprachen
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
        downloadLogs: "Logs herunterladen",
        accountLocked: "Konto gesperrt",
        secondsRemaining: "Sekunden verbleibend"
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
        downloadLogs: "Download Logs",
        accountLocked: "Account locked",
        secondsRemaining: "seconds remaining"
    }
};



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
//#endregion





//#region Login & Registrierung
// Login & Registrierung Funktion
function handleAuth() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    const lang = localStorage.getItem("language") || "de";

    // Überprüfen, ob der Benutzer gesperrt ist
    if (timeoutUntil && new Date().getTime() < timeoutUntil) {
        const remainingTime = (timeoutUntil - new Date().getTime()) / 1000; // Verbleibende Zeit in Sekunden
        message.style.color = "red";
        message.innerText = `${translations[lang].accountLocked} (${Math.ceil(remainingTime)} ${translations[lang].secondsRemaining})`;
        return;
    }

    // Wenn Benutzername oder Passwort fehlen
    if (!username || !password) {
        message.innerText = translations[lang].fillFields;
        return;
    }

    const storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        // Erfolgreicher Login
        message.style.color = "green";
        message.innerText = translations[lang].loginSuccess;
        failedAttempts = 0;
        logEvent("LOGIN", username, "Benutzer hat sich eingeloggt");
        setTimeout(() => {
            window.location.href = "Eingeloggt.html";
        }, 500);
    } else {
        // Fehlgeschlagener Login
        failedAttempts++;
        message.style.color = "red";

        // Wenn 3 fehlgeschlagene Versuche erreicht wurden
        if (failedAttempts >= 3) {
            const username = document.getElementById("username").value;
            // Setzt zukünftiges Entsperrungsdatum
            timeoutUntil = new Date().getTime() + loginTimeout;
            timeoutUI = "(" + (loginTimeout / 1000) + " Sekunden Sperre)"
            logEvent("GESPERRT", username, `Benutzer hat zu viele Passwort-Fehlversuche gehabt ${timeoutUI}`)
            message.innerText = `${translations[lang].wrongCredentials} ${translations[lang].accountLocked} ${timeoutUI}`;
        } else {
            message.innerText = translations[lang].wrongCredentials;
        }
    }
}



// Logout Funktion
function logOut() {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
        logEvent("LOGOUT", username, "Benutzer hat sich ausgeloggt");
    }
    
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
//#endregion





//#region Logging
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
//#endregion





//#region Session-Management
// Timer für Session-Management
let inactivityTimer;
const inactivityTimeout = 15000;



function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logOutDueToInactivity, inactivityTimeout);
}



function logOutDueToInactivity() {
    alert("Du bist 30 Sekunden inaktiv. Du wirst jetzt ausgeloggt.");
    window.location.href = "index.html";
}



if (window.location.pathname.includes("Eingeloggt.html")) {
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keydown", resetInactivityTimer);
  
    document.addEventListener("DOMContentLoaded", () => {
        resetInactivityTimer();
    });
}
//#endregion





//#region Injection
let failedAttempts = 0;
let timeoutUntil = null;
let timeoutUI = null;

const loginTimeout = 15000;
//#endregion