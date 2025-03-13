function getVersionUrl(version) {
    let url;
    version = version.replace(/^-+/, '');
    if (version === '@latest') {
        url = 'https://cdn.jsdelivr.net/gh/blockscorp/blocksos@latest/'; 
        return `bm:latest ${url}`;
    } else if (version.startsWith('@')) {
        url = `https://cdn.jsdelivr.net/gh/blockscorp/blocksos${version}/`; 
        return `pop:blocks:${version.substring(1)} ${url}`;
    } else {
        return 'bm:error Invalid version specified. Use @latest or @version';
    }
}
function handleBlocksCommand(args) {
    const cmdArgs = args.slice(1);
    if (!cmdArgs || cmdArgs.length === 0) {
        return 'bm:usage bm -i @latest or bm -i @<version>';
    }
    const installFlag = cmdArgs[0] === '-i' || cmdArgs[0] === '--install';
    const versionArg = cmdArgs[1] || '@latest';
    if (installFlag) {
        return getVersionUrl(versionArg);
    } else {
        return 'bm:usage bm -i @latest or bm -i @<version>';
    }
}
return handleBlocksCommand(args);
