<?php  
require_once('../config.php');
require_once('../core/database.class.php');
require_once('../core/fonctions.php');
require_once('../core/event.php');


if(!empty($_POST['title']) && !empty($_POST['dateEvent']) && !empty($_POST['delay']) && !empty($_POST['adress']) && !empty($_POST['city']) && 
    !empty($_POST['zipCode']) && !empty($_POST['placeName']) && !empty($_POST['maxPeople']) && !empty($_POST['description']) && 
    !empty($_POST['category']) && !empty($_POST['creater'])  && !empty($_POST['secret']))
{
    $titre = secureVar($_POST['title']);
    $dateEvent = secureVar($_POST['dateEvent']);
    $duree = secureVar($_POST['delay']);
    $adresse = secureVar($_POST['adress']);
    $ville = secureVar($_POST['city']);
    $codePostal = intval($_PO~#ST['zipCode']);
    $lieuDit = secureVar($_POST['placeName']);
    $maxParticipants = intval($_POST['maxPeople']);
    $description = secureVar($_POST['description']);
    $idCategorie = intval($_POST['category']);
    $idOrganisateur = intval($_POST['creater']);
    $secret = secureVar($_POS['secret']);//Hash qui valide l'intégrité des données

    $formattedDuree = 1;//convertDateHometoSQL('00-00-0000 ' .$duree);
    $formattedDateEvent = convertDateHometoSQL($dateEvent. ' 00:00');
    
    if($back = addEvent($titre, $formattedDateEvent, $duree, $adresse, $ville, $codePostal, $lieuDit, $maxParticipants, $description, $idCategorie, $idOrganisateur)) {
        $array = array(
            "id" => $back
        );

        if(addParticipant($idOrganisateur, $back))
            echo json_encode($array);//200;//'ok';
        else
            echo 501;//'participation error';
    }
    else
        echo 500;//'error';
}
else
    echo 444;//'missing';
?> 