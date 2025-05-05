/**
 * Utility functions for Base64 encoding and decoding
 */

// Text to Base64
export const textToBase64 = (text: string): string => {
  if (typeof window !== 'undefined') {
    return window.btoa(text);
  }
  // For server-side
  return Buffer.from(text).toString('base64');
};

// Base64 to Text
export const base64ToText = (base64: string): string => {
  try {
    if (typeof window !== 'undefined') {
      return window.atob(base64);
    }
    // For server-side
    return Buffer.from(base64, 'base64').toString();
  } catch (error) {
    console.error('Error decoding base64:', error);
    return 'Invalid base64 string';
  }
};

// Image to Base64
export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data:image/xxx;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// Base64 to Image (returns object URL that can be used in <img> tags)
export const base64ToImageUrl = (base64: string, mimeType: string = 'image/png'): string => {
  try {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error converting base64 to image:', error);
    return '';
  }
};

// Detect if string is valid base64
export const isValidBase64 = (str: string): boolean => {
  try {
    // Check if it's a valid base64 format
    if (str === '' || str.trim() === '') {
      return false;
    }
    
    // Check if the string contains only valid base64 characters
    return /^[A-Za-z0-9+/=]+$/.test(str);
  } catch (e) {
    return false;
  }
};

// Detect if string contains image data
export const isBase64Image = (str: string): boolean => {
  try {
    return isValidBase64(str) && atob(str).indexOf('\xFF\xD8\xFF') === 0;
  } catch (e) {
    return false;
  }
};