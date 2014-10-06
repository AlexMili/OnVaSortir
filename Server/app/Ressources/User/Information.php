<?php  

namespace User;

class Information {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.id') && $f3->exists('GET.secret'))
        {
            $user = new \User($f3);
            $idUser = $f3->get('GET.id');//user id
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données

            if($back = $user->getInfoUser($idUser)) {
                echo json_encode(array('code'=>200, 'data'=>$back[0]));
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
        
        if($f3->exists('POST.id') && $f3->exists('POST.secret'))
        {
            $user = new \User($f3);
            $idUser = $f3->get('POST.id');//user id
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données

            if($back = $user->getInfoUser($idUser)) {
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