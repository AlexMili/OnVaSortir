<?php  
require_once('../config.php');
require_once('../core/database.class.php');
require_once('../core/fonctions.php');
require_once('../core/event.php');


if(!empty($_POST['id']) && !empty($_POST['secret']))
{
    $id = intval($_POST['id']);
    $secret = secureVar($_POS['secret']);//Hash qui valide l'intégrité des données

    if($back = getInfoEvent($id)) {
        echo json_encode($back);
    }
    else
        echo false;//'error';
}
else
    echo false;//'missing';
?> 