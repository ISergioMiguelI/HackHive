 //corrigir o codigo de registar
        
 document.getElementById('registerForm').addEventListener('submit', function(event) {
    // Previne o comportamento padrão de submissão do formulário
    event.preventDefault();

    // Obtém os valores dos campos de nome, e-mail e senha do formulário
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;

    // Verifica se todos os campos estão preenchidos
    if (name && email && password) {
        // Simulação de um registro bem-sucedido (substitua esta linha pelo código de registro real)
        alert('Registration successful!');

        // Redireciona para a página de login após o registro bem-sucedido
        window.location.href = "index_login.html";
    } else {
        alert('Please fill in all fields.');
    }
});
