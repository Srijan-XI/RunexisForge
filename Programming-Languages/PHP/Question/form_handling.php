//Question: Create a simple HTML form to input a user’s name. After submission, display “Hello, [Name]!”.
<!-- Save this as form_handling.php and visit in browser -->
<form method="post" action="">
    Enter your name: <input type="text" name="username">
    <input type="submit" value="Greet">
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["username"]);
    echo "Hello, $name!";
}
?>
