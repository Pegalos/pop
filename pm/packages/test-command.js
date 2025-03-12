function testCommand(args) {
  let currentPath = getCurrentPath();  // This function should return the current path in the terminal
  let fileToRead = (currentPath === "/" ? "/" : currentPath + "/") + args[1];
  let output = localStorage.getItem(fileToRead);
  
  if (output === null) {
    output = "File not found.";
  }

  // Display the output in the terminal
  displayOutput(output);  // This function will add the output to your terminal

  // Optionally, you can return anything for future use or debugging
  return output;
}

// Register the 'test' command in the terminal
registerCommand("test", testCommand);
