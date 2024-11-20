import { describe, it, expect, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import ParentGenerator from "../src/app/components/Factory/ParentGenerator";
import { getQueryURL, setQueryURL } from "../src/app/utils/URL";
import { tablets } from "../src/app/utils/dataTablets";

afterEach(() => {
  cleanup();
});

const FNRender = (
  dataTable = tablets.aliniamientos,
  name = "name"
) => {
  return render(
    <ParentGenerator dataTable={dataTable} name={name} />
  );
};

describe("Given ParentGenerator", () => {
  describe("When le pasamos dataTable o name de forma incorrecta", () => {
    it("Then si no le pasamos name, debe lanzar una etiqueta P que diga que falta name", () => {
      const { getByRole } = FNRender(tablets.aliniamientos, "");

      const p = getByRole("paragraph");

      expect(p.innerHTML).toBe("Falta name");
    });

    it("Then debe lanzar una etiqueta P que diga que falta los datos de dataTable(sustantivo)", () => {
      const { getByRole } = FNRender(
        { sustantivo: [], modificador: ["modificador"] },
        "name0"
      );

      const p = getByRole("paragraph");

      expect(p.innerHTML).toBe(
        "Falta los datos de dataTable(sustantivo)"
      );
    });
    it("Then debe lanzar una etiqueta P que diga que falta los datos de dataTable(modificador)", () => {
      const { getByRole } = FNRender(
        { sustantivo: ["sustantivo"], modificador: [] },
        "name1"
      );

      const p = getByRole("paragraph");

      expect(p.innerHTML).toBe(
        "Falta los datos de dataTable(modificador)"
      );
    });

    it("Then debe lanzar una etiqueta P que diga que falta los datos de dataTable(sustantivo, modificador)", () => {
      const { getByRole } = FNRender(
        { sustantivo: [], modificador: [] },
        "name2"
      );

      const p = getByRole("paragraph");

      expect(p.innerHTML).toBe(
        "Falta los datos de dataTable(sustantivo,modificador)"
      );
    });
  });

  describe("When el componente tiene los datos correctos", () => {
    it("Then debe aparecer solo 1 etiqueta con el valor de name", () => {
      const { getByText } = FNRender(tablets.aliniamientos, "name3");

      const name = getByText("name3");

      expect(name).toBeTruthy();
    });
  });

  describe("when el componente se renderiza sin datos en la URL", () => {
    it("Then el boton debe tener el texto 'Generar'", () => {
      const { getByRole } = FNRender(tablets.aliniamientos, "name3");

      const btn = getByRole("button", { name: "Generar" });

      expect(btn).toBeTruthy();
    });

    it("Then la etiqueta P deve estar bacia", () => {
      const { getByRole } = FNRender(tablets.aliniamientos, "name4");

      const p = getByRole("paragraph");

      expect(p.innerHTML).toBe("");
    });
  });

  describe("When le damos click al boton generar", () => {
    it("Then la etiqueta P tendra informacion", () => {
      const { getByRole } = FNRender(tablets.aliniamientos, "name5");

      const btn = getByRole("button", { name: "Generar" });

      fireEvent.click(btn);

      const p = getByRole("paragraph");

      expect(!!p.innerHTML).toBeTruthy();
    });

    it("Then la URL sebe tener un query con el nombre de name y el valor de la etiqueta P", () => {
      const { getByRole } = FNRender(tablets.aliniamientos, "name6");

      const btn = getByRole("button", { name: "Generar" });
      fireEvent.click(btn);

      const p = getByRole("paragraph");

      const query = getQueryURL("name6");

      expect(query).toBe(p.innerHTML);
    });
  });

  describe("When el componente se renderiza con datos de la URL", () => {
    it("Then la etiqueta P debe tener el valor de la URL", () => {
      setQueryURL("name7", "test");
      const { getByRole } = FNRender(tablets.aliniamientos, "name7");
      const p = getByRole("paragraph");
      expect(p.innerHTML).toBe("test");
    });
  });
});
