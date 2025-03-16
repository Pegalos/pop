function startX() {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    console.log(`bm:display [${timestamp}] Launching BlocksOS GUI...`);

    // Create a full-screen div to act as the "desktop"
    const desktop = document.createElement('div');
    desktop.id = 'blocksos-desktop';
    Object.assign(desktop.style, {
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: '#202020', color: '#ffffff', fontFamily: 'monospace',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    });

    // Create a window (basic movable div)
    const window = document.createElement('div');
    window.id = 'blocksos-window';
    Object.assign(window.style, {
        width: '400px', height: '300px', background: '#333',
        border: '2px solid #888', borderRadius: '5px',
        position: 'absolute', top: '50px', left: '50px',
        boxShadow: '3px 3px 10px rgba(0,0,0,0.5)', padding: '10px'
    });

    // Window title bar (draggable)
    const titleBar = document.createElement('div');
    titleBar.innerText = 'BlocksOS Terminal';
    Object.assign(titleBar.style, {
        background: '#444', padding: '5px', cursor: 'grab'
    });

    // Fake terminal area
    const terminal = document.createElement('div');
    terminal.innerHTML = "Welcome to BlocksOS GUI!<br>Type 'exit' to close.";
    Object.assign(terminal.style, {
        padding: '10px', overflow: 'auto', height: 'calc(100% - 30px)'
    });

    // Append everything
    window.appendChild(titleBar);
    window.appendChild(terminal);
    desktop.appendChild(window);
    document.body.appendChild(desktop);

    // Draggable Window Logic
    let offsetX, offsetY, isDragging = false;
    titleBar.onmousedown = (e) => {
        isDragging = true;
        offsetX = e.clientX - window.offsetLeft;
        offsetY = e.clientY - window.offsetTop;
        titleBar.style.cursor = 'grabbing';
    };
    document.onmousemove = (e) => {
        if (isDragging) {
            window.style.left = `${e.clientX - offsetX}px`;
            window.style.top = `${e.clientY - offsetY}px`;
        }
    };
    document.onmouseup = () => { isDragging = false; titleBar.style.cursor = 'grab'; };

    // Command Handling (Fake Terminal)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (terminal.innerText.includes('exit')) {
                desktop.remove();
                console.log(`bm:display [${timestamp}] GUI closed.`);
            }
        }
    });

    return `bm:display [${timestamp}] GUI started.`;
}

function getVersionUrl(version) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    if (!version.startsWith('--@')) {
        return `bm:error [${timestamp}] Version must start with --@ (e.g. --@latest)`;
    }
    
    const cleanVersion = version.replace('--', '');
    let url;
    
    if (cleanVersion === '@latest') {
        url = 'https://cdn.jsdelivr.net/gh/blockscorp/blocksos@latest/blocksinit.js';
    } else if (cleanVersion.startsWith('@')) {
        url = `https://cdn.jsdelivr.net/gh/blockscorp/blocksos${cleanVersion}/blocksinit.js`;
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
    
    if (!cmdArgs || cmdArgs.length === 0) {
        return `pop:blocks:usage [${timestamp}] Usage: bm -dev --startx | bm -i --@latest`;
    }

    const firstArg = cmdArgs[0];
    const secondArg = cmdArgs[1];

    if (firstArg === '-dev') {
        if (secondArg === '--startx') {
            return startX();
        } else {
            return `bm:error [${timestamp}] Invalid flag. Use --startx`;
        }
    } 
    else if (firstArg === '-i' || firstArg === '--install') {
        if (!secondArg) {
            return `bm:error [${timestamp}] Version argument required (--@latest or --@<version>)`;
        }
        return getVersionUrl(secondArg);
    } 
    else {
        return `bm:usage [${timestamp}] Usage: bm -dev --startx | bm -i --@latest`;
    }
}

return handleBlocksCommand(args);
