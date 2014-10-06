var CommentsController = require('controllers/event/CommentsController');
	
var CommentsView = function(args){
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
		backgroundColor:'#fff',
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
	    text:'Commentaire(s) de l\'évènement',
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
	
	fields['tableViewComments'] = Titanium.UI.createTableView({
		separatorColor: '#000',
		top : "2%",
		height : Titanium.UI.SIZE
	});
	
	// Bouton de validation
	fields['newCommentButon'] = Titanium.UI.createButton({
		title: 'Créer !',
		top: "3%",
		width: "75%",
		height:"3%",
		left : "12.5%",
		right : "12.5%",
		visible:false,
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		zIndex: 30
	});
	
	// Bouton de retour
	fields['backButton'] = Titanium.UI.createButton({
		title: 'Retour à l\'évènement',
		top: "100%",
		width: "75%",
		height:"3%",
		left : "12.5%",
		right : "12.5%",
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	for (var key in fields) {
		view.add(fields[key]);
	}
	
	new ButtonMenuController({
       	menuFields:menuFields
    });
    
	new CommentsController({
      	commentFields:fields,
      	idEvent: args.idEvent
    });
    
	return scrollView;  
};

module.exports = CommentsView;