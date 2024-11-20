import { describe, it, expect } from "vitest";
import { CreateRandomSentence } from "../src/app/utils/CreateRandomSentence";
import { tablets } from "../src/app/utils/dataTablets";
import { getQueryURL, setQueryURL } from "../src/app/utils/URL";

describe("Given la funcion CreateRandomSentence", () => {
  describe("When no le pasamos los datos correctos", () => {
    it("Then si el dato dataTable tiene un array vacio para sustantivo, debe lanzar un error", () => {
      expect(() =>
        CreateRandomSentence(
          { sustantivo: [], modificador: ["modificador"] },
          "name"
        )
      ).toThrowError("dataTable no puede tener arrays vacios");
    });

    it("Then si el dato dataTable tiene un array vacio para modificador, debe lanzar un error", () => {
      expect(() =>
        CreateRandomSentence(
          { sustantivo: ["sustantivo"], modificador: [] },
          "name"
        )
      ).toThrowError("dataTable no puede tener arrays vacios");
    });

    it("Then si el dato dataTable tiene arrays vacios para ambos, sustantivo y modificador, debe lanzar un error", () => {
      expect(() =>
        CreateRandomSentence(
          { sustantivo: [], modificador: [] },
          "name"
        )
      ).toThrowError("dataTable no puede tener arrays vacios");
    });

    it("Then si el dato name es un string vacio, debe lanzar un error", () => {
      expect(() =>
        CreateRandomSentence(
          {
            sustantivo: ["sustantivo"],
            modificador: ["modificador"],
          },
          ""
        )
      ).toThrowError("name es requerido");
    });
  });

  describe("When le pasamos los datos correctos", () => {
    it("Then debe devolver una horacion de 2 palabras", () => {
      const res = CreateRandomSentence(tablets.aliniamientos, "name");

      const arrayRes = res.split(" ");

      expect(arrayRes.length).toBe(2);
    });

    it("Then debe devolver una horacion que utilice los datos de sustantivo y modificador de tablets.aliniamientos", () => {
      const { sustantivo, modificador } = tablets.aliniamientos;
      const res = CreateRandomSentence(tablets.aliniamientos, "name");

      const arrayRes = res.split(" ");
      const isSustantivo = sustantivo.includes(arrayRes[0]);
      const isModificador = modificador.includes(arrayRes[1]);

      expect(isSustantivo).toBeTruthy();
      expect(isModificador).toBeTruthy();
    });

    it("Then debe crear un nuevo Query en la URL con el nombre que le pasamos y su valor sera la horacion generada que nos retorna", () => {
      const res = CreateRandomSentence(tablets.aliniamientos, "name");

      const value = getQueryURL("name");

      expect(value).toBe(res);
    });
  });
});
