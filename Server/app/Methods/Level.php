<?php

class Level {

	private $f3;

	function __construct($instanceF3) {
		$this->f3 = $instanceF3;
	}
	
	/**
	  Récupère la liste des catégories.
	  
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et un tableau de catégorie en cas de succès
	*/
	function getListLevel() {
		return $this->f3->get('db')->exec('SELECT * FROM ' .$this->f3->get('LEVELdb'));
	}

	/**
	  Ajoute un nouvel évènement dans la BDD.
	  
	  @param $label
	  @param $image
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function addLevel($labelLevel) {
		$level=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('LEVELdb'));
		$level->an_libelle = $labelLevel;
		return $level->save();
	}

	/**
	  Met à jour les informations d'une catégorie.
	  
	  @param $idLevel ID unique de la catégorie
	  @param $image Image d'illustration de la catégorie
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function updateLevel($idLevel, $labelLevel) {
		$level=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('LEVELdb'));
		$level->load(array('an_id=?',$idLevel));
		$level->an_libelle = $labelLevel;
		return $level->save();
	}

	function isLevelExist($labelLevel) {
		$level=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('LEVELdb'));
        return $level->load(array('an_libelle=?',$labelLevel));
	}
}
?>