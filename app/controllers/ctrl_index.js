module.exports.index = function(application, req, res){
    if(req.session.autorizado){
        res.redirect('jogo')      
    }else {    
        res.render('index', {validacao: {}});
    }
};

module.exports.autenticar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('user', 'Usuário deve ser informado').notEmpty();
    req.assert('password','Senha deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if (erros){
        res.render("index", {validacao : erros})
        return;
    }

    var connection = application.config.connection;
    var userDAO = new application.app.models.userDAO(connection);
    userDAO.authenticate(dadosForm, req, res);
    
    // res.send('funcional2')

}