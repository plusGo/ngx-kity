import {async} from '@angular/core/testing';
import {KityBox} from '../lib/model/kity-box';


describe('KityBox Test', () => {

  beforeEach(async(() => {

  }));

  beforeEach(() => {

  });

  it('should create KityBox', () => {
    const box = new KityBox();
    expect(box).toEqual(new KityBox(0, 0, 0, 0));

    const box2 = KityBox.createFrom(box);
    expect(box2).toEqual(box);

    const box4 = KityBox.createFrom({x: 10, y: 20, width: 30, height: 50});
    expect(box4).toEqual(new KityBox(10, 20, 30, 50));

    const box3 = new KityBox(10, 10, 20, 30);
    expect(box3.x).toEqual(10);
    expect(box3.y).toEqual(10);
    expect(box3.width).toEqual(20);
    expect(box3.height).toEqual(30);
    expect(box3.left).toEqual(10);
    expect(box3.right).toEqual(30);
    expect(box3.top).toEqual(10);
    expect(box3.bottom).toEqual(40);
    expect(box3.cx).toEqual(20);
    expect(box3.cy).toEqual(25);

  });

  it('should parse any value to KityBox', () => {
    const box = KityBox.parse('30,40,50,70');
    expect(box.x).toEqual(30);
    expect(box.y).toEqual(40);
    expect(box.width).toEqual(50);
    expect(box.height).toEqual(70);

    const box1 = KityBox.parse([30, 40, 50, 60]);
    expect(box1.x).toEqual(30);
    expect(box1.y).toEqual(40);
    expect(box1.width).toEqual(50);
    expect(box1.height).toEqual(60);

    const box2 = KityBox.parse({x: 10, y: 20, width: 30, height: 50});
    expect(box2).toEqual(new KityBox(10, 20, 30, 50));

    const box3 = KityBox.parse(null);
    expect(box3).toEqual(null);

    const box4 = KityBox.parse({});
    expect(box4).toEqual(null);
  });

  it('should getRangeX', () => {
    const kityBox = new KityBox(10, 10, 30, 50);
    expect(kityBox.getRangeX()).toEqual([10, 40]);
  });

  it('should getRangeX', () => {
    const kityBox = new KityBox(10, 10, 30, 50);
    expect(kityBox.getRangeY()).toEqual([10, 60]);
  });

  it('should merge', () => {
    const kityBox1 = new KityBox(10, 10, 50, 50);
    const kityBox2 = new KityBox(30, 30, 50, 50);
    const box3 = kityBox1.merge(kityBox2);
    expect(box3).toEqual(new KityBox(10, 10, 70, 70));
  });

  it('should intersect', () => {
    const kityBox1 = new KityBox(10, 10, 50, 50);
    const kityBox2 = new KityBox(30, 30, 50, 50);
    const box3 = kityBox1.intersect(kityBox2);
    expect(box3).toEqual(new KityBox(30, 30, 30, 30));
  });

  it('should expand', () => {
    const originBox = new KityBox(10, 10, 20, 20);

    const box1 = originBox.expand(10);
    expect(box1).toEqual(new KityBox(0, 0, 40, 40));

    const box2 = originBox.expand(10, 20);
    expect(box2).toEqual(new KityBox(-10, 0, 60, 40));

    const box3 = originBox.expand(1, 2, 3, 4);
    expect(box3).toEqual(new KityBox(6, 9, 26, 24));

  });

  it('should valueOf', () => {
    const kityBox = new KityBox(0, 0, 200, 50);
    expect(kityBox.valueOf()).toEqual([0, 0, 200, 50]);
  });

  it('should toString', () => {
    const kityBox = new KityBox(0, 0, 200, 50);
    expect(kityBox.toString()).toEqual('0 0 200 50');
  });

  it('should empty', () => {
    const kityBox = new KityBox(0, 0, 0, 100000);
    expect(kityBox.isEmpty()).toBeTruthy();
  });

});
