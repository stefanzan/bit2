bit2: x
url : https://github.com/gemoc/exploration/commit/392692405a3397e64650d1b83bc26e54a0a683c5#diff-eac908f3aa0106e0a3504d508afcb32034f2cd39231556e7f12c8f91379d37be
file: exploration/plugins/org.gemoc.mocc.transformations.ecl2mtl/src/org/gemoc/mocc/transformations/ecl2mtl/main/generate.mtl
desc: change if condition expression, not direct manipuation of the output.
diff: 
- [ '[' /]if ( [anECLDocument.getClockIterator(cDecl, internalClockName)/]->size()>1) [ ']' /]
+ [ '[' /]if ( [anECLDocument.getClockIterator(cDecl, internalClockName)/]) [ ']' /]