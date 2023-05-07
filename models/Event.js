import mongoose from "mongoose";


const EventSchema = new mongoose.Schema({
    eventTitle: { 
        type: String,
        required: [true, 'Please provide an event name'],
        minlength: 2,
        maxlength: 200,
        trim:true,
        default:'Add title'
    },

    eventLocation: { 
        eventAddress1: { type: String, default: 'address line 1' },
        eventAddress2: { type: String, default: '' },
        eventCity: { type: String, default: '' },
        eventCounty: { type: String, enum: ['Antrim', 'Down', 'Armagh', 'Derry/Londonderry', 'Tyrone', 'Fermanagh'], default:'Antrim' },
        eventPostalCode: { type: String, default: 'postal code'},
    },

    capacity: { 
        type: Number,
        required: [true, 'How many people can attend you event?'],
               
    },

    eventType: {
        type: String,
        enum:['Lecture/Talk', 'Family Theatre Show', 'Outdoor Tour / Activity', 'Film', 'Drop-in Exhibition', 'Panel Discussion', 'Workshop Event', 'Digital Event', 'Other']
    },

    targetAudience: {
        type: String,
        enum:['0-3', '3-6', '6-10', '10-14', '14-18', '18+', 'All Ages'],
        default: 'All Ages'
    },

    description: { 
        type: String,
        minlength: 2,
        maxlength: 2000,
        trim:true,
        default: ''
    },

    date:[ { 
        type: Date,
    
    }],
   
    startTime: { 
        type: String,
    
    },

    endTime: { 
        type: String,
    
    },

    admissionPrice: {
        type: Number,
        default: 0,

    },

    theme: {
        type: String,
        enum:['Mind & Body', 'Tech & Innovation', 'Engineering & Robots', 'Food for Thought', 'Science Communication', 'Art & Science', 'History & Science', 'Maths & Physics', 'Environment & Nature', 'Create. Make. Play.', 'Space']
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