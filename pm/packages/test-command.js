// Register the "test" command
async function runCommand(command) {
  if (command === "test") {
    return "Hello, World!"; // Output for the "test" command
  } else {
    return `Command "${command}" not recognized.`;
  }
}
