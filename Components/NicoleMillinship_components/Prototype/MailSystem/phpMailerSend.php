<!-- Documentation could be found on https://github.com/PHPMailer/PHPMailer -->
<?php

require "../../vendor/autoload.php";

// $robo = 'kobewu522@163.com';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$developmentMode = false;
$mailer = new PHPMailer($developmentMode);

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


    $mailer->Host = "smtp.gmail.com";
    $mailer->SMTPAuth = true;
    $mailer->Username = 'kobenorriswu@gmail.com';
    $mailer->Password = 'Kobewkj990522$';
    $mailer->SMTPSecure = "ssl"; //'tls'
    // $mailer->SMTPAutoTLS = false;
    $mailer->Port = 80; //587 // 465

    $mailer->setFrom('kobenorriswu@gmail.com', 'Sender');
    $mailer->addAddress('969074817@qq.com', 'Recipient');

    //Content
    $mailer->isHTML(true); // Set email format to HTML
    $mailer->Subject = 'Here is the subject';
    $mailer->Body = 'This is the HTML message body <b>in bold!</b>';
    $mailer->AltBody = 'This is the body in plain text for non-HTML mail clients';

try {
    $mailer->send();
    // $mailer->ClearAllRecipients();
    echo "MAIL HAS BEEN SENT SUCCESSFULLY";

} catch (Exception $e) {
    echo "EMAIL SENDING FAILED. INFO: " . $mailer->ErrorInfo;
}