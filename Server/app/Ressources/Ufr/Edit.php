<?php  

namespace Ufr;

class Edit {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.id') && $f3->exists('GET.label') && $f3->exists('GET.secret'))
        {
            $ufr = new \Ufr($f3);
            $idUfr = intval($f3->get('GET.id'));
            $label = $f3->get('GET.label');
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données

            if($ufr->updateUfr($idUfr, $label)) {
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
        
        if($f3->exists('POST.id') && $f3->exists('POST.label') && $f3->exists('POST.secret'))
        {
            $ufr = new \Ufr($f3);
            $idUfr = intval($f3->get('POST.id'));
            $label = $f3->get('POST.label');
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données

            if($ufr->updateUfr($idUfr, $label)) {
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