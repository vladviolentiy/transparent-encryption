import Requests from "./Requests";
import cleanDataInterface from "./Interfaces/CleanDataInterface";

class Gateway extends Requests{
    public queryGet():Promise<cleanDataInterface>{
        return this.executeGet("request.php");
    }
    public queryPost(
        fName:string
    ):Promise<cleanDataInterface>{
        let formData = new FormData();
        formData.append("fName", fName);
        return this.executePost("response.php",formData);
    }
}

export default new Gateway