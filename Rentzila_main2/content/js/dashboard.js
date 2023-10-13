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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9279153354632588, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.985, 500, 1500, "Tenders_Page/_next/static/css/3d3080c8bc25e668.css-13"], "isController": false}, {"data": [0.94, 500, 1500, "Tenders_Page/_next/image/-20"], "isController": false}, {"data": [0.995, 500, 1500, "Tenders_Page/_next/static/css/1ed373b57ebd1dab.css-12"], "isController": false}, {"data": [0.335, 500, 1500, "Tenders_Page/api/units/map-user-coords_2/-22"], "isController": false}, {"data": [0.8, 500, 1500, "Tenders_Page/api/search/-15"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/images/marker.svg-25"], "isController": false}, {"data": [0.975, 500, 1500, "Tenders_Page/_next/image/-5"], "isController": false}, {"data": [0.955, 500, 1500, "Tenders_Page/_next/image/-4"], "isController": false}, {"data": [0.97, 500, 1500, "Tenders_Page/_next/image/-7"], "isController": false}, {"data": [0.98, 500, 1500, "Tenders_Page/_next/image/-6"], "isController": false}, {"data": [0.995, 500, 1500, "Tenders_Page/tr/-14"], "isController": false}, {"data": [0.93, 500, 1500, "Tenders_Page/_next/static/chunks/pages/cookie-policy-90d9585a8ece108f.js-9"], "isController": false}, {"data": [0.93, 500, 1500, "Tenders_Page/_next/image/-19"], "isController": false}, {"data": [0.985, 500, 1500, "Tenders_Page/_next/image/-1"], "isController": false}, {"data": [0.92, 500, 1500, "Tenders_Page/_next/static/chunks/pages/terms-conditions-29dc202c23ab8359.js-10"], "isController": false}, {"data": [0.94, 500, 1500, "Tenders_Page/_next/image/-18"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/_next/static/media/arrow-down-black.c17aebad.svg-24"], "isController": false}, {"data": [0.95, 500, 1500, "Tenders_Page/_next/static/chunks/pages/privacy-policy-e1357889edfffd5b.js-8"], "isController": false}, {"data": [0.93, 500, 1500, "Tenders_Page/_next/image/-17"], "isController": false}, {"data": [0.98, 500, 1500, "Tenders_Page/_next/image/-3"], "isController": false}, {"data": [0.98, 500, 1500, "Tenders_Page/_next/image/-2"], "isController": false}, {"data": [0.96, 500, 1500, "Tenders_Page/_next/static/css/4feee06041a2ffe4.css-11"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/g/collect?v=2&tid=G-PV7K14YZR8&gtm=45je3ab0&_p=2092364945&cid=494549534.1697114460&ul=uk-ua&sr=1536x864&_eu=AEA&_s=2&sid=1697119276&sct=2&seg=0&dl=https%3A%2F%2Frentzila.com.ua%2F&dt=%D0%A1%D0%B5%D1%80%D0%B2%D1%96%D1%81%20%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D0%B5%D0%BD%D1%8C%20%D0%B2%20%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%96%20%7C%20%D0%91%D0%B5%D0%B7%D0%BA%D0%BE%D1%88%D1%82%D0%BE%D0%B2%D0%BD%D1%96%20%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D1%8F%20%7C%20rentzila.com.ua&en=scroll&epn.percent_scrolled=90&_et=7917-16"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-21-0"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-21-1"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-21"], "isController": false}, {"data": [0.76, 500, 1500, "Tenders_Page/api/units/map/-23"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-14-1"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-14-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2504, 0, 0.0, 280.2751597444094, 14, 1950, 184.0, 604.5, 903.75, 1640.749999999999, 201.62653997906432, 855.9216850189226, 121.79226072449472], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Tenders_Page/_next/static/css/3d3080c8bc25e668.css-13", 100, 0, 0.0, 199.07999999999998, 86, 594, 158.0, 439.10000000000025, 483.94999999999976, 593.6999999999998, 18.224895206852562, 24.649882677237105, 7.261481683980317], "isController": false}, {"data": ["Tenders_Page/_next/image/-20", 100, 0, 0.0, 260.9100000000001, 48, 900, 150.5, 639.2000000000004, 890.0, 899.98, 17.208742040956807, 102.14127839442438, 8.806035966270866], "isController": false}, {"data": ["Tenders_Page/_next/static/css/1ed373b57ebd1dab.css-12", 100, 0, 0.0, 167.0899999999999, 104, 548, 145.0, 242.9, 392.69999999999834, 547.0599999999995, 17.998560115190784, 21.900591702663785, 7.1713012958963285], "isController": false}, {"data": ["Tenders_Page/api/units/map-user-coords_2/-22", 100, 0, 0.0, 1250.0300000000002, 446, 1950, 1234.0, 1720.4, 1778.5499999999997, 1948.9299999999994, 16.561775422325272, 214.42970561444187, 8.458797408082146], "isController": false}, {"data": ["Tenders_Page/api/search/-15", 100, 0, 0.0, 464.29000000000013, 170, 1051, 451.5, 657.9, 666.8, 1050.83, 14.738393515106853, 22.64012988209285, 6.045044215180545], "isController": false}, {"data": ["Tenders_Page/images/marker.svg-25", 100, 0, 0.0, 88.96000000000004, 44, 219, 56.0, 192.0, 195.0, 218.82999999999993, 20.622808826562178, 22.193686842647967, 8.498852856259022], "isController": false}, {"data": ["Tenders_Page/_next/image/-5", 100, 0, 0.0, 193.77000000000004, 85, 852, 168.0, 229.0, 509.2499999999971, 851.8799999999999, 30.873726458783576, 102.14861840074097, 14.200708166100648], "isController": false}, {"data": ["Tenders_Page/_next/image/-4", 100, 0, 0.0, 382.16999999999996, 218, 1252, 354.5, 493.80000000000007, 533.1999999999998, 1251.95, 44.464206313917295, 169.4329424188528, 20.53864217429969], "isController": false}, {"data": ["Tenders_Page/_next/image/-7", 100, 0, 0.0, 186.26999999999992, 71, 878, 174.5, 212.0, 516.8499999999999, 876.9299999999995, 26.82403433476395, 81.70328426770386, 12.521375402360514], "isController": false}, {"data": ["Tenders_Page/_next/image/-6", 100, 0, 0.0, 181.57, 59, 921, 146.0, 250.70000000000002, 264.9, 920.97, 43.72540445999125, 167.98412221250547, 20.19737920857018], "isController": false}, {"data": ["Tenders_Page/tr/-14", 100, 0, 0.0, 227.51, 87, 1205, 213.0, 296.70000000000005, 348.95, 1196.6499999999958, 17.44591765526867, 6.5665820721388695, 60.40325284586532], "isController": false}, {"data": ["Tenders_Page/_next/static/chunks/pages/cookie-policy-90d9585a8ece108f.js-9", 100, 0, 0.0, 310.61999999999995, 89, 1096, 221.0, 943.6, 995.2499999999998, 1095.93, 20.39983680130559, 126.16302975826193, 9.084302325581396], "isController": false}, {"data": ["Tenders_Page/_next/image/-19", 100, 0, 0.0, 318.91, 77, 1065, 264.5, 804.4000000000003, 902.9499999999996, 1064.8, 16.835016835016834, 144.64534669612794, 8.302425294612794], "isController": false}, {"data": ["Tenders_Page/_next/image/-1", 100, 0, 0.0, 159.13000000000002, 48, 879, 133.5, 231.0, 265.24999999999983, 878.99, 47.125353440150796, 141.6521854382658, 21.675821748350614], "isController": false}, {"data": ["Tenders_Page/_next/static/chunks/pages/terms-conditions-29dc202c23ab8359.js-10", 100, 0, 0.0, 371.2900000000001, 210, 1010, 305.0, 695.7000000000002, 753.8999999999997, 1009.7799999999999, 18.793459875963165, 281.4399534274573, 8.424021565495208], "isController": false}, {"data": ["Tenders_Page/_next/image/-18", 100, 0, 0.0, 224.67999999999998, 55, 959, 145.0, 779.5000000000006, 867.6999999999992, 958.3599999999997, 15.6128024980484, 68.41273907103825, 7.699673106947697], "isController": false}, {"data": ["Tenders_Page/_next/static/media/arrow-down-black.c17aebad.svg-24", 100, 0, 0.0, 76.99000000000004, 42, 240, 60.0, 159.0, 185.19999999999982, 239.98, 19.65022597759874, 16.138515671055217, 8.692922234230693], "isController": false}, {"data": ["Tenders_Page/_next/static/chunks/pages/privacy-policy-e1357889edfffd5b.js-8", 100, 0, 0.0, 256.35, 86, 1151, 179.0, 772.3000000000023, 943.95, 1149.139999999999, 23.239600278875205, 158.63342072391356, 10.371579421333953], "isController": false}, {"data": ["Tenders_Page/_next/image/-17", 100, 0, 0.0, 281.0300000000001, 48, 1041, 189.5, 595.1000000000004, 889.2499999999989, 1040.93, 16.268098259313486, 118.84735440052057, 8.006954612005856], "isController": false}, {"data": ["Tenders_Page/_next/image/-3", 100, 0, 0.0, 174.70999999999995, 56, 942, 145.5, 228.70000000000013, 484.5499999999974, 940.3199999999991, 34.35245620061834, 168.435057755067, 15.867882600480934], "isController": false}, {"data": ["Tenders_Page/_next/image/-2", 100, 0, 0.0, 170.85, 64, 914, 156.0, 240.9, 243.95, 910.1299999999981, 42.7715996578272, 124.80619118905047, 19.67326507698888], "isController": false}, {"data": ["Tenders_Page/_next/static/css/4feee06041a2ffe4.css-11", 100, 0, 0.0, 224.80999999999997, 77, 733, 171.5, 480.0000000000002, 527.6499999999999, 732.1699999999996, 19.353590090961873, 23.813987807238245, 7.7111960518676215], "isController": false}, {"data": ["Tenders_Page/g/collect?v=2&tid=G-PV7K14YZR8&gtm=45je3ab0&_p=2092364945&cid=494549534.1697114460&ul=uk-ua&sr=1536x864&_eu=AEA&_s=2&sid=1697119276&sct=2&seg=0&dl=https%3A%2F%2Frentzila.com.ua%2F&dt=%D0%A1%D0%B5%D1%80%D0%B2%D1%96%D1%81%20%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D0%B5%D0%BD%D1%8C%20%D0%B2%20%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%96%20%7C%20%D0%91%D0%B5%D0%B7%D0%BA%D0%BE%D1%88%D1%82%D0%BE%D0%B2%D0%BD%D1%96%20%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D1%8F%20%7C%20rentzila.com.ua&en=scroll&epn.percent_scrolled=90&_et=7917-16", 100, 0, 0.0, 313.58000000000004, 189, 456, 314.0, 402.8, 411.0, 455.67999999999984, 17.073587160662456, 7.169572733481304, 17.2403214102783], "isController": false}, {"data": ["Tenders_Page/tr/-21-0", 1, 0, 0.0, 26.0, 26, 26, 26.0, 26.0, 26.0, 26.0, 38.46153846153847, 29.10907451923077, 23.700420673076923], "isController": false}, {"data": ["Tenders_Page/tr/-21-1", 1, 0, 0.0, 29.0, 29, 29, 29.0, 29.0, 29.0, 29.0, 34.48275862068965, 12.021821120689655, 21.619073275862068], "isController": false}, {"data": ["Tenders_Page/tr/-21", 100, 0, 0.0, 36.68, 14, 146, 26.0, 59.0, 101.34999999999962, 145.90999999999997, 19.171779141104295, 6.829010196990031, 11.934058066526074], "isController": false}, {"data": ["Tenders_Page/api/units/map/-23", 100, 0, 0.0, 493.6500000000001, 132, 919, 473.0, 782.9, 795.8499999999999, 919.0, 18.066847335140018, 106.7602472899729, 8.063036359530262], "isController": false}, {"data": ["Tenders_Page/tr/-14-1", 1, 0, 0.0, 98.0, 98, 98, 98.0, 98.0, 98.0, 98.0, 10.204081632653061, 3.7866709183673466, 4.195232780612245], "isController": false}, {"data": ["Tenders_Page/tr/-14-0", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 163.0, 6.134969325153374, 3.253211273006135, 21.340586656441715], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2504, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
