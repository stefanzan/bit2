## Guideline for BIT2

### 1. Project Structure

#### `src` Directory

* **`bx`**
  Core bidirectional transformation functions: `forward` and `backward`.

* **`common`**
  Shared modules including `Exp` (used in both surface and core languages) and their (pretty)printers.

* **`core`**
  Definitions and printers for the core language.

* **`fuse`**

  * `Fuse.ts`: Implements the fusion algorithm.
  * `Update.ts`: Defines update operations.
  * `Print.ts`: Provides printing utilities.

* **`lambda`**
  Defines the lambda-transformed core language.

* **`lambdalize`**
  Contains:

  * `lambdalize`: Transforms variable declarations/assignments into marked lambda applications.
  * `unLambdalize`: Reverts the transformation.

* **`partial`**
  Structures the computation-based output.

* **`partialEval`**
  Evaluation from core to partial output and unevaluation back.

* **`scope`**
  Scope analysis for declared variables.

* **`surface`**
  Definition and parser for the surface language.

* **`translate`**
  Translates surface language into core language.

* **`utils`**
  Utility functions.

#### `test` Directory

* **`bx`**: Tests for the `bx` module
* **`casestudy`**: Real-world case study examples
* **`core`**: Tests for core language
* **`examples`**: Small example programs
* **`fuse`**: Tests for fusion logic
* **`github-commits`**: Small template edits sourced from real commit histories
* **`lambda`**: Tests for lambda-based core
* **`lambdalize`**: Tests for lambdalization logic
* **`paper-examples`**: Examples used in the paper
* **`partial`**: Tests for partial output logic
* **`partialEval`**: Tests for evaluation and unevaluation
* **`performance`**: Performance benchmarking
* **`scopelize`**: Scope analysis tests
* **`surface`**: Tests for surface language
* **`templates`**: `.bit2` formatted examples
* **`translate`**: Translation module tests

---

### 2. How to run

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Available commands (defined in `package.json`)**:

   * `npm run build`: Compile TypeScript to JavaScript.
   * `npm run build:webpack`: Bundle project as a single `bit2.js` module.
   * `npm run core`: Run tests in `dist/test/core/core.test.js` (requires prior build).

3. **Using BIT2 in your own project**
   Since BIT2 is published as an npm module, you can import and use it as follows:

   ```ts
   import * as BiEval from "bit2";

   const output = BiEval.forward(template);
   const resultList = BiEval.backward(template, updateOp);
   ```

   Type signatures:

   ```ts
   export declare function forward(str: string): string;
   export declare function backward(str: string, operation: UpdateOperation): string[];
   ```

   `UpdateOperation` is defined as:

   ```ts
   export type UpdateOperation =
     | { type: "insert"; str: string; position: number }
     | { type: "delete"; str: string; position: number }
     | { type: "replace"; str1: string; str2: string; position: number }
     | { type: "bulk"; operations: UpdateOperation[] }
     | { type: "id" };
   ```

---

### 3. Case Study: Benchmark Examples

#### Folder Structure

The `casestudy` directory contains real-world examples organized by template language:

* Acceleo
* Django
* Freemarker
* Mustache
* Nunjucks
* Velocity
* Xtend

#### File Types

Each subfolder includes:

* `.bit2`: BIT2 implementation of the template
* `.md`: Human-readable update specification
* `.ts`: Executable TypeScript version of the updates

#### Update Types (`.md` files)

Updates fall into two categories:

1. **Constant Text Updates**
   Modifications to static content of the template

2. **Variable Expression Updates**
   Changes to variable declarations or expressions

Each supports:

* Insert
* Delete
* Replace

#### Example: `Acceleo1-updates.md`

```markdown
A. Constant Text Updates

A.ins: Add space after comma

Change public Person(String name,String tel) {} → public Person(String name, String tel) {}  
insert " " at 52

A.del: Remove final keyword

delete "final" at 119  
delete "final" at 200

A.rep: Change access modifier

Replace public → private at class declaration:  
replace "public" with "private" at 2

B. Variable Expression Updates

B.ins: (Not applicable)

B.del: Remove "son" property

delete "son" at 18  
delete "son" at 30

B.rep: Rename "tel" to "phone"

replace "tel" with "phone" at 59  
replace "tel" with "phone" at 103  
replace "tel" with "phone" at 109  
replace "tel" with "phone" at 232  
replace "tel" with "phone" at 258  
replace "tel" with "phone" at 284
```

#### How to Run Case Studies

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Run the case study**

   ```bash
   npm run runCaseStudy
   ```

3. **Results**
   Console output shows results from both forward and backward evaluation.

#### Configuration Example

By default, `run.ts` runs updates for Acceleo:

```ts
import * as updates from "./Acceleo/Acceleo1-updates";
const bit2File = "./test/casestudy/Acceleo/Acceleo1.bit2";
....
let ops = updates.default["A.del"];
```

To test other templates or operations, modify the import and `ops` selection accordingly.


---

### 5. Performance Evaluation

The `performance` directory contains benchmark data used to evaluate the runtime performance of **backward update propagation** in BIT2. The evaluation includes four template programs, each derived from a real-world open-source project and written in a different template language:

* **`login.bit2`** (in the `Django` folder):
  Derived from the login page of the open-source bug-tracking system **Sentry**, implemented in Django. Sentry is an actively maintained project with over 41.5k stars and 4.4k forks.

* **`readme.bit2`** (in the `Mustache` folder):
  Adapted from the `README.mustache` template used in **opsgenie-python-sdk**, a project by **Atlassian**, to generate project documentation.

* **`main-v2.bit2`** (in the `Freemarker` folder):
  Based on the `main-v2.html` template from the **SpringBootCodeGenerator** project, which uses FreeMarker for web code generation.

* **`styleguide.bit2`** (in the `Nunjucks` folder):
  Extracted from the `styleguide.njk` template of the **eleventy-excellent** project, a static site generator using Nunjucks, with over 500 GitHub stars.


#### Evaluation Methodology

To assess BIT2’s scalability and performance under different update scenarios, we followed these steps:

1. **Update Design**
   For each template, 18 update operations were manually created and stored in the `updates.ts` file within each corresponding language folder.

2. **Update Sequence Generation**
   To analyze the impact of update quantity, we generated sequences ranging from 2 to 18 updates:

   * For each number `n` (from 2 to 18), 30 update sequences were randomly sampled from the 18 available updates.
   * These combinations were generated by running `generateUpdateCombination.ts` by `ts-node test/performance/generateUpdateCombination.ts`, which outputs to `bulkUpdates.generated.ts`.
   * You can control which template to generate combinations for by commenting/uncommenting lines in `generateUpdateCombination.ts`:

   ```ts
   // Django
   // const inputFile  = './test/performance/Django/updates';
   // const outputFile = './test/performance/Django/bulkUpdates.generated.ts';

   // FreeMarker
   // const inputFile  = './test/performance/FreeMarker/updates';
   // const outputFile = './test/performance/FreeMarker/bulkUpdates.generated.ts';

   // Mustache
   // const inputFile  = './test/performance/Mustache/updates.ts';
   // const outputFile = './test/performance/Mustache/bulkUpdates.generated.ts';

   // Nunjucks
   const inputFile  = './test/performance/Nunjucks/updates.ts';
   const outputFile = './test/performance/Nunjucks/bulkUpdates.generated.ts';
   ```

3. **Benchmark Execution**
   Run the following command to execute the benchmark:

   ```bash
   npm run runPerformance2
   ```
   or 
   ```bash 
   ts-node test/performance/run.ts
   ```

   This triggers `run.ts`, which applies the generated update sequences and records the runtime. Results are saved in the `timings.txt` file under each language's folder.

   To switch between template programs, modify `run.ts` by commenting/uncommenting relevant sections:

   ```ts
   // Django
   // import * as AllBulkUpdates from "./Django/bulkUpdates.generated";
   // const bit2File   = "./test/performance/Django/login.bit2";
   // const outputFile = "./test/performance/Django/timings.txt";

   // FreeMarker
   // import * as AllBulkUpdates from "./Freemarker/bulkUpdates.generated";
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
   ```

#### Sample Results: `login.bit2` (Django)

Below is an excerpt from `timings.txt`, showing execution times in milliseconds:

```txt
Forward Evaluation Timings:
14.768  3.692  3.598  4.095  4.070  2.985  2.576  3.914  2.496  2.540 ...

Backward Evaluation Timings:
bulkUpdate2:   61.137  51.827  249.455  88.657 ...
bulkUpdate4:   236.291  330.758  34.311  710.879 ...
bulkUpdate6:   262.263  77.124  86.639  313.810 ...
bulkUpdate8:   1029.030  1007.300  6815.240 ...
bulkUpdate10:  2625.236  713.316  1024.636 ...
bulkUpdate12:  276.664  2733.251  2143.840 ...
bulkUpdate14:  2733.923  345.919  2335.603 ...
bulkUpdate16:  8263.789  1039.431  5550.986 ...
bulkUpdate18:  5458.605  5476.804  5514.526 ...
```

