import mongoose from "mongoose";
import validator from "validator";

const EventSchema = new mongoose.Schema({
    eventTitle: { 
        type: String,
        required: [true, 'Please provide an event name'],
        minlength: 2,
        maxlength: 50,
        trim:true,
        default:'Add title'
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

    eventType: {
        type: String,
        enum:['Lecture/Talk', 'Family Theate Show', 'Outdoor Tour / Activity', 'Film', 'Drop-in Exhibition', 'Panel Discussion', 'Workshop Event', 'Digital Event', 'Other']
    },

    targetAudience: {
        type: String,
        enum:['0-3', '3-6', '6-10', '10-14', '14-18', '18+', 'All Ages'],
        default: 'All Ages'
    },

    description: { 
        type: String,
        minlength: 2,
        maxlength: 20,
        trim:true,
        default: 'Last name'
    },

    date: {
        type:Date
    },
   
    startTime: { 
        type: Date,
    
    },

    endTime: { 
        type: Date,
    
    },

    admissionPrice: {
        type: Number,
        default: 0,

    },

    theme: {
        type: String,
        enum:['Mind & Body', 'Tech & Innovation', 'Engineering & Robots', 'Food for Thought', 'Science Communication', 'Art & Science', 'History & Science', 'Maths & Physics', 'Environment & Nature', 'Creat. Make. Play.', 'Space']
    },

    status: {
        type: String,
        enum:['approved', 'pending', 'declined'],
        default:'pending'
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    },
},

{timestamps: true}

)

export default mongoose.model('Event', EventSchema)