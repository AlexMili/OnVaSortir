<?php  

namespace Event;

class Users {
    
    function __construct() { }

    function beforeroute() { }

	function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.idEvent') && $f3->exists('GET.secret'))
        {
            $event = new \Event($f3);
            
            $idEvent = intval($f3->get('GET.idEvent'));
            $secret = $f3->get('GET.secret');

            if($back = $event->getUserEvents($idEvent)) {
                echo json_encode(array('code'=>200, 'data'=>$back));
            }
            else
                 echo json_encode(array('code'=>400));//request failed
        }
        else
            echo json_encode(array('code'=>444));//missing
	}
/*

 Array
(
    [0] => Array
        (
            [mem_id]
            [par_dateInscription]
            [mem_pseudo]
        )

)

*/
	function put() { }
	function delete() { }
	function post($f3) {

    }

    function afterroute() { }

    function __destruct() { }
}
?> 