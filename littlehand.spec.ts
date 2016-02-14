import {
    it,
    tick,
    inject,
    fakeAsync,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder,
} from 'angular2/testing';
import { By } from 'angular2/platform/browser';
import { Component } from 'angular2/core';
import little from './littlehand';

describe('little', () => {
    it('makes a component', injectAsync([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
        const Little = little('foo', `bar`);

        @Component({
            selector: 'test',
            directives: [Little],
            template: '<foo></foo>'
        })
        class Test {}

        return tcb
            .createAsync(Test)
            .then(fixture => {
                expect(fixture.debugElement.query(By.css('foo')).nativeElement.textContent).toEqual('bar');
            });
    }));

    it('auto infers inputs', injectAsync([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
        const Little = little('foo', `{{ bar }}{{baz}}{{   quux   }}`);

        @Component({
            selector: 'test',
            directives: [Little],
            template: `<foo bar="1" baz="2" quux="3"></foo>`
        })
        class Test {}

        return tcb
            .createAsync(Test)
            .then(fixture => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('foo')).nativeElement.textContent).toEqual('123');
            });
    }));

    it('auto infers outputs', injectAsync([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
        const Little = little('foo', `<button (click)="bar.emit('bar')" (mouseenter)="   baz.emit()  "></button>`);

        @Component({
            selector: 'test',
            directives: [Little],
            template: `<foo (bar)="barHeard = $event" (baz)="bazHeard = true"></foo>`
        })
        class Test {
            private barHeard:string = '';
            private bazHeard:boolean = false;
        }

        return tcb
            .createAsync(Test)
            .then(fakeAsync(fixture => {
                const buttonEl = fixture.debugElement.query(By.css('button'));

                buttonEl.triggerEventHandler('click', null);
                buttonEl.triggerEventHandler('mouseenter', null);
                tick();

                expect(fixture.componentInstance.barHeard).toEqual('bar');
                expect(fixture.componentInstance.bazHeard).toBeTruthy();
            }));
    }));
});