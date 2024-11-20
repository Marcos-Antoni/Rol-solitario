"use client";
import { useState, useEffect } from "react";
import { setQueryURL, getQueryURL } from "../utils/URL";

const TextAreaComponent: React.FC = () => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (value) setQueryURL("contexto", value);
  }, [value]);

  useEffect(() => {
    const initialValue = getQueryURL("contexto") || "";
    setValue(initialValue);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl">Contexto</h2>
      <textarea
        id="context"
        className="border rounded p-2 w-full"
        placeholder="Da un contexto sobre tu NPC..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextAreaComponent;
