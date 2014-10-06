<?php  

namespace User;

class Pass {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.id') && $f3->exists('GET.mdpSHA1') && $f3->exists('GET.secret'))
        {
            $user = new \User($f3);
            $idUser = intval($f3->get('GET.id'));
            $mdpSHA1 = $f3->get('GET.mdpSHA1');
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données


            if($user->updatePassword($idUser, $_GET['mdpSHA1'])) {
                echo json_encode(array('code'=>200));
            }
            else
                echo json_encode(array('code'=>400));
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function put() { }
    function delete() { }

    function post($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('POST.id') && $f3->exists('POST.mdpSHA1') && $f3->exists('POST.secret'))
        {
            $user = new \User($f3);
            $idUser = intval($f3->get('POST.id'));
            $mdpSHA1 = $f3->get('POST.mdpSHA1');
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données


            if(!$user->updatePassword($idUser, $_GET['mdpSHA1'])) {
                echo json_encode(array('code'=>404));
            }
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function afterroute() { }

    function __destruct() { }
}
?>