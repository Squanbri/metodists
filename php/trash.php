<?php 
  require 'db.php';

  $link = mysqli_connect($host, $user, $password, $database) or die("Ошибка " . mysqli_error($link));

  $sql = "SELECT * FROM `interview`;";
  $result = $link->query($sql);
  $interviews = array();
  while($row = $result->fetch_assoc()) {
      array_push($interviews, $row);
  }
  print_r($interviews);
?>