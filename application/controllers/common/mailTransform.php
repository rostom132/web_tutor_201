<?php

    include_once "../../secret/config.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    // Load Composer's autoloader
    require './common/mail/vendor/autoload.php';
    
    class Email {

        static function sendConfirm($address, $confirm_code) {
            $mail = new PHPMailer(true);
            try {
                //Server settings
                $mail->isSMTP();                                                            // Send using SMTP
                $mail->Host       = Config::getMailConfig()['host'];                        // Set the SMTP server to send through
                $mail->SMTPAuth   = Config::getMailConfig()['smtpAuth'];                    // Enable SMTP authentication
                $mail->Username   = Config::getMailConfig()['username'];                    // SMTP username
                $mail->Password   = Config::getMailConfig()['password'];                    // SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;                            // Enable TLS encryption; PHPMailer::ENCRYPTION_SMTPS encouraged
                $mail->Port       = Config::getMailConfig()['port'];                                    // TCP port to connect to, use 465 for PHPMailer::ENCRYPTION_SMTPS above

                //Recipients
                $mail->setFrom(Config::getMailConfig()['noReply'], Config::getMailConfig()['displayName']);
                $mail->addAddress($address);                                                // Add a recipient
            
                // Content
                $mail->isHTML(true);                                                        // Set email format to HTML
                $mail->Subject = Config::getMailConfig()['topic'];
                $mail->Body    = Config::getMailConfig()['body'] .$confirm_code;
                $mail->AltBody = Config::getMailConfig()['altBody'];
            
                $mail->send();
            } catch (Exception $e) {
                return false;
            }
            return true;
        }

    }

?>