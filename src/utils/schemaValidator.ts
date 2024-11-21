// src/utils/schemaValidator.ts
import { FormField, FormSchema, Option } from "../types/FormSchema";

export const validateFormSchema = (
  schema: FormSchema
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check for required top-level properties
  if (!schema.formTitle) {
    errors.push("Form title is required");
  }

  // Validate fields
  if (!schema.fields || !Array.isArray(schema.fields)) {
    errors.push("Fields must be an array");
    return { valid: false, errors };
  }

  // Validate each field
  schema.fields.forEach((field: FormField, index: number) => {
    // Check required field properties
    if (!field.id) {
      errors.push(`Field at index ${index} is missing an ID`);
    }

    if (!field.label) {
      errors.push(`Field at index ${index} is missing a label`);
    }

    // Validate field types that require options
    if (["select", "radio"].includes(field.type)) {
      if (!field.options || !field.options.length) {
        errors.push(
          `${field.type.toUpperCase()} field ${field.id} requires options`
        );
      }
    }

    // Validate option structures for select and radio
    if (field.options) {
      field.options.forEach((option: Option, optIndex: number) => {
        if (!option.value || !option.label) {
          errors.push(
            `Option ${optIndex} in field ${field.id} is missing value or label`
          );
        }
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};

// Function to generate default schema
export const generateDefaultSchema = (): FormSchema => ({
  formTitle: "Sample Dynamic Form",
  formDescription: "Please fill out the form",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name",
    },
  ],
});
