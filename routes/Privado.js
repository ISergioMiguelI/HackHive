const privateRouter = require('express').Router();

// Route for the profile administration page
privateRouter.get('/ProfileAdmin', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'profile_admin.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

module.exports = privateRouter;