const svgList = {
  'MIT': "https://img.shields.io/badge/License-MIT-yellow.svg",
  'ApacheLicense2.0':"https://img.shields.io/badge/License-Apache_2.0-blue.svg",
  'GNUGPLv3':"https://img.shields.io/badge/License-GPLv3-blue.svg",
  'ISCLicense':"https://img.shields.io/badge/License-ISC-blue.svg"
};

const licenseURLs = {
  'MIT': "https://opensource.org/licenses/MIT",
  'ApacheLicense2.0':"https://opensource.org/licenses/Apache-2.0",
  'GNUGPLv3':"https://www.gnu.org/licenses/gpl-3.0",
  'ISCLicense':"https://opensource.org/licenses/ISC"
};

// Remove spaces from the string
const removeSpaces = string => {
  return string.replace(/ /g, '');
};

// Returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if(!license){
    return '';
  }

  let badge = "[![License: " +  license;

  //Removes all spaces from license
  var license = removeSpaces(license);
  console.log("license", license);
  //[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  badge = badge + "](" + svgList[license] + ")](" + licenseURLs[license] + ")";

  return badge;
}

// Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if(!license){
    return '';
  }

  var license = removeSpaces(license);
  return licenseURLs[license];
};

// Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if(!license){
    return '';
  }

  return `
  ## License

  [${license}](${renderLicenseLink(removeSpaces(license))})
  `
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}  ${renderLicenseBadge(data.license)}
  
  ## Description

  ${data.description.replace(/\\n/g, '    ')}


  ## Table of Contents (Optional)

 - [Installation](#installation)
 - [Usage](#usage)
 - [Contributing](#contributing)
 - [Tests](#tests)
 - [Questions](#questions)
 - [License](#license)

  ## Installation

  ${data.installInstructions.replace(/\\n/g, '    ')}

  ## Usage

  ${data.usage}

  ## Contributing

  ${data.contributing}

  ## Tests

  ${data.tests}

  ## Questions

  GitHub: [${data.gitHub}](https://github.com/${data.gitHub})

  Email: [${data.email}](mailto:${data.email})

   ${renderLicenseSection(data.license)}

`;

};

module.exports = generateMarkdown;

