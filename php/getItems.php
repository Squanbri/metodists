<?php 
  require 'db.php';
  require 'rb.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_POST = json_decode(file_get_contents('php://input'), true);

    $table = $_POST['table'];
    $parent = $_POST['parent'];

    R::setup("mysql:host=$localhost;dbname=$database", $login, $password);

    if($parent) $items = R::findAll("$table", "parent = $parent");
    else $items = R::findAll("$table");

    echo json_encode($items);
  }
?>