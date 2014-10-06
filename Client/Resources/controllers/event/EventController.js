/**
 * @author Nissim Naccache
 */
var EventModel = require('../../models/event/EventModel');
var eventModel = new EventModel();

// nécessaire pour afficher la liste des commentaires
var CommentsView = require('../../views/event/CommentsView');

var EventController = function(args) {
	eventModel.getInfosEvent(args.idEvent, function(infosEvent){
		args.eventFields['titre'].text = infosEvent['evt_titre'];
        var datetimeEvent = infosEvent['evt_date'].split(" ");
        var dateEvent = datetimeEvent[0].split("-");
        var timeEvent = datetimeEvent[1].split(":");
        args.eventFields['dateTime'].text = dateEvent[2] + "/" + dateEvent[1] + "/" + dateEvent[0] + " " + timeEvent[0] + "h" + timeEvent[1];
        args.eventFields['duree'].text = parseInt(infosEvent['evt_duree'] / 60) + 'h' + (infosEvent['evt_duree'] % 60);
        args.eventFields['categorieEvent'].text = infosEvent['cat_libelle'];
		args.eventFields['lieuDit'].text = infosEvent['evt_lieuDit'];
        args.eventFields['adresse'].text = infosEvent['evt_adresse'];
        args.eventFields['ville'].text = infosEvent['evt_ville'];
		args.eventFields['codePostal'].text = infosEvent['evt_cp'];
		args.eventFields['maxParticipant'].text = infosEvent['evt_maxParticipants'];
		args.eventFields['description'].text = infosEvent['evt_description'];
		args.eventFields['staticCommentaires'].text = infosEvent['nbCommentaires'];
		
		// au click sur le bouton commentaire, on affiche la vue CommentView (envoi d'un paramètre idEvent:id)  
		args.eventFields['commentaires'].addEventListener('click', function() {
			slidingMenu.changeView(new CommentsView({ idEvent: args.idEvent }));
		});
		
	/*
		var dateNow = new Date(),
			idUser = Ti.App.Properties.getInt('idUser');
		// test si date passé: si c'est le membre créateur qui visualise et que l'évenement n'a pas encore été noté: bouton 'noter' sinon: rien
		// test si c'est le membre créateur qui visualise oui: ajout d'un bouton modification
		if ( infosEvent['evt_date'] > dateNow ) {
			if ( infosEvent['mem_id'] == idUser ) {
				//on passe le bouton modifier en visible
				args.eventFields['editButton'].visible = true;
				
				// au click redirection sur la page CreModEventView (envoi d'un paramètre modification:true)
				args.eventFields['editButton'].addEventListener('click', function() {
					slidingMenu.changeView(new CreModEventView({ idEvent: args.idEvent }));
				});
					
				// si l'evenement n'a pas été noté
				if(infosEvent['evt_note'] == false) {
					//on passe le bouton noter en visible
					args.eventFields['quadrupleButton'].title = "Noter";
					args.eventFields['quadrupleButton'].visible = true;
				}
			}
		}
				
		// si non date passé: si c'est le membre créateur qui visualise (et 24h avant event?):bouton 'annuler' sinon:
		else { 
			if ( infosEvent['mem_id'] == idUser ) {
				if (dateNow.parse() < infosEvent['evt_date'].parse()-86400) {
					//on passe le bouton annuler en visible
					args.eventFields['quadrupleButton'].title = "Annuler";
					args.eventFields['quadrupleButton'].visible = true;
				}
			}
			else {
				// si le membre a deja rejoins l'evenement oui (et 24h avant event?):'quitter' non:...
				if (dateNow.parse() < infosEvent['evt_date'].parse()-86400) {
					eventModel.getMembersEvent(args.idEvent, function(membersEvent){
						for (var member in membersEvent) {
							if ( globalModel.inArray(idUser, membersEvent[member]) ) {
								//on passe le bouton quitter en visible
								args.eventFields['quadrupleButton'].title = "Quitter";
								args.eventFields['quadrupleButton'].visible = true;
							}
						}
					});
				}	
				// ...on test si le membre de participants est atteint oui:rien non:on affiche 'rejoindre'
				if (infosEvent['nbParticipants'] < infosEvent['evt_maxParticipants']) {
					//on passe le bouton rejoindre en visible
					args.eventFields['quadrupleButton'].title = "Rejoindre!";
					args.eventFields['quadrupleButton'].visible = true;
				}
			} // end else of "infosEvent['mem_id'] == idUser"
		} // end else of "infosEvent['evt_date'] > dateNow"
		
		
		args.eventFields['quadrupleButton'].addEventListener('click', function() {
			// à rajouter : modale de confirmation 
			
			switch(args.eventFields['quadrupleButton'].title) {				
				case 'Noter': 	// au click sur le bouton 'noter' on affiche la vue de notation 
								args.eventFields['quadrupleButton'].addEventListener('click', function() {
									slidingMenu.changeView(new NotationView({ idEvent: args.idEvent }));
								});
					break;	
				case 'Annuler':  	// au click sur le bouton 'annuler' on annule l'event 
								eventModel.cancelEvent(args.idEvent, function(result){
									// redirection sur la page d'accueil ?
								});
					break;		
				case 'Quitter': 	// au click sur le bouton 'quitter' on supprime le membre et on change le bouton 'quitter' par 'rejoindre'
								eventModel.quitEvent(args.idEvent, function(result){
									args.eventFields['quadrupleButton'].title = "Rejoindre";
								});
					break;					
				case 'Rejoindre': 	// au click sur le bouton 'rejoindre' on ajoute le membre et on change le bouton 'rejoindre' par 'quitter'
								eventModel.joinEvent(args.idEvent, function(result){
									args.eventFields['quadrupleButton'].title = "Quitter";
								});
					break;
			}
		});
		*/
	});
}

module.exports = EventController;