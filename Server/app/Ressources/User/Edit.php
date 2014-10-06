<?php  

namespace User;

class Edit {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.id')
         && $f3->exists('GET.newpseudo')
         //&& $f3->exists('GET.oldpseudo')
         //&& $f3->exists('GET.mdpSHA1')
         && $f3->exists('GET.email')
         && $f3->exists('GET.birthdate')
         && $f3->exists('GET.avatar')
         && $f3->exists('GET.firstname')
         && $f3->exists('GET.lastname')
         && $f3->exists('GET.city')
         && $f3->exists('GET.zip')
         && $f3->exists('GET.phone')
         && $f3->exists('GET.description')
         && $f3->exists('GET.level')
         && $f3->exists('GET.ufr')
         && $f3->exists('GET.secret'))
        {
            $user = new \User($f3);
            $idUser = intval($f3->get('GET.id'));
            $pseudo = $f3->get('GET.newpseudo');
            //$oldPseudo = $f3->get('GET.oldpseudo');
            //$mdpSHA1 = $f3->get('GET.mdpSHA1');
            $email = $f3->get('GET.email');
            $birthDate = $f3->get('GET.birthdate');
            $avatar = $f3->get('GET.avatar');
            $firstName = $f3->get('GET.firstname');
            $lastName = $f3->get('GET.lastname');
            $city = $f3->get('GET.city');
            $zipCode = intval($f3->get('GET.zip'));
            $phoneNumber = $f3->get('GET.phone');
            $description = $f3->get('GET.description');
            $level = intval($f3->get('GET.level'));
            $ufr = intval($f3->get('GET.ufr'));
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données

            if(isset($_GET['mdpSHA1'])) {
                if(!$user->updatePassword($idUser, $_GET['mdpSHA1'])) {
                    echo json_encode(array('code'=>404));
                    exit(0);
                }
            }

            if(\Utilities::isValidEmail($email)) {
                //print_r($user->isEmailUsed($idUser, $email));
                if(!$user->isEmailUsed($idUser, $email)){//Test si l'adresse email n'est pas déjà utilisée par un autre utilisateur
                    if(!$user->isPseudoUsed($idUser, $pseudo)){//Test si le pseudo est déjà utilisé par un autre membre
                        $formattedDate = \Utilities::convertDateHometoSQL($birthDate. ' 00:00');//dd/mm/YYYY HH:ii to YYYY-mm-dd HH:ii:ss

                        if($back = $user->updateInfoUser($idUser, $pseudo, $email, $birthDate, $avatar, $firstName, $lastName, $city, $zipCode, $phoneNumber, $description, $level, $ufr)) {
                            echo json_encode(array('code'=>200));
                        }
                        else
                            echo json_encode(array('code'=>405));
                    }
                    else
                        echo json_encode(array('code'=>503));//pseudo already used
                }
                else
                    echo json_encode(array('code'=>504));//mail already used
            }
            else
                echo json_encode(array('code'=>501));//mail format error
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function put() { }
    function delete() { }

    function post($f3) {
       header('Content-type: application/json');
        
        if($f3->exists('POST.id')
         && $f3->exists('POST.pseudo')
         //&& $f3->exists('POST.oldpseudo')
         //&& $f3->exists('POST.mdpSHA1')
         && $f3->exists('POST.email')
         && $f3->exists('POST.birthdate')
         && $f3->exists('POST.avatar')
         && $f3->exists('POST.firstname')
         && $f3->exists('POST.lastname')
         && $f3->exists('POST.city')
         && $f3->exists('POST.zip')
         && $f3->exists('POST.phone')
         && $f3->exists('POST.description')
         && $f3->exists('POST.level')
         && $f3->exists('POST.ufr')
         && $f3->exists('POST.secret'))
        {
            $user = new \User($f3);
            $idUser = intval($f3->get('POST.id'));
            $pseudo = $f3->get('POST.pseudo');
            //$oldPseudo = $f3->get('POST.oldpseudo');
            //$mdpSHA1 = $f3->get('POST.mdpSHA1');
            $email = $f3->get('POST.email');
            $birthDate = $f3->get('POST.birthdate');
            $avatar = $f3->get('POST.avatar');
            $firstName = $f3->get('POST.firstname');
            $lastName = $f3->get('POST.lastname');
            $city = $f3->get('POST.city');
            $zipCode = intval($f3->get('POST.zip'));
            $phoneNumber = $f3->get('POST.phone');
            $description = $f3->get('POST.description');
            $level = intval($f3->get('POST.level'));
            $ufr = intval($f3->get('POST.ufr'));
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données

            if(isset($_GET['mdpSHA1'])) {
                if(!$user->updatePassword($idUser, $_GET['mdpSHA1'])) {
                    echo json_encode(array('code'=>404));
                    exit(0);
                }
            }

            if(\Utilities::isValidEmail($email)) {
                //print_r($user->isEmailUsed($idUser, $email));
                if(!$user->isEmailUsed($idUser, $email)){//Test si l'adresse email n'est pas déjà utilisée par un autre utilisateur
                    if(!$user->isPseudoUsed($idUser, $pseudo)){//Test si le pseudo est déjà utilisé par un autre membre
                        $formattedDate = \Utilities::convertDateHometoSQL($birthDate. ' 00:00');//dd/mm/YYYY HH:ii to YYYY-mm-dd HH:ii:ss

                        if($back = $user->updateInfoUser($idUser, $pseudo, $email, $birthDate, $avatar, $firstName, $lastName, $city, $zipCode, $phoneNumber, $description, $level, $ufr)) {
                            echo json_encode(array('code'=>200));
                        }
                        else
                            echo json_encode(array('code'=>405));
                    }
                    else
                        echo json_encode(array('code'=>503));//pseudo already used
                }
                else
                    echo json_encode(array('code'=>504));//mail already used
            }
            else
                echo json_encode(array('code'=>501));//mail format error
        }
        else
            echo json_encode(array('code'=>444));//missing
    }

    function afterroute() { }

    function __destruct() { }
}
?>