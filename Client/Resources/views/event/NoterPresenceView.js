//var NoterPresenceController = require('controllers/event/NoterPresenceController');
	
var NoterPresenceView = function(args){
    var fields = [];
    var menuFields = [];
    var data = [];
    
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
	    text:'Participation à l\'évènement',
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
	for (var c=0;c<10;c++) {
		//Nouvelle ligne
	    var row = Ti.UI.createTableViewRow({
	    	height:100,
	    	//backgroundColor:'#ffffff',
			backgroundImage : '/images/background.png',
	    });
	 
	    //mise en place des champs...
	    var pseudo = Titanium.UI.createLabel({
			color : '#6e4b6e',
			left : "12.5%",
			font: { fontSize:18 },
			top : "4%"
		});
	    row.add(pseudo);
	    
	    var staticPresence = Titanium.UI.createLabel({
			text : 'Le membre était-il présent?',
			color : '#6e4b6e',
			left : "12.5%",
			font: { fontSize:18 },
			top : "3%",
		});
	    row.add(staticPresence);
	 
		if (Titanium.Platform.name == 'android') {
	    	var presence = Titanium.UI.createSwitch({
				style:Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
				titleOff:"Absent",
				titleOn:"Présent",
				value:false,
				top: "1%"
			});
		} else if (Titanium.Platform.name == 'iPhone OS') {
			var presence = Titanium.UI.iOS.createTabbedBar({
			    labels:['Présent', 'Absent'],
			    backgroundColor:'#6e4b6e',
			    top:"1%",
			    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
			    height:25,
			    width:200
			});
		}
	    row.add(presence);
	 
	    data.push(row);
	}
	
	// Bouton de validation
	fields['newCommentButon'] = Titanium.UI.createButton({
		title: 'Valider notation',
		top: "3%",
		width: "75%",
		height:"3%",
		left : "12.5%",
		right : "12.5%",
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		zIndex: 0
	});
	
	// Bouton de retour
	fields['backButton'] = Titanium.UI.createButton({
		title: 'Retour à l\'évènement',
		top: "1%",
		width: "75%",
		height:"3%",
		left : "12.5%",
		right : "12.5%",
		font:{fontsize:30,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		zIndex : 1
	});
	
	var tableView = Titanium.UI.createTableView({
		data:data,
		separatorColor: '#000',
		top : "2%",
		zIndex : 2
	});
	
	view.add(tableView);
	
	for (var key in fields) {
		view.add(fields[key]);
	}
	
	new ButtonMenuController({
       	menuFields:menuFields
    });
    
	new NewCommentController({
       	newCommentFields:fields
    });
    
	return scrollView; 
};

module.exports = CommentsView;
