function checkEmail(email) {
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return (filter.test(email)) ? true : false;
}

function isConnected() {
	//C'est possible de créer un nouveau client HTTP sans perdre les variables de sessions côté serveur
	var coReq = Titanium.Network.createHTTPClient();//Connexion HTTP avec le serveur
	
	coReq.open("POST","http://ovsdescartes.a80623.sb1.dev.codeanywhere.net/isconnected.php");  
	
	var params = {
	    secret: 'truc'
	};
	
	coReq.send(params);
	
	coReq.onload = function(){
	    var json = this.responseText;  
	    
	    return json;
	};
}
