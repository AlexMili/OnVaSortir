/**
 * @author Nissim Naccache
 */
var CreModEventModel = function(args) {
	
	// permet de récupérer les categories des évènements
	var getTheEventsCategories = function(callback) {
		
		//Connexion HTTP avec le serveur
		var getCatReq = Titanium.Network.createHTTPClient({
		     // function called when the response data is available
			 onload : function(e) {
			    Ti.API.info("Received text: " + this.responseText);
			    
			    var result = JSON.parse(this.responseText);
			    callback(result['data']);
			 },
			 // function called when an error occurs, including a timeout
			 onerror : function(e) {
			     Ti.API.debug(e.error);
			 },
			 timeout : 5000  // in milliseconds
		}); 
		 
		getCatReq.open("POST","http://guarded-sands-6942.herokuapp.com/category/list");  
		
		var params = {  
	        secret: 'truc'
	    }; 
				    
		getCatReq.send(params);
		
	};
	
	// permet de récupérer l'id d'une catégorie evenement d'après son libellé
	var getIdFromLibCtegory = function(libCategorie, callback) {
		 getTheEventsCategories(function(eventsCategories) {  // on récupère les catégories des évènements 		
			for (var eventsCategorie in eventsCategories) {
	   			if(eventsCategories[eventsCategorie]['cat_libelle'] == libCategorie)
	   				callback(eventsCategories[eventsCategorie]['cat_id']);
			}
		});
	};
	
	// permet d'ajouter un nouvel event en bdd
	var newEvent = function(infosEvent, callback) {
		for (var field in infosEvent) {
			Ti.API.info(infosEvent[field]);
		}
		
		//Connexion HTTP avec le serveur
		var addEventReq = Titanium.Network.createHTTPClient({
		     // function called when the response data is available
			 onload : function(e) {
			    Ti.API.info("Received text: " + this.responseText);
			    
			    var result = JSON.parse(this.responseText);
			    callback(result);
			 },
			 // function called when an error occurs, including a timeout
			 onerror : function(e) {
			     Ti.API.debug(e.error);
			 },
			 timeout : 5000  // in milliseconds
		}); 
		 
		addEventReq.open("POST","http://guarded-sands-6942.herokuapp.com/event/add");  
		
		var date = infosEvent['date'];
		var time = infosEvent['time'];
		date.setHours(time.getHours());
		date.setMinutes(time.getMinutes());
		date.setSeconds(time.getSeconds());
		
		var delay = (parseInt(infosEvent['dureeH']) * 60) + parseInt(infosEvent['dureeM']);
		var params = {  
	        title: infosEvent['titre'],
	        dateEvent: date,
			delay: delay,
			address: infosEvent['adresse'],
			city: infosEvent['ville'],
			zipCode: infosEvent['cp'],
			placeName: infosEvent['lieuDit'],
			maxPeople: infosEvent['maxParticipants'],
			description: infosEvent['description'],
			category: infosEvent['idCategorie'],
			creater: Ti.App.Properties.getInt('idUser'),
	        secret: 'truc'
	    }; 
				    
		addEventReq.send(params);
	};
	
 	this.getTheEventsCategories = getTheEventsCategories;
    this.getIdFromLibCtegory = getIdFromLibCtegory;
    this.newEvent = newEvent;
};
module.exports = CreModEventModel;