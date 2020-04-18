function gameDAO(connection){
    this._connection = connection();
}

gameDAO.prototype.generateParameters = function (user){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("game", function (err, collection){
            collection.insert({
                user: user, 
                moeda: 25,
                suditos: 10,
                temor: 100 + parseInt(Math.random()*100),
                sabedoria: 100 + parseInt(Math.random()*100),
                comercio: 100 + parseInt(Math.random()*100),
                magia: 100 + parseInt(Math.random()*100)
            });
            mongoclient.close();
        })
    })
}

gameDAO.prototype.gameStart = function (res, user, casa, comando_invalido){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("game", function(err, collection){
            collection.find({ user : user}).toArray(function(err, result){
                // console.log(result[0])
                res.render('jogo', {img_casa: casa, gamedata : result[0], comando_invalido: comando_invalido});

                mongoclient.close();
            })
        })
        
    })
}


module.exports = function (){
    return gameDAO;
}