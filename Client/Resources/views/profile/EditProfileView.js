var EditProfileController = require('controllers/profile/EditProfileController');
	
var EditProfileView = function(args){
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
	    text:'Affichage d\'un profil',
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
    // Pseudo
	fields['staticPseudo'] = Titanium.UI.createLabel({
		text : 'Pseudo : ',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "4%"
	});
	
	fields['pseudo'] = Titanium.UI.createLabel({
		color : '#black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	//Date et heure
	fields['staticDateTimeInscription'] = Titanium.UI.createLabel({
		text : 'Date d\'inscription :',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "3%"
	});
	
		// la définition de la variable 'text' se fait dans le controller
	fields['dateTimeInscription'] = Titanium.UI.createLabel({
		color : 'black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	// Nom
	fields['staticNom'] = Titanium.UI.createLabel({
		text : 'Nom :',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "3%"
	});
	
	fields['nom'] = Titanium.UI.createLabel({
		color : '#black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	// Mail
	fields['staticMail'] = Titanium.UI.createLabel({
		text : 'Addresse e-mail :',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "3%"
	});
	
	fields['mail'] = Titanium.UI.createLabel({
		color : 'black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	// Prénom
	fields['staticPrenom'] = Titanium.UI.createLabel({
		text : 'Prénom :',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "3%"
	});
	
	fields['prenom'] = Titanium.UI.createLabel({
		color : '#black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	// Date de naissance
	fields['staticDateNaissance'] = Titanium.UI.createLabel({
		text : 'Date de naissance :',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "3%"
	});
	
	fields['dateNaissance'] = Titanium.UI.createLabel({
		color : '#black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	// Ville & code postal
	fields['staticAdresse'] = Titanium.UI.createLabel({
		text : 'Adresse :',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "3%"
	});
	
	fields['ville'] = Titanium.UI.createLabel({
		color : '#black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
		// Faire un test sur les infos renseignées, savoir si c'est un number !
	fields['codePostal'] = Titanium.UI.createLabel({
		color : '#black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	// Numéro de téléphone
	// Faire un test sur les infos renseignées, savoir si c'est un number !
	fields['staticTelephone'] = Titanium.UI.createLabel({
		text : 'Numéro mobile :',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "3%"
	});
	
	fields['telephone'] = Titanium.UI.createLabel({
		color : '#black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	// Etudes (année et UFR)
	fields['staticEtudes'] = Titanium.UI.createLabel({
		text : 'Formation :',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "3%"
	});
	
	fields['ufr'] = Titanium.UI.createLabel({
		color : '#black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	fields['annee'] = Titanium.UI.createLabel({
		color : '#black',
		left : "5%",
		font: { fontSize:18 },
		top : "1%"
	});
	
	// Description
	fields['staticDescription'] = Titanium.UI.createLabel({
		text : 'Description :',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
		top : "3%"
	});
	
	// Bouton d'accès à la modification
	fields['editProfileButton'] = Titanium.UI.createButton({
		title: 'Modifier profil',
		top: "4%",
		width: "40%",
		height:"4%",
		visible:false,
		left : "210%",
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	for (var key in fields) {
		view.add(fields[key]);
	}
	
	new ButtonMenuController({
      	menuFields:menuFields
    });
    
	new EditProfileController({
       	profileFields:fields
    });
    
	return scrollView;  
};

module.exports = EditProfileView;
