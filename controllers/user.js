  // Rota para obter todos os usuários
  exports.getUsers = (req, res) => {
    res.json(users);
  };
  
  // Rota para obter um usuário por ID
  exports.getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };
  
  // Rota para adicionar um novo usuário
  exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  };
  
  // Rota para atualizar os dados de um usuário existente
  exports.updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], name, email };
      res.json(users[userIndex]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };
  
  // Rota para deletar um usuário
  exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };
  