<?php

class Event {

	private $f3;

	function __construct($instanceF3) {
		$this->f3 = $instanceF3;
	}

	/**
	  Récupère la liste des prochaines sorties.
	  
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et un tableau d'évènements en cas de succès
	*/
	function getListEvent() {
		//Connexion BDD
		$databaseConnection = database::getConnection();
		$request = $databaseConnection->prepare('SELECT titre, evt_id  FROM ' .EVENTdb);
		
		$request->execute();
		
		$requestResult = $request->fetchAll();
		
		if(!$request || empty($requestResult))//Erreur SQL
			return 0;
		elseif($request)//Mise à jour effectuée avec succès
			return $requestResult;
		else //erreur inconnue
			return -1;
		}
	/**
	  Récupère la liste des prochaines sorties.
	  
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et un tableau contenant les informations de l'évènements en cas de succès
	*/
	function getInfoEvent($idEvent) {
		return $this->f3->get('db')->exec(
			array(
				'SELECT 
				e.evt_titre, 
				e.evt_date, 
				e.evt_duree, 
				e.evt_adresse, 
				e.evt_ville, 
				e.evt_cp, 
				e.evt_lieuDit, 
				e.evt_maxParticipants, 
				e.evt_description, 
				e.evt_dateCreation, 
				e.evt_deleted, 
				e.cat_id, 
				e.mem_id, 
				m.mem_pseudo,
				c.cat_libelle,
				COUNT(p.evt_id) AS nbParticipants,
				(
				    SELECT COUNT(co.evt_id)
				    FROM ' .$this->f3->get('COMMENTdb'). ' AS co
				    WHERE co.evt_id=:IDEVENT2
					GROUP BY co.evt_id
				) AS nbCommentaires
				FROM ' .$this->f3->get('EVENTdb'). ' AS e
				JOIN ' .$this->f3->get('CATEGORYdb'). ' AS c
				ON e.cat_id = c.cat_id
				JOIN ' .$this->f3->get('USERdb'). ' AS m
				ON e.mem_id = m.mem_id
				JOIN ' .$this->f3->get('PARTICIPATEdb'). ' AS p
				ON p.evt_id=e.evt_id
				WHERE e.evt_id=:IDEVENT'
			),
			array(
				array(':IDEVENT'=>$idEvent, ':IDEVENT2'=>$idEvent)
			)
		);
	}

	/**
	  Ajoute un nouvel évènement dans la BDD.
	  
	  @param $title
	  @param $dateEvent
	  @param $delay
	  @param $adress
	  @param $city
	  @param $zipCode
	  @param $placeName
	  @param $maxPeople
	  @param $description
	  @param $creationDate
	  @param $category
	  @param $creater
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
    function addEvent($titre, $dateEvent, $duree, $adresse, $ville, $codePostal, $lieuDit, $maxParticipants, $description, $idCategorie, $idOrganisateur) {
		$event=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('EVENTdb'));
		$event->evt_titre = $titre;
		$event->evt_date = $dateEvent;
		$event->evt_duree = $duree;
		$event->evt_adresse = $adresse;
		$event->evt_ville = $ville;
		$event->evt_cp = $codePostal;
		$event->evt_lieuDit = $lieuDit;
		$event->evt_maxParticipants = $maxParticipants;
		$event->evt_description = $description;
		$event->evt_dateCreation = date('Y-m-d H:i');
		$event->evt_deleted = 0;
		$event->cat_id = $idCategorie;
		$event->mem_id = $idOrganisateur;
		return $event->save();
	}

	/**
	  Met à jour un évènement dans la BDD.
	  
	  @param $title
	  @param $dateEvent
	  @param $delay
	  @param $adress
	  @param $city
	  @param $zipCode
	  @param $placeName
	  @param $maxPeople
	  @param $description
	  @param $category
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
    function updateEvent($idEvent, $titre, $dateEvent, $duree, $adresse, $ville, $codePostal, $lieuDit, $maxParticipants, $description, $idCategorie) {
		$event=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('EVENTdb'));
		$event->load(array('evt_id=?', $idEvent));
		$event->evt_titre = $titre;
		$event->evt_date = $dateEvent;
		$event->evt_duree = $duree;
		$event->evt_adresse = $adresse;
		$event->evt_ville = $ville;
		$event->evt_cp = $codePostal;
		$event->evt_lieuDit = $lieuDit;
		$event->evt_maxParticipants = $maxParticipants;
		$event->evt_description = $description;
		$event->cat_id = $idCategorie;
		return $event->save();
	}

	/**
	  Retourne le nombre de participant à un événément.
	  
	  @param $idEvent ID unique de l'évènement
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et le nombre de participants en cas de succès
	*/
	function getNbParticipant($idEvent) {
		$back = $this->f3->get('db')->exec(
		    array(
		        'SELECT COUNT(mem_id) AS nb
				 FROM ' .$this->f3->get('PARTICIPATEdb'). '
				 WHERE evt_id=:EVENTID'
		    ),
		    array(
		        array(':EVENTID'=>$idEvent)
		    )
		);
		return $back[0]['nb'];
	}

	function getMaxPeople($idEvent) {
		$back = $this->f3->get('db')->exec(
		    array(
		        'SELECT evt_maxParticipants AS nb
				 FROM ' .$this->f3->get('EVENTdb'). '
				 WHERE evt_id=:EVENTID'
		    ),
		    array(
		        array(':EVENTID'=>$idEvent)
		    )
		);
		return $back[0]['nb'];
	}

	/**
	  
	  
	  @param $idEvent ID unique de l'évènement
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et le nombre de participants en cas de succès
	*/
	function isRegistered($idUser, $idEvent) {
		$person=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('PARTICIPATEdb'));
		return $person->load(array('mem_id=? AND evt_id=?', $idUser, $idEvent));
	}

	/**
	  
	  
	  @param $idEvent ID unique de l'évènement
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et le nombre de participants en cas de succès
	*/
	function isPlaceAvailable($idEvent) {
		return ($this->getNbParticipant($idEvent) < $this->getMaxPeople($idEvent)) ? true : false;
	}

	/**
	  Ajoute un participant à un évènement.
	  
	  @param $idUser ID unique de l'utilisateur à ajouter à l'évènement
	  @param $idEvent ID unique de l'évènement
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function addPersonToEvent($idUser, $idEvent) {
		$person=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('PARTICIPATEdb'));
		$person->mem_id = $idUser;
		$person->evt_id = $idEvent;
		$person->par_dateInscription = date('Y-m-d H:i');
		$person->par_participated = 0;
		return $person->save();
	}

	/**
	  Désinscrit un participant à un évènement.
	  
	  @param $idUser ID unique de l'utilisateur
	  @param $idEvent ID unique de l'évènement
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function removePersonToEvent($idUser, $idEvent) {
		$person=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('PARTICIPATEdb'));
		$person->load(array('evt_id=? AND mem_id=?', $idEvent, $idUser));
		return $person->erase();
	}

	function getDateEvent($idEvent) {
		$back = $this->f3->get('db')->exec(
		    array(
		        'SELECT evt_date
				 FROM ' .$this->f3->get('EVENTdb'). '
				 WHERE evt_id=:EVENTID'
		    ),
		    array(
		        array(':EVENTID'=>$idEvent)
		    )
		);
		return $back[0]['evt_date'];
	}

	function isCreater($idUser, $idEvent) {
		$event=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('EVENTdb'));
		return $event->load(array('mem_id=? AND evt_id=?', $idUser, $idEvent));
	}

	function isEventExist($idEvent) {
		$event=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('EVENTdb'));
		return $event->load(array('evt_id=?', $idEvent));
	}

	/**
	  Annule un événement
	  
	  @param $idEvent ID unique de l'évènement
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function cancelEvent($idEvent) {
		$event=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('EVENTdb'));
		$event->load(array('evt_id=?', $idEvent));
		$event->evt_deleted=1;
		return $event->save();
	}

	function getEventUsers($idEvent) {
		$event=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('PARTICIPATEdb'));
		return $event->find(array('evt_id=?', $idEvent));
	}

	function noteUserEvent($idUser, $idEvent, $note) {
		$event=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('PARTICIPATEdb'));
		$event->load(array('evt_id=? AND mem_id=?', $idEvent, $idUser));
		$event->par_participated=$note;
		return $event->save();
	}

	/**
	  Récupère la liste des événements créés par le membre donné.
	  
	  @param $idUser ID unique de l'utilisateur
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et un tableau d'événements en cas de succès
	*/
	function getUserEvents($idEvent) {
		return $this->f3->get('db')->exec(
			array(
				'SELECT 
				 p.mem_id,
				 p.par_dateInscription,
				 m.mem_pseudo
				 FROM ' .$this->f3->get('PARTICIPATEdb'). ' AS p
				 JOIN ' .$this->f3->get('USERdb'). ' AS m
				 ON p.mem_id = m.mem_id
				 WHERE p.evt_id=:EVENTID'
			),
			array(
				array(':EVENTID'=>$idEvent)
			)
		);
	}
}
?>