module.exports.jogo = function(application, req, res){
    if (req.session.autorizado !== true){
        res.redirect("/")
        return
    }
    let comando_invalido = false
    if(req.query.comando_invalido == 'true'){
        comando_invalido = true
    }


    
    const connection = application.config.connection;
    const gameDAO = new application.app.models.gameDAO(connection);

    let user = req.session.user;
    let casa = req.session.house;

    gameDAO.gameStart(res, user, casa, comando_invalido);
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
        res.redirect("jogo?comando_invalido=true")
        return
    }
    console.log(formData)
    res.send("okie")
}