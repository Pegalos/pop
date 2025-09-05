function cmds(args) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const cmdArgs = args.slice(1);
    if (!cmdArgs || cmdArgs.length === 0) {
        return `unknown, err`;
    }
    if (cmdArgs[0] === 'test') {
        return `Hello, world! [${timestamp}]`;
    } else {
        return `bm:usage [${timestamp}] Usage: bm hello`;
    }
}

return cmds(args);
