import { Ad } from "../db/model.js";
import Joi from 'joi'
import {uploadOnCloudinary} from "../utils/cloudinary.js"
const adValidationSchema = Joi.object({
    title: Joi.string().required(),
    areaId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Valid ObjectId pattern
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
    latitude: Joi.number().optional().allow(null),
    longitude: Joi.number().optional().allow(null),
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
  
      const cloudImages = await Promise.all(
      serverURIs.map(async (img, ind) => {
        const result = await uploadOnCloudinary(img.path);
        return result.url; 
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
  

export const getAds = async (req, res) => {
      try {
          const {
              areaId,
              subArea,
              sortBy, // e.g., "priceLowToHigh", "priceHighToLow", "newest"
              propertyType, // e.g., "Family", "Bachelor"
              priceMin, // minimum price
              priceMax, // maximum price
              bathrooms, // number of bathrooms
              bedrooms, // number of bedrooms
              features // array of features, e.g., ['Wifi', 'Parking']
          } = req.query;
  
          // Build the query object for filtering
          const filters = {};
  
          if (areaId) filters.areaId = areaId;
          if (subArea) filters.subarea = subArea;
          if (propertyType) filters.category = propertyType;
          if (priceMin || priceMax) filters.rent = {};
          if (priceMin) filters.rent.$gte = Number(priceMin);
          if (priceMax) filters.rent.$lte = Number(priceMax);
          if (bathrooms) filters.bathrooms = Number(bathrooms);
          if (bedrooms) filters.bedrooms = Number(bedrooms);
          if (features && Array.isArray(features)) filters.facilities = { $all: features };
  
          // Determine sorting
          let sortOption = {};
          if (sortBy === "priceLowToHigh") {
              sortOption.rent = 1;
          } else if (sortBy === "priceHighToLow") {
              sortOption.rent = -1;
          } else if (sortBy === "newest") {
              sortOption.createdAt = -1;
          }
  
          // Fetch ads from the database
          const ads = await Ad.find(filters)
              .sort(sortOption)
              // .populate("area") // Populate area details
              // .populate("owner", "name email"); // Populate owner details with selected fields
  
          res.status(200).json({
              success: true,
              data: ads,
          });
      } catch (error) {
          console.error("Error fetching ads:", error);
          res.status(500).json({
              success: false,
              message: "An error occurred while fetching ads.",
              error: error.message,
          });
      }
  };
  
  export const getOne = async (req, res) => {
        try {
            const {id} = req.params;

            const ad = await Ad.findById(String(id))
            console.log("ad is: ", ad);
            
            res.status(200).json({
                success: true,
                data: ad,
            });
        } catch (error) {
            console.error("Error fetching a ad:", error);
            res.status(500).json({
                success: false,
                message: "An error occurred while fetching ad.",
                error: error.message,
            });
        }
    };
