<?php  

namespace Event;

class Quit {
    
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

            if($event->isEventExist($idEvent)) {
                if($dateEvent = $event->getDateEvent($idEvent)) {
                    $dateDiff = \Utilities::getDateDiff($f3, $dateEvent, date('Y-m-d H:i'));
                    //20736000000 -> 24h
                    if($dateDiff >= 20736000000) {
                        if($event->isRegistered($idUser, $idEvent)) {
                            if(!$event->isCreater($idUser, $idEvent)) {
                                if($event->removePersonToEvent($idUser, $idEvent)) {
                                    echo json_encode(array('code'=>200));
                                }
                                else
                                    echo json_encode(array('code'=>400));//request failed
                            }
                            else
                                echo json_encode(array('code'=>510));//no possible for the creater
                        }
                        else
                            echo json_encode(array('code'=>508));//no signed up
                    }
                    else
                        echo json_encode(array('code'=>509));//24h before
                }
                else
                    echo json_encode(array('code'=>600));//Erreur de type inconnue lors de la récupération de la date de l'event
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
        
        if($f3->exists('POST.idUser') && $f3->exists('POST.idEvent') && $f3->exists('POST.secret'))
        {
            $event = new \Event($f3);
            
            $idUser=intval($f3->get('POST.idUser'));
            $idEvent = intval($f3->get('POST.idEvent'));
            $secret = $f3->get('POST.secret');

            if($event->isEventExist($idEvent)) {
                if($dateEvent = $event->getDateEvent($idEvent)) {
                    $dateDiff = \Utilities::getDateDiff($f3, $dateEvent, date('Y-m-d H:i'));
                    //20736000000 -> 24h
                    if($dateDiff >= 20736000000) {
                        if($event->isRegistered($idUser, $idEvent)) {
                            if(!$event->isCreater($idUser, $idEvent)) {
                                if($event->removePersonToEvent($idUser, $idEvent)) {
                                    echo json_encode(array('code'=>200));
                                }
                                else
                                    echo json_encode(array('code'=>400));//request failed
                            }
                            else
                                echo json_encode(array('code'=>510));//no possible for the creater
                        }
                        else
                            echo json_encode(array('code'=>508));//no signed up
                    }
                    else
                        echo json_encode(array('code'=>509));//24h before
                }
                else
                    echo json_encode(array('code'=>600));//Erreur de type inconnue lors de la récupération de la date de l'event
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