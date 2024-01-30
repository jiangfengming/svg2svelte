#!/usr/bin/env node
import path from 'path'
import { fileURLToPath } from 'url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import convert from './index.js'

const argv = yargs(hideBin(process.argv))
  .command(
    '$0 <input> <output>',
    'Convert a svg file to a svelte component.',
    args =>
      args
        .positional('input', {
          type: 'string',
          describe: 'svg input file path'
        })
        .positional('output', {
          type: 'string',
          describe: 'svelte output file path'
        })
        .option('ts', {
          type: 'boolean',
          describe: 'typescript'
        })
        .option('config', {
          alias: 'c',
          describe: 'svgo config file path',
          default: path.join(
            fileURLToPath(import.meta.url),
            '..',
            'svgo.config.js'
          )
        })
        .example('svg2svelte menu.svg IconMenu.svelte')
  )
  .help()
  .parse()

convert(argv.input, argv.output, argv.ts, argv.config)
