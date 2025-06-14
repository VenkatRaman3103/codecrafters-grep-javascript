import fs from "fs";

function matchPattern(inputLine, pattern) {
    console.log(inputLine, pattern);
    if (pattern.length === 1) {
        return inputLine.includes(pattern);
    } else if (pattern === "\\d") {
        return /\d/.test(inputLine);
    } else if (pattern === "\\w") {
        return /\w/.test(inputLine);
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
