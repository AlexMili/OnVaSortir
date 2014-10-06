var EventController = require('controllers/event/EventController');
	
var EventView = function(args){
    var fields = [];
    var menuFields = [];
    
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
		height:2000,
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
	    text:'Evènement',
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
	fields['staticTitre'] = Titanium.UI.createLabel({
		text : 'Titre de l\'évènement : ',
		color : '#6e4b6e',
		left : "12.5%",
		font: { fontSize:18 },
		top : "4%",
	});
	
	fields['titre'] = Titanium.UI.createLabel({
		color : 'black',
		left : "12.5%",
		font: { fontSize:18 },
		top : "1%",
	});
	
	// auteur de l'event ("créé par " + xxx)
	fields['createur'] = Titanium.UI.createLabel({
		color : '#6e4b6e',
		left : "12.5%",
		fontSize : 18,
		top : "3%"
	});
	
	//Date et heure
	fields['staticDateTime'] = Titanium.UI.createLabel({
		text : 'Date et heure :',
		color : '#6e4b6e',
		left : "12.5%",
		font: { fontSize:18 },
		top : "3%",
	});
	
	fields['dateTime'] = Titanium.UI.createLabel({
		color : 'black',
		left : "12.5%",
		font: { fontSize:18 },
		top : "1%",
	});
	
	// Durée de l'event
	fields['staticDuree'] = Titanium.UI.createLabel({
		text : 'Durée :',
		color : '#6e4b6e',
		left : "12.5%",
		font: { fontSize:18 },
		top : "3%",
	});
	
	fields['duree'] = Titanium.UI.createLabel({
		color : 'black',
		left : "12.5%",
		font: { fontSize:18 },
		top : "1%",
	});
	
	// type d'event
	fields['staticTypeEvent'] = Titanium.UI.createLabel({
		text : 'Catégorie :',
		color : '#6e4b6e',
		left : "12.5%",
		font: { fontSize:18 },
		top : "3%",
	});
	
	fields['categorieEvent'] = Titanium.UI.createLabel({
		color : 'black',
		left : "12.5%",
		font: { fontSize:18 },
		top : "1%",
	});
	
	//Lieu dit
	fields['staticLieuDit'] = Titanium.UI.createLabel({
		text : 'Lieu dit :',
		color : '#6e4b6e',
		left : "12.5%",
		font: { fontSize:18 },
		top : "3%",
	});
	
	fields['lieuDit'] = Titanium.UI.createLabel({
		color : 'black',
		left : "12.5%",
		font: { fontSize:18 },
		top : "1%",
	});
	
	// Adresse de l'event
	fields['staticAdresse'] = Titanium.UI.createLabel({
		text : 'Adresse :',
		color : '#6e4b6e',
		left : "12.5%",
		font: { fontSize:18 },
		top : "3%",
	});
	
	fields['adresse'] = Titanium.UI.createLabel({
		color : 'black',
		left : "12.5%",
		font: { fontSize:18 },
		top : "1%",
	});
	
	// Ville
	fields['ville'] = Titanium.UI.createLabel({
		color : 'black',
		left : "12.5%",
		font: { fontSize:18 },
		top : "1%",
	});
	
	// Code Postal
	fields['codePostal'] = Titanium.UI.createLabel({
		color : 'black',
		left : "12.5%",
		font: { fontSize:18 },
		top : "1%",
	});
	
	// Description
	fields['description'] = Titanium.UI.createLabel({
		width: "75%",
		left: "12.5%",
		hintText: 'Description de l\'évènement',
		top: "3%",
		height : "10%"
	});
	
	// Nombre maximum de participants
	fields['staticMaxParticipant'] = Titanium.UI.createLabel({
		text : 'Nombre de participant :',
		color : '#6e4b6e',
		left : "12.5%",
		font: { fontSize:18 },
		top : "3%",	
	});
	
	fields['maxParticipant'] = Titanium.UI.createLabel({
		color : 'black',
		left : "12.5%",
		font: { fontSize:18 },
		top : "1%",
	});
	
	// Lien vers commentaires
	fields['staticCommentaires'] = Titanium.UI.createLabel({
		text : 'Commentaire(s) :',
		color : '#6e4b6e',
		left : "12.5%",
		font: { fontSize:18 },
		top : "3%",	
	});
	
	fields['commentaires'] = Titanium.UI.createButton({
		title: 'Voir tous les commentaires',
		top: "1%",
		width: "75%",
		height:"3%",
		left : "12.5%",
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	/*
	 * QUADRUPLE BOUTON :
	 * - annuler event
	 * - rejoindre event
	 * - quitter event
	 * - noter participation
	 */
	fields['quadrupleButton'] = Titanium.UI.createButton({
		top: "4%",
		width: "75%",
		height:"3%",
		left : "12.5%",
		visible : false,
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	// Modifier event
	fields['editButton'] = Titanium.UI.createButton({
		title : "Modifier l\'évènement",
		top: "2%",
		width: "75%",
		height:"3%",
		left : "12.5%",
		visible : false,
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	for (var key in fields) {
		view.add(fields[key]);
	}
	
	new ButtonMenuController({
      	menuFields:menuFields
    });
    
	new EventController({
       	eventFields:fields,
       	idEvent: args.idEvent
    });
    
    return scrollView;  
};

module.exports = EventView;
