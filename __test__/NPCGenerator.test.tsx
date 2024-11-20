import { describe, it, expect, afterEach, vi } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import NPCGenerator from "../src/app/components/NPCGenerator";
import { setQueryURL } from "../src/app/utils/URL";
import { obtenerRespuesta, Props } from "../src/app/server/OpenAI";

afterEach(() => {
  cleanup();
});

const NPCGeneratorRender = () => {
  return render(<NPCGenerator />);
};

vi.mock("../src/app/server/OpenAI", () => ({
  obtenerRespuesta: vi.fn(() => "respuesta"),
}));

describe("Given NPCGenerator", () => {
  describe("When se renderisa el componente", () => {
    it("Then debe renderizar el boton Generate NPC", () => {
      const { getByRole } = NPCGeneratorRender();

      const button = getByRole("button", { name: "Generate NPC" });

      expect(button).toBeTruthy();
    });

    it("Then deberia aparecer un div bacio", () => {
      const { getByTestId } = NPCGeneratorRender();

      const div = getByTestId("contenedor");

      expect(div).toBeTruthy();

      expect(div.innerHTML).toBe("");
    });
  });

  describe("When se hace click en el boton Generate NPC y no estan todos los datos", () => {
    it("Then si dan click y no hay ningun dato, debe renderizar la etiqueta P con un error indicando los datos que faltan", async () => {
      const { getByRole, getByText } = NPCGeneratorRender();

      const button = getByRole("button", { name: "Generate NPC" });

      fireEvent.click(button);

      const errorText =
        "Faltan los datos de la URL(contexto, bacico, motivacion, personalidad, aliniamientos)";
      const pre = getByText(errorText);

      expect(pre).toBeTruthy();
    });

    it("Then si dan click y falta el dato contexto, debe renderizar la etiqueta P con un error indicando que falta el dato contexto", async () => {
      setQueryURL("Bacico", "Bacico");
      setQueryURL("Motivacion", "Motivacion");
      setQueryURL("Personalidad", "Personalidad");
      setQueryURL("Aliniamientos", "Aliniamientos");

      const { getByRole, getByText } = NPCGeneratorRender();

      const button = getByRole("button", { name: "Generate NPC" });

      fireEvent.click(button);

      const errorText = "Faltan los datos de la URL(contexto)";
      const pre = getByText(errorText);

      expect(pre).toBeTruthy();
    });
  });

  describe("When se hace click en el boton Generate NPC y estan todos los datos", () => {
    it("Then si dan click y estan todos los datos, debe renderizar la etiqueta P con la respuesta de OpenAI", async () => {
      setQueryURL("contexto", "contexto");
      setQueryURL("Bacico", "Bacico");
      setQueryURL("Motivacion", "Motivacion");
      setQueryURL("Personalidad", "Personalidad");
      setQueryURL("Aliniamientos", "Aliniamientos");

      const { getByRole, getByText } = NPCGeneratorRender();

      const button = getByRole("button", { name: "Generate NPC" });

      fireEvent.click(button);

      await new Promise((resolve) => setTimeout(resolve, 1));

      const message = "respuesta";
      const pre = getByText(message);

      expect(pre).toBeTruthy();
    });

    it("Then si dan click y estan todos los datos, si no lo hacemos de forma asincrona, debe renderizar la etiqueta P con la respuesta de Generando NPC...", () => {
      setQueryURL("contexto", "contexto");
      setQueryURL("Bacico", "Bacico");
      setQueryURL("Motivacion", "Motivacion");
      setQueryURL("Personalidad", "Personalidad");
      setQueryURL("Aliniamientos", "Aliniamientos");

      const { getByRole, getByText } = NPCGeneratorRender();

      const button = getByRole("button", { name: "Generate NPC" });

      fireEvent.click(button);

      const message = "Generando NPC...";
      const pre = getByText(message);

      expect(pre).toBeTruthy();
    });
  });
});
