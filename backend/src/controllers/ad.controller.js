import { Ad } from "../db/model.js";
import Joi from 'joi'
import {uploadOnCloudinary} from "../utils/cloudinary.js"
const adValidationSchema = Joi.object({
    title: Joi.string().required(),
    area: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Valid ObjectId pattern
    subarea: Joi.string().optional().allow(null, ''),
    detailedLocation: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()).optional(), // Array of valid URLs
    description: Joi.string().optional().allow(null, ''),
    floor: Joi.number().integer().optional().allow(null),
    rent: Joi.number().positive().optional().allow(null),
    advanceDeposit: Joi.number().positive().optional().allow(null),
    willRefundAdvance: Joi.boolean().optional(),
    category: Joi.string().valid('Family', 'Bachelor', 'Hostel', 'Office', 'Sublet', 'Female', 'Shop', 'Garage').optional(),
    bedrooms: Joi.number().integer().positive().optional().allow(null),
    bathrooms: Joi.number().integer().positive().optional().allow(null),
    facilities: Joi.array().items(
        Joi.string().valid(
            'Wifi', 'Gas', 'Parking', 'Lift', 'Water Supply', 'Sunlight & Ventilation', 
            'Markets Nearby', 'Security', 'High Commode', 'Balcony'
        )
    ).optional(),
    isAvailable: Joi.boolean().optional(),
    availableFrom: Joi.date().optional().allow(null),
    owner: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(), // Valid ObjectId pattern
});

export const insertAd = async (req, res) => {
    try {
        const adData = req.body.data;
        const serverURIs = req.files.images
        const cloudImages = []
        serverURIs.map(async (img,ind)=>{
            const result = await uploadOnCloudinary(img.path)
            cloudImages.push(result.url)
        })
        const { error } = adValidationSchema.validate({...adData, images:cloudImages});

        if (error) return res.status(400).json({ error: error.details[0].message });
        // Mongoose handles required fields validation
        const newAd = new Ad(adData);
        
        // await newAd.save();
    
        res.status(201).json({ message: 'Ad submitted successfully', data: newAd });
      } catch (err) {
        console.error("Error in saving ad: ", err.message);
        return res.status(400).json({ error: err.message });
      }
};