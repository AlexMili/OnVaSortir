//Constructeur : instantiation des variables
exports.NavigationModule = function() {
	this.windowStack = [];
	this.currentWindow = '';
};

exports.NavigationModule.prototype.addToWindowStack = function(windowObject, windowName) {
	this.windowStack[windowName] = windowObject;//On ajoute la nouvelle fenêtre dans le stack
};
 
exports.NavigationModule.prototype.openWindow = function(windowName) {
	this.windowStack[windowName].open();//ouvrir la nouvelle fenêtre avant de fermer l'ancienne évite d'afficher le splashscreen entre chaque changement de page
	
	if(this.currentWindow != '') {//Si une fenêtre est déjà ouverte on la ferme
		this.windowStack[this.currentWindow].close();
		this.currentWindow = '';
	}
	
	this.currentWindow = windowName;//On enregistre le nom de la nouvelle fenêtre
};
 
exports.NavigationModule.prototype.closeWindow = function(windowName) {
	this.windowStack[windowName].close();
	this.currentWindow = '';
};

exports.NavigationModule.prototype.getWindow = function(windowName) {
	return this.windowStack[windowName];//Retourne l'objet window de la fenêtre demandée
};