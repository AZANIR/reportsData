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

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.707867412140575, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.71, 500, 1500, "Tenders_Page/_next/static/css/3d3080c8bc25e668.css-13"], "isController": false}, {"data": [0.84, 500, 1500, "Tenders_Page/_next/image/-20"], "isController": false}, {"data": [0.825, 500, 1500, "Tenders_Page/_next/static/css/1ed373b57ebd1dab.css-12"], "isController": false}, {"data": [0.105, 500, 1500, "Tenders_Page/api/units/map-user-coords_2/-22"], "isController": false}, {"data": [0.36, 500, 1500, "Tenders_Page/api/search/-15"], "isController": false}, {"data": [0.97, 500, 1500, "Tenders_Page/images/marker.svg-25"], "isController": false}, {"data": [0.805, 500, 1500, "Tenders_Page/_next/image/-5"], "isController": false}, {"data": [0.385, 500, 1500, "Tenders_Page/_next/image/-4"], "isController": false}, {"data": [0.87, 500, 1500, "Tenders_Page/_next/image/-7"], "isController": false}, {"data": [0.79, 500, 1500, "Tenders_Page/_next/image/-6"], "isController": false}, {"data": [0.37, 500, 1500, "Tenders_Page/tr/-14"], "isController": false}, {"data": [0.79, 500, 1500, "Tenders_Page/_next/static/chunks/pages/cookie-policy-90d9585a8ece108f.js-9"], "isController": false}, {"data": [0.675, 500, 1500, "Tenders_Page/_next/image/-19"], "isController": false}, {"data": [0.82, 500, 1500, "Tenders_Page/_next/image/-1"], "isController": false}, {"data": [0.695, 500, 1500, "Tenders_Page/_next/static/chunks/pages/terms-conditions-29dc202c23ab8359.js-10"], "isController": false}, {"data": [0.85, 500, 1500, "Tenders_Page/_next/image/-18"], "isController": false}, {"data": [0.965, 500, 1500, "Tenders_Page/_next/static/media/arrow-down-black.c17aebad.svg-24"], "isController": false}, {"data": [0.885, 500, 1500, "Tenders_Page/_next/static/chunks/pages/privacy-policy-e1357889edfffd5b.js-8"], "isController": false}, {"data": [0.835, 500, 1500, "Tenders_Page/_next/image/-17"], "isController": false}, {"data": [0.84, 500, 1500, "Tenders_Page/_next/image/-3"], "isController": false}, {"data": [0.815, 500, 1500, "Tenders_Page/_next/image/-2"], "isController": false}, {"data": [0.82, 500, 1500, "Tenders_Page/_next/static/css/4feee06041a2ffe4.css-11"], "isController": false}, {"data": [0.32, 500, 1500, "Tenders_Page/g/collect?v=2&tid=G-PV7K14YZR8&gtm=45je3ab0&_p=2092364945&cid=494549534.1697114460&ul=uk-ua&sr=1536x864&_eu=AEA&_s=2&sid=1697119276&sct=2&seg=0&dl=https%3A%2F%2Frentzila.com.ua%2F&dt=%D0%A1%D0%B5%D1%80%D0%B2%D1%96%D1%81%20%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D0%B5%D0%BD%D1%8C%20%D0%B2%20%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%96%20%7C%20%D0%91%D0%B5%D0%B7%D0%BA%D0%BE%D1%88%D1%82%D0%BE%D0%B2%D0%BD%D1%96%20%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D1%8F%20%7C%20rentzila.com.ua&en=scroll&epn.percent_scrolled=90&_et=7917-16"], "isController": false}, {"data": [0.905, 500, 1500, "Tenders_Page/tr/-21"], "isController": false}, {"data": [0.45, 500, 1500, "Tenders_Page/api/units/map/-23"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-14-1"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/tr/-14-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2504, 0, 0.0, 684.7284345047929, 62, 4320, 498.5, 1412.5, 1856.0, 2905.8499999999995, 110.16278046634403, 467.62306491970963, 66.6528610316762], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Tenders_Page/_next/static/css/3d3080c8bc25e668.css-13", 100, 0, 0.0, 516.75, 156, 1092, 550.5, 736.2, 766.2499999999998, 1091.8799999999999, 20.781379883624275, 28.107628065253532, 8.280081047381545], "isController": false}, {"data": ["Tenders_Page/_next/image/-20", 100, 0, 0.0, 413.61, 81, 935, 441.5, 616.6, 760.3999999999994, 934.7299999999999, 18.935807612194658, 112.4010308180269, 9.689807801552737], "isController": false}, {"data": ["Tenders_Page/_next/static/css/1ed373b57ebd1dab.css-12", 100, 0, 0.0, 452.25000000000006, 204, 1378, 431.0, 731.0, 758.9499999999998, 1372.3699999999972, 25.497195308516062, 31.024907572667004, 10.15903875573687], "isController": false}, {"data": ["Tenders_Page/api/units/map-user-coords_2/-22", 100, 0, 0.0, 2330.2400000000002, 716, 4320, 2405.5, 3461.6000000000004, 3919.9999999999973, 4318.249999999999, 12.256403971074887, 158.68691782081137, 6.259862575070474], "isController": false}, {"data": ["Tenders_Page/api/search/-15", 100, 0, 0.0, 1313.5400000000006, 506, 2314, 1406.0, 2180.8, 2217.6, 2313.71, 19.813750743015653, 30.417203289082625, 8.126733703190014], "isController": false}, {"data": ["Tenders_Page/images/marker.svg-25", 100, 0, 0.0, 177.12, 62, 1148, 109.5, 442.9, 549.4999999999994, 1147.86, 13.21178491214163, 14.218151340996169, 5.444700422777117], "isController": false}, {"data": ["Tenders_Page/_next/image/-5", 100, 0, 0.0, 528.88, 181, 1086, 419.5, 956.0000000000002, 986.9, 1085.87, 26.695141484249866, 88.32337827015483, 12.27872230379071], "isController": false}, {"data": ["Tenders_Page/_next/image/-4", 100, 0, 0.0, 1097.89, 504, 1796, 1097.0, 1695.9, 1773.3999999999996, 1795.97, 36.218761318362915, 138.01328775805868, 16.729955179282868], "isController": false}, {"data": ["Tenders_Page/_next/image/-7", 100, 0, 0.0, 479.5299999999998, 172, 1185, 424.0, 817.5000000000006, 953.6499999999987, 1183.3999999999992, 27.670171555063643, 84.28053230492529, 12.916349612617598], "isController": false}, {"data": ["Tenders_Page/_next/image/-6", 100, 0, 0.0, 536.7200000000001, 266, 1031, 404.5, 844.8, 959.75, 1030.4199999999996, 30.95017022593624, 118.90426725471991, 14.296318864128754], "isController": false}, {"data": ["Tenders_Page/tr/-14", 100, 0, 0.0, 1363.7900000000002, 404, 3470, 1310.5, 1717.7000000000003, 2059.6499999999974, 3469.1399999999994, 16.07717041800643, 6.136957395498393, 55.75072849678457], "isController": false}, {"data": ["Tenders_Page/_next/static/chunks/pages/cookie-policy-90d9585a8ece108f.js-9", 100, 0, 0.0, 486.25, 178, 1521, 447.5, 656.4000000000001, 729.75, 1513.8499999999963, 28.10567734682406, 173.82153773187184, 12.515809443507589], "isController": false}, {"data": ["Tenders_Page/_next/image/-19", 100, 0, 0.0, 577.2199999999999, 294, 958, 555.0, 817.1000000000001, 903.9499999999998, 957.97, 17.879492222420883, 153.61940986500983, 8.817523019846236], "isController": false}, {"data": ["Tenders_Page/_next/image/-1", 100, 0, 0.0, 548.52, 238, 1079, 379.0, 993.7, 1024.3999999999999, 1078.98, 32.22687721559781, 96.86946100547857, 14.823104656783757], "isController": false}, {"data": ["Tenders_Page/_next/static/chunks/pages/terms-conditions-29dc202c23ab8359.js-10", 100, 0, 0.0, 564.1799999999998, 209, 1157, 532.0, 774.0, 833.55, 1153.9899999999984, 26.925148088314486, 403.2185543719709, 12.068987277867528], "isController": false}, {"data": ["Tenders_Page/_next/image/-18", 100, 0, 0.0, 461.29, 190, 816, 463.0, 657.3000000000003, 681.9, 814.9999999999995, 19.10949742021785, 83.7333762301739, 9.424117380087905], "isController": false}, {"data": ["Tenders_Page/_next/static/media/arrow-down-black.c17aebad.svg-24", 100, 0, 0.0, 214.30999999999995, 64, 1132, 147.0, 433.9, 621.8999999999997, 1130.479999999999, 13.579576317218903, 11.152757502715916, 6.00737116376969], "isController": false}, {"data": ["Tenders_Page/_next/static/chunks/pages/privacy-policy-e1357889edfffd5b.js-8", 100, 0, 0.0, 449.65, 247, 1090, 418.0, 623.5, 640.8499999999999, 1086.3799999999983, 29.32551319648094, 200.1809934017595, 13.087655791788857], "isController": false}, {"data": ["Tenders_Page/_next/image/-17", 100, 0, 0.0, 459.3500000000001, 243, 891, 433.0, 648.8, 684.4999999999999, 890.1699999999996, 18.81821603312006, 137.48103476665412, 9.26209070380128], "isController": false}, {"data": ["Tenders_Page/_next/image/-3", 100, 0, 0.0, 481.09999999999974, 185, 1028, 396.5, 849.2, 914.4499999999996, 1027.5299999999997, 26.932399676811205, 132.0550262590897, 12.44045414758955], "isController": false}, {"data": ["Tenders_Page/_next/image/-2", 100, 0, 0.0, 536.7300000000002, 247, 1087, 385.0, 959.8, 974.0, 1086.3699999999997, 29.824038174768862, 87.02561139278258, 13.717892558902475], "isController": false}, {"data": ["Tenders_Page/_next/static/css/4feee06041a2ffe4.css-11", 100, 0, 0.0, 458.02000000000004, 157, 1041, 451.5, 617.0, 732.6499999999999, 1038.2199999999984, 27.19608376393799, 33.463931193908074, 10.835939624694044], "isController": false}, {"data": ["Tenders_Page/g/collect?v=2&tid=G-PV7K14YZR8&gtm=45je3ab0&_p=2092364945&cid=494549534.1697114460&ul=uk-ua&sr=1536x864&_eu=AEA&_s=2&sid=1697119276&sct=2&seg=0&dl=https%3A%2F%2Frentzila.com.ua%2F&dt=%D0%A1%D0%B5%D1%80%D0%B2%D1%96%D1%81%20%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D0%B5%D0%BD%D1%8C%20%D0%B2%20%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%96%20%7C%20%D0%91%D0%B5%D0%B7%D0%BA%D0%BE%D1%88%D1%82%D0%BE%D0%B2%D0%BD%D1%96%20%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D1%8F%20%7C%20rentzila.com.ua&en=scroll&epn.percent_scrolled=90&_et=7917-16", 100, 0, 0.0, 1247.2600000000002, 534, 1965, 1333.0, 1774.9, 1880.6499999999999, 1964.4899999999998, 18.070112034694613, 7.588035327069028, 18.24657797253343], "isController": false}, {"data": ["Tenders_Page/tr/-21", 100, 0, 0.0, 334.62, 66, 582, 301.0, 552.0, 554.0, 582.0, 20.601565718994642, 7.182381798516687, 12.694910125669551], "isController": false}, {"data": ["Tenders_Page/api/units/map/-23", 100, 0, 0.0, 1096.21, 339, 2380, 857.5, 2078.1, 2132.65, 2378.159999999999, 14.81700992739665, 87.5274346199437, 6.612669469551045], "isController": false}, {"data": ["Tenders_Page/tr/-14-1", 2, 0, 0.0, 158.5, 67, 250, 158.5, 250.0, 250.0, 250.0, 0.8113590263691683, 0.30109026369168357, 0.33357631845841784], "isController": false}, {"data": ["Tenders_Page/tr/-14-0", 2, 0, 0.0, 870.0, 671, 1069, 870.0, 1069.0, 1069.0, 1069.0, 0.5768676088837611, 0.30646091721949814, 1.9846724473608306], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2504, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
