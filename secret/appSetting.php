<?php
    return array (

        //Page permission of each user
        'pagePermission' => array (
            'common' => array (
                'bodyBanner',
                'formLogin',
                'formRegister',
                'aboutUs',
                'infoClass',
                'classList',
            ),
            'loginCommon' => array (
                'bodyBanner',
                'aboutUs',
                'infoClass',
                'classList',
            ),
            'tutor' => array (
                'infoTutor',
            ),
            'parent' => array (
                'infoParent',
                'registerClass',
            ),
            'admin' => array (
                'infoAdmin',
            )
        ),

        'pageGoWithCouting' => array (
            'bodyBanner',
            'aboutUs'
        ),

        //Information must be input when update user info
        'validateCommon' => array (
            'username' => '/^[A-za-z0-9]{4,}$/',
            'password' => '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/',
        ),

        'validateInfo' => array (
            'common' => array (
                'first_name' => '/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/',
                'last_name' => '/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/',
                'phone_number' => '/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/',
                'gender' => '/^[MF]$/',
            ),
            'tutor' => array (
                'date_of_birth' => '/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/',
                'language' => '/^(Vietnamese|English|Both)$/',
                'description' => '/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]{0,200}$/',
                'present_job' => '/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]{0,20}$/',
                'email' => '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
            ),
            'parent' => array (
                'date_of_birth' => '/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/',
                'email' => '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
            ),
            'admin' => array (

            ),
        ),


        'validateRegistor' => array(
            'type' => '/(tutor|parent|admin)/',
            'token' => '/\d{7}/',
            'code' => '/\d{7}/',
        ),

        //Information must be input when create new class
        'validateClassInfo' => array(
            'registerClass' => array (
                'topic' => '/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9, ]{1,50}$/',
                'salary_per_lesson' => '/^[0-9]{1,11}$/',
                'no_students' => '/\b[1-5]{1,1}\b/',
                'address' => '/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\/, ]{1,150}$/',
                'phone_number' => '/^(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/',
                'description' => '/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9|_ ]{0,200}$/',
                'no_lesson_per_week' => '/(1|2|3|4)/',
                'time_per_lesson' => '/(1:30:00|2:00:00|2:30:00|3:00:00)/',
                'gender_of_tutor' => '/(M|F|B)/',
                'city' => '/1/',
                'district' => '/\b([1-9]|1[0-9]|2[0-4])\b/',
                'ward' => '/\b([0-9]|1[0-9]|[2-9][0-9]|[1-2][0-9][0-9]|3[0-2][0-6])\b/',
            ),
            'registerSchedule' => array(
                'date' => '/(MON|TUE|WED|THU|FRI|SAT|SUN)/',
                'start_time' => '/\b(([8-9]|1[0-9]|20):00:00|([8-9]|1[0-9]|20):30:00)\b/',
                'end_time' => '/\b((1[0-9]|2[0-3]):00:00|(1[0-9]|2[0-3]):30:00)\b/',
            ),
            'registerWeakness' => array(
                'subject' => '/\b[0-9]+\b/'
            )
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


        //Expired days for remember token
        'limit_days_remember' => 3,

        //mail content
        'mailContent' => array(
            'verifyMail' => array(
                'topic' => 'TKT email verification!',
                'body' => file_get_contents('../../static/constants/mail_content/mail_validation.html'),
                'altBody' => 'Please use the below code to verify your account: %securityCode%',
            ),
            'mailRegisterClass' => array (
                'topic' => 'TKT register class notification',
                'body' => file_get_contents('../../static/constants/mail_content/mail_register_class.html'),
            ),
            'mailRegisterClassImages' => array(
                '%logoImage%' => '../../static/images/mail_images/Job_logo.png',
                '%part1Image%' => '../../static/images/mail_images/first_imag.png',
                '%middle12Image%' => '../../static/images/mail_images/logoos.png',
                '%part2Image%' => '../../static/images/mail_images/Guy_computer.png',
                '%part3Image%' => '../../static/images/mail_images/Guy_texting.png',
                '%logoFacebook%' => '../../static/images/mail_images/facebook2x.png'
            ),
            'mailRegisterClassMatches' => array(
                'tutor' => array (
                    '%lname_tutor%' => 'lname',
                    '%fname_tutor%' => 'fname',
                    '%email_tutor%' => 'check_email',
                    '%phone_number_tutor%' => 'phone_number',
                    '%gender_tutor%' => 'gender',
                    '%job_tutor%' => 'job',
                    '%description_tutor%' => 'description',
                    '%speciality_tutor%' => 'specialize'
                ),
                'class' => array (
                    '%lname_class%' => 'lname',
                    '%fname_class%' => 'fname',
                    '%email_class%' =>  'email',
                    '%phone_number_class%' => 'phone_number',
                    '%no_student_class%' => 'no_students',
                    '%gender_class%' => 'gender_of_tutor',
                    '%salary_class%' => 'salary',
                    '%lesson_class%' => 'no_lesson',
                    '%address_class%' => 'address',
                    '%ward_class%' => 'ward',
                    '%district_class%' => 'district',
                    '%weaknesses_class%' => 'weaknesses'
                )
            )
        ),


        'convertData' => array (
            'city.json' => json_decode(file_get_contents('../../static/constants/city.json'),true),
        )
    );
?>