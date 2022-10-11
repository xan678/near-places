import axios from "axios";

const API = axios.create({baseURL : "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }

    return req;
})

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
    return API.post("/tours", tourData);
}

export const getTours = () => {
    const response =  API.get("/tours");
    console.log(response);
    return response;
}

export const getTour = (id) => {
    const response =  API.get(`/tours/${id}`);
    return response;
}
export const deleteTour = (id) => {
    const response =  API.delete(`/tours/${id}`);
    return response;
}
export const updateTour = (updatedTourData,id) => {
    const response =  API.patch(`/tours/${id}`, updatedTourData);
    return response;
}

export const getToursByUsers = (id) => {
    const response =  API.get(`/tours/userTours/${id}`);// id--> User Id not the tour id
    return response;
}