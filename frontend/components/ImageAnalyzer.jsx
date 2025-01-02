import { GoogleGenerativeAI } from '@google/generative-ai';



const ImageAnalyzer = async (imageUrl) => {
    try {
        const genAI = new GoogleGenerativeAI('AIzaSyAXQmF5RBa1ogTfEzSbM5CGIIclqCeAuOg');

        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Ans in boolean. Tell me whether the image is an image of a room or not.";

        const imageResponse = await fetch(imageUrl);
        const imageData = await imageResponse.blob();
        const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(imageData);
        });

        const imageParts = [{
            inlineData: {
                data: base64Data.split(',')[1],
                mimeType: 'image/jpeg',
            }
        }];

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();

        return text;

    } catch (error) {
        console.error("Error analyzing image:", error);
        return "error";
    }
};

export default ImageAnalyzer;