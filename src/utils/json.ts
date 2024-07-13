import { readFile } from "fs/promises";
import { resolve as pathresolve } from "path";

export default {
    // NOTE: type interface for package.json in return type? (Promise<PackageJSON>)
    async ReadJSON(fpath: string): Promise<any> {
        const rpath = pathresolve(process.cwd(), fpath);
        const data = await readFile(rpath, { encoding: "utf-8" });

        return JSON.parse(data);
    }
};
