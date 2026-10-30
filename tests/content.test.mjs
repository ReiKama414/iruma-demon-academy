import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { characterCategories, characterMemberships, categoryPath, isInCategory } from '../src/data/taxonomy.ts';
import { stageFeatures } from '../src/data/media.ts';
import { chapters, characters, platforms, seasons, sources, acts } from '../src/data/content.ts';

test('seven scenes and four complete seasons',()=>{
  assert.equal(chapters.length,7);
  assert.deepEqual(seasons.map(s=>s.episodes),[23,21,21,24]);
  assert.deepEqual(seasons.map(s=>s.date),['2019.10.05','2021.04.17','2022.10.08','2026.04.04']);
});
test('stage contains exactly thirteen unique classmates',()=>{
  const ensemble=characters.filter(c=>c.groups.includes('abnormal'));
  assert.equal(ensemble.length,13);
  assert.equal(new Set(characters.map(c=>c.id)).size,characters.length);
  assert.equal(new Set(ensemble.map(c=>c.officialId)).size,13);
  assert.ok(ensemble.some(c=>c.id==='soi'));
});
test('profiles have all required fields',()=>{
  for(const c of characters) for(const field of ['name','jp','en','cv','debut','role','trait','ability','relation','color','symbol','s4']) assert.ok(c[field],`${c.id}.${field}`);
});
test('each season has multiple verified Taiwan platform links',()=>{
  for(const season of seasons){
    const available=platforms.filter(p=>p.links[season.id]);
    assert.ok(available.length>=5);
    for(const p of available) assert.equal(new URL(p.links[season.id]).protocol,'https:');
  }
});
test('fourth season includes post-festival arcs',()=>{
  assert.equal(acts.length,3);
  assert.ok(acts[1].subtitle.includes('大貴族會'));
  assert.ok(acts[2].subtitle.includes('魔偶像'));
  for(const act of acts){assert.ok(act.body);assert.ok(act.title);}
  assert.ok(sources.some(s=>s.url.endsWith('movieproject.html')));
});


test('all fifty requested categories have valid parents and profile memberships',()=>{
  assert.equal(characterCategories.length,50);
  const ids=new Set(characterCategories.map(node=>node.id));
  assert.equal(ids.size,50);
  for(const node of characterCategories){
    assert.ok(!node.parent||ids.has(node.parent),node.id);
    const path=categoryPath(node.id);
    assert.equal(new Set(path.map(parent=>parent.id)).size,path.length);
  }
  for(const character of characters){
    assert.ok(characterMemberships[character.id]?.length,character.id);
    for(const id of characterMemberships[character.id])assert.ok(ids.has(id),id);
  }
  const robin=characters.find(c=>c.id==='robin');
  assert.ok(isInCategory(robin,'family-barbatos'));
  assert.ok(isInCategory(robin,'hero-families'));
  assert.ok(isInCategory(robin,'families'));
  assert.ok(!isInCategory(robin,'family-asmodeus'));
});

test('stage costumes exist, use performance or formal outfits, and include all five idols',()=>{
  const portraits=JSON.parse(readFileSync(new URL('../src/data/portraits.json',import.meta.url),'utf8'));
  for(const feature of stageFeatures)for(const id of feature.cast){
    assert.ok(Object.hasOwn(feature.variants,id),`${feature.heading[0]} / ${id}`);
    assert.ok(portraits[id].some(p=>p.key===feature.variants[id]),`${id} / ${feature.variants[id]}`);
  }
  assert.equal(stageFeatures[0].cast.length,13);
  for(const id of stageFeatures[0].cast)assert.equal(stageFeatures[0].variants[id],'ch');
  assert.equal(stageFeatures[1].variants.iruma,'ch2');
  assert.equal(stageFeatures[1].variants.ameri,'ch');
  assert.deepEqual(new Set(stageFeatures[2].cast),new Set(['keroli','gyari','ameri','iruma','lied']));
  for(const id of stageFeatures[2].cast)assert.ok(isInCategory(characters.find(c=>c.id===id),'idol'));
  assert.equal(stageFeatures[2].variants.iruma,'ch3');
  assert.equal(stageFeatures[2].variants.ameri,'ch2');
  assert.equal(stageFeatures[2].variants.lied,'ch2');
});
