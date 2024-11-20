"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
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
    const respuesta = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente que crea NPC con la informacion que el usuraio te pasa, el NPC que crees debe ser una descripsion brebe y al grano",
        },
        {
          role: "user",
          content: `
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
    });

    return (
      respuesta.choices[0].message.content || "Buelbe a intentarlo"
    );
  } catch (error) {
    console.error(error);
    return "Error de OpenAI Buelbe a intentarlo";
  }
}
