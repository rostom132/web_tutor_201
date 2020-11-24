<?php
    return array (

        //Page permission of each user
        'pagePermission' => array (
            'common' => array (
                'bodyBanner',
                'formLogin',
                'formRegister',
                'aboutUs',
                'infoClass'
            ),
            'loginCommon' => array (
                'bodyBanner',
                'aboutUs',
                'infoClass'
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
                'description' => '/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]{,200}$/',
                'present_job' => '/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]{,20}$/',
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
                'body' => '<html>

                <head>
                    <style>
                        .banner-color {
                            background-color: #4bbadc;
                        }
                        
                        .title-color {
                            color: #0066cc;
                        }
                        
                        .button-color {
                            background-color: #0066cc;
                        }
                        
                        @media screen and (min-width: 500px) {
                            .banner-color {
                                background-color: #4bbadc;
                            }
                            .title-color {
                                color: #0066cc;
                            }
                            .button-color {
                                background-color: #0066cc;
                            }
                        }
                    </style>
                </head>
                
                <body>
                    <div style="background-color:#ececec;padding:0;margin:0 auto;font-weight:200;width:100%!important">
                        <table align="center" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <center style="width:100%">
                                            <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif" width="512">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#F3F3F3" width="100%" style="background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec">
                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" valign="middle" width="50%"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">TKT Educaiton</span></td>
                                                                        <td valign="middle" width="50%" align="right" style="padding:0 0 0 10px"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">University Of Technology Ho Chi Minh city</span></td>
                                                                        <td width="1">&nbsp;</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">
                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="100%">
                                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" bgcolor="#8BC34A" style="padding:20px 48px;color:#ffffff" class="banner-color">
                                                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" width="100%">
                                                                                                            <h1 style="padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px">Welcome to TKT education!</h1>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" style="padding:20px 0 10px 0">
                                                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" width="100%" style="padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;">
                                                                                                            <h3 style="font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center;" class="title-color">Tutor your future</h3>
                                                                                                            <p style="margin: 20px 0 30px 0;font-size: 15px;text-align: center;">In this web you can get the best tutors for your children!</p>
                                                                                                            <div style="font-weight: 200; text-align: center; margin: 25px;"><a style="padding:0.6em 1em;border-radius:600px;color:#ffffff;font-size:14px;text-decoration:none;font-weight:bold" class="button-color">%securityCode%</a></div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                    </tr>
                                                                                    <tr>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">
                                                            <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="padding:0 24px;color:#999999;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center" width="100%">
                                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" valign="middle" width="100%" style="border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px">Regards,
                                                                                            <br><b>The Awesome Team</b>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" width="100%">
                                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" style="padding:0 0 8px 0" width="100%"></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                
                </html>',
                'altBody' => 'Please use the below code to verify your account: %securityCode%',
            ),
        )
    );
?>