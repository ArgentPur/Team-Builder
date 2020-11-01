
const Employee = require("./Employee")

class Intern extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        
    }

    getRole() {
        return "Engineer"
    }


}

module.exports = Intern;