// Function to return the correct URL based on the version
function getVersionUrl(version) {
    let url;

    // Remove any leading '-' characters from the version
    version = version.replace(/^-+/, '');

    // Check if the user asked for the latest or a specific version
    if (version === '@latest') {
        url = 'https://cdn.jsdelivr.net/gh/blockscorp/blocksos@latest/'; // Adjust to the actual CDN URL
        return `pop:blocks:latest ${url}`;
    } else if (version.startsWith('@')) {
        url = `https://cdn.jsdelivr.net/gh/blockscorp/blocksos${version}/`; // Adjust for versioned URLs
        return `pop:blocks:${version.substring(1)} ${url}`;
    } else {
        return 'pop:blocks:error Invalid version specified. Use @latest or @version';
    }
}

// Function to handle the command-line arguments
function handleBlocksCommand(args) {
    // Remove the command name from the arguments
    const cmdArgs = args.slice(1);
    
    // Check if we have any arguments
    if (!cmdArgs || cmdArgs.length === 0) {
        return 'pop:blocks:usage bm -i @latest or bm -i @<version>';
    }

    // Make the command more flexible
    const installFlag = cmdArgs[0] === '-i' || cmdArgs[0] === '--install';
    const versionArg = cmdArgs[1] || '@latest'; // Default to @latest if no version specified

    if (installFlag) {
        return getVersionUrl(versionArg);
    } else {
        return 'pop:blocks:usage bm -i @latest or bm -i @<version>';
    }
}

// Execute the command with the provided arguments and return the result
return handleBlocksCommand(args);
