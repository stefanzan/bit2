import * as BiEval from "../../src/bx/biEval";
import { promises as fs } from "fs";

// Acceleo
import * as updates from "./Acceleo/Acceleo1-updates";
const bit2File   = "./test/casestudy/Acceleo/Acceleo1.bit2";


fs.readFile(bit2File, "utf8")
  .then(async (data) => {
    console.log("=== Forward Evaluation ===");
    for (let i = 0; i < 30; i++) {
      let output = BiEval.forward(data);
      console.log(output);
    }
    console.log("=== Backward Evaluation ===");
    let ops = updates.default["A.del"];
    ops.forEach(function(op){
       //@ts-ignore
        let resultList = BiEval.backward(data, op);
        resultList.forEach(result => {
          console.log(result);
        })

    })
  })
  .catch((err) => {
    console.error("Error reading file:", err);
  });
