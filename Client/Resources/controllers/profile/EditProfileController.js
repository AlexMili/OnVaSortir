var ProfileModel = require('../../models/profile/ProfileModel');
var ProfileModel = new ProfileModel();



var EditProfileController = function(args) {
		
		var id=6;
		//recupération des information
		ProfileModel.getInfosMyProfile(id,function(infos){
			pseudo=infos.mem_pseudo;
			
			dateInscription=infos.mem_dateInscription;
			email=infos.mem_email;
			password =infos.mem_password;
		//	pseudo=infos.mem_pseudo;
			dateNaissance=infos.mem_dateNaissance;
			nom=infos.mem_nom;
			prenom=infos.mem_prenom;
			ville=infos.mem_ville;
			cp=infos.mem_cp;
			description=infos.mem_description;
			
			
			libellean=infos.an_libelle;
			libelleufr=infos.ufr_libelle;
			
			
		});
		
			
                    



 //passage des nouvel valeur au model pour la mise à jour des information user dans la base lorsqu'on click  sur le bouton valider
 	args.myProfileFields['editProfileButton'].addEventListener('click',function(){

			
	 ProfileModel.newInformationProfile(args.myProfileFields['pseudo'].value,args.myProfileFields['nom'].value,
	 					args.myProfileFields['prenom'].value,args.myProfileFields['dateNaissance'].value,
	 					args.myProfileFields['mail'].value,args.myProfileFields['Ville'].value,
	 					args.myProfileFields['codePostal'].value,
	 					args.myProfileFields['staticDescription'].value,
	 					args.myProfileFields['telephone'].value,args.myProfileFields['ufr'].value,
	 					 args.myProfileFields['annee'].value
	 					 );
	 		alert("votre profil a été mis à jour");
});
	
	
	
	//retour à la vue Profile 
	args.myProfileFields['backButton'].addEventListener('click',function(){
			slidingMenu.hideActiveView();
			slidingMenu.showAView(new ProfileView);	
});

};



module.exports = EditProfileController;