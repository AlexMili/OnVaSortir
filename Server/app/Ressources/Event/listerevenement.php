<?php  
require_once('../config.php');
require_once('../core/database.class.php');
require_once('../core/fonctions.php');
require_once('../core/event.php');


if(!empty($_POST['secret']))
{
    $secret = secureVar($_POS['secret']);//Hash qui valide l'intégrité des données

    if($back = getListEvent()) {
        echo json_encode($back);
    }
    else
        echo false;//500;//error
}
else
    echo false;//444;//missing
?> 