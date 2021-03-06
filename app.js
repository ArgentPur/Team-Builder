const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = []
const arrayId = []

function appMenu() {
    function  createTeam(){
        inquirer.prompt([
            {type: "list",
             name: "employeeType",
             message: "Please choose employee type.",
             choices: ["intern", "engineer", "none"],
             
        }
        ]).then( response => {
            response.employeeType
            switch (response.employeeType) {
                case "intern": 
                  createIntern() 
                  break;
                case "engineer":
                  createEngineer()
                  break;
                default: buildTeam()    
            }
    
        })
 
    }
    function createManager() {
        console.log("Start building your team.")
        inquirer.prompt([
            {type: "input",
             name: "managerName",
             message: "Enter manager name.",
             validate: answer => {
                 if(answer !== "") {
                 return true
                 }
                 return "Please enter manager name."
             }
            },
             {type: "input",
              name: "managerId",
              message: "Enter manager ID",
              validate: answer => {
                if(answer !== "") {
                    return true
                }
                return "Please enter valid ID."
            }
                 
             },
             {
                 type: "input",
                 name: "email",
                 message: "Enter manager email.",
                 validate: answer => {
                     if(answer !== ""){
                         return true
                     }
                     return "Enter manager email address."     
                 }
             },
             {
                 type: "input",
                 name: "officeNumber",
                 message: "Provide manager office number.",
                 validate: answer => {
                     if(answer !== "") {
                         return true
                     }
                     return "Enter manager office number."
                 }
             }

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.email, answers.officeNumber);
            teamMembers.push(manager);
            arrayId.push(answers.managerID);
            createTeam()
        })
    }
    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter an employee name."
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is this employee's ID?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid ID."
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is this employee's email?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid email."
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is this engineer's Github?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid github."
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer)
            arrayId.push(answers.engineerId)
            // run a function here that creates the entire "team" prompting you to create another employee
        })
    }

    function createIntern() {
        inquirer.prompt ([
            {
                type: "input",
                name: "internName",
                message: "What is this intern's name?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }
                    return "Please reenter intern name."
                }
               
            },
            {
                type: "input",
                name: "internEmail",
                message: "Provide intern email.",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }
                    return "Please provide a valid email."
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "Provide name of intern's host institution.",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }
                    return "Provide name of intern's school."
                }
            }

 
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern)
            arrayId.push(answers.internId)
            
        })
        
    }

    function buildTeam() {
        
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
      }

      createManager()

      
}

appMenu()
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
