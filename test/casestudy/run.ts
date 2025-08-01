import * as BiEval from "../../src/bx/biEval";
import { promises as fs } from "fs";

// Freemarker
import * as updates from "./Freemaker/FreeMaker4-updates";
const bit2File   = "./test/casestudy/Freemaker/Freemaker4.bit2";


fs.readFile(bit2File, "utf8")
  .then(async (data) => {
    console.log("=== Forward Evaluation ===");
    let output = BiEval.forward(data);
    console.log(output);
    console.log("=== Backward Evaluation ===");
    let ops = updates.default["B.ins"];
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
