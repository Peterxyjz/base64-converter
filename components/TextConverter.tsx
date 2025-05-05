'use client';

import React, { useState, useEffect } from 'react';
import { textToBase64, base64ToText, isValidBase64 } from '@/lib/base64Utils';

const TextConverter: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [base64, setBase64] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'encode') {
      try {
        setBase64(textToBase64(text));
        setError(null);
      } catch (err) {
        setError('Error encoding text');
      }
    } else {
      // In decode mode, only convert if valid base64
      if (base64 && isValidBase64(base64)) {
        try {
          setText(base64ToText(base64));
          setError(null);
        } catch (err) {
          setError('Invalid base64 string');
        }
      } else if (base64) {
        setError('Invalid base64 string');
      } else {
        setText('');
        setError(null);
      }
    }
  }, [text, base64, mode]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (mode === 'encode') {
      setText(e.target.value);
    } else {
      // Deliberately not updating text as it's derived from base64 in decode mode
      console.log('Text field is read-only in decode mode');
    }
  };

  const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (mode === 'decode') {
      setBase64(e.target.value);
    } else {
      // Deliberately not updating base64 as it's derived from text in encode mode
      console.log('Base64 field is read-only in encode mode');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setError(null);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        alert('Copied to clipboard!');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Text ⟷ Base64</h2>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-medium">
          Mode: {mode === 'encode' ? 'Text to Base64' : 'Base64 to Text'}
        </span>
        <button
          onClick={toggleMode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Switch to {mode === 'encode' ? 'Decode' : 'Encode'} Mode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? 'Input Text' : 'Decoded Text'}
          </label>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder={mode === 'encode' ? 'Enter text to encode' : 'Decoded text will appear here'}
            readOnly={mode === 'decode'}
            className={`w-full h-40 p-2 border rounded-md ${
              mode === 'decode' ? 'bg-gray-100' : 'bg-white'
            }`}
          ></textarea>
          {mode === 'decode' && (
            <button
              onClick={() => copyToClipboard(text)}
              className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              disabled={!text}
            >
              Copy
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? 'Encoded Base64' : 'Input Base64'}
          </label>
          <textarea
            value={base64}
            onChange={handleBase64Change}
            placeholder={mode === 'encode' ? 'Encoded base64 will appear here' : 'Enter base64 to decode'}
            readOnly={mode === 'encode'}
            className={`w-full h-40 p-2 border rounded-md ${
              mode === 'encode' ? 'bg-gray-100' : 'bg-white'
            }`}
          ></textarea>
          {mode === 'encode' && (
            <button
              onClick={() => copyToClipboard(base64)}
              className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              disabled={!base64}
            >
              Copy
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-2 text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextConverter;