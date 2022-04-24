const moment = require("moment");
const chalk = require("chalk");

class Logger {

    static logTime(){
        return `${moment().format('MM-DD-YY HH:mm:ss')}`
    }

    static error(message, args){
        console.log(chalk.red(`[ERROR] ${this.logTime()} - ${message}`), args || "");
    }

    static debug(message, args){
        console.log(chalk.blue(`[DEBUG] ${this.logTime()} - ${message}`), args || "");
    }

    static success(message, args){
        console.log(chalk.green(`[OK   ] ${this.logTime()} - ${message}`), args || "");
    }

    static warn(message, args){
        console.log(chalk.yellow(`[WARN ] ${this.logTime()} - ${message}`), args || "");
    }

    static log(message, args){
        console.log(chalk.gray(`[LOG  ] ${this.logTime()} - ${message}`), args || "");
    }

}

module.exports = Logger;