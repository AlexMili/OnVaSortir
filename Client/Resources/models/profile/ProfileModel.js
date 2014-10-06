

var ProfileModel = function(args) {
	
	// permet de récupérer les infos de l'utilisateur
	 function getInfosMyProfile (id,callback) {
		
		//Connexion HTTP avec le serveur
		var getinfosMyProfileReq = Titanium.Network.createHTTPClient({
		    
			 onload : function(e) {
			    var result = JSON.parse(this.responseText);
			    Ti.API.info("Received text: " + this.responseText);
			    callback(result['data']);
			 },
			
			 onerror : function(e) {
			     Ti.API.debug(e.error);
			 },
			 timeout : 5000  // in milliseconds
		}); 
		 
		getinfosMyProfileReq.open("POST","http://guarded-sands-6942.herokuapp.com/user/infos");  
		
		
		var params = {  
			id:id,
	        secret: 'truc'
	    }; 
				    
		getinfosMyProfileReq.send(params);
	}



//permet de mettre à jour les information user 
	function newInformationProfile(pseudo,nom,prenom,dateNaissance,mail,Ville,codePostal,description,telephone,ufr,annee) {
		
		
		//Connexion HTTP avec le serveur
		var addProfileReq = Titanium.Network.createHTTPClient({
		     // function called when the response data is available
			 onload : function(e) {
			    Ti.API.info("Received text: " + this.responseText);
			    
			    var result = JSON.parse(this.responseText);
			   // callback(result);
			 },
			 // function called when an error occurs, including a timeout
			 onerror : function(e) {
			     Ti.API.debug(e.error);
			         Ti.API.info("Received text: haw hnééé" );
			     
			 },
			 timeout : 5000  // in milliseconds
		}); 
			
		
		
		addProfileReq.open("POST","http://guarded-sands-6942.herokuapp.com/user/edit");  
		
		
		
		
		var params = {  
	        
	        
			
			id:'6',
			pseudo:pseudo,
			email:email,
			birthdate:dateNaissance,
			avatar:"http:\/\/",
			firstname:nom,
			lastname:prenom ,
			city: ville,
			zip:codePostal,
			phone:tel,
			description:description ,
			level:annee,
			ufr:ufr,
			
	        secret: 'truc'

	    }; 
				    
		addProfileReq.send(params);
	};
	
	this.getInfosMyProfile = getInfosMyProfile;
	this.newInformationProfile = newInformationProfile;
}



module.exports = ProfileModel;