# EGL Benchmark
The EGL benchmark consists of the M2T examples in [Epsilon playground](https://eclipse.dev/epsilon/playground). The benchmark contains 12 EGL programs. We list all the templates in BIT (some templates are partially implemented and some cannot be bidirectionalized). We list the EGL programs as follows.

##  Generate Effort Graph	

Generate Effort Graph consists of 32 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenEffortGraph.bit` (37 lines of BIT code).

```EGL
[*Generates a Graphviz graph for the project plan*]
digraph G {
	
	node[fontname="Arial",style="filled",fillcolor="azure"]
	edge[fontname="Arial"]

	[*Create a node for each person*]
	[%for (p in Person.all){%]
	[%=p.getNodeId()%][label="[%=p.name%]"]
	[%}%]

	[*Create a node for each task*]
	[%for (t in Task.all){%]

	[%=t.getNodeId()%][label="[%=t.title%]", fillcolor="wheat"]

	[*Link the person nodes with the task nodes*]
	[%for (e in t.effort){%]
	[%=e.person.getNodeId()%]->[%=t.getNodeId()%][label="[%=e.percentage%]%"]
	[%}%]

	[%}%]
}

[*Uncomment to see the generated Graphviz code*]
[*%out.toString().println();%*]

[%
operation Any getNodeId() {
	return "n" + M.allInstances.indexOf(self);
}
%]
```

##  Generate Effort Table	

Generate Effort Table consists of 27 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenEffortTable.bit` (39 lines of BIT code).

```EGL
<html>
<head>
[*Bootstrap CSS*]
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
</head>

<table class="table table-striped">
[*Generate a header row with the names of all persons*]
<tr>
	<th></th>
	[%for (p in Person.all){%]
	<th>[%=p.name%]</th>
	[%}%]
</tr>
[*Generate one row per task with the participants' effort*]
[%for (t in Task.all){%]
<tr>
	<th>[%=t.title%]</th>
	[%for (p in Person.all){%]
	<td>[%=t.effort.selectOne(e|e.person = p)?.percentage ?: 0%]%</td>
	[%}%]
</tr>
[%}%]
</table>

[*Uncomment to see the generated HTML code*]
[*%out.toString().println();%*]
```

##  Generate Task Pie Chart

Generate Task Pie Chart consists of 31 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenPieChart.bit` (43 lines of BIT code).

```EGL
<html>
	<head>
		<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
		<script type="text/javascript">
			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {
				[*Generate a pie chart for the project*]
				var data = google.visualization.arrayToDataTable([
					['Task', 'Months'],
					[*Generate one slice for every task*]
					[%for (t in Task.all){%]
					['[%=t.title%]', [%=t.duration%]],
					[%}%]
				]);

				var options = {
					title: '[%=Project.all.first().title%]'
				};

				var chart = new google.visualization.PieChart(document.getElementById('piechart'));

				chart.draw(data, options);
			}
		</script>
	</head>
	<body>
		<div id="piechart" style="width: 100%"></div>
	</body>
</html>
```

##  Generate Work Breakdown (Unbidirectionalizable)

Generate Work Breakdown consists of 25 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenWorkBreakdown.bit` (37 lines of BIT code).

```EGL
[*Generates a PlantUML work breakdown diagram*]
[%var project = Project.all.first();%]
@startwbs
[*The title of the project is underlined*]
* <u>[%=project.title%]</u>

[%for (wp in project.wps){%]
[*The titles of work-packages are bold*]
** <b>[%=wp.title%]</b>

[%for (task in wp.tasks){%]
[*Task boxes also include a badge (filled circle) for each of their partners*]
*** [%=task.title%][%if(task.partners.notEmpty()){%]\n[%=task.partners.collect(partner|"<color:" + partner.color + "><U+2B24></color>").concat(" ")%][%}%] 
[%}%]
[%}%]

[*The legend of the diagram*]
legend left
<b>Partners</b>
----
[%for (partner in project.partners){%]
<color:[%=partner.color%]><U+2B24></color>    [%=partner.name%]
[%}%]
endlegend
@endwbs
```
** Note. ** This EGL template cannot be bidirectionalized trivially. Please read the following EGL code

```
«IF !task.partnerNames.isEmpty()»«FOR pn : String IN task.partnerNames SEPARATOR " "»<color:"«project.partners.filter((x:Partner)->x.name==pn).get(0).color|ID»><U+2B24></color>«ENDFOR»«ENDIF»
```

the line generates a colored `<U+2B24>` by filtering `project.partners` with `pn`. However, `pn` is not printed. Accordingly, for this template, we cannot add new partners.

##  Generate SVG Variants	

Generate SVG Variants consists of 57 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenSVGVariants.bit` (79 lines of BIT code).

```EGL
[*Generates variants of an SVG image according to colour combinations specified in a model*]
<html>
<head>
[*Bootstrap CSS*]
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
</head>
[%
// Create inverse colour combinations for combinations marked as invertible
for (g in Group.all) {
    for (c in g.combinations.clone()) {
        if (c.invertible) {
            var inverse : new Combination;
            inverse.foreground = c.background;
            inverse.background = c.foreground;
            // Add the inverse combination right after the combination itself
            g.combinations.add(g.combinations.indexOf(c) + 1, inverse);
        }
    }
}
var combinationNumber = 0;
%]
<body style="padding:10px">
[%for (g in Group.all){%]
<h1>[%=g.name%]</h1>
<div style="display:flex;flex-wrap:wrap">
[%for (c in g.combinations){
    combinationNumber ++;
    var class = "triangle" + Combination.all.indexOf(c);%]
<div style="padding:5px">
<h5>Option [%=combinationNumber%]</h5>
<svg xmlns="http://www.w3.org/2000/svg" style="padding:20px;background-color:#[%=c.background.hex%]" viewBox="0 0 112.2 151.14" width="100px">
   <defs>
      <style>.[%=class%]{fill:#[%=c.foreground.hex%];stroke-width: 1px;stroke: #[%=c.background.hex%];}</style>
   </defs>
   <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
         <polygon class="[%=class%]" points="112.2 21.59 112.2 64.77 74.8 43.18 112.2 21.59" />
         <polygon class="[%=class%]" points="74.8 86.36 112.2 64.77 112.2 107.96 74.8 86.37 74.8 86.36" />
         <polygon class="[%=class%]" points="74.8 0 112.2 21.59 74.8 43.18 74.8 0" />
         <polygon class="[%=class%]" points="112.2 107.96 74.8 129.55 74.8 86.37 112.2 107.96" />
         <polygon class="[%=class%]" points="37.4 21.59 74.8 0 74.8 43.18 37.4 21.59" />
         <polygon class="[%=class%]" points="37.4 64.78 0 43.18 37.4 21.59 37.4 64.78" />
         <polygon class="[%=class%]" points="0 86.37 0 43.19 37.4 64.78 0 86.37" />
         <polygon class="[%=class%]" points="74.8 86.37 37.4 107.96 37.4 64.78 74.8 86.36 74.8 86.37" />
         <polygon class="[%=class%]" points="0 129.55 0 86.37 37.4 107.96 0 129.55" />
         <polygon class="[%=class%]" points="0 86.37 0 86.36 37.4 64.78 37.4 107.96 0 86.37" />
         <polygon class="[%=class%]" points="112.2 64.77 74.8 86.36 74.8 43.18 112.2 64.77" />
         <polygon class="[%=class%]" points="37.4 151.14 0 129.55 37.4 107.96 37.4 151.14" />
      </g>
   </g>
</svg>
</div>
[%}%]
</div>
[%}%]
</body>
</html>
```
** Note. ** We modified the logic of this template to make it bidirectionalizable.

##  Generate Typed Graph (Unbidirectionalizable)

Generate Typed Graph consists of 42 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenTypedGraph.bit` (partial implementation, 29 lines of BIT code).

```EGL
digraph G {
    rankdir="[%=Graph.all.first().getDirection()%]"
	node[fontname="Arial",style="rounded,filled",shape="box"]
	edge[fontname="Arial"]

    [*Generate a Graphviz node for each node*]
    [%for (node in Node.all){%]
    [%=node.getId()%][label="[%=node.name%]", fillcolor="[%=node.getColor()%]"]    
    [%}%]

    [*Generate a Graphviz edge for the edges that have a valid "from" and "to" node*]
    [%for (edge in Edge.all.select(e|e.from.isDefined() and e.to.isDefined())){%]
    [%=edge.from.getId()%] -> [%=edge.to.getId()%]
    [%}%]
}
[*%out.toString().println();%*]

[%
operation Node getId() {
    return "n" + Node.all.indexOf(self);
}

operation Graph getDirection() {
    if (self.direction.isDefined()) return self.direction;
    else return "LR";
}

operation Node getColor() {
    if (self.type.isDefined()) return self.type.getColor();
    else return getColors().first();
}

operation Type getColor() {
    if (self.color.isDefined()) return self.color;
    else return getColors().at(Type.all.indexOf(self).mod(getColors().size()));
}

@cached
operation getColors() {
	return Sequence{"azure", "beige", "floralwhite", "lemonchiffon", "mistyrose", "DDFADC", "pink", "wheat", "FAECFF"};
}
%]
```
** Note. ** This template cannot be bidirectionalized because not all information in the model is printed.

##  Generate LLM prompt

Generate LLM prompt consists of 7 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenLLMPrompt.bit` (partial implementation, 21 lines of BIT code).

```EGL
Please generate an image of [%=v.image.subject%].
[%if (v.style.isDefined()){%]
The style should be [%=v.style%].
[%}%]
[%if (v.mood.isDefined()){%]
The mood should be [%=v.mood%].
[%}%]
```


##  Generate LLM prompt

Generate LLM prompt consists of 7 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenLLMPrompt.bit` (partial implementation, 21 lines of BIT code).

```EGL
Please generate an image of [%=v.image.subject%].
[%if (v.style.isDefined()){%]
The style should be [%=v.style%].
[%}%]
[%if (v.mood.isDefined()){%]
The mood should be [%=v.mood%].
[%}%]
```

##  Generate Language Report

Generate Language Report consists of 38 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenLanguageReport.bit` (using simplified expressions, 27 lines of BIT code).

```EGL
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<table class="table table-striped">
    <tr>
        <th>Name</th>
        <th>File extension</th>
        <th>Extends</th>
    </tr>
    [%for (language in Language.all){%]
    <tr>
        <td>[%=language.getTitle()%]</td>
        <td>.[%=language.getExtension()%]</td>
        <td>[%=language.getExtends()%]</td>
    </tr>
    [%}%]
</table>

</html>

[%
operation Language getTitle() {
    if (self.name.isDefined()) return self.name + " (" + self.id + ")";
    else return self.id;
}

operation Language getExtension() {
    if (self.extension.isDefined()) return self.extension;
    else return self.id.toLowerCase();
}

operation Language getExtends() {
    if (self.extends.isDefined()) return self.extends.id;
    else return "-";
}
%]
```

##  State Machine Java

State Machine Java consists of 47 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenStateJava.bit` (53 lines of BIT code).

```EGL
[*Generates a Java class from a state machine*]
public class App {
	
	public static void main(String[] args) {
		App app = new App();
		
		// The statement below will succeed
		app.process("AABC"); 
		
		// The statement below will fail because
		// there is no transition from A to C
		// in the state machine
		app.process("ACB"); 
	}
	
	[*Generate an entry process() method*]
	public void process(String str) {
		if (str.isEmpty()) return;
		
		[%for(s in State.all){%]
		if (str.charAt(0) == '[%=s.name%]') {
			state[%=s.name%](str.substring(1));
			return;
		}
		[%}%]
		
		throw new IllegalStateException();
	}

	[*Generate a method for every state*]
	[%for (s in State.all){%]
	public void state[%=s.name%](String str) {
		if (str.isEmpty()) return;
		
		[%for(t in s.outgoing){%]
		if (str.charAt(0) == '[%=t.to.name%]') {
			state[%=t.to.name%](str.substring(1));
			return;
		}
		[%}%]
		
		throw new IllegalStateException();
	}
	
	[%}%]

}
```

##  Generate Java Table

Generate Java Table consists of 82 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenJavaTable.bit` (using simplified expressions, 68 lines of BIT code).

```EGL
package [%=table.package%];
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Collections;
[%for (class in table.columns.collect(c|c.type).asSet()){%]
import [%=class%];
[%}%]

public class [%=table.name%] {

    [*Create a list field to store all values*]
    protected List<Row> rows = new ArrayList<>();
    
    [*For each searchable column create a linked hash map to act as an index*]
    [%for (column in table.getSearchableColumns()){%]
    protected LinkedHashMap<[%=column.type.getSimpleName()%], List<Row>> [%=column.name%]Index = new LinkedHashMap<>();
    [%}%]

    public Row add([%=table.columns.collect(column|column.type.getSimpleName() + " " + column.name).concat(", ")%]) {

        [*Create a new row object from the parameters*]
        Row row = new Row([%=table.columns.collect(column|column.name).concat(", ")%]);
        
        [*Add the row object to the indices of all searchable columns*]
        [%for (column in table.getSearchableColumns()){%]
        List<Row> [%=column.name%]IndexValues = [%=column.name%]Index.get([%=column.name%]);
        if (![%=column.name%]Index.containsKey([%=column.name%])) {
            [%=column.name%]IndexValues = new ArrayList<>();
            [%=column.name%]Index.put([%=column.name%], [%=column.name%]IndexValues);
        }
        [%=column.name%]IndexValues.add(row);

        [%}%]
        [**]
        [*Add the row object to the list of all rows*]
        rows.add(row);
        return row;
    }

    [*Create a method to return all rows*]
    public List<Row> getRows() {
        return Collections.unmodifiableList(rows);
    }

    [*Create a searchBy method for every searchable column*]
    [%for (column in table.getSearchableColumns()){%]
    public List<Row> searchBy[%=column.name.ftuc()%]([%=column.type.getSimpleName()%] [%=column.name%]) {
        return [%=column.name%]Index.get([%=column.name%]);
    }

    [%}%]
    [*The row class*]
    public class Row {

        [%for (column in table.columns){%]
        protected [%=column.type.getSimpleName()%] [%=column.name%];
        [%}%]

        public Row([%=table.columns.collect(column|column.type.getSimpleName() + " " + column.name).concat(", ")%]) {
            [%for (column in table.columns){%]
            this.[%=column.name%] = [%=column.name%];
            [%}%]
        }

        [%for (column in table.columns){%]
        public [%=column.type.getSimpleName()%] get[%=column.name.ftuc()%]() {
            return this.[%=column.name%];
        }

        [%}%]
    }
}
[%
operation String getSimpleName() {
    return self.split("\\.").last();
}

operation Table getSearchableColumns() {
    return self.columns.select(c|c.searchable);
}
%]
```

##  Components to Graphviz

Components to Graphviz consists of 89 lines of EGL code. The BIT implementation can be found in `src/edu/ustb/sei/bit/egl/GenComponentsGraphviz.bit` (70 lines of BIT code).

```EGL
digraph G {
	[* Default fonts for edges and nodes *]
	node[fontname=Tahoma, fontsize=10]
	edge[fontname=Tahoma, fontsize=10]
	
	[* The graph should be drawn left to right *]
	rankdir=LR
	
	[* The components of the system *]
	[%for (c in Component.all){%]
	[%=c.toDot()%]
	[%}%]
	
	[* The connectors of the system *]
	[%for (c in Connector.all){%]
	[%=c.source.getDotID()%] -> [%=c.target.getDotID()%]
	[%}%]
}

[%
/**
 * Generates the dot representation of a component
*/
@template
operation Component toDot() {
%]
	[%=self.name%] [shape=plaintext, label=<
	<table border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td border="1">
				<table border="0" cellspacing="0" cellpadding="0" bgcolor="azure">
					<tr>
						<td>&nbsp;</td><td>&nbsp;</td><td cellpadding="2" align="right"></td>
					</tr>
					[%for (i in 0.to(Sequence{self.getInPorts().size(), self.getOutPorts().size()}.max())){%]
					<tr>
						[%=getPortCell(self.getInPorts(), i)%]
						<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
						[%=getPortCell(self.getOutPorts(), i)%]
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					[%}%]
				</table>
			</td>
		</tr>
		<tr>
			<td cellpadding="5">[%=self.name%]</td>
		</tr>
	</table>
	>];
[%
}

/**
 * Gets a unique ID for each port
 */ 
operation Port getDotID(){
    return self.component.name + ":" + self.name;
}

/**
 * Computes the label of a component port
 */
operation getPortCell(ports : Collection, index : Integer) {
	var cell = "<td cellpadding='2' align='left'";
	if (ports.size > index) {
		cell += " port='" + ports.at(index).name + 
			"'><font color1='#727372' point-size='9'>" 
			+ ports.at(index).name + "</font>";
	}
	else {
		cell += ">";
	}
	cell += "</td>";
	return cell;
}

operation Component getOutPorts() {
    return self.ports.select(p : OutPort | true);
}

operation Component getInPorts() {
    return self.ports.select(p : InPort | true);
}
%]
```