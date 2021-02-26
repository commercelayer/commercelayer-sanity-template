#!/usr/bin/env node
"use strict";exports.__esModule=true;exports.nextBuild=void 0;var _fs=require("fs");var _index=_interopRequireDefault(require("next/dist/compiled/arg/index.js"));var _path=require("path");var Log=_interopRequireWildcard(require("../build/output/log"));var _build=_interopRequireDefault(require("../build"));var _utils=require("../server/lib/utils");function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const nextBuild=argv=>{const validArgs={// Types
'--help':Boolean,'--profile':Boolean,'--debug':Boolean,// Aliases
'-h':'--help','-d':'--debug'};let args;try{args=(0,_index.default)(validArgs,{argv});}catch(error){if(error.code==='ARG_UNKNOWN_OPTION'){return(0,_utils.printAndExit)(error.message,1);}throw error;}if(args['--help']){(0,_utils.printAndExit)(`
      Description
        Compiles the application for production deployment

      Usage
        $ next build <dir>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
      --profile     Can be used to enable React Production Profiling
    `,0);}if(args['--profile']){Log.warn('Profiling is enabled. Note: This may affect performance');}const dir=(0,_path.resolve)(args._[0]||'.');// Check if the provided directory exists
if(!(0,_fs.existsSync)(dir)){(0,_utils.printAndExit)(`> No such directory exists as the project root: ${dir}`);}return(0,_build.default)(dir,null,args['--profile'],args['--debug']).catch(err=>{console.error('');console.error('> Build error occurred');(0,_utils.printAndExit)(err);});};exports.nextBuild=nextBuild;
//# sourceMappingURL=next-build.js.map