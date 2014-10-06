/**
 * @author Nissim Naccache
 */
var CreModEventModel = require('../../models/event/CreModEventModel');
var creModEventModel = new CreModEventModel();
var EventModel = require('../../models/event/EventModel');
var eventModel = new EventModel();

// nécessaire après création pour afficher l'event créé 
var EventView = require('../../views/event/EventView');

var CreModEventController = function(args) {
	if (args.idEvent != -1) {
		eventModel.getInfosEvent(args.idEvent, function(infosEvent){
			args.eventFields['titre'].value = infosEvent['evt_titre'];
	        args.eventFields['datePicker'].value = new Date(infosEvent['evt_date'].replace(/-/g,"/"));
	        args.eventFields['timePicker'].value = new Date(infosEvent['evt_date'].replace(/-/g,"/"));
	        args.eventFields['dureeHeure'].value = parseInt(infosEvent['evt_duree'] / 60);
	        args.eventFields['dureeMinute'].value = infosEvent['evt_duree'] % 60;
	        args.eventFields['categorieEvent'].value = infosEvent['cat_libelle']; // ??
			args.eventFields['lieuDit'].value = infosEvent['evt_lieuDit'];
	        args.eventFields['adresse'].value = infosEvent['evt_adresse'];
	        args.eventFields['ville'].value = infosEvent['evt_ville'];
			args.eventFields['codePostal'].value = infosEvent['evt_cp'];
			args.eventFields['description'].value = infosEvent['evt_description'];
			args.eventFields['maxParticipant'].value = infosEvent['evt_maxParticipants'];
		});
	}
	
	args.creModEventFields['datePicker'].addEventListener('change',function(e){
	    this.value = e.value;
	});
	args.creModEventFields['timePicker'].addEventListener('change',function(e){
	    this.value = e.value;
	});
	
	args.creModEventFields['dureeHeure'].addEventListener('change', function(e) {
		args.creModEventFields['staticDureeHeure'].text = Math.round(this.value) + " heure(s)";
	});
	args.creModEventFields['dureeMinute'].addEventListener('change', function(e) {
		args.creModEventFields['staticDureeMinute'].text = Math.round(this.value) + " minute(s)";
	});
	
	// liste des catégories évènement
	creModEventModel.getTheEventsCategories(function(eventsCategories) {  // on récupère les catégories des évènements 		
		var data = [];
		for(var i=0, ilen=eventsCategories.length; i<ilen; i++){
	  		data[i] = Ti.UI.createPickerRow({title: eventsCategories[i]['cat_libelle']});
	  		Ti.API.info(eventsCategories[i]['cat_libelle']);
		}
		args.creModEventFields['categoryEventPicker'].add(data);
		args.creModEventFields['categoryEventPicker'].setSelectedRow(0, 1, false);
	});
	
	// traitement à envoi du formulaire
	args.creModEventFields['validationButton'].addEventListener('click', function() {
        
        //test
        args.creModEventFields['titre'].value = 'aaa';
        args.creModEventFields['dureeHeure'].value = '2';
		args.creModEventFields['dureeMinute'].value = '30';
        args.creModEventFields['lieuDit'].value = 'bbb';
        args.creModEventFields['adresse'].value = 'ccc';
        args.creModEventFields['ville'].value = 'ddd';
		args.creModEventFields['codePostal'].value = '111';
		args.creModEventFields['description'].value = 'eee';
		args.creModEventFields['maxParticipant'].value = '22';
		// fin test 
		
        // les champs sont-ils tous renseignés ?
        for (var field in args.creModEventFields) {
			var element = args.creModEventFields[field];
			if(element.value == '') {
				alert('Oups vous avez oublié le champ ' + element.hintText);
				element.focus();
				return false;
			}
		}
		
		var numericsFields = new Array(args.creModEventFields['dureeHeure'], args.creModEventFields['dureeMinute'], args.creModEventFields['codePostal'], args.creModEventFields['maxParticipant']);
 		// les champs sont-ils numériques ?
        for (var field in numericsFields) {
			var element = numericsFields[field];
			if(isNaN(element.value)) {
				alert('Oups le champ ' + element.hintText + ' doit être numérique');
				element.focus();
				return false;
			}
		}
			
		// récupération de l'id categorie puis insertion de l'event en bdd
		creModEventModel.getIdFromLibCtegory(args.creModEventFields['categoryEventPicker'].getSelectedRow(0).title, function(idCategory){
			creModEventModel.newEvent({ 	
					titre: args.creModEventFields['titre'].value, 
					date: args.creModEventFields['datePicker'].value,
					time: args.creModEventFields['timePicker'].value,
					dureeH: Math.round(args.creModEventFields['dureeHeure'].value),
					dureeM: Math.round(args.creModEventFields['dureeMinute'].value),
					idCategorie: idCategory,
					lieuDit: args.creModEventFields['lieuDit'].value,
		        	adresse: args.creModEventFields['adresse'].value,
		       	 	ville: args.creModEventFields['ville'].value,
					cp: args.creModEventFields['codePostal'].value,
					description: args.creModEventFields['description'].value,
					maxParticipants: args.creModEventFields['maxParticipant'].value
				}, function(result) {
					alert(result.code);
					slidingMenu.changeView(new EventView({ idEvent: result.data['id'] }));
			});
		});
   	});
}

module.exports = CreModEventController;