document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter dados de login do formulário
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Simular autenticação verificando no JSON
    var users = getUsers();
    var authenticatedUser = users.find(function(user) {
        return user.username === username && user.password === password;
    });

    if (authenticatedUser) {
        // Redirecionar para a página de administração
        if (authenticatedUser.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            alert('Login bem-sucedido como usuário regular.');
        }
    } else {
        alert('Username ou password incorretos. Por favor, tente novamente.');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter dados de registro do formulário
    var username = document.getElementById('regUsername').value;
    var password = document.getElementById('regPassword').value;

    // Verificar se o usuário já existe
    var users = getUsers();
    var existingUser = users.find(function(user) {
        return user.username === username;
    });

    if (existingUser) {
        alert('Username já está em uso. Por favor, escolha outro.');
    } else {
        // Adicionar novo usuário ao JSON
        var newUser = {
            id: users.length + 1, // Gera um novo ID incremental
            username: username,
            password: password,
            role: 'user' // Novos usuários são registrados como 'user'
        };
        users.push(newUser);
        saveUsers(users);
        alert('Registro bem-sucedido. Você pode fazer login agora.');
    }
});

function getUsers() {
    // Aqui você faria uma requisição AJAX para carregar os usuários do JSON
    // Neste exemplo simples, apenas retornamos os usuários definidos no JSON
    return [
        {
            "id": 1,
            "username": "admin",
            "password": "admin123",
            "role": "admin"
        }
    ];
}

function saveUsers(users) {
    // Aqui você faria uma requisição AJAX para salvar os usuários no JSON
    // Neste exemplo simples, apenas exibimos os usuários no console
    console.log(users);
}