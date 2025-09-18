import React from "react";

export default function MatchResult({ match }) {
  // Se ainda não houve consulta (undefined) não renderiza nada
  if (match === undefined) return null;

  // match === null significa: consultou e não encontrou correspondência
  if (match === null) {
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

  // procura por possíveis nomes de campo de imagem (robustez)
  const imageBase64 =
    match?.image_base64 ?? match?.image ?? match?.imageBase64 ?? null;

  const formatValue = (v) => {
    if (Array.isArray(v)) return v.join(", ");
    if (v === null || v === undefined) return "—";
    return String(v);
  };

  return (
    <div className="mt-4 flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md">
      <span className="font-bold text-green-700 mb-2 text-lg">Match found!</span>

      {imageBase64 ? (
        <img
          src={`data:image/png;base64,${imageBase64}`}
          alt="Miniatura"
          className="w-32 h-32 object-contain rounded border shadow mb-4"
          onError={(e) => {
            // se base64 inválido, evita quebrar a UI
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <span className="text-gray-500 mb-4">Image unavailable</span>
      )}

      <ul className="text-gray-700 text-sm space-y-1">
        {["map_number", "local", "coords"].map((key) => (
          <li key={key}>
            <strong>{labels[key]}:</strong> {formatValue(match?.[key])}
          </li>
        ))}
        <li>
          <strong>Score:</strong> {match?.score ?? "—"}
        </li>
      </ul>
    </div>
  );
}
