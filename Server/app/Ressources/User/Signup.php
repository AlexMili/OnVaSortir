<?php  

namespace User;

class Signup {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        
        if($f3->exists('GET.pseudo') && $f3->exists('GET.email') && $f3->exists('GET.mdpSHA1') && $f3->exists('GET.birthdate') && $f3->exists('GET.secret'))
        {
            $user = new \User($f3);
            $pseudo = $f3->get('GET.pseudo');//pseudo
            $mdpSHA1 = $f3->get('GET.mdpSHA1');//mdp hashé en sha1
            $email = $f3->get('GET.email');//adresse mail
            $birthDate = $f3->get('GET.birthdate');//Date de naissance
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données

            //vérifier mail
            if(\Utilities::isValidEmail($email)) {
                //vérifie existence mail
                if(!$user->isEmailExist($email)) {
                    //vérification existence pseudo
                    if(!$user->isPseudoExist($pseudo)) {
                        $formattedDate = \Utilities::convertDateHometoSQL($birthDate. ' 00:00');//dd/mm/YYYY HH:ii to YYYY-mm-dd HH:ii:ss

                        if($user->signup($pseudo, $email, $mdpSHA1, $formattedDate)) {
                            if($back = $user->connectUserWithPseudo($pseudo, $mdpSHA1)) {
                                $f3->set('SESSION.pseudo', $back->mem_pseudo);
                                $f3->set('SESSION.mail', $back->mem_email);
                                $f3->set('SESSION.id', $back->mem_id);
                                
                                echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->mem_id, 'pseudo'=>$back->mem_pseudo, 'email'=>$back->mem_email)));
                            }
                            else
                                echo json_encode(array('code'=>402));//connection pseudo failed
                        }
                        else
                            echo json_encode(array('code'=>403));//signup failed
                    }
                    else
                        echo json_encode(array('code'=>503));//pseudo already exist
                }
                else
                    echo json_encode(array('code'=>504));//mail already exist
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
        
        if($f3->exists('POST.pseudo') && $f3->exists('POST.email') && $f3->exists('POST.mdpSHA1') && $f3->exists('POST.birthdate') && $f3->exists('POST.secret'))
        {
            $user = new \User($f3);
            $pseudo = $f3->get('POST.pseudo');//pseudo
            $mdpSHA1 = $f3->get('POST.mdpSHA1');//mdp hashé en sha1
            $email = $f3->get('POST.email');//adresse mail
            $birthDate = $f3->get('POST.birthdate');//Date de naissance
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données

            //vérifier mail
            if(\Utilities::isValidEmail($email)) {
                //vérifie existence mail
                if(!$user->isEmailExist($email)) {
                    //vérification existence pseudo
                    if(!$user->isPseudoExist($pseudo)) {
                        $formattedDate = \Utilities::convertDateHometoSQL($birthDate. ' 00:00');//dd/mm/YYYY HH:ii to YYYY-mm-dd HH:ii:ss

                        if($user->signup($pseudo, $email, $mdpSHA1, $formattedDate)) {
                            if($back = $user->connectUserWithPseudo($pseudo, $mdpSHA1)) {
                                $f3->set('SESSION.pseudo', $back->mem_pseudo);
                                $f3->set('SESSION.mail', $back->mem_email);
                                $f3->set('SESSION.id', $back->mem_id);
                                
                                echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->mem_id, 'pseudo'=>$back->mem_pseudo, 'email'=>$back->mem_email)));
                            }
                            else
                                echo json_encode(array('code'=>402));//connection pseudo failed
                        }
                        else
                            echo json_encode(array('code'=>403));//signup failed
                    }
                    else
                        echo json_encode(array('code'=>503));//pseudo already exist
                }
                else
                    echo json_encode(array('code'=>504));//mail already exist
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