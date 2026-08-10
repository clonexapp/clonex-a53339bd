import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? (process.env.ComSpec ?? "cmd.exe") : "npm";
const npmArguments = isWindows ? ["/d", "/s", "/c", "npm.cmd run build"] : ["run", "build"];

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", ...options });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`${command} foi encerrado por ${signal}.`));
        return;
      }
      if (code !== 0) {
        reject(new Error(`${command} terminou com código ${code}.`));
        return;
      }
      resolve();
    });
  });
}

await run(npmCommand, npmArguments, {
  env: { ...process.env, NITRO_PRESET: "node-server" },
});
await run(process.execPath, [".output/server/index.mjs"], { env: process.env });
