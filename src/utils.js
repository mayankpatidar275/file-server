export const isPortAvailable = (servers, _port) => {
    for (const item of servers) {
        if (item.port === _port) return false;
    }
    return true;
};

export const killAllServers = (servers) => {
    for (const item of servers) {
        item.server.kill();
    }

}