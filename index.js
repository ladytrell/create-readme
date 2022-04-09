// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    /*{
        type: 'input',
        name: 'title',
        message: 'What is your project title? (Required)',
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log('Please enter your title!');
            return false;
          }
        }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a Description of the project:  (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter your description!');
          return false;
        }
      }
    },  
    {
      type: 'input',
      name: 'installInstructions',
      message: 'Provide installation instructions for the project:  (Required)',
      validate: installInstructions => {
        if (installInstructions) {
          return true;
        } else {
          console.log('Please enter the installation instructions!');
          return false;
        }
      }
    },  
    {
      type: 'input',
      name: 'usage',
      message: 'Provide usage instructions for the project:  (Required)',
      validate: usageInstructions => {
        if (usageInstructions) {
          return true;
        } else {
          console.log('Please enter the usage instructions!');
          return false;
        }
      }
    },  
    {
      type: 'input',
      name: 'contributing',
      message: 'Provide contributing instructions for the project:  (Required)',
      validate: contributingInstructions => {
        if (contributingInstructions) {
          return true;
        } else {
          console.log('Please enter the usage instructions!');
          return false;
        }
      }
    },  
    {
      type: 'input',
      name: 'tests',
      message: 'Provide testing details or instructions for the project:  (Required)',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Please enter the usage instructions!');
          return false;
        }
      }
    },
    {
      type: 'rawlist',
      name: 'license',
      message: 'Select a license the project:  (Required)',
      choices: ['MIT', 'Apache License 2.0', 'GNU GPLv3', 'ISC License'],
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Please select a license!');
          return false;
        }
      }
    },*/
    {
      type: 'input',
      name: 'gitHub',
      message: 'What is your GitHub username?  (Required)',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?  (Required)',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Please enter your email address!');
          return false;
        }
      }
    }
];

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
    console.log(fileName, data);
    
    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, data, err => {
        // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
        if (err) {
          reject(err);
          // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
          return;
        }
  
        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
        resolve({
          ok: true,
          message: 'File created!'
        });
      });
  });
}

// TODO: Create a function to initialize app
const init = () => {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
// Call back to run gernerMarkdown with the user answers
.then(answers => {
    console.log(answers);
    return generateMarkdown(answers);
}) 
// Call back to write the file with markdown created by generateMarkdown
.then(data => {
  return writeToFile('./dist/README.md', data);
})
// Dispay file created if the write is successful
.then(writeToFileResponse => {
  console.log(writeToFileResponse);
})
// Catches and display error message
.catch(err => {
  console.log(err);
});
