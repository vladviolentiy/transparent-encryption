import EncryptedDataInterface from "./Interfaces/EncryptedDataInterface";
import CryptoFunctions from "./CryptoFunctions";

import {iv, key, salt} from "./Constants";
import Converter from "./Converter";
import CleanDataInterface from "./Interfaces/CleanDataInterface";

abstract class Requests{
    private async decryptResponse(input:EncryptedDataInterface):Promise<CleanDataInterface>{
        if(input.success){
            let derivedKey = await CryptoFunctions.deriveKey(key,Converter.str2ab(atob(salt)))
            return await JSON.parse(await CryptoFunctions.decryptAES(input.data, derivedKey, iv));
        }
        throw "";
    }

    private async encryptRequest(input:FormData):Promise<string>{
        let object:Record<string, any> = {};
        input.forEach(function(value, key){
            object[key] = value;
        });
        let json = JSON.stringify(object);
        let derivedKey = await CryptoFunctions.deriveKey(key,Converter.str2ab(atob(salt)))
        console.log(await crypto.subtle.exportKey("raw",derivedKey))
        return btoa(await CryptoFunctions.encryptAES(json, derivedKey, iv));
    }

    protected async executeGet(url:string):Promise<CleanDataInterface>{
        let info:EncryptedDataInterface = await fetch(url,{
            method:"GET",
            credentials:"include"
        }).then(response=>response.json())

        return this.decryptResponse(info);
    }
    private async execute(url:string,method:"POST"|"DELETE"|"PUT",params:FormData):Promise<CleanDataInterface>{
        let formData = new FormData();
        formData.append("encrypted",await this.encryptRequest(params));
        console.log(formData)
        let info:EncryptedDataInterface = await fetch(url,{
            method:method,
            credentials:"include",
            body:params
        }).then(response=>response.json())

        return this.decryptResponse(info);
    }
    protected async executePost(url:string,params:FormData):Promise<CleanDataInterface>{
        return this.execute(url, 'POST', params);

    }
    protected async executeDelete(url:string,params:FormData):Promise<CleanDataInterface>{
        return this.execute(url,'DELETE',params)

    }
    protected async executePut(url:string,params:FormData):Promise<CleanDataInterface>{
        return this.execute(url,'PUT',params)

    }
}

export default Requests;