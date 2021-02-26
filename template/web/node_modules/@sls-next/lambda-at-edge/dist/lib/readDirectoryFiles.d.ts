import { Item } from "klaw";
declare const readDirectoryFiles: (directory: string) => Promise<Array<Item>>;
export default readDirectoryFiles;
