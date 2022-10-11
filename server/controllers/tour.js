import mongoose from "mongoose";
import TourModel from "../models/tour.js";

export const createTour = async (req,res) => {
    const tour = req.body;
    console.log(req.userId);
    const newTour = new TourModel({
        ...tour,
        creator : req.userId,
        createdAt: new Date().toISOString(),
    });

    try{
        await newTour.save();
        res.status(201).json(newTour);
    }catch(error){
        res.status(404).json({
            message: "Something went wrong",
        });
    }
};

export const getTours = async (req, res) => {
    try{
        const tours = await TourModel.find();
        res.status(200).json(tours);
    }
    catch (error){
        res.status(404).json({
            message: "Something went wrong",
        });
    }
}

export const getTour = async (req, res) => {
    const { id } = req.params;
    try{
        const tour = await TourModel.findById(id);
        console.log(id);
        res.status(200).json(tour);
    }
    catch (error){
        res.status(404).json({
            message: "Something went wrong",
        });
    }
}


export const getToursByUsers = async (req, res) => {
    const{id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: " User does not exists"});
    }

    const userTours = await TourModel.find({creator: id});
    res.status(200).json(userTours);
}

export const deleteTour = async (req, res) => {
   const {id} = req.params;
   try
    {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: "No Tour Exists"});
        }
            
        await TourModel.findByIdAndRemove(id);
        res.json({message : "Tour deleted successfully"});
    }catch(error){
        res.status(404).json({
            message: "Something went wrong",
        });
    }
}

export const updateTour = async (req, res) => {
   
    const {id} = req.params;
    const { title, description, creator, imageFile, tags} = req.body;
    try
    {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: "No Tour Exists"});
        }
        
        const updatedTour = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id : id
        }
        await TourModel.findByIdAndUpdate(id, updatedTour, {new : true});
        res.json(updatedTour);
    }catch(error){
        res.status(404).json({
            message: "Something went wrong",
        });
    }
 }