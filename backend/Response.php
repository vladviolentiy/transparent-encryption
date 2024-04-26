<?php

namespace Vladviolentiy\TransparentEncryption;


class Response
{
    private readonly string $text;

    public function __construct(array $block)
    {
        $this->text = json_encode($block);
    }

    public function __toString():string
    {
        return openssl_encrypt($this->text,"aes-256-cbc",Constants::getPbkdf2(),0,base64_decode(Constants::IV));
    }
}