#!/usr/bin/env node
const argv = require('yargs').argv
const commands = require('../dist/commands/commands')

const {_: args, ...rest} = argv
const {$0: script, ...params} = rest
const cmd = commands[args[0]]

if (cmd) {
  cmd(process.cwd(), params).catch(panic)
} else {
  if (args.length === 0) {
    panic(`Error: Missing command\n\n${printUsage()}`)
  } else {
    panic(`Error: Unknown command: ${args[0]}\n\n${printUsage()}`)
  }
}

function panic(err) {
  if (err) {
    console.error(err)
  }

  process.exit(1)
}

function printUsage() {
  return `Usage: sanity-template <params> <command>

  Commands:
    build
    check
    migrate
    lockfiles
    watch`
}
