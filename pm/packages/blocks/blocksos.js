// Function to return the correct URL based on the version
function getVersionUrl(version) {
    let url;

    // Check if the user asked for the latest or a specific version
    if (version === '@latest') {
        url = 'https://cdn.jsdelivr.net/gh/blockscorp/blocksos@latest/'; // Adjust to the actual CDN URL
    } else if (version.startsWith('@')) {
        url = `https://cdn.jsdelivr.net/gh/blockscorp/blocksos${version}/`; // Adjust for versioned URLs
    } else {
        console.log('Invalid version specified');
        return;
    }

    console.log(`The URL for the specified version is: ${url}`);
}

// Function to handle the command-line arguments
function handleBlocksCommand(commandArgs) {
    if (commandArgs[0] === '-i' && commandArgs[1] && commandArgs[1].startsWith('--@')) {
        const version = commandArgs[1];
        getVersionUrl(version);
    } else {
        console.log('Invalid command');
    }
}

// Export the main function that will be called by the package manager
return function(inputArgs) {
    handleBlocksCommand(inputArgs);
};
