// import * as BiEval from "../../src/bx/biEval";
// import {promises as fs} from "fs";

// import {bulkUpdate2, bulkUpdate4, bulkUpdate6, bulkUpdate8, bulkUpdate10, bulkUpdate12, bulkUpdate14, bulkUpdate16, bulkUpdate18} from "./Django/bulkUpdates.generated";

// let DjangoBit2File = "./test/performance/Django/login.bit2";
// const outputFile = "./test/performance/Django/timings.txt";

// fs.readFile(DjangoBit2File, 'utf8')
//   .then(async data =>{
//      let outputLines: string[] = [];
//      outputLines.push('Forward Evaluation Timings:');
//      console.log("===Forward Evaluation===");
//      let line = ""
//      for (let i = 0; i < 30; i++) {
//         let start = process.hrtime();
//         BiEval.forward(data);
//         let end = process.hrtime(start);
//         const durationMs = end[0] * 1e3 + end[1] / 1e6;
//         line += `${durationMs.toFixed(3)}  `;
//         console.log(`Bwd: ${end[0]} 秒, ${end[1] / 1000000} 毫秒`);
//       }
//     outputLines.push(line);
    
//     let bulkUpdateList = [
//       bulkUpdate2,
//       bulkUpdate4,
//       bulkUpdate6,
//       bulkUpdate8,
//       bulkUpdate10,
//       bulkUpdate12,
//       bulkUpdate14,
//       bulkUpdate16,
//       bulkUpdate18];
//     console.log("=== Backward Evaluation===");
//     outputLines.push('Backward Evaluation Timings:');
//     let count = 2;
//     for (const bulkUpdate of bulkUpdateList) {
//       //@ts-ignore
//       console.log(`=== defined op: ${count}, single ops: ${bulkUpdate.operations.length} ===`);
//       let backwardLine = "";
//       for (let i = 0; i < 30; i++) {
//         let start = process.hrtime();
//         BiEval.backward(data, bulkUpdate);
//         let end = process.hrtime(start);
//         const durationMs = end[0] * 1e3 + end[1] / 1e6;
//         backwardLine += `${durationMs.toFixed(3)}  `;
//         console.log(`Bwd: ${end[0]} 秒, ${end[1] / 1000000} 毫秒`);
//       }
//       outputLines.push(backwardLine);
//       count += 2;
//     }

//     await fs.writeFile(outputFile, outputLines.join("\n"), "utf8");
//     console.log(`所有运行结果已写入 ${outputFile}`);
//   }).catch(err =>{
//     console.error('Error reading file:', err);
//   });

import * as BiEval from "../../src/bx/biEval";
import { promises as fs } from "fs";
import { UpdateOperation } from '../../src/fuse/Update';

// 导入所有生成的 bulkUpdate2_v1 ~ bulkUpdate18_v30
import * as AllBulkUpdates from "./Django/bulkUpdates.generated";

const DjangoBit2File = "./test/performance/Django/login.bit2";
const outputFile = "./test/performance/Django/timings.txt";

const counts = [2, 4, 6, 8, 10, 12, 14, 16, 18];
const repeatPerCount = 30;

function getBulkUpdateGroups() {
  const groups: UpdateOperation[][] = [];

  for (const count of counts) {
    const group: UpdateOperation[] = [];
    for (let i = 1; i <= repeatPerCount; i++) {
      const name = `bulkUpdate${count}_v${i}`;
      const op = (AllBulkUpdates as any)[name];
      if (!op) {
        throw new Error(`找不到 ${name}，请确认 bulkUpdates.generated.ts 正确生成`);
      }
      group.push(op);
    }
    groups.push(group);
  }

  return groups;
}

fs.readFile(DjangoBit2File, "utf8")
  .then(async (data) => {
    let outputLines: string[] = [];

    outputLines.push("Forward Evaluation Timings:");
    console.log("=== Forward Evaluation ===");
    let forwardLine = "";
    for (let i = 0; i < 30; i++) {
      const start = process.hrtime();
      BiEval.forward(data);
      const end = process.hrtime(start);
      const durationMs = end[0] * 1e3 + end[1] / 1e6;
      forwardLine += `${durationMs.toFixed(3)}  `;
      console.log(`Fwd ${i + 1}: ${durationMs.toFixed(3)} ms`);
    }
    outputLines.push(forwardLine);

    console.log("=== Backward Evaluation ===");
    outputLines.push("Backward Evaluation Timings:");

    const bulkUpdateGroups = getBulkUpdateGroups();
    for (let groupIndex = 0; groupIndex < counts.length; groupIndex++) {
      const count = counts[groupIndex];
      const group = bulkUpdateGroups[groupIndex];

      console.log(`== 操作数: ${count} ==`);

      let backwardLine = "";
      for (let j = 0; j < group.length; j++) {
        const bulkUpdate = group[j];
        const start = process.hrtime();
        BiEval.backward(data, bulkUpdate);
        const end = process.hrtime(start);
        const durationMs = end[0] * 1e3 + end[1] / 1e6;
        backwardLine += `${durationMs.toFixed(3)}  `;
        //@ts-ignore
        console.log(`Bwd count=${count}, Real count=${bulkUpdate.operations.length}, version=${j + 1}: ${durationMs.toFixed(3)} ms`);
      }
        outputLines.push(`bulkUpdate${count}: ${backwardLine}`);
    }

    await fs.writeFile(outputFile, outputLines.join("\n"), "utf8");
    console.log(`所有运行结果已写入 ${outputFile}`);
  })
  .catch((err) => {
    console.error("Error reading file:", err);
  });
