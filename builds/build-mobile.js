"use strict";

const shell = require("shelljs");

const BASE_HREF = "./";
const OUTPUT_TEMP_PATH = ".temp/mobile";
const OUTPUT_DIST_PATH = "dist/apps/mobile";
const OUTPUT_BUILD_PATH = ".temp/mobile/www";
const OUTPUT_RESOURCES_PATH = ".temp/mobile/resources";
const MOBILE_ASSETS = "assets/mobile/*";
const IMG_ASSETS = "assets/img/*";

shell.echo("Start building mobile");

// DELETE TEMP FOLDER
shell.rm("-rf", `${OUTPUT_TEMP_PATH}`);
shell.rm("-rf", `${OUTPUT_DIST_PATH}`);
shell.echo("Deleted temp and dist folders...");

// BUILD ANGULAR
console.log("build angular");
const angularBuildCommand = `ng build --configuration=development --base-href ${BASE_HREF} --output-path=${OUTPUT_BUILD_PATH}`;
shell.exec(angularBuildCommand);

// COPY MOBILE ASSETS
console.log("copy mobile assets");
shell.cp("-r", `${MOBILE_ASSETS}`, `${OUTPUT_TEMP_PATH}`);
shell.mkdir("-p", `${OUTPUT_DIST_PATH}`);

// ADD ANDROID
shell.cd(`${OUTPUT_TEMP_PATH}`);
console.log("cordova platform add android");
shell.exec(`cordova platform add android`);
console.log("adding plugins");
shell.cd(`../..`);

// COPY IMG ASSETS
console.log("copy img assets & cordova res");
shell.mkdir("-p", `${OUTPUT_RESOURCES_PATH}`);
shell.cp("-r", `${IMG_ASSETS}`, `${OUTPUT_RESOURCES_PATH}`);

shell.cd(`${OUTPUT_TEMP_PATH}`);
shell.exec(`cordova-res`);
shell.cd(`../..`);

// BUILD MOBILE
console.log("build mobile");
shell.cd(`${OUTPUT_TEMP_PATH}`);
shell.exec(`cordova build`);
shell.cd(`../..`);

// COPY OUTPUT TO DIST
console.log("copy output to dist");
shell.cp("-r", `${OUTPUT_TEMP_PATH}/platforms/android/`, `${OUTPUT_DIST_PATH}`);
shell.cd(`../..`);

console.log("DONE");
