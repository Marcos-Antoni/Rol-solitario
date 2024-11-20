import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import TextAreaComponent from "../src/app/components/TextareaComponent";
import { getQueryURL, setQueryURL } from "../src/app/utils/URL";

const placeholder = "Da un contexto sobre tu NPC...";

describe("Given TextAreaComponent", () => {
  describe("When el componente se renderisa sin datos de la URL", () => {
    it("Then el componente debe tener un textarea con un placeholder", () => {
      const { getByPlaceholderText, unmount } = render(
        <TextAreaComponent />
      );
      const textarea = getByPlaceholderText(placeholder);

      expect(textarea).toBeTruthy();
      unmount();
    });
  });

  describe("When interactuan con el componente", () => {
    it("Then el compoenete debe cambiar el value", () => {
      const { getByPlaceholderText, unmount } = render(
        <TextAreaComponent />
      );
      const textarea = getByPlaceholderText(placeholder);

      fireEvent.change(textarea, { target: { value: "Hola Mundo" } });

      expect(textarea.textContent).toBe("Hola Mundo");

      unmount();
    });

    it("Then el componente debe cambiar la URL", () => {
      const { getByPlaceholderText, unmount } = render(
        <TextAreaComponent />
      );
      const textarea = getByPlaceholderText(placeholder);

      fireEvent.change(textarea, { target: { value: "Hola Mundo" } });

      const value = getQueryURL("contexto");

      expect(value).toBe("Hola Mundo");

      unmount();
    });
  });

  describe("When el componente se renderisa con datos de la URL", () => {
    it("Then el componente debe tener el valor del query contexto", () => {
      setQueryURL("contexto", "Hola");

      const { getByPlaceholderText, unmount } = render(
        <TextAreaComponent />
      );

      const textarea = getByPlaceholderText(placeholder);

      expect(textarea.textContent).toBe("Hola");
      unmount();
    });
  });
});
