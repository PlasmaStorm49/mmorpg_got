module.exports.jogo = function(application, req, res){
    if (req.session.autorizado !== true){
        res.redirect("/")
        return
    }
    let msg = ''
    if(req.query.msg !== ''){
        msg = req.query.msg
    }


    
    const connection = application.config.connection;
    const gameDAO = new application.app.models.gameDAO(connection);

    let user = req.session.user;
    let casa = req.session.house;

    gameDAO.gameStart(res, user, casa, msg);
};

module.exports.sair = function(application,req, res){
    if (req.session.autorizado !== true){
        res.redirect("/")
        return
    }
    req.session.destroy(function(err){
        res.redirect("/")
    });
}

module.exports.suditos = function(application, req, res){
    if (req.session.autorizado !== true){
        res.redirect("/")
        return
    }
    res.render("aldeoes", {validacao : {}})
}

module.exports.pergaminhos = function(application, req, res){
    if (req.session.autorizado !== true){
        res.redirect("/")
        return
    }
    res.render("pergaminhos", {validacao : {}})
}

module.exports.ordenar = function(application, req, res){
    if (req.session.autorizado !== true){
        res.redirect("/")
        return
    }
    let formData = req.body;

    req.assert('action', 'Uma ação deve ser selecionada').notEmpty();
    req.assert('amount', 'Seleciona a quantidade').notEmpty();

    let errors = req.validationErrors();
    if (errors){
        res.redirect("jogo?msg=A")
        return
    }
    let connection = application.config.connection
    let gameDAO = new application.app.models.gameDAO(connection);

    formData.user = req.session.user;
    gameDAO.action(formData)

    res.redirect("jogo?msg=B")

}