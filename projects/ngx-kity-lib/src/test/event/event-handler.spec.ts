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

  it('should bindDomEvent addEventListener', () => {
    const eventHandler = new EventHandler();
    const eventType = 'testEvent';
    const handler = () => null;
    const node = {addEventListener: (a, b, c) => null} as any;
    spyOn(node, 'addEventListener');

    eventHandler.bindDomEvent(node, eventType, handler);

    expect(node.addEventListener).toHaveBeenCalledWith(eventType, handler, false);
  });

  it('should bindDomEvent attachEvent', () => {
    const eventHandler = new EventHandler();
    const eventType = 'testEvent';
    const handler = () => null;
    const node = {attachEvent: (a, b) => null} as any;
    spyOn(node, 'attachEvent');

    eventHandler.bindDomEvent(node, eventType, handler);

    expect(node.attachEvent).toHaveBeenCalledWith(`on${eventType}`, handler);
  });

  it('should deleteDomEvent removeEventListener', () => {
    const eventHandler = new EventHandler();
    const eventType = 'testEvent';
    const handler = () => null;
    const node = {removeEventListener: (a, b, c) => null} as any;
    spyOn(node, 'removeEventListener');

    eventHandler.deleteDomEvent(node, eventType, handler);

    expect(node.removeEventListener).toHaveBeenCalledWith(eventType, handler, false);
  });

  it('should deleteDomEvent detachEvent', () => {
    const eventHandler = new EventHandler();
    const eventType = 'testEvent';
    const handler = () => null;
    const node = {detachEvent: (a, b) => null} as any;
    spyOn(node, 'detachEvent');

    eventHandler.deleteDomEvent(node, eventType, handler);

    expect(node.detachEvent).toHaveBeenCalledWith(eventType, handler);
  });


});
