<?php
/* 
require_once 'PHPMailer/PHPMailerAutoload.php'; // почта
$mail = new PHPMailer;
//---------------- Настройки SMTP ----------------------
$mail->CharSet = 'utf-8';
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
$mail->Host = "ssl://smtp.yandex.ru";
$mail->Port = 465;
$mail->Username = "mail@doctorlevin.ru";
$mail->Password = "ecB4K5Q6";
$mail->setFrom('info@ortodont.pro', 'ortodont.pro');
$mail->addAddress('Keeper11111@yandex.ru', '');
//-----------------------------------------------------
$mail->Subject = 'Новый пароль от персонажа ';
		$body = '<p><strong>На персонажа  был установлен новый пароль! <br>
		<font color=red>Пароль: </font><br>
		<right>С Уважением, Администрация Супер Бойцовского Клуба!</right></strong></p>';
		$mail->msgHTML($body);
		if($mail->send()){echo '999';}else{echo 'fale';}
		
		
		
//------------------------------------------------------------------------------------------------- */

$to      =  'test-jt89hutdz@srv1.mail-tester.com';
$subject =  'Запись с сайта kids.doctorlevin.ru';
$message =  'Запись с сайта kids.doctorlevin.ru' ."\r\n\r\n". 'Телефон: '.$_POST['phone']. "\r\n\r\n" . 'Заявка со страницы: '.$_SERVER["HTTP_REFERER"];
$headers =  //'Cc: fatseo@gmail.com, viktor.khvatikov@yandex.ru' . "\r\n" .
			'From: info@kids.doctorlevin.ru' . "\r\n" .
			'Reply-To: no-reply@kids.doctorlevin.ru' . "\r\n" .
    	    'MIME-Version: 1.0'. "\r\n" .
    	    'Content-Type: text/plain; charset=UTF-8'. "\r\n" .
    	    'Content-Transfer-Encoding: 8bit'. "\r\n" .
			'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject, $message, $headers)){echo 'Ok';}

?>