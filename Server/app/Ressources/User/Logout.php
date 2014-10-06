<?php  

namespace User;

class Logout {
    
    function __construct() { }

    function beforeroute() { }

	function get($f3) { $f3->clear('SESSION'); }

	function put() { }
	function delete() { }
	function post() { }

    function afterroute() { }

    function __destruct() { }
}
?> 