<?php

namespace Vladviolentiy\TransparentEncryption;


class Request
{
    public readonly array $vars;

    public function __construct()
    {
        $encrypted = $_POST['encrypted'];
        $decrypted = openssl_decrypt($encrypted,"aes-256-cbc",Constants::getPbkdf2(),0,base64_decode(Constants::IV));
        $this->vars = json_decode($decrypted);
    }

    public function get(string $itemName):string
    {
        return $this->vars[$itemName];
    }
}