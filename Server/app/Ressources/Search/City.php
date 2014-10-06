<?php  

namespace Search;

class City {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.zipcode') && $f3->exists('GET.secret'))
        {
            $search = new \Search($f3);
            $zipCode = intval($f3->get('GET.zipcode'));
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données


            if($back = $search->searchByCity($zipCode)) {
                echo json_encode(array('code'=>200, 'data'=>$back));
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
        
        if($f3->exists('POST.zipcode') && $f3->exists('POST.secret'))
        {
            $search = new \Search($f3);
            $zipCode = intval($f3->get('POST.zipcode'));
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données


            if($back = $search->searchByCity($zipCode)) {
                echo json_encode(array('code'=>200, 'data'=>$back));
            }
            else
                echo json_encode(array('code'=>400));
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function afterroute() { }

    function __destruct() { }
}
?>