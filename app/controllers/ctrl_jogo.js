module.exports.jogo = function(application, req, res){
    if (req.session.autorizado !== true){
        res.redirect("/")
        return
    }
    const connection = application.config.connection;
    const gameDAO = new application.app.models.gameDAO(connection);

    let user = req.session.user;
    let casa = req.session.house;

    gameDAO.gameStart(res, user, casa);
};

module.exports.sair = function(application,req, res){
    req.session.destroy(function(err){
        res.redirect("/")
    });
}