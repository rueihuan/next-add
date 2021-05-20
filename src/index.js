#! /usr/bin/env node

"use strict";

const fs = require("fs");

const catchAll = require("../constants/pages/api/[...catchAll].tsx");
const appModule = require("../constants/server/app.module.ts");
const main = require("../constants/server/main.ts");
const babelrc = require("../constants/.babelrc");
const nestCli = require("../constants/nest-cli.json");
const tsConfig = require("../constants/tsconfig.json");

fs.readFile("./package.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }

  let packageJson = {};

  try {
    packageJson = JSON.parse(jsonString);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }

  const dep = packageJson.dependencies;
  if (!dep.hasOwnProperty("next"))
    throw new Error("This is not a Next.js project.");

  const devDep = packageJson.devDependencies;
  if (!devDep.hasOwnProperty("typescript"))
    throw new Error(
      `Typescript support is required. 
      Please go to https://nextjs.org/docs/basic-features/typescript`
    );

  setupPackages();
  setupFiles();
});

function setupPackages() {
  const usedYarn = fs.readdirSync("./").includes("yarn.lock");
  const installSave = usedYarn ? "yarn add" : "npm i --save";
  const installSaveDev = usedYarn ? "yarn add -D" : "npm i --save-dev";

  const corePackages = "@nestjs/common @nestjs/core @nestjs/platform-express";
  const morePackages = "rxjs rimraf reflect-metadata";

  const nestPackages = "@nestjs/cli @nestjs/schematics @nestjs/testing";
  const babelPackages =
    "@babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators babel-plugin-parameter-decorator babel-plugin-transform-typescript-metadata";
  const testingPackages = "jest supertest ts-jest";
  const typesPackages =
    "@types/express @types/jest @types/node @types/supertest";
  const lintPackages =
    "@typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier prettier";

  const child_process = require("child_process");
  child_process.execSync(`${installSave} ${corePackages} ${morePackages}`, {
    stdio: [0, 1, 2],
  });
  child_process.execSync(
    `${installSaveDev} ${nestPackages} ${babelPackages} ${testingPackages} ${typesPackages} ${lintPackages}`,
    {
      stdio: [0, 1, 2],
    }
  );
}

function setupFiles() {
  const postfix = ".bak" + parseInt(Date.now() / 1000);
  let dir = ".";

  try {
    dir = "./pages/api";
    fs.renameSync(dir, dir + postfix);
  } catch (err) {
  } finally {
    fs.mkdirSync(dir);
    fs.writeFileSync(dir + "/[...catchAll].tsx", catchAll);
  }

  try {
    dir = "./server";
    fs.renameSync(dir, dir + postfix);
  } catch (err) {
  } finally {
    fs.mkdirSync(dir);
    fs.writeFileSync(dir + "/app.module.ts", appModule);
    fs.writeFileSync(dir + "/main.ts", main);
  }

  try {
    dir = "./.babelrc";
    fs.renameSync(dir, dir + postfix);
  } catch (err) {
  } finally {
    fs.writeFileSync(dir, babelrc);
  }

  try {
    dir = "./nest-cli.json";
    fs.renameSync(dir, dir + postfix);
  } catch (err) {
  } finally {
    fs.writeFileSync(dir, nestCli);
  }

  try {
    dir = "./tsconfig.json";
    fs.renameSync(dir, dir + postfix);
  } catch (err) {
  } finally {
    fs.writeFileSync(dir, tsConfig);
  }
}
