function userDAO(connection){
    this._connection = connection();
}
userDAO.prototype.insertUser = function(user){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("users", function(err, collection){
            collection.insert(user);

            mongoclient.close;
        })
    });
}
module.exports = function(){
    return userDAO;
}