<?php  

namespace Level;

class Listing {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.secret'))
        {
            $level = new \Level($f3);
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données

            if($back = $level->getListLevel()) {
                echo json_encode(array('code'=>200, 'data'=>$back));
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
        
        if($f3->exists('POST.secret'))
        {
            $level = new \Level($f3);
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données

            if($back = $level->getListLevel()) {
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