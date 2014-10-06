<?php  

namespace Event;

class Note {
    
    function __construct() { }

    function beforeroute() { }

	function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.idUser') && $f3->exists('GET.idEvent') && $f3->exists('GET.note') && $f3->exists('GET.secret'))
        {
            $event = new \Event($f3);
            
            $idUser=intval($f3->get('GET.idUser'));
            $idEvent = intval($f3->get('GET.idEvent'));
            $noteUser = intval($f3->get('GET.note'));
            $secret = $f3->get('GET.secret');

            if($event->noteUserEvent($idUser, $idEvent, $note)) {
                echo json_encode(array('code'=>200));
            }
            else
                 echo json_encode(array('code'=>400));//request failed
        }
        else
            echo json_encode(array('code'=>444));//missing
	}
    
	function put() { }
	function delete() { }
	function post($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('POST.idUser') && $f3->exists('POST.idEvent') && $f3->exists('POST.note') && $f3->exists('POST.secret'))
        {
            $event = new \Event($f3);
            
            $idUser=intval($f3->get('POST.idUser'));
            $idEvent = intval($f3->get('POST.idEvent'));
            $noteUser = intval($f3->get('POST.note'));
            $secret = $f3->get('POST.secret');

            if($event->noteUserEvent($idUser, $idEvent, $note)) {
                echo json_encode(array('code'=>200));
            }
            else
                 echo json_encode(array('code'=>400));//request failed
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function afterroute() { }

    function __destruct() { }
}
?> 