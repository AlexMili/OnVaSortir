<?php  

namespace Level;

class Add {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.label') && $f3->exists('GET.secret'))
        {
            $level = new \Level($f3);
            $label = $f3->get('GET.label');
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données

            if(!$level->isLevelExist($label)) {
                if($back = $level->addLevel($label)) {
                    echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->level_id)));
                }
                else
                    echo json_encode(array('code'=>400));//request failed
            }
            else
                echo json_encode(array('code'=>513));//level already exist
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
            $level = new \Level($f3);
            $label = $f3->get('POST.label');
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données

            if(!$level->isLevelExist($label)) {
                if($back = $level->addLevel($label)) {
                    echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->level_id)));
                }
                else
                    echo json_encode(array('code'=>400));//request failed
            }
            else
                echo json_encode(array('code'=>512));//level already exist
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function afterroute() { }

    function __destruct() { }
}
?>