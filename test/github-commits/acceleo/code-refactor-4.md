bit2: x
url : https://github.com/eclipse-ocl/org.eclipse.ocl/commit/7f8349beb7d3e659a2c97c709587628de516b4e0
file: examples/org.eclipse.ocl.examples.build/src/org/eclipse/ocl/examples/build/acceleo/generatePivotVisitors.mtl
desc: change if condition expression, not direct manipuation of the output.
diff: 
- [if (visitorBaseClass.size() <= 0)]
+ [if (visitorBaseClass.size() = 0)]