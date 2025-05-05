'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { imageToBase64, base64ToImageUrl, isValidBase64 } from '@/lib/base64Utils';

const ImageConverter: React.FC = () => {
  const [base64String, setBase64String] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('image/png');
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate that it's an image
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      setFileName(file.name);
      setFileType(file.type);
      
      try {
        // Convert image to base64
        const base64 = await imageToBase64(file);
        setBase64String(base64);
        
        // Show preview of the uploaded image
        setImageUrl(URL.createObjectURL(file));
      } catch (err) {
        console.error('Error converting image:', err);
        setError('Error converting image to base64');
      }
    }
  };

  const handleBase64Change = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (mode === 'decode') {
      const value = e.target.value;
      setBase64String(value);
      
      // Only try to create an image if we have some content
      if (value && isValidBase64(value)) {
        try {
          const newImageUrl = base64ToImageUrl(value, fileType);
          setImageUrl(newImageUrl);
          setError(null);
        } catch (err) {
          console.error('Error converting base64 to image:', err);
          setImageUrl(null);
          setError('Invalid base64 image data');
        }
      } else if (value) {
        setError('Invalid base64 string');
        setImageUrl(null);
      } else {
        setImageUrl(null);
        setError(null);
      }
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setImageUrl(null);
    setBase64String('');
    setError(null);
  };

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
      alert('Base64 string copied to clipboard!');
    }
  };

  const downloadImage = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = fileName || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Image ⟷ Base64</h2>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-medium">
          Mode: {mode === 'encode' ? 'Image to Base64' : 'Base64 to Image'}
        </span>
        <button
          onClick={toggleMode}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Switch to {mode === 'encode' ? 'Decode' : 'Encode'} Mode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Image Upload/Preview */}
        <div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'encode' ? 'Upload Image' : 'Image Preview'}
            </label>
            
            {mode === 'encode' && (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={triggerFileInput}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Select Image File
                </button>
                {fileName && <p className="mt-2 text-sm text-gray-500">{fileName}</p>}
              </div>
            )}
          </div>
          
          <div className="border rounded-md p-2 bg-gray-50 flex items-center justify-center" style={{ minHeight: '250px' }}>
            {imageUrl ? (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="Image preview"
                  className="max-h-60 max-w-full mx-auto object-contain"
                />
                {mode === 'decode' && (
                  <button
                    onClick={downloadImage}
                    className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Download Image
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                {mode === 'encode' 
                  ? 'Upload an image to see preview' 
                  : 'Enter base64 string to see image preview'}
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Base64 Display/Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? 'Encoded Base64' : 'Input Base64 String'}
          </label>
          <textarea
            ref={textAreaRef}
            value={base64String}
            onChange={handleBase64Change}
            readOnly={mode === 'encode'}
            placeholder={mode === 'encode' 
              ? 'Base64 string will appear here after you upload an image' 
              : 'Paste base64 string here to convert to image'}
            className={`w-full h-64 p-2 border rounded-md font-mono text-sm ${
              mode === 'encode' ? 'bg-gray-50' : 'bg-white'
            }`}
          ></textarea>
          
          {base64String && mode === 'encode' && (
            <button
              onClick={copyToClipboard}
              className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Copy Base64
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-2 text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      
      {mode === 'decode' && (
        <div className="mt-4 p-2 bg-yellow-50 text-yellow-700 rounded-md">
          <p>
            <strong>Tip:</strong> Base64 image strings are usually very long. Make sure to paste the
            complete string without any extra characters or line breaks.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;