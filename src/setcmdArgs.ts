const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
import setupDb from './setup/db.setup';

export default async function setCmdArgs() {
    const optionDefinitions = [
        {
            name: 'help',
            alias: 'h',
            type: Boolean,
            description: 'Display this usage guide.'
        },
        {
            name: 'version',
            alias: 'v',
            type: Boolean,
            description: 'Displays current version'
        },
        {
            name: 'newdb',
            alias: 'n',
            type: Boolean,
            description: 'Setup the database.'
        }
    ]
    const options = commandLineArgs(optionDefinitions)
    if (options.help) {
        const usage = commandLineUsage([
            {
                header: 'Core',
                content: 'A registry server to store did and resolve it into did doc.'
            },
            {
                header: 'Options',
                optionList: optionDefinitions
            },
            {
                content: 'Project home: {underline https://github.com/me/example}'
            }
        ])
        console.log(usage)
        return false;
    } else if (options.newdb) {
        console.log("Setting up new database..")
        await setupDb();
        console.log("Database setup done. You can start the server")
        return false;
    } else {
        console.log(options)
        return true;
    }
}