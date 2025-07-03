bit2: x
url : https://github.com/iBfuRsiFUBbfzPdnJhXUfFFkk/enterprise-application-manager/commit/54226b969489204bd5c6b43e03076c943511cdec
file: templates/authenticated/kpi/kpi_person.html
desc: change expression
diff: 
-  <td style="background-color: {{ stat.capacity_based_velocity|get_color }}; color: white;">
+  <td style="background-color: {{ kpi_sprint.capacity_based_velocity|get_color }}; color: white;">