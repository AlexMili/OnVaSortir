/**
 * @author Nissim Naccache
 */
var CommentsModel = require('../../models/event/CommentsModel');
var commentsModel = new CommentsModel();
var EventModel = require('../../models/event/EventModel');
var eventModel = new EventModel();

// nécessaire pour afficher le formulaire d'ajout d'un commentaire
var NewCommentView = require('../../views/event/NewCommentView');

var CommentsController = function(args) {
	commentsModel.getCommentsEvent(args.idEvent, function(commentsEvent){
		// on affiche tous les commentaires de l'evenement (event/comments)
		var commentRows = [];
		for (var i=0; i<commentsEvent.length; i++) {
			commentRows[i] = commentsModel.newCommentRow(commentsEvent[i]['mem_pseudo'], commentsEvent[i]['com_texte']);
		}
		args.commentFields['tableViewComments'].appendRow(commentRows);
	});
	
	eventModel.getInfosEvent(args.idEvent, function(infosEvent){
		// test si la date de l'event n'est pas passée ET que le membre est inscrit à l'evenement (event/users) oui:peut commenter on affiche le bouton d'ajout ..
		if ( infosEvent['evt_date'] > new Date() ) {
			eventModel.getMembersEvent(args.idEvent, function(membersEvent){
				res = false;
				for (var member in membersEvent) {
					if ( globalModel.inArray(Ti.App.Properties.getInt('idUser'), membersEvent[member]) ) 
						res = true;		
				}
				
				if(res == true) {
					args.commentFields['newCommentButon'].visible = true; //on passe le bouton créer en visible
					
					// et on associe un eventlistener au click sur le bouton 
					args.commentFields['newCommentButon'].addEventListener('click', function() {
						slidingMenu.changeView(new NewCommentView({ idEvent: args.idEvent }));
					});
				}
			});
			// .. non:les elements restent cachés	
		}
	});
	
	// on associe un eventlistener au click sur le bouton retour
	args.commentFields['newCommentButon'].addEventListener('click', function() {
		slidingMenu.changeView(new EventView({ idEvent: args.idEvent }));
	});
}

module.exports = CommentsController;