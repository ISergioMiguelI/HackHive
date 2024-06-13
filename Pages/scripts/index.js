const readToken = async () => {
    var dados = {
        token: localStorage.getItem("token"),
    };

    const response = await fetch("http://localhost:3000/Api/Pgs/Auth/readToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    const result = await response.json();

    if (!response.ok) {
        alert("Erro ao fazer login");
        return null; // Return null if the request failed
    } else {
        return result; // Return the decoded token data
    }
};

const redirectBasedOnRole = (userData) => {
    const role = userData.isAdmin ? 'admin' : 'user';

    // Check the user's role and create the button accordingly
    if (role === "admin") {
        var ProfileButton = document.getElementById('ProfileButton');
        ProfileButton.innerHTML = ` 
        <a href="ProfileAdmin.html" class="navbar-brand">Admin Profile</a>
        `;
    } else {
        var ProfileButton = document.getElementById('ProfileButton');
        ProfileButton.innerHTML = ` 
        <a href="Management_Profile.html" class="navbar-brand">Profile</a>
        `;
    }
};

document.addEventListener('DOMContentLoaded', async function() {   
    const token = localStorage.getItem('token');
    if (token) {
        // Redirect to the index page if the current page is the login or registration page
        if (window.location.pathname.includes('/Login.html') || window.location.pathname.includes('/Login.html') || window.location.pathname.includes('/Forgotyourpassword.html')) {
            window.location.href = 'Index.html';
            return;
        }

        try {
            const userData = await readToken();
            if (userData) {
                // Call the function to create the management profile button
                redirectBasedOnRole(userData);
            } else {
                console.error("Failed to load user data.");
            }
        } catch (error) {
            console.error("Error in loadUserProfile:", error);
        }
    } else {
        console.error('No user logged in.');
        // Redirect to the login page if the current page is not the login, registration, or forgot password page
        if (!window.location.pathname.includes('/Login.html') && !window.location.pathname.includes('/Login.html') && !window.location.pathname.includes('/Forgotyourpassword.html')) {
            window.location.href = 'Login.html';
        }
    }
});