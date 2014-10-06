function SignupController() {
	
	function setEventListeners(w, fields, navigationModule) {
		if (Ti.Platform.osname == "iphone"){
			Ti.include('/modules/core.js');
		} else if (Ti.Platform.osname == "android"){
			Ti.include('../../modules/core.js');
		}
		
		var signupReq = Titanium.Network.createHTTPClient();//Connexion HTTP avec le serveur
		
		//Fonction de retour de la requête	
		signupReq.onload = function(){
		    var json = JSON.parse(this.responseText);  
		    
			switch(json['code']) {
				case 200://OK
					//alert('Connecté');
					Ti.App.Properties.setInt('idUser', json['data']['id']);
					Ti.App.Properties.setString('pseudoUser', json['data']['pseudo']);
					Ti.App.Properties.setString('emailUser', json['data']['email']);
					navigationModule.closeWindow('login');
					slidingMenu.init();
					break;
				case 402:
				case 403:
					alert('Erreur lors de la connexion');
					break;
				case 444:
					alert('Tous les champs ne sont pas remplis');
					break;
				case 501:
					alert('Adresse e-mail non valide.');
					break;
				case 503:
					alert('Pseudo déjà utilisé.');
					break;
				case 504:
					alert('Adresse e-mail déjà utilisée.');
					break;
				default:
					alert('Connexion avec le serveur impossible.');
					break;
			}
		};
		
		w.addEventListener('android:back', function() {
			navigationModule.openWindow('main');
		});
		
		fields['successEmail'].hide();
		fields['errorEmail'].hide();
		
		fields['champEmail'].addEventListener('change', function(e){
			if(!checkEmail(e.value)){//Mail not valid
				fields['errorEmail'].show();
				fields['successEmail'].hide();
				fields['champEmail'].setSoftKeyboardOnFocus(Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
				fields['champEmail'].setBackgroundFocusedColor('#f66');
				fields['champEmail'].setBackgroundColor('#f22');
			}
			else {
				fields['errorEmail'].hide();
				fields['successEmail'].show();
				fields['champEmail'].setBackgroundColor('#3f0');
				fields['champEmail'].setBackgroundFocusedColor('#3f6');
				fields['champEmail'].setBorderColor('#000');
			}
		});
		
		fields['champMdp'].addEventListener('change', function(e){
			if(fields['champMdp'].value != fields['champMdp2'].value){//Mdp différents
				fields['champMdp'].setBackgroundFocusedColor('#f66');
				fields['champMdp'].setBackgroundColor('#f22');
				fields['champMdp2'].setBackgroundFocusedColor('#f66');
				fields['champMdp2'].setBackgroundColor('#f22');
			}
			else {
				fields['champMdp'].setBackgroundColor('#3f0');
				fields['champMdp'].setBackgroundFocusedColor('#3f6');
				fields['champMdp2'].setBackgroundColor('#3f0');
				fields['champMdp2'].setBackgroundFocusedColor('#3f6');
			}
		});
		
		fields['champMdp2'].addEventListener('change', function(e){
			if(fields['champMdp'].value != fields['champMdp2'].value){//Mdp différents
				fields['champMdp'].setBackgroundFocusedColor('#f66');
				fields['champMdp'].setBackgroundColor('#f22');
				fields['champMdp2'].setBackgroundFocusedColor('#f66');
				fields['champMdp2'].setBackgroundColor('#f22');
			}
			else {
				fields['champMdp'].setBackgroundColor('#3f0');
				fields['champMdp'].setBackgroundFocusedColor('#3f6');
				fields['champMdp2'].setBackgroundColor('#3f0');
				fields['champMdp2'].setBackgroundFocusedColor('#3f6');
			}
		});
		
		fields['signupButton'].addEventListener('click', function(){
			var email = fields['champEmail'];
			var pseudo = fields['champPseudo'];
			var mdp = fields['champMdp'];
			var mdp2 = fields['champMdp2'];
			var datepicker = fields['datepicker'];
			
			if(!checkEmail(email.value)) {
				alert('Email invalide !');
				email.focus();
			}
			else {
				if(pseudo.value == '') {
					alert('Vous devez entrer un pseudo');
					pseudo.focus();
				}
				else {
					if(mdp.value == '') {
						alert('Vous devez entrer un mot de passe');
						mdp.focus();
					}
					else {
						if(mdp2.value == '') {
							alert('Vous devez confirmer votre mot de passe');
							mdp2.focus();
						}
						else {
							if(mdp.value != mdp2.value) {
								alert('Les mots de passe ne correspondent pas');
								mdp.focus();
								mdp.value='';
								mdp2.value='';
							}
							else {
								var dateValue = datepicker.value;
	 							
							    var day = dateValue.getDate();
							    day = day.toString();
							 
							    if (day.length < 2) day = '0' + day;
							 
							 
							    var month = dateValue.getMonth();
							    month = month + 1;
							    month = month.toString();
							 
							    if (month.length < 2) month = '0' + month;
							 
							    var year = dateValue.getFullYear();
							    finalDate = day+'/' +month+'/'+year;
								
								var mdpSHA1 = Titanium.Utils.sha1(mdp.value);
			
								signupReq.open("POST","http://guarded-sands-6942.herokuapp.com/user/signup");  
							    var params = {  
							        pseudo: pseudo.value,
							        email: email.value,
							        mdpSHA1: mdpSHA1,
							        birthdate: finalDate,
							        secret: 'truc'
							    };  
							    signupReq.send(params);
							}
						}
					}
				}
			}
		});
	}
	
	return {
		init : function(navigationModule){
			var signupView = new SignupView();
			var builder = signupView.init();
			
			var win = builder[0];
			var fields = builder[1];
			
			setEventListeners(win, fields, navigationModule);
			
			navigationModule.addToWindowStack(win, 'signup');
			navigationModule.openWindow('signup');
		}
	}
}

module.exports = SignupController;