async function handleCommand(cmd, args) {
  let output = "";

  switch (cmd) {
    case "test":
      output = "hello, world!";
      break;
      
    default:
      if (commandRegistry[cmd]) {
        output = commandRegistry[cmd](args); // Run installed command
      } else {
        output = `Command "${cmd}" not found.`;
      }
  }

  return output;
}
