<?php  

namespace Search;

class Date {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.datestart') && $f3->exists('GET.dateend') && $f3->exists('GET.secret')) {
            $search = new \Search($f3);
            $dateStart = $f3->get('GET.datestart');
            $dateEnd = $f3->get('GET.dateend');
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données


            if($back = $search->searchByDate($dateStart, $dateEnd)) {
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
        
        if($f3->exists('POST.datestart') && $f3->exists('POST.dateend') && $f3->exists('POST.secret'))
        {
            $search = new \Search($f3);
            $dateStart = $f3->get('POST.datestart');
            $dateEnd = $f3->get('POST.dateend');
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données


            if($back = $search->searchByDate($dateStart, $dateEnd)) {
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