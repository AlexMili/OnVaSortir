/**
 * @author Nissim Naccache
 */
var NewCommentModel = require('../../models/event/NewCommentModel');
var newCommentModel = new NewCommentModel();

var NewCommentController = function(args) {
	
	// on associe un eventlistener au click sur le bouton de validation
	args.newCommentFields['validationButton'].addEventListener('click', function() {
		if(args.newCommentFields['commentaire'].value == '') {
				alert('Oups vous avez oublié le champ ' + args.newCommentFields['commentaire'].hintText);
				element.focus();
				return false;
		}
	
		// sinon on ajoute le commentaire en bdd et en retourne à la liste des commentaires
		newCommentEvent.addCommentToEvent(args.idEvent, args.newCommentFields['commentaire'].value, function(idEvent){
			slidingMenu.changeView(new CommentView({ idEvent: idEvent }));
		});
			
	});
	
	// on associe un eventlistener au click sur le bouton de retour a l'evenement
	args.newCommentFields['backButton'].addEventListener('click', function() {
		slidingMenu.changeView(new EventView({ idEvent: args.idEvent }));
	});	
}

module.exports = NewCommentController;