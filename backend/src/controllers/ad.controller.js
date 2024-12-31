import { Ad } from "../db/model.js";
import Joi from 'joi'
import {uploadOnCloudinary} from "../utils/cloudinary.js"
const adValidationSchema = Joi.object({
    title: Joi.string().required(),
    areaId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Valid ObjectId pattern
    subarea: Joi.string().optional().allow(null, ''),
    // detailedLocation: Joi.string().required(),
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
    availableFrom: Joi.string().optional().allow(null),
    owner: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(), // Valid ObjectId pattern
});

export const insertAd = async (req, res) => {
    try {
      const adData = JSON.parse(req.body.data);
      const serverURIs = req.files;
    //   console.log("AdData: ", adData, "\nFiles: ", serverURIs);
  
      const cloudImages = await Promise.all(
        serverURIs.map(async (img, ind) => {
        //   console.log("Local ", ind, " :", img.path);
          const result = await uploadOnCloudinary(img.path);
        //   console.log("Cloud ", ind, " :", result);
          return result.url; // Return the URL to be included in the final array
        })
      );
  
      const { error } = adValidationSchema.validate({ ...adData, images: cloudImages });
  
      if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
          });
      }
  
      const newAd = new Ad({ ...adData, images: cloudImages });
  
      await newAd.save();
  
      res.status(201).json({
        message: 'Ad submitted successfully',
        success: true,
      });
    } catch (err) {
        console.error("Error in saving ad:", err.message);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: err.message, // Optional for debugging purposes, can be removed in production
        });
    }
  };
  