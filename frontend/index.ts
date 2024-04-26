import Gateway from "./Gateway";

Gateway.queryPost("test").then(response=>{
    console.log(response);
});
