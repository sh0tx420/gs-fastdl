import logger from "./utils/logger";
import json from "./utils/json";

// List of files that shouldn't be served to the fastdl user
const rgHaramFiles = [
    "server.cfg",
    "listenserver.cfg",
    "start.sh"
];

export default async function Serve(host: string, portn: number) {
    const cfg = await json.ReadJSON("servers.json");

    // Start Bun HTTP server with host and port
    const server = Bun.serve({
        hostname: host,
        port: portn,
        async fetch(request: Request) {
            // Create URL string from request URL using Host header as the base
            const reqUrl = new URL(request.url, `http://${request.headers.get("Host")}`);

            // Loop through cfg.servers to access the key names later
            for (const idx of Object.keys(cfg.servers)) {
                // idx = key name btw

                // Get virtual path (request url path) and slice the first "/"
                const szVirtualDir = reqUrl.pathname.slice(1);
                logger.info(`virtualDir: ${szVirtualDir}`);

                // Get the first directory name by slicing virtual directory name length after idx length.
                // wait can't we just use "idx" for this?? wtf
                // oh wait yeah because it's from the request URL
                const szVirtualDir_first = szVirtualDir.substring(0, szVirtualDir.length > idx.length ? idx.length : szVirtualDir.length);
                logger.info(`virtualDir_first: ${szVirtualDir_first}`);

                // Check if the key name matches with first dir name of virtual dir
                if (idx === szVirtualDir_first) {
                    // For the Bun.file path: Create full path string from config path + request URL
                    const filepath = `${cfg.servers[idx].path}${reqUrl.pathname.slice(idx.length + 1)}`;
                    const file = Bun.file(filepath);    // Make file object from that path above
                    
                    // Forbid access to files that shouldn't be served to the user
                    if (rgHaramFiles.some(sub => filepath.includes(sub))) {
                        return new Response("Forbidden", { status: 403 });
                    }

                    // If the file is allowed, return the file in the response with 200 OK status code
                    return new Response(file, { status: 200 });
                }
                else {
                    return new Response("File is a directory or not found", { status: 404 });
                }
            }

            // I don't know why, but if you remove this it will cause an error
            return new Response("Internal Server Error", { status: 500 });
        },
        error() {
            return new Response("File is a directory or not found", { status: 404 });
        }
    });

    logger.info(`HTTP server UP: ${server.hostname}:${server.port}`);
}
