var ProfileModel = require('../../models/profile/ProfileModel');
var ProfileModel = new ProfileModel();

//pour charger la vue de l'edition'
var EditProfileView =require('../../views/profile/EditProfileView');


var ProfileController = function(args) {
		
		
		
		var id=6;
		//on recupére les information depuis le model en lui passant l'id'
		ProfileModel.getInfosMyProfile(id,function(infos){
			pseudo=infos.mem_pseudo;
			
			dateInscription=infos.mem_dateInscription;
			email=infos.mem_email;
			password =infos.mem_password;
			
			dateNaissance=infos.mem_dateNaissance;
			nom=infos.mem_nom;
			prenom=infos.mem_prenom;
			ville=infos.mem_ville;
			cp=infos.mem_cp;
			dateInscription=infos.mem_dateInscription
			description=infos.mem_description;
			tel=infos.mem_mobile;
			
			libellean=infos.an_libelle;
			libelleufr=infos.ufr_libelle;
			
			//affichage des information sur la vue profile
			args.profileFields['pseudo'].value=pseudo;
			
			args.profileFields['nom'].value=nom;
			
			args.profileFields['prenom'].value=prenom;
			
			args.profileFields['dateTimeInscription'].value=dateInscription;
			
			args.profileFields['mail'].value=email;
			
			args.profileFields['dateNaissance'].value=dateNaissance;
			
			args.profileFields['ville'].value=ville;
			
			args.profileFields['codePostal'].value=cp;
			
			args.profileFields['telephone'].value=tel
			args.profileFields['ufr'].value=libelleufr;
			args.profileFields['annee'].value=libelleann;
			args.profileFields['staticDescription'].value=description
			/*
			args.essaiFields['profile'].value="Pseudo :\n" +pseudo+
			"\n Nom :\n" +nom + 
			"\n Prénom :\n" + prenom +
			"\n Email :\n"+email +
			"\n Mobile :\n"+tel +
			"\n Date de Naissance :\n"+dateNaissance +
			"\n Ville :\n"+ville +
			"\n Code Postale : \n"+cp+
			"\n Description :\n"+ description ;
		*/
		});


//chargement de la vue pour afficher la vue editprofile
args.profileFields['editProfileButton'].addEventListener('click',function(){

			slidingMenu.hideActiveView();
			slidingMenu.showAView(new EditProfileView);
	
	
	});


	
	
		
		
		
}

module.exports = ProfileController;