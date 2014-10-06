<?php

class Comment {

	private $f3;

	function __construct($instanceF3) {
		$this->f3 = $instanceF3;
	}
	
	/**
	  Récupère la liste des catégories.
	  
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et un tableau de catégorie en cas de succès
	*/
	function getEventComments($idEvent) {
		return $this->f3->get('db')->exec(
			array(
				'SELECT 
				 c.com_id,
				 c.com_texte,
				 c.com_date,
				 c.evt_id,
				 c.mem_id,
				 m.mem_pseudo
				 FROM ' .$this->f3->get('COMMENTdb'). ' AS c
				 JOIN ' .$this->f3->get('USERdb'). ' AS m
				 ON c.mem_id = m.mem_id
				 WHERE c.evt_id=:EVENTID
				 ORDER BY c.com_date ASC'
			),
			array(
				array(':EVENTID'=>$idEvent)
			)
		);
	}

	/**
	  Ajoute un nouvel évènement dans la BDD.
	  
	  @param $label
	  @param $image
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function addCommentToEvent($idUser, $idEvent, $text) {
		$comment=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('COMMENTdb'));
		$comment->com_texte = $text;
		$comment->com_date = date('Y-m-d H:i');
		$comment->com_deleted = 0;
		$comment->evt_id = $idEvent;
		$comment->mem_id = $idUser;
		return $comment->save();
	}

	/**
	  Met à jour les informations d'une catégorie.
	  
	  @param $idCategory ID unique de la catégorie
	  @param $image Image d'illustration de la catégorie
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function deleteComment($idUser, $idEvent, $idComment) {
		return $this->f3->get('db')->exec(
			array(
				'UPDATE ' .$this->f3->get('COMMENTdb'). ' 
				 SET com_texte="" 
				 AND com_deleted=1 
				 WHERE com_id=:COMID 
				 AND mem_id=:USERID 
				 AND evt_id=:EVENTID'
			),
			array(
				array(':COMID'=>$idComment, ':USERID'=>$idUser, ':EVENTID'=>$idEvent)
			)
		);
	}
}
?>