import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import MatchResult from "../components/MatchResult";
import banner_tittle from "../assets/banner_tittle.png";

export default function Home() {
  const [match, setMatch] = useState(undefined); // undefined = ainda não consultou API
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isMatchObject = (o) =>
    o &&
    typeof o === "object" &&
    (o.image_base64 || o.map_number || o.local || Array.isArray(o.coords));

  // tenta extrair o objeto "match" de vários formatos possíveis
  const normalizeMatch = (data) => {
    if (!data) return null;
    if (isMatchObject(data)) return data;
    if (isMatchObject(data?.matches)) return data.matches;
    if (Array.isArray(data?.matches)) {
      const found = data.matches.find(isMatchObject);
      if (found) return found;
    }
    if (Array.isArray(data)) {
      const found = data.find(isMatchObject);
      if (found) return found;
    }

    // Busca em largura por qualquer objeto que tenha as chaves esperadas
    const queue = [data];
    const seen = new Set();
    while (queue.length) {
      const node = queue.shift();
      if (!node || typeof node !== "object" || seen.has(node)) continue;
      seen.add(node);
      if (isMatchObject(node)) return node;
      for (const k in node) {
        if (node[k] && typeof node[k] === "object") queue.push(node[k]);
      }
    }

    return null;
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      // http://localhost:8000/upload
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Erro ao enviar imagem: ${res.status} ${res.statusText}`);
      }

      // tenta parsear JSON de forma segura
      let data;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text();
        try {
          data = JSON.parse(text);
        } catch (e2) {
          throw new Error("Resposta da API não é JSON válido: " + text.slice(0, 200));
        }
      }

      console.log("raw API response:", data);
      const normalized = normalizeMatch(data);
      console.log("normalized match:", normalized);
      // normalized pode ser objeto ou null
      setMatch(normalized);
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
          <img src={banner_tittle} alt="banner title" className="" />
        </h3>

        <FileUploader onFileUpload={handleFileUpload} />

        {loading && <p className="mt-4 text-gray-500">Processing image...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {/* match === undefined -> ainda não consultou / limpar; match === null -> consultou mas sem resultado */}
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
