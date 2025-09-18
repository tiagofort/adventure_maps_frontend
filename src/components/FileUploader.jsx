import React, { useRef, useEffect } from "react";
import pb from "../assets/pb.png"; // sua imagem da Premiere Ball

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
    <div className="flex flex-col items-center">
      {/* input escondido */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
        className="hidden"
      />

      {/* botão estilizado */}
      <label
        htmlFor="fileInput"
        className="
          cursor-pointer flex items-center gap-2 
          border-2 rounded-full px-6 py-3 
          bg-white text-red-600 border-red-600
          hover:bg-red-600 hover:text-white 
          transition duration-300 ease-in-out
          shadow-md hover:shadow-lg
        "
      >
        <img src={pb} alt="Upload icon" className="w-6 h-6" />
          <span className="font-bold">Choose a file</span>
        <img src={pb} alt="Upload icon" className="w-6 h-6" />
      </label>

      <p className="text-black-500 font-bold text-sm text-center mt-2">
        You can also paste an image with <kbd>Ctrl</kbd> + <kbd>V</kbd>
      </p>
    </div>
  );
}
