<?php

class Utilities {
	/**
	  Sécurise une variable donnée.
	 
	  @param $string donnée quelquonque
	  @return la chaine sécurisé
	*/
	static function secureVar($string) {
		return htmlentities(strip_tags($string));
	}

	/**
	  Test si le membre est connecté.
		
	  @return true si le membre est connecté, sinon false
	*/
	static function isConnected() {
		if(!empty($_SESSION[')&"_pseudo']) && !empty($_SESSION['àçè-&-mail']) && !empty($_SESSION['à&éè-id']))
			return array($_SESSION[')&"_pseudo'], $_SESSION['àçè-&-mail'], $_SESSION['à&éè-id'], session_id());
		else
			return false;
	}

	/**
	  Test si le mail est bien sous forme standard.
	 
	  @param $email adresse mail
	  @return true si le mail et valide, sinon false
	*/
	static function isValidEmail($email) {
		return filter_var($email, FILTER_VALIDATE_EMAIL);
	}

	/**
	  Convertit une date au format SQL en date Européenne.
	 
	  @param $date date au format SQL
	  @return date au format européen
	*/
	static function convertDateSQLtoHome($date)//YYYY-mm-dd HH:ii:ss to dd/mm/YYYY HH:ii
	{
		if(empty($date))
	        return FALSE;
		else
		{
			$date = explode('-', $date);
			$tempDay = explode(' ', $date[2]);
			$time = explode(':', $tempDay[1]);
			
			$year = $date[0];
			$day = $tempDay[0];
			$month = $date[1];
			
			$hour = $time[0];
			$minutes = $time[1];
			
			$dateBack = $day. '/' .$month. '/' .$year. ' à ' .$hour. 'h';
			
			if($minutes > 0)
				$dateBack .= $minutes;
			
			return $dateBack;
		}
	}

	/**
	  Convertit une date au format Européen en date SQL.
	 
	  @param $date date au format Européen
	  @return date au format SQL
	*/
	static function convertDateHometoSQL($date)//dd/mm/YYYY HH:ii to YYYY-mm-dd HH:ii:ss
	{
		if(empty($date))
	        return FALSE;
		else
		{
			$date = explode('/', $date);
			$tempDay = explode(' ', $date[2]);
			
			
			if(empty($tempDay[1]))
				$time = explode(':',  '00:00:00');
			else
				$time = explode(':', $tempDay[1]);
			
			$year = $tempDay[0];
			$day = $date[0];
			$month = $date[1];
			
			if(strlen($day) < 2)
				$day = '0' .$day;
			
			$hour = $time[0];
			$minutes = $time[1];
			
			$dateBack = $year. '-' .$month. '-' .$day. ' ' .$hour. ':' .$minutes. ':00';
			
			return $dateBack;
		}
	}

	static function getDateDiff($f3, $date1, $date2) {
		$back = $f3->get('db')->exec("SELECT TIMEDIFF('" .$date1. "','" .$date2. "') * 24*60*60 AS dateDiff");
		return $back[0]['dateDiff'];
	}
}
?>