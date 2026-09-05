import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
const require=createRequire(import.meta.url),ts=require('typescript');
async function load(name){const js=ts.transpileModule(readFileSync(new URL('../app/'+name+'.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}}).outputText;return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));}
const {parseImport,normalizeRecord,mergeRecords}=await load('health-data');
const {parseProfile}=await load('profile');
const row={metric:'Weight',value:80,unit:'kg',date:'2026-09-05',source:'Scale'};
const weight=normalizeRecord(row);assert.ok(Math.abs(weight.value-176.369809744)<1e-8);assert.equal(weight.unit,'lb');
assert.throws(()=>normalizeRecord({...row,value:''}));assert.throws(()=>normalizeRecord({...row,date:'last Tuesday'}));assert.throws(()=>normalizeRecord({...row,value:Infinity}));
const csv='metric,value,unit,date,source,system\r\n"Weight",80,kg,2026-09-05,"Lab, A",\r\n';assert.equal(parseImport(csv,'test.csv').records[0].source,'Lab, A');
assert.throws(()=>parseImport('metric,value,date\nWeight,no,2026-09-05','bad.csv'));
assert.equal(mergeRecords([weight],[weight]).length,1);assert.equal(mergeRecords([weight],[{...weight,source:'Other scale'}]).length,2);
assert.equal(normalizeRecord({type:'HKQuantityTypeIdentifierHeartRateVariabilitySDNN',value:34,unit:'ms',startDate:'2026-09-05 09:00:00 -0400',sourceName:'Watch'}).date,'2026-09-05T13:00:00.000Z');
assert.equal(normalizeRecord({type:'HKQuantityTypeIdentifierBodyFatPercentage',value:.15,unit:'%',startDate:'2026-09-05',sourceName:'Scale'}).value,15);
assert.throws(()=>parseProfile('{"geneKeys":{"Purpose":65}}'));assert.throws(()=>parseProfile('{"planets":[{"name":"Sun","longitude":360}]}'));assert.throws(()=>parseProfile('{"definedCenters":["hd-9"]}'));
assert.equal(parseProfile('{"geneKeys":{"Purpose":11},"planets":[{"name":"Sun","longitude":40.5}]}').geneKeys.Purpose,11);
console.log('Personal-data validation passed: units, dates, CSV quoting, rejected rows, deduplication, and chart profile bounds.');
