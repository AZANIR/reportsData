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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.35205935796486976, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Tenders_Page/tr/-116-0"], "isController": false}, {"data": [0.52, 500, 1500, "Tenders_Page/maps/streets/256/9/302/171.png-149"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-116-1"], "isController": false}, {"data": [0.465, 500, 1500, "Tenders_Page/maps/streets/256/7/75/43.png-125"], "isController": false}, {"data": [0.6, 500, 1500, "Tenders_Page/maps/streets/256/9/299/169.png-153"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/maps/streets/256/9/300/177.png-114"], "isController": false}, {"data": [0.455, 500, 1500, "Tenders_Page/maps/streets/256/9/301/171.png-143"], "isController": false}, {"data": [0.495, 500, 1500, "Tenders_Page/maps/streets/256/9/300/169.png-147"], "isController": false}, {"data": [0.56, 500, 1500, "Tenders_Page/maps/streets/256/9/299/171.png-154"], "isController": false}, {"data": [0.505, 500, 1500, "Tenders_Page/maps/streets/256/9/302/169.png-148"], "isController": false}, {"data": [0.54, 500, 1500, "Tenders_Page/maps/streets/256/9/301/177.png-115"], "isController": false}, {"data": [0.53, 500, 1500, "Tenders_Page/maps/streets/256/9/301/169.png-146"], "isController": false}, {"data": [0.23, 500, 1500, "Tenders_Page/maps/streets/256/7/76/45.png-141"], "isController": false}, {"data": [0.13, 500, 1500, "Tenders_Page/maps/streets/256/7/75/42.png-132"], "isController": false}, {"data": [0.06, 500, 1500, "Tenders_Page/maps/streets/256/7/74/42.png-128"], "isController": false}, {"data": [0.115, 500, 1500, "Tenders_Page/maps/streets/256/7/72/42.png-137"], "isController": false}, {"data": [0.0, 500, 1500, "Tenders_Page/maps/streets/256/9/296/175.png-93"], "isController": false}, {"data": [0.535, 500, 1500, "Tenders_Page/maps/streets/256/9/303/170.png-152"], "isController": false}, {"data": [0.265, 500, 1500, "Tenders_Page/maps/streets/256/7/73/44.png-124"], "isController": false}, {"data": [0.14, 500, 1500, "Tenders_Page/maps/streets/256/7/75/45.png-133"], "isController": false}, {"data": [0.485, 500, 1500, "Tenders_Page/maps/streets/256/9/296/177.png-97"], "isController": false}, {"data": [0.45, 500, 1500, "Tenders_Page/maps/streets/256/9/294/175.png-103"], "isController": false}, {"data": [0.0, 500, 1500, "Tenders_Page/maps/streets/256/9/297/175.png-95"], "isController": false}, {"data": [0.23, 500, 1500, "Tenders_Page/maps/streets/256/9/294/177.png-107"], "isController": false}, {"data": [0.06, 500, 1500, "Tenders_Page/maps/streets/256/7/76/43.png-135"], "isController": false}, {"data": [0.03, 500, 1500, "Tenders_Page/maps/streets/256/7/73/42.png-130"], "isController": false}, {"data": [0.24, 500, 1500, "Tenders_Page/maps/streets/256/7/72/44.png-136"], "isController": false}, {"data": [0.715, 500, 1500, "Tenders_Page/maps/streets/256/9/303/169.png-155"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/tr/-119-1"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/tr/-119-0"], "isController": false}, {"data": [0.185, 500, 1500, "Tenders_Page/maps/streets/256/7/74/44.png-127"], "isController": false}, {"data": [0.34, 500, 1500, "Tenders_Page/maps/streets/256/7/75/44.png-123"], "isController": false}, {"data": [0.05, 500, 1500, "Tenders_Page/maps/streets/256/7/73/45.png-131"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/maps/streets/256/9/297/177.png-102"], "isController": false}, {"data": [0.36, 500, 1500, "Tenders_Page/maps/streets/256/9/295/177.png-101"], "isController": false}, {"data": [0.315, 500, 1500, "Tenders_Page/maps/streets/256/9/301/170.png-142"], "isController": false}, {"data": [0.37, 500, 1500, "Tenders_Page/maps/streets/256/9/300/170.png-144"], "isController": false}, {"data": [0.455, 500, 1500, "Tenders_Page/maps/streets/256/9/298/175.png-104"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/maps/streets/256/9/301/176.png-112"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/maps/streets/256/9/302/170.png-145"], "isController": false}, {"data": [0.205, 500, 1500, "Tenders_Page/maps/streets/256/7/72/45.png-140"], "isController": false}, {"data": [0.425, 500, 1500, "Tenders_Page/maps/streets/256/9/295/175.png-91"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/maps/streets/256/9/299/175.png-109"], "isController": false}, {"data": [0.085, 500, 1500, "Tenders_Page/maps/streets/256/7/73/43.png-126"], "isController": false}, {"data": [0.035, 500, 1500, "Tenders_Page/maps/streets/256/9/295/176.png-92"], "isController": false}, {"data": [0.37, 500, 1500, "Tenders_Page/maps/streets/256/9/298/177.png-108"], "isController": false}, {"data": [0.495, 500, 1500, "Tenders_Page/maps/streets/256/9/295/174.png-99"], "isController": false}, {"data": [0.29, 500, 1500, "Tenders_Page/dns-query-120"], "isController": false}, {"data": [0.77, 500, 1500, "Tenders_Page/dns-query-121"], "isController": false}, {"data": [0.01, 500, 1500, "Tenders_Page/maps/streets/256/9/296/176.png-94"], "isController": false}, {"data": [0.49, 500, 1500, "Tenders_Page/maps/streets/256/9/299/177.png-113"], "isController": false}, {"data": [0.055, 500, 1500, "Tenders_Page/maps/streets/256/7/72/43.png-134"], "isController": false}, {"data": [0.09, 500, 1500, "Tenders_Page/maps/streets/256/7/76/42.png-139"], "isController": false}, {"data": [0.515, 500, 1500, "Tenders_Page/maps/streets/256/9/300/171.png-150"], "isController": false}, {"data": [0.695, 500, 1500, "Tenders_Page/tr/-119"], "isController": false}, {"data": [0.635, 500, 1500, "Tenders_Page/tr/-118"], "isController": false}, {"data": [0.28, 500, 1500, "Tenders_Page/maps/streets/256/9/296/174.png-98"], "isController": false}, {"data": [0.585, 500, 1500, "Tenders_Page/tr/-117"], "isController": false}, {"data": [0.225, 500, 1500, "Tenders_Page/tr/-116"], "isController": false}, {"data": [0.505, 500, 1500, "Tenders_Page/maps/streets/256/9/299/170.png-151"], "isController": false}, {"data": [0.495, 500, 1500, "Tenders_Page/maps/streets/256/9/300/175.png-110"], "isController": false}, {"data": [0.0, 500, 1500, "Tenders_Page/maps/streets/256/9/297/176.png-96"], "isController": false}, {"data": [0.07, 500, 1500, "Tenders_Page/maps/streets/256/9/294/176.png-105"], "isController": false}, {"data": [0.59, 500, 1500, "Tenders_Page/maps/streets/256/7/74/43.png-122"], "isController": false}, {"data": [0.515, 500, 1500, "Tenders_Page/maps/streets/256/9/301/175.png-111"], "isController": false}, {"data": [0.105, 500, 1500, "Tenders_Page/maps/streets/256/7/74/45.png-129"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/maps/streets/256/9/294/174.png-106"], "isController": false}, {"data": [0.665, 500, 1500, "Tenders_Page/maps/streets/256/9/303/171.png-156"], "isController": false}, {"data": [0.1, 500, 1500, "Tenders_Page/maps/streets/256/7/76/44.png-138"], "isController": false}, {"data": [0.5, 500, 1500, "Tenders_Page/maps/streets/256/9/297/174.png-100"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 6604, 0, 0.0, 1461.350847970926, 84, 9376, 1316.0, 2397.5, 2976.0, 4495.799999999999, 64.1650958978644, 1006.3250264763608, 38.70451311126387], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Tenders_Page/tr/-116-0", 1, 0, 0.0, 2649.0, 2649, 2649, 2649.0, 2649.0, 2649.0, 2649.0, 0.3775009437523594, 0.20054737636844092, 1.1181253539071347], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/302/171.png-149", 100, 0, 0.0, 860.22, 133, 1219, 881.5, 1062.7, 1123.2499999999998, 1218.81, 9.267840593141797, 94.09030352177943, 4.081832136237257], "isController": false}, {"data": ["Tenders_Page/tr/-116-1", 1, 0, 0.0, 365.0, 365, 365, 365.0, 365.0, 365.0, 365.0, 2.73972602739726, 1.016695205479452, 1.1263912671232876], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/75/43.png-125", 100, 0, 0.0, 993.7999999999997, 254, 3822, 829.0, 1736.0, 1773.9999999999998, 3815.669999999997, 5.639521768554027, 101.91893539927814, 2.4727981192194903], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/169.png-153", 100, 0, 0.0, 764.7599999999998, 84, 1160, 858.0, 1062.8, 1112.1999999999998, 1159.6899999999998, 11.774402449075708, 188.60890954315317, 5.185796391145649], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/177.png-114", 100, 0, 0.0, 1042.8199999999997, 727, 1378, 1034.0, 1247.8, 1299.9999999999998, 1377.6499999999999, 18.20830298616169, 226.25238983976692, 8.01947719410051], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/171.png-143", 100, 0, 0.0, 1177.3200000000002, 658, 1649, 1138.0, 1497.9, 1564.2999999999997, 1648.7499999999998, 6.730380939561179, 85.92409181922197, 2.964259573966886], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/169.png-147", 100, 0, 0.0, 1069.2699999999998, 574, 1553, 1082.5, 1373.0, 1450.1499999999999, 1552.3799999999997, 7.014590347923681, 77.89346371703142, 3.089433834876543], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/171.png-154", 100, 0, 0.0, 818.1199999999999, 215, 1174, 879.0, 1053.0, 1089.2999999999997, 1173.95, 11.906179307060365, 168.79102050839387, 5.243834831527563], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/302/169.png-148", 100, 0, 0.0, 956.0699999999998, 464, 1218, 992.5, 1097.9, 1129.0499999999997, 1217.8899999999999, 8.151952392598027, 90.8258055147958, 3.5903618447868264], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/177.png-115", 100, 0, 0.0, 926.7600000000006, 299, 1337, 973.5, 1223.0, 1242.0, 1336.81, 23.326335432703523, 245.95160514345696, 10.273610625145789], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/169.png-146", 100, 0, 0.0, 834.8200000000002, 127, 1202, 864.5, 1056.9, 1160.0499999999993, 1202.0, 10.235414534288639, 120.57598196008189, 4.507980424769704], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/76/45.png-141", 100, 0, 0.0, 1510.6499999999994, 929, 1975, 1528.0, 1827.7, 1872.95, 1974.4999999999998, 5.8031569173630455, 74.67030814763231, 2.5445482967734447], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/75/42.png-132", 100, 0, 0.0, 2030.51, 1218, 4349, 1573.5, 3066.7000000000003, 3687.599999999997, 4348.8099999999995, 3.6085450346420322, 67.70603100642322, 1.5822624224162818], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/74/42.png-128", 100, 0, 0.0, 1915.3900000000003, 1334, 4114, 1677.0, 2828.7000000000003, 3165.9499999999975, 4111.079999999998, 3.5494977460689316, 114.37424573172896, 1.556371570297803], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/72/42.png-137", 100, 0, 0.0, 1868.8999999999996, 955, 4459, 1661.5, 2938.3, 2985.95, 4447.049999999994, 4.788125448886761, 123.08381463969356, 2.099480787646636], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/296/175.png-93", 100, 0, 0.0, 4818.019999999998, 3291, 9285, 4871.5, 5847.2, 6086.2, 9282.769999999999, 10.66894270777766, 222.35993678651448, 4.698919102741919], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/303/170.png-152", 100, 0, 0.0, 838.9700000000001, 103, 2250, 843.0, 1107.5, 1200.95, 2239.829999999995, 11.135857461024498, 167.30973343541203, 4.904562221603563], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/73/44.png-124", 100, 0, 0.0, 1370.3500000000004, 683, 3047, 1421.5, 1967.1000000000001, 2065.75, 3046.84, 4.494180036852276, 123.48461866882387, 1.9705926138151093], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/75/45.png-133", 100, 0, 0.0, 2149.66, 1314, 4276, 1761.0, 3770.2, 4065.7, 4275.259999999999, 3.578713810256594, 44.43686142325448, 1.5691821296925883], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/296/177.png-97", 100, 0, 0.0, 1330.1399999999996, 1095, 3431, 1333.5, 1395.8, 1462.0, 3412.4999999999905, 16.753224995811696, 295.89729226001003, 7.378617649522533], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/294/175.png-103", 100, 0, 0.0, 1352.7799999999997, 1070, 1883, 1345.0, 1524.1000000000001, 1719.4499999999996, 1881.9699999999996, 15.114873035066505, 201.60052335247886, 6.657038807436518], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/297/175.png-95", 100, 0, 0.0, 2473.9299999999994, 2119, 2857, 2370.0, 2819.9, 2835.85, 2856.99, 12.316787781746521, 201.18221917723858, 5.424678993718438], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/294/177.png-107", 100, 0, 0.0, 1543.0900000000004, 1131, 3008, 1526.5, 1759.2, 1830.35, 2996.419999999994, 15.467904098994586, 320.12821442382057, 6.812524168600155], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/76/43.png-135", 100, 0, 0.0, 2449.55, 1344, 4179, 2338.0, 3876.3, 4102.949999999999, 4178.97, 3.620564808110065, 61.27028082005793, 1.5875328113685734], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/73/42.png-130", 100, 0, 0.0, 2686.8299999999995, 1256, 9376, 2555.5, 3687.4, 4054.0999999999995, 9365.329999999994, 3.5973811065544283, 83.86394704655012, 1.577367301604432], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/72/44.png-136", 100, 0, 0.0, 1599.3300000000006, 1062, 3014, 1525.0, 1982.6000000000004, 2092.2499999999995, 3009.889999999998, 5.289046384936795, 123.35254469244195, 2.319122877770138], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/303/169.png-155", 100, 0, 0.0, 565.8599999999998, 84, 1063, 560.0, 912.7, 967.55, 1062.4899999999998, 15.080681646810435, 231.08493722666265, 6.641979904991706], "isController": false}, {"data": ["Tenders_Page/tr/-119-1", 1, 0, 0.0, 624.0, 624, 624, 624.0, 624.0, 624.0, 624.0, 1.6025641025641024, 0.5947015224358975, 0.658866686698718], "isController": false}, {"data": ["Tenders_Page/tr/-119-0", 1, 0, 0.0, 693.0, 693, 693, 693.0, 693.0, 693.0, 693.0, 1.443001443001443, 0.7665945165945166, 4.794034090909091], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/74/44.png-127", 100, 0, 0.0, 1578.5199999999998, 782, 3632, 1548.0, 2052.7000000000003, 2211.45, 3626.339999999997, 3.9880358923230306, 69.63874002991027, 1.7486602691924227], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/75/44.png-123", 100, 0, 0.0, 1227.2299999999998, 313, 2695, 1020.0, 2145.3000000000006, 2264.2999999999997, 2693.5299999999993, 5.123738279448686, 72.49289081313727, 2.246639147922324], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/73/45.png-131", 100, 0, 0.0, 2460.6699999999987, 1204, 7579, 2589.0, 3106.9, 3181.0999999999995, 7542.559999999981, 3.539071347678369, 105.15258374327577, 1.5517998389722536], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/297/177.png-102", 100, 0, 0.0, 1280.2099999999996, 989, 1473, 1310.0, 1388.5, 1437.75, 1472.99, 17.812611328820807, 285.78456203241893, 7.845202841111507], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/295/177.png-101", 100, 0, 0.0, 1408.2500000000002, 1118, 1693, 1412.0, 1576.2, 1632.6499999999999, 1692.6699999999998, 17.179178835251676, 349.40503672049476, 7.56622036591651], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/170.png-142", 100, 0, 0.0, 1376.4399999999998, 776, 1902, 1447.0, 1742.9, 1846.9999999999995, 1901.6, 6.190034045187248, 61.82780099040544, 2.7262747601361808], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/170.png-144", 100, 0, 0.0, 1290.6100000000001, 798, 1788, 1287.0, 1652.6, 1678.35, 1787.7199999999998, 6.498570314530803, 110.85012469131792, 2.8621632928255782], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/298/175.png-104", 100, 0, 0.0, 1379.9699999999998, 1183, 3639, 1363.5, 1474.8, 1545.6499999999999, 3619.99999999999, 15.840329478853159, 271.837997980358, 6.976551362268335], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/176.png-112", 100, 0, 0.0, 1201.8400000000006, 737, 1394, 1230.5, 1355.4, 1367.0, 1393.9099999999999, 19.06941266209001, 264.364631006865, 8.398735459572846], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/302/170.png-145", 100, 0, 0.0, 1025.3600000000004, 539, 1379, 1061.5, 1199.6, 1250.4499999999998, 1378.0599999999995, 7.4128984432913265, 106.28532709414381, 3.2648605448480357], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/72/45.png-140", 100, 0, 0.0, 1514.5800000000004, 783, 1978, 1591.5, 1827.7, 1884.9499999999998, 1977.93, 6.029544769369913, 176.53494309617122, 2.6438140639131746], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/295/175.png-91", 100, 0, 0.0, 1398.9699999999996, 1123, 2739, 1334.5, 1539.3, 2278.6499999999924, 2738.3499999999995, 20.30456852791878, 344.42417512690355, 8.942734771573605], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/175.png-109", 100, 0, 0.0, 1057.9799999999996, 717, 1401, 1032.5, 1309.9, 1349.9, 1400.96, 18.56665428889714, 308.3986550779799, 8.177305746379503], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/73/43.png-126", 100, 0, 0.0, 1814.0699999999995, 993, 3692, 1770.0, 2235.6, 2676.5999999999985, 3686.9799999999973, 3.68908400044269, 76.06934440365957, 1.6175768712878593], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/295/176.png-92", 100, 0, 0.0, 1728.49, 1157, 2887, 1755.5, 1848.8, 1873.75, 2884.7299999999987, 18.70557426112982, 331.8047371866816, 8.238490226337449], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/298/177.png-108", 100, 0, 0.0, 1404.2199999999996, 1023, 3311, 1361.0, 1626.1000000000001, 1697.6, 3295.7699999999923, 17.001020061203672, 268.3969631927916, 7.487753952737164], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/295/174.png-99", 100, 0, 0.0, 1313.0900000000004, 1075, 1513, 1325.5, 1437.4, 1456.0, 1512.7299999999998, 17.373175816539263, 274.17043085476024, 7.651662395760945], "isController": false}, {"data": ["Tenders_Page/dns-query-120", 100, 0, 0.0, 1762.84, 716, 9150, 1330.0, 2814.100000000001, 5071.09999999999, 9123.699999999986, 7.459903021260724, 5.026692465497948, 3.445834110406565], "isController": false}, {"data": ["Tenders_Page/dns-query-121", 100, 0, 0.0, 549.8500000000001, 87, 1983, 261.5, 1399.5000000000023, 1601.95, 1981.3899999999992, 7.549448890231013, 5.087030990487694, 3.4871966065227236], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/296/176.png-94", 100, 0, 0.0, 2065.2000000000003, 1333, 2481, 2034.0, 2306.4, 2379.2, 2480.1099999999997, 15.103458692040476, 260.3724182525298, 6.652011591904546], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/177.png-113", 100, 0, 0.0, 1201.65, 780, 2240, 1212.0, 1341.0, 1395.7999999999997, 2239.5199999999995, 18.24151769427216, 281.49654551258664, 8.03410593761401], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/72/43.png-134", 100, 0, 0.0, 2583.9700000000007, 1132, 4452, 2374.0, 3927.2000000000003, 4125.65, 4450.389999999999, 3.8620476576680955, 99.63253219982235, 1.6934173811454833], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/76/42.png-139", 100, 0, 0.0, 2487.0599999999995, 1109, 4208, 2615.0, 3682.500000000001, 3982.849999999999, 4207.46, 4.0001600064002565, 58.20935962438498, 1.7539764090563623], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/171.png-150", 100, 0, 0.0, 913.7600000000001, 309, 1377, 917.0, 1098.7, 1123.9, 1374.969999999999, 8.647526807333103, 101.38887387582152, 3.808627529401591], "isController": false}, {"data": ["Tenders_Page/tr/-119", 100, 0, 0.0, 593.9700000000001, 210, 3082, 572.0, 747.8, 1582.9999999999968, 3071.599999999995, 16.051364365971107, 6.041833868378812, 51.42032629414125], "isController": false}, {"data": ["Tenders_Page/tr/-118", 100, 0, 0.0, 665.2600000000001, 148, 2487, 665.5, 777.8, 1641.4499999999966, 2485.2599999999993, 20.627062706270628, 7.654574051155116, 63.709825572400995], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/296/174.png-98", 100, 0, 0.0, 1473.6499999999999, 1117, 1716, 1492.0, 1587.8, 1592.0, 1715.97, 16.719612104999165, 302.9450029259321, 7.363813534525999], "isController": false}, {"data": ["Tenders_Page/tr/-117", 100, 0, 0.0, 671.03, 254, 2762, 585.0, 1080.2, 1278.6999999999998, 2759.8599999999988, 21.810250817884405, 8.09364776444929, 67.41710400763358], "isController": false}, {"data": ["Tenders_Page/tr/-116", 100, 0, 0.0, 1918.7099999999996, 912, 3971, 1762.5, 2937.5, 3078.45, 3965.279999999997, 15.671524839366871, 5.898859896567936, 48.12152900211566], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/170.png-151", 100, 0, 0.0, 965.36, 496, 1231, 975.5, 1152.2, 1171.95, 1230.83, 7.807620237351655, 121.6967056722361, 3.4387077412554654], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/175.png-110", 100, 0, 0.0, 1232.42, 931, 2122, 1260.0, 1359.9, 1374.3999999999999, 2114.7999999999965, 19.09125620465827, 331.7478641657121, 8.408356004200076], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/297/176.png-96", 100, 0, 0.0, 2273.269999999999, 1695, 2478, 2306.0, 2394.7, 2403.9, 2477.45, 13.39764201500536, 257.23734341505894, 5.90071928590568], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/294/176.png-105", 100, 0, 0.0, 1669.2800000000002, 1011, 1911, 1717.5, 1835.8, 1852.6999999999998, 1910.77, 16.25223468226881, 320.013484275963, 7.157966642288315], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/74/43.png-122", 100, 0, 0.0, 864.0700000000003, 140, 2250, 668.0, 1967.4, 2158.8999999999996, 2249.56, 6.685385746757588, 123.79062416432679, 2.9313849612247624], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/175.png-111", 100, 0, 0.0, 1142.9999999999998, 285, 1402, 1185.5, 1281.8, 1307.6499999999999, 1401.6499999999999, 21.88662727073758, 412.6826165462902, 9.63952040927993], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/74/45.png-129", 100, 0, 0.0, 1778.87, 1282, 4045, 1580.5, 2268.5, 2974.2499999999995, 4038.539999999997, 3.622794623772778, 73.3545153606492, 1.5885105332753686], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/294/174.png-106", 100, 0, 0.0, 1217.1899999999994, 941, 1470, 1225.0, 1350.9, 1379.6, 1470.0, 17.397355601948504, 273.1928496868476, 7.662311891092553], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/303/171.png-156", 100, 0, 0.0, 660.94, 88, 1163, 756.5, 986.7, 1068.95, 1162.4599999999998, 12.993762993762994, 144.32720731548858, 5.7228389747921], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/76/44.png-138", 100, 0, 0.0, 2169.4200000000005, 1048, 4071, 1815.0, 3130.8, 3480.6999999999966, 4070.4799999999996, 4.227793514564749, 67.21943965881707, 1.8537883672261448], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/297/174.png-100", 100, 0, 0.0, 1195.1100000000001, 873, 1490, 1203.5, 1350.9, 1402.95, 1489.5599999999997, 18.328445747800586, 266.06674418071844, 8.072391633064516], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 6604, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
