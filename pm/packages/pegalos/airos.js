function getVersionUrl(version) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    if (!version.startsWith('--@')) {
        return `air:error [${timestamp}] Version must start with --@ (e.g. --@latest)`;
    }
    
    const cleanVersion = version.replace('--', '');
    let url;
    
    if (cleanVersion === '@latest') {
        url = 'https://cdn.jsdelivr.net/gh/blockscorp/blocksos@latest/blocksinit.js';
    } else if (cleanVersion.startsWith('@')) {
        url = `https://cdn.jsdelivr.net/gh/blockscorp/blocksos${cleanVersion}/blocksinit.js`;
    } else {
        return `air:error [${timestamp}] Invalid version format. Use --@latest or --@<version>`;
    }
    
    return loadScript(url);
}

function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => console.log(`bm:loaded [${new Date().toISOString().replace('T', ' ').split('.')[0]}] ${url}`);
    script.onerror = () => console.error(`bm:error [${new Date().toISOString().replace('T', ' ').split('.')[0]}] Failed to load ${url}`);
    document.head.appendChild(script);
    return `air:loading [${new Date().toISOString().replace('T', ' ').split('.')[0]}] ${url}`;
}
