import logger from "./utils/logger";
import Serve from "./server";
import json from "./utils/json";

async function main() {
    const packagef = await json.ReadJSON("package.json");
    const servers = await json.ReadJSON("servers.json");

    logger.info(`Starting up ${packagef.name}\n`);

    // Start servers
    Serve(servers.host, servers.port);
}

await main();
