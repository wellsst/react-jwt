import axios from "axios";
import {AuthService} from "./auth.service";

export default axios.create({
    baseURL: "http://localhost:8080/",
    responseType: "json"
});

export function securePost(endpoint, dataMap, successHandler) {
    const instance = axios.create({
        baseURL: "http://localhost:8080/",
        responseType: "json"
    });

    let authService = new AuthService();
    let token = authService.getToken()

    if (token) {
        instance.defaults.headers.common['loginToken'] = token;

        httpPost(instance, endpoint, dataMap, successHandler)
    }
}

export function httpPost(client, endpoint, dataMap, successHandler) {
    client.post(
        endpoint,
        dataMap
    ).then((response) => {
        // Success 🎉
        successHandler(response)
    }).catch((error) => {
        // Error 😨
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            this.setState({serverError: error.response.data.message});
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
            this.setState({serverError: "The server seems unreachable, try again later"});
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
            this.setState({serverError: "Issue sending request"});
        }
        console.log(error.config);
    });
}