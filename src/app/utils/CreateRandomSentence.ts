import { setQueryURL } from "./URL";
import type { DataTable } from "../types/DataTable";

type typeDetectErrors = (
  dataTable: DataTable,
  name: string
) => string | void;
type typeCreateRandomSentence = (
  dataTable: DataTable,
  name: string
) => string;

export const CreateRandomSentence: typeCreateRandomSentence = (
  dataTable,
  name
) => {
  detectErrors(dataTable, name);

  const { sustantivo, modificador } = dataTable;

  const randomSustantivo = sustantivo[numRandom(sustantivo.length)];
  const randomModificador =
    modificador[numRandom(modificador.length)];

  setQueryURL(name, `${randomSustantivo} ${randomModificador}`);

  return `${randomSustantivo} ${randomModificador}`;
};

const numRandom = (length: number) =>
  Math.floor(Math.random() * length);

const detectErrors: typeDetectErrors = (dataTable, name) => {
  const { sustantivo, modificador } = dataTable;
  if (sustantivo.length === 0 || modificador.length === 0) {
    throw new Error("dataTable no puede tener arrays vacios");
  }

  if (!name) {
    throw new Error("name es requerido");
  }

  return;
};
