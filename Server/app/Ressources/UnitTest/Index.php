<?php

namespace UnitTest;

class Index {
	function __construct() { }

	function beforeroute() { }

	function index($f3) {
		//echo 'test';
		$test = new \Test;
		//$f3->mock('POST /user/login', array('secret'=>'truc'));
		$event = new \Event;
		/*$test->expect(
			$event->get($f3)=='{"code":444}'
		);*/
$vari='';
ob_start();
$event->Information()->get($f3);
$vari = ob_get_contents();
//echo $vari;
		/*foreach($test->results() as $result) {
			echo 'here:' .$result['text']. '<br/>';

			if($result['status'])
				echo 'pass';
			else
				echo 'fail(' .$result['source']. ')';
		}*/

		//echo $event->get($f3);
		//echo $f3->get('body');
		//echo 'truc';
	}

	function afterroute() { }

	function __destruct() { }
}

?>