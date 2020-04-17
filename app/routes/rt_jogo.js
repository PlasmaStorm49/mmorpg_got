module.exports = function(application){
    application.get('/jogo', function(req, res){
        application.app.controllers.ctrl_jogo.jogo(application, req, res);
    });

    application.get('/sair', function(req, res){
        application.app.controllers.ctrl_jogo.sair(application, req, res);
    })

    application.get('/suditos', function(req, res){
        application.app.controllers.ctrl_jogo.suditos(application, req, res)
    })

    application.get('/pergaminhos', function(req, res){
        application.app.controllers.ctrl_jogo.pergaminhos(application, req, res)
    })
}