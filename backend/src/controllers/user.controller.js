import {ApiResponse} from '../utils/ApiResponse.js'
import{ ApiError }from '../utils/ApiError.js'
import {User, Ad} from '../db/model.js' 
import jwt from 'jsonwebtoken'

export const fetchOwner = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Owner ID is required.' 
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid ObjectId.' 
      });
    }

    // Find the user by ID and exclude sensitive fields
    const existedUser = await User.findById(userId).select("-password -refreshToken");

    // Check if the user exists
    if (!existedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'Owner not found.' 
      });
    }

    // Return the user data
    return res.status(200).json({
      success: true,
      message: 'Owner fetched successfully.',
      user: existedUser,
    });
  } catch (error) {
    console.error('Error fetching owner:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the owner.',
      error: error.message,
    });
  }
};


export const registerUser =  async (req, res) => {
  try{

    const {contactNo, username, password } = req.body

    if (
        [contactNo, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { contactNo }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with this username or contact no. already exists")
    }

    const user = await User.create({
        username,
        password,
        contactNo
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
        success: false,
        message: "An error occurred while registering user.",
        error: error.message,
    });
  }
} 

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.log(error);
        
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

export const loginUser = async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie
  try{
    const {contactNo, password} = req.body
    // console.log(email);

    if (!contactNo && !password) {
      return res
      .json( new ApiResponse(400, {}, "username or email is required"))
    }

    const user = await User.findOne({contactNo})

    if (!user) {
      return res
      .json( new ApiResponse(404, {}, "User does not exist"))
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    return res
      .json( new ApiResponse(401, {},  "Invalid password"))
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    console.log("accessToken");
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
        success: false,
        message: "An error occurred while logging in.",
        error: error.message,
    });
  }
}

export const verifyUser = async (req, res) => {
  
  const verifyToken = (token, secret) =>
    new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
    
    const accessToken = req.headers.authorization?.split(' ')[1]; // Extract token after "Bearer"
    const refreshToken = req.headers['x-refresh-token'];  
    try {
      const decoded = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const loggedInUser = await User.findById(decoded._id).select("-password -refreshToken");
  
      return res.status(200).json(
        new ApiResponse(200, { user: loggedInUser, accessToken }, "User is logged In")
      );
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const {newAccessToken, user} = refreshAccessToken(refreshToken);
        return res.status(200).json(
          new ApiResponse(200, {user, accessToken: newAccessToken }, "Access token refreshed")
        );
      } else {
        console.log(err);
        
        throw new ApiError(401, err.message);
      }
    }
  };
  
const refreshAccessToken = async (incomingRefreshToken) => {
  try{
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
          if (err.name === 'TokenExpiredError') throw new ApiError(401, "Token expired. Login again");
          else throw new ApiError(401, err.message);
      }
    }
  );

  const user = await User.findById(decodedToken._id);
  if (!user || incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newAccessToken = await user.generateAccessToken();
  return {newAccessToken, user};


} catch (error) {
  console.error("Error refreshing token:", error);
}
}

// async function logout() {
//   await SecureStore.deleteItemAsync('accessToken');
//   await SecureStore.deleteItemAsync('refreshToken');
//   // Navigate to login screen or show a logout message
// }


export const addToWishlist =  async (req, res) => {
  try{

    const {userId, adId} = req.body

    const existedUser = await User.findById(userId)

    if (!existedUser) {
      return res.status(404).json(ApiResponse(404, {}, "User doesnot exist with this ID"))
    }
    
    const existedAd = await Ad.findById(adId)

    if (!existedAd) {
        return res.status(404).json(ApiResponse(404, {}, "Ad doesnot exist with this ID"))
    }

    existedUser.myAds.push(adId)
    await existedUser.save()

    return res.status(201).json(
        new ApiResponse(201, {}, "Ad added to wishlist Successfully")
    )
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({
        success: false,
        message: "An error occurred while adding to wishlist.",
        error: error.message,
    });
  }
}

export const removeFromWishlist =  async (req, res) => {
  try{

    const {userId, adId} = req.body

    const existedUser = await User.findById(userId)

    if (!existedUser) {
      return res.status(404).json(ApiResponse(404, {}, "User doesnot exist with this ID"))
    }

    existedUser.myAds.filter((id)=> (id != adId))
    await existedUser.save()

    return res.status(201).json(
        new ApiResponse(201, {}, "Ad removed from wishlist Successfully")
    )
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({
        success: false,
        message: "An error occurred while removing from wishlist.",
        error: error.message,
    });
  }
} 