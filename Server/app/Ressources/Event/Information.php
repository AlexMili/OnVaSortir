<?php  

namespace Event;

class Information {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        //header('Content-type: application/json');
        
        if($f3->exists('GET.idEvent') && $f3->exists('GET.secret'))
        {
            $event = new \Event($f3);
            
            $idEvent = intval($f3->get('GET.idEvent'));
            $secret = $f3->get('GET.secret');

            if($back = $event->getInfoEvent($idEvent)) {
                echo json_encode(array('code'=>200, 'data'=>$back[0]));
            }
            else
                echo json_encode(array('code'=>400));//request failed
        }
        else
            echo json_encode(array('code'=>444));//missing
        /*
 Array
(
    [evt_titre], //Titre de l'evenement
    [evt_date], //date de l'evenement au format YYYY-mm-dd hh:mm
    [evt_duree], //duree en minute
    [evt_adresse], //adresse de l'evenement
    [evt_ville], //ville de l'evenement
    [evt_cp], //code postal
    [evt_lieuDit], //nom du lieu de l'evenement
    [evt_maxParticipants], //nombre max de participants
    [evt_description], //description de l'evenement
    [evt_dateCreation], //date de creation de l'evenement
    [evt_deleted], //flag si l'evenement a été supprimé
    [cat_id], //ID de la categorie de l'evenement
    [mem_id], //ID du createur de l'evenement
    [mem_pseudo], //pseudo du createur
    [cat_libelle], //nom de la categorie
    [nbParticipants], //nombre d'inscrit
)
        */
    }

    function put() { }
    function delete() { }

    function post($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('POST.idEvent') && $f3->exists('POST.secret'))
        {
            $event = new \Event($f3);
            
            $idEvent = intval($f3->get('POST.idEvent'));
            $secret = $f3->get('POST.secret');

            if($back = $event->getInfoEvent($idEvent)) {
                echo json_encode(array('code'=>200, 'data'=>$back[0]));
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