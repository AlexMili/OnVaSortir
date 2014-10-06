function FirstScreenController() {
	
	function setEventListeners(w, fields, navigationModule) {
		Ti.Facebook.appid = '338206419634676';
		Ti.Facebook.permissions = ['read_stream']; // Permissions your app needs
		Ti.Facebook.forceDialogAuth=false;
		Ti.Facebook.addEventListener('login', function(e) {
		    if (e.success) {
		        alert('Logged In');
				fields['loginFacebook'].hide();
				fields['flush'].show();
		    } else if (e.error) {
		        alert(e.error);
		    } else if (e.cancelled) {
		        alert("Canceled");
		    }
		});
		
		
		fields['loginButton'].addEventListener('click', function(){
			loginController = new LoginController();
			loginController.init(navigationModule);
		});
		
		fields['signupButton'].addEventListener('click', function(){
			signupController = new SignupController();
			signupController.init(navigationModule);
		});
		
		fields['loginFacebook'].addEventListener('click', function(){
			Ti.Facebook.authorize();
		});
		
		fields['flush'].addEventListener('click', function(){
			Ti.Facebook.logout();
			// Apparent bug with facebook logout #TIMOB-11587 http://goo.gl/r21OP so we force
			// clear cookies
			var client = Ti.Network.createHTTPClient();
			client.clearCookies('https://login.facebook.com');
			fields['loginFacebook'].show();
			fields['flush'].hide();
		});
	}
	
	return {
		init : function(navigationModule){
			var firstScreenView = new FirstScreenView();
			var builder = firstScreenView.init();
			
			var win = builder[0];
			var fields = builder[1];
			
			setEventListeners(win, fields, navigationModule);
			
			navigationModule.addToWindowStack(win, 'main');
			navigationModule.openWindow('main');
		}
	}
}

module.exports = FirstScreenController;