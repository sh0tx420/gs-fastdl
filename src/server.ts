import logger from "./utils/logger"
import json from "./utils/json"

export default async function Serve(host: string, portn: number) {
    const cfg = await json.ReadJSON("servers.json");

    const server = Bun.serve({
        hostname: host,
        port: portn,
        
        async fetch(request: Request) {
            const route = new URL(request.url).pathname;
            const what = cfg.servers[route.slice(1)] // how do i name this variable????
            let vpath = cfg.basePath;

            logger.info(route);

            // i dont even know what to comment here
            if (route === what) {
                vpath = what.path
            }
            
            vpath += route;
            return new Response(Bun.file(vpath));
        },
        error() {
            return new Response("404 Not Found", { status: 404 });
        },
    })

    logger.info(`HTTP server UP: ${server.hostname}:${server.port}`)
}