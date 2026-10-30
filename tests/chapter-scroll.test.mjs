import test from 'node:test';
import assert from 'node:assert/strict';
import { WheelGesture } from '../src/lib/chapter-scroll.ts';

test('reading to an edge never changes chapter during the same wheel gesture',()=>{
  const gesture=new WheelGesture();
  assert.equal(gesture.next(400,0,true),false);
  assert.equal(gesture.next(100,50,false),false);
  assert.equal(gesture.next(90,150,false),false);
  assert.equal(gesture.next(100,500,false),true);
});

test('one long trackpad gesture changes at most one chapter',()=>{
  const gesture=new WheelGesture();
  assert.equal(gesture.next(40,0,false),false);
  assert.equal(gesture.next(45,30,false),true);
  for(let time=60;time<=1800;time+=30)assert.equal(gesture.next(100,time,false),false);
  assert.equal(gesture.next(100,2100,false),true);
});

test('wheel input during an animation cannot leak into the next chapter',()=>{
  const gesture=new WheelGesture();
  assert.equal(gesture.next(100,0,true),false);
  assert.equal(gesture.next(100,100,false),false);
  assert.equal(gesture.next(100,400,false),true);
});

test('small accidental movements and direction changes do not accumulate into a jump',()=>{
  const gesture=new WheelGesture();
  assert.equal(gesture.next(50,0,false),false);
  assert.equal(gesture.next(-45,40,false),false);
  assert.equal(gesture.next(40,80,false),false);
  assert.equal(gesture.next(-80,400,false),true);
});
