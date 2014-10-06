<?php  

namespace Comment;

class Delete {
    
    function __construct() { }

    function beforeroute() { }

	function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.idUser') && $f3->exists('GET.idEvent') && $f3->exists('GET.idComment') && $f3->exists('GET.secret'))
        {
            $event = new \Event($f3);
            $comment = new \Comment($f3);
            
            $idUser=intval($f3->get('GET.idUser'));
            $idEvent = intval($f3->get('GET.idEvent'));
            $idComment = intval($f3->get('GET.idComment'));
            $secret = $f3->get('GET.secret');

            if($event->isRegistered($idUser, $idEvent)) {
                if($comment->deleteComment($idUser, $idEvent, $idComment)) {
                    echo json_encode(array('code'=>200));
                }
                else
                     echo json_encode(array('code'=>400));//request failed
            }
            else
                echo json_encode(array('code'=>508));//no signed up
        }
        else
            echo json_encode(array('code'=>444));//missing
	}

	function put() { }
	function delete() { }
	function post($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('POST.idUser') && $f3->exists('POST.idEvent') && $f3->exists('POST.idComment') && $f3->exists('POST.secret'))
        {
            $event = new \Event($f3);
            $comment = new \Comment($f3);
            
            $idUser=intval($f3->get('POST.idUser'));
            $idEvent = intval($f3->get('POST.idEvent'));
            $idComment = intval($f3->get('POST.idComment'));
            $secret = $f3->get('POST.secret');

            if($event->isRegistered($idUser, $idEvent)) {
                if($comment->deleteComment($idUser, $idEvent, $idComment)) {
                    echo json_encode(array('code'=>200));
                }
                else
                     echo json_encode(array('code'=>400));//request failed
            }
            else
                echo json_encode(array('code'=>508));//no signed up
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function afterroute() { }

    function __destruct() { }
}
?> 