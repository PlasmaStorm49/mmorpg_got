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

gameDAO.prototype.gameStart = function (res, user, casa, msg){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("game", function(err, collection){
            collection.find({ user : user}).toArray(function(err, result){
                res.render('jogo', {img_casa: casa, gamedata : result[0], msg: msg});

                mongoclient.close();
            })
        })
        
    })
}

gameDAO.prototype.action = function (action) {
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("actions", function (err, collection){

            var date = new Date();

            var tempo = null;

            switch(parseInt(action.action)){
                case 1 :tempo =  1 * 60 * 60000; break;
                case 2 :tempo =  2 * 60 * 60000; break;
                case 3 :tempo =  5 * 60 * 60000; break;
                case 4 :tempo =  5 * 60 * 60000; break;
            }
            action.action_finish_time = date.getTime() + tempo
            collection.insert(action);
            mongoclient.close();
        })
    })
}

gameDAO.prototype.getactions = function (user, res) {

    this._connection.open( function(err, mongoclient){
        mongoclient.collection("actions", function (err, collection){
            var date = Date.now()
            collection.find({ user : user, action_finish_time : {$gt: date}}).toArray(function(err, result){
                res.render("pergaminhos", {actions : result})

                mongoclient.close();
            })
        })
     })

}


module.exports = function (){
    return gameDAO;
}