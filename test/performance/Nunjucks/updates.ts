import { UpdateOperation } from "../../../src/fuse/Update";

let updates: UpdateOperation[] = [
  // Text
  // Insertions
  {type:"insert", str:" source", position:394} as UpdateOperation,
  {type:"insert", str:" the", position:5939} as UpdateOperation,
  {type:"insert", str:"\n    margin: auto;", position:24328} as UpdateOperation,

  // Deletions
  {type:"delete", str:"---\npermalink: /styleguide/index.html\nlayout: base\neleventyExcludeFromCollections: true\n---", position:9} as UpdateOperation,
  {type:"delete", str:"| ", position:7538} as UpdateOperation,
  {type:"delete", str:"-line", position:14237} as UpdateOperation,

  // Replacements
  {type:"bulk", operations:[
    {type:"replace", str1:"h1", str2:"h2", position:320} as UpdateOperation,
    {type:"replace", str1:"h1", str2:"h2", position:365} as UpdateOperation
  ]} as UpdateOperation,

  {type:"bulk", operations:[
    {type:"replace", str1:"ul", str2:"ui", position:8373} as UpdateOperation,
    {type:"replace", str1:"ul", str2:"ui", position:9833} as UpdateOperation
  ]},

  {type:"replace", str1:"Spacing", str2:"Handle Space", position:14244} as UpdateOperation,

  // Exp
  // Insertions
  {type:"insert", str:"and ", position:1687} as UpdateOperation,
  {type:"bulk", operations:[
    {type:"insert", str:"-for", position:7667},
    {type:"insert", str:"-for", position:7736}
  ]} as UpdateOperation,
  {type:"insert", str:"the ", position:8641} as UpdateOperation,

  // Deletions
  {type:"bulk", operations:[
    {type:"delete", str:" ", position:1994} as UpdateOperation,
    {type:"delete", str:" ", position:2066} as UpdateOperation,
    {type:"delete", str:" ", position:2108} as UpdateOperation,
  ]} as UpdateOperation,
  {type:"delete", str:"in", position:5888} as UpdateOperation,
  {type:"delete", str:"minimum", position:10030} as UpdateOperation,

  // Replacements
  {type:"replace", str1:"Style Guide", str2:"The Style Guide", position:352} as UpdateOperation,

  {type:"bulk", operations:[
    {type:"replace", str1:"tertiary", str2:"third", position:7375} as UpdateOperation,
    {type:"replace", str1:"tertiary", str2:"third", position:7434} as UpdateOperation
  ]} as UpdateOperation,
 
  {type:"bulk", operations:[
    {type:"replace", str1:"--gradient-stripes", str2:"--gradient-bands", position:8085} as UpdateOperation,
    {type:"replace", str1:"--gradient-stripes", str2:"--gradient-bands", position:8148} as UpdateOperation
  ]} as UpdateOperation
  
];

export default updates;