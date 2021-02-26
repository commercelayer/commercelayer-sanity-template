"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAllFilesRecursively = (dirPath, arrayOfFiles) => {
    const files = fs_1.default.readdirSync(dirPath);
    files.forEach(function (file) {
        if (fs_1.default.statSync(dirPath + path_1.default.sep + file).isDirectory()) {
            arrayOfFiles = getAllFilesRecursively(path_1.default.join(dirPath, file), arrayOfFiles);
        }
        else {
            arrayOfFiles.push(path_1.default.join(dirPath, file));
        }
    });
    return arrayOfFiles;
};
const getAllFiles = (dirPath) => {
    return getAllFilesRecursively(dirPath, []);
};
exports.default = getAllFiles;
