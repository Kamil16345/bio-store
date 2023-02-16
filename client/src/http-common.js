import axios from "axios";

export default axios.create({
    baseURL: "https://bio-me-server.netlify.app/",
    headers: {
        "Content-type":"application/json"
        //"Access-Control-Allow-Origin":"*",
    },
    //methods: "GET,PUT,POST,DELETE,OPTIONS"
})