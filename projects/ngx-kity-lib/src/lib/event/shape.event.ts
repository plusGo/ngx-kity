/**
 * 图形事件包装类
 * */
import {KityPoint} from '../model/kity-point';
import {KityMatrix} from '../model/kity-matrix';

export class ShapeEvent {
  target: any;
  type: any;
  originEvent: any;
  targetShape: any;

  constructor(event: any) {
    if (typeof event !== 'object') {
      this.type = event.type;
      this.target = event.target;
      // use标签有特殊属性， 需要区别对待
      if (this.target.correspondingUseElement) {
        this.target = this.target.correspondingUseElement;
      }
      this.originEvent = event;
      this.targetShape =
        this.target.shape ||
        this.target.paper ||
        event.currentTarget &&
        (event.currentTarget.shape || event.currentTarget.paper);


      if (event._kityParam) {
        Object.assign(this, event._kityParam);
      }

    } else {
      Object.assign(this, event);
    }
  }

  preventDefault() {

    const evt = this.originEvent;

    if (!evt) {
      return true;
    }

    if (evt.preventDefault) {

      evt.preventDefault();

      return evt.cancelable;

    } else {

      evt.returnValue = false;

      return true;

    }
  }

  // 当前鼠标事件在用户坐标系中点击的点的坐标位置
  getPosition(refer, touchIndex) {

    if (!this.originEvent) {
      return null;
    }

    const eventClient = this.originEvent.touches ?
      this.originEvent.touches[touchIndex || 0] :
      this.originEvent;

    const target = this.targetShape;
    const targetNode = target.shapeNode || target.node;

    const pScreen = new KityPoint(
      eventClient && eventClient.clientX || 0,
      eventClient && eventClient.clientY || 0
    );

    const pTarget = KityMatrix.transformPoint(pScreen, targetNode.getScreenCTM().inverse());
    const pRefer = KityMatrix.getCTM(target, refer || 'view').transformPoint(pTarget);

    return pRefer;
  }
}
