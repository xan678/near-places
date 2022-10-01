import axios from "axios";

const API = axios.create({baseURL : "http://localhost:5000"});

export const signIn = (formData) => {
    const response = API.post("users/signin", formData);
    return response;
};


export const signUp = (formData) => {
    const response = API.post("users/signup", formData);
    return response;
};


export const googlesignin = (result) => {
    const response = API.post("users/googleSignIn", result);
    return response;
};


export const createTour = (tourData) => {
    return API.post("/tour", tourData);
}