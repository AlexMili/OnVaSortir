function SignupView() {
	
	function buildWindow() {
		var win = Titanium.UI.createWindow({  
		    title: 'Inscription',
		    backgroundColor: 'white'
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
		
		field['champEmail'] = Titanium.UI.createTextField({
			width: "75%",
			left: "12.5%",
			hintText: 'Adresse E-Mail',
			top: 10,
			keyboardType:Titanium.UI.KEYBOARD_EMAIL,
			zIndex:0
		});
		
		field['champPseudo'] = Titanium.UI.createTextField({
			width: "75%",
			left: "12.5%",
			hintText: 'Pseudo',
			top: 90,
			softKeyboardOnFocus:Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
			zIndex:0
		});
		
		field['champMdp'] = Titanium.UI.createTextField({
			width: "75%",
			left: "12.5%",
			hintText: 'Mot de passe',
			top: 170,
			passwordMask:true,
			softKeyboardOnFocus:Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
			zIndex:0
		});
		
		field['champMdp2'] = Titanium.UI.createTextField({
			width: "75%",
			left: "12.5%",
			hintText: 'Confirmation Mot de passe',
			top: 267,
			passwordMask:true,
			softKeyboardOnFocus:Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
			zIndex:0
		});
		
		field['signupButton'] = Titanium.UI.createButton({
			//color:'#fff',
			title: 'S\'inscrire',
			top:600,
			width:401,
			height:57,
			font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
		});
		
		field['datepicker'] = Ti.UI.createPicker({
			top:360,
			type:Titanium.UI.PICKER_TYPE_DATE,
			zIndex:0
		});
		
		field['successEmail'] = Titanium.UI.createLabel({
			top:17,
			backgroundImage:'/images/success.png',
			width:50,
			height:50,
			left:"75%",
			zIndex:1
		});
		
		field['errorEmail'] = Titanium.UI.createLabel({
			top:17,
			backgroundImage:'/images/error.png',
			width:50,
			height:50,
			left:"75%",
			zIndex:1
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

module.exports = SignupView;