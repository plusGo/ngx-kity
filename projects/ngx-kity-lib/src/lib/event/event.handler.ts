import {ShapeEvent} from './shape.event';

export type KityEventType = string;

export class EventHandler {
  // 内部处理器缓存
  public static INNER_HANDLER_CACHE = {};
  // 用户处理器缓存
  public static USER_HANDLER_CACHE = {};
  public static GUID = 0;

  private readonly guid;


  constructor() {
    this.guid = ++EventHandler.GUID;
    EventHandler.INNER_HANDLER_CACHE[this.guid] = {};
    EventHandler.USER_HANDLER_CACHE[this.guid] = {};
  }

  /**
   * 添加事件
   */
  public static addEvent(type: KityEventType, hanlder, isOnce: boolean): EventHandler {
    if (typeof type === 'string') {
      type = type.match(/\S+/g);
    }
    return EventHandler;
  }


  /**
   * 执行绑定, 该方法context为shape或者mixin了eventhandler的对象
   */
  private listen(node: Node, type: KityEventType, handler: any, isOnce: boolean): void {
    const eid = this.guid;
    // 内部监听器
    if (!EventHandler.INNER_HANDLER_CACHE[eid][type]) {
      EventHandler.INNER_HANDLER_CACHE[eid][type] = (e) => {
        e = new ShapeEvent(e || window.event);

      };
    }

    // 用户监听器
    if (!EventHandler.USER_HANDLER_CACHE[eid][type]) {
      EventHandler.USER_HANDLER_CACHE[eid][type] = [handler];

      // 绑定对应类型的事件
      // dom对象利用dom event进行处理， 非dom对象， 由消息分发机制处理
      if (!!node && ('on' + type) in node) {
        this.bindDomEvent(node, type, EventHandler.INNER_HANDLER_CACHE[eid][type]);
      }
    } else {
      EventHandler.USER_HANDLER_CACHE[eid][type].push(handler);
    }
  }

  bindDomEvent(node: Node, type: KityEventType, handler) {
    if (node.addEventListener) {
      node.addEventListener(type, handler, false);
    } else {
      (node as any).attachEvent('on' + type, handler);
    }
  }
}


export const CustomEvent = (event, params) => {
  params = params || {
    bubbles: false,
    cancelable: false,
    detail: undefined
  };

  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
};


(() => {
  CustomEvent.prototype = (window as any).Event.prototype;

  (window as any).CustomEvent = CustomEvent;
})();
