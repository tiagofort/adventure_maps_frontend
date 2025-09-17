import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import MatchResult from "../components/MatchResult";
import mapIcon from "../assets/map.png";

export default function Home() {
  const [match, setMatch] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Erro ao enviar imagem: ${res.statusText}`);
      }

      const data = await res.json();
      console.log(data.matches)
      setMatch(data.matches || null);
    } catch (err) {
      setError(err.message);
      setMatch(undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMatch(undefined);
    setError(null);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-4 overflow-hidden">
      <div className="bg-white relative p-8 rounded-3xl shadow-xl w-full max-w-md text-center z-10">
        <h3 className="flex items-center justify-center text-xl font-bold mb-6 text-blue-700">
          <img src={mapIcon} alt="map icon" className="w-8 h-8 mr-2" />
            ADVENTURE MAPS FINDER
          <img src={mapIcon} alt="map icon" className="w-8 h-8 ml-2" />
        </h3>

        <FileUploader onFileUpload={handleFileUpload} />

        {loading && <p className="mt-4 text-gray-500">Processing image...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {match !== undefined && !loading && <MatchResult match={match} />}

        {match !== undefined && !loading && (
          <button
            onClick={handleReset}
            className="mt-6 px-6 py-2 bg-green-500 hover:bg-red-600 text-white rounded transition"
          >
            Try another image
          </button>
        )}
      </div>
    </div>
  );
}
