// Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is your project title? (Required)',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('Please enter your title!');
            return false;
          }
        }
    },
    {
      type: 'editor',
      name: 'description',
      message: 'Provide a Description of the project. Check your task bar for the open text editor after pressing <Enter>',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Please enter your description!');
          return false;
        }
      }
    },  
    {
      type: 'editor',
      name: 'installInstructions',
      message: 'Provide installation instructions for the project.  Check your task bar for the open text editor after pressing <Enter>',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Please enter the installation instructions!');
          return false;
        }
      }
    },  
    {
      type: 'editor',
      name: 'usage',
      message: 'Provide usage instructions for the project.  Check your task bar for the open text editor after pressing <Enter>',
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
      type: 'editor',
      name: 'tests',
      message: 'Provide testing details or instructions for the project.  Check your task bar for the open text editor after pressing <Enter>',
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
    },  
    {
      type: 'editor',
      name: 'contributing',
      message: 'Provide contributing instructions for the project.  Check your task bar for the open text editor after pressing <Enter>',
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
      message: 'Select a license the project:  ',
      choices: ['MIT', 'Apache License 2.0', 'GNU GPLv3', 'ISC License']     
    }
];

// Create a function to write README file
const writeToFile = (fileName, data) => {
    
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

// Initialize app
const init = () => {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
// Call back to run generateMarkdown with the user answers
.then(answers => {
    return generateMarkdown(answers);
}) 
// Call back to write the file with markdown created by generateMarkdown
.then(data => {
  return writeToFile('./dist/README.md', data);
})
// Display file created if the write is successful
.then(writeToFileResponse => {
  console.log(writeToFileResponse);
})
// Catches and display error message
.catch(err => {
  console.log(err);
});
