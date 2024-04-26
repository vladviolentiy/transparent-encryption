<?php

namespace Vladviolentiy\TransparentEncryption;

class Web
{
    public function readRequest():void
    {
        $req = new Request();



    }
    public function sendResponse():string
    {
        return (string)new Response(["text"=>"encryptedData"]);
    }
}