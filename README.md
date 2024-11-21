# Dynamic Form generator

## Background

Create a dynamic form generator that takes a JSON schema and generates a styled, functional form in real-time. The application should display the JSON editor and the generated form side by side.

## Requirements

### Main Interface

#### Create a split-screen interface with:

Left side: JSON editor
Syntax highlighting for JSON
Real-time JSON validation
Error messages for invalid JSON
Right side: Generated form preview
Updates in real-time as JSON is edited
Responsive form layout
Proper error states and validation

#### Technical Requirements:

Use TypeScript for type safety
Create proper interfaces for the JSON schema
Handle JSON validation gracefully
Real-time form generation and validation
Proper error boundaries for both editor and form
Mobile-responsive layout (stack editor and preview on smaller screens)

###Form Features
The generated form should:
Support all field types from the schema
Show proper validation messages
Have loading states where appropriate
Submit data to console.log()
Show success message after submission
Be styled consistently using Tailwind CSS

## Testing Requirements

Write tests using Playwright and Jest:
Test JSON validation
Test real-time form generation
Test form validation and submission
Test responsive layout
Test error scenarios

## Technical Stack

React 18+
TypeScript
Tailwind CSS
React Hook Form
Playwright for E2E testing
Jest for unit testing

## Evaluation Criteria

### Code Quality:

TypeScript usage and type safety
Component structure and reusability
Error handling
Code organization

### User Experience:

Real-time updates
Form responsiveness
Error messages
Mobile compatibility

### Testing:

Test coverage
Edge case handling

Include README.md with:
Setup instructions
Example JSON schemas
Local development guide
Deploy using Vercel or Netlify

### Bonus Points

Add a "Copy Form JSON" button
Implement form field validation preview
Add dark mode support
Add ability to download form submissions as JSON

## Sample JSON Schema

```
{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        { "value": "1-50", "label": "1-50 employees" },
        { "value": "51-200", "label": "51-200 employees" },
        { "value": "201-1000", "label": "201-1000 employees" },
        { "value": "1000+", "label": "1000+ employees" }
      ]
    },
    {
      "id": "industry",
      "type": "radio",
      "label": "Industry",
      "required": true,
      "options": [
        { "value": "tech", "label": "Technology" },
        { "value": "healthcare", "label": "Healthcare" },
        { "value": "finance", "label": "Finance" },
        { "value": "retail", "label": "Retail" },
        { "value": "other", "label": "Other" }
      ]
    },
    {
      "id": "timeline",
      "type": "select",
      "label": "Project Timeline",
      "required": true,
      "options": [
        { "value": "immediate", "label": "Immediate (within 1 month)" },
        { "value": "short", "label": "Short-term (1-3 months)" },
        { "value": "medium", "label": "Medium-term (3-6 months)" },
        { "value": "long", "label": "Long-term (6+ months)" }
      ]
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Any other details you'd like to share..."
    }
  ]
}
```
