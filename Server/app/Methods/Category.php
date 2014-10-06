<?php

class Category {

	private $f3;

	function __construct($instanceF3) {
		$this->f3 = $instanceF3;
	}
	
	/**
	  Récupère la liste des catégories.
	  
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et un tableau de catégorie en cas de succès
	*/
	function getListCategory() {
		return $this->f3->get('db')->exec('SELECT * FROM ' .$this->f3->get('CATEGORYdb'));
	}

	/**
	  Ajoute un nouvel évènement dans la BDD.
	  
	  @param $label
	  @param $image
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function addCategory($label, $image) {
		$category=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('CATEGORYdb'));
		$category->cat_libelle = $label;
		$category->cat_image = $image;
		return $category->save();
	}

	/**
	  Met à jour les informations d'une catégorie.
	  
	  @param $idCategory ID unique de la catégorie
	  @param $image Image d'illustration de la catégorie
	  @return 0 en cas d'erreur lors de la requête SQL, -1 en cas d'erreur inconnue et 1 en cas de succès
	*/
	function updateCategory($idCategory, $label, $image) {
		$category=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('CATEGORYdb'));
		$category->load(array('cat_id=?',$idCategory));
		$category->cat_libelle = $label;
		$category->cat_image = $image;
		return $category->save();
	}

	function isCategoryExist($label) {
		$category=new DB\SQL\Mapper($this->f3->get('db'), $this->f3->get('CATEGORYdb'));
        return $category->load(array('cat_libelle=?',$label));
	}
}
?>