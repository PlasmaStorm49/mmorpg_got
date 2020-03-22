module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.ctrl_index.index(application, req, res)
	});

	application.post('/autenticar', function(req, res){
		application.app.controllers.ctrl_index.autenticar(application, req, res)
	});
}