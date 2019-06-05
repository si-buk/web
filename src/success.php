<?php

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	// Обработка формы
} else {
	// Ошибка! Допустим только AJAX запрос!
}


header("Content-Type: text/html; charset=utf-8");
$email = htmlspecialchars($_POST["email"]);
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$comment = htmlspecialchars($_POST["comment"]);
$target = htmlspecialchars($_POST["target"]);

$check = is_array($_POST['check']) ? $_POST['check'] : array();
$check = implode (', ', $check );

$radio = htmlspecialchars($_POST["radio"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "evgeniy@web-des.ru"; // e-mail администратора


// Отправка письма администратору сайта

$tema = "Тема письма админу";
$message_to_myemail = "<tr><td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$target</b></td></tr>
<br><br>
<tr> <td style='padding: 10px; border: #e9e9e9 1px solid;'>Имя</td> <td style='padding: 10px; border: #e9e9e9 1px solid;'>$name</td><tr>
<tr> <td style='padding: 10px; border: #e9e9e9 1px solid;'>E-mail</td> <td style='padding: 10px; border: #e9e9e9 1px solid;'>$email</td><tr>
<tr> <td style='padding: 10px; border: #e9e9e9 1px solid;'>Телефон</td> <td style='padding: 10px; border: #e9e9e9 1px solid;'>$tel</td><tr>
<tr> <td style='padding: 10px; border: #e9e9e9 1px solid;'>Текст</td> <td style='padding: 10px; border: #e9e9e9 1px solid;'>$comment</td><tr>
<tr> <td style='padding: 10px; border: #e9e9e9 1px solid;'>Источник (ссылка)</td> <td style='padding: 10px; border: #e9e9e9 1px solid;'>$refferer</td><tr>
";

mail($myemail, $tema, $message_to_myemail, "From: Sitename <evgeniy@web-des.ru> \r\n Reply-To: Sitename \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );




// Сохранение инфо о лидах в файл leads.xls

$f = fopen("leads.xls", "a+");
fwrite($f," <tr>");    
fwrite($f," <td>$email</td> <td>$name</td> <td>$tel</td>   <td>$date / $time</td>");   
fwrite($f," <td>$refferer</td>");    
fwrite($f," </tr>");  
fwrite($f,"\n ");    
fclose($f);

?>