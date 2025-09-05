if (!globalThis.bmCommandRegistry) {
    globalThis.bmCommandRegistry = {};
}

async function loadAndEvalScript(url) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    try {
        if (typeof globalThis.bmDebug === "function") {
            globalThis.bmDebug(`air:debug [${timestamp}] Fetching script: ${url}`);
        }
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Fetch failed: ${res.status}`);
        }
        const code = await res.text();
        if (typeof globalThis.bmDebug === "function") {
            globalThis.bmDebug(`air:debug [${timestamp}] Evaluating script: ${url}`);
        }
        eval(code); // This registers the command
        return `air:debug [${timestamp}] Loaded and evaluated ${url}`;
    } catch (e) {
        return `air:error [${timestamp}] Failed to load ${url}: ${e}`;
    }
}

function getVersionUrl(version) {
    if (!version.startsWith('--@')) {
        return `air:error Version must start with --@ (e.g. --@latest)`;
    }
    const cleanVersion = version.replace('--', '');
    if (cleanVersion === '@latest') {
        return 'https://cdn.jsdelivr.net/gh/pegalos/airos-kraken@latest/test.js';
    } else if (cleanVersion.startsWith('@')) {
        return `https://cdn.jsdelivr.net/gh/pegalos/airos-kraken${cleanVersion}/test.js`;
    } else {
        return `air:error Invalid version format. Use --@latest or --@<version>`;
    }
}

async function handleBlocksCommand(args) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const cmdArgs = args.slice(1);
    const firstArg = cmdArgs[0];
    const secondArg = cmdArgs[1];

    if (firstArg && globalThis.bmCommandRegistry[firstArg]) {
        if (typeof globalThis.bmDebug === "function") {
            globalThis.bmDebug(`air:debug [${timestamp}] Delegating to command: ${firstArg}`);
        }
        return globalThis.bmCommandRegistry[firstArg](cmdArgs);
    }

    if (firstArg === '-i' || firstArg === '--install') {
        if (!secondArg) {
            return `air:error [${timestamp}] Version argument required (--@latest or --@<version>)`;
        }
        const url = getVersionUrl(secondArg);
        return await loadAndEvalScript(url);
    }

    return `air:usage [${timestamp}] Usage: air -i --@latest`;
}

if (typeof window === "undefined" || !window) {
    (async () => { return await handleBlocksCommand(args); })();
} else {
    handleBlocksCommand(args).then(result => {
        if (typeof globalThis.bmPrint === "function") {
            globalThis.bmPrint(result);
        } else {
            console.log(result);
        }
    });
}
