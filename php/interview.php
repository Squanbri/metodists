<?php
  require 'db.php';

  $link = mysqli_connect($host, $user, $password, $database) or die("Ошибка " . mysqli_error($link));

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_POST = json_decode(file_get_contents('php://input'), true);

    $vacansies = $_POST['vacansies'];
    var_dump($vacansies);

    foreach ($vacansies as $vacansy) {
      $sql = "INSERT INTO `interview` (
        `company`,
        `fio`, 
        `email`, 
        `phone`, 
        `city`, 
        `department`, 
        `specialty`, 
        `count`, 
        `time`, 
        `payment`, 
        `education`, 
        `experience`,
        `comment`,
        `students`
      ) 
      VALUES (
        '$vacansy[company]',
        '$vacansy[fio]', 
        '$vacansy[email]', 
        '$vacansy[phone]', 
        '$vacansy[city]', 
        '$vacansy[department]', 
        '$vacansy[specialty]', 
        '$vacansy[count]', 
        '$vacansy[time]', 
        '$vacansy[payment]', 
        '$vacansy[education]', 
        '$vacansy[experience]',
        '$vacansy[comment]',
        '$vacansy[students]'
      );";
    
      $result = $link->query($sql);
    }
  }
  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM `interview`;";
    $result = $link->query($sql);
    $interviews = array();
    while($row = $result->fetch_assoc()) {
        array_push($interviews, $row);
    }
    print_r($interviews);
  }
?>  