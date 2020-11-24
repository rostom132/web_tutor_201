<?php
    return array (

        //Page permission of each user
        'pagePermission' => array (
            'common' => array (
                'bodyBanner',
                'formLogin',
                'formRegister',
                'aboutUs',
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
                'description' => '/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]{1,200}$/',
                'present_job' => '/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]{1,20}$/',
            ),
            'parent' => array (
                'date_of_birth' => '/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/',
            ),
            'admin' => array (

            ),
        ),


        'validateRegistor' => array(
            'authen' => array (
                'username' => '/^[A-za-z0-9]{4,}$/',
                'password' => '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/',
            ),
            'type' => '/(tutor|parent|admin)/',
            'token' => '/\d{7}/',
            'code' => '/\d{7}/',
        ),

        //Information must be input when create new class
        'validateClassInfo' => array(
            'registerClass' => array (
                'topic' => '/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ, ]{1,50}$/',
                'salary_per_lesson' => '/^[0-9]+$/',
                'no_students' => '/\b([1-9]|[1-9][0-9]|100)\b/',
                'address' => '/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\/, ]{1,150}$/',
                'phone_number' => '/^(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/',
                'description' => '/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ|_ ]{0,200}$/',
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
    );
?>