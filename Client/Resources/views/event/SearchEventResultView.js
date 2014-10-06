//var SearchEventResultController = require('controllers/event/SearchEventResultController');
	
var SearchEventResultView = function(args){
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
	    text:'Résultat de la recherche',
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
	    var titre = Ti.UI.createLabel({
	    	text:'titre',
	        color: '#6e4b6e',
	        textAlign:'left',
	        left:"12.5%",
	        height:'auto',
	        top:10,
	        font:{fontWeight:'bold',fontSize:22}
	    });
	    row.add(titre);
	    
	    var date = Ti.UI.createLabel({
	    	text:'date',
	        color: '#6e4b6e',
	        textAlign:'left',
	        left:"12.5%",
	        height:'auto',
	        top:20,
	        font:{fontWeight:'bold',fontSize:22}
	    });
	    row.add(date);
	    
	    var categorie = Ti.UI.createLabe({
	    	text:'date',
	        color: '#6e4b6e',
	        textAlign:'left',
	        left:"12.5%",
	        height:'auto',
	        top:30,
	        font:{fontWeight:'bold',fontSize:22}
	    });
	    row.add(categorie);
	 
	    //image pour afficher la page de l'event
	    var imgLabel = Ti.UI.createImageView({
	        image:'/images/ml_28x28.png',
	        height:20,
	        width:20,
	        top:10,
	        right:"2%",
	        borderRadius:10
	    });
	    row.add(imgLabel);
	 
	    data.push(row);
	}
	
	// Bouton de retour
	fields['backButton'] = Titanium.UI.createButton({
		title: 'Retour',
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
	
	for (var key in fields) {
		view.add(fields[key]);
	}
	
	view.add(tableView);
	
	new ButtonMenuController({
       	menuFields:menuFields
    });
    
	/*new SeaarchEventResultController({
      	searchEventResultFields:fields
    });*/
    
	return scrollView;  
};

module.exports = SearchEventResultView;
