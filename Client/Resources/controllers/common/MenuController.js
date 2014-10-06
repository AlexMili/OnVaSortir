var MenuController = function(args) {
    var self = Ti.UI.createWindow({exitOnClose:false});
	
	//left représente la vue du menu qui se situe à gauche de l'écran
    var left = args.left,
        view, //the current view... start with 0
        views = [],
        menuRows = [],
        events = {}, //holder for our custom events
        draggable = args.draggable || true,
        ledge,
        threshold,
        half = {
            width: undefined,
            height: undefined
        },
        duration = {
            slide: 200,
            swipe: 150,
            bounce: 100,
            change_out: 120,
            change_in: 300
        },
        bounce = 8,
        shadow = {
            shadowRadius: 2,
            shadowOpacity: 0.6,
            shadowOffset: {
                x: 4,
                y: 0
            },
            shadowColor: 'black'
        },
        current = 'left',
        sliding = {
            center: 0,
            offset: 0
        };
    
    var getCurrent = function() {
    	return current;
    }
    
    var setCurrent = function(newCurrent) {
    	current = newCurrent;
    }
    // Our Identity Matrix for all animations using transform
    var twoD = Ti.UI.create2DMatrix();//pour iphone
    
    self.addEventListener('postlayout',function(e){
    	// set the size after we know what the size is. this should cover orientation too
        half = {
            width: self.rect.width / 2,
            height: self.rect.height / 2
        };
    });

    var init = function() {
		var myView;
		setCurrent('left');
		
		//Si le menu est bien définit et initialisé on l'ajoute à la fenêtre
        if(left !== undefined && left.toString().indexOf('TableView') !== -1) {
            self.add(left);
        } else {
            throw "'left' property must be a Titanium Table view proxy... was:" + left.toString();
        }

		// Here we will process the table rows just as if they were tabs in a tabgroup
        // Making sure we check all the table sections
        for(var i = 0; i < left.data.length; i++) {
            // Make sure we check all the table rows
            for(var j = 0; j < left.data[i].rowCount; j++) {//Parcours tous les éléments renseignés dans left
                
                var row = left.data[i].rows[j];

                //only work with rows that have a view... in case some are buttons or decoration
                if(row.navView !== undefined) {
                    var View;
					
					// here we will accept anything but a window...
                    if(row.navView.toString().indexOf('Window') === -1) { //On récupère la vue
                        View = row.navView;
                    } else {
                        throw "ViewSlider can only accept UI Views as the table row view property for now";
                        //Maybe in the future just copy all children of a window to a view?
                    }

                    views.push(View);//ajout du nouvel objet vue dans le tableau
                    
                    if (!myView) {
				        myView = views[views.length-1]; // set the first view we can find
                    }

                } else {
                    views.push(false); // keep our index correct...
                }
            }
        }
		
		view = new myView();
       	view.width = Ti.Platform.displayCaps.platformWidth;
        view.height = Ti.UI.FILL;
        view.zIndex = 35;
       	self.add(view);
		
        
        ledge = Ti.Platform.displayCaps.platformWidth * 0.8,
        threshold = Ti.Platform.displayCaps.platformWidth * 0.2,
        half = {
            width: Ti.Platform.displayCaps.platformWidth / 2,
            height: Ti.UI.FILL / 2
        };
        left.zIndex = 1;
        
        left.addEventListener('click', function(e) {
            var newView;
            
            if(views[e.index]) { // see if it's an object, or a boolean false
                newView = views[e.index]; //Récupère la nouvelle vue en fonction de la ligne cliquée (ajoutée précédemment dans la boucle open())
                changeView(newView);
            } else {
            	newView = view; // switch back to the old view	            
	            changeView(view);
            }
        });
        
        self.open();
    };

    var onCurrentChanged = function() {
        shadow.shadowOffset.x = -4;
        left.zIndex = -1;
    };

    var slideView = function(position) {
    	var delta_xs;
    	
    	if(typeof position == 'undefined')
    		var position = (getCurrent() == 'view') ? 'view' : 'left';
    	
        delta_xs = {
            left: ledge,
            view: 0
        };
        
        view.animate({
            left: delta_xs[position],
            duration: duration.slide
        });
        
        (getCurrent() == 'view') ? setCurrent('left') : setCurrent('view');
        onCurrentChanged();
    };

    var changeView = function(myView, params) {
    	if(typeof params == 'undefined')
    		var params = new Array();
    	
		var newView = new myView(params);
    	setCurrent('left');//On initialise la position du menu
    	
       	newView.width = Ti.Platform.displayCaps.platformWidth;//la nouvelle vue aura pour largeur la largeur de l'écran
       	newView.left = Ti.Platform.displayCaps.platformWidth;//la nouvelle vue est placée à droite de l'écran
        newView.height = Ti.UI.FILL;//hauteur de la vue 100%
        newView.zIndex = self.children[self.children.length-1].zIndex+1;//priorité affichage nouvelle vue = priorité affichage vue en cours + 1
        
		self.add(newView);//On ajoute la nouvelle vue à la fenêtre
		
	    if (view !== newView) {
	    	//animation d'arrivé de la nouvelle vue
	        newView.animate({
	            left:0,
	            duration: duration.change_in
	        }, function() {
	            view = newView;//on remplace la vue actuelle par la nouvelle vue
				self.remove(self.children[1]);//on supprime de la fenêtre l'ancienne vue
				view.zIndex = view.zIndex - 1;//Empêche le zIndex de monter indéfinimment et qui sait peut être faire buguer l'app au bout d'un moment
	        });
        } else {//Si la nouvelle vue = current view on rabat simplement le menu
        	slideView('view');
        }
    };
    
    // API methods
    this.slideView = slideView;
    this.init=init;
    this.changeView=changeView;
};

module.exports = MenuController;