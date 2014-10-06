var ButtonMenuController = function(args) {
	// bouton qui permet d'ouvrir le menu
	args.menuFields['menuButton'].addEventListener('click', function() {
         slidingMenu.slideView();
    });
}

module.exports = ButtonMenuController;