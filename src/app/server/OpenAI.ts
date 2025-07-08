"use server";
import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

export interface Props {
  contexto: string;
  bacico: string;
  motivacion: string;
  personalidad: string;
  aliniamientos: string;
}

export async function obtenerRespuesta(props: Props) {
  try {
    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      responseMimeType: "text/plain",
    };

    const model = "gemini-2.5-flash";

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `
            Contexto: ${props.contexto}
            Bacico: ${props.bacico}
            Motivacion: ${props.motivacion}
            Personalidad: ${props.personalidad}
            Aliniamientos: ${props.aliniamientos}
            -------------------------------------------
            Con estos datos crea un NPC completo para un juego de rol o una historia.

            El texto no debe superar los 1000 caracteres.
            `,
          },
        ],
      },
    ];

    const response = await gemini.models.generateContentStream({
      model,
      config,
      contents,
    });
    let text = "";
    for await (const chunk of response) {
      text += chunk.text;
    }

    return text;
  } catch (error) {
    return `Error de OpenAI Buelbe a intentarlo ${process.env.GEMINI_KEY}`;
  }
}
