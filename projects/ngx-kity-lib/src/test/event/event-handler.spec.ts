import {async} from '@angular/core/testing';
import {EventHandler} from '../../lib/event/event.handler';


describe('EventHandler Test', () => {

  beforeEach(async(() => {

  }));

  beforeEach(() => {

  });

  it('should init CustomEvent', () => {
    expect((window as any).CustomEvent).toBeTruthy();
  });

  it('should create EventHandler', () => {
    const eventHandler = new EventHandler();
    const eventHandler1 = new EventHandler();
    expect(eventHandler1.guid - eventHandler.guid).toEqual(1);

    expect(EventHandler.INNER_HANDLER_CACHE[eventHandler.guid]).toEqual({});
    expect(EventHandler.USER_HANDLER_CACHE[eventHandler.guid]).toEqual({});
  });

  it('should listen', () => {
    const eventHandler = new EventHandler();
    const eventType = 'testEvent';
    expect(Object.keys(EventHandler.INNER_HANDLER_CACHE[eventHandler.guid]).length).toEqual(0);
    eventHandler.listen({} as any, eventType, (e) => false, false);
    expect(EventHandler.INNER_HANDLER_CACHE[eventHandler.guid][eventType]).toBeTruthy();
    expect(EventHandler.USER_HANDLER_CACHE[eventHandler.guid][eventType]).toBeTruthy();
    expect(EventHandler.USER_HANDLER_CACHE[eventHandler.guid][eventType].length).toEqual(1);
  });


});
