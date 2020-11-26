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

        static function sendRegisterClassMail($data_class, $data_tutor, $admin_emails) {
            // $class_info, $tutor_info, $email_address
            $mail = new PHPMailer(true);
            try {
                Email::configMailer($mail);
                $mail->addAddress('rostom13299@gmail.com');                                                // Add a recipient
                $mail_content = Config::getMailContent()['mailRegisterClass']['body'];

                $array_cid = array_keys(Config::getMailContent()['mailRegisterClassImages']);
                array_walk( $array_cid, function(&$value, $key) { $value =  'cid:'.str_replace('%','',$value); } );

                $mail_content = str_replace(array_keys(Config::getMailContent()['mailRegisterClassImages']) , $array_cid, $mail_content);
                $random_value = round(microtime(true) * 1000);
                $mail_content = str_replace("%random_value%" , $random_value, $mail_content);

                array_walk( $array_cid, function(&$value, $key) { $value =  str_replace('cid:','',$value); } );

                //Insert data of class 
                // $mail_content = str_replace(array_keys(Config::getMailContent()['mailRegisterClassMatches']['class']), $data_class[]);
                foreach( Config::getMailContent()['mailRegisterClassMatches']['class'] as $key => $value) {
                    $mail_content = str_replace($key, 'TIẾn',$mail_content);
                }

                //Insert data of tutor
                foreach( Config::getMailContent()['mailRegisterClassMatches']['tutor'] as $key => $value) {
                    $mail_content = str_replace($key, utf8_decode ($data_tutor[$value]),$mail_content);
                }

                // Content
                $mail->isHTML(true);                                                        // Set email format to HTML
                $mail->Subject = Config::getMailContent()['mailRegisterClass']['topic'];
                // $mail->Body    = $mail_content;
                $mail->msgHTML( $mail_content, __DIR__);
                
                foreach ( array_values(Config::getMailContent()['mailRegisterClassImages']) as $key => $value) {
                    $mail->AddEmbeddedImage($value, $array_cid[$key]);
                }

                $mail->send();
            } catch (Exception $e) {
                return "Message could not be sent: $mail->ErrorInfo";
            }
            return 'success';
        }

    }

?>