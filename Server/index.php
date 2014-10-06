<?php
date_default_timezone_set('Europe/Paris');
$f3 = require('app/Helpers/fatfree/base.php');

$f3->config('config/globals.cfg');
$f3->config('config/tables.cfg');
$f3->config('config/maps.cfg');

$f3->set('db', new DB\SQL(
                            'mysql:host=' .$f3->get('db_host'). ';port=3306;dbname='.$f3->get('db_server'),
                            $f3->get('db_user'),
                            $f3->get('db_pass')
                        ));

$f3->run();
?>