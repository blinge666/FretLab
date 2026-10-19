import test from 'node:test';
import assert from 'node:assert/strict';
import {diagnose,steps} from '../src/data.mjs';
test('worsening symptoms stop adjustments regardless of symptom',()=>{for(const s of ['Skurring','Ustabil stemming','Sure akkorder']) assert.match(diagnose(s,'Verre'),/Stopp justeringene/)});
test('tuning and intonation symptoms get different checks',()=>{assert.match(diagnose('Ustabil stemming'),/binder i oversadelen/);assert.match(diagnose('Sure akkorder'),/fingertrykk/)});
test('improvement does not claim a confirmed cause',()=>assert.match(diagnose('Skurring','Bedre'),/bekrefter ikke årsaken/));
test('setup is a complete observation workflow without unverified numerical advice',()=>{assert.equal(steps.length,7);for(const s of steps){assert.equal(s.risk,'Grønn');assert.ok(s.method&&s.point&&s.verify)}});
