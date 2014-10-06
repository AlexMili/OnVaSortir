<?php  
require_once('../config.php');
require_once('../core/database.class.php');
require_once('../core/fonctions.php');
require_once('../core/event.php');


if(!empty($_POST['id']) && !empty($_POST['title']) && !empty($_POST['dateEvent']) && !empty($_POST['delay']) && !empty($_POST['adress']) 
    && !empty($_POST['city']) && !empty($_POST['zipCode']) && !empty($_POST['placeName']) && 
    !empty($_POST['maxPeople']) && !empty($_POST['description']) && !empty($_POST['category']) && !empty($_POST['secret']))
{
    $id = intval($_POST['id']);
    $titre = secureVar($_POST['title']);
    $dateEvent = secureVar($_POST['dateEvent']);
    $duree = secureVar($_POST['delay']);
    $adresse = secureVar($_POST['adress']);
    $ville = secureVar($_POST['city']);
    $codePostal = intval($_POST['zipCode']);
    $lieuDit = secureVar($_POST['placeName']);
    $maxParticipants = intval($_POST['maxPeople']);
    $description = secureVar($_POST['description']);
    $idCategorie = intval($_POST['category']);
    $secret = secureVar($_POS['secret']);//Hash qui valide l'intégrité des données

    $formattedDuree = 0;//convertDateHometoSQL('00-00-0000 ' .$duree);
    $formattedDateEvent = convertDateHometoSQL($dateEvent. ' 00:00');
    
    if(updateEvent($id, $titre, $formattedDateEvent, $duree, $adresse, $ville, $codePostal, $lieuDit, $maxParticipants, $description, $idCategorie)) {
        echo 'ok';
    }
    else
        echo 'error';
}
else
    echo 'missing';
?> 