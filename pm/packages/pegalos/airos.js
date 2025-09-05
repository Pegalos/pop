function getVersionUrl(version) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    if (!version.startsWith('--@')) {
        return `bm:error [${timestamp}] Version must start with --@ (e.g. --@latest)`;
    }
    
    const cleanVersion = version.replace('--', '');
    let url;
    
    if (cleanVersion === '@latest') {
        url = 'https://cdn.jsdelivr.net/gh/pegalos/airos-kraken@latest/test.js';
    } else if (cleanVersion.startsWith('@')) {
        url = `https://cdn.jsdelivr.net/gh/pegalos/airos-kraken${cleanVersion}/test.js`;
    } else {
        return `bm:error [${timestamp}] Invalid version format. Use --@latest or --@<version>`;
    }
    
    return loadScript(url);
}

function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => console.log(`bm:loaded [${new Date().toISOString().replace('T', ' ').split('.')[0]}] ${url}`);
    script.onerror = () => console.error(`bm:error [${new Date().toISOString().replace('T', ' ').split('.')[0]}] Failed to load ${url}`);
    document.head.appendChild(script);
    return `bm:loading [${new Date().toISOString().replace('T', ' ').split('.')[0]}] ${url}`;
}

function handleBlocksCommand(args) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const cmdArgs = args.slice(1);

    const firstArg = cmdArgs[0];
    const secondArg = cmdArgs[1];

    if (firstArg === 'test') {
        if (typeof window.bmTestCommand === 'function') {
            return window.bmTestCommand(['test']);
        } else {
            return `bm:error [${timestamp}] test.js is not loaded yet. Use: bm -i --@latest to load it first.`;
        }
    }

    // Handle install command
    if (firstArg === '-i' || firstArg === '--install') {
        if (!secondArg) {
            return `bm:error [${timestamp}] Version argument required (--@latest or --@<version>)`;
        }
        return getVersionUrl(secondArg);
    } else {
        return `bm:usage [${timestamp}] Usage: bm -i --@latest OR bm test`;
    }
}

return handleBlocksCommand(args);
