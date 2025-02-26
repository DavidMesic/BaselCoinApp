//#region Sprachen
//#region Wörterliste
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
    },
    fr: {
        loginTitle: "Connexion",
        registerTitle: "Inscription",
        usernamePlaceholder: "Nom d'utilisateur",
        emailPlaceholder: "E-mail",
        passwordPlaceholder: "Mot de passe",
        confirmPasswordPlaceholder: "Confirmer le mot de passe",
        loginButton: "Connexion",
        registerButton: "S'inscrire",
        registerText: "Pas encore de compte?",
        registerLink: "S'inscrire",
        registerRedirect: "Inscription.html",
        loginRedirect: "index.html",
        alreadyHaveAccount: "Déjà un compte?",
        loginLink: "Se connecter",
        fillFields: "Veuillez remplir tous les champs!",
        passwordsDontMatch: "Les mots de passe ne correspondent pas!",
        userExists: "L'utilisateur existe déjà!",
        registrationSuccess: "Inscription réussie! Connectez-vous maintenant.",
        loginSuccess: "Connexion réussie!",
        wrongCredentials: "Nom d'utilisateur ou mot de passe incorrect!",
        captchaError: "Veuillez confirmer que vous n'êtes pas un robot!",
        showLogs: "Afficher les journaux",
        downloadLogs: "Télécharger les journaux",
        accountLocked: "Compte verrouillé",
        secondsRemaining: "secondes restantes"
    },
    it: {
        loginTitle: "Accesso",
        registerTitle: "Registrazione",
        usernamePlaceholder: "Nome utente",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        confirmPasswordPlaceholder: "Conferma Password",
        loginButton: "Accedi",
        registerButton: "Registrati",
        registerText: "Non hai ancora un account?",
        registerLink: "Registrati",
        registerRedirect: "Registrazione.html",
        loginRedirect: "index.html",
        alreadyHaveAccount: "Hai già un account?",
        loginLink: "Accedi",
        fillFields: "Si prega di compilare tutti i campi!",
        passwordsDontMatch: "Le password non corrispondono!",
        userExists: "L'utente esiste già!",
        registrationSuccess: "Registrazione avvenuta con successo! Ora accedi.",
        loginSuccess: "Accesso riuscito!",
        wrongCredentials: "Nome utente o password errati!",
        captchaError: "Si prega di confermare che non sei un robot!",
        showLogs: "Mostra registri",
        downloadLogs: "Scarica registri",
        accountLocked: "Account bloccato",
        secondsRemaining: "secondi rimanenti"
    }
};
//#endregion



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

    const downloadLogsButton = document.querySelector("button[onclick='downloadLogs()']");
    if (downloadLogsButton) {
        downloadLogsButton.innerText = translations[lang].downloadLogs;
    }
}
//#endregion



//#region Login & Registrierung
// Login & Registrierung Funktion
function handleAuth(isRegistering = false) {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password") ? document.getElementById("confirm-password").value : null;
    const email = document.getElementById("email") ? document.getElementById("email").value.trim() : null;
    const message = document.getElementById("message");
    const lang = localStorage.getItem("language") || "de";
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    // mindestens 15 Zeichen, ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$/;
 
    const minUsernameLength = 5;
 
    // Prüfen, ob der Benutzer ausgesperrt ist
    if (timeoutUntil && new Date().getTime() < timeoutUntil) {
        const remainingTime = (timeoutUntil - new Date().getTime()) / 1000;
        message.style.color = "red";
        message.innerText = `${translations[lang].accountLocked} (${Math.ceil(remainingTime)} ${translations[lang].secondsRemaining})`;
        return;
    }
 
    // Überprüfung der leeren Felder
    if (!username || !password || (isRegistering && (!email || !confirmPassword))) {
        message.innerText = translations[lang].fillFields;
        return;
    }
 
    // Überprüfung des Benutzernamens
    if (username.length < minUsernameLength) {
        message.innerText = `Der Nutzername muss mindestens ${minUsernameLength} Zeichen.`;
        return;
    }
 
    // E-Mail-Validierung
    if (isRegistering && !emailRegex.test(email)) {
        message.innerText = "Bitte geben Sie eine gültige E-Mail Adresse ein.";
        return;
    }
 
    // Passwortüberprüfung
    if (!passwordRegex.test(password)) {
        message.innerText = "Das Passwort muss mindestens 15 Zeichen lang sein, darunter ein Grossbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen.";
        return;
    }
 
    if (isRegistering) {
 
        if (password !== confirmPassword) {
            message.innerText = translations[lang].passwordsDontMatch;
            return;
        }
 
        // Prüfen, ob der Benutzer bereits existiert
        if (localStorage.getItem(username)) {
            message.innerText = translations[lang].userExists;
            return;
        }
 
   
        localStorage.setItem(username, password);
        message.style.color = "green";
        message.innerText = translations[lang].registrationSuccess;
        logEvent("REGISTER", username, "Benutzer hat sich registriert");
    } else {
        const storedPassword = localStorage.getItem(username);
 
        if (storedPassword && storedPassword === password) {
            message.style.color = "green";
            message.innerText = translations[lang].loginSuccess;
            failedAttempts = 0;
            localStorage.setItem("loggedInUser", username);
            logEvent("LOGIN", username, "Benutzer hat sich eingeloggt");
 
            setTimeout(() => {
                window.location.href = "Eingeloggt.html";
            }, 500);
        } else {
            failedAttempts++;
            message.style.color = "red";
 
            if (failedAttempts >= 3) {
                timeoutUntil = new Date().getTime() + loginTimeout;
                timeoutUI = `${loginTimeout / 1000} ${translations[lang].secondsRemaining}`;
                logEvent("GESPERRT", username, `Benutzer hat zu viele Passwort-Fehlversuche gehabt (${timeoutUI})`);
                message.innerText = `${translations[lang].wrongCredentials} ${translations[lang].accountLocked} ${timeoutUI}`;
            } else {
                message.innerText = translations[lang].wrongCredentials;
            }
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