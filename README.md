# Base64 Converter

A modern web application built with Next.js 15 and TypeScript that provides utilities for converting between text/images and Base64 encoding.

![Base64 Converter](https://base64-converter-khaki.vercel.app/)

## ✨ Features

### Text Conversion
- Convert plain text to Base64 encoding
- Decode Base64 strings back to plain text
- Real-time conversion as you type
- One-click copy to clipboard
- Input validation

### Image Conversion
- Convert images to Base64 strings
- Convert Base64 strings back to viewable images
- Image preview functionality
- Easy download of converted images
- Support for multiple image formats (PNG, JPEG, GIF, etc.)

## 🚀 Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For responsive and modern UI design
- **Client-side processing**: All conversions happen in the browser, ensuring privacy

## 📋 Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/base64-converter.git
   cd base64-converter
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔍 How to Use

### Text to Base64
1. Navigate to the "Text ⟷ Base64" section
2. Ensure you're in "Text to Base64" mode
3. Enter your text in the input field
4. The Base64 encoded result will appear in real-time
5. Click the "Copy" button to copy the result to clipboard

### Base64 to Text
1. Navigate to the "Text ⟷ Base64" section
2. Click "Switch to Decode Mode"
3. Paste the Base64 string in the input field
4. The decoded text will appear in real-time
5. Click the "Copy" button to copy the result to clipboard

### Image to Base64
1. Navigate to the "Image ⟷ Base64" section
2. Ensure you're in "Image to Base64" mode
3. Click "Select Image File" and choose an image from your device
4. The image preview and Base64 string will appear
5. Click "Copy Base64" to copy the encoded string

### Base64 to Image
1. Navigate to the "Image ⟷ Base64" section
2. Click "Switch to Decode Mode"
3. Paste the Base64 string in the text area
4. The image preview will appear if the Base64 string is valid
5. Click "Download Image" to save the image to your device

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
```

Then, you can start the production server:

```bash
npm run start
# or
yarn start
```

## 📚 API Reference

### Utility Functions

The application provides several utility functions in the `lib/base64Utils.ts` file:

- `textToBase64(text: string): string` - Converts text to Base64
- `base64ToText(base64: string): string` - Converts Base64 to text
- `imageToBase64(file: File): Promise<string>` - Converts an image file to Base64
- `base64ToImageUrl(base64: string, mimeType: string): string` - Converts Base64 to an image URL
- `isValidBase64(str: string): boolean` - Checks if a string is valid Base64

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and users of this application

---

Made with ❤️ using Next.js 15 and TypeScript
