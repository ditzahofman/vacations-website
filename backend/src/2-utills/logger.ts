import fsPromises from "fs/promises";

async function logger(msg: string): Promise<void> {
    const now = new Date();
    let line = `${now.toLocaleString()} \t ${msg}\n`;
    line += "----------------------------\n";
    await fsPromises.appendFile("./logger.txt", line);
}

export default logger;
