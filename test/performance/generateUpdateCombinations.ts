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
  // Django
  // const inputFile = './test/performance/Django/updates';
  // const outputFile = './test/performance/Django/bulkUpdates.generated.ts';

  // FreeMarker
  const inputFile = './test/performance/FreeMarker/updates';
  const outputFile = './test/performance/FreeMarker/bulkUpdates.generated.ts';

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
