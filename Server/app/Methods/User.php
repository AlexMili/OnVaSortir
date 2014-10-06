<?php

class User {

	private $f3;

	function __construct($instanceF3) {
		$this->f3 = $instanceF3;
	}

	/**
	  Connecte un utilisateur au site à partir de son adresse mail.
	 
	  @param $email adresse mail standard
	  @param $mdp mdp hashé en SHA1
	  @return 0 en cas de mauvais mdp, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function connectUserWithMail($email, $mdp) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
        $user->load(array('mem_email=? AND mem_password=?',$email,$mdp));
        return ($user->dry()) ? false : $user;
	}

	/**
	  Connecte un utilisateur au site à partir de son adresse pseudo.
	 
	  @param $pseudo pseudo de l'utilisateur
	  @param $mdp mdp hashé en SHA1
	  @return 0 en cas de mauvais mdp, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function connectUserWithPseudo($pseudo, $mdp) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
        $user->load(array('mem_pseudo=? AND mem_password=?',$pseudo,$mdp));
        return ($user->dry()) ? false : $user;
	}
	/*
		RETIRER LA DEPENDANCE SUR LES DEUX DERNIERS CHAMPS CAR LORS DE L'INSCRIPTION L'UFR N'EST PAS RENSEIGNÉE !!
	*/
	/**
	  Inscrit un utilisateur sur le site.
	 
	  @param $pseudo pseudo de l'utilisateur
	  @param $mdp mdp hashé en SHA1
	  @param $mail adresse mail standard
	  @param $birthDate date de naissance du membre au format mm/dd/YYY hh:mm:ss
	  @return 0 si le mail ou le pseudo sont déjà utilisés, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function signup($pseudo, $email, $mdp, $birthDate) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
		$user->mem_pseudo = $pseudo;
		$user->mem_dateInscription = date('Y-m-d H:i');
		$user->mem_email = $email;
		$user->mem_password = $mdp;
		$user->mem_dateNaissance = $birthDate;
		$user->an_id = 1;
		$user->ufr_id = 1;
		return $user->save();
	}

	/**
	  Test si le mail existe en BDD.
	 
	  @param $email adresse mail standard
	  @return 0 si l'email n'existe pas, -1 en cas d'erreur inconnue et 1 si le mail existe
	*/
	function isEmailExist($email) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
		return $user->load(array('mem_email=?',$email));
	}

	/**
	  Test si le mail est déjà utilisé (lors de la modification).
	 
	  @param $email adresse mail standard
	  @param $idUser l'identifiant unique de l'utilisateur
	  @return 0 si l'email n'existe pas, -1 en cas d'erreur inconnue et 1 si le mail existe
	*/
	function isEmailUsed($idUser, $email) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
        return $user->load(array('mem_email=? AND mem_id<>?',$email, $idUser));
	}

	/**
	  Test si le pseudo existe en BDD.
	 
	  @param $pseudo pseudo de l'utilisateur
	  @return 0 si le pseudo n'existe pas, -1 en cas d'erreur inconnue et 1 si le pseudo existe
	*/
	function isPseudoExist($pseudo) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
        return $user->load(array('mem_pseudo=?',$pseudo));
	}

	/**
	  Test si le pseudo est déjà utilisé (lors de la modification).
	 
	  @param $pseudo pseudo de l'utilisateur
	  @param $idUser l'identifiant unique de l'utilisateur
	  @return 0 si le pseudo n'est pas déjà utilisé, -1 en cas d'erreur inconnue et 1 si le pseudo est déjà utilisé
	*/
	function isPseudoUsed($idUser, $pseudo) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
        return $user->load(array('mem_pseudo=? AND mem_id!=?',$pseudo, $idUser));
	}

	/**
	  Vérifie que le pseudo envoyé correspond bien à son ID
	 
	  @param $pseudo pseudo de l'utilisateur
	  @param $idUser l'identifiant unique de l'utilisateur
	  @return 0 si le pseudo ne correspond pas à l'ID, -1 en cas d'erreur inconnue et 1 si le pseudo correspond
	*/
	function isPseudoMatchId($idUser, $pseudo) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
        $user->load(array('mem_pseudo=? AND mem_id=?',$pseudo,$idUser));
        return ($user->dry()) ? false : $user;
	}

	/**
	  Récupère les informations d'un utilisateur donné.
	 
	  @param $idUser l'identifiant unique de l'utilisateur
	  @return tableau des données de l'utilisateur au format json, 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue
	*/
	function getInfoUser($idUser) {
		return $this->f3->get('db')->exec(
		    array(
		        'SELECT *
				 FROM ' .$this->f3->get('USERdb'). ' AS us
				 JOIN ' .$this->f3->get('LEVELdb'). ' AS l
				 ON us.an_id = l.an_id
				 JOIN ' .$this->f3->get('UFRdb'). ' AS uf
				 ON us.ufr_id = uf.ufr_id
				 WHERE us.mem_id = :ID'
		    ),
		    array(
		        array(':ID'=>$idUser)
		    )
		);
	}

	/**
	  Met à jour les informations obligatoires de l'utilisateur.
	 
	  @param $idUser l'identifiant unique de l'utilisateur
	  @param $pseudo pseudo de l'utilisateur
	  @param $mdp mdp hashé en SHA1
	  @param $mail adresse mail standard
	  @param $birthDate date de naissance du membre au format mm/dd/YYY hh:mm:ss
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	/*function updateInfoUser($idUser, $pseudo, $email, $mdp, $birthDate) {
		//Connexion BDD
		$databaseConnection = database::getConnection();
		//$databaseConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
		$request = $databaseConnection->prepare('UPDATE ' .USERdb. ' SET pseudo=:PSEUDO, email=:EMAIL, password=:PASS, date_naissance=:DATE WHERE id=:ID');
		$request->bindParam(':ID', $idUser, PDO::PARAM_INT);
		$request->bindParam(':PSEUDO', $pseudo,  PDO::PARAM_STR);
		$request->bindParam(':PASS', $mdp, PDO::PARAM_STR);
		$request->bindParam(':EMAIL', $email, PDO::PARAM_STR);
		$request->bindParam(':DATE', $birthDate, PDO::PARAM_STR);
		
		$request->execute();
		
		if(!$request)//Erreur SQL
			return 0;
		elseif($request)//Mise à jour effectuée avec succès
			return 1;
		else //erreur inconnue
			return -1;
	}*/

	/**
	  Met à jour les informations non obligatoires de l'utilisateur.
	 
	  @param $idUser l'identifiant unique de l'utilisateur
	  @param $avatar image de profil de l'utilisateur
	  @param $firstName prénom de l'utilisateur
	  @param $lastName nom de l'utilisateur
	  @param $city ville au format texte de l'utilisateur
	  @param $zipCode code postall de l'utilisateur
	  @param $phoneNumber numéro de téléphone portable de l'utilisateur
	  @param $description mini auto-biographie de l'utilisateur
	  @param $year Niveau d'étude auquel se trouve l'utilisateur
	  @param $ufr UFR de l'utilisateur
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function updateMoreInfoUser($idUser, $avatar, $firstName, $lastName, $city, $zipCode, $phoneNumber, $description, $year, $ufr) {
		//Connexion BDD
		$databaseConnection = database::getConnection();
		$request = $databaseConnection->prepare('UPDATE ' .USERdb. ' SET avatar=:AVATAR, prenom=:FIRSTNAME, nom=:LASTNAME, ville=:CITY, cp=:ZIPCODE, mobile=:PHONE, description=:DESCRIPTION, ovs_annees_id=:YEAR, ovs_ufr_id=:UFR WHERE id=:ID');
		$request->bindParam(':ID', $idUser, PDO::PARAM_INT);
		$request->bindParam(':AVATAR', $avatar, PDO::PARAM_STR);
		$request->bindParam(':FIRSTNAME', $firstName, PDO::PARAM_STR);
		$request->bindParam(':LASTNAME', $lastName, PDO::PARAM_STR);
		$request->bindParam(':CITY', $city, PDO::PARAM_STR);
		$request->bindParam(':ZIPCODE', $zipCode, PDO::PARAM_INT);
		$request->bindParam(':PHONE', $phoneNumber, PDO::PARAM_INT);
		$request->bindParam(':DESCRIPTION', $description, PDO::PARAM_STR);
		$request->bindParam(':YEAR', $year, PDO::PARAM_INT);
		$request->bindParam(':UFR', $ufr, PDO::PARAM_INT);
		
		$request->execute();
		
		if(!$request)//Erreur SQL
			return 0;
		elseif($request)//Mise à jour effectuée avec succès
			return 1;
		else //erreur inconnue
			return -1;
	}

	function updatePassword($idUser, $mdpSHA1) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
		$user->load(array('mem_id=?',$idUser));
		$user->password = $mdpSHA1;
		return $user->save();
	}

	function updateInfoUser($idUser, $pseudo, $email, $birthDate, $avatar, $firstName, $lastName, $city, $zipCode, $phoneNumber, $description, $level, $ufr) {
		$user=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('USERdb'));
		$user->load(array('mem_id=?',$idUser));
		$user->mem_pseudo = $pseudo;
		$user->mem_email = $email;
		$user->mem_dateNaissance = $birthDate;
		$user->mem_avatar = $avatar;
		$user->mem_prenom = $firstName;
		$user->mem_nom = $lastName;
		$user->mem_ville = $city;
		$user->mem_cp = $zipCode;
		$user->mem_mobile = $phoneNumber;
		$user->mem_description = $description;
		$user->an_id = $level;
		$user->ufr_id = $ufr;
		return $user->save();
	}
}
?>