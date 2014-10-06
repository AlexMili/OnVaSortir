var NewCommentController = require('controllers/event/NewCommentController');
	
var NewCommentView = function(args){
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
	    text:'Commenter l\'évènement',
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
    // Commentaire
	fields['staticComment'] = Titanium.UI.createLabel({
		text : 'Commentaire : ',
		color : '#6e4b6e',
		left : "12.5%",
		font: { fontSize:18 },
		top : "4%",
	});
	
	fields['commentaire'] = Titanium.UI.createTextArea({
		color : 'black',
		left : "5%",
		right : "5%",
		top : "1%",
		width : 'auto',
		height : 'auto'
	});
	
	// Bouton de validation
	fields['validationButton'] = Titanium.UI.createButton({
		title: 'Ajouter commentaire',
		top: "4%",
		width: "75%",
		height:"3%",
		left : "12.5%",
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	// Bouton de retour à l'event
	fields['backButton'] = Titanium.UI.createButton({
		title: 'Retour aux commentaires',
		top: "2%",
		width: "75%",
		height:"3%",
		left : "12.5%",
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	for (var key in fields) {
		view.add(fields[key]);
	}
	
	row.add(view);
	
	new ButtonMenuController({
       	menuFields:menuFields
    });
    
	new NewCommentController({
       	newCommentFields:fields
    });
    
	return scrollView; 
};

module.exports = NewCommentView;
