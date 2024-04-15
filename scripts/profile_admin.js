fetch('https://your-api-url.com/users') // substitua por sua URL da API
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
        data.forEach(user => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.ip}</td>
                <td>${user.password}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editUserModal" data-user-id="${user.id}">
                        Edit
                    </button>
                    <button type="button" class="btn btn-danger" data-user-id="${user.id}">
                        Remove
                    </button>
                </td>
            `;
        });
    })
    .catch(error => console.error('Error:', error));