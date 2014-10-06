/**
 * @author Nissim Naccache
 */
var EventModel = function(args) {
	
	// permet de récupérer les infos d'un évènement
	var getInfosEvent = function(idEvent, callback) {
		//Connexion HTTP avec le serveur
		var _getinfosEventReq = Titanium.Network.createHTTPClient({
		     // function called when the response data is available
			 onload : function(e) {
			    var _result = JSON.parse(this.responseText);
			    callback(_result['data'], _result['code']);
			 },
			 // function called when an error occurs, including a timeout
			 onerror : function(e) {
			     Ti.API.debug(e.error);
			 }
		}); 
		 
		_getinfosEventReq.open("POST","http://guarded-sands-6942.herokuapp.com/event/infos");  
		
		var _params = {  
			idEvent: idEvent,
	        secret: 'truc'
	    }; 
				    
		_getinfosEventReq.send(_params);
	}
	
	var getMembersEvent = function(idEvent, callback) {
		//Connexion HTTP avec le serveur
		var getMembersEventReq = Titanium.Network.createHTTPClient({
		     // function called when the response data is available
			 onload : function(e) {
			    var result = JSON.parse(this.responseText);
			    callback(result['data']);
			 },
			 // function called when an error occurs, including a timeout
			 onerror : function(e) {
			     Ti.API.debug(e.error);
			 },
			 timeout : 5000  // in milliseconds
		}); 
		 
		getMembersEventReq.open("POST","http://guarded-sands-6942.herokuapp.com/event/users");  
		
		var params = {  
			idEvent: idEvent,
	        secret: 'truc'
	    }; 
				    
		getMembersEventReq.send(params);
	}
	
	var joinEvent = function(idEvent, callback) {
		
		//Connexion HTTP avec le serveur
		var joinEventReq = Titanium.Network.createHTTPClient({
		     // function called when the response data is available
			 onload : function(e) {
			    var result = JSON.parse(this.responseText);
			    callback(result['code']);
			 },
			 // function called when an error occurs, including a timeout
			 onerror : function(e) {
			     Ti.API.debug(e.error);
			 },
			 timeout : 5000  // in milliseconds
		}); 
		 
		joinEventReq.open("POST","http://guarded-sands-6942.herokuapp.com/event/join");  
		
		var params = {  
			idUser: Ti.App.Properties.getInt('idUser'), 
			idEvent: idEvent,
	        secret: 'truc'
	    }; 
				    
		joinEventReq.send(params);
	}
	
	var quitEvent = function(idEvent, callback) {
		
		//Connexion HTTP avec le serveur
		var quitEventReq = Titanium.Network.createHTTPClient({
		     // function called when the response data is available
			 onload : function(e) {
			    var result = JSON.parse(this.responseText);
			    callback(result['code']);
			 },
			 // function called when an error occurs, including a timeout
			 onerror : function(e) {
			     Ti.API.debug(e.error);
			 },
			 timeout : 5000  // in milliseconds
		}); 
		 
		quitEventReq.open("POST","http://guarded-sands-6942.herokuapp.com/event/quit");  
		
		var params = {  
			idUser: Ti.App.Properties.getInt('idUser'), 
			idEvent: idEvent,
	        secret: 'truc'
	    }; 
				    
		quitEventReq.send(params);
	}
	
	var cancelEvent = function(idEvent, callback) {
		
		//Connexion HTTP avec le serveur
		var cancelEventReq = Titanium.Network.createHTTPClient({
		     // function called when the response data is available
			 onload : function(e) {
			    var result = JSON.parse(this.responseText);
			    callback(result['code']);
			 },
			 // function called when an error occurs, including a timeout
			 onerror : function(e) {
			     Ti.API.debug(e.error);
			 },
			 timeout : 5000  // in milliseconds
		}); 
		 
		cancelEventReq.open("POST","http://guarded-sands-6942.herokuapp.com/event/cancel");  
		
		var params = {  
			idUser: Ti.App.Properties.getInt('idUser'), 
			idEvent: idEvent,
	        secret: 'truc'
	    }; 
				    
		cancelEventReq.send(params);
	}
	
	this.getInfosEvent = getInfosEvent;
	this.getMembersEvent = getMembersEvent;
	this.joinEvent = joinEvent;
	this.quitEvent = quitEvent;
	this.cancelEvent = cancelEvent;
}
module.exports = EventModel;