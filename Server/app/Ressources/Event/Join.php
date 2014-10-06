<?php  

namespace Event;

class Join {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.idUser') && $f3->exists('GET.idEvent') && $f3->exists('GET.secret'))
        {
            $event = new \Event($f3);
            
            $idUser=intval($f3->get('GET.idUser'));
            $idEvent = intval($f3->get('GET.idEvent'));
            $secret = $f3->get('GET.secret');

            if($event->isPlaceAvailable($idEvent)) {
                if(!$event->isRegistered($idUser, $idEvent)) {
                    if($event->addPersonToEvent($idUser, $idEvent)) {
                        echo json_encode(array('code'=>200));
                    }
                    else
                        echo json_encode(array('code'=>400));//request failed
                }
                else
                    echo json_encode(array('code'=>507));//already signed up
            }
            else
                echo json_encode(array('code'=>506));//no place available
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function put() { }
    function delete() { }

    function post($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('POST.idUser') && $f3->exists('POST.idEvent') && $f3->exists('POST.secret'))
        {
            $event = new \Event($f3);
            
            $idUser=intval($f3->get('POST.idUser'));
            $idEvent = intval($f3->get('POST.idEvent'));
            $secret = $f3->get('POST.secret');

            if($event->isPlaceAvailable($idEvent)) {
                if(!$event->isRegistered($idUser, $idEvent)) {
                    if($event->addPersonToEvent($idUser, $idEvent)) {
                        echo json_encode(array('code'=>200));
                    }
                    else
                        echo json_encode(array('code'=>400));//request failed
                }
                else
                    echo json_encode(array('code'=>507));//already signed up
            }
            else
                echo json_encode(array('code'=>506));//no place available
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function afterroute() { }

    function __destruct() { }
}
?> 