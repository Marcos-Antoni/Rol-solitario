import React, { Suspense } from "react";
import ParentGenerator from "./Factory/ParentGenerator";
import { tablets } from "../utils/dataTablets";

const NPCData = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Suspense fallback={<div>Loading...</div>}>
        <ParentGenerator dataTable={tablets.tipoNPC} name="Bacico" />
        <ParentGenerator
          dataTable={tablets.motivaciónNPC}
          name="Motivacion"
        />
        <ParentGenerator
          dataTable={tablets.personalidadNPC}
          name="Personalidad"
        />
        <ParentGenerator
          dataTable={tablets.aliniamientos}
          name="Aliniamientos"
        />
      </Suspense>
    </div>
  );
};

export default NPCData;
