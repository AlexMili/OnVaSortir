var HomeController = function(args) {

	var self = Ti.UI.createView({
		backgroundColor:args.backgroundColor
	});
	
	// bouton qui permet d'ouvrir le menu
	args.homeFields['menuButton'].addEventListener('click', function() {
        slidingMenu.slideView();
    });
	
	// ajout des éléments à la vue
	for (var field in args.homeFields) {
		self.add(args.homeFields[field]);
	}
	
	return self;
}

module.exports = HomeController;