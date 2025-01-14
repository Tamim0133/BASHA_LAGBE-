import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const locationSchema = new Schema(
    {
        division: {
            type: String,
        },
        district: {
            type: String,
        },
        area: {
            type: String,
        },
        subareas: [String]
    }
)


export const Location = mongoose.model("Location", locationSchema)

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true, 
        },
        email: {
            type: String,
            lowercase: true,
            trim: true, 
        },
        contactNo: {
            type: String,
            unique: true,
            required: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        myAds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Ad"
            }
        ],
        unlockedPersons: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        wishlist: [
            {
                type: Schema.Types.ObjectId,
                ref: "Ad"
            }
        ],
        credits: {
            type: Number,
            default: 0
        },
        refreshToken: {
            type: String
        }

    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)


const adSchema = new Schema(
    {
        title: {
            type: String, 
            required: true
        },
        areaId: {
            type: Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },
        subarea : String,
        detailedLocation:  {
            type: String, 
            required: true
        },
        images: [String], //cloudinary url
        description : String,
        floor : Number,
        rent : Number,
        advanceDeposit : Number,
        willRefundAdvance: {
            type: Boolean,
            default: true
        },
        category: {
            type: String, 
            enum: ['Family', 'Bachelor', 'Hostel', 'Office', 'Sublet', 'Female', 'Shop', 'Garage']
        },
        bedrooms : Number,
        bathrooms : Number,
        facilities: {
            type: [String], 
            enum: ['Wifi', 'Gas', 'Parking', 'Lift', 'Water Supply', 'Sunlight & Ventilation', 'Markets Nearby', 'Security', 'High Commode', 'Balcony']
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        availableFrom : String,
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)

export const Ad = mongoose.model("Ad", adSchema)