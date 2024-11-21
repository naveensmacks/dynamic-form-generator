import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import DynamicForm from "./components/DynamicForm";
import {
  validateFormSchema,
  generateDefaultSchema,
} from "./utils/schemaValidator";
import { FormSchema, FormValues } from "./types/FormSchema";

function App() {
  const [jsonSchema, setJsonSchema] = useState<string>(
    JSON.stringify(generateDefaultSchema(), null, 2)
  );

  const [parsedSchema, setParsedSchema] = useState<FormSchema | null>(null);
  const [schemaErrors, setSchemaErrors] = useState<string[]>([]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonSchema);
      const validation = validateFormSchema(parsed);

      if (validation.valid) {
        setParsedSchema(parsed);
        setSchemaErrors([]);
      } else {
        setParsedSchema(null);
        setSchemaErrors(validation.errors);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setParsedSchema(null);
      setSchemaErrors(["Invalid JSON format"]);
    }
  }, [jsonSchema]);

  const handleSubmit = (formData: FormValues) => {
    console.log("Form submitted:", formData);
    alert("Form Validated\n\n" + JSON.stringify(formData, null, 2));
  };

  const handleEditorMount = (editor: editor.IStandaloneCodeEditor) => {
    // Optional: Configure editor options
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const copySchema = () => {
    navigator.clipboard.writeText(jsonSchema);
    alert("Schema copied to clipboard!");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* JSON Editor Side */}
      <div className="w-full md:w-1/2 p-4 bg-gray-100 overflow-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">JSON Schema Editor</h2>
          <button
            onClick={copySchema}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Copy Schema
          </button>
        </div>
        <Editor
          height="calc(100vh - 150px)"
          defaultLanguage="json"
          value={jsonSchema}
          onChange={(value) => setJsonSchema(value || "")}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            automaticLayout: true,
            formatOnType: true,
            formatOnPaste: true,
          }}
        />
        {schemaErrors.length > 0 && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 rounded">
            <h3 className="font-bold text-red-700">Schema Errors:</h3>
            <ul className="list-disc pl-5">
              {schemaErrors.map((error, index) => (
                <li key={index} className="text-red-600">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Form Preview Side */}
      <div className="w-full md:w-1/2 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-2">Form Preview</h2>
        {parsedSchema ? (
          <DynamicForm schema={parsedSchema} onSubmit={handleSubmit} />
        ) : (
          <div className="text-center text-gray-500">
            Please provide a valid JSON schema
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
