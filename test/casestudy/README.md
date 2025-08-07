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
