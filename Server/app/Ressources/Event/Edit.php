<?php  

namespace Event;

class Edit {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('POST.id') && $f3->exists('GET.title') && $f3->exists('GET.dateEvent') && $f3->exists('GET.delay') && $f3->exists('GET.address') && $f3->exists('GET.city') && 
    $f3->exists('GET.zipCode') && $f3->exists('GET.placeName') && $f3->exists('GET.maxPeople') && $f3->exists('GET.description') && $f3->exists('GET.category') && $f3->exists('GET.secret'))
        {
            $event = new \Event($f3);
            
            $idEvent=intval($f3->get('GET.id'));
            $title = $f3->get('GET.title');
            $dateEvent = $f3->get('GET.dateEvent');
            $delay = intval($f3->get('GET.delay'));
            $address = $f3->get('GET.address');
            $city = $f3->get('GET.city');
            $zipCode = intval($f3->get('GET.zipCode'));
            $placeName = $f3->get('GET.placeName');
            $maxPeople = intval($f3->get('GET.maxPeople'));
            $description = $f3->get('GET.description');
            $idCategory = intval($f3->get('GET.category'));

            $formattedDateEvent = \Utilities::convertDateHometoSQL($dateEvent);
            
            if($back = $event->updateEvent($idEvent, $title, $formattedDateEvent, $delay, $address, $city, $zipCode, $placeName, $maxPeople, $description, $idCategory)) {
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
        
        if($f3->exists('POST.id') && $f3->exists('POST.title') && $f3->exists('POST.dateEvent') && $f3->exists('POST.delay') && $f3->exists('POST.address') && $f3->exists('POST.city') && 
    $f3->exists('POST.zipCode') && $f3->exists('POST.placeName') && $f3->exists('POST.maxPeople') && $f3->exists('POST.description') && $f3->exists('POST.category') && $f3->exists('POST.secret'))
        {
            $event = new \Event($f3);
            
            $idEvent=intval($f3->get('POST.id'));
            $title = $f3->get('POST.title');
            $dateEvent = $f3->get('POST.dateEvent');
            $delay = intval($f3->get('POST.delay'));
            $address = $f3->get('POST.address');
            $city = $f3->get('POST.city');
            $zipCode = intval($f3->get('POST.zipCode'));
            $placeName = $f3->get('POST.placeName');
            $maxPeople = intval($f3->get('POST.maxPeople'));
            $description = $f3->get('POST.description');
            $idCategory = intval($f3->get('POST.category'));

            $formattedDateEvent = \Utilities::convertDateHometoSQL($dateEvent);
            
            if($back = $event->updateEvent($idEvent, $title, $formattedDateEvent, $delay, $address, $city, $zipCode, $placeName, $maxPeople, $description, $idCategory)) {
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