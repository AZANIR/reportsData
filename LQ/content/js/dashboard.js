/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 98.95833333333333, "KoPercent": 1.0416666666666667};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9264583333333334, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/_next/image/-172"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-171"], "isController": false}, {"data": [0.97, 500, 1500, "/_next/static/chunks/pages/privacy-policy-acad0aee1f8a2872.js-233"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-170"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/documents/search-226"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/documents/search-227"], "isController": false}, {"data": [0.875, 500, 1500, "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-163"], "isController": false}, {"data": [0.98, 500, 1500, "/_next/image/-206"], "isController": false}, {"data": [0.95, 500, 1500, "/_next/image/-205"], "isController": false}, {"data": [0.87, 500, 1500, "/_next/image/-249"], "isController": false}, {"data": [0.935, 500, 1500, "/_next/image/-204"], "isController": false}, {"data": [0.93, 500, 1500, "/_next/image/-248"], "isController": false}, {"data": [0.975, 500, 1500, "/_next/image/-203"], "isController": false}, {"data": [0.975, 500, 1500, "/_next/static/media/Spin.df15a301.svg-222"], "isController": false}, {"data": [0.915, 500, 1500, "/_next/image/-247"], "isController": false}, {"data": [0.79, 500, 1500, "/_next/image/-209"], "isController": false}, {"data": [0.865, 500, 1500, "/_next/image/-208"], "isController": false}, {"data": [0.99, 500, 1500, "/_next/image/-207"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-165"], "isController": false}, {"data": [0.97, 500, 1500, "/_next/static/chunks/pages/contacts-35642fc97e509742.js-228"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-162"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-169"], "isController": false}, {"data": [0.94, 500, 1500, "/_next/image/-202"], "isController": false}, {"data": [0.905, 500, 1500, "/_next/image/-246"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-168"], "isController": false}, {"data": [0.97, 500, 1500, "/_next/image/-201"], "isController": false}, {"data": [0.89, 500, 1500, "/_next/image/-245"], "isController": false}, {"data": [0.98, 500, 1500, "/_next/image/-167"], "isController": false}, {"data": [0.8, 500, 1500, "/_next/image/-200"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-166"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-161"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-160"], "isController": false}, {"data": [0.965, 500, 1500, "/g/collect?v=2&tid=G-0RYFMW13ZL&gtm=45je3ab0&_p=2116546750&cid=1373326669.1697116895&ul=uk-ua&sr=1536x864&_eu=AEA&dl=https%3A%2F%2Fluxequality.letkabackend.click%2Fcase-studies%2F&dr=https%3A%2F%2Fluxequality.letkabackend.click%2F&sid=1697116895&sct=1&seg=1&dt=IT%20Case%20Studies%20%7C%20Luxe%20Quality&_s=2-223"], "isController": false}, {"data": [0.81, 500, 1500, "/_next/static/css/cbd65f856dbf3e21.css-215"], "isController": false}, {"data": [0.995, 500, 1500, "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-251"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-159"], "isController": false}, {"data": [0.92, 500, 1500, "/_next/image/-236"], "isController": false}, {"data": [0.98, 500, 1500, "/api/v2-224"], "isController": false}, {"data": [0.965, 500, 1500, "/_next/static/css/5d869858990e49ff.css-164"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-198"], "isController": false}, {"data": [0.93, 500, 1500, "/_next/image/-197"], "isController": false}, {"data": [0.955, 500, 1500, "/_next/image/-196"], "isController": false}, {"data": [0.85, 500, 1500, "/_next/image/-195"], "isController": false}, {"data": [0.5, 500, 1500, "/api/v2-225"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-158"], "isController": false}, {"data": [0.895, 500, 1500, "/_next/image/-235"], "isController": false}, {"data": [0.99, 500, 1500, "/_next/image/-157"], "isController": false}, {"data": [0.98, 500, 1500, "/_next/static/chunks/pages/case-studies/%5Buid%5D-0235c985b6686f83.js-221"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-252"], "isController": false}, {"data": [0.995, 500, 1500, "/_next/image/-199"], "isController": false}, {"data": [0.81, 500, 1500, "/_next/static/css/a6f7e359f7dbdb6d.css-214"], "isController": false}, {"data": [0.975, 500, 1500, "/_next/static/chunks/pages/industries/healthcare-bcc367f49e962b69.js-229"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-190"], "isController": false}, {"data": [0.995, 500, 1500, "/api/v2/documents/search-243"], "isController": false}, {"data": [0.99, 500, 1500, "/_next/static/chunks/pages/industries/e-commerce-eaab52b163b20c61.js-231"], "isController": false}, {"data": [0.995, 500, 1500, "/api/v2/documents/search-244"], "isController": false}, {"data": [0.91, 500, 1500, "/_next/image/-194"], "isController": false}, {"data": [0.01, 500, 1500, "/_next/static/chunks/797-18c400db763eb22a.js-213"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-193"], "isController": false}, {"data": [0.955, 500, 1500, "/_next/image/-192"], "isController": false}, {"data": [0.98, 500, 1500, "/_next/image/-191"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-240"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-241"], "isController": false}, {"data": [0.345, 500, 1500, "/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf-217"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/static/chunks/pages/industries/marketplace-77437c68984ecd13.js-232"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-187"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-186"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-185"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-184"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-189"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-188"], "isController": false}, {"data": [0.99, 500, 1500, "/_next/static/css/59ae46ebdb9b2558.css-238"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-183"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-182"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-181"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-180"], "isController": false}, {"data": [0.99, 500, 1500, "/_next/static/chunks/pages/industries/fintech-2922fd056459d217.js-230"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2-242"], "isController": false}, {"data": [0.82, 500, 1500, "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-211"], "isController": false}, {"data": [0.82, 500, 1500, "/_next/image/-219"], "isController": false}, {"data": [0.775, 500, 1500, "/_next/image/-218"], "isController": false}, {"data": [0.975, 500, 1500, "/v4/fullHashes:find-234"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-176"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-175"], "isController": false}, {"data": [0.0, 500, 1500, "/-220"], "isController": false}, {"data": [0.995, 500, 1500, "/_next/static/css/20a83c45c1ae9f97.css-237"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-174"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-173"], "isController": false}, {"data": [0.925, 500, 1500, "/_next/image/-250"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-179"], "isController": false}, {"data": [0.935, 500, 1500, "/_next/image/-212"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-178"], "isController": false}, {"data": [1.0, 500, 1500, "/canonical.html-239"], "isController": false}, {"data": [1.0, 500, 1500, "/_next/image/-177"], "isController": false}, {"data": [0.785, 500, 1500, "/_next/image/-210"], "isController": false}, {"data": [0.76, 500, 1500, "/_next/static/chunks/pages/industries/marketing-c2c36989b4610793.js-216"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 9600, 100, 1.0416666666666667, 355.0076041666653, 27, 19068, 162.0, 550.0, 825.0, 3927.53999999999, 217.13070816275757, 2059.142518355744, 113.0513614491213], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/_next/image/-172", 100, 0, 0.0, 131.46000000000004, 98, 181, 129.0, 159.0, 162.84999999999997, 180.88999999999993, 58.17335660267597, 137.53681282722513, 28.68900887143688], "isController": false}, {"data": ["/_next/image/-171", 100, 0, 0.0, 108.52999999999999, 66, 175, 105.0, 156.30000000000015, 165.0, 174.95, 57.47126436781609, 75.5994073275862, 28.286637931034484], "isController": false}, {"data": ["/_next/static/chunks/pages/privacy-policy-acad0aee1f8a2872.js-233", 100, 0, 0.0, 158.77000000000004, 69, 900, 124.5, 227.80000000000018, 605.3499999999997, 898.2699999999991, 4.959825414145422, 6.504927276559865, 2.4217897530006947], "isController": false}, {"data": ["/_next/image/-170", 100, 0, 0.0, 116.88999999999996, 76, 171, 98.0, 167.0, 169.0, 170.99, 59.665871121718375, 94.85941229116945, 29.133726133651553], "isController": false}, {"data": ["/api/v2/documents/search-226", 100, 0, 0.0, 186.19, 138, 468, 164.0, 254.0, 300.95, 467.12999999999954, 4.535147392290249, 10.756935586734693, 3.352643140589569], "isController": false}, {"data": ["/api/v2/documents/search-227", 100, 0, 0.0, 188.74, 140, 472, 173.5, 242.9, 299.99999999999955, 470.76999999999936, 4.5369992287101315, 12.597660680663308, 4.559152545256567], "isController": false}, {"data": ["/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-163", 100, 0, 0.0, 343.20000000000005, 126, 855, 256.0, 660.8, 848.9999999999995, 854.97, 55.92841163310962, 381.1215394295302, 25.342561521252797], "isController": false}, {"data": ["/_next/image/-206", 100, 0, 0.0, 184.61999999999995, 88, 625, 141.5, 292.70000000000005, 471.0, 625.0, 37.38317757009346, 74.40128504672897, 18.399532710280376], "isController": false}, {"data": ["/_next/image/-205", 100, 0, 0.0, 212.18, 78, 1503, 122.5, 252.50000000000003, 938.5999999999999, 1497.9499999999975, 31.756113051762465, 125.59790806605271, 15.567938234360113], "isController": false}, {"data": ["/_next/image/-249", 100, 0, 0.0, 438.73, 129, 3882, 283.5, 767.8, 890.3499999999999, 3866.109999999992, 5.808550185873606, 176.08869474616634, 3.5225680326440516], "isController": false}, {"data": ["/_next/image/-204", 100, 0, 0.0, 237.04000000000008, 93, 1598, 124.0, 858.9000000000002, 1000.2999999999996, 1593.2799999999975, 26.10966057441253, 52.42330287206266, 12.799853133159269], "isController": false}, {"data": ["/_next/image/-248", 100, 0, 0.0, 294.59999999999997, 79, 2489, 207.5, 577.2, 726.3499999999999, 2482.959999999997, 5.991252770954407, 117.33845148583069, 4.715771224012942], "isController": false}, {"data": ["/_next/image/-203", 100, 0, 0.0, 203.81, 81, 1178, 160.0, 270.0, 1093.7999999999902, 1177.8, 25.693730729701954, 57.88616874357657, 12.570858491778006], "isController": false}, {"data": ["/_next/static/media/Spin.df15a301.svg-222", 100, 0, 0.0, 233.60999999999996, 78, 757, 181.0, 464.4000000000002, 512.5999999999997, 754.9299999999989, 4.4296788482834994, 4.403723698781839, 2.054782668881506], "isController": false}, {"data": ["/_next/image/-247", 100, 0, 0.0, 312.20000000000005, 133, 1188, 221.5, 645.4000000000003, 850.399999999999, 1185.1499999999985, 5.815982319413749, 90.10796825927649, 3.481637853320926], "isController": false}, {"data": ["/_next/image/-209", 100, 0, 0.0, 475.84, 77, 2493, 175.5, 1151.7000000000003, 1648.7499999999957, 2492.43, 17.568517217146873, 159.60929264757553, 8.664161322909345], "isController": false}, {"data": ["/_next/image/-208", 100, 0, 0.0, 358.7499999999999, 97, 2472, 173.5, 748.0, 1292.499999999994, 2471.0899999999997, 22.558087074216107, 232.3218616061358, 11.124837863749155], "isController": false}, {"data": ["/_next/image/-207", 100, 0, 0.0, 177.94000000000005, 89, 594, 125.0, 395.9, 397.0, 593.98, 35.80379520229144, 52.37703634085213, 17.41239258861439], "isController": false}, {"data": ["/_next/image/-165", 100, 0, 0.0, 124.75999999999998, 81, 272, 115.0, 155.60000000000002, 165.84999999999997, 271.95, 56.625141562853905, 111.09366152321631, 28.257272791619478], "isController": false}, {"data": ["/_next/static/chunks/pages/contacts-35642fc97e509742.js-228", 100, 0, 0.0, 195.64999999999998, 72, 1032, 136.0, 289.9, 769.3999999999974, 1030.1999999999991, 4.5662100456621, 6.126926369863014, 2.2028396118721463], "isController": false}, {"data": ["/_next/image/-162", 100, 0, 0.0, 176.13000000000002, 67, 278, 160.5, 264.9, 269.95, 277.98, 81.23476848090982, 170.95793562144596, 40.379391754671], "isController": false}, {"data": ["/_next/image/-169", 100, 0, 0.0, 123.9, 67, 177, 126.0, 165.50000000000009, 171.0, 177.0, 57.33944954128441, 98.66417001146789, 28.109769208715598], "isController": false}, {"data": ["/_next/image/-202", 100, 0, 0.0, 262.02000000000004, 99, 1423, 170.5, 545.3000000000002, 1308.85, 1421.9799999999996, 25.451768897938408, 43.794938279460425, 12.626463476711631], "isController": false}, {"data": ["/_next/image/-246", 100, 0, 0.0, 398.48, 150, 1732, 300.5, 781.1000000000007, 1199.1499999999994, 1728.8399999999983, 5.8041673921875905, 169.6642017093273, 4.432479395205758], "isController": false}, {"data": ["/_next/image/-168", 100, 0, 0.0, 137.37000000000003, 70, 181, 147.5, 177.0, 179.0, 180.99, 58.8235294117647, 61.40854779411765, 28.607536764705884], "isController": false}, {"data": ["/_next/image/-201", 100, 0, 0.0, 230.08999999999992, 103, 917, 193.0, 294.0, 867.9999999999998, 916.7199999999998, 25.220680958385877, 59.012452711223204, 12.364044766708702], "isController": false}, {"data": ["/_next/image/-245", 100, 0, 0.0, 364.7300000000003, 101, 1835, 231.5, 823.9000000000001, 1013.4499999999998, 1834.3099999999997, 5.878203620973431, 113.1209771043969, 3.3983364683752644], "isController": false}, {"data": ["/_next/image/-167", 100, 0, 0.0, 149.3, 99, 527, 119.0, 256.0, 350.1999999999989, 527.0, 59.488399762046406, 65.23971966091612, 29.39563503866746], "isController": false}, {"data": ["/_next/image/-200", 100, 0, 0.0, 596.6899999999997, 79, 1897, 189.0, 1374.9, 1390.9, 1892.1999999999975, 24.348672997321646, 36.07122747747748, 11.9603344898953], "isController": false}, {"data": ["/_next/image/-166", 100, 0, 0.0, 114.59000000000002, 75, 213, 100.5, 184.0, 211.0, 212.99, 62.5782227784731, 129.67869993742178, 30.922442115143927], "isController": false}, {"data": ["/_next/image/-161", 100, 0, 0.0, 180.87000000000006, 105, 273, 174.5, 227.8, 236.0, 272.99, 75.30120481927712, 206.56355892319277, 37.42999341114458], "isController": false}, {"data": ["/_next/image/-160", 100, 0, 0.0, 152.41000000000003, 83, 248, 140.5, 236.40000000000026, 242.0, 247.95999999999998, 73.85524372230428, 122.61124446085671, 36.92762186115214], "isController": false}, {"data": ["/g/collect?v=2&tid=G-0RYFMW13ZL&gtm=45je3ab0&_p=2116546750&cid=1373326669.1697116895&ul=uk-ua&sr=1536x864&_eu=AEA&dl=https%3A%2F%2Fluxequality.letkabackend.click%2Fcase-studies%2F&dr=https%3A%2F%2Fluxequality.letkabackend.click%2F&sid=1697116895&sct=1&seg=1&dt=IT%20Case%20Studies%20%7C%20Luxe%20Quality&_s=2-223", 100, 0, 0.0, 311.1599999999998, 180, 1374, 270.0, 466.2000000000001, 634.6999999999992, 1367.0799999999965, 4.499640028797696, 1.9554099734521238, 5.088460110691145], "isController": false}, {"data": ["/_next/static/css/cbd65f856dbf3e21.css-215", 100, 0, 0.0, 467.71, 87, 760, 461.0, 660.5, 668.95, 759.7399999999999, 10.385294423096894, 19.21887981618029, 4.442147419254336], "isController": false}, {"data": ["/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-251", 100, 0, 0.0, 151.74000000000012, 66, 600, 140.5, 244.50000000000003, 323.5999999999999, 598.3499999999992, 6.469560716827328, 16.98891481205926, 2.9694272821375427], "isController": false}, {"data": ["/_next/image/-159", 100, 0, 0.0, 169.85000000000005, 72, 287, 198.5, 213.9, 276.95, 287.0, 82.8500414250207, 140.21398612261805, 41.02047949461475], "isController": false}, {"data": ["/_next/image/-236", 100, 0, 0.0, 359.03999999999996, 150, 1419, 281.0, 616.9000000000001, 913.4499999999994, 1416.939999999999, 5.367398421984864, 146.28257339917343, 3.1659264129676346], "isController": false}, {"data": ["/api/v2-224", 100, 0, 0.0, 197.83000000000007, 138, 977, 170.0, 210.0, 327.7999999999993, 974.5099999999987, 4.523863379325944, 4.689973987785569, 1.9791902284551006], "isController": false}, {"data": ["/_next/static/css/5d869858990e49ff.css-164", 100, 0, 0.0, 211.17999999999995, 103, 848, 171.0, 269.8, 602.1999999999998, 846.9299999999995, 56.497175141242934, 406.349311440678, 24.165783898305083], "isController": false}, {"data": ["/_next/image/-198", 100, 0, 0.0, 126.44, 85, 230, 120.5, 172.0, 180.64999999999992, 229.98, 24.86325211337643, 65.46028095474888, 12.2859429388364], "isController": false}, {"data": ["/_next/image/-197", 100, 0, 0.0, 247.06, 70, 1901, 143.0, 190.10000000000016, 1747.0999999999917, 1900.2199999999996, 24.588148512417014, 52.68202913695598, 12.053955618391935], "isController": false}, {"data": ["/_next/image/-196", 100, 0, 0.0, 222.5900000000001, 71, 853, 167.0, 299.6000000000001, 724.3499999999999, 852.7199999999998, 23.76425855513308, 57.36840541825095, 11.696471007604563], "isController": false}, {"data": ["/_next/image/-195", 100, 0, 0.0, 426.01, 79, 1963, 154.5, 1194.6000000000001, 1919.7499999999998, 1962.97, 24.384296513045598, 51.41181266764204, 11.97783315045111], "isController": false}, {"data": ["/api/v2-225", 100, 0, 0.0, 701.08, 553, 1218, 669.5, 819.0, 962.0, 1217.5199999999998, 4.413841807909605, 4.5902661684542725, 1.931055790960452], "isController": false}, {"data": ["/_next/image/-158", 100, 0, 0.0, 155.29, 71, 282, 126.5, 260.9, 263.95, 281.99, 92.76437847866418, 136.24768089053802, 46.38218923933209], "isController": false}, {"data": ["/_next/image/-235", 100, 0, 0.0, 435.13, 150, 2547, 329.0, 892.8, 1158.1999999999982, 2534.8299999999936, 5.082075519642221, 140.34270658636987, 2.997630482288967], "isController": false}, {"data": ["/_next/image/-157", 100, 0, 0.0, 372.33, 272, 502, 368.0, 461.8, 488.4999999999999, 502.0, 76.51109410864575, 98.17927505738332, 38.18082918898241], "isController": false}, {"data": ["/_next/static/chunks/pages/case-studies/%5Buid%5D-0235c985b6686f83.js-221", 100, 0, 0.0, 215.03, 94, 619, 167.5, 402.70000000000016, 475.5999999999999, 618.5699999999998, 4.381161007667032, 4.406831872946331, 2.0793400876232204], "isController": false}, {"data": ["/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-252", 100, 0, 0.0, 133.5999999999999, 65, 475, 120.0, 191.60000000000008, 276.5999999999997, 474.0499999999995, 6.543217954590067, 17.182336992082707, 3.1438117516194466], "isController": false}, {"data": ["/_next/image/-199", 100, 0, 0.0, 182.15, 91, 576, 181.0, 238.70000000000002, 308.79999999999995, 573.4699999999987, 24.24830261881668, 55.4348402643065, 11.911031462172648], "isController": false}, {"data": ["/_next/static/css/a6f7e359f7dbdb6d.css-214", 100, 0, 0.0, 484.3499999999999, 91, 2528, 440.5, 756.8000000000002, 775.9, 2523.6399999999976, 11.086474501108649, 46.803544207317074, 4.742066241685144], "isController": false}, {"data": ["/_next/static/chunks/pages/industries/healthcare-bcc367f49e962b69.js-229", 100, 0, 0.0, 187.93999999999994, 71, 793, 152.0, 317.60000000000014, 510.09999999999866, 792.2499999999997, 4.752625825768737, 12.053290302267003, 2.3531067320944823], "isController": false}, {"data": ["/_next/image/-190", 100, 0, 0.0, 144.49000000000007, 69, 361, 163.0, 230.9, 255.0, 359.9499999999995, 42.82655246252676, 55.33157119914347, 20.99504817987152], "isController": false}, {"data": ["/api/v2/documents/search-243", 100, 0, 0.0, 179.82, 139, 523, 169.5, 213.9, 248.39999999999986, 522.3999999999996, 5.650994575045208, 16.943215892715866, 4.122356394100361], "isController": false}, {"data": ["/_next/static/chunks/pages/industries/e-commerce-eaab52b163b20c61.js-231", 100, 0, 0.0, 197.2999999999999, 76, 606, 161.5, 454.7000000000006, 472.0, 605.4199999999997, 5.063034783048959, 8.014823616525746, 2.5067955419978736], "isController": false}, {"data": ["/api/v2/documents/search-244", 100, 0, 0.0, 188.37, 139, 793, 171.0, 260.9, 302.0, 788.1799999999976, 5.732630130703966, 19.267739355222428, 5.027247907590002], "isController": false}, {"data": ["/_next/image/-194", 100, 0, 0.0, 233.83999999999995, 89, 678, 169.0, 562.2, 616.55, 677.81, 25.75991756826378, 41.75924137042762, 12.67870942812983], "isController": false}, {"data": ["/_next/static/chunks/797-18c400db763eb22a.js-213", 100, 0, 0.0, 10661.69, 762, 19068, 10312.5, 16692.100000000002, 17907.049999999996, 19065.449999999997, 4.281371751509184, 1768.026331105236, 1.873100141285268], "isController": false}, {"data": ["/_next/image/-193", 100, 0, 0.0, 186.54999999999998, 98, 474, 159.0, 323.30000000000064, 411.1499999999991, 473.9, 26.048450117218025, 43.72781811669706, 12.693531844230268], "isController": false}, {"data": ["/_next/image/-192", 100, 0, 0.0, 220.83, 79, 1235, 157.5, 194.90000000000012, 1171.1499999999965, 1234.8899999999999, 25.826446280991735, 51.602450284090914, 12.661011751033058], "isController": false}, {"data": ["/_next/image/-191", 100, 0, 0.0, 218.60999999999993, 64, 1123, 175.0, 331.0, 333.95, 1121.6599999999994, 29.559562518474728, 38.739192284954186, 14.577713937333728], "isController": false}, {"data": ["/success.txt-240", 100, 0, 0.0, 51.010000000000005, 27, 293, 42.0, 61.0, 103.69999999999993, 292.8399999999999, 5.610098176718092, 1.1833800841514728, 1.7860273492286116], "isController": false}, {"data": ["/success.txt-241", 100, 0, 0.0, 53.190000000000026, 27, 305, 41.0, 96.0, 99.89999999999998, 304.3999999999997, 5.615769079575449, 1.1845762902229462, 1.787832734317965], "isController": false}, {"data": ["/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf-217", 100, 0, 0.0, 1447.4799999999998, 446, 5756, 1184.5, 2335.700000000001, 4007.349999999984, 5751.829999999998, 4.211058238935444, 323.26994594053986, 2.2576864972417567], "isController": false}, {"data": ["/_next/static/chunks/pages/industries/marketplace-77437c68984ecd13.js-232", 100, 0, 0.0, 149.31, 77, 391, 133.5, 258.70000000000005, 290.6499999999999, 390.4299999999997, 5.059960532307848, 7.9951329504629856, 2.5102147953245963], "isController": false}, {"data": ["/_next/image/-187", 100, 0, 0.0, 137.06000000000003, 71, 357, 136.0, 168.0, 174.95, 356.8099999999999, 46.06172270842929, 57.08234972362967, 22.491075541225243], "isController": false}, {"data": ["/_next/image/-186", 100, 0, 0.0, 174.12, 67, 354, 159.0, 345.0, 347.95, 353.98, 44.88330341113106, 60.662589766606814, 22.047169546678635], "isController": false}, {"data": ["/_next/image/-185", 100, 0, 0.0, 145.16000000000008, 87, 334, 151.5, 196.9, 290.34999999999894, 333.96, 44.76275738585497, 61.85478681736795, 22.031669650850493], "isController": false}, {"data": ["/_next/image/-184", 100, 0, 0.0, 125.35999999999997, 67, 183, 131.0, 171.9, 177.79999999999995, 182.99, 44.9034575662326, 76.43235013471038, 21.881665356982488], "isController": false}, {"data": ["/_next/image/-189", 100, 0, 0.0, 140.63, 75, 199, 163.0, 175.9, 197.99999999999977, 199.0, 44.923629829290206, 45.888785938903865, 22.15471978885894], "isController": false}, {"data": ["/_next/image/-188", 100, 0, 0.0, 156.57999999999998, 87, 306, 157.0, 195.0, 303.95, 305.99, 45.228403437358665, 66.25254409769336, 22.260854816824967], "isController": false}, {"data": ["/_next/static/css/59ae46ebdb9b2558.css-238", 100, 0, 0.0, 178.21, 78, 522, 156.0, 291.0, 405.29999999999916, 521.91, 5.480052608505042, 4.484652427663305, 2.4135778578474354], "isController": false}, {"data": ["/_next/image/-183", 100, 0, 0.0, 140.26000000000002, 77, 352, 148.0, 157.9, 216.99999999999955, 352.0, 44.9438202247191, 60.5688202247191, 21.90133426966292], "isController": false}, {"data": ["/_next/image/-182", 100, 0, 0.0, 120.95000000000003, 71, 185, 124.5, 168.70000000000002, 173.89999999999998, 185.0, 48.78048780487805, 79.9828506097561, 23.866234756097562], "isController": false}, {"data": ["/_next/image/-181", 100, 0, 0.0, 116.13000000000004, 70, 160, 117.0, 146.9, 152.84999999999997, 159.99, 49.09180166912125, 108.9224349533628, 24.06648870888562], "isController": false}, {"data": ["/_next/image/-180", 100, 0, 0.0, 116.50999999999998, 72, 182, 96.0, 176.0, 176.0, 182.0, 50.58168942842691, 60.41152946383409, 24.89567526555387], "isController": false}, {"data": ["/_next/static/chunks/pages/industries/fintech-2922fd056459d217.js-230", 100, 0, 0.0, 193.46, 70, 734, 162.5, 393.70000000000005, 466.0, 732.7499999999993, 4.9132805974549205, 16.783843290915343, 2.4182552940598434], "isController": false}, {"data": ["/api/v2-242", 100, 0, 0.0, 164.9399999999999, 137, 228, 159.5, 192.0, 214.95, 227.99, 5.658348893792791, 5.901039014315623, 2.4755276410343465], "isController": false}, {"data": ["/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-211", 100, 0, 0.0, 413.85, 88, 1391, 247.5, 871.3000000000002, 1019.9999999999989, 1388.949999999999, 11.852554225435581, 80.76867518075146, 5.625333353087591], "isController": false}, {"data": ["/_next/image/-219", 100, 0, 0.0, 583.3199999999998, 163, 3928, 400.0, 1189.6000000000004, 1466.349999999999, 3924.069999999998, 4.310344827586206, 87.57492591594828, 2.2435681573275863], "isController": false}, {"data": ["/_next/image/-218", 100, 0, 0.0, 582.9500000000003, 135, 3537, 413.5, 1175.3000000000009, 1495.2499999999977, 3520.769999999992, 4.28027222531353, 106.27113384411248, 2.207015366177289], "isController": false}, {"data": ["/v4/fullHashes:find-234", 100, 0, 0.0, 287.3500000000001, 178, 684, 257.0, 408.5000000000001, 510.1499999999996, 683.5299999999997, 4.824857666698833, 2.751676638039178, 3.1898717190967867], "isController": false}, {"data": ["/_next/image/-176", 100, 0, 0.0, 145.61, 74, 198, 154.0, 186.0, 198.0, 198.0, 52.38344683080147, 47.37018727082242, 25.629010607647984], "isController": false}, {"data": ["/_next/image/-175", 100, 0, 0.0, 105.50999999999998, 82, 151, 96.0, 143.0, 150.0, 151.0, 54.02485143165856, 100.82176863857374, 26.748632495948137], "isController": false}, {"data": ["/-220", 100, 100, 100.0, 273.2199999999999, 145, 751, 235.0, 452.00000000000006, 612.4999999999999, 749.7499999999993, 4.362430746411901, 1.993767177071064, 2.624274745888409], "isController": false}, {"data": ["/_next/static/css/20a83c45c1ae9f97.css-237", 100, 0, 0.0, 163.03999999999996, 72, 510, 157.0, 240.00000000000006, 298.5499999999999, 509.0499999999995, 5.410669840926307, 11.370860837571692, 2.383019627204848], "isController": false}, {"data": ["/_next/image/-174", 100, 0, 0.0, 117.63000000000002, 72, 200, 111.0, 156.0, 159.0, 199.69999999999985, 54.67468562055768, 64.97958242208857, 26.803410333515583], "isController": false}, {"data": ["/_next/image/-173", 100, 0, 0.0, 146.24, 65, 224, 150.0, 182.70000000000007, 222.0, 223.99, 52.770448548812666, 97.50164907651715, 25.869887862796833], "isController": false}, {"data": ["/_next/image/-250", 100, 0, 0.0, 307.8700000000001, 84, 1890, 221.0, 656.7, 696.8499999999999, 1879.5299999999947, 6.438320885912954, 146.06311767641, 6.306285008369817], "isController": false}, {"data": ["/_next/image/-179", 100, 0, 0.0, 128.1400000000001, 82, 220, 130.0, 202.9000000000003, 218.4999999999999, 220.0, 55.248618784530386, 94.04135013812154, 27.354540745856355], "isController": false}, {"data": ["/_next/image/-212", 100, 0, 0.0, 304.77, 81, 1020, 278.0, 602.1000000000001, 671.55, 1018.4999999999992, 11.52604887044721, 13.023084514753343, 5.6842330855232825], "isController": false}, {"data": ["/_next/image/-178", 100, 0, 0.0, 131.24, 66, 179, 131.0, 176.30000000000004, 177.95, 179.0, 53.82131324004306, 73.63638657158235, 26.595297362755648], "isController": false}, {"data": ["/canonical.html-239", 100, 0, 0.0, 99.58000000000006, 56, 372, 91.5, 133.40000000000003, 147.84999999999997, 371.6299999999998, 5.576000892160143, 1.6212876031560164, 1.7642815322850451], "isController": false}, {"data": ["/_next/image/-177", 100, 0, 0.0, 136.17999999999992, 81, 170, 145.0, 170.0, 170.0, 170.0, 51.57297576070139, 80.4820461578133, 25.585030943785455], "isController": false}, {"data": ["/_next/image/-210", 100, 0, 0.0, 508.6299999999999, 80, 3663, 185.0, 1388.0000000000005, 1682.1999999999998, 3650.4399999999937, 13.821700069108502, 138.31148496890117, 6.843361264685556], "isController": false}, {"data": ["/_next/static/chunks/pages/industries/marketing-c2c36989b4610793.js-216", 100, 0, 0.0, 476.1399999999998, 90, 1329, 478.0, 863.7000000000004, 884.8, 1326.709999999999, 10.673497705197992, 22.900072713203116, 4.909392010886968], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 100, 100.0, 1.0416666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 9600, 100, "400/Bad Request", 100, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/-220", 100, 100, "400/Bad Request", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
