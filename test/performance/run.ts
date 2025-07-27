import * as BiEval from "../../src/bx/biEval";
import { promises as fs } from "fs";
import { UpdateOperation } from '../../src/fuse/Update';

// Django
// import * as AllBulkUpdates from "./Django/bulkUpdates.generated";
// const bit2File   = "./test/performance/Django/login.bit2";
// const outputFile = "./test/performance/Django/timings.txt";

// FreeMarker
// import * as AllBulkUpdates from "./FreeMarker/bulkUpdates.generated";
// const bit2File   = "./test/performance/Freemarker/main-v2.bit2";
// const outputFile = "./test/performance/Freemarker/timings.txt";

// Mustache
// import * as AllBulkUpdates from "./Mustache/bulkUpdates.generated";
// const bit2File   = "./test/performance/Mustache/readme.bit2";
// const outputFile = "./test/performance/Mustache/timings.txt";

// Nunjucks
import * as AllBulkUpdates from "./Nunjucks/bulkUpdates.generated";
const bit2File   = "./test/performance/Nunjucks/styleguide.bit2";
const outputFile = "./test/performance/Nunjucks/timings.txt";
// const outputFile = "./test/performance/Nunjucks/timingsAndCount.txt";


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

fs.readFile(bit2File, "utf8")
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
      let countLine = "";
      for (let j = 0; j < group.length; j++) {
        const bulkUpdate = group[j];
        const start = process.hrtime();
        let resultList = BiEval.backward(data, bulkUpdate);
        const end = process.hrtime(start);
        const durationMs = end[0] * 1e3 + end[1] / 1e6;
        backwardLine += `${durationMs.toFixed(3)}  `;
        countLine += `${resultList.length}  `;
        //@ts-ignore
        console.log(`Bwd count=${count}, Real count=${bulkUpdate.operations.length}, version=${j + 1}: ${durationMs.toFixed(3)} ms`);
      }
        outputLines.push(`bulkUpdate${count}: ${backwardLine}`);
        outputLines.push(`bulkUpdate${count}: ${countLine}`);

    }

    await fs.writeFile(outputFile, outputLines.join("\n"), "utf8");
    console.log(`所有运行结果已写入 ${outputFile}`);
  })
  .catch((err) => {
    console.error("Error reading file:", err);
  });
