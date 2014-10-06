<?php  

namespace Ufr;

class Add {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.label') && $f3->exists('GET.secret'))
        {
            $ufr = new \Ufr($f3);
            $label = $f3->get('GET.label');
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données

            if(!$ufr->isUfrExist($label)) {
                if($back = $ufr->addUfr($label)) {
                    echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->ufr_id)));
                }
                else
                    echo json_encode(array('code'=>400));//request failed
            }
            else
                echo json_encode(array('code'=>512));//ufr already exist
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function put() { }
    function delete() { }

    function post($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('POST.label') && $f3->exists('POST.secret'))
        {
            $ufr = new \Ufr($f3);
            $label = $f3->get('POST.label');
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données

            if(!$ufr->isUfrExist($label)) {
                if($back = $ufr->addUfr($label)) {
                    echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->ufr_id)));
                }
                else
                    echo json_encode(array('code'=>400));//request failed
            }
            else
                echo json_encode(array('code'=>512));//ufr already exist
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function afterroute() { }

    function __destruct() { }
}
?>