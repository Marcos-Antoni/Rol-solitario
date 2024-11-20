import NPCData from "./components/NPCData";
import TextAreaComponent from "./components/TextareaComponent";
import NPCGenerator from "./components/NPCGenerator";

export default function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-[50px]">
      <div className="flex flex-col gap-[20px] w-[90%] max-w-[700px]">
        <h1 className="text-4xl font-bold mb-6">Generador de NPC</h1>

        <TextAreaComponent />
        <NPCData />
        <NPCGenerator />
      </div>
    </div>
  );
}
