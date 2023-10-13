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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8561913412049652, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "Tenders_Page/tr/-116-0"], "isController": false}, {"data": [0.985, 500, 1500, "Tenders_Page/maps/streets/256/9/302/171.png-149"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-116-1"], "isController": false}, {"data": [0.77, 500, 1500, "Tenders_Page/maps/streets/256/7/75/43.png-125"], "isController": false}, {"data": [0.985, 500, 1500, "Tenders_Page/maps/streets/256/9/299/169.png-153"], "isController": false}, {"data": [0.935, 500, 1500, "Tenders_Page/maps/streets/256/9/300/177.png-114"], "isController": false}, {"data": [0.95, 500, 1500, "Tenders_Page/maps/streets/256/9/301/171.png-143"], "isController": false}, {"data": [0.95, 500, 1500, "Tenders_Page/maps/streets/256/9/300/169.png-147"], "isController": false}, {"data": [0.975, 500, 1500, "Tenders_Page/maps/streets/256/9/299/171.png-154"], "isController": false}, {"data": [0.96, 500, 1500, "Tenders_Page/maps/streets/256/9/302/169.png-148"], "isController": false}, {"data": [0.9, 500, 1500, "Tenders_Page/maps/streets/256/9/301/177.png-115"], "isController": false}, {"data": [0.96, 500, 1500, "Tenders_Page/maps/streets/256/9/301/169.png-146"], "isController": false}, {"data": [0.92, 500, 1500, "Tenders_Page/maps/streets/256/7/76/45.png-141"], "isController": false}, {"data": [0.72, 500, 1500, "Tenders_Page/maps/streets/256/7/75/42.png-132"], "isController": false}, {"data": [0.565, 500, 1500, "Tenders_Page/maps/streets/256/7/74/42.png-128"], "isController": false}, {"data": [0.775, 500, 1500, "Tenders_Page/maps/streets/256/7/72/42.png-137"], "isController": false}, {"data": [0.515, 500, 1500, "Tenders_Page/maps/streets/256/9/296/175.png-93"], "isController": false}, {"data": [0.965, 500, 1500, "Tenders_Page/maps/streets/256/9/303/170.png-152"], "isController": false}, {"data": [0.575, 500, 1500, "Tenders_Page/maps/streets/256/7/73/44.png-124"], "isController": false}, {"data": [0.92, 500, 1500, "Tenders_Page/maps/streets/256/7/75/45.png-133"], "isController": false}, {"data": [0.845, 500, 1500, "Tenders_Page/maps/streets/256/9/296/177.png-97"], "isController": false}, {"data": [0.91, 500, 1500, "Tenders_Page/maps/streets/256/9/294/175.png-103"], "isController": false}, {"data": [0.85, 500, 1500, "Tenders_Page/maps/streets/256/9/297/175.png-95"], "isController": false}, {"data": [0.85, 500, 1500, "Tenders_Page/maps/streets/256/9/294/177.png-107"], "isController": false}, {"data": [0.855, 500, 1500, "Tenders_Page/maps/streets/256/7/76/43.png-135"], "isController": false}, {"data": [0.63, 500, 1500, "Tenders_Page/maps/streets/256/7/73/42.png-130"], "isController": false}, {"data": [0.83, 500, 1500, "Tenders_Page/maps/streets/256/7/72/44.png-136"], "isController": false}, {"data": [0.975, 500, 1500, "Tenders_Page/maps/streets/256/9/303/169.png-155"], "isController": false}, {"data": [0.73, 500, 1500, "Tenders_Page/maps/streets/256/7/74/44.png-127"], "isController": false}, {"data": [0.855, 500, 1500, "Tenders_Page/maps/streets/256/7/75/44.png-123"], "isController": false}, {"data": [0.6, 500, 1500, "Tenders_Page/maps/streets/256/7/73/45.png-131"], "isController": false}, {"data": [0.845, 500, 1500, "Tenders_Page/maps/streets/256/9/297/177.png-102"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-117-1"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-117-0"], "isController": false}, {"data": [0.83, 500, 1500, "Tenders_Page/maps/streets/256/9/295/177.png-101"], "isController": false}, {"data": [0.975, 500, 1500, "Tenders_Page/maps/streets/256/9/301/170.png-142"], "isController": false}, {"data": [0.885, 500, 1500, "Tenders_Page/maps/streets/256/9/300/170.png-144"], "isController": false}, {"data": [0.855, 500, 1500, "Tenders_Page/maps/streets/256/9/298/175.png-104"], "isController": false}, {"data": [0.915, 500, 1500, "Tenders_Page/maps/streets/256/9/301/176.png-112"], "isController": false}, {"data": [0.945, 500, 1500, "Tenders_Page/maps/streets/256/9/302/170.png-145"], "isController": false}, {"data": [0.865, 500, 1500, "Tenders_Page/maps/streets/256/7/72/45.png-140"], "isController": false}, {"data": [0.8, 500, 1500, "Tenders_Page/maps/streets/256/9/295/175.png-91"], "isController": false}, {"data": [0.895, 500, 1500, "Tenders_Page/maps/streets/256/9/299/175.png-109"], "isController": false}, {"data": [0.715, 500, 1500, "Tenders_Page/maps/streets/256/7/73/43.png-126"], "isController": false}, {"data": [0.825, 500, 1500, "Tenders_Page/maps/streets/256/9/295/176.png-92"], "isController": false}, {"data": [0.885, 500, 1500, "Tenders_Page/maps/streets/256/9/298/177.png-108"], "isController": false}, {"data": [0.875, 500, 1500, "Tenders_Page/maps/streets/256/9/295/174.png-99"], "isController": false}, {"data": [0.715, 500, 1500, "Tenders_Page/dns-query-120"], "isController": false}, {"data": [0.985, 500, 1500, "Tenders_Page/dns-query-121"], "isController": false}, {"data": [0.845, 500, 1500, "Tenders_Page/maps/streets/256/9/296/176.png-94"], "isController": false}, {"data": [0.94, 500, 1500, "Tenders_Page/maps/streets/256/9/299/177.png-113"], "isController": false}, {"data": [0.725, 500, 1500, "Tenders_Page/maps/streets/256/7/72/43.png-134"], "isController": false}, {"data": [0.9, 500, 1500, "Tenders_Page/maps/streets/256/7/76/42.png-139"], "isController": false}, {"data": [0.97, 500, 1500, "Tenders_Page/maps/streets/256/9/300/171.png-150"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-119"], "isController": false}, {"data": [0.985, 500, 1500, "Tenders_Page/tr/-118"], "isController": false}, {"data": [0.88, 500, 1500, "Tenders_Page/maps/streets/256/9/296/174.png-98"], "isController": false}, {"data": [1.0, 500, 1500, "Tenders_Page/tr/-117"], "isController": false}, {"data": [0.725, 500, 1500, "Tenders_Page/tr/-116"], "isController": false}, {"data": [0.955, 500, 1500, "Tenders_Page/maps/streets/256/9/299/170.png-151"], "isController": false}, {"data": [0.905, 500, 1500, "Tenders_Page/maps/streets/256/9/300/175.png-110"], "isController": false}, {"data": [0.8, 500, 1500, "Tenders_Page/maps/streets/256/9/297/176.png-96"], "isController": false}, {"data": [0.815, 500, 1500, "Tenders_Page/maps/streets/256/9/294/176.png-105"], "isController": false}, {"data": [0.7, 500, 1500, "Tenders_Page/maps/streets/256/7/74/43.png-122"], "isController": false}, {"data": [0.835, 500, 1500, "Tenders_Page/maps/streets/256/9/301/175.png-111"], "isController": false}, {"data": [0.76, 500, 1500, "Tenders_Page/maps/streets/256/7/74/45.png-129"], "isController": false}, {"data": [0.92, 500, 1500, "Tenders_Page/maps/streets/256/9/294/174.png-106"], "isController": false}, {"data": [0.98, 500, 1500, "Tenders_Page/maps/streets/256/9/303/171.png-156"], "isController": false}, {"data": [0.96, 500, 1500, "Tenders_Page/maps/streets/256/7/76/44.png-138"], "isController": false}, {"data": [0.845, 500, 1500, "Tenders_Page/maps/streets/256/9/297/174.png-100"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 6606, 0, 0.0, 447.3521041477446, 15, 4404, 397.0, 785.0, 977.6499999999996, 1677.9500000000044, 177.0475986277873, 2860.3922351555802, 106.89305195882022], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Tenders_Page/tr/-116-0", 2, 0, 0.0, 987.0, 694, 1280, 987.0, 1280.0, 1280.0, 1280.0, 0.4982561036372695, 0.26421197683109116, 1.5390469294967613], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/302/171.png-149", 100, 0, 0.0, 333.54, 117, 850, 332.0, 442.40000000000003, 461.0, 848.6199999999993, 7.458233890214797, 75.71855422136038, 3.2848276215692125], "isController": false}, {"data": ["Tenders_Page/tr/-116-1", 2, 0, 0.0, 53.0, 15, 91, 53.0, 91.0, 91.0, 91.0, 0.7079646017699115, 0.2627212389380531, 0.29106747787610615], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/75/43.png-125", 100, 0, 0.0, 534.48, 125, 2044, 493.5, 895.4000000000001, 982.9999999999995, 2038.179999999997, 8.050881571532083, 163.41559908622494, 3.5301228765799855], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/169.png-153", 100, 0, 0.0, 325.93999999999994, 96, 810, 342.0, 416.8, 494.69999999999993, 809.0699999999995, 8.097821685966474, 129.71539952627742, 3.5665210745809377], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/177.png-114", 100, 0, 0.0, 373.01000000000005, 57, 1206, 351.5, 579.9000000000001, 711.9499999999998, 1204.9099999999994, 10.903936321011885, 135.48992748882347, 4.802417266383165], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/171.png-143", 100, 0, 0.0, 373.3400000000001, 164, 1284, 337.0, 665.9000000000013, 838.5999999999997, 1280.9199999999985, 5.933309600094933, 82.79400476148096, 2.6132056930105616], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/169.png-147", 100, 0, 0.0, 379.58000000000015, 126, 2580, 307.0, 494.0, 1138.3499999999979, 2566.8299999999936, 5.942123715015747, 65.98426637055083, 2.6170876908907243], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/171.png-154", 100, 0, 0.0, 342.43999999999994, 90, 1010, 345.0, 439.9, 510.99999999999955, 1007.0499999999985, 8.076239702794378, 119.1639703803909, 3.5570157284768213], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/302/169.png-148", 100, 0, 0.0, 353.0299999999999, 109, 995, 339.0, 460.8, 681.649999999999, 994.8199999999999, 7.0432455275390895, 78.47310415639527, 3.102054426679814], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/177.png-115", 100, 0, 0.0, 426.98, 77, 1120, 351.5, 922.8000000000001, 1028.9999999999995, 1119.92, 9.83671060397403, 103.71773866319103, 4.332379377336219], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/169.png-146", 100, 0, 0.0, 356.36999999999995, 110, 1240, 337.5, 490.10000000000014, 641.499999999999, 1237.2999999999986, 7.777864198491094, 91.62536701796687, 3.425602298358871], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/76/45.png-141", 100, 0, 0.0, 403.22999999999996, 122, 1275, 350.0, 727.2, 994.8499999999999, 1272.4999999999986, 6.183527083848627, 79.56460239920851, 2.7113316998515953], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/75/42.png-132", 100, 0, 0.0, 547.8499999999999, 117, 1715, 507.0, 831.7, 927.6999999999997, 1711.069999999998, 7.35023888276369, 175.24290242557882, 3.222907478868063], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/74/42.png-128", 100, 0, 0.0, 704.46, 161, 1868, 685.0, 929.6, 1083.049999999999, 1864.409999999998, 7.685804319422027, 247.6570305895012, 3.3700450580278227], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/72/42.png-137", 100, 0, 0.0, 529.1000000000001, 84, 3484, 492.5, 714.9, 904.3999999999994, 3459.939999999988, 6.322711178553364, 162.53195932916034, 2.7723606632524027], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/296/175.png-93", 100, 0, 0.0, 1080.1499999999996, 203, 3735, 956.0, 1948.3000000000002, 2737.1999999999994, 3731.749999999998, 21.88183807439825, 456.05682439824943, 9.637411105032822], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/303/170.png-152", 100, 0, 0.0, 354.09999999999997, 105, 952, 357.0, 492.0, 517.95, 949.4299999999987, 8.01538954793203, 120.4265314403655, 3.53021551378647], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/73/44.png-124", 100, 0, 0.0, 758.1199999999995, 146, 1876, 739.0, 1175.4, 1338.0499999999986, 1874.129999999999, 8.05607024893257, 221.35311769918633, 3.5323979900104727], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/75/45.png-133", 100, 0, 0.0, 398.4500000000001, 141, 2184, 338.5, 644.8, 918.2499999999991, 2173.0599999999945, 7.352941176470588, 91.30141314338236, 3.2240923713235294], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/296/177.png-97", 100, 0, 0.0, 490.10999999999996, 60, 2600, 357.5, 979.4000000000001, 1447.049999999997, 2598.269999999999, 13.061650992685475, 230.6963084508882, 5.752738864942529], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/294/175.png-103", 100, 0, 0.0, 406.98999999999995, 58, 1129, 384.5, 691.8000000000004, 988.8499999999997, 1128.8799999999999, 12.405408758218583, 165.46198517553654, 5.4637103026919736], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/297/175.png-95", 100, 0, 0.0, 475.0999999999999, 55, 2729, 230.5, 1329.4, 2042.4499999999987, 2726.8999999999987, 20.36245163917736, 332.5999669110161, 8.968228212176747], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/294/177.png-107", 100, 0, 0.0, 444.26999999999987, 53, 1453, 467.5, 601.5, 816.3499999999985, 1449.4499999999982, 12.109469605231292, 250.62108334342457, 5.333369914022766], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/76/43.png-135", 100, 0, 0.0, 481.86000000000007, 101, 1411, 446.5, 703.9000000000001, 869.3999999999996, 1406.989999999998, 6.847907964116962, 136.70403769773336, 3.002647144422379], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/73/42.png-130", 100, 0, 0.0, 631.41, 160, 1679, 566.5, 910.0, 998.1999999999998, 1675.2999999999981, 6.927606511950121, 214.85051524073432, 3.0375930897125043], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/72/44.png-136", 100, 0, 0.0, 516.6299999999998, 142, 1571, 480.5, 763.8, 816.8999999999997, 1565.219999999997, 6.251172094767769, 145.7914960617616, 2.7409924517096957], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/303/169.png-155", 100, 0, 0.0, 282.86, 86, 966, 249.0, 417.8, 514.7499999999995, 964.8399999999995, 8.401949252226517, 128.74510323895146, 3.7004678835489835], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/74/44.png-127", 100, 0, 0.0, 555.6600000000001, 69, 1149, 507.5, 871.8000000000002, 979.5499999999995, 1148.8999999999999, 8.123476848090982, 165.36511220552396, 3.5619542038992686], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/75/44.png-123", 100, 0, 0.0, 476.08000000000004, 57, 1284, 404.0, 827.4000000000001, 981.5999999999995, 1283.1699999999996, 8.044405116241654, 113.81576301182528, 3.5272831027270537], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/73/45.png-131", 100, 0, 0.0, 655.0600000000001, 111, 2035, 603.0, 977.0, 1000.55, 2026.979999999996, 7.091192738618635, 210.69290925046093, 3.1093218160544605], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/297/177.png-102", 100, 0, 0.0, 457.25, 132, 1864, 427.5, 801.2000000000003, 938.6999999999995, 1860.7099999999982, 12.169891687963977, 195.25307670074235, 5.359981593038822], "isController": false}, {"data": ["Tenders_Page/tr/-117-1", 1, 0, 0.0, 155.0, 155, 155, 155.0, 155.0, 155.0, 155.0, 6.451612903225806, 2.3941532258064515, 2.652469758064516], "isController": false}, {"data": ["Tenders_Page/tr/-117-0", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 79.0, 12.658227848101266, 6.712321993670886, 37.838706487341774], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/295/177.png-101", 100, 0, 0.0, 452.2999999999997, 60, 2634, 421.5, 761.5000000000006, 984.2499999999995, 2627.859999999997, 12.629451881788329, 256.8687444746148, 5.5623855455923215], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/170.png-142", 100, 0, 0.0, 324.73999999999995, 120, 2874, 290.5, 386.70000000000005, 478.95, 2853.7699999999895, 5.991611743559018, 62.38537531830437, 2.638883687837028], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/170.png-144", 100, 0, 0.0, 464.88000000000017, 217, 1739, 384.5, 849.0, 977.7999999999986, 1731.8499999999963, 5.971931919976113, 107.88557451851298, 2.630216109286354], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/298/175.png-104", 100, 0, 0.0, 412.86, 62, 1129, 427.5, 619.4000000000001, 811.5999999999999, 1128.6499999999999, 12.971851083149565, 222.61165926190168, 5.7131883188481], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/176.png-112", 100, 0, 0.0, 407.7, 74, 1194, 380.0, 596.8000000000001, 882.0499999999979, 1192.8199999999995, 9.712509712509712, 134.64725378787878, 4.277677617521368], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/302/170.png-145", 100, 0, 0.0, 404.23000000000013, 147, 1886, 364.5, 466.20000000000005, 733.4499999999978, 1884.069999999999, 5.860977611065526, 84.03405594303129, 2.581348537686086], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/72/45.png-140", 100, 0, 0.0, 472.90999999999997, 130, 978, 455.5, 622.4000000000001, 786.3999999999992, 976.7699999999994, 5.969080164746613, 174.76464103444158, 2.6173017519250283], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/295/175.png-91", 100, 0, 0.0, 567.7899999999996, 46, 4404, 386.5, 1303.2, 1578.0499999999997, 4381.669999999989, 13.52447930754666, 229.41426325398973, 5.956582195022992], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/175.png-109", 100, 0, 0.0, 415.9400000000001, 91, 1809, 402.5, 676.5000000000002, 696.75, 1798.3299999999945, 10.505305179115453, 174.49681229645972, 4.626848277129951], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/73/43.png-126", 100, 0, 0.0, 571.6100000000001, 79, 1153, 516.5, 932.0, 1007.6499999999999, 1152.96, 8.117542008279893, 167.38466748518547, 3.5593519157399136], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/295/176.png-92", 100, 0, 0.0, 518.24, 91, 2606, 392.0, 1066.2000000000003, 1334.099999999999, 2600.269999999997, 14.5623998835008, 258.31194480850445, 6.413713229940294], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/298/177.png-108", 100, 0, 0.0, 406.97000000000014, 70, 1364, 424.0, 584.0, 604.0, 1360.349999999998, 11.343012704174228, 179.07338220281306, 4.995799540607985], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/295/174.png-99", 100, 0, 0.0, 412.80999999999995, 70, 1697, 403.0, 579.2000000000003, 1039.6499999999994, 1691.5499999999972, 12.106537530266344, 191.05629539951573, 5.332078541162228], "isController": false}, {"data": ["Tenders_Page/dns-query-120", 100, 0, 0.0, 584.6700000000001, 258, 2161, 538.5, 749.6000000000001, 1387.0, 2160.5299999999997, 8.176614881439084, 5.509633074407195, 3.7768933973834833], "isController": false}, {"data": ["Tenders_Page/dns-query-121", 100, 0, 0.0, 114.26, 23, 622, 94.0, 183.0, 191.95, 621.9399999999999, 8.406186953597848, 5.664325193342299, 3.882935965870881], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/296/176.png-94", 100, 0, 0.0, 468.39999999999986, 72, 1758, 307.5, 1152.9000000000005, 1352.1499999999999, 1757.95, 15.499070055796652, 267.19246454587727, 6.8262505812151275], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/177.png-113", 100, 0, 0.0, 389.5599999999999, 58, 1210, 377.0, 549.7, 680.3499999999992, 1206.8699999999985, 11.004732034774953, 169.82106993507207, 4.846810691097172], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/72/43.png-134", 100, 0, 0.0, 533.1400000000002, 180, 1572, 507.0, 741.1000000000001, 879.6999999999997, 1568.009999999998, 6.584145377929945, 169.85680512575718, 2.8869934323149855], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/76/42.png-139", 100, 0, 0.0, 424.9099999999999, 145, 1519, 401.5, 592.7, 759.8499999999992, 1512.3699999999967, 6.5772165219679035, 118.32566676532491, 2.883955291370692], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/171.png-150", 100, 0, 0.0, 371.13000000000005, 148, 787, 369.0, 482.8, 530.4499999999996, 786.3499999999997, 7.200460829493087, 91.79884387600806, 3.1712967129896312], "isController": false}, {"data": ["Tenders_Page/tr/-119", 100, 0, 0.0, 150.33999999999997, 20, 478, 140.0, 231.0, 310.69999999999925, 477.4399999999997, 8.539709649871904, 3.169032877882152, 27.313060418445772], "isController": false}, {"data": ["Tenders_Page/tr/-118", 100, 0, 0.0, 143.66, 21, 789, 118.5, 230.40000000000003, 378.2999999999994, 787.4099999999992, 8.54627809588924, 3.1714703871463974, 26.39214196436202], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/296/174.png-98", 100, 0, 0.0, 419.8100000000002, 80, 1511, 401.5, 548.4000000000001, 977.6499999999994, 1510.4999999999998, 12.196609342602756, 220.99207982680815, 5.371748841322113], "isController": false}, {"data": ["Tenders_Page/tr/-117", 100, 0, 0.0, 92.71999999999996, 26, 393, 85.5, 143.8, 182.34999999999985, 391.4099999999992, 9.139932364500503, 3.44023840942327, 28.18999705808427], "isController": false}, {"data": ["Tenders_Page/tr/-116", 100, 0, 0.0, 548.3699999999998, 272, 1619, 510.5, 629.6, 942.9, 1618.8899999999999, 8.809020436927414, 3.3623962187279774, 27.29574772066596], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/299/170.png-151", 100, 0, 0.0, 430.78999999999996, 167, 1546, 399.0, 498.0, 846.049999999999, 1543.1799999999985, 6.409434687860531, 99.90337026102422, 2.8229053166260734], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/300/175.png-110", 100, 0, 0.0, 422.25000000000006, 52, 1330, 418.0, 548.9, 695.1999999999996, 1326.369999999998, 10.608953957139827, 184.351295618502, 4.672498276044982], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/297/176.png-96", 100, 0, 0.0, 572.17, 104, 3059, 301.5, 1403.3000000000002, 1958.0499999999952, 3058.93, 17.08233686368295, 327.98420417663135, 7.523568286641613], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/294/176.png-105", 100, 0, 0.0, 476.99, 73, 1618, 464.5, 622.7, 1093.2999999999988, 1615.5699999999988, 11.755025273304337, 231.46149861878453, 5.1772621076760315], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/74/43.png-122", 100, 0, 0.0, 533.4200000000001, 70, 1682, 527.5, 835.5000000000001, 1020.5499999999993, 1679.1799999999985, 8.153281695882592, 174.8178251121076, 3.5750229311047694], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/301/175.png-111", 100, 0, 0.0, 487.53, 88, 2973, 469.5, 687.6000000000001, 744.8499999999999, 2951.9099999999894, 9.358038555118847, 176.45020353733858, 4.121557996443945], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/74/45.png-129", 100, 0, 0.0, 575.3400000000004, 172, 4042, 494.0, 865.8000000000001, 922.8, 4013.6799999999857, 7.540340823405217, 152.67717444578494, 3.3062627243251392], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/294/174.png-106", 100, 0, 0.0, 388.3599999999998, 60, 987, 398.5, 514.8000000000001, 568.2499999999998, 984.8499999999989, 10.968520346605244, 172.24004606778544, 4.830861988592738], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/303/171.png-156", 100, 0, 0.0, 268.84000000000003, 73, 1010, 240.0, 397.80000000000007, 487.04999999999956, 1009.8399999999999, 8.392782207301721, 93.22217268149392, 3.6964304448174574], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/7/76/44.png-138", 100, 0, 0.0, 380.38, 132, 1565, 370.0, 448.20000000000005, 810.6999999999999, 1558.6199999999967, 6.477522995206633, 102.98882020015546, 2.8402420164529083], "isController": false}, {"data": ["Tenders_Page/maps/streets/256/9/297/174.png-100", 100, 0, 0.0, 471.46999999999997, 88, 1583, 401.0, 997.9000000000003, 1198.5999999999988, 1581.1899999999991, 11.892020454275182, 172.63172270781305, 5.237598852420025], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 6606, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
