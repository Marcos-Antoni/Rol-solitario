"use client";
import { useState } from "react";
import { obtenerRespuesta, Props } from "../server/OpenAI";
import { getQueryURL } from "../utils/URL";
import Button from "./Button";

const NPCGenerator = () => {
  const [respuesta, setRespuesta] = useState("");

  const allQuerysURL = () => {
    const contexto = getQueryURL("contexto") || "";
    const bacico = getQueryURL("Bacico") || "";
    const motivacion = getQueryURL("Motivacion") || "";
    const personalidad = getQueryURL("Personalidad") || "";
    const aliniamientos = getQueryURL("Aliniamientos") || "";

    return {
      contexto,
      bacico,
      motivacion,
      personalidad,
      aliniamientos,
    };
  };

  const generarNPC = async () => {
    const queryURL = allQuerysURL();
    const filterQueryURL = obtenerFiltros(queryURL);

    if (filterQueryURL.length) {
      setRespuesta(
        `Faltan los datos de la URL(${filterQueryURL.join(", ")})`
      );
      return;
    }

    await generarRespuesta(queryURL);
  };

  const obtenerFiltros = (queryURL: Props) => {
    return Object.entries(queryURL)
      .filter(([, value]) => !value)
      .map(([key]) => key);
  };

  const generarRespuesta = async (queryURL: Props) => {
    setRespuesta("Generando NPC...");
    const res = await obtenerRespuesta(queryURL);
    setRespuesta(res);
  };

  return (
    <div className="flex flex-col items-center">
      <Button onClick={generarNPC}>Generate NPC</Button>

      <div data-testid="contenedor">
        {respuesta && (
          <div className="mt-6 w-full  overflow-auto border border-gray-300 rounded-lg shadow-md">
            <div className="p-6">
              <pre className="whitespace-pre-wrap">{respuesta}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NPCGenerator;
