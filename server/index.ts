import { spawn } from 'child_process';
import MongoConnection from './src/config/mongoConnection';
import createExpressApp from './src/config/createExpressApp';
import 'dotenv/config';

/**
 * Execute the Python script to update the census data
 * @returns {void}
 */
const executePythonScript = () => {
  // Spawn a child process to run the Python script
  const python = spawn(
    '/Library/Frameworks/Python.framework/Versions/3.9/bin/python3',
    ['../server/scripts/update_census_data.py'],
  );

  // Log the output of the Python script
  python.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
  });

  // Log any errors from the Python script
  python.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });

  // Log when the Python script exits
  python.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
  });

  // Log any errors when spawning the Python script
  python.on('error', (err) => {
    console.error(`Failed to start Python script: ${err}`);
  });
};

const main = async () => {
  // Listen for termination
  process.on('SIGTERM', () => process.exit());

  // Set up the datbase connection
  const dbConnection = await MongoConnection.getInstance();
  dbConnection.open();

  // Instantiate express app with configured routes and middleware
  const app = createExpressApp(dbConnection.createSessionStore());

  // Instantiate a server to listen on a specified port
  app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')} 🚀`);
    console.log('  Press Control-C to stop\n');
  });

  // setInterval(executePythonScript, 60 * 60 * 1000);
  executePythonScript();
};

// Run the server
main();
