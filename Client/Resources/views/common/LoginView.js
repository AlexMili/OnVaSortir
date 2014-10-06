function LoginView() {
	
	function buildWindow() {
		var win = Titanium.UI.createWindow({  
		    title: 'Connexion',
		    //backgroundColor: 'white'
		    backgroundImage: '/images/background.png'
		});
		
		return win;
	}
	
	function addFieldsToWindow(w, field) {
		for (var key in field) {
			w.add(field[key]);
		}
	}
	
	function buildFields(w) {
		
		var field = [];
		
		field['champUsername'] = Titanium.UI.createTextField({
			width: "75%",
			left: "12.5%",
			top: "20%",
			hintText: 'E-Mail ou Pseudo',
			keyboardType:Titanium.UI.KEYBOARD_EMAIL,
			zIndex:0
		});
		
		field['champPassword'] = Titanium.UI.createTextField({
			width: "75%",
			left: "12.5%",
			top: "35%",
			hintText: 'Mot de passe',
			passwordMask:true,
			zIndex:0
		});
		
		field['loginB'] = Titanium.UI.createButton({
			width: "75%",
			left: "12.5%",
			title: 'Se connecter',
			top: "60%"
		});
		
		addFieldsToWindow(w, field);
		
		return field;
	}
	
	return {
		init: function() {
			var win = buildWindow();
			
			var fields = buildFields(win);
			
			return new Array(win, fields);
		}
	}
}

module.exports = LoginView;