import Gateway from "./Gateway";

const info = Gateway.queryPost("test").then(response=>{
    console.log(response);
});
