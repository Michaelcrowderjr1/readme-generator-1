var inquirer = require("inquirer");
var fs = require("fs");
var writeThis = "";
var argc = process.argv.length;
var argv = process.argv;
var selectedBadgeImageURL;
var outputFilname = "NEWREADME.md"
const licenseArrayTypes = [{
                            name: "GNU AGPLv3",
                            value: "GNU AGPLv3",
                            short: "GNU AGPLv3",
                            badgeURL: "https://img.shields.io/badge/License-AGPL%20v3-blue.svg",
                            licenseURL: "https://www.gnu.org/licenses/agpl-3.0"
                           },
                           {
                            name: "GNU GPL 3",
                            value: "GNU GPL 3",
                            short: "GNU GPL 3",
                            badgeURL: "https://img.shields.io/badge/License-GPLv3-blue.svg",
                            licenseURL: "https://www.gnu.org/licenses/gpl-3.0"
                          },
                          {
                            name: "MIT License",
                            value: "MIT License",
                            short: "MIT License",
                            badgeURL: "https://img.shields.io/badge/License-MIT-yellow.svg",
                            licenseURL: "https://opensource.org/licenses/MIT"
                          },
                          {
                            name: "Mozilla Public License",
                            value: "Mozilla",
                            short: "Mozilla",
                            badgeURL: "https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg",
                            licenseURL: "https://opensource.org/licenses/MPL-2.0"
                          },
                          {
                            name: "Apache License 2.0",
                            value: "Apache",
                            short: "Apache",
                            badgeURL: "https://img.shields.io/badge/License-Apache%202.0-blue.svg",
                            licenseURL: "https://opensource.org/licenses/Apache-2.0"
                          },
                          {
                            name: "Boost Software License",
                            value: "Boost",
                            short: "Boost",
                            badgeURL: "https://img.shields.io/badge/License-Boost%201.0-lightblue.svg",
                            licenseURL: "https://www.boost.org/LICENSE_1_0.txt"
                          },
                          {
                            name: "The Unlicense",
                            value: "Unlicense",
                            short: "Unlicense",
                            badgeURL: "https://img.shields.io/badge/license-Unlicense-blue.svg",
                            licenseURL: "http://unlicense.org/"
                          },
                          {
                            name: "None",
                            value: "None",
                            short: "None",
                            badgeURL: "N/A",
                            licenseURL: "N/A"
                          }
                         ];

if (argc > 3) {
  console.log (`Usage:  `);
  console.log (`   node readme-generator.js [output_filename]`);
  console.log (``);
  console.log (`   readme-generator will generate a readme file (Markdown format).  By default, the file created`);
  console.log (`   is NEWREADME.md to avoid conflicts with the project's README.md.  But, you can specify an alternate`);
  console.log (`   filename as an optional parameter.`);
  console.log (``);
  console.log (`   output_filename - (optional) - write out to your specified file instead of`);
  console.log (`                     NEWREADME.md`);

  return;
}

else if (argc === 3) {
  outputFilname = argv [2];
}
                         
inquirer
  .prompt([
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title"
    },
    {
      type: "input",
      message: "What is the description for your project?",
      name: "description"
    },
    {
      type: "input",
      message: "What are the installation instructions for your application?",
      name: "installationInstructions"
    },
    {
      type: "input",
      message: "What are instructions for using your application?",
      name: "usageInstructions"
    },
    {
      type: "list",
      message: "What license do you want to associate with your project?",
      name: "licenseSelection",
      choices: licenseArrayTypes
    },
    {
      type: "input",
      message: "What are the contribution guidelines for this project?",
      name: "contribution"
    },
    {
      type: "input",
      message: "What testing has been done?",
      name: "testing"
    },
    {
      type: "input",
      message: "What is your GitHub Username?",
      name: "githubUsername"
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "emailAddress"
    },
])
  .then(function(response) {

    /* This was used during testing to avoid using prompts
    response  = {
      title: "MyTitle",
      description: "My Description",
      installationInstructions: "Installation Instructions",
      usageInstructions: "How to use it....",
      licenseSelection: response.licenseSelection,
      contribution: "Me and someone else",
      testing: "It was never tested",
      gitHubUsername: "gehanstedt",
      emailAddress: "spamgreghere@gmail.com",
    }
    */

    // Determine index for the selected license
    let selectedLicenseArrayIndex = licenseArrayTypes.findIndex( element => {
      if (element.short === response.licenseSelection) {
        return true;
      }
    });

    if (response.short === "None") {
      selectedBadgeImageURL = "";
    }

    else {
      selectedBadgeImageURL = `<img src="${licenseArrayTypes[selectedLicenseArrayIndex].badgeURL}">`;
    }

    // Begin creating file output - indenting will be ignored
    writeThis += `# ${response.title} ${selectedBadgeImageURL}
    
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Credits](#credits)
* [Tests](#tests)
* [Questions](#questions)

## Description
${response.description}
    
## Installation
${response.installationInstructions} 

## Usage
${response.usageInstructions}

## License
<img src="${licenseArrayTypes[selectedLicenseArrayIndex].badgeURL}"> ${licenseArrayTypes[selectedLicenseArrayIndex].name}

${licenseArrayTypes[selectedLicenseArrayIndex].licenseURL}

## Contributing
${response.contribution}

## Tests
${response.testing}

## Questions
GitHub Portal:  http://github.com/${response.gitHubUsername}
Email:  ${response.emailAddress}

Generated by readme-generator.js - Copyright ©2020 G Dog Enterprises
      \n`;
    // Completed load writeThis - normal indenting continues

    // Write file
    fs.writeFile (outputFilname,
                  writeThis,
                    function (error) {
                      if (error) {
                        return console.log (error);
                      }

                      console.log (`File ${outputFilname} written successfully.`);
                    });
  
});

