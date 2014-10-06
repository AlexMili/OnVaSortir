function FirstScreenView() {
	
	function buildWindow() {
		var win = Titanium.UI.createWindow({  
		    title: 'Accueil',
		    //backgroundColor: 'white',
		    backgroundImage: '/firstscreen.png'
		});
		
		return win;
	}
	
	function buildFields(w) {
		
		var field = [];

		field['loginFacebook'] = Titanium.UI.createButton({
			title: ' ',
			backgroundImage: '/facebook.png',
			width:"80%",
			height:70,
			left:"10%",
			right:"10%",
			bottom: 130,
			zIndex: 1
		});
		
		field['loginButton'] = Titanium.UI.createButton({
			title: 'login',
			//font: { fontSize: 30, font: myFontName },
			width:"40%",
			left:"10%",
			right: "50%",
			bottom: 30,
			zIndex: 1
		});
		
		field['signupButton'] = Titanium.UI.createButton({
			title: 'Sign up',
			width:"40%",
			left:"50%",
			right:"10%",
			bottom: 30,
			zIndex: 1
		});
		
		
		field['backLogin'] = Titanium.UI.createLabel({
			text: ' ',
			width:"90%",
			left:"5%",
			right:"5%",
			height: 200,
			backgroundColor: 'white',
			bottom: 20,
			zIndex: 0
		});
		
		field['flush'] = Titanium.UI.createButton({
			title: 'Logout',
			width:"75%",
			left:"12.5%",
			top: 150,
			visible:false
		});
		
		w.add(field['loginButton']);
		w.add(field['loginFacebook']);
		w.add(field['signupButton']);
		w.add(field['backLogin']);
		w.add(field['flush']);
		
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

module.exports = FirstScreenView;