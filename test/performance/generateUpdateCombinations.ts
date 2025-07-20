// import fs from 'fs';
// import path from 'path';

// import updates from './Django/updates';
// import { UpdateOperation } from '../../src/fuse/Update';

// async function loadUpdates(filePath: string): Promise<UpdateOperation[]> {
//   const absolutePath = path.resolve(filePath);
//   const module = await import(absolutePath);
//   return module.default || module.updates || [];
// }

// // 单操作类型：非 bulk、非 id
// type SingleOp = Exclude<UpdateOperation, { type: 'bulk' | 'id' }>;

// function flattenBulkAdjustPositions(bulkOp: UpdateOperation): SingleOp[] {
//   if (bulkOp.type !== "bulk" || !bulkOp.operations) {
//     throw new Error("Input must be a bulk operation with 'operations' array.");
//   }

//   const ops = bulkOp.operations;
//   const result: SingleOp[] = [];

//   // offset 记录到当前操作为止，文本长度相对于原始文本的变化量
//   // 插入：文本变长，offset 减去插入长度（因为后面 position 是基于新增文本）
//   // 删除：文本变短，offset 加上删除长度
//   // 替换：根据替换前后字符串长度差调整
//   let offset = 0;

//   for (const op of ops) {
//     if (op.type === "bulk") continue; // 跳过 bulk

//     // 这里告诉 TS op 是非 bulk 类型
//      const nonBulkOp = op as SingleOp
//     // 计算当前操作在原始文本中的绝对位置
//     const absolutePos = nonBulkOp.position - offset;

//     // 创建新操作，复制内容，更新 position
//     const newOp = { ...nonBulkOp, position: absolutePos };

//     result.push(newOp);

//     // 更新 offset
//     if (nonBulkOp.type === "insert") {
//       offset -= - nonBulkOp.str.length;
//     } else if (nonBulkOp.type === "delete") {
//       offset += - nonBulkOp.str.length;
//     } else if (nonBulkOp.type === "replace") {
//       offset += -(nonBulkOp.str1.length - nonBulkOp.str2.length);
//     }
//   }

//   return result;
// }


// /**
//  * 扁平化一个 UpdateOperation，展开 bulk，忽略 id
//  */
// function flatten(op: UpdateOperation): SingleOp[] {
//   if (op.type === 'bulk') {
//     return flattenBulkAdjustPositions(op);
//   } else if (op.type === 'id') {
//     return [];
//   } else {
//     return [op];
//   }
// }

// /**
//  * 估算某个操作对文本长度的变动（不实际应用文本）
//  */
// function estimateDelta(op: SingleOp): number {
//   switch (op.type) {
//     case 'insert':
//       return op.str.length;
//     case 'delete':
//       return -op.str.length;
//     case 'replace':
//       return op.str2.length - op.str1.length;
//     default:
//       return 0;
//   }
// }

// /**
//  * 随机选取 N 个操作
//  */
// function getRandomSubset<T>(arr: T[], count: number): T[] {
//   const shuffled = [...arr].sort(() => Math.random() - 0.5);
//   return shuffled.slice(0, count);
// }

// /**
//  * 应用 selectedOps，仅调整 position，按顺序返回 adjusted ops（已排序）
//  */
// function generateAdjustedOperations(
//   selectedOps: UpdateOperation[]
// ): SingleOp[] {
//   let offset = 0;
//   const flattend: SingleOp[] = [];
//   const adjusted: SingleOp[] = [];

//   for (const op of selectedOps) {
//     const flatOps = flatten(op);
//     flattend.push(...flatOps);
//   }

//   flattend.sort((a, b) => a.position - b.position);

//   for (const rawOp of flattend) {
//       const adjustedOp = { ...rawOp, position: rawOp.position + offset };
//       const delta = estimateDelta(adjustedOp);
//       offset += delta;
//       adjusted.push(adjustedOp);
//   }

//   return adjusted;
// }


// function generateBulkUpdate(updates: UpdateOperation[], count: number): UpdateOperation {
//   const selected = getRandomSubset(updates, count);
//   const adjustedOps = generateAdjustedOperations(selected);
//   return {
//     type: 'bulk',
//     operations: adjustedOps,
//   };
// }

// async function main() {
//   const inputFile = './test/performance/Django/updates';
//   const outputFile = './test/performance/Django/bulkUpdates.generated.ts';

//   const updates = await loadUpdates(inputFile);

//   const counts = [2,4,6,8,10,12,14,16,18];
//   const bulks = counts.map(count => generateBulkUpdate(updates, count));

//   // 序列化bulk操作为字符串（JSON格式，格式化带缩进）
//   function serializeOp(op: UpdateOperation): string {
//     return JSON.stringify(op, null, 2);
//   }

//   // 生成TS文件内容，导出4个变量
//   const content = `// 该文件由脚本自动生成，请勿手动修改

// import { UpdateOperation } from '../../../src/fuse/Update';

// export const bulkUpdate2: UpdateOperation = ${serializeOp(bulks[0])};
// export const bulkUpdate4: UpdateOperation = ${serializeOp(bulks[1])};
// export const bulkUpdate6: UpdateOperation = ${serializeOp(bulks[2])};
// export const bulkUpdate8: UpdateOperation = ${serializeOp(bulks[3])};
// export const bulkUpdate10: UpdateOperation = ${serializeOp(bulks[4])};
// export const bulkUpdate12: UpdateOperation = ${serializeOp(bulks[5])};
// export const bulkUpdate14: UpdateOperation = ${serializeOp(bulks[6])};
// export const bulkUpdate16: UpdateOperation = ${serializeOp(bulks[7])};
// export const bulkUpdate18: UpdateOperation = ${serializeOp(bulks[8])};
// `;

//   fs.writeFileSync(outputFile, content, { encoding: 'utf-8' });
//   console.log(`生成成功，输出文件：${outputFile}`);
// }

// main().catch(console.error);

import fs from 'fs';
import path from 'path';

import updates from './Django/updates';
import { UpdateOperation } from '../../src/fuse/Update';

async function loadUpdates(filePath: string): Promise<UpdateOperation[]> {
  const absolutePath = path.resolve(filePath);
  const module = await import(absolutePath);
  return module.default || module.updates || [];
}

type SingleOp = Exclude<UpdateOperation, { type: 'bulk' | 'id' }>;

function flattenBulkAdjustPositions(bulkOp: UpdateOperation): SingleOp[] {
  if (bulkOp.type !== "bulk" || !bulkOp.operations) {
    throw new Error("Input must be a bulk operation with 'operations' array.");
  }

  const ops = bulkOp.operations;
  const result: SingleOp[] = [];
  let offset = 0;

  for (const op of ops) {
    if (op.type === "bulk") continue;
    const nonBulkOp = op as SingleOp;
    const absolutePos = nonBulkOp.position - offset;
    const newOp = { ...nonBulkOp, position: absolutePos };
    result.push(newOp);

    if (nonBulkOp.type === "insert") {
      offset -= -nonBulkOp.str.length;
    } else if (nonBulkOp.type === "delete") {
      offset += -nonBulkOp.str.length;
    } else if (nonBulkOp.type === "replace") {
      offset += -(nonBulkOp.str1.length - nonBulkOp.str2.length);
    }
  }

  return result;
}

function flatten(op: UpdateOperation): SingleOp[] {
  if (op.type === 'bulk') {
    return flattenBulkAdjustPositions(op);
  } else if (op.type === 'id') {
    return [];
  } else {
    return [op];
  }
}

function estimateDelta(op: SingleOp): number {
  switch (op.type) {
    case 'insert':
      return op.str.length;
    case 'delete':
      return -op.str.length;
    case 'replace':
      return op.str2.length - op.str1.length;
    default:
      return 0;
  }
}

function getRandomSubset<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateAdjustedOperations(selectedOps: UpdateOperation[]): SingleOp[] {
  let offset = 0;
  const flattend: SingleOp[] = [];
  const adjusted: SingleOp[] = [];

  for (const op of selectedOps) {
    const flatOps = flatten(op);
    flattend.push(...flatOps);
  }

  flattend.sort((a, b) => a.position - b.position);

  for (const rawOp of flattend) {
    const adjustedOp = { ...rawOp, position: rawOp.position + offset };
    const delta = estimateDelta(adjustedOp);
    offset += delta;
    adjusted.push(adjustedOp);
  }

  return adjusted;
}

function generateBulkUpdate(updates: UpdateOperation[], count: number): UpdateOperation {
  const selected = getRandomSubset(updates, count);
  const adjustedOps = generateAdjustedOperations(selected);
  return {
    type: 'bulk',
    operations: adjustedOps,
  };
}

async function main() {
  const inputFile = './test/performance/Django/updates';
  const outputFile = './test/performance/Django/bulkUpdates.generated.ts';

  const updates = await loadUpdates(inputFile);
  const counts = [2, 4, 6, 8, 10, 12, 14, 16, 18];
  const repeatPerCount = 30;

  const allBulks: { name: string, op: UpdateOperation }[] = [];

  for (const count of counts) {
    for (let i = 0; i < repeatPerCount; i++) {
      const bulk = generateBulkUpdate(updates, count);
      allBulks.push({
        name: `bulkUpdate${count}_v${i + 1}`,
        op: bulk
      });
    }
  }

  function serializeOp(op: UpdateOperation): string {
    return JSON.stringify(op, null, 2);
  }

  const header = `// 该文件由脚本自动生成，请勿手动修改

import { UpdateOperation } from '../../../src/fuse/Update';
`;

  const body = allBulks
    .map(({ name, op }) => `export const ${name}: UpdateOperation = ${serializeOp(op)};`)
    .join('\n\n');

  fs.writeFileSync(outputFile, header + '\n' + body, { encoding: 'utf-8' });
  console.log(`生成成功，共生成 ${allBulks.length} 个 bulk 操作，输出文件：${outputFile}`);
}

main().catch(console.error);
