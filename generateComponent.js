//using generateComponent.js as part of a build or setup process (like generating React components automatically), it’s most likely being run in a Node.js environment, so you don’t need to install fs and path separately.
const fs = require('fs');
const path = require('path');

const componentName = process.argv[2]; // Assuming you pass the component name as an argument

if (!componentName) {
    console.error("Please provide a component name.");
    process.exit(1);
}


// Define the path to the new component file directly in the components directory
const componentDir = path.join(__dirname, 'src', 'components');
const componentPath = path.join(componentDir, `${componentName}.tsx`);

// Check if the component directory exists, if not, create it
if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  // Check if a file or directory already exists with the same name
  if (fs.existsSync(componentPath)) {
    console.log(`Error: A file named '${componentName}.tsx' already exists.`);
    process.exit(1);
  }
  

// Create the directory recursively (if it doesn't already exist)
//{ recursive: true } to ensure that all the necessary parent directories (src or components) are created automatically.
//fs.mkdirSync(componentPath, { recursive: true });

// Create the component file
const componentContent = `
import React from 'react';

const ${componentName} = () => {
    return (
        <div>
            <h1>${componentName}</h1>
        </div>
    );
};

export default ${componentName};
`;

// Write the component file
fs.writeFileSync(componentPath, componentContent);

console.log(`${componentName} component created at ${componentPath}`);

//Run in local: node generateComponent.js Editor
//to remove directory from command line : rmdir /s /q D:\Sanjeet\Repo\react-tinymce-form\src\components\Editor.tsx
