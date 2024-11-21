import { useForm } from "react-hook-form";
import { FormSchema, FormField, FormValues } from "../types/FormSchema";

type DynamicFormProps = {
  schema: FormSchema;
  onSubmit: (data: FormValues) => void;
};

export default function DynamicForm({ schema, onSubmit }: DynamicFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const renderField = (field: FormField) => {
    const baseClasses = "w-full p-2 border rounded text-gray-700";
    const errorClasses = "border-red-500 bg-red-50";

    const validationRules = {
      required: field.required ? `${field.label} is required` : false,
      ...(field.validation?.pattern && {
        pattern: {
          value: new RegExp(field.validation.pattern),
          message: field.validation.message || "Invalid input",
        },
      }),
      ...(field.validation?.minLength && {
        minLength: {
          value: field.validation.minLength,
          message: `Minimum length is ${field.validation.minLength}`,
        },
      }),
      ...(field.validation?.maxLength && {
        maxLength: {
          value: field.validation.maxLength,
          message: `Maximum length is ${field.validation.maxLength}`,
        },
      }),
    };

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-gray-700 mb-2">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className={`${baseClasses} ${
                errors[field.id] ? errorClasses : ""
              }`}
              {...register(field.id, validationRules)}
            />
            {errors[field.id] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.id]?.message?.toString()}
              </p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-gray-700 mb-2">{field.label}</label>
            <select
              className={`${baseClasses} ${
                errors[field.id] ? errorClasses : ""
              }`}
              {...register(field.id, validationRules)}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.id] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.id]?.message?.toString()}
              </p>
            )}
          </div>
        );

      case "radio":
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-gray-700 mb-2">{field.label}</label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    value={option.value}
                    className="mr-2"
                    {...register(field.id, validationRules)}
                  />
                  <label>{option.label}</label>
                </div>
              ))}
            </div>
            {errors[field.id] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.id]?.message?.toString()}
              </p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-gray-700 mb-2">{field.label}</label>
            <textarea
              placeholder={field.placeholder}
              className={`${baseClasses} ${
                errors[field.id] ? errorClasses : ""
              }`}
              {...register(field.id, validationRules)}
            />
            {errors[field.id] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.id]?.message?.toString()}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">{schema.formTitle}</h2>
      {schema.formDescription && (
        <p className="text-gray-600 mb-6">{schema.formDescription}</p>
      )}

      {schema.fields.map((field) => renderField(field))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
      >
        {isSubmitting ? "Validating..." : "Validate Form"}
      </button>
    </form>
  );
}
