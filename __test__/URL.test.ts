import { describe, it, expect } from "vitest";
import { setQueryURL, getQueryURL } from "../src/app/utils/URL";

describe("Funcion setQueryURL funciona correctamene", () => {
  it("Funcion setQueryURL lanza error si no se proporciona el parametro name", () => {
    expect(() => setQueryURL("", "valor")).toThrowError(
      "name es requerido"
    );
  });

  it("Funcion setQueryURL lanza error si no se proporciona el parametro value", () => {
    expect(() => setQueryURL("name", "")).toThrowError(
      "value es requerido"
    );
  });

  it("Verifica si el QueryURL se ha creado correctamente", () => {
    setQueryURL("valor", "test");

    const actualURL = new URL(window.location.href);
    const searchParams = actualURL.searchParams;

    expect(searchParams.get("valor")).toBe("test");
  });
});

describe("Funcion getQueryURL funciona correctamene", () => {
  it("Funcion getQueryURL lanza error si no se proporciona el parametro name", () => {
    expect(() => getQueryURL("")).toThrowError("name es requerido");
  });

  it("Funcion getQueryURL devuelve el valor del parametro name", () => {
    setQueryURL("valor", "test");

    expect(getQueryURL("valor")).toBe("test");
  });

  it("Funcion getQueryURL devuelve null si el parametro name no existe", () => {
    setQueryURL("valor", "test");

    expect(getQueryURL("no-existe")).toBeNull();
  });
});

/*
  Verificadores de expect():
  .toBe(): Verifica si el valor es igual al esperado.
  .toEqual(): Verifica si el valor es igual al esperado, incluyendo el tipo y la estructura.
  .toBeTruthy(): Verifica si el valor es verdadero.
  .toBeFalsy(): Verifica si el valor es falso.
  .toBeNull(): Verifica si el valor es nulo.
  .toBeUndefined(): Verifica si el valor es indefinido.
  .toBeNaN(): Verifica si el valor es NaN (Not a Number).
  .toContain(): Verifica si el valor contiene el elemento esperado.
  .toHaveLength(): Verifica si el valor tiene la longitud esperada.
  .toHaveProperty(): Verifica si el valor tiene la propiedad esperada.
  .toBeInstanceOf(): Verifica si el valor es una instancia de la clase esperada.
  .toBeCloseTo(): Verifica si el valor es cercano al esperado (para números).
  .toMatchSnapshot(): Verifica si el valor coincide con la instantánea esperada.
  .toMatchInlineSnapshot(): Verifica si el valor coincide con la instantánea esperada (inline).
  .toThrow(): Verifica si la función lanza el error esperado.
  .toThrowError(): Verifica si la función lanza el error esperado con el mensaje esperado.
  .rejects.toThrow(): Verifica si la promesa rechazada lanza el error esperado.
  .rejects.toThrowError(): Verifica si la promesa rechazada lanza el error esperado con el mensaje esperado.
  .toBeDefined(): Verifica si el valor está definido.
*/
