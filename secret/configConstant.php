<?php
    return array (

        //Database configuration
        'configDB' => array (
            'servername' => "localhost",
            'username' => "root",
            'password' => "",
            'dbname' => "web_ass",
        ),

        //page permission of each user
        'pagePermission' => array (
            'common' => array (
                'bodyBanner',
                'formLogin'
            ),
            'tutor' => array (
                'infoTutor',
                'registerClass'
            ),
            'parent' => array (
                'infoParent'
            ),
            'admin' => array (
                'infoAdmin'
            )
        ),

        //Secret key for generating token
        'secret_key' => "2349230798532749853",

        //Config for uploading Avatar
        'avatar' => array (
            'avatars_dir' => "../../static/images/avatar/",
            'avatars_dir_frontend' => "./static/images/avatar/",
            'valid_extentions' => array (
                'jpg','jpeg', 'png'
            )
            ),

        //expired days for remember token
        'limit_days_remember' => 3,
    );
?>