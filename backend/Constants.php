<?php

namespace Vladviolentiy\TransparentEncryption;


class Constants
{
    const KEY = "fuckthisworld";
    const SALT = "B0o6we/gZtg=";
    const IV = 'Sg5y1anSD/1kxg1VVy6G8Q==';

    public static function getPbkdf2()
    {
        return openssl_pbkdf2(self::KEY,base64_decode(self::SALT),32,100000,"SHA256");
    }
}