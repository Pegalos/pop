if (!globalThis.bmCommandRegistry) {
    globalThis.bmCommandRegistry = {};
}

function getVersionUrl(version) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    if (!version.startsWith('--@')) {
        return `air:error [${timestamp}] Version must start with --@ (e.g. --@latest)`;
    }
    
    const cleanVersion = version.replace('--', '');
    let url;
    
    if (cleanVersion === '@latest') {
        url = 'https://cdn.jsdelivr.net/gh/pegalos/airos-kraken@latest/test.js';
    } else if (cleanVersion.startsWith('@')) {
        url = `https://cdn.jsdelivr.net/gh/pegalos/airos-kraken${cleanVersion}/test.js`;
    } else {
        return `air:error [${timestamp}] Invalid version format. Use --@latest or --@<version>`;
    }

    return loadScript(url);
}

function loadScript(url) {
    // Debug: loading script
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    if (typeof globalThis.bmDebug === "function") {
        globalThis.bmDebug(`air:debug [${timestamp}] Attempting to load script: ${url}`);
    }
    // Assume your terminal handles script loading in its own way, so just return debug info
    return `air:debug [${timestamp}] Script download initiated: ${url}`;
}

function handleBlocksCommand(args) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const cmdArgs = args.slice(1);

    const firstArg = cmdArgs[0];
    const secondArg = cmdArgs[1];

    // Check registered commands
    if (firstArg && globalThis.bmCommandRegistry[firstArg]) {
        if (typeof globalThis.bmDebug === "function") {
            globalThis.bmDebug(`air:debug [${timestamp}] Delegating to command: ${firstArg}`);
        }
        return globalThis.bmCommandRegistry[firstArg](cmdArgs);
    }

    // Handle install
    if (firstArg === '-i' || firstArg === '--install') {
        if (!secondArg) {
            return `air:error [${timestamp}] Version argument required (--@latest or --@<version>)`;
        }
        return getVersionUrl(secondArg);
    }
    return `air:usage [${timestamp}] Usage: air -i --@latest`;
}

return handleBlocksCommand(args);
