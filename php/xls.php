<?php
  require 'vendor/autoload.php';
  require 'db.php';

  $link = mysqli_connect($host, $user, $password, $database) or die("Ошибка " . mysqli_error($link));

  use PhpOffice\PhpSpreadsheet\Spreadsheet;
  use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

  $spreadsheet = new Spreadsheet();
  $sheet = $spreadsheet->getActiveSheet();
  $sheet->getStyle("A1:N1")->getFont()->setBold(true);
  $sheet->setCellValue('A1', 'Компания');
  $sheet->setCellValue('B1', 'ФИО');
  $sheet->setCellValue('C1', 'Email');
  $sheet->setCellValue('D1', 'Телефон');
  $sheet->setCellValue('E1', 'Город');
  $sheet->setCellValue('F1', 'Отрасль');
  $sheet->setCellValue('G1', 'Специальность');
  $sheet->setCellValue('H1', 'Количество сотрудников');
  $sheet->setCellValue('I1', 'Условия');
  $sheet->setCellValue('J1', 'Оплата');
  $sheet->setCellValue('K1', 'Образование');
  $sheet->setCellValue('L1', 'Опыт');
  $sheet->setCellValue('M1', 'Комментарии');
  $sheet->setCellValue('N1', 'Готов сотрудничать с университетами и колледжами');

  $sql = "SELECT * FROM `interview`;";
  $result = $link->query($sql);
  $interviews = array();
  while($row = $result->fetch_assoc()) {
      array_push($interviews, $row);
  }

  foreach ($interviews as $index => $interview) {
    $index = $index + 2;
    $sheet->setCellValue("A$index", $interview['company']);
    $sheet->setCellValue("B$index", $interview['fio']);
    $sheet->setCellValue("C$index", $interview['email']);
    $sheet->setCellValue("D$index", $interview['phone']);
    $sheet->setCellValue("E$index", $interview['city']);
    $sheet->setCellValue("F$index", $interview['department']);
    $sheet->setCellValue("G$index", $interview['specialty']);
    $sheet->setCellValue("H$index", $interview['count']);
    $sheet->setCellValue("I$index", $interview['time']);
    $sheet->setCellValue("J$index", $interview['payment']);
    $sheet->setCellValue("K$index", $interview['education']);
    $sheet->setCellValue("L$index", $interview['experience']);
    $sheet->setCellValue("M$index", $interview['comment']);
    $sheet->setCellValue("N$index", $interview['students']);    
  }

  $writer = new Xlsx($spreadsheet);
  $writer->save('Опрос.xlsx');
?>