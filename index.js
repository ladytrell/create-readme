// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
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
