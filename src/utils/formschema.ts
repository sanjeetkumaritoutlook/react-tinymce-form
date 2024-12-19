export const formSchema = [
    { type: 'text', name: 'username', label: 'Username', placeholder: 'Enter your username' },
    { type: 'date', name: 'dob', label: 'Date of Birth' },
    {
      type: 'combo-box',
      name: 'status',
      label: 'Status',
      options: ['Single', 'Married', 'Other'],
      placeholder: 'Select or type a status',
    },
    {
      type: 'text',
      name: 'spouseName',
      label: 'Spouse Name',
      placeholder: 'Enter spouse name',
      conditionalOn: (formData: any) => formData.status === 'Married',
    },
    {
      type: 'array',
      name: 'skills',
      label: 'Skills',
      fields: [
        { type: 'text', name: 'skillName', label: 'Skill Name' },
        { type: 'text', name: 'experience', label: 'Experience (Years)' },
      ],
      conditionalOn: (formData: any) => formData.username && formData.username.length > 0,
    },
    {
      "name": "gender",
      "type": "radio",
      "label": "Gender",
      "options": [
        { "value": "male", "label": "Male" },
        { "value": "female", "label": "Female" }
      ]
    },
    {
      "name": "hobbies",
      "type": "checkbox",
      "label": "Hobbies",
      "options": [
        { "value": "reading", "label": "Reading" },
        { "value": "travelling", "label": "Travelling" },
        { "value": "coding", "label": "Coding" }
      ]
    }
  ];
  
  