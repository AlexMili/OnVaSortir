/**
 * @author Nissim Naccache
 */
var NewCommentModel = function(args) {
	
	// ajout d'un commentaire à l'évènement
	var addCommentToEvent = function(idEvent, textComment, callback) {
		
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
		 
		getCatReq.open("POST","http://guarded-sands-6942.herokuapp.com/comment/add");  
		
		var params = {  
			idEvent: idEvent,
			//idUser: ,
			text: textComment,
	        secret: 'truc'
	    }; 
				    
		getCatReq.send(params);		
	}
    
    this.addCommentToEvent = addCommentToEvent;
}
module.exports = NewCommentModel;