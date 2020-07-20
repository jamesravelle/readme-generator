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
    message: "Title",
    name: "title"
},
{
    type: "input",
    message: "Description",
    name: "description"
},
{
    type: "checkbox",
    message: "Table of Contents",
    name: "toc",
    choices: [
        'Installation','Usage','Credits','License','Tests','Questions'
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
    if(toc.length > 0){
        fileData += "## Table of Contents\n";
        toc.forEach(x => fileData += `* [${x}](#${x.toLowerCase()}) \n`);
    }
    fileData += '\n';
    (toc.includes('Installation')) ? fileData += `## Installation\n${installation} \n\n` :  null;
    (toc.includes('Usage')) ? fileData += `## Usage\n${usage} \n\n` :  null;
    (toc.includes('Credits')) ? fileData += `## Credits\n${credits} \n\n` :  null;
    (toc.includes('License')) ? fileData += `## License\n${license} \n\n` :  null;
    (toc.includes('Tests')) ? fileData += `## Tests\n${tests} \n\n` :  null;
    if(username.length > 0 || email.length > 0){
        fileData += "## Questions? Contact me:\n";
        (username.length > 0) ? fileData += `GitHub Username: ${username}\n` : null;
        (email.length > 0) ? fileData += `Email: ${email}\n` : null;
    }
    // fileData += `## Installation\n${installation} \n\n`;
    // fileData += `## Usage\n${usage} \n\n`;
    // fileData += `## Credits\n${credits} \n\n`;
    // fileData += `## License\n${license} \n\n`;
    // fileData += `## Tests\n${tests} \n\n`;
    // fileData += `## Questions\n${questions} \n\n`;
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

