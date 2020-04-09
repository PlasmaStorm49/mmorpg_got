module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {validacao : {}, formData: {}});
}
module.exports.cadastrar = function(application, req, res){

    const formData= req.body;

    req.assert('nickname', 'Um nome deve ser inserido').notEmpty();
    req.assert('user', 'Um nome de usuário deve ser inserido').notEmpty();
    req.assert('password', 'É preciso inserir uma senha').notEmpty();
    req.assert('house', 'Uma casa deve ser selecionada').notEmpty();

    const valerror = req.validationErrors();

    if (valerror){
        res.render('cadastro', {validacao : valerror, formData : formData})
        return;
    }

    const connection = application.config.connection;

    const userDAO = new application.app.models.userDAO(connection);
    const gameDAO = new application.app.models.gameDAO(connection);

    userDAO.insertUser(formData)
    gameDAO.generateParameters(formData.user)


    res.send('Cadastro Confirmado')
}