//var EditPasswordController = require('controllers/profile/EditPasswordController');
	
var EditPasswordView = function(args){
    var fields = [];
    
	/*
	 * Menu
	 */ 
	fields['menuButton'] = Titanium.UI.createButton({
   		image: '/images/ButtonMenu.png',
   		top: 10,
   		left: 10,
   		width: 22,
   		height: 17,
   		zIndex: 20
	});
	
	fields['headerLabel'] = Ti.UI.createLabel({
	    top:0,
	    width: '100%',
	    textAlign:'center',
	    height:'40',
	    text:'Mon profil',
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
	
	/*
	 * Champs
	 */
	// Ancien mot de passe
	fields['staticPwd'] = Titanium.UI.createLabel({
		text : 'Mot de passe actuel : ',
		color : '#6e4b6e',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: { fontSize:18 },
	  	shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
		top : "5%"	
	});
	
	fields['password'] = Titanium.UI.createTextField({
		width: "75%",
		left: "5%",
		hintText: 'mot de passe',
		maxLength : 120,
		top: "10%",
		zIndex:0
	});
	
    // Nouveau mot de passe
	fields['staticNewPwd'] = Titanium.UI.createLabel({
		text : 'Nouveau mot de passe : ',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
	  	shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
		top : "25%"
	});
	
	fields['newPwd1'] = Titanium.UI.createTextField({
		width: "75%",
		left: "5%",
		hintText: 'nouveau mot de passe',
		passwordMask:true,
		maxLength : 120,
		top: "30%",
		zIndex:0
	});
	
	fields['staticNewPwd2'] = Titanium.UI.createLabel({
		text : 'Confirmer nouveau mot de passe : ',
		color : '#6e4b6e',
		left : "2%",
		font: { fontSize:18 },
	  	shadowColor: '#000',
	    shadowOffset: {x:5, y:5},
		top : "40%"
	});
	
	fields['newPwd2'] = Titanium.UI.createTextField({
		width: "75%",
		left: "5%",
		hintText: 'nouveau mot de passe',
		passwordMask:true,
		maxLength : 120,
		top: "45%",
		zIndex:0
	});
	
	// Bouton de validation
	fields['editPwdButton'] = Titanium.UI.createButton({
		title: 'Valider',
		top: "95%",
		width: "40%",
		height:"4%",
		left : "55%",
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	for (var key in fields) {
		view.add(fields[key]);
	}
	
	new ButtonMenuController({
       	menuFields:menuFields
    });
    
	/*new EditPasswordController({
       	editPasswordFields:fields
    });
    */
    
	return view;
};

module.exports = EditPasswordView;
