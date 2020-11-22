<?php

    include_once "../../secret/config.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    // Load Composer's autoloader
    require './common/mail/vendor/autoload.php';
    
    class Email {

        static function configMailer($mail){
            $mail->isSMTP();                                                            // Send using SMTP
            $mail->Host       = Config::getMailConfig()['host'];                        // Set the SMTP server to send through
            $mail->SMTPAuth   = Config::getMailConfig()['smtpAuth'];                    // Enable SMTP authentication
            $mail->Username   = Config::getMailConfig()['username'];                    // SMTP username
            $mail->Password   = Config::getMailConfig()['password'];                    // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;                            // Enable TLS encryption; PHPMailer::ENCRYPTION_SMTPS encouraged
            $mail->Port       = Config::getMailConfig()['port'];    

            $mail->setFrom(Config::getMailConfig()['noReply'], Config::getMailConfig()['displayName']);
        }

        static function sendConfirm($address, $confirm_code) {
            $mail = new PHPMailer(true);
            try {
                Email::configMailer($mail);
                $mail->addAddress($address);                                                // Add a recipient
            
                // Content
                $mail->isHTML(true);                                                        // Set email format to HTML
                $mail->Subject = Config::getMailContent()['verifyMail']['topic'];
                $mail->Body    = str_replace("%securityCode%",$confirm_code,Config::getMailContent()['verifyMail']['body']);
                $mail->AltBody = str_replace("%securityCode%",$confirm_code,Config::getMailContent()['verifyMail']['altBody']);
            
                $mail->send();
            } catch (Exception $e) {
                return false;
            }
            return true;
        }

        static function sendRegisterRequest($address, $confirm_code) {
            $mail = new PHPMailer(true);
            try {
                Email::configMailer($mail);
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