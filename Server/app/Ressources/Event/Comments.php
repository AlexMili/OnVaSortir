<?php  

namespace Event;

class Comments {
    
    function __construct() { }

    function beforeroute() { }

	function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.idEvent') && $f3->exists('GET.secret'))
        {
            $comment = new \Comment($f3);
            
            $idEvent = intval($f3->get('GET.idEvent'));
            $idComment = intval($f3->get('GET.idComment'));
            $secret = $f3->get('GET.secret');

            if($back = $comment->getEventComments($idEvent)) {
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
    [0] => Array (
            [com_id]
            [com_texte]
            [com_date]
            [evt_id]
            [mem_id]
            [mem_pseudo]
        )
    [1] => Array (
            [com_id]
            [com_texte]
            [com_date]
            [evt_id]
            [mem_id]
            [mem_pseudo]
        )
    etc ....
)

*/
	function put() { }
	function delete() { }
	function post($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('POST.idEvent') && $f3->exists('POST.secret'))
        {
            $comment = new \Comment($f3);
            
            $idEvent = intval($f3->get('POST.idEvent'));
            $idComment = intval($f3->get('POST.idComment'));
            $secret = $f3->get('POST.secret');

            if($back = $comment->getEventComments($idEvent)) {
                echo json_encode(array('code'=>200, 'data'=>$back));
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