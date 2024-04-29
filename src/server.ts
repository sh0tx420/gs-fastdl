import logger from "./utils/logger"
import json from "./utils/json"

export default async function Serve(host: string, portn: number) {
    const cfg = await json.ReadJSON("servers.json");

    const server = Bun.serve({
        hostname: host,
        port: portn,
        
        async fetch(request: Request) {
            const route = new URL(request.url).pathname;
            const p16 = cfg.basePath + route;

            logger.info(route);
            
            return new Response(Bun.file(p16));
        },
        /*
        error() {
            return new Response(null, { status: 404 });
        },
        */
    })

    logger.info(`HTTP server UP: ${server.hostname}:${server.port}`)
}