<?PHP
/*
REPORTS.PHP - UNFINISHED (barely started)
 - The goal of this page was to allow the client to calculate statistics using pre-configured reports or to create a customizable report
 - Due to lack of time this non-critical page was not completed

The following information was sent to the team in an email from Stephanie Zegers. It details the type of reports she would like to be able to display.


    Common Key Performance Indicators (KPI) that I reference would be good to have on the reports section, so this section is more like a dashboard. You could even change the name to Dashboard.
    If this is too complicated- don’t worry about it. This section is more of a wish than a need
    Being able to pull up the number of work-based learning experiences within a date range
    Calculate the average rating of those experiences based within a date range
    Calculate the number of EMCS network and non EMCS network within a date range  
    Being able to pull up the number of coaching sessions within a date range
    Being able to pull up the number of industry partners at each engagement level
    Being able to pull up the number of meetings within a date range

*/
$path = '';
require_once("functions/basic_html_functions.php");
require_once("../config.php");
require_once("functions/database_functions.php");
require_once("functions/generalized_functions.php");
require_once("functions/tables.php");
require("includes/header.php");
?>

<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load('current');
      google.charts.setOnLoadCallback(drawVisualization);

      function drawVisualization() {
        var wrapper = new google.visualization.ChartWrapper({
          chartType: 'LineChart',
          dataSourceUrl: 'http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&pub=1',
          query: 'SELECT A,D WHERE D > 100 ORDER BY D',
          options: {'title': 'Countries'},
          containerId: 'vis_div'
        });
        wrapper.draw()

        // No query callback handler needed!
      }
    </script>
  </head>
  <body style="font-family: Arial;border: 0 none;">
    <div id="vis_div" style="width: 600px; height: 400px;"></div>
  </body>
</html>