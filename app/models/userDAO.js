function userDAO(connection){
    this._connection = connection();
}

userDAO.prototype.insertUser = function(user){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("users", function(err, collection){
            collection.insert(user);

            mongoclient.close();
        })
    });
}

userDAO.prototype.authenticate = function(data, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("users", function(err, collection){
            collection.find(data).toArray(function(err, result){
                if (result[0] !== undefined){
                    req.session.autorizado = true;

                    req.session.user = result[0].user;
                    req.session.house = result[0].house;
                }
                if(req.session.autorizado){
                    res.redirect("/jogo")
                } else {
                    res.render("index",{validacao: [{msg: 'Login Inválido'}]})
                }
            });
            mongoclient.close();
        })
    });
}

module.exports = function(){
    return userDAO;
}