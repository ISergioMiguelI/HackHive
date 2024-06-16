const autenticationRouter = require('express').Router();
const controller = require('../../controllers/Pgs/Auth');

autenticationRouter.post('/signin', controller.signin);
autenticationRouter.post('/signup', controller.signup);
autenticationRouter.post('/readToken', controller.readToken);


//ver o token
exports.readToken= async (req, res) =>{
    try{
        const { token } = req.body;
        authenticateUtil.certifyAccessToken(token)
         .then(decode => {
            res.status(200).json(decode);
// Aqui pode ler os dados decodificados do token
            // Faça o que quiser com os dados decodificados, como salvá-los em variáveis ou usar em outras operações
          })
          .catch(err => {
            res.status(401).json(err);
            //console.error('Erro ao verificar o token:', err);
          });
    }catch(error){
        res.status(401).json({ msg: error.message })
    }
}


module.exports = autenticationRouter;