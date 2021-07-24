<?php 
  require 'db.php';
  require 'rb.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_POST = json_decode(file_get_contents('php://input'), true);

    $table = $_POST['table'];
    $text = $_POST['text'];
    $parent = $_POST['parent'];

    R::setup("mysql:host=$localhost;dbname=$database", $login, $password);

    $item = R::dispense("$table");
    $item->text = $text;
    if($parent) $item->parent = $parent;
    R::store($item);
  }
?>