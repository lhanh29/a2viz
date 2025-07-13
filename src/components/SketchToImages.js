import React, { useState, useEffect, useRef } from "react"; // make sure useRef and useEffect are imported
import axios from "axios";

const SketchToImages = () => {
  const [generatedResults, setGeneratedResults] = useState([]); // Store results
  const [uploadedImage, setUploadedImage] = useState(null); // Store uploaded image
  const [prompt, setPrompt] = useState(""); // Store prompt input
  const [loading, setLoading] = useState(false); // Loading state
  const [ratio, setRatio] = useState("Widescreen (16:9)");
  const [resolution, setResolution] = useState("1344 x 768");
  const [style, setStyle] = useState("Realistic");



 // 🔥 Add ref for scroll into view
 const toolRef = useRef(null);

 useEffect(() => {
  // Wait until DOM is painted
  const timer = setTimeout(() => {
    if (toolRef.current) {
      toolRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      // Optional visual highlight effect:
      toolRef.current.classList.add("ring", "ring-blue-500", "ring-offset-2");

      // Remove highlight after a few seconds
      setTimeout(() => {
        toolRef.current.classList.remove("ring", "ring-blue-500", "ring-offset-2");
      }, 2000);
    }
  }, 500); // delay to ensure full page loads before scroll

  return () => clearTimeout(timer);
}, []);



  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Store image as Base64 URL
      };
      reader.readAsDataURL(file);
    }
  };


  // Handle Generate button click
  const handleGenerate = async () => {
    if (!uploadedImage || !prompt) {
      alert("Please upload an image and provide a prompt before generating.");
      return;
    }
  
    setLoading(true); // Set loading state
    try {
      const apiKey = process.env.REACT_APP_STABLE_API_KEY;
  
      // Remove the Base64 prefix
      const base64Data = uploadedImage.split(",")[1];
  

      // Define style map before the axios call
              const styleMap = {
               "Realistic": "photographic",
                "Artistic": "enhance",
              };

      // Make API request to Stability AI endpoint
      const response = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/sd3", // Updated endpoint
        {
          prompt,                   // User prompt input
          init_image: base64Data,   // Base64 content without prefix
          output_format: "webp",    // Required output format
          style_preset: styleMap[style], // ✅ Mapped dynamically
          cfg_scale: 7,             // Guidance scale (1-20)
          steps: 30,                // Steps for image generation
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "image/*",      // Ensure proper response format
          },
          responseType: "blob",     // Important for image response
        }
      );
  
      // Convert the Blob response to a URL and display it
      const imageBlob = new Blob([response.data], { type: "image/webp" });
      const imageUrl = URL.createObjectURL(imageBlob);
        setGeneratedResults([imageUrl]); // Set the image URL
    } catch (error) {
      console.error("Error generating image:", error.response?.data || error.message);
      alert("Failed to generate image. Please check your API key and input.");
    } finally {
      setLoading(false);
    }
  };
  
  
  // Helper to convert Base64 to File
  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  

  return (
    <div
  className="flex flex-col h-screen bg-black text-white"
  ref={toolRef}
  id="sketch-to-images-section"
    >

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-gray-700"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      >
        <div className="flex items-center space-x-2">
          <div className="text-xl font-semibold">≡</div>
          <h1 className="text-sm font-semibold">Sketch to Images</h1>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="text-sm text-blue-400 font-semibold">Untitled session</div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 border border-gray-500 rounded text-sm text-gray-400 hover:text-white hover:border-white">
            Save In...
          </button>
          <button className="bg-blue-600 px-4 py-1 rounded text-sm hover:bg-blue-500">
            Upgrade
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className="w-1/4 p-4 border-r border-gray-700 flex flex-col justify-between"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            border: "1px solid rgba(128, 128, 128, 0.2)",
            borderRadius: "8px",
            margin: "16px",
          }}
        >
          <div>
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Settings</h2>
              <a href="#" className="text-blue-400 text-sm hover:underline">
                Advanced
              </a>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Ratio</label>
              <select
                 value={ratio}
                 onChange={(e) => setRatio(e.target.value)}
                  className="w-full bg-gray-800 text-white p-2 rounded"
                 >
                         <option>Widescreen (16:9)</option>
                         <option>Square (1:1)</option>
                         <option>Portrait (9:16)</option>
             </select>

            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Resolution</label>
              <select
                 value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                       className="w-full bg-gray-800 text-white p-2 rounded"
               >
                    <option>1344 x 768</option>
                    <option>1920 x 1080</option>
                   <option>3840 x 2160</option>
             </select>

            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Style</label>
              <select
                   value={style}
                         onChange={(e) => setStyle(e.target.value)}
                     className="w-full bg-gray-800 text-white p-2 rounded"
              >
                      <option>Realistic</option>
                      <option>Artistic</option>
              </select>

            </div>


            {/* Upload Section */}
            <div className="flex-1 flex flex-col items-center justify-center border-dashed border-2 border-gray-700 mb-4 p-4 rounded-lg">
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded" className="w-full h-32 object-contain rounded mb-2" />
              ) : (
                <p className="text-gray-400 mb-2">Drop Image or Video</p>
              )}
              <label
                htmlFor="file-upload"
                className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
              >
                Select Asset
              </label>
              <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </div>

 {/* Prompt Section */}
 <div className="mb-4 p-4 rounded-lg border border-gray-700 bg-black">
              {/* Prompt Label */}
              <label className="block text-sm font-semibold mb-2">Prompt</label>
              {/* Text Area */}
              <textarea
                className="w-full bg-gray-800 text-white p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Describe an image you want to generate..."
                rows="4"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
              {/* Train Your Own Model */}
              <div className="flex items-center justify-between mt-4">
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4H9m4 0v4m0 0H9m4 0v4m1-10h1m-2-1V4m0 5V4m-1 5V4m0 4h3m-3 0H9m6-2v2"
                    />
                  </svg>
                  Train your own model
                </button>
                <button className="text-white bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700">
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleGenerate}
              className="bg-green-600 px-6 py-3 rounded text-white hover:bg-green-500 w-full"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {/* Center Panel */}
        

        {/* Center Panel Results */}
<div className="flex-1 flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg">
  {generatedResults.length === 0 ? (
    <p className="text-gray-400">Center Panel Placeholder</p>
  ) : (
    <div className="w-full max-w-4xl">
      <h3 className="text-lg font-semibold mb-4 text-blue-400">Generated Image:</h3>
      <img
        src={generatedResults[0]} // Actual image URL
        alt="Generated Result"
        className="w-full rounded-lg"
      />
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default SketchToImages;
