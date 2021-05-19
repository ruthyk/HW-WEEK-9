const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
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
      choices: ["MIT", "Apache"]
    },
    {
      type: 'input',
      name: 'dependencies',
      message: 'What command should be run to install dependencies?',
      default: 'npm i'
    },
    {
      type: 'input',
      name: 'command',
      message: 'What command should be run to run tests?',
      default: 'npm test'
      },
    {
      type: 'input',
      name: 'installation',
      message: 'Please give instructions of how to install your application',
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
    },
  ]);
}

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('readme.md', generateReadme(answers)))
    .then(() => console.log('Successfully wrote to readme.md'))
    .catch((err) => console.error(err));
};

init();

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license !== 'None') {
   return `\n* [License](#license)\n`;
  }
  return '';
 };

 // Adds license badge 

 function renderLicenseBadge(license) {
  let licensebadge = `![license](https://img.shields.io/badge/license-${license}-blue.svg)`;
  return licensebadge;
};

// TODO: Create a function that returns the license section of README
function renderLicenseSection(license) {
  switch (license) {
    case "MIT":
      return `${license}
      
      Copyright (c)
      
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following 
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.`;

    case "Apache":
      return `
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
      You may obtain a copy of the License at     
                  http://www.apache.org/licenses/LICENSE-2.0
              
      Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and limitations under the License.`
  }
}
// TODO: Create a function that returns the contribution section of README
function renderContributionSection(contribution) {
  switch (contribution) {     
    case "Contributor Covenant":
      return `${contribution}
      
      Examples of behavior that contributes to a positive environment for our community include:
      Demonstrating empathy and kindness toward other people
      Being respectful of differing opinions, viewpoints, and experiences
      Giving and gracefully accepting constructive feedback
      Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
      Focusing on what is best not just for us as individuals, but for the overall community
      Examples of unacceptable behavior include:
      The use of sexualized language or imagery, and sexual attention or advances of any kind
      Trolling, insulting or derogatory comments, and personal or political attacks
      Public or private harassment
      Publishing others' private information, such as a physical or email address, without their explicit permission
      Other conduct which could reasonably be considered inappropriate in a professional setting.`;

    case "Citizen Code Of Conduct":
      return `
      The following behaviors are expected and requested of all community members:
      Participate in an authentic and active way. In doing so, you contribute to the health and longevity of this community.
      Exercise consideration and respect in your speech and actions.
      Attempt collaboration before conflict.
      Refrain from demeaning, discriminatory, or harassing behavior and speech.
      Be mindful of your surroundings and of your fellow participants. Alert community leaders if you notice a dangerous situation, someone in distress, or violations of this Code of Conduct, even if they seem inconsequential.
      Remember that community event venues may be shared with members of the public; please be respectful to all patrons of these locations.`
  }
  
};

const generateReadme = (answers) => {
  console.log(answers)
  return `# ${answers.title}
${renderLicenseBadge(answers.license)}    

## Description
${answers.description}  

## Table of Contents
* [Installation](#installation)  
* [Usage](#usage)  
${renderLicenseLink(answers.license)}
* [Contribution](#contribution)  
* [Questions](#questions)

## Installation
${answers.installation}  

## Usage
${answers.usage}

## Contribution

${renderContributionSection(answers.contribution)}

## License

${renderLicenseSection(answers.license)}  

## Running Tests     
${answers.test}

## Questions
Github: ${answers.github} | Email: ${answers.email}`
}