<?php
    return array (

        //page permission of each user
        'pagePermission' => array (
            'common' => array (
                'bodyBanner',
                'registerClass', // in working
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


        //Information must be input when update user info
        'validateInfo' => array (
            'password' => '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/',
            'common' => array (
                'first_name' => '/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/',
                'last_name' => '/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/',
                'phone_number' => '/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/',
                'email' => '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
                'gender' => '/^[MF]$/',
            ),
            'tutor' => array (
                'date_of_birth' => '/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/',
                'language' => '/^(Vietnamese|English|Both)$/',
                'description' => '//',
                'present_job' => '//',
            ),
            'parent' => array (
                'date_of_birth' => '/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/',
            ),
            'admin' => array (

            ),
        ),


        //Secret key for generating token
        'secret_key' => "2349230798532749853",


        //Config for uploading Avatar
        'avatar' => array (
            'avatars_dir' => "../../static/images/avatar/",
            'avatars_dir_frontend' => "./static/images/avatar/",
            'valid_extentions' => array (
                'jpg','jpeg', 'png', 'gif'
            )
            ),


        //expired days for remember token
        'limit_days_remember' => 3,
    );
?>