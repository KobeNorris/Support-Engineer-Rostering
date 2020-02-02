<?php

require "../../vendor/autoload.php";

echo 'Yes';

$robo = 'kobewu522@163.com';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$developmentMode = false;
$mailer = new PHPMailer($developmentMode);

try {
    $mailer->SMTPDebug = 3;

    $mailer->isSMTP();

    if ($developmentMode) {
    $mailer->SMTPOptions = [
        'ssl'=> [
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
        ]
    ];
    }


    $mailer->Host = 'smtp.gmail.com';
    $mailer->SMTPAuth = false;
    $mailer->Username = 'kobenorriswu@gmail.com';
    $mailer->Password = 'kobewkj990522';
    $mailer->SMTPSecure = false; //'tls'
    $mailer->Port = 465; //587
    // $mail->SMTPAutoTLS = false;

    $mailer->setFrom('kobenorriswu@gmail.com', 'Kobe sender');
    $mailer->addAddress('969074817@qq.com', 'Kobe recipient');

    //Content
    $mailer->isHTML(true); // Set email format to HTML
    $mailer->Subject = 'Here is the subject';
    $mailer->Body = 'This is the HTML message body <b>in bold!</b>';
    $mailer->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mailer->send();
    $mailer->ClearAllRecipients();
    echo "MAIL HAS BEEN SENT SUCCESSFULLY";

} catch (Exception $e) {
    echo "EMAIL SENDING FAILED. INFO: " . $mailer->ErrorInfo;
}