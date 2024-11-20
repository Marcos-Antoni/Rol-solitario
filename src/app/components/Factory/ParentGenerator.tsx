"use client";
import { useState, useEffect } from "react";
import { DataTable } from "../../types/DataTable";
import { setQueryURL, getQueryURL } from "../../utils/URL";
import { CreateRandomSentence } from "../../utils/CreateRandomSentence";
import Button from "../Button";

interface typeParentGenerator {
  dataTable: DataTable;
  name: string;
}

const NameMissing = () => {
  return <p>Falta name</p>;
};

const DataTableMissing = ({
  dataTable,
}: {
  dataTable: DataTable;
}) => {
  const missingData = [];
  if (!dataTable?.sustantivo.length) missingData.push("sustantivo");
  if (!dataTable?.modificador.length) missingData.push("modificador");

  return <p>Falta los datos de dataTable({missingData.join(",")})</p>;
};

const ParentGenerator = ({
  dataTable,
  name,
}: typeParentGenerator) => {
  //  Codigo del componente ----------------------------------------------------------------------------
  const [result, setResult] = useState<string>("");

  const generarFrace = () => {
    const Frace = CreateRandomSentence(dataTable, name);
    setResult(Frace);
    setQueryURL(name, Frace);
  };

  useEffect(() => {
    if (!name) return;

    const Frace = getQueryURL(name) || "";
    if (Frace) setResult(Frace);
  }, [name]);

  // Renderisacion por errores -----------------------------------------------------------------------
  if (!name) return <NameMissing />;

  const condicional =
    dataTable?.sustantivo.length && dataTable?.modificador.length;

  if (!condicional) return <DataTableMissing dataTable={dataTable} />;

  // Renderizacion del componente ---------------------------------------------------------------------
  return (
    <div className="flex flex-col">
      <label className="text-lg font-semibold">{name}</label>

      <Button onClick={() => generarFrace()}>Generar</Button>

      <p className="mt-2 text-sm text-gray-500">{result}</p>
    </div>
  );
};

export default ParentGenerator;
