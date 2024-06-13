function redirectToIndex() {
    window.location.href = "index.html"; 
}

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = "Login.html"; 
}

// Function to redirect to the register page
function redirectToRegister() {
    window.location.href = "Login.html"; 
}


function validatePassword(password) {
    var passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return passwordCheck.test(password);
}

async function loginUser() {
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;

// Check if fields are filled
if (email.trim() === '' || password.trim() === '') {
alert("Please fill in all fields.");
return;
}

// Prepare user data to send to the server
var user = {
email: email,
password: password
};

try {
const response = await fetch('http://localhost:3000/Api/Pgs/Auth/signin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
});

const responseData = await response.json();

if (response.ok) {
    alert("Login successful!");

    // Store the token in local storage
    localStorage.setItem('token', responseData.token);

    // Redirect based on user role
    if (responseData.role === 'admin') {
        window.location.href = 'profileAdmin.html';
    } else if (responseData.role === 'user') {
        window.location.href = 'index.html';
    } else {
        alert("Unknown role for this user.");
    }
} else {
    alert(responseData.msg || "Invalid credentials. Please try again.");
}
} catch (error) {
console.error(error);
alert("An error occurred while logging in. Please try again later.");
}
}

async function validateRegister(event) {
    event.preventDefault();
    var name = document.getElementById("regUsername").value;
    var email = document.getElementById("regEmail").value;
    var password1 = document.getElementById("regPassword").value;
    var password2 = document.getElementById("regConfirmPassword").value;

    if (!validatePassword(password1)) {
        alert("Invalid password. Password must be 8-15 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.");
        return false;
    }
    if (password1 !== password2) {
        alert("Passwords do not match.");
        return false;
    }

    var dados = {
        email: email,
        name: name,
        password: password1,
        isAdmin: false
    };

    try {
        const response = await fetch("http://localhost:3000/api/pgs/Auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error("Error registering user");
        }

        const data = await response.json();
        alert(name + " has been successfully registered!");
    } catch (error) {
        alert("Registration failed: " + error.message);
    }
}

function forgotPassword() {
    // Get email from the input field
    var email = document.getElementById("email").value;

    // Check if the email field is empty
    if (email.trim() === '') {
        alert("Por favor, insira seu email.");
        return;
    }
    alert("Um email de recuperação de senha foi enviado para " + email);
}