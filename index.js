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
      name: 'installation ',
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
function renderLicenseBadge(license) {
  let licensebadge = `![license](https://img.shields.io/badge/license-${license}-blue.svg)`;
  return licensebadge;
};



// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  let licenseLink = `\n* [License](#license) \n`;
  return licenseLink;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let licenseSection = `${license}
  Copyright (c)
  
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following 
  
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.`
}


//var descriptionoflicense;
// var licensebadge;
// var descriptionofcontribution; 
// switch (license) {
//     case "MIT License":
//       licensebadge = "![license](https://img.shields.io/badge/license-MIT-green.svg)"
//       descriptionoflicense = 
//       `MIT license
// Copyright (c)

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following 

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.`
//             break;
//         case "Apache License 2.0":
//             licensebadge = "![license](https://img.shields.io/badge/license-Apache-blue.svg)"
//             descriptionoflicense = 
//             `Licensed under the Apache License, Version 2.0 (the "License");
//             you may not use this file except in compliance with the License.
//             You may obtain a copy of the License at
            
//                 http://www.apache.org/licenses/LICENSE-2.0
            
//             Unless required by applicable law or agreed to in writing, software
//             distributed under the License is distributed on an "AS IS" BASIS,
//             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//             See the License for the specific language governing permissions and
//             limitations under the License.`
//             break; 
//         }

const generateReadme = (answers) => {
  return `
        # ${answers.title}
          ${renderLicenseBadge(answers.license)}
          
        ${answers.license}
        
        ## Description
        ${answers.usage}  

        ## Table of Contents
        [Installation](#installation)  
        [Usage](#usage)  
        [License] (#license)
        ${renderLicenseLink(answers.license)}
        [Contribution](#contribution)  
        [Tests] (#test)
        [Questions] (#questions)
        
        ## Installation
        ${answers.installation}  

        ## Usage
        ${answers.usage}
        ${renderLicenseSection(answers.license)}  

        ## Contribution

        ${answers.contribution}

        ## License
        ${answers.descriptionoflicense}

        ## Running Tests
        ${answers.tests}

        ## Questions
        Github: ${answers.github} | Email: ${answers.email};`
    }

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('readme.md', generateReadme(answers)))
    .then(() => console.log('Successfully wrote to readme.md'))
    .catch((err) => console.error(err));
};

init();
