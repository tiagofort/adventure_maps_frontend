import React from "react";

export default function MatchResult({ match }) {
  if (!match) {
    return (
      <div className="mt-4 text-center text-red-600 font-semibold text-lg">
        No match found!
      </div>
    );
  }

  const labels = {
    map_number: "Map Number",
    local: "Local",
    coords: "Coordinates",
  };

  return (
    <div className="mt-4 flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md">
      <span className="font-bold text-green-700 mb-2 text-lg">
        Match found!
      </span>

      {/* Miniatura da imagem do usuário */}
      {match.image_base64 ? (
        <img
          src={`data:image/png;base64,${match.image_base64}`}
          alt="Miniatura"
          className="w-32 h-32 object-contain rounded border shadow mb-4"
        />
      ) : (
        <span className="text-gray-500 mb-4">Image unavailable</span>
      )}

      {/* Lista de dados filtrada */}
      <ul className="text-gray-700 text-sm space-y-1">
        {["map_number", "local", "coords"].map((key) => (
          <li key={key}>
            <strong>{labels[key]}:</strong>{" "}
            {Array.isArray(match[key]) ? match[key].join(", ") : match[key]}
          </li>
        ))}
      </ul>
    </div>
  );
}
