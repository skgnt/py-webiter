var pyexecuter = null;
var synchronization = true;



async function pyodideSetup(fsHandle, callback = () => { console.log(err) }) {
    pyexecuter = new PyodideExecuter(settings["file_system"], fsHandle);
    try {


        await pyexecuter.loadPyodideAndPackages();
        console_print("Pyodide loaded successfully", { log: true });
        if (settings["python_package"].length > 0) {
            await pyexecuter.installPackage(settings["python_package"]);
            console_print(`Packages installed: ${settings["python_package"]}`, { log: true });
        }



        await pyexecuter.virtualFilesystemMount({ folder: "/workfolder" });
        console_print(`Virtual filesystem mounted for ${settings["file_system"]}`, { log: true });
        if (settings["file_system"] == "IDBFS" && settings["IDBFS_save"] == true) {
            console.log("IDBFS read");
            await pyexecuter.FileSystemSynchronization(true, { callback: (err) => { callback(err) } });
        }
        else if (settings["file_system"] == "NATIVEFS") {
            await pyexecuter.FileSystemSynchronization(true, { callback: (err) => { callback(err) } });
        }
        


        

        console_print("-----Welcome to Py-Webiter-----", {});
        console_print("Pyodide version: " + pyexecuter.pyodide.version, { log: true });
        console_print("Python version: ", { log: true });
        let [status, res] = await pyexecuter.run(`
import sys
print(sys.version)`);
        if (status == 0) {
            console_print(res, { log: true });
        }
        else {
            console_print(`Error getting python version: ${res}`, { error: true });
        }
    }
    catch (e) {
        console_print(`Error loading Pyodide: ${e}`, { error: true });
    }

}



class StdinHandler {
    constructor(results, options) {
        this.results = results;
        this.idx = 0;
        Object.assign(this, options);
    }
    stdin() {
        return this.results[this.idx++];
    }
}

class PyodideExecuter {
    constructor(file_system, dirHandle) {
        this.pyodide = null;
        this.res_txt = "";
        this.nativefs = null;
        this.file_system = file_system;
        this.dirHandle = dirHandle;
        this.synchronization = true;

    }

    async loadPyodideAndPackages() {

        this.pyodide = await loadPyodide({
            stdout: (msg) => { this.res_txt += msg + "\n"; }
        });
        await this.pyodide.loadPackage("micropip")


    }

    async installPackage(package_list) {
        for (let i = 0; i < package_list.length; i++) {
            let pypackage = package_list[i];
            if (AVAILABLE_PACKEGES.includes(pypackage)) {
                await this.pyodide.loadPackage(pypackage);
            }
            else {
                console_print(`Package ${pypackage} is not available`, { error: true });
            }
        }
    }

    async run(code) {
        try {
            this.res_txt = "";
            await this.pyodide.runPython(code);
            return [0, this.res_txt];
        } catch (e) {
            console.log(e);
            //\\で区切り、最初の部分を取得
            let error = e.message.split("\\")[0];
            return [1, error]
        }
    }

    async run_file(file_path) {

        return await this.run(`exec(open("${file_path}").read())`);

    }

    async virtualFilesystemMount({ folder = "/workfolder" }) {
        let mount_type = this.file_system;
        let type = null;
        if (mount_type === "IDBFS") {
            type = this.pyodide.FS.filesystems.IDBFS;
            this.pyodide.FS.mount(type, { root: "./" }, "/home/pyodide/");
        }
        else if (mount_type === "MEMFS") {
            type = this.pyodide.FS.filesystems.MEMFS;
            this.pyodide.FS.mount(type, { root: "./" }, "/home/pyodide/");
        }
        else if (mount_type === "NATIVEFS") {
            await this.nativefsMount();
        }
    }

    async nativefsMount() {


        this.nativefs = await this.pyodide.mountNativeFS("/home/pyodide/", this.dirHandle);
    }








    async FileSystemSynchronization(load, { callback = (err) => { console.log(err) } }) {
        if (this.file_system === "IDBFS") {
            try {

                await this.pyodide.FS.syncfs(load, function (err) {
                    callback(err);
                    
                });
                this.synchronization = true;

                return true;
            }
            catch (e) {
                console.log(e);
                return e;
            }
        }
        else if (this.file_system === "NATIVEFS") {
            try {
                console.log("nativefs sync");
                if (!load){
                    await this.nativefs.syncfs();

                    this.synchronization = true;
                    
                }
                callback(false);
                return true;
            }
            catch (e) {
                console.log(e);
                return e;
            }
        }
    }

    createFile(filename, data) {
        
        try {
            let stream = this.pyodide.FS.open(filename, "w+");
            this.pyodide.FS.write(stream, data, 0, data.length, 0);
            this.synchronization = false;
            return true;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }

    createFileString(filename, data) {
        try {
            this.pyodide.FS.writeFile(filename, data);
            this.synchronization = false;
            return true;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }

    async createFolder(folder) {
        console.log(await this.run(`import os
os.makedirs("${folder}",exist_ok=True)`))
    }

    async listTree() {
        let [status, res] = await this.run(`
import glob
path=glob.glob("./**/*", recursive=True)
print({"path":path})`);
        if (status == 0) {
            return res;
        }
        else {
            return null;
        }
    }

    readFile(filename) {
        return this.pyodide.FS.readFile(filename);

    }



}