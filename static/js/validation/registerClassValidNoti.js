export const registerClassRegex = {
    "topic": /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ, ]{1,50}$/,
    "salary_per_lesson": /\b[0-9]+\b/,
    "no_students": /\b([1-9]|[1-9][0-9]|100)\b/,
    "address": /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\/, ]{1,150}$/,
    "phone_number": /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
    "description": /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ|_ ]{0,200}$/,
    'no_lesson_per_week': /\b(1|2|3|4)\b/,
    'time_per_lesson': /(1:30:00|2:00:00|2:30:00|3:00:00)/,
    'gender_of_tutor': /(M|F|B)/,
    'subject': /\b[0-9]+\b/,
    'district': /\b([1-9]|1[0-9]|2[0-4])\b/,
    'ward': /\b([0-9]|1[0-9]|[2-9][0-9]|[1-2][0-9][0-9]|3[0-2][0-6])\b/,
    'street': /\b[0-9]+\b/,
}