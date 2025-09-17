import React, { useRef, useEffect } from "react";

export default function FileUploader({ onFileUpload }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileUpload(file);
    inputRef.current.value = "";
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          onFileUpload(file);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
        className="block w-full border border-gray-300 rounded p-2 mb-4 hover:border-blue-500 transition"
      />
      <p className="text-gray-500 text-sm text-center">
        You can also paste an image with <kbd>Ctrl</kbd> + <kbd>V</kbd>
      </p>
    </div>
  );
}
