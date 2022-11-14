import mongoose from "mongoose";
import validator from "validator";

const EventSchema = new mongoose.Schema({
    eventTitle: { 
        type: String,
        required: [true, 'Please provide an event name'],
        minlength: 2,
        maxlength: 50,
        trim:true,
    },

    location: { 
        type: String,
        required: [true, 'Please provide an event location'],
        
        unique: true,
    },

    capacity: { 
        type: Number,
        required: [true, 'How many people can attend you event?'],
               
    },

    description: { 
        type: String,
        minlength: 2,
        maxlength: 20,
        trim:true,
        default: 'Last name'
    },

   
    startTime: { 
        type: Date,
    
    },

    endTime: { 
        type: Date,
    
    },

})

export default mongoose.model('Event', EventSchema)