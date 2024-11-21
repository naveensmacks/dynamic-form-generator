// src/types/FormSchema.ts
export interface Option {
  value: string;
  label: string;
}

export interface Validation {
  pattern?: string;
  message?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface FormField {
  id: string;
  type: "text" | "email" | "select" | "radio" | "textarea" | "number";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Option[];
  validation?: Validation;
}

export interface FormSchema {
  formTitle: string;
  formDescription?: string;
  fields: FormField[];
}

export interface FormValues {
  [key: string]: string | number | boolean;
}
