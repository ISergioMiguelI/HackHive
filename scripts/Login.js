document.getElementById('registerForm').addEventListener('submit', function(event) {
    // Previne o comportamento padrão de submissão do formulário
    event.preventDefault();

    // Obtém os valores dos campos de nome, e-mail e senha do formulário
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;

    // Verifica se todos os campos estão preenchidos
    if (name && email && password) {
        alert('Registration successful!');
        window.location.href = "index_login.html";
    } else {
        alert('Please fill in all fields.');
    }
});


document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the email and password values from the form
    var email = document.getElementById('logemail').value;
    var password = document.getElementById('logpass').value;

    // Check if both email and password fields are filled
    if (email && password) {
        // Check if the entered email and password match the required values
        if (email === "batata@gmail.com" && password === 'batata') {
            alert('Login successful!');
            window.location.href = "index_login.html";
            
            
        } else {
            alert('Incorrect password or Email!');
        }
    } else {
        alert('Please fill in both email and password fields.');
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the email and password values from the form
    var email = document.getElementById('logemail').value;
    var password = document.getElementById('logpass').value;

    // Check if both email and password fields are filled
    if (email && password) {
        // Check if the entered email and password match the required values
        if (email === "admin" && password === 'admin') {
            alert('Login successful!');
            window.location.href = "profile_admin.html";
            
            
        } else {
            alert('Incorrect password or Email!');
        }
    } else {
        alert('Please fill in both email and password fields.');
    }
});
