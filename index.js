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
        type: 'input',
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

  then((response)) => {
      const {title, email, github, license, installation, usage, contribution, test}
      var descriptionoflicense;
      var descriptionofcontribution; 
      switch (license) {
          case "MIT License":
              descriptionoflicense = 
              "MIT license
Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following 
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE."
            break;
        case "Apache License 2.0":
            descriptionoflicense = 
            "Copyright [yyyy] [name of copyright owner]

            Licensed under the Apache License, Version 2.0 (the "License");
            you may not use this file except in compliance with the License.
            You may obtain a copy of the License at
            
                http://www.apache.org/licenses/LICENSE-2.0
            
            Unless required by applicable law or agreed to in writing, software
            distributed under the License is distributed on an "AS IS" BASIS,
            WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            See the License for the specific language governing permissions and
            limitations under the License."
            break; 
        }
        const generateREADME = (answers) =>
        # ${title}
        ${chosenLicense}
        ## Description
        ${desc1}  
        ${desc2}  
        ${desc3}  
        ${desc4}  
        ## Table of Contents
        [Installation](#Installation)  
        [Usage](#Usage)  
        [Contribution](#Contribution)  
        [Questions](#Questions)  
        ## Installation
        Step One: ${install.instStep1}  
        Step Two: ${install.instStep2}  
        Step Three: ${install.instStep3}  
        ## Usage
        ${use.use1}  
        ${use.use2}  
        ## Contribution
        ${contributionDesc}
        ## License
        ${licenseDesc}
        ## Running Tests
        ${tests}
        ## Questions
        If you wish to inquire about my application, below is my contact information 👇  
        ${github} | Email | ${email}`
  ;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('index.html', generateHTML(answers)))
    .then(() => console.log('Successfully wrote to index.html'))
    .catch((err) => console.error(err));
};

init();
