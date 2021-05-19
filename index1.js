// Imported required packages
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// Array of questions for user input
const questions = [
{
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    },
    { 
    type: 'input',
    name: 'description',
    message: 'Please write a short description of your project'
    },
    {
    type: 'input',
    name: 'email',
    message: 'What is your email?',
    },
    {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub Username',
    },
    {
    type: 'input',
    name: 'githublink',
    message: 'Enter your GitHub profile link',
    },
    {
    type: 'list',
    name: 'license',
    message: 'What is the license you are using for the repository?',
    choices: ["MIT License", "Apache License"]
    },
    {
    type: 'input',
    name: 'installation',
    message: 'What command should be run to install dependencies?',
    default: 'npm i'
    },
    {
    type: 'input',
    name: 'test',
    message: 'What command should be run to run tests?',
    default: 'npm test'
    },
    {
    type: 'input',
    name: 'usage',
    message: 'Please explain how to use your application',
    },
    {
    type: 'list',
    name: 'contribution',
    message: 'What is the code of conduct to be included in the contribution section?',
    choices: ["Contributor Covenant", "Citizen Code Of Conduct"]
    },
    {
    type: 'input',
    name: 'test',
    message: 'Please provide any details about running tests on your application',
    }
];

// Function to write README file using the user input
function writeToFile(fileName, data) {
 return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// Function to initialize app
function init() {
 inquirer.prompt(questions).then(inquirerResponses => {
  console.log('Generating README');
  writeToFile('README.md', generateMarkdown({ inquirerResponses }));
 });
}

init();
function renderLicenseBadge(license) {
    if (license !== 'None') {
     return `![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)`;
    }
    return '';
   }
   
   // Return license link
   // If there is no license, return an empty string
   function renderLicenseLink(license) {
    if (license !== 'None') {
     return `\n* [License](#license)\n`;
    }
    return '';
   }
   
   // Returns license section
   // If there is no license, return an empty string
   function renderLicenseSection(license) {
    if (license !== 'None') {
     return `## License
   This project is licensed under the ${license} license.`;
    }
    return '';
   }
   
   // Generate markdown for README
   function generateMarkdown(data) {
    return `# ${data.title}
   ${renderLicenseBadge(data.license)}
   ## Description
   ${data.description}
   ## Table of Contents 
   * [Installation](#installation)
   * [Usage](#usage)
   ${renderLicenseLink(data.license)}
   * [Contribution](#contribution)
   * [Tests](#tests)
   * [Questions](#questions)
   ## Installation
   
   ${data.installation}
   
   ## Usage
   ${data.usage}
   ${renderLicenseSection(data.license)}
    
   ## Contribution
   ${data.contribution}
   ## Tests
      
   ${data.test}
   
   ## Questions
   For any questions, please contact: ${data.email}. Check out my work at [${data.github}](https://github.com/${data.github}/).
   `;
   }
   
   module.exports = generateMarkdown;