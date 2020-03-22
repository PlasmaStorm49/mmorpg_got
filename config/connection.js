const mongodb = require ('mongodb');

const connMongodb = function(){
    console.log('Conectado com o Banco de Dados')
    var db = new mongodb.Db(
        'got',
        new mongodb.Server(
        'localhost',
            27017,
            {}
        ),
        {}
    );

    return db;   
}

module.exports = function(){
    return connMongodb;
}