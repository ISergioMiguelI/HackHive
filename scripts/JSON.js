$(document).ready(function() {
    // JSON fictício de usuários
    var users = [
        { "name": "John Doe", "email": "john@example.com", "phone": "(123) 456-7890", "mobile": "(098) 765-4321", "address": "123 Main St, Anytown, USA" },
        { "name": "Jane Smith", "email": "jane@example.com", "phone": "(111) 222-3333", "mobile": "(444) 555-6666", "address": "456 Elm St, Othertown, USA" }
    ];

    // Função para carregar os usuários na tabela
    function loadUsers() {
        var tableBody = $("#userTable tbody");
        tableBody.empty();
        users.forEach(function(user) {
            var row = "<tr><td>" + user.name + "</td><td>" + user.email + "</td><td>" + user.phone + "</td><td>" + user.mobile + "</td><td>" + user.address + "</td><td><button class='btn btn-info btn-edit' data-email='" + user.email + "'>Edit</button> <button class='btn btn-danger btn-delete' data-email='" + user.email + "'>Delete</button></td></tr>";
            tableBody.append(row);
        });
    }

    // Carregar usuários na inicialização
    loadUsers();

    // Adicionar novo usuário
    $("#addUserModal button.btn-primary").click(function() {
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var mobile = $("#mobile").val();
        var address = $("#address").val();
        if (name && email && phone && mobile && address) {
            users.push({ "name": name, "email": email, "phone": phone, "mobile": mobile, "address": address });
            loadUsers();
            $('#addUserModal').modal('hide');
            // Limpar os campos do formulário
            $("#addUserModal input").val("");
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Editar usuário
    $("#editUserModal button.btn-primary").click(function() {
        var email = $("#editEmail").val();
        var userIndex = users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            var name = $("#editName").val();
            var phone = $("#editPhone").val();
            var mobile = $("#editMobile").val();
            var address = $("#editAddress").val();
            if (name && phone && mobile && address) {
                users[userIndex].name = name;
                users[userIndex].phone = phone;
                users[userIndex].mobile = mobile;
                users[userIndex].address = address;
                loadUsers();
                $('#editUserModal').modal('hide');
                // Limpar os campos do formulário
                $("#editUserModal input").val("");
            } else {
                alert("Please fill in all fields.");
            }
        }
    });

    // Excluir usuário
    $(document).on("click", ".btn-delete", function() {
        var email = $(this).data("email");
        var userIndex = users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            loadUsers();
        }
    });

    // Preencher o formulário de edição ao clicar no botão Editar
    $(document).on("click", ".btn-edit", function() {
        var email = $(this).data("email");
        var user = users.find(user => user.email === email);
        if (user) {
            $("#editEmail").val(user.email);
            $("#editName").val(user.name);
            $("#editPhone").val(user.phone);
            $("#editMobile").val(user.mobile);
            $("#editAddress").val(user.address);
            $('#editUserModal').modal('show');
        }
    });
});
