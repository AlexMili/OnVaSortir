var HomeController = require('controllers/common/HomeController');

var HomeView = function(args){
    
    var hFields = [];
    
	// création des champs du header (à externaliser)
	hFields['menuButton'] = Titanium.UI.createButton({
   		image: '/images/ButtonMenu.png',
   		top: 10,
   		left: 10,
   		width: 22,
   		height: 17,
   		zIndex: 20
	});
	
	hFields['headerLabel'] = Ti.UI.createLabel({
	    top:0,
	    width: '100%',
	    textAlign:'center',
	    height:'40',
	    text:'Home',
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
	
	hFields['centralLabel'] = Ti.UI.createLabel({
    	text:'Home View',
    	color:'#000',
    	height:24,
    	width:100,
    	textAlign:'center'
   });
    
    return new HomeController({
        backgroundColor:'red',
        homeFields:hFields
    });
};

module.exports = HomeView;