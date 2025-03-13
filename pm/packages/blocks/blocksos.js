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
function handleCommand(args) {
    if (args[0] === '-i' && args[1] && args[1].startsWith('--@')) {
        const version = args[1];
        getVersionUrl(version);
    } else {
        console.log('Invalid command');
    }
}

// Example: Simulating the command input
const args = process.argv.slice(2);  // Get command-line arguments
handleCommand(args);
