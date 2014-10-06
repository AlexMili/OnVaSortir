function LoginController() {
	
	function setEventListeners(w, fields, navigationModule) {
		
		if (Ti.Platform.osname == "iphone"){
			Ti.include('/modules/core.js');
		} else if (Ti.Platform.osname == "android"){
			Ti.include('../../modules/core.js');
		}

		var loginReq = Titanium.Network.createHTTPClient();//Connexion HTTP avec le serveur
		
		//Fonction de retour de la requête	
		loginReq.onload = function(){
		    var json = JSON.parse(this.responseText);  
		    
			switch(json['code']) {
				case 200://OK
					Ti.App.Properties.setInt('idUser', json['data']['id']);
					Ti.App.Properties.setString('pseudoUser', json['data']['pseudo']);
					Ti.App.Properties.setString('emailUser', json['data']['email']);
					navigationModule.closeWindow('login');
					slidingMenu.init();
					break;
				case 402:
				case 401:
					alert('Erreur lors de la connexion');
					break;
				case 444:
					alert('Tous les champs ne sont pas remplis');
					break;
				case 501:
					alert('Adresse e-mail non valide.');
					break;
				case 502:
					alert('Type inconnu.');
					break;
				default:
					alert('Connexion avec le serveur impossible.');
					break;
			}
		};
		
		fields['loginB'].addEventListener('click', function(){
			//alert('envoi requête');
			var username = fields['champUsername'].value;
			var mdp = fields['champPassword'].value;
			
			/*if(username == '') {
				alert('Vous devez entrer un pseudo ou un mail valide.')
			}
			else if(mdp == '') {
				alert('Vous devez entrer votre mot de passe.')
			}
			else {*///Si tout les champs sont remplis, on envoi la requête
				//type=1 -> Connexion avec email
				//type=2 -> Connexion avec pseudo
				var type=0;
				type = (checkEmail(username)) ? 1 : 2;
				
				var mdpSHA1 = Titanium.Utils.sha1(mdp);
				
				loginReq.open("POST","http://guarded-sands-6942.herokuapp.com/user/login");  
			    var params = {  
			        username: 'test',//username,
			        mdpSHA1: Titanium.Utils.sha1('test'),//mdpSHA1,
			        type: 2,//type,
			        secret: 'truc'
			    };  
			    loginReq.send(params);
			//}
		});
		
		w.addEventListener('android:back', function() {
			navigationModule.openWindow('main');
		});
	}
	
	return {
		init : function(navigationModule){
			var loginView = new LoginView();
			var builder = loginView.init();
			
			var win = builder[0];
			var fields = builder[1];
			
			setEventListeners(win, fields, navigationModule);
			
			navigationModule.addToWindowStack(win, 'login');
			navigationModule.openWindow('login');
		}
	}
}

module.exports = LoginController;