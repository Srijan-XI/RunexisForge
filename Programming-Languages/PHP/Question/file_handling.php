//Write a PHP script to create a file named sample.txt, write "PHP is awesome!" into it, and then display its content.
<?php
$file = fopen("sample.txt", "w");
fwrite($file, "PHP is awesome!");
fclose($file);

$file = fopen("sample.txt", "r");
$content = fread($file, filesize("sample.txt"));
fclose($file);

echo $content;
?>
