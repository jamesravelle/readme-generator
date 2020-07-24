const fs = require("fs");
const inquirer = require("inquirer");
// array of questions for user
const questions = [
// Title, Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
{
    type: "input",
    message: "Username",
    name: "username"
},
{
    type: "input",
    message: "Email",
    name: "email"
},
{
    type: "input",
    message: "Project Title",
    name: "title"
},
{
    type: "input",
    message: "Description",
    name: "description"
},
{
    type: "list",
    message: "Table of Contents",
    name: "toc",
    choices: [
        'Yes','No'
    ]
},
{
    type: "input",
    message: "Installation",
    name: "installation"
},
{
    type: "input",
    message: "Usage",
    name: "usage"
},
{
    type: "input",
    message: "Credits",
    name: "credits"
},
{
    type: "list",
    message: "License",
    name: "license",
    choices:[
        'MIT','APACHE 2.0','GPL 3.0','BSD 3','None'
    ]
},
{
    type: "input",
    message: "Tests",
    name: "tests"
}
];

// function to write README file
function writeToFile(fileName, data) {
    let {username, email, title, description, toc, installation, usage, credits, license, tests} = data;
    let fileData = `# ${title} \n${description} \n\n`;
    let titles = ['Installation','Usage','Credits', 'License', 'Tests'];
    let options = [installation, usage, credits, license, tests];
    if(toc === 'Yes'){
        fileData += "## Table of Contents\n";
        titles.forEach((x,index) => {
            if(options[index].length > 0){
                fileData += `* [${x}](#${x.toLowerCase()}) \n`;
            }
        })
        fileData += '* [Questions](#questions) \n';
    }
    fileData += '\n';
    for(let i = 0; i < options.length; i++){
        (options[i].length > 0) ? fileData += `## ${titles[i]}\n${options[i]}\n\n` : null;
    }
    fileData += `## License\n`;
    switch(license) {
        case 'MIT':
          fileData += '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n';
          break;
        case 'APACHE 2.0':
          fileData += '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n\n';
          break;
        case 'GPL 3.0':
          fileData += '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n\n';
          break;
        case 'BSD 3':
          fileData += '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)\n\n';
          break;
        default:
          // code block
      }
    if(username.length > 0 || email.length > 0){
        fileData += "## Questions? Contact me:\n";
        (username.length > 0) ? fileData += `GitHub Username: ${username}\n` : null;
        (email.length > 0) ? fileData += `Email: ${email}\n` : null;
    }
    fs.writeFile(fileName, fileData, function(err){
        console.log(fileData);
        if(err){
            console.log(err)
        }
    })
}

// function to initialize program
function init() {
    inquirer
    .prompt(questions)
    .then( response => writeToFile("README.md", response))
}

// function call to initialize program
init();

