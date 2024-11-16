import { UpdateOperation } from "../../src/fuse/Update";
import * as BiEval from "../../src/bx/biEval";
import {promises as fs} from "fs";

// Benchmarks
let acceleo = './test/performance/Acceleo/generate.bit2'
let django = './test/performance/Django/login.bit2';
let freemaker = './test/performance/Freemaker/medicalhistoryManage.bit2';
let mustache = './test/performance/Mustache/readme.bit2';
let nunjuncks = './test/performance/Nunjuncks/code.bit2';
let velocity = './test/performance/Velocity/customerList.bit2';
let xtend = './test/performance/Xtend/Xtend.bit2';

let acceleo_single_constant = {
  type:"bulk",
  operations:[{type:'insert', str:"import java.util.*;\n", position: 2}]
} as UpdateOperation;
let acceleo_single_declaration = {
  type:"bulk",
  operations:[{type:'replace', str1:"ArrayList", str2:"Vector", position: 19}]
} as UpdateOperation;
let acceleo_bulk_constant_3_ops = {
    type:'bulk',
    operations:[
      {type:'insert', str:"import java.util.*;\n", position: 2},
      {type:'insert', str:"import java.util.HashMap;\n", position: 22},
      {type:'replace', str1:"public", str2:"private", position:77},
      // {type:'delete', str:"public", position: 102},
      // {type:"insert", str:"\n// Other operations can be added later.", position:641}
    ]
  } as UpdateOperation;
let acceleo_bulk_constant_6_ops = {
    type:'bulk',
    operations:[
      {type:'insert', str:"import java.util.*;\n", position: 2},
      {type:'insert', str:"\nimport java.util.HashMap;\n", position: 49},
      {type:'replace', str1:"public", str2:"private", position: 78},
      {type:'delete', str:"public", position: 103},
      {type:'delete', str:" ", position: 103},
      {type:"insert", str:"\n// Other operations can be added later.\n", position:605},
    ]
  } as UpdateOperation;
let acceleo_bulk_decl_3_ops = {
    type:'bulk',
    operations:[
      {type:'insert', str:"import java.util.*;\n", position: 2},
      {type:'replace', str1:"ArrayList", str2:"HashMap", position: 39},
      {type:'replace', str1:"public", str2:"private", position: 49},
    ]
  } as UpdateOperation;
let acceleo_bulk_decl_6_ops = {
    type:'bulk',
    operations:[
      {type:'insert', str:"import java.util.*;\n", position: 2},
      {type:'replace', str1:"ArrayList", str2:"HashMap", position: 39},
      {type:'replace', str1:"public", str2:"private", position: 49},
      {type:'replace', str1:"public", str2:"private", position: 74},
      {type:'insert', str:"\n  // attribute and getter", position: 200},
      {type:"insert", str:"  private int age;\n", position:639},
    ]
  } as UpdateOperation;
let acceleo_bulk_for_item_3_ops = {
    type:'bulk',
    operations:[
      {type:'insert', str:" ", position: 81},
      {type:'insert', str:" ", position: 93},
      {type:"insert", str:"  private int age;\n", position:595},
    ]
  } as UpdateOperation;
let acceleo_bulk_for_item_6_replaces = {
    type:'bulk',
    operations:[
      {type:'replace', str1:"geneder", str2:"gender", position: 99},
      {type:'replace', str1:"geneder", str2:"gender", position: 159},
      {type:'replace', str1:"geneder", str2:"gender", position: 166},
      {type:'replace', str1:"geneder", str2:"gender", position: 373},
      {type:'replace', str1:"getgeneder", str2:"getgender", position: 397},
      {type:'replace', str1:"geneder", str2:"gender", position: 427},
    ]
  } as UpdateOperation;
let acceleo_bulk_for_item_6_ops = {
    type:'bulk',
    operations:[
      {type:'insert', str:" ", position: 81},
      {type:'insert', str:" ", position: 93},
      {type:'delete', str:"final", position:188},
      {type:'delete', str:"final", position:269},
      {type:'delete', str:"final", position:347},
      {type:"insert", str:"  private int age;\n", position:580},
    ]
  } as UpdateOperation;

// Django
let django_single_constant = {
    type:"bulk",
    operations:[{type:'replace', str1:"Continue", str2:"Proceed", position: 4084}]
  } as UpdateOperation;
let django_single_declaration = {
    type:"bulk",
    operations:[{type:'replace', str1:"vsts", str2:"vst", position: 2685}]
  } as UpdateOperation;  
let django_bulk_constant_3_ops = {
    type:'bulk',
    operations:[
      {type:'delete', str:" to continue", position: 195},
      {type:'replace', str1:"-", str2:" ", position:404},
      {type:'replace', str1:"Continue", str2:"Proceed", position: 4072}
    ]
  } as UpdateOperation;

let django_bulk_constant_6_ops = {
    type:'bulk',
    operations:[
      {type:'delete', str:" to continue", position: 195},
      {type:'replace', str1:"-", str2:" ", position:404},
      {type:'insert', str:"'s account", position: 2388},
      {type:'insert', str:"'s account", position: 2688},
      {type:'insert', str:"'s account", position: 2988},
      {type:'replace', str1:"Continue", str2:"Proceed", position: 4102},
    ]
  } as UpdateOperation;

let django_bulk_constant_6_ops_2 = {
    type:'bulk',
    operations:[
      {type:'delete', str:" to continue", position: 195},
      {type:'replace', str1:"-", str2:" ", position:404},
      {type:'replace', str1:"Lost", str2:"Forget", position:2032},
      {type:'delete', str:" DevOps", position: 2963},
      {type:'insert', str:"  organization", position: 3714},
      {type:'replace', str1:"Continue", str2:"Proceed", position: 4080},
    ]
  } as UpdateOperation;
  

let django_bulk_decl_3_ops = {
    type:'bulk',
    operations:[
      {type:'insert', str:" based on new generation LLMs", position: 107},
      {type:'delete', str:" to continue", position: 195},
      {type:'replace', str1:"/account/recover/", str2:"/password/reset/", position:2042},
    ]
  } as UpdateOperation;
let django_bulk_decl_6_ops = {
    type:'bulk',
    operations:[
      // {type:'insert', str:" based on LLMs", position: 107},
      {type:'delete', str:" to continue", position: 195},
      {type:'replace', str1:"-", str2:" ", position:404},
      {type:'replace', str1:"账户", str2:"账号", position:1045},
      {type:'delete', str:"用户名或", position: 1207},
      {type:'replace', str1:"io", str2:"com", position:3851},
      {type:'replace', str1:"io", str2:"com", position:3923},
    ]
  } as UpdateOperation;

let django_bulk_for_items_3_ops = {
    type:'bulk',
    operations:[
      {type:'insert', str:" based on new generation LLMs", position: 107},
      {type:'insert', str:"\n<p>add some hints here</p>", position: 1379},
      {type:'insert', str:"\n<p>add some hints here</p>", position: 1879},
    ]
  } as UpdateOperation;
let django_bulk_for_items_6_ops = {
    type:'bulk',
    operations:[
      {type:'insert', str:" based on new generation LLMs", position: 107},
      {type:'replace', str1:"账户", str2:"账号", position:1086},
      {type:'insert', str:"\n<p>add some hints here</p>", position: 1379},
      {type:'replace', str1:"password", str2:"pswd", position:1729},
      {type:'insert', str:"\n<p>add some hints here</p>", position: 1875},
    ]
  } as UpdateOperation;

// FreeMaker
let freemaker_single_constant = {
  type:"bulk",
  operations:[{type:'replace', str1:"，", str2:": ", position: 3229}]
} as UpdateOperation;
let freemaker_single_declaration = {
  type:"bulk",
  operations:[{type:'replace', str1:"Dr.Josh", str2:"Doctor Josh", position: 1884}]
} as UpdateOperation;  


let freemaker_bulk_constant_3_ops_2 = {
  type:'bulk',
  operations:[
    {type:'delete', str:"<!-- 内容主体区域 -->", position: 356},
    {type:'replace', str1:"patientname", str2:"patient", position:616},
    {type:'replace', str1:"，", str2:": ", position: 3210}
  ]
} as UpdateOperation;


let freemaker_bulk_constant_3_ops = {
  type:'bulk',
  operations:[
    {type:'insert', str:"患者", position:158},
    {type:'delete', str:"<!-- 内容主体区域 -->", position: 358},
    {type:'replace', str1:"patientname", str2:"patient", position:618},
  ]
} as UpdateOperation;

let freemaker_bulk_constant_6_ops = {
  type:'bulk',
  operations:[
    {type:'insert', str:"患者", position:158},
    {type:'delete', str:"<!-- 内容主体区域 -->", position: 358},
    {type:'replace', str1:"patientname", str2:"patient", position:618},
    {type:'replace', str1:"序号", str2:"编号", position:1192},
    {type:'replace', str1:"确诊人", str2:"姓名", position:1324},
    {type:'replace', str1:"，", str2:": ", position: 3211}
  ]
} as UpdateOperation;

let freemaker_bulk_decl_3_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"Dr.Josh", str2:"Doctor Josh", position: 1884},
    {type:'replace', str1:"Dr.Mike", str2:"Doctor Mike", position: 2530},
    {type:'replace', str1:"，", str2:": ", position: 3237}
  ]
} as UpdateOperation;

let freemaker_bulk_decl_6_ops = {
  type:'bulk',
  operations:[
    {type:'insert', str:"<!-- list of details -->\n", position:1122},
    {type:'replace', str1:"cold", str2:"Cold", position: 1827},
    {type:'replace', str1:"Dr.Josh", str2:"Doctor Josh", position: 1909},
    {type:'replace', str1:"Flue", str2:"Flu", position: 2474},
    {type:'replace', str1:"Dr.Mike", str2:"Doctor Mike", position: 2554},
    {type:'replace', str1:"，", str2:": ", position: 3261}
  ]
} as UpdateOperation;

let freemaker_bulk_for_items_3_ops = {
  type:'bulk',
  operations:[
    {type:'insert', str:"\n<td>abstract</td>", position: 1699},
    {type:'insert', str:"\n<td>abstract</td>", position: 2345},
    {type:'replace', str1:"，", str2:": ", position: 3248}
  ]
} as UpdateOperation;
let freemaker_bulk_for_items_6_ops = {
  type:'bulk',
  operations:[
    {type:'insert', str:"\n<td>abstract</td>", position: 1699},
    {type:'replace', str1:"1123", str2:"1124", position: 2037},
    {type:'replace', str1:"1123", str2:"1124", position: 2180},
    {type:'insert', str:"\n<td>abstract</td>", position: 2345},
    {type:'replace', str1:"，", str2:": ", position: 3248}
  ]
} as UpdateOperation;

// Mustache
let mustache_single_constant = {
  type:"bulk",
  operations:[{type:'insert', str:"#", position: 3915}]
} as UpdateOperation;
let mustache_single_declaration = {
  type:"bulk",
  operations:[{type:'replace', str1:"support@opsgenie.com", str2:"help@opsgenie.com", position: 4031}]
} as UpdateOperation;  


let mustache_bulk_constant_3_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"This", str2:"The", position:48},
    {type:'insert', str:"\nFollowing is the API descriptions.", position:2050},
    {type:'insert', str:"#",  position: 3949}
  ]
} as UpdateOperation;
let mustache_bulk_constant_6_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"This", str2:"The", position:48},
    {type:'insert', str:".", position:393},
    {type:'delete', str:".", position:412},
    {type:'insert', str:" the", position:1881},
    {type:'insert', str:"\nFollowing is the API descriptions.", position:2054},
    {type:'insert', str:"#",  position: 3953}
  ]
} as UpdateOperation;


let mustache_bulk_decl_3_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"REST", str2:"Restful", position: 38},
    {type:'replace', str1:"Authorization", str2:"authorization", position: 1382},
    {type:'replace', str1:"Authorization", str2:"authorization", position: 3980},
  ]
} as UpdateOperation;


let mustache_bulk_decl_6_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"REST", str2:"Restful", position: 38},
    {type:'replace', str1:"0", str2:"5", position: 186},
    {type:'replace', str1:"1", str2:"0", position: 209},
    {type:'replace', str1:"Authorization", str2:"authorization", position: 1382},
    {type:'replace', str1:"Authorization", str2:"authorization", position: 3980},
    {type:'replace', str1:"support", str2:"help", position: 4034},
  ]
} as UpdateOperation;

let mustache_bulk_for_items_3_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"AccountApi", str2:"AccountAPI", position:2160},
    {type:'replace', str1:"AlertApi", str2:"AlertAPI", position:2321},
    {type:'replace', str1:"AlertApi", str2:"AlertAPI", position:2523},
  ]
} as UpdateOperation;

let mustache_bulk_for_items_6_ops = {
  type:'bulk',
  operations:[
    {type:'insert', str:"Name: ", position:2159},
    {type:'insert', str:"Name: ", position:2326},
    {type:'insert', str:"Name: ", position:2534},
    {type:'insert', str:"Name: ", position:2739},
    {type:'insert', str:"Name: ", position:2928},
    {type:'insert', str:"Name: ", position:3103},
  ]
} as UpdateOperation;

// Nunjuncks
let nunjuncks_single_constant = {
  type:"bulk",
  operations:[{type:'insert', str:"...", position: 3007}]
} as UpdateOperation;
let nunjuncks_single_declaration = {
  type:"bulk",
  operations:[{type:'replace', str1:"600", str2:"400", position: 2695}]
} as UpdateOperation;  

let nunjuncks_bulk_constant_3_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:'posts', str2:'post-list', position:18},
    {type:'insert', str:"/", position: 2994},
    {type:'insert', str:"...", position: 3012}
  ]
} as UpdateOperation;


let nunjuncks_bulk_constant_6_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:'posts', str2:'post-list', position:18},
    {type:'replace', str1:'post', str2:'post-item', position:119},
    {type:'insert', str:"-detail", position:1016},
    {type:'replace', str1:'post', str2:'post-item', position:1493},
    {type:'insert', str:"-detail", position:2443},
    {type:'insert', str:"...", position: 3035}
  ]
} as UpdateOperation;

let nunjuncks_bulk_decl_3_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"MWqRZzp", str2:"windows", position: 414},
    {type:'replace', str1:"KKQwydY", str2:"pokemon", position: 1776},
    {type:'replace', str1:"600", str2:"400", position: 2695},
  ]
} as UpdateOperation;

let nunjuncks_bulk_decl_6_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"MWqRZzp", str2:"windows", position: 414},
    {type:'replace', str1:"600", str2:"400", position: 1280},
    {type:'replace', str1:"KKQwydY", str2:"pokemon", position: 1776},
    {type:'replace', str1:"q", str2:"g", position: 2079},
    {type:'replace', str1:"q", str2:"g", position: 2190},
    {type:'replace', str1:"600", str2:"400", position: 2695},
  ]
} as UpdateOperation;


let nunjuncks_bulk_for_items_3_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"95", str2:"11", position: 437},
    {type:'replace', str1:"95", str2:"11", position: 737},
    {type:'replace', str1:"95", str2:"11", position: 1300},
  ]
} as UpdateOperation;

let nunjuncks_bulk_for_items_6_ops = {
  type:'bulk',
  operations:[
    {type:'replace', str1:"95", str2:"11", position: 437},
    {type:'replace', str1:"95", str2:"11", position: 737},
    {type:'replace', str1:"95", str2:"11", position: 1300},
    {type:'delete', str:" Sort", position: 1818},
    {type:'delete', str:" Sort", position: 2138},
    {type:'delete', str:" Sort", position: 2724},
  ]
} as UpdateOperation;

// Velocity 

// XTend

let fileName = nunjuncks;

fs.readFile(fileName, 'utf8')
  .then(data =>{
    //  console.log("===Forward Evaluation===");
    //  let start = process.hrtime();
    //  console.log(BiEval.forward(data));
    //  let end = process.hrtime(start);
    //  console.log(`Fwd: ${end[0]} 秒, ${end[1] / 1000000} 毫秒`);

    console.log("=== Backward Evaluation===");
    let start = process.hrtime();
    BiEval.backward(data, nunjuncks_bulk_decl_6_ops);
    let end = process.hrtime(start);
    BiEval.backward(data, nunjuncks_bulk_decl_6_ops).forEach(updatedCoreAST => {
      console.log(updatedCoreAST);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
    });
    console.log(`Bwd: ${end[0]} 秒, ${end[1] / 1000000} 毫秒`);
  }).catch(err =>{
    console.error('Error reading file:', err);
  });



