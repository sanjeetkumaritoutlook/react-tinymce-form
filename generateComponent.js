//using generateComponent.js as part of a build or setup process (like generating React components automatically), it’s most likely being run in a Node.js environment, so you don’t need to install fs and path separately.
const fs = require('fs');
const path = require('path');

const componentName = process.argv[2]; // Assuming you pass the component name as an argument

if (!componentName) {
    console.error("Please provide a component name.");
    process.exit(1);
}

// Define the path to your new component
const componentDir = path.join(__dirname, 'src', 'components', componentName);

if (fs.existsSync(componentDir)) {
    console.error("Component already exists!");
    process.exit(1);
}

// Create the directory recursively (if it doesn't already exist)
//{ recursive: true } to ensure that all the necessary parent directories (src or components) are created automatically.
fs.mkdirSync(componentDir, { recursive: true });

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
fs.writeFileSync(
    path.join(componentDir, `${componentName}.tsx`),
    componentContent.trim()
);

console.log(`${componentName} component created at ${componentDir}`);

