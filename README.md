# gs-fastdl
Simple web server to host files for GoldSrc/Source/Source2 servers' FastDL from the server's directory.

## Configuration
Create a `servers.json` file in the same directory as the release executable, or the base directory of the repository (`gs-fastdl/`).
<br>
Example configuration:
```json
{
    "host": "127.0.0.1",
    "port": 3122,
    "servers": {
        "cstrike": {
            "path": "/home/user/servers/server1/cstrike"
        }
    }
}
```
- `host`: Local IP address for the HTTP server.
- `port`: Port for the HTTP server to listen on.
- `servers`: Dictionary of a dictionary object that requires a `path` key which is the path to your game server's content directory
