<?php  

namespace Search;

class Category {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.idcategory') && $f3->exists('GET.secret'))
        {
            $search = new \Search($f3);
            $idCategory = intval($f3->get('GET.idcategory'));
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données


            if($back = $search->searchByCategory($idCategory)) {
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
        
        if($f3->exists('POST.idcategory') && $f3->exists('POST.secret'))
        {
            $search = new \Search($f3);
            $idCategory = intval($f3->get('POST.idcategory'));
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données


            if($back = $search->searchByCategory($idCategory)) {
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