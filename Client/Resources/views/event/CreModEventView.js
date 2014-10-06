var CreModEventController = require('controllers/event/CreModEventController');
	
var CreModEventView = function(args){
    var fields = [];
    var menuFields = [];
    var minDate = new Date();
    
    var scrollView = Titanium.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		top:0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});
	
	var view = Ti.UI.createView({
		//backgroundColor:'#fff',
		backgroundImage : '/images/background.png',
		borderRadius:10,
		width:"100%",
		height:2500,
		layout:'vertical'
	});
	
	scrollView.add(view);
	/*
	 * Menu
	 */ 
	menuFields['menuButton'] = Titanium.UI.createButton({
   		image: '/images/ButtonMenu.png',
   		top: 10,
   		left: 10,
   		width: 22,
   		height: 17,
   		zIndex: 20
	});
	
	menuFields['headerLabel'] = Ti.UI.createLabel({
	    top:0,
	    width: '100%',
	    textAlign:'center',
	    height:'40',
	    text:'Création d\'un évènement',
	    font:{fontSize:17, fontWeight:'bold'},
	    color:'#fff',
	    backgroundColor:'transparent',
	    backgroundGradient : {
			type : "linear",
			startPoint : {
				x : "0%",
				y : "0%"
			},
			endPoint : {
				x : "0%",
				y : "100%"
			},
			colors : [{
				color : "#fff",
				offset : 0.0
			}, {
				color : "#000",
				offset : 1.0
			}]
		},
	    zIndex: 10
	});
	
	scrollView.add(menuFields['menuButton']);
	scrollView.add(menuFields['headerLabel']);
	
	/*
	 * Champs
	 */
    // Titre de l'event
	fields['titre'] = Titanium.UI.createTextField({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		hintText: 'Titre de l\'évènement',
		maxLength : 120,
		top: "3%"
	});
	
	//Date et heure
	var minDate = new Date();
	fields['staticDateTime'] = Titanium.UI.createLabel({
		text : 'Date et heure :',
		color : '#6e4b6e',
		left : "12.5%",
		right : "12.5%",
		font: { fontSize:20 },
		top : "3%"
	});
	
	fields['datePicker'] = Ti.UI.createPicker({
		top: "1%",
		type:Titanium.UI.PICKER_TYPE_DATE,
		left : "12.5%",
		right : "12.5%",
		width : 'auto',
		minDate:minDate,
		value: minDate
	});
	
	fields['timePicker'] = Ti.UI.createPicker({
		top: "1%",
		type:Titanium.UI.PICKER_TYPE_TIME,
		left : "12.5%",
		right : "12.5%",
		width : 'auto',
		value: minDate
	});
	
	// Durée de l'event
	fields['staticDuree'] = Titanium.UI.createLabel({
		text : 'Durée :',
		color : '#6e4b6e',
		left : "12.5%",
		right : "12.5%",
		font: { fontSize:20 },
		top : "3%"
	});
	
	fields['dureeHeure'] = Ti.UI.createSlider({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		top: "1%",
		max : 24,
		min : 0,
		value : 1 
	});
	fields['staticDureeHeure'] = Titanium.UI.createLabel({
		text : fields['dureeHeure'].value + ' heure(s)',
		color : '#000',
		left : "12.5%",
		right : "12.5%",
		font: { fontSize:20 },
		top : "1%"
	});

	
	fields['dureeMinute'] = Ti.UI.createSlider({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		top: "1%",
		max : 60,
		min : 0,
		value : 0
	});
	fields['staticDureeMinute'] = Titanium.UI.createLabel({
		text : fields['dureeMinute'].value + ' minute(s)',
		color : '#000',
		left : "12.5%",
		right : "12.5%",
		font: { fontSize:20 },
		top : "1%"
	});

	// type d'event
	fields['categoryEventPicker'] = Titanium.UI.createPicker({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		type:Titanium.UI.PICKER_TYPE_PLAIN,
		hintText: 'Catégorie',
		top: "3%"
	});
	
	//Lieu dit
	fields['lieuDit'] = Titanium.UI.createTextField({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		hintText: 'Lieu dit de l\'évènement',
		maxLength : 75,
		top: "3%"
	});
	
	// Adresse de l'event
	fields['adresse'] = Titanium.UI.createTextField({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		hintText: 'Adresse',
		maxLength : 120,
		top: "3%"
	});
	
	// Ville
	fields['ville'] = Titanium.UI.createTextField({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		hintText: 'Ville',
		maxLength : 75,
		top: "1%"
	});
	
	// Code Postal
	// Faire un test sur les infos renseignées, savoir si c'est un number !
	fields['codePostal'] = Titanium.UI.createTextField({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		hintText: 'Code postal',
		maxLength : 5,
		top: "1%",
		keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	
	// Description
	fields['description'] = Titanium.UI.createTextArea({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		hintText: 'Description de l\'évènement',
		top: "3%",
		height : "10%",
		color : 'black',
		height : '10%'
	});
	
	// Nombre maximum de participants
	// Faire un test sur les infos renseignées, savoir si c'est un number !
	fields['maxParticipant'] = Titanium.UI.createTextField({
		width: "75%",
		left: "12.5%",
		right : "12.5%",
		hintText: 'Maximum participants',
		maxLength : 3,
		top: "3%",
		keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	
	// Bouton de validation
	fields['validationButton'] = Titanium.UI.createButton({
		title: 'Créer !',
		top: "4%",
		width: "75%",
		right : "12.5%",
		height:"3%",
		left : "12.5%",
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	for (var key in fields) {
		view.add(fields[key]);
	}
	
	new ButtonMenuController({
      	menuFields:menuFields
    });
    
	new CreModEventController({
       	creModEventFields:fields,
       	idEvent:args.idEvent
    });
    
	return scrollView;  
};

module.exports = CreModEventView;