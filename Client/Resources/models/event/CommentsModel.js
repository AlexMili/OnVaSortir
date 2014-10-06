/**
 * @author Nissim Naccache
 */
var CommentsModel = function(args) {

	// permet de récupérer les commentaires d'un évènement
	var getCommentsEvent = function(idEvent, callback) {
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
		 
		getCatReq.open("POST","http://guarded-sands-6942.herokuapp.com/event/comments");  
		
		var params = {  
			idEvent: idEvent,
	        secret: 'truc'
	    }; 
				    
		getCatReq.send(params);
	}
    
    var newCommentRow = function(auteur, texte)	{
    	//Nouvelle ligne
	    var commentRow = Ti.UI.createTableViewRow({
	    	height:100,
	    	//backgroundColor:'#ffffff',
			backgroundImage : '/images/background.png',
	    });
	 
	    //mise en place des champs...
	    var auteur = Ti.UI.createLabel({
	    	text: auteur,
	        color: '#6e4b6e',
	        textAlign:'left',
	        left:"12.5%",
	        height:'auto',
	        top:10,
	        font:{fontWeight:'bold',fontSize:22}
	    });
	    commentRow.add(auteur);
	    
	    var comment = Ti.UI.createLabel({
	    	text : texte,
	        color: '#000',
	        textAlign:'left',
	        left:"12.5%",
	        right : "12.5%",
	        height:'auto',
	        top:32,
	        font:{fontWeight:'normal',fontSize:22}
	    });
	    commentRow.add(comment);
	 
	    //image de suppression (visble false de base, true si c'est son comment)
	    var imgLabel = Ti.UI.createImageView({
	        image:'/images/delete.png',
	        height:20,
	        width:20,
	        top:10,
	        right:"2%",
	        borderRadius:10
	    });
	    commentRow.add(imgLabel);
	    
	    return commentRow;
	}
	
    this.getCommentsEvent = getCommentsEvent;
    this.newCommentRow = newCommentRow;
}
module.exports = CommentsModel;