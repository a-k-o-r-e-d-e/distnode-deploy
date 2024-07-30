#!/user/bin/env node

import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import * as test from 'tape';
import fetch from "node-fetch";

const serverStart = (): Promise<{
  server: ChildProcessWithoutNullStreams;
  url: string;
}> =>
  new Promise((resolve, _reject) => {
    const server = spawn("ts-node", ["../server.ts"], {
      env: Object.assign({}, process.env, { PORT: 0 }),
      cwd: __dirname,
    });
    server.stdout.once("data", async (data) => {
      const message = JSON.parse(data.toString().trim());
      const msg = typeof message === 'string' ? message : message.msg
    //   console.log("Message:: ", msg);
      const url = /Server (?:listening|running) at (.+)$/.exec(msg)[1];
    //   console.log("Url:: ", url);
      resolve({ server, url });
    });
  });

test('GET /recipes/42', async (t) => {
    const {server, url} = await serverStart();
    const result = await fetch(`${url}/recipes/42`);
    const body = await result.json();
    t.equal(body.id, 42);
    server.kill();
});

test('GET /', async (t) => {
    const {server, url} = await serverStart();
    const result = await fetch(`${url}/`);
    const body = await result.text();
    t.equal(body, "Hello from Distributed Node.js!");
    server.kill();
})