// Function to return the correct URL based on the version
function getVersionUrl(version) {
    let url;

    // Remove any leading '-' characters from the version
    version = version.replace(/^-+/, '');

    // Check if the user asked for the latest or a specific version
    if (version === '@latest') {
        url = 'https://cdn.jsdelivr.net/gh/blockscorp/blocksos@latest/'; // Adjust to the actual CDN URL
    } else if (version.startsWith('@')) {
        url = `https://cdn.jsdelivr.net/gh/blockscorp/blocksos${version}/`; // Adjust for versioned URLs
    } else {
        console.log('Invalid version specified. Use @latest or @version');
        return;
    }

    console.log(`The URL for the specified version is: ${url}`);
    return url;
}

// Function to handle the command-line arguments
function handleBlocksCommand(args) {
    // Debug line to see what arguments we're getting
    console.log("Received args:", args);
    
    // Remove the command name from the arguments
    const cmdArgs = args.slice(1);
    
    // Check if we have any arguments
    if (!cmdArgs || cmdArgs.length === 0) {
        console.log("Usage: bm -i @latest");
        console.log("   or: bm -i @<version>");
        return;
    }

    // Make the command more flexible
    const installFlag = cmdArgs[0] === '-i' || cmdArgs[0] === '--install';
    const versionArg = cmdArgs[1] || '@latest'; // Default to @latest if no version specified

    if (installFlag) {
        getVersionUrl(versionArg);
    } else {
        console.log("Usage: bm -i @latest");
        console.log("   or: bm -i @<version>");
    }
}

// Execute the command with the provided arguments
handleBlocksCommand(args);
