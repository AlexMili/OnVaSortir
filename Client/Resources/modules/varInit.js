var NavigationModule = require('/modules/NavigationModule').NavigationModule;

/*
 * Modèles
 */
	var GlobalModel = require('/models/GlobalModel');
	var globalModel = new GlobalModel();
	
/*
 * Vues
 */
	// diverses
	var HomeView = require('/views/common/HomeView');
	var MenuView = require('/views/common/MenuView');
	var FirstScreenView = require('/views/common/FirstScreenView');
	var LoginView = require('/views/common/LoginView');
	var SignupView = require('/views/common/SignupView');
	// évènements
	var CreModEventView = require('/views/event/CreModEventView');
	var SearchEventView = require('/views/event/SearchEventView');
	// profil
		//var MyProfileView = require('/views/profile/MyProfileView');
		//var EditPasswordView = require('views/profile/EditPasswordView');
	var ProfileView = require('views/profile/ProfileView');
		//var EditProfile = require('views/profile/EditProfileView');

/*
 * Controllers
 */
	// divers
	var FirstScreenController = require('/controllers/common/FirstScreenController');
	var MenuController = require('/controllers/common/MenuController');
	var LoginController = require('/controllers/common/LoginController');
	var SignupController = require('/controllers/common/SignupController');
	var ButtonMenuController = require('controllers/common/ButtonMenuController');
