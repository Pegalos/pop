function getVersionUrl(version) {
    let url;
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    if (!version.startsWith('--@')) {
        return `bm:error [${timestamp}] Version must start with --@ (e.g. --@latest)`;
    }
    const cleanVersion = version.replace('--', '');
    if (cleanVersion === '@latest') {
        url = 'https://cdn.jsdelivr.net/gh/blockscorp/blocksos@latest/';
        return `bm:latest [${timestamp}] ${url}`;
    } else if (cleanVersion.startsWith('@')) {
        url = `https://cdn.jsdelivr.net/gh/blockscorp/blocksos${cleanVersion}/`;
        return `bm:${cleanVersion.substring(1)} [${timestamp}] ${url}`;
    }
    
    return `bm:error [${timestamp}] Invalid version format. Use --@latest or --@<version>`;
}
function handleBlocksCommand(args) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const cmdArgs = args.slice(1);
    if (!cmdArgs || cmdArgs.length === 0) {
        return `pop:blocks:usage [${timestamp}] bm -i --@latest or bm -i --@<version>`;
    }
    const installFlag = cmdArgs[0] === '-i' || cmdArgs[0] === '--install';
    const versionArg = cmdArgs[1];
    if (installFlag) {
        if (!versionArg) {
            return `bm:error [${timestamp}] Version argument required (--@latest or --@<version>)`;
        }
        return getVersionUrl(versionArg);
    } else {
        return `bm:usage [${timestamp}] bm -i --@latest or bm -i --@<version>`;
    }
}
return handleBlocksCommand(args);
