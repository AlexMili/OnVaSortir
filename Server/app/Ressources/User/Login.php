<?php  

namespace User;

class Login {
    
    function __construct() { }

    function beforeroute() { }

    function get($f3) {
        header('Content-type: application/json');
        // type : si le username utilisé est un mail ou un pseudo
        if($f3->exists('GET.username') && $f3->exists('GET.mdpSHA1') && $f3->exists('GET.type') && $f3->exists('GET.secret'))
        {
            $user = new \User($f3);
            $username=$f3->get('GET.username');//mail ou pseudo
            $mdpSHA1=$f3->get('GET.mdpSHA1');//mdp hashé en sha1
            $type = intval($f3->get('GET.type'));//Type authentification : mail ou pseudo
            $secret = $f3->get('GET.secret');//Hash qui valide l'intégrité des données

            if($type == 1) { //Si c'est un mail
                //vérifier mail
                if(\Utilities::isValidEmail($username)) {
                    //Connexion
                    if($back = $user->connectUserWithMail($username, $mdpSHA1)) {
                        $f3->set('SESSION.pseudo', $back->mem_pseudo);
                        $f3->set('SESSION.mail', $back->mem_email);
                        $f3->set('SESSION.id', $back->mem_id);

                        echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->mem_id, 'pseudo'=>$back->mem_pseudo, 'email'=>$back->mem_email)));
                    }
                    else
                        echo json_encode(array('code'=>401));//connection mail failed
                }
                else
                    echo json_encode(array('code'=>501));;//mail error
            }
            else if($type == 2) { //Si c'est un pseudo
                if($back = $user->connectUserWithPseudo($username, $mdpSHA1)) {
                    $f3->set('SESSION.pseudo', $back->mem_pseudo);
                    $f3->set('SESSION.mail', $back->mem_email);
                    $f3->set('SESSION.id', $back->mem_id);

                    echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->mem_id, 'pseudo'=>$back->mem_pseudo, 'email'=>$back->mem_email)));
                }
                else
                    echo json_encode(array('code'=>402));;//connexion pseudo failed
            }
            else
                echo json_encode(array('code'=>502));;//type inconnu
        }
        else
            echo json_encode(array('code'=>444));;//missing
    }

    function put() { }
    function delete() { }

    function post($f3) {
        header('Content-type: application/json');
        // type : si le username utilisé est un mail ou un pseudo
        if($f3->exists('POST.username') && $f3->exists('POST.mdpSHA1') && $f3->exists('POST.type') && $f3->exists('POST.secret'))
        {
            $user = new \User($f3);
            $username=$f3->get('POST.username');//mail ou pseudo
            $mdpSHA1=$f3->get('POST.mdpSHA1');//mdp hashé en sha1
            $type = intval($f3->get('POST.type'));//Type authentification : mail ou pseudo
            $secret = $f3->get('POST.secret');//Hash qui valide l'intégrité des données

            if($type == 1) { //Si c'est un mail
                //vérifier mail
                if(\Utilities::isValidEmail($username)) {
                    //Connexion
                    if($back = $user->connectUserWithMail($username, $mdpSHA1)) {
                        $f3->set('SESSION.pseudo', $back->mem_pseudo);
                        $f3->set('SESSION.mail', $back->mem_email);
                        $f3->set('SESSION.id', $back->mem_id);

                        echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->mem_id, 'pseudo'=>$back->mem_pseudo, 'email'=>$back->mem_email)));
                    }
                    else
                        echo json_encode(array('code'=>401));//connection mail failed
                }
                else
                    echo json_encode(array('code'=>501));;//mail error
            }
            else if($type == 2) { //Si c'est un pseudo
                if($back = $user->connectUserWithPseudo($username, $mdpSHA1)) {
                    $f3->set('SESSION.pseudo', $back->mem_pseudo);
                    $f3->set('SESSION.mail', $back->mem_email);
                    $f3->set('SESSION.id', $back->mem_id);

                    echo json_encode(array('code'=>200, 'data'=>array('id'=>$back->mem_id, 'pseudo'=>$back->mem_pseudo, 'email'=>$back->mem_email)));
                }
                else
                    echo json_encode(array('code'=>402));;//connexion pseudo failed
            }
            else
                echo json_encode(array('code'=>502));;//type inconnu
        }
        else
            echo json_encode(array('code'=>444));;//missing
    }

    function afterroute() { }

    function __destruct() { }
}
?> 