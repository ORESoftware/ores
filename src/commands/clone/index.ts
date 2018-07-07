#!/usr/bin/env node
'use strict';

import shortid = require("shortid");
import async = require('async');
import chalk from "chalk";
import * as cp from 'child_process';
import log from '../../logger';
import * as JSONStdio from 'json-stdio';
import * as path from "path";
const repo = process.argv[2];

export type EVCb = (err: any, val?: any) => void;

async.autoInject({

    mkdir(cb: EVCb) {

      const p = `${process.env.HOME}/.oresoftware/git-repos`;

      const k = cp.spawn('bash');
      const cmd = `mkdir -p "${p}"`;

      k.once('error', err => {
        log.error('Could not execute:', chalk.magenta.bold(cmd));
        log.error(err);
      });

      log.info('About to run the following command:', cmd);
      k.stdin.end(cmd);

      k.once('exit', code => {
        cb(code, p);
      });

    },

    runClone(mkdir: string, cb: EVCb) {

      log.warn('Cloning to dir:', mkdir);
      const id = shortid.generate();
      const p = path.resolve(mkdir + '/' + id);

      const k = cp.spawn('bash');
      const cmd = `cd "${mkdir}" && git clone --depth=1 "${repo}" "${id}"`;

      k.once('error', err => {
        log.error('Could not execute:', chalk.magenta.bold(cmd));
        log.error(err);
      });

      k.stdin.end(cmd);
      k.once('exit', code => {
        cb(code, p);
      });

    }

  },

  (err, results) => {

    if (err) {
      throw err;
    }

    JSONStdio.logToStdout({value: results.runClone});

  });
