## Searching GitHub Commits  

Commits related to template fixes for the seven template languages.  


### Example Query  
`https://github.com/search?q=FreeMaker+template+fix&sort=updated&order=desc&type=commits`  


### Results  
Results are stored in subfolders named after each template language. The files within follow specific naming conventions:  

- `bit2-v-n.md`: Cases that can be handled by BIT2.  
- `bit2-p-n.md`: Cases that can be handled by BIT2 but may not match the intended result.  
- `code-bug-n.md`: Commits where code bugs caused templates to be unrunnable.  
- `code-refactor-n.md`: Commits involving code refactoring.