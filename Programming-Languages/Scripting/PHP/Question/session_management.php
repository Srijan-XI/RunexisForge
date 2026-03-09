//Start a session and set a session variable “user” to “Srijan”. Display this variable.
<?php
session_start();

$_SESSION["user"] = "Srijan";

echo "Session user: " . $_SESSION["user"];
?>
