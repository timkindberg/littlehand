import {Component, EventEmitter} from 'angular2/core';

export default function little(selector: string, template: string) {
    let inputs =
        (template
            .match(/{{ *(\S+) *}}/g) || [])
            .map(i => i.replace(/{{ */, '').replace(/ *}}/, ''));

    let outputs =
        (template
            .match(/=" *([^\."']+)\.emit\(/g) || [])
            .map(o => o.replace(/=" */, '').replace('.emit(', ''));

    @Component({ selector, inputs, outputs, template })
    class LittleCmp {
        log(...args: any[]) { console.log(...args); }
    }

    outputs.forEach(output => LittleCmp.prototype[output] = new EventEmitter());

    return LittleCmp;
}