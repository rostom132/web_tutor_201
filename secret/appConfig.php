<?php
    return array (

        //Database configuration
        'configDB' => array (
            'servername' => "localhost",
            'username' => "root",
            'password' => "",
             // 'password' => "",
            'password' => "abcdef1234",
            'dbname' => "web_ass",
        ),

        'configMail' => array (
            'host' => 'smtp.gmail.com',
            'smtpAuth' => true,
            'username' => 'TKT.education@gmail.com',
            'password' => 'tkt12345',
            'port' => 465,
            'noReply' => 'noreply@tkteducation.com',
            'displayName' => 'TKT Education',
            'topic' => 'TKT email verification!',
            'body' => 'Please use the below code to verify your account: ',
            'altBody' => 'Please use the below code to verify your account: ',
        ),
        'domain'=> 'http://127.0.0.1/web_tutor_201/'
    );
?>