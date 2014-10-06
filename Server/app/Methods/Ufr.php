<?php

class Ufr {

	private $f3;

	function __construct($instanceF3) {
		$this->f3 = $instanceF3;
	}
	
	/**
	  Récupère la liste des catégories.
	  
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et un tableau de catégorie en cas de succès
	*/
	function getListUfr() {
		return $this->f3->get('db')->exec('SELECT * FROM ' .$this->f3->get('UFRdb'));
	}

	/**
	  Ajoute un nouvel évènement dans la BDD.
	  
	  @param $label
	  @param $image
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function addUfr($labelUfr) {
		$ufr=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('UFRdb'));
		$ufr->ufr_libelle = $labelUfr;
		return $ufr->save();
	}

	/**
	  Met à jour les informations d'une catégorie.
	  
	  @param $idUfr ID unique de la catégorie
	  @param $image Image d'illustration de la catégorie
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function updateUfr($idUfr, $labelUfr) {
		$ufr=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('UFRdb'));
		$ufr->load(array('ufr_id=?',$idUfr));
		$ufr->ufr_libelle = $labelUfr;
		return $ufr->save();
	}

	function isUfrExist($labelUfr) {
		$ufr=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('UFRdb'));
        return $ufr->load(array('ufr_libelle=?',$labelUfr));
	}
}
?>