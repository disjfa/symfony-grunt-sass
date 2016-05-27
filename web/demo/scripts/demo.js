window.$ = window.jQuery = require('jquery');
window.Tether = require('tether');
var Bootstrap = require('bootstrap');
Bootstrap.$ = $;

import { DeveloperGreetings } from './module';

const HELLO_WORLD = new DeveloperGreetings('Hello symfony grunt');
HELLO_WORLD.shoutOut();

require('./plain.old');