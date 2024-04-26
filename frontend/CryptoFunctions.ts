import Security from "./Converter";

class CryptoFunctions {
    public async deriveKey(password:string,salt:ArrayBuffer):Promise<CryptoKey>{
        const importedKey = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(password),
            "PBKDF2",
            false,
            ["deriveBits", "deriveKey"],
        );
        return await crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt,
                iterations: 100000,
                hash: "SHA-256",
            },
            importedKey,
            { "name": "AES-CBC", "length": 256},
            true,
            ["encrypt", "decrypt"],
        );
    }

    public async encryptAES(data:string,key:CryptoKey,iv:string):Promise<string>{
        return btoa(Security.ab2str(await this.encryptAESBytes(
            Security.utf8str2ab(data),
            key,
            new Uint8Array(Security.str2ab(atob(iv)))
        )))
    }

    public async decryptAES(data:string,key:CryptoKey,iv:string):Promise<string>{
        const decodedBytes = await this.decryptAESBytes(
            Security.str2ab(atob(data)),
            key,
            new Uint8Array(Security.str2ab(atob(iv)))
        );
        return Security.ab2utf8str(decodedBytes);
    }

    public async encryptAESBytes(data:ArrayBuffer,encryptionKey:CryptoKey,iv:Uint8Array):Promise<ArrayBuffer>{
        return await crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv: iv,
            },
            encryptionKey,
            data
        );
    }

    public async decryptAESBytes(data:ArrayBuffer,encryptionKey:CryptoKey,iv:Uint8Array):Promise<ArrayBuffer>{
        return await crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: iv,
            },
            encryptionKey,
            data
        );
    }
}

export default new CryptoFunctions();