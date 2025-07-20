import * as BiEval from "../../src/bx/biEval";
import {promises as fs} from "fs";

import {bulkUpdate2, bulkUpdate4, bulkUpdate6, bulkUpdate8, bulkUpdate10, bulkUpdate12, bulkUpdate14, bulkUpdate16, bulkUpdate18} from "./Django/bulkUpdates.generated";

let DjangoBit2File = "./test/performance/Django/login.bit2";
const outputFile = "./test/performance/Django/timings.txt";

fs.readFile(DjangoBit2File, 'utf8')
  .then(async data =>{
     let outputLines: string[] = [];
     outputLines.push('Forward Evaluation Timings:');
     console.log("===Forward Evaluation===");
     let line = ""
     for (let i = 0; i < 30; i++) {
        let start = process.hrtime();
        BiEval.forward(data);
        let end = process.hrtime(start);
        const durationMs = end[0] * 1e3 + end[1] / 1e6;
        line += `${durationMs.toFixed(3)}  `;
        console.log(`Bwd: ${end[0]} 秒, ${end[1] / 1000000} 毫秒`);
      }
    outputLines.push(line);
    
    let bulkUpdateList = [
      bulkUpdate2,
      bulkUpdate4,
      bulkUpdate6,
      bulkUpdate8,
      bulkUpdate10,
      bulkUpdate12,
      bulkUpdate14,
      bulkUpdate16,
      bulkUpdate18];
    console.log("=== Backward Evaluation===");
    outputLines.push('Backward Evaluation Timings:');
    let count = 2;
    for (const bulkUpdate of bulkUpdateList) {
      //@ts-ignore
      console.log(`=== defined op: ${count}, single ops: ${bulkUpdate.operations.length} ===`);
      let backwardLine = "";
      for (let i = 0; i < 30; i++) {
        let start = process.hrtime();
        BiEval.backward(data, bulkUpdate);
        let end = process.hrtime(start);
        const durationMs = end[0] * 1e3 + end[1] / 1e6;
        backwardLine += `${durationMs.toFixed(3)}  `;
        console.log(`Bwd: ${end[0]} 秒, ${end[1] / 1000000} 毫秒`);
      }
      outputLines.push(backwardLine);
      count += 2;
    }

    await fs.writeFile(outputFile, outputLines.join("\n"), "utf8");
    console.log(`所有运行结果已写入 ${outputFile}`);
  }).catch(err =>{
    console.error('Error reading file:', err);
  });