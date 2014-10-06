<?php

class Search {

	private $f3;

	function __construct($instanceF3) {
		$this->f3 = $instanceF3;
	}
	
	function searchByDate($dateStart, $dateEnd) {
		return $this->f3->get('db')->exec(
			array(
				'SELECT evt_id, evt_titre, cat_id, evt_date, evt_dateCreation
				 FROM ' .$this->f3->get('EVENTdb'). ' 
				 WHERE evt_date >= :DATESTART
				 AND evt_date <= :DATEEND'
			),
			array(
				array(':DATESTART'=>$dateStart, ':DATEEND'=>$dateEnd)
			)
		);
	}

	function searchByCity($zipCode) {
		return $this->f3->get('db')->exec(
			array(
				'SELECT evt_id, evt_titre, cat_id, evt_date, evt_ville, evt_cp
				 FROM ' .$this->f3->get('EVENTdb'). ' 
				 WHERE evt_cp = :ZIPCODE'
			),
			array(
				array(':ZIPCODE'=>$zipCode)
			)
		);
	}

	function searchByCategory($category) {
		return $this->f3->get('db')->exec(
			array(
				'SELECT evt_id, evt_titre, cat_id, evt_date, evt_ville, evt_cp
				 FROM ' .$this->f3->get('EVENTdb'). ' 
				 WHERE cat_id = :CATEGORY'
			),
			array(
				array(':CATEGORY'=>$category)
			)
		);
	}

	/*function searchByPeople() {

	}*/
}
?>