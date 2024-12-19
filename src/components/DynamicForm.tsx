import React, { useState } from 'react';
import './DynamicForm.css';

// interface DynamicFormProps {
//     schema: Array<any>; // Define the schema type (can be made more specific)
//     onSubmit: (data: any) => void; // Callback function for form submission
//   }
 //this and interface is optional
 //const DynamicForm :  React.FC<DynamicFormProps> = ({ schema, onSubmit }:  
const DynamicForm = ({ schema, onSubmit }: { schema: any[]; onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle array field changes
  const handleArrayChange = (arrayName: string, index: number, fieldName: string, value: string) => {
    const updatedArray = formData[arrayName] || [];
    updatedArray[index] = { ...updatedArray[index], [fieldName]: value };
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Add new entry to an array field
  const addArrayEntry = (arrayName: string) => {
    const updatedArray = [...(formData[arrayName] || []), {}];
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Render form fields dynamically
  const renderField = (field: any, arrayName?: string, index?: number) => {
    const { type, name, label, placeholder, options, fields, conditionalOn } = field;
  
    // Check conditionalOn to determine visibility
    if (conditionalOn && !conditionalOn(formData)) {
      return null; // Do not render the field if the condition is false
    }
  
    if (type === 'text' || type === 'date') {
      return (
        <div key={name}>
          <label>{label}</label>
          <input
            type={type}
            name={arrayName ? `${arrayName}[${index}].${name}` : name}
            value={arrayName && index !== undefined ? formData[arrayName]?.[index]?.[name] || '' : formData[name] || ''}
            placeholder={placeholder}
            onChange={(e) =>
              arrayName
                ? handleArrayChange(arrayName, index!, name, e.target.value)
                : handleChange(e)
            }
          />
        </div>
      );
    }
  
    if (type === 'textarea') {
      return (
        <div key={name}>
          <label>{label}</label>
          <textarea
            name={name}
            value={formData[name] || ''}
            placeholder={placeholder}
            onChange={handleChange}
          />
        </div>
      );
    }
  
    if (type === 'combo-box') {
      return (
        <div key={name}>
          <label>{label}</label>
          <input
            list={name + '-options'}
            name={name}
            value={formData[name] || ''}
            placeholder={placeholder}
            onChange={handleChange}
          />
          <datalist id={name + '-options'}>
            {options.map((option: string, idx: number) => (
              <option key={idx} value={option} />
            ))}
          </datalist>
        </div>
      );
    }
  
    if (type === 'array') {
      return (
        <div key={name}>
          <label>{label}</label>
          {formData[name]?.map((entry: any, idx: number) => (
            <div key={idx} style={{ marginLeft: '20px', marginBottom: '10px' }}>
              {fields.map((subField: any) => renderField(subField, name, idx))}
            </div>
          ))}
          <button type="button" onClick={() => addArrayEntry(name)}>
            Add {label}
          </button>
        </div>
      );
    }

    if (type === 'radio') {
        return (
            <div key={name}>
            <label>{label}</label>
            {options.map((option: { value: string; label: string }) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={formData[name] === option.value}
                  onChange={(e) => handleChange(e)}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      }
      if (type === 'checkbox') {
        return (
            <div key={name}>
            <label>{label}</label>
            {options.map((option: { value: string; label: string }) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={formData[name]?.includes(option.value)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newData = { ...formData };
                    if (e.target.checked) {
                      newData[name] = [...(newData[name] || []), option.value];
                    } else {
                      newData[name] = newData[name].filter((val: string) => val !== option.value);
                    }
                    setFormData(newData);
                  }}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      }
    return null;
  };
  

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      {schema.map((field) => renderField(field))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
