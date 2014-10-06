//var SearchEventController = require('controllers/event/SearchEventController');
	
var SearchEventView = function(args){
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
	    text:'Rechercher un évènement',
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
		text : 'Date et heure de l\'évènement :',
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
		width : 'auto',
		minDate:minDate
	});
	
	fields['timePicker'] = Ti.UI.createPicker({
		top: "1%",
		type:Titanium.UI.PICKER_TYPE_TIME,
		left : "12.5%",
		width : 'auto'
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
	
	// Bouton de validation
	fields['validationButton'] = Titanium.UI.createButton({
		title: 'Rechercher',
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
    
	/*new SearchEventController({
       	searchEventFields:fields
    });*/
    
	return scrollView;  
};

module.exports = SearchEventView;