class Security{
    private textEncoder:TextEncoder;
    private textDecoder:TextDecoder;
    constructor() {
        this.textEncoder = new TextEncoder();
        this.textDecoder = new TextDecoder();
    }

    public ab2utf8str(buf:ArrayBuffer):string {
        return this.textDecoder.decode(new Uint8Array(buf));
    }
    public utf8str2ab(string:string):ArrayBuffer {
        return this.textEncoder.encode(string);
    }

    public ab2str(buf:ArrayBuffer):string {
        return String.fromCharCode(... new Uint8Array(buf));
    }

    public str2ab(string:string):ArrayBuffer{
        return Uint8Array.from(string, c => c.charCodeAt(0))
    }

}

export default new Security();