const { generateDtsBundle } = require('dts-bundle-generator');
const fs = require('fs');
const path = require('path');

const dtsContent = generateDtsBundle([
  {
    filePath: './src/bx/biEval.ts',
    output: {
      noBanner: true,
      inlineDeclareGlobal: false,
      inlineDeclareExternals: false,
      followSymlinks: true,
    }
  }
]);

fs.writeFileSync(path.resolve(__dirname, 'dist', 'bit2.d.ts'), dtsContent.join('\n'));
console.log('Declaration file generated at dist/bit2.d.ts');
