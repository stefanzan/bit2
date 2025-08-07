## Evaluation on Real-World Templates

Commits related to template fixes for the seven template languages.  
`https://github.com/search?q=FreeMaker+template+fix&sort=updated&order=desc&type=commits`  


The `github-commits` directory contains real-world template update examples, organized by template language:

* Acceleo
* Django
* Freemarker
* Mustache
* Nunjucks
* Velocity
* Xtend

Each subfolder includes a series of `.md` files that document specific commit changes. File names generally follow four naming patterns:

* **`bit2-v-n.md`**
  Represents an update that BIT2 can handle *precisely* (v = valid).

* **`bit2-p-n.md`**
  Represents an update that BIT2 can handle *partially or imprecisely* (p = partial).

* **`code-bug-n.md`**
  Describes a commit that fixes a *functional bug* — typically cases where the original code was broken or not executable.

* **`code-refactor-n.md`**
  Represents a *code refactoring* commit, where the structure or style is changed without altering functionality.


Each `.md` file contains the following fields:

* **`bit2`**: Indicates whether the update can be handled by BIT2 (e.g., `exact`, `partial`, or `unsupported`).
* **`url`**: The URL of the corresponding GitHub commit.
* **`desc`**: A brief description of the purpose or intent of the commit.
* **`diff`**: The exact code difference introduced by the commit.
