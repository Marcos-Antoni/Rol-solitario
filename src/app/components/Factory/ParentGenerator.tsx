"use client";
import { useState } from "react";

import { DataTable } from "../../types/DataTable";
import { setQueryURL } from "../../utils/URL";
import { CreateRandomSentence } from "../../utils/CreateRandomSentence";
import useURL from "../../utils/hook/useURL";
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
  const { getQueryURL } = useURL();
  const [result, setResult] = useState<string>(
    getQueryURL(name) || ""
  );

  const generarFrace = () => {
    const Frace = CreateRandomSentence(dataTable, name);
    setResult(Frace);
    setQueryURL(name, Frace);
  };

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
