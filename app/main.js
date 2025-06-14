import fs from "fs";

function matchPattern(inputLine, pattern) {
    if (pattern.length === 1) {
        return inputLine.includes(pattern);
    } else if (pattern === "\\d") {
        return /\d/.test(inputLine);
    } else if (pattern === "\\w") {
        return /\w/.test(inputLine);
    } else if (pattern[0] == "[" && pattern[pattern.split("").length - 1]) {
        const chars = pattern.slice(1, -1);
        const regEx = new RegExp(`[${chars}]`, "g");
        return regEx.test(inputLine);
    } else if (pattern.includes("\\")) {
        const regex = new RegExp(pattern);
        return regex.test(inputLine);
    } else if (pattern[0] == "^") {
        const comp = pattern.slice(1);
        return inputLine.startsWith(comp);
    } else if (pattern[pattern.length - 1] == "$") {
        const comp = pattern.slice(0, pattern.length - 1);
        return inputLine.endsWith(comp);
    } else if (pattern.includes("+")) {
        const regex = new RegExp(pattern);
        return regex.test(inputLine);
    } else if (pattern.includes("?")) {
        const regex = new RegExp(pattern);
        return regex.test(inputLine);
    } else {
        throw new Error(`Unhandled pattern ${pattern}`);
    }
}

function main() {
    const pattern = process.argv[3];
    const inputLine = fs.readFileSync(0, "utf-8").trim();

    if (process.argv[2] !== "-E") {
        console.log("Expected first argument to be '-E'");
        process.exit(1);
    }

    if (matchPattern(inputLine, pattern)) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

main();
