<?php

namespace Test\User;

class Login {
    
    function __construct() { }

    function beforeroute() { }

    function test() {
        echo \F3::instance()->get('BASE');
        $test=new \Test;
        \F3::mock('POST /user',
            array(
                'username'=>'t',
                'mdpSHA1'=>'value2',
                'type'=>'3',
                'secret'=>'etez'));

        $test->expect(
            \F3::get('blocked'),
            'DNSBL lookup'
        );
    }

    function afterroute() { }

    function __destruct() { }
}
?> 