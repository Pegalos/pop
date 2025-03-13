// Function to return the correct URL based on the version
function getVersionUrl(version) {
    let url;

    // Remove the '--' prefix from the version argument
    version = version.replace('--', '');

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
    console.log("Received args:", args); // Debug line to see what arguments we're getting
    
    // Check if we have any arguments
    if (!args || args.length === 0) {
        console.log("Usage: bm -i @latest");
        console.log("   or: bm -i @<version>");
        return;
    }

    // Make the command more flexible
    const installFlag = args[0] === '-i' || args[0] === '--install';
    const versionArg = args[1] ? args[1].replace('--', '') : '@latest'; // Default to @latest if no version specified

    if (installFlag) {
        getVersionUrl(versionArg);
    } else {
        console.log("Usage: bm -i @latest");
        console.log("   or: bm -i @<version>");
    }
}

// Execute the command with the provided arguments
handleBlocksCommand(args);
