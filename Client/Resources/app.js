Ti.include('/modules/varInit.js');

//var creModEvent = new CreModEventView({ idEvent: -1 });

Ti.App.Properties.setInt('idUser',0);
Ti.App.Properties.setString('emailUser','');
Ti.App.Properties.setString('pseudoUser','');

// Each row with a view property when clicked will change to that view (any view works except tabgroups and windows)
// If the row does not have a view property, but the switch event still fires
var data = [
	{ title:'Accueil', hasImage:true, image:'/images/home_28x28.png', view: HomeView },
	{ title:'MES INFOS', isHeader:true },
	{ title:'Profil', hasImage:true, image:'/images/user_28x28.png', view: ProfileView },
	{ title:'SORTIES', isHeader:true },
	{ title:'Créer sortie', hasImage:true, image:'/images/creer-sortie_28x28.png', view: CreModEventView },
	{ title:'Recherche', hasImage:true, image:'/images/recherche_28x28.png', view: SearchEventView }
];

var menu = new MenuView({
	rowData: data
});

var slidingMenu = new MenuController({
	left: menu, // the menu... only accepts a tableview
	draggable: false // set false to only use the API to open / close
});

//slidingMenu.open(); -> à mettre sur l'event click de la connexion/inscription

navigationModule = new NavigationModule();//Nécessaire pour gérer les pages de connexion et d'inscription
var firstScreen = new FirstScreenController();
firstScreen.init(navigationModule);
