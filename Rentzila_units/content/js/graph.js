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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 50.0, "series": [{"data": [[4200.0, 1.0], [2200.0, 1.0], [300.0, 1.0], [700.0, 3.0], [100.0, 1.0], [200.0, 5.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[0.0, 1.0], [600.0, 2.0], [37400.0, 1.0], [10500.0, 1.0], [2968900.0, 1.0], [2800.0, 1.0], [10800.0, 1.0], [10900.0, 1.0], [11700.0, 1.0], [200.0, 1.0], [15400.0, 1.0], [18200.0, 1.0], [18000.0, 1.0], [1200.0, 1.0], [20300.0, 1.0], [6200.0, 1.0], [25400.0, 1.0], [100.0, 2.0], [400.0, 1.0], [26800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[0.0, 4.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[0.0, 1.0], [2200.0, 1.0], [300.0, 1.0], [2400.0, 1.0], [3000.0, 1.0], [100.0, 7.0], [1600.0, 1.0], [2947800.0, 1.0], [1900.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[2946700.0, 1.0], [62000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[19400.0, 1.0], [62000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[2946700.0, 3.0], [600.0, 1.0], [2951300.0, 1.0], [700.0, 2.0], [2947200.0, 1.0], [2966400.0, 1.0], [2969500.0, 2.0], [800.0, 2.0], [2948500.0, 1.0], [2963600.0, 1.0], [1000.0, 1.0], [2960300.0, 1.0], [1100.0, 1.0], [1300.0, 2.0], [2969800.0, 1.0], [2959300.0, 1.0], [2972100.0, 1.0], [2952900.0, 1.0], [2971100.0, 1.0], [2967000.0, 1.0], [2950100.0, 1.0], [2971600.0, 1.0], [2953700.0, 1.0], [2970100.0, 1.0], [7900.0, 1.0], [10200.0, 1.0], [10400.0, 1.0], [11000.0, 1.0], [2947100.0, 1.0], [2968600.0, 1.0], [14300.0, 1.0], [14900.0, 1.0], [15300.0, 1.0], [15600.0, 3.0], [15700.0, 1.0], [16400.0, 1.0], [17900.0, 1.0], [18200.0, 2.0], [18300.0, 1.0], [19200.0, 1.0], [18800.0, 1.0], [2946600.0, 1.0], [19800.0, 1.0], [21700.0, 1.0], [21900.0, 1.0], [23300.0, 1.0], [22900.0, 1.0], [22600.0, 1.0], [23600.0, 1.0], [24500.0, 1.0], [24600.0, 1.0], [100.0, 1.0], [26100.0, 1.0], [27400.0, 1.0], [27000.0, 1.0], [2950200.0, 1.0], [28300.0, 1.0], [29000.0, 1.0], [2946100.0, 2.0], [30200.0, 1.0], [32400.0, 1.0], [200.0, 2.0], [2966100.0, 1.0], [2974800.0, 1.0], [2949200.0, 1.0], [2968400.0, 1.0], [300.0, 1.0], [2948200.0, 2.0], [2949500.0, 1.0], [2975100.0, 1.0], [400.0, 1.0], [2951800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[0.0, 1.0], [2100.0, 1.0], [2200.0, 1.0], [2948100.0, 1.0], [2948800.0, 1.0], [200.0, 5.0], [800.0, 1.0], [2966700.0, 1.0], [300.0, 2.0], [2945700.0, 1.0], [5900.0, 1.0], [6200.0, 1.0], [100.0, 9.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[0.0, 2.0], [11300.0, 1.0], [2947100.0, 1.0], [800.0, 2.0], [2945300.0, 1.0], [17300.0, 1.0], [2950700.0, 1.0], [1200.0, 1.0], [2949800.0, 1.0], [21200.0, 1.0], [2968100.0, 1.0], [1400.0, 1.0], [22300.0, 1.0], [2948000.0, 1.0], [1500.0, 1.0], [100.0, 8.0], [1600.0, 1.0], [1700.0, 1.0], [2951600.0, 1.0], [2000.0, 1.0], [31900.0, 1.0], [2945100.0, 2.0], [2970700.0, 1.0], [2967500.0, 1.0], [2200.0, 1.0], [2948700.0, 1.0], [200.0, 2.0], [2946000.0, 1.0], [2949100.0, 1.0], [4600.0, 1.0], [300.0, 1.0], [2948200.0, 1.0], [2947300.0, 1.0], [2966500.0, 1.0], [2952800.0, 1.0], [2971900.0, 1.0], [2951800.0, 1.0], [2946800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[800.0, 1.0], [900.0, 3.0], [1100.0, 4.0], [1300.0, 1.0], [1500.0, 3.0], [100.0, 2.0], [1600.0, 1.0], [1700.0, 1.0], [1900.0, 7.0], [2000.0, 2.0], [2100.0, 3.0], [2300.0, 14.0], [2200.0, 18.0], [2400.0, 13.0], [2500.0, 8.0], [2600.0, 4.0], [2700.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [3100.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [4200.0, 1.0], [4600.0, 1.0], [300.0, 1.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[0.0, 4.0], [100.0, 3.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[0.0, 5.0], [100.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[0.0, 4.0], [700.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[0.0, 4.0], [100.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[600.0, 5.0], [2600.0, 1.0], [700.0, 3.0], [3100.0, 1.0], [800.0, 1.0], [200.0, 1.0], [900.0, 5.0], [1000.0, 14.0], [1100.0, 24.0], [1200.0, 20.0], [300.0, 4.0], [1300.0, 10.0], [1400.0, 2.0], [1500.0, 1.0], [400.0, 2.0], [2000.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [400.0, 1.0], [200.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[0.0, 5.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[19800.0, 1.0], [11600.0, 1.0], [62000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[9600.0, 1.0], [800.0, 2.0], [14900.0, 1.0], [1000.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [24300.0, 1.0], [1700.0, 1.0], [1800.0, 3.0], [1900.0, 1.0], [2000.0, 1.0], [32900.0, 1.0], [33700.0, 1.0], [33300.0, 1.0], [34700.0, 1.0], [37600.0, 1.0], [2900.0, 2.0], [3000.0, 1.0], [3200.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [60100.0, 1.0], [60200.0, 29.0], [60300.0, 24.0], [60500.0, 2.0], [61000.0, 2.0], [60600.0, 1.0], [60800.0, 1.0], [62300.0, 3.0], [62100.0, 1.0], [61900.0, 4.0], [61700.0, 3.0], [63400.0, 1.0], [5500.0, 2.0], [6300.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [200.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[8300.0, 1.0], [8500.0, 1.0], [9000.0, 1.0], [600.0, 2.0], [800.0, 2.0], [1000.0, 8.0], [1100.0, 3.0], [1200.0, 2.0], [1300.0, 5.0], [1400.0, 2.0], [1500.0, 4.0], [1600.0, 3.0], [1700.0, 7.0], [1800.0, 2.0], [2000.0, 4.0], [2400.0, 4.0], [2600.0, 2.0], [2800.0, 1.0], [3400.0, 2.0], [3600.0, 2.0], [3800.0, 1.0], [3900.0, 1.0], [4100.0, 1.0], [4700.0, 1.0], [5100.0, 3.0], [5000.0, 2.0], [4900.0, 3.0], [5200.0, 1.0], [5400.0, 5.0], [5600.0, 6.0], [5500.0, 7.0], [5700.0, 1.0], [5900.0, 1.0], [6200.0, 1.0], [6500.0, 1.0], [6600.0, 1.0], [6800.0, 1.0], [7100.0, 1.0], [7500.0, 1.0], [7900.0, 1.0], [8100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[0.0, 4.0], [100.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 4.0], [400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[0.0, 6.0], [2200.0, 1.0], [300.0, 2.0], [700.0, 1.0], [400.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[0.0, 3.0], [100.0, 6.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[8300.0, 2.0], [9000.0, 1.0], [9200.0, 1.0], [900.0, 5.0], [1000.0, 2.0], [1100.0, 1.0], [1200.0, 4.0], [1300.0, 7.0], [1400.0, 7.0], [1500.0, 3.0], [1600.0, 7.0], [1700.0, 4.0], [1800.0, 1.0], [2000.0, 2.0], [2100.0, 4.0], [2400.0, 2.0], [2600.0, 2.0], [2800.0, 1.0], [3000.0, 1.0], [3100.0, 2.0], [3300.0, 1.0], [3200.0, 3.0], [3700.0, 5.0], [3600.0, 3.0], [4000.0, 1.0], [4300.0, 1.0], [4400.0, 2.0], [4500.0, 1.0], [4800.0, 1.0], [5100.0, 3.0], [5200.0, 3.0], [5300.0, 2.0], [5500.0, 4.0], [5600.0, 3.0], [5400.0, 1.0], [5800.0, 1.0], [5700.0, 1.0], [6600.0, 1.0], [7500.0, 1.0], [7600.0, 1.0], [500.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[0.0, 4.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[8400.0, 1.0], [9400.0, 1.0], [9500.0, 1.0], [10400.0, 2.0], [700.0, 1.0], [12100.0, 1.0], [1600.0, 1.0], [27100.0, 1.0], [26900.0, 2.0], [36600.0, 1.0], [43400.0, 1.0], [54000.0, 1.0], [56200.0, 2.0], [55900.0, 2.0], [59200.0, 1.0], [60100.0, 32.0], [60000.0, 20.0], [60200.0, 13.0], [60600.0, 1.0], [4800.0, 1.0], [5100.0, 1.0], [4900.0, 1.0], [6800.0, 1.0], [7400.0, 1.0], [7500.0, 1.0], [7700.0, 3.0], [7900.0, 2.0], [500.0, 2.0], [8000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[9100.0, 2.0], [9000.0, 2.0], [9200.0, 1.0], [8900.0, 1.0], [600.0, 2.0], [9600.0, 4.0], [9400.0, 7.0], [9700.0, 3.0], [9500.0, 1.0], [10000.0, 2.0], [10300.0, 1.0], [11000.0, 2.0], [11300.0, 1.0], [11500.0, 1.0], [11400.0, 2.0], [800.0, 2.0], [12900.0, 1.0], [14000.0, 1.0], [14100.0, 1.0], [14200.0, 1.0], [900.0, 1.0], [1000.0, 3.0], [1100.0, 1.0], [1200.0, 6.0], [1300.0, 2.0], [1400.0, 4.0], [1500.0, 3.0], [1600.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 8.0], [2000.0, 5.0], [2200.0, 1.0], [2800.0, 1.0], [3100.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3900.0, 1.0], [4500.0, 4.0], [4400.0, 3.0], [4600.0, 2.0], [4700.0, 4.0], [4800.0, 3.0], [4900.0, 2.0], [5100.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[0.0, 3.0], [72300.0, 1.0], [76300.0, 1.0], [78100.0, 1.0], [78500.0, 1.0], [78700.0, 1.0], [79300.0, 1.0], [5200.0, 1.0], [82500.0, 1.0], [83500.0, 1.0], [5500.0, 1.0], [93700.0, 1.0], [5900.0, 1.0], [106700.0, 1.0], [7000.0, 1.0], [7500.0, 3.0], [8000.0, 4.0], [8500.0, 6.0], [9000.0, 1.0], [9600.0, 3.0], [9500.0, 4.0], [9300.0, 1.0], [10000.0, 1.0], [10200.0, 1.0], [10500.0, 3.0], [10600.0, 3.0], [10300.0, 3.0], [10400.0, 1.0], [11100.0, 4.0], [11000.0, 1.0], [11300.0, 1.0], [12600.0, 6.0], [12500.0, 1.0], [12400.0, 2.0], [13100.0, 3.0], [13400.0, 1.0], [56400.0, 1.0], [60000.0, 2.0], [60100.0, 5.0], [60500.0, 3.0], [60300.0, 6.0], [60800.0, 1.0], [60600.0, 1.0], [60200.0, 1.0], [61700.0, 2.0], [61600.0, 1.0], [62300.0, 1.0], [70000.0, 1.0], [71400.0, 1.0], [74400.0, 1.0], [74600.0, 1.0], [77800.0, 1.0], [82800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[9400.0, 1.0], [62000.0, 1.0], [2966000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 2.0], [1600.0, 2.0], [1900.0, 3.0], [2000.0, 1.0], [2800.0, 3.0], [4700.0, 2.0], [4800.0, 2.0], [4900.0, 1.0], [5100.0, 1.0], [5500.0, 6.0], [5600.0, 2.0], [5800.0, 1.0], [5900.0, 4.0], [6100.0, 1.0], [6300.0, 2.0], [6200.0, 1.0], [6800.0, 1.0], [7600.0, 1.0], [7900.0, 1.0], [8200.0, 1.0], [9100.0, 2.0], [8900.0, 2.0], [9700.0, 4.0], [9300.0, 2.0], [9600.0, 1.0], [9500.0, 1.0], [9900.0, 1.0], [10700.0, 1.0], [10400.0, 1.0], [10600.0, 1.0], [10500.0, 1.0], [11100.0, 2.0], [10800.0, 1.0], [11200.0, 1.0], [11400.0, 7.0], [11500.0, 2.0], [11300.0, 3.0], [12000.0, 2.0], [12200.0, 2.0], [12100.0, 1.0], [12600.0, 2.0], [12300.0, 3.0], [12700.0, 2.0], [12500.0, 1.0], [13100.0, 1.0], [12800.0, 1.0], [12900.0, 1.0], [13600.0, 1.0], [13400.0, 1.0], [14200.0, 1.0], [14000.0, 1.0], [14500.0, 2.0], [14700.0, 1.0], [14800.0, 1.0], [15800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[8500.0, 1.0], [8200.0, 1.0], [9300.0, 2.0], [13100.0, 1.0], [13200.0, 1.0], [13300.0, 1.0], [13700.0, 1.0], [15900.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 2.0], [2200.0, 1.0], [60400.0, 6.0], [60100.0, 7.0], [60000.0, 4.0], [60500.0, 6.0], [60600.0, 5.0], [60300.0, 13.0], [60200.0, 5.0], [60800.0, 19.0], [60900.0, 1.0], [60700.0, 6.0], [61200.0, 2.0], [61000.0, 1.0], [61300.0, 1.0], [61700.0, 2.0], [61900.0, 1.0], [61800.0, 2.0], [63400.0, 2.0], [62200.0, 1.0], [62300.0, 1.0], [4300.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[0.0, 7.0], [200.0, 1.0], [100.0, 7.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[2957800.0, 1.0], [80400.0, 1.0], [2800.0, 1.0], [47300.0, 1.0], [23900.0, 1.0], [2973500.0, 1.0], [60300.0, 1.0], [60900.0, 1.0], [2966800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[8300.0, 1.0], [8600.0, 1.0], [8400.0, 1.0], [9300.0, 1.0], [10800.0, 1.0], [11600.0, 1.0], [12100.0, 1.0], [12000.0, 1.0], [12300.0, 1.0], [13600.0, 1.0], [13500.0, 1.0], [13900.0, 1.0], [14300.0, 1.0], [14700.0, 1.0], [15600.0, 1.0], [1000.0, 1.0], [16000.0, 1.0], [1100.0, 1.0], [18600.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [3300.0, 1.0], [3700.0, 1.0], [60200.0, 14.0], [60300.0, 24.0], [60400.0, 3.0], [60500.0, 3.0], [60000.0, 9.0], [60100.0, 18.0], [4300.0, 1.0], [5400.0, 1.0], [5600.0, 1.0], [7100.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[0.0, 1.0], [4800.0, 1.0], [100.0, 8.0], [200.0, 5.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[8600.0, 1.0], [8700.0, 2.0], [8300.0, 2.0], [9000.0, 1.0], [9100.0, 1.0], [8800.0, 1.0], [9400.0, 2.0], [10000.0, 2.0], [9900.0, 2.0], [10700.0, 1.0], [700.0, 1.0], [10800.0, 2.0], [900.0, 1.0], [1000.0, 1.0], [1400.0, 1.0], [2100.0, 7.0], [2300.0, 3.0], [2500.0, 15.0], [2800.0, 5.0], [2700.0, 1.0], [3300.0, 10.0], [3200.0, 5.0], [3500.0, 2.0], [3700.0, 5.0], [3600.0, 2.0], [3800.0, 5.0], [4300.0, 6.0], [5600.0, 1.0], [5800.0, 1.0], [5900.0, 1.0], [6300.0, 2.0], [6800.0, 1.0], [7100.0, 1.0], [7600.0, 1.0], [7500.0, 1.0], [7800.0, 2.0], [7700.0, 2.0]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[0.0, 1.0], [2100.0, 2.0], [2200.0, 1.0], [200.0, 4.0], [2949100.0, 1.0], [21600.0, 1.0], [5700.0, 1.0], [100.0, 2.0], [1600.0, 1.0], [400.0, 1.0], [2946800.0, 1.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[0.0, 1.0], [8300.0, 1.0], [9600.0, 1.0], [2948100.0, 1.0], [3100.0, 1.0], [200.0, 3.0], [13300.0, 1.0], [3500.0, 2.0], [3600.0, 1.0], [4000.0, 1.0], [2950700.0, 1.0], [19400.0, 1.0], [2946600.0, 1.0], [22200.0, 1.0], [1500.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[0.0, 2.0], [300.0, 3.0], [600.0, 1.0], [3100.0, 1.0], [100.0, 6.0], [1700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [200.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[1400.0, 2.0], [1500.0, 2.0], [1600.0, 1.0], [1900.0, 1.0], [2200.0, 2.0], [2800.0, 1.0], [2700.0, 1.0], [3100.0, 1.0], [3200.0, 4.0], [3300.0, 4.0], [3500.0, 1.0], [3700.0, 1.0], [3800.0, 3.0], [3900.0, 1.0], [4200.0, 1.0], [4500.0, 1.0], [4800.0, 2.0], [5500.0, 1.0], [5700.0, 1.0], [6000.0, 2.0], [8200.0, 1.0], [8600.0, 1.0], [8400.0, 1.0], [9300.0, 1.0], [9800.0, 1.0], [10300.0, 1.0], [10700.0, 1.0], [10900.0, 3.0], [11000.0, 1.0], [10800.0, 3.0], [11500.0, 2.0], [11400.0, 4.0], [11300.0, 1.0], [11700.0, 2.0], [12000.0, 1.0], [11900.0, 1.0], [12100.0, 1.0], [12300.0, 2.0], [12400.0, 3.0], [12500.0, 4.0], [12600.0, 1.0], [12700.0, 1.0], [13200.0, 2.0], [13300.0, 3.0], [12900.0, 3.0], [13000.0, 2.0], [12800.0, 1.0], [13600.0, 2.0], [13400.0, 1.0], [13500.0, 1.0], [13800.0, 1.0], [14300.0, 1.0], [17000.0, 1.0], [60100.0, 11.0], [60000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[0.0, 4.0], [100.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[4300.0, 1.0], [200.0, 2.0], [400.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[1100.0, 3.0], [300.0, 1.0], [600.0, 5.0], [700.0, 19.0], [800.0, 35.0], [200.0, 1.0], [900.0, 24.0], [500.0, 6.0], [1000.0, 6.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[2300.0, 3.0], [600.0, 9.0], [2400.0, 2.0], [2700.0, 1.0], [700.0, 3.0], [200.0, 1.0], [800.0, 5.0], [900.0, 11.0], [1000.0, 2.0], [1100.0, 3.0], [1200.0, 15.0], [300.0, 2.0], [1300.0, 11.0], [1400.0, 8.0], [1500.0, 3.0], [400.0, 12.0], [2000.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[2400.0, 1.0], [600.0, 2.0], [700.0, 4.0], [2900.0, 1.0], [3200.0, 1.0], [800.0, 4.0], [900.0, 10.0], [1000.0, 20.0], [1100.0, 29.0], [300.0, 2.0], [1200.0, 11.0], [1300.0, 6.0], [1400.0, 1.0], [1600.0, 1.0], [400.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[600.0, 1.0], [800.0, 3.0], [900.0, 2.0], [1000.0, 4.0], [1100.0, 3.0], [1400.0, 1.0], [1500.0, 3.0], [100.0, 3.0], [1600.0, 12.0], [1700.0, 6.0], [1900.0, 8.0], [2000.0, 4.0], [2100.0, 1.0], [2200.0, 3.0], [2300.0, 3.0], [2400.0, 4.0], [2500.0, 8.0], [2600.0, 7.0], [2700.0, 4.0], [2800.0, 2.0], [2900.0, 2.0], [3000.0, 2.0], [3100.0, 1.0], [200.0, 3.0], [3200.0, 3.0], [4700.0, 1.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[0.0, 2.0], [2100.0, 5.0], [2200.0, 5.0], [2300.0, 3.0], [600.0, 3.0], [2400.0, 9.0], [2500.0, 9.0], [2600.0, 7.0], [2700.0, 11.0], [2800.0, 3.0], [2900.0, 14.0], [3000.0, 3.0], [3100.0, 3.0], [800.0, 2.0], [900.0, 2.0], [1000.0, 3.0], [1100.0, 3.0], [1200.0, 1.0], [100.0, 3.0], [400.0, 2.0], [1800.0, 1.0], [1900.0, 5.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[0.0, 1.0], [47200.0, 1.0], [62000.0, 1.0], [2970000.0, 1.0], [2975600.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[0.0, 3.0], [600.0, 13.0], [700.0, 16.0], [800.0, 28.0], [900.0, 9.0], [1000.0, 6.0], [1100.0, 5.0], [1200.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [400.0, 1.0], [1600.0, 7.0], [100.0, 2.0], [1700.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[2100.0, 3.0], [2300.0, 6.0], [2200.0, 5.0], [2400.0, 12.0], [2500.0, 20.0], [2600.0, 5.0], [2700.0, 3.0], [3500.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [4700.0, 1.0], [5000.0, 1.0], [5300.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [1700.0, 18.0], [1800.0, 2.0], [1900.0, 14.0], [2000.0, 4.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[2300.0, 1.0], [600.0, 1.0], [700.0, 3.0], [800.0, 17.0], [200.0, 1.0], [900.0, 22.0], [1000.0, 3.0], [1100.0, 7.0], [1200.0, 4.0], [1300.0, 1.0], [1400.0, 5.0], [1500.0, 4.0], [1600.0, 10.0], [100.0, 2.0], [1700.0, 15.0], [1800.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[2947200.0, 1.0], [50200.0, 1.0], [12800.0, 1.0], [13400.0, 1.0], [56700.0, 3.0], [56200.0, 1.0], [58200.0, 1.0], [60100.0, 1.0], [60000.0, 4.0], [61900.0, 1.0], [62000.0, 1.0], [16600.0, 1.0], [68500.0, 1.0], [72200.0, 1.0], [77100.0, 1.0], [2952800.0, 1.0], [26500.0, 1.0], [26300.0, 1.0], [27000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[0.0, 3.0], [66900.0, 1.0], [68700.0, 1.0], [2987500.0, 1.0], [71300.0, 1.0], [71500.0, 1.0], [71900.0, 2.0], [72100.0, 1.0], [74100.0, 1.0], [74700.0, 1.0], [75500.0, 1.0], [75900.0, 1.0], [76500.0, 1.0], [78300.0, 2.0], [78700.0, 1.0], [78100.0, 1.0], [78900.0, 1.0], [81900.0, 1.0], [80300.0, 1.0], [80700.0, 1.0], [82700.0, 1.0], [83100.0, 1.0], [87700.0, 1.0], [88100.0, 1.0], [90100.0, 1.0], [90300.0, 1.0], [94700.0, 1.0], [108500.0, 1.0], [120500.0, 1.0], [7800.0, 1.0], [10500.0, 1.0], [10300.0, 1.0], [10900.0, 1.0], [11400.0, 1.0], [11600.0, 1.0], [12800.0, 1.0], [12900.0, 1.0], [14200.0, 1.0], [14500.0, 1.0], [17300.0, 1.0], [19400.0, 1.0], [18900.0, 1.0], [20300.0, 1.0], [21500.0, 1.0], [20800.0, 1.0], [20500.0, 1.0], [22300.0, 1.0], [23200.0, 1.0], [25600.0, 1.0], [28500.0, 1.0], [28900.0, 1.0], [32800.0, 1.0], [37600.0, 1.0], [55500.0, 1.0], [60100.0, 1.0], [60200.0, 1.0], [60300.0, 5.0], [60400.0, 1.0], [60600.0, 3.0], [60800.0, 4.0], [62300.0, 1.0], [62400.0, 1.0], [69600.0, 1.0], [70600.0, 1.0], [70800.0, 1.0], [72400.0, 1.0], [72800.0, 1.0], [74600.0, 1.0], [78000.0, 1.0], [79000.0, 1.0], [80000.0, 2.0], [81600.0, 1.0], [82400.0, 1.0], [82600.0, 1.0], [82800.0, 3.0], [84800.0, 1.0], [85600.0, 2.0], [86800.0, 1.0], [87200.0, 1.0], [89600.0, 1.0], [90400.0, 1.0], [91800.0, 1.0], [2959200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[800.0, 1.0], [900.0, 1.0], [1000.0, 3.0], [1500.0, 1.0], [100.0, 2.0], [1600.0, 1.0], [1800.0, 1.0], [1900.0, 3.0], [2000.0, 5.0], [2100.0, 6.0], [2200.0, 9.0], [2300.0, 13.0], [2400.0, 13.0], [2500.0, 15.0], [2600.0, 5.0], [2700.0, 4.0], [2800.0, 2.0], [2900.0, 2.0], [3000.0, 2.0], [3100.0, 3.0], [200.0, 2.0], [3200.0, 1.0], [3400.0, 1.0], [4300.0, 1.0], [300.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[0.0, 1.0], [2985600.0, 1.0], [2971800.0, 1.0], [2974100.0, 1.0], [2981300.0, 1.0], [2945200.0, 1.0], [2945500.0, 1.0], [3800.0, 1.0], [3900.0, 1.0], [4000.0, 1.0], [66100.0, 1.0], [4600.0, 1.0], [75500.0, 1.0], [80900.0, 1.0], [8400.0, 2.0], [8500.0, 1.0], [8600.0, 1.0], [9500.0, 1.0], [2965000.0, 1.0], [10500.0, 1.0], [11100.0, 2.0], [12900.0, 1.0], [13100.0, 1.0], [12800.0, 1.0], [14600.0, 1.0], [15200.0, 1.0], [15100.0, 1.0], [15000.0, 1.0], [17400.0, 1.0], [16900.0, 1.0], [17300.0, 1.0], [18400.0, 1.0], [18100.0, 1.0], [19000.0, 1.0], [18900.0, 1.0], [19400.0, 1.0], [19200.0, 1.0], [2946600.0, 1.0], [19600.0, 2.0], [19500.0, 2.0], [20400.0, 1.0], [19900.0, 2.0], [19700.0, 1.0], [21200.0, 1.0], [21400.0, 2.0], [21500.0, 1.0], [20900.0, 2.0], [21600.0, 1.0], [22200.0, 1.0], [22100.0, 1.0], [23000.0, 1.0], [25100.0, 1.0], [25500.0, 1.0], [2973500.0, 1.0], [27200.0, 1.0], [26800.0, 1.0], [29400.0, 1.0], [28800.0, 1.0], [29000.0, 1.0], [30100.0, 2.0], [30800.0, 1.0], [32300.0, 1.0], [32000.0, 1.0], [35100.0, 1.0], [35400.0, 1.0], [36900.0, 1.0], [39900.0, 1.0], [44000.0, 1.0], [43800.0, 1.0], [2987100.0, 1.0], [2970200.0, 1.0], [60300.0, 7.0], [60700.0, 1.0], [60400.0, 1.0], [60600.0, 1.0], [60200.0, 1.0], [61900.0, 1.0], [72200.0, 1.0], [74800.0, 1.0], [79600.0, 1.0], [82800.0, 1.0], [88200.0, 1.0], [2949500.0, 1.0], [2975600.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[0.0, 3.0], [600.0, 1.0], [700.0, 1.0], [800.0, 1.0], [900.0, 3.0], [1000.0, 2.0], [1100.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [100.0, 5.0], [1600.0, 4.0], [1700.0, 4.0], [1800.0, 2.0], [1900.0, 4.0], [2000.0, 1.0], [2100.0, 2.0], [2200.0, 4.0], [2300.0, 1.0], [2500.0, 7.0], [2600.0, 5.0], [2700.0, 5.0], [2800.0, 3.0], [2900.0, 6.0], [3000.0, 2.0], [3100.0, 2.0], [200.0, 2.0], [3300.0, 1.0], [3200.0, 3.0], [3400.0, 1.0], [300.0, 7.0], [4800.0, 1.0], [400.0, 6.0], [500.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[600.0, 1.0], [2600.0, 1.0], [2700.0, 2.0], [700.0, 3.0], [800.0, 5.0], [900.0, 13.0], [1000.0, 24.0], [1100.0, 17.0], [1200.0, 22.0], [1300.0, 5.0], [1400.0, 2.0], [1500.0, 2.0], [1900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[0.0, 4.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[300.0, 2.0], [11200.0, 1.0], [2900.0, 1.0], [62000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[34900.0, 1.0], [9400.0, 1.0], [48400.0, 1.0], [49400.0, 1.0], [53200.0, 2.0], [51400.0, 1.0], [3400.0, 1.0], [56500.0, 1.0], [60100.0, 1.0], [60600.0, 1.0], [61900.0, 1.0], [63000.0, 1.0], [68500.0, 1.0], [25400.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [14100.0, 1.0], [2951700.0, 1.0], [62000.0, 1.0], [15900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[73100.0, 1.0], [10100.0, 1.0], [11100.0, 1.0], [23700.0, 1.0], [62000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 23.0], [700.0, 35.0], [800.0, 15.0], [100.0, 4.0], [900.0, 13.0], [500.0, 5.0], [1000.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[600.0, 11.0], [700.0, 11.0], [800.0, 6.0], [900.0, 4.0], [1000.0, 1.0], [1100.0, 2.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 3.0], [1500.0, 4.0], [100.0, 1.0], [1600.0, 3.0], [1800.0, 1.0], [2000.0, 2.0], [2100.0, 5.0], [2200.0, 3.0], [2400.0, 1.0], [2500.0, 2.0], [2600.0, 1.0], [2700.0, 1.0], [200.0, 10.0], [4300.0, 1.0], [300.0, 5.0], [400.0, 12.0], [6600.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[2978700.0, 1.0], [12700.0, 1.0], [2967900.0, 1.0], [13700.0, 1.0], [2951700.0, 1.0], [60200.0, 1.0], [60300.0, 1.0], [60500.0, 1.0], [18200.0, 1.0], [2972000.0, 1.0], [23600.0, 1.0], [24700.0, 1.0], [2954300.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[35100.0, 1.0], [10200.0, 1.0], [12200.0, 1.0], [60500.0, 1.0], [60100.0, 1.0], [60700.0, 1.0], [60800.0, 1.0], [16800.0, 1.0], [71200.0, 1.0], [73500.0, 1.0], [20000.0, 2.0], [84100.0, 1.0], [2975100.0, 1.0], [30900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[8200.0, 1.0], [8300.0, 2.0], [8500.0, 2.0], [8400.0, 4.0], [9000.0, 1.0], [8900.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [2500.0, 3.0], [2600.0, 1.0], [2800.0, 3.0], [2700.0, 2.0], [2900.0, 4.0], [3000.0, 3.0], [3100.0, 3.0], [3300.0, 3.0], [3200.0, 2.0], [3500.0, 5.0], [3700.0, 5.0], [3800.0, 4.0], [3900.0, 2.0], [4600.0, 2.0], [4700.0, 1.0], [4800.0, 3.0], [4900.0, 3.0], [5100.0, 3.0], [5200.0, 3.0], [5500.0, 1.0], [5400.0, 1.0], [5600.0, 1.0], [6100.0, 1.0], [6200.0, 1.0], [6300.0, 1.0], [6400.0, 6.0], [6500.0, 2.0], [6800.0, 3.0], [6700.0, 3.0], [6900.0, 2.0], [7000.0, 2.0], [7400.0, 2.0], [7300.0, 1.0], [7600.0, 1.0], [7900.0, 2.0], [8100.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[0.0, 5.0], [100.0, 3.0], [900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[78500.0, 1.0], [62000.0, 1.0], [32700.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[0.0, 1.0], [300.0, 9.0], [600.0, 1.0], [700.0, 1.0], [200.0, 3.0], [400.0, 3.0], [100.0, 4.0], [900.0, 2.0]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[62000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[0.0, 5.0], [100.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[2100.0, 2.0], [2200.0, 8.0], [2300.0, 15.0], [2400.0, 15.0], [2500.0, 9.0], [2600.0, 6.0], [2700.0, 5.0], [2800.0, 2.0], [2900.0, 1.0], [1000.0, 2.0], [4300.0, 3.0], [1100.0, 6.0], [300.0, 1.0], [1200.0, 5.0], [1300.0, 5.0], [1400.0, 1.0], [5600.0, 1.0], [1500.0, 5.0], [1600.0, 3.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[1100.0, 9.0], [600.0, 7.0], [700.0, 5.0], [1600.0, 1.0], [800.0, 16.0], [100.0, 1.0], [900.0, 50.0], [500.0, 1.0], [1000.0, 10.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[600.0, 11.0], [700.0, 1.0], [800.0, 2.0], [900.0, 4.0], [1500.0, 3.0], [100.0, 8.0], [1600.0, 7.0], [1700.0, 8.0], [1800.0, 6.0], [1900.0, 6.0], [2000.0, 3.0], [2100.0, 2.0], [2200.0, 1.0], [2300.0, 2.0], [2400.0, 1.0], [2600.0, 1.0], [2700.0, 3.0], [2900.0, 1.0], [3000.0, 1.0], [3100.0, 2.0], [200.0, 5.0], [3300.0, 1.0], [3200.0, 4.0], [3400.0, 1.0], [300.0, 3.0], [400.0, 8.0], [500.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[2300.0, 1.0], [600.0, 2.0], [2700.0, 1.0], [3100.0, 1.0], [800.0, 6.0], [900.0, 7.0], [1000.0, 16.0], [1100.0, 29.0], [300.0, 1.0], [1200.0, 21.0], [1300.0, 6.0], [1400.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [400.0, 2.0], [1700.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2987500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 478.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 1459.0, "series": [{"data": [[0.0, 478.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1166.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 1459.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [[3.0, 827.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 50.28282828282827, "minX": 1.69711968E12, "maxY": 100.0, "series": [{"data": [[1.69712028E12, 100.0], [1.69711992E12, 100.0], [1.69711998E12, 100.0], [1.69712058E12, 100.0], [1.69712052E12, 100.0], [1.6971231E12, 50.28282828282827], [1.69711986E12, 100.0], [1.69712016E12, 100.0], [1.69712022E12, 100.0], [1.69712082E12, 100.0], [1.69712076E12, 100.0], [1.6971201E12, 100.0], [1.69712046E12, 100.0], [1.6971204E12, 100.0], [1.6971198E12, 100.0], [1.6971207E12, 100.0], [1.69711968E12, 99.91352859135279], [1.69712064E12, 100.0], [1.69711974E12, 100.0], [1.69712034E12, 100.0], [1.69712004E12, 100.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6971231E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 47.0, "minX": 1.0, "maxY": 2987545.0, "series": [{"data": [[100.0, 820.5333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[100.0, 820.5333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-69-Aggregated", "isController": false}, {"data": [[82.0, 2968992.0], [100.0, 10414.47619047619]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[99.18181818181819, 144895.2727272727]], "isOverall": false, "label": "Tenders_Page/_next/image/-68-Aggregated", "isController": false}, {"data": [[100.0, 119.66666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[100.0, 119.66666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80-Aggregated", "isController": false}, {"data": [[23.0, 2947847.0], [100.0, 1117.1999999999998]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[95.1875, 185287.8125]], "isOverall": false, "label": "Tenders_Page/_next/image/-67-Aggregated", "isController": false}, {"data": [[80.0, 2946713.0], [100.0, 62074.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[90.0, 1504393.5]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109-Aggregated", "isController": false}, {"data": [[100.0, 40790.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[100.0, 40790.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107-Aggregated", "isController": false}, {"data": [[2.0, 2970136.0], [34.0, 2972116.0], [37.0, 2969596.0], [38.0, 2968425.0], [41.0, 2946746.0], [43.0, 2968297.5], [45.0, 2949207.0], [46.0, 2951813.0], [49.0, 2949236.5], [48.0, 2947258.0], [52.0, 2949591.0], [59.0, 2946774.0], [62.0, 2953060.0], [66.0, 2948277.0], [65.0, 2950269.0], [71.0, 2948510.0], [73.0, 2950128.0], [72.0, 2969878.0], [83.0, 2966190.0], [91.0, 2960332.0], [93.0, 2946114.0], [92.0, 2946654.0], [99.0, 2973017.0], [97.0, 2971659.0], [100.0, 14106.551020408166], [7.0, 2968625.0], [8.0, 2946105.0], [13.0, 2963674.0], [1.0, 2952932.0], [18.0, 2948243.0], [24.0, 2966484.0], [27.0, 2975170.0], [29.0, 2953762.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[79.27058823529414, 1260977.7764705883]], "isOverall": false, "label": "Tenders_Page/_next/image/-64-Aggregated", "isController": false}, {"data": [[75.0, 2966731.0], [89.0, 2948137.0], [100.0, 1035.2916666666667], [52.0, 2948801.0], [30.0, 2945703.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[94.5, 422650.6785714286]], "isOverall": false, "label": "Tenders_Page/_next/image/-63-Aggregated", "isController": false}, {"data": [[32.0, 2966514.0], [40.0, 2947314.0], [10.0, 2951863.0], [3.0, 2968123.0], [55.0, 2947972.0], [15.0, 2945318.0], [62.0, 2946070.0], [65.0, 2949804.0], [16.0, 2949257.5], [69.0, 2948208.0], [17.0, 2967576.0], [76.0, 2970742.0], [81.0, 2945185.0], [86.0, 2950732.0], [84.0, 2971993.0], [90.0, 2949184.0], [89.0, 2945146.0], [22.0, 2952895.0], [95.0, 2948008.0], [100.0, 4454.5]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[79.14285714285714, 1268242.0408163266]], "isOverall": false, "label": "Tenders_Page/_next/image/-62-Aggregated", "isController": false}, {"data": [[100.0, 2138.510000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[100.0, 2138.510000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36-Aggregated", "isController": false}, {"data": [[100.0, 155.55555555555554]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[100.0, 155.55555555555554]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85-Aggregated", "isController": false}, {"data": [[100.0, 109.88888888888889]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[100.0, 109.88888888888889]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86-Aggregated", "isController": false}, {"data": [[100.0, 198.66666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[100.0, 198.66666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84-Aggregated", "isController": false}, {"data": [[100.0, 110.00000000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[100.0, 110.00000000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88-Aggregated", "isController": false}, {"data": [[100.0, 47.0]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[100.0, 47.0]], "isOverall": false, "label": "Tenders_Page/tr/-104-Aggregated", "isController": false}, {"data": [[100.0, 1094.23]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[100.0, 1094.23]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46-Aggregated", "isController": false}, {"data": [[100.0, 225.44444444444443]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[100.0, 225.44444444444443]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92-Aggregated", "isController": false}, {"data": [[100.0, 108.66666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[100.0, 108.66666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95-Aggregated", "isController": false}, {"data": [[100.0, 31209.666666666664]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[100.0, 31209.666666666664]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106-Aggregated", "isController": false}, {"data": [[100.0, 46412.33999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[100.0, 46412.33999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56-Aggregated", "isController": false}, {"data": [[100.0, 144.77777777777777]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[100.0, 144.77777777777777]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94-Aggregated", "isController": false}, {"data": [[100.0, 3519.8500000000004]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[100.0, 3519.8500000000004]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51-Aggregated", "isController": false}, {"data": [[100.0, 99.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[100.0, 99.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90-Aggregated", "isController": false}, {"data": [[100.0, 259.2222222222222]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[100.0, 259.2222222222222]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97-Aggregated", "isController": false}, {"data": [[100.0, 357.2857142857142]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[100.0, 357.2857142857142]], "isOverall": false, "label": "Tenders_Page/tr/-77-Aggregated", "isController": false}, {"data": [[100.0, 114.55555555555556]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[100.0, 114.55555555555556]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96-Aggregated", "isController": false}, {"data": [[100.0, 3255.6799999999994]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[100.0, 3255.6799999999994]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53-Aggregated", "isController": false}, {"data": [[100.0, 117.44444444444444]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[100.0, 117.44444444444444]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98-Aggregated", "isController": false}, {"data": [[100.0, 122.22222222222223]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[100.0, 122.22222222222223]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91-Aggregated", "isController": false}, {"data": [[100.0, 151.66666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[100.0, 151.66666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93-Aggregated", "isController": false}, {"data": [[100.0, 46248.630000000005]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[100.0, 46248.630000000005]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59-Aggregated", "isController": false}, {"data": [[100.0, 5226.490000000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[100.0, 5226.490000000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49-Aggregated", "isController": false}, {"data": [[100.0, 33057.48999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[100.0, 33057.48999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58-Aggregated", "isController": false}, {"data": [[36.0, 2966070.0], [100.0, 35755.5]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[78.66666666666667, 1012527.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108-Aggregated", "isController": false}, {"data": [[100.0, 8640.900000000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[100.0, 8640.900000000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52-Aggregated", "isController": false}, {"data": [[100.0, 52827.57999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[100.0, 52827.57999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55-Aggregated", "isController": false}, {"data": [[100.0, 128.53333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[100.0, 128.53333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-74-Aggregated", "isController": false}, {"data": [[80.0, 2966801.0], [10.0, 2973543.0], [100.0, 45989.666666666664], [29.0, 2957808.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[79.88888888888889, 1019343.3333333334]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99-Aggregated", "isController": false}, {"data": [[100.0, 45364.60000000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[100.0, 45364.60000000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54-Aggregated", "isController": false}, {"data": [[100.0, 488.79999999999995]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[100.0, 488.79999999999995]], "isOverall": false, "label": "Tenders_Page/_next/image/-73-Aggregated", "isController": false}, {"data": [[100.0, 4618.750000000001]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[100.0, 4618.750000000001]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40-Aggregated", "isController": false}, {"data": [[100.0, 2497.6249999999995], [13.0, 2949133.0], [27.0, 2946825.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[91.11111111111111, 329773.3333333334]], "isOverall": false, "label": "Tenders_Page/_next/image/-72-Aggregated", "isController": false}, {"data": [[77.0, 2946665.0], [94.0, 2948149.0], [100.0, 5209.222222222223], [31.0, 2950750.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[95.33333333333334, 425682.38095238095]], "isOverall": false, "label": "Tenders_Page/_next/image/-71-Aggregated", "isController": false}, {"data": [[100.0, 577.1333333333334]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[100.0, 577.1333333333334]], "isOverall": false, "label": "Tenders_Page/_next/image/-70-Aggregated", "isController": false}, {"data": [[100.0, 152.77777777777777]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[100.0, 152.77777777777777]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83-Aggregated", "isController": false}, {"data": [[100.0, 14994.670000000004]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[100.0, 14994.670000000004]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50-Aggregated", "isController": false}, {"data": [[100.0, 140.66666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[100.0, 140.66666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89-Aggregated", "isController": false}, {"data": [[100.0, 677.8888888888889]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[100.0, 677.8888888888889]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79-Aggregated", "isController": false}, {"data": [[100.0, 838.17]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[100.0, 838.17]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30-Aggregated", "isController": false}, {"data": [[100.0, 1057.1600000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[100.0, 1057.1600000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41-Aggregated", "isController": false}, {"data": [[100.0, 1088.5700000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[100.0, 1088.5700000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45-Aggregated", "isController": false}, {"data": [[100.0, 1879.06]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[100.0, 1879.06]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35-Aggregated", "isController": false}, {"data": [[100.0, 2198.7499999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[100.0, 2198.7499999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37-Aggregated", "isController": false}, {"data": [[35.0, 2975647.0], [46.0, 2970079.0], [100.0, 36438.0]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[76.2, 1211008.0]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103-Aggregated", "isController": false}, {"data": [[100.0, 867.8900000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[100.0, 867.8900000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48-Aggregated", "isController": false}, {"data": [[100.0, 2280.2800000000007]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[100.0, 2280.2800000000007]], "isOverall": false, "label": "Tenders_Page/_next/image/-43-Aggregated", "isController": false}, {"data": [[100.0, 1203.7899999999997]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[100.0, 1203.7899999999997]], "isOverall": false, "label": "Tenders_Page/_next/image/-42-Aggregated", "isController": false}, {"data": [[21.0, 2947229.0], [12.0, 2952822.0], [100.0, 50013.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[93.04166666666666, 291680.7083333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66-Aggregated", "isController": false}, {"data": [[70.0, 2959293.0], [39.0, 2987545.0], [100.0, 59621.06122448981]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[99.09, 117897.02000000002]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60-Aggregated", "isController": false}, {"data": [[100.0, 2244.5699999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[100.0, 2244.5699999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38-Aggregated", "isController": false}, {"data": [[33.0, 2945292.0], [50.0, 2946682.0], [57.0, 2985697.0], [56.0, 2974114.0], [58.0, 2987110.0], [78.0, 2973544.0], [20.0, 2981367.0], [5.0, 2945591.0], [87.0, 2970222.0], [85.0, 2949569.0], [21.0, 2971882.0], [96.0, 2965049.0], [100.0, 31317.5294117647], [25.0, 2975662.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[93.5816326530612, 420752.7653061225]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61-Aggregated", "isController": false}, {"data": [[100.0, 1715.64]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[100.0, 1715.64]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34-Aggregated", "isController": false}, {"data": [[100.0, 1157.6900000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[100.0, 1157.6900000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44-Aggregated", "isController": false}, {"data": [[100.0, 129.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[100.0, 129.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87-Aggregated", "isController": false}, {"data": [[100.0, 15368.4]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[100.0, 15368.4]], "isOverall": false, "label": "Tenders_Page/_next/image/-101-Aggregated", "isController": false}, {"data": [[100.0, 46667.53333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[100.0, 46667.53333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76-Aggregated", "isController": false}, {"data": [[74.0, 2951756.0], [100.0, 18655.6]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[95.66666666666667, 507505.6666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-100-Aggregated", "isController": false}, {"data": [[100.0, 36053.6]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[100.0, 36053.6]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102-Aggregated", "isController": false}, {"data": [[100.0, 746.07]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[100.0, 746.07]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32-Aggregated", "isController": false}, {"data": [[100.0, 1082.7599999999995]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[100.0, 1082.7599999999995]], "isOverall": false, "label": "Tenders_Page/_next/image/-57-Aggregated", "isController": false}, {"data": [[67.0, 2951786.0], [8.0, 2978718.0], [68.0, 2954351.0], [5.0, 2972088.0], [100.0, 31384.33333333333], [53.0, 2967995.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[78.64285714285714, 1079099.7857142854]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78-Aggregated", "isController": false}, {"data": [[65.0, 2975115.0], [100.0, 44060.21428571429]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[97.66666666666667, 239463.8666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75-Aggregated", "isController": false}, {"data": [[100.0, 5147.9]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[100.0, 5147.9]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33-Aggregated", "isController": false}, {"data": [[100.0, 186.55555555555554]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[100.0, 186.55555555555554]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82-Aggregated", "isController": false}, {"data": [[100.0, 57790.666666666664]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[100.0, 57790.666666666664]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105-Aggregated", "isController": false}, {"data": [[100.0, 389.54166666666663]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[100.0, 389.54166666666663]], "isOverall": false, "label": "Tenders_Page/tr/-65-Aggregated", "isController": false}, {"data": [[100.0, 62084.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[100.0, 62084.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110-Aggregated", "isController": false}, {"data": [[100.0, 109.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[100.0, 109.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81-Aggregated", "isController": false}, {"data": [[38.0, 370.0], [100.0, 2219.878787878788]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[99.38000000000001, 2201.38]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29-Aggregated", "isController": false}, {"data": [[100.0, 925.6899999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[100.0, 925.6899999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31-Aggregated", "isController": false}, {"data": [[100.0, 1387.1200000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[100.0, 1387.1200000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39-Aggregated", "isController": false}, {"data": [[100.0, 1162.0900000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}, {"data": [[100.0, 1162.0900000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 0.0, "minX": 1.69711968E12, "maxY": 1978909.8, "series": [{"data": [[1.69712028E12, 47.8], [1.69711992E12, 51074.083333333336], [1.69711998E12, 28151.583333333332], [1.69712058E12, 47.8], [1.69712052E12, 47.8], [1.6971231E12, 4361.2], [1.69711986E12, 8998.466666666667], [1.69712016E12, 627834.4], [1.69712022E12, 49.8], [1.69712082E12, 47.8], [1.69712076E12, 47.8], [1.6971201E12, 1978909.8], [1.69712046E12, 53.75], [1.6971204E12, 47.8], [1.6971198E12, 26991.833333333332], [1.6971207E12, 47.8], [1.69711968E12, 174931.26666666666], [1.69712064E12, 47.8], [1.69711974E12, 467726.9], [1.69712034E12, 47.8], [1.69712004E12, 70435.25]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69712028E12, 0.0], [1.69711992E12, 2062.233333333333], [1.69711998E12, 1943.2333333333333], [1.69712058E12, 0.0], [1.69712052E12, 0.0], [1.6971231E12, 0.0], [1.69711986E12, 1270.65], [1.69712016E12, 815.3666666666667], [1.69712022E12, 0.0], [1.69712082E12, 0.0], [1.69712076E12, 0.0], [1.6971201E12, 2740.55], [1.69712046E12, 10.883333333333333], [1.6971204E12, 0.0], [1.6971198E12, 1590.8], [1.6971207E12, 0.0], [1.69711968E12, 5653.283333333334], [1.69712064E12, 0.0], [1.69711974E12, 15583.533333333333], [1.69712034E12, 0.0], [1.69712004E12, 1617.6833333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6971231E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 33.0, "minX": 1.69711968E12, "maxY": 2975115.0, "series": [{"data": [[1.69711998E12, 456.0], [1.6971198E12, 253.66666666666666], [1.69711986E12, 488.0], [1.69712004E12, 1127.4444444444443]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[1.6971201E12, 17977.0], [1.69711998E12, 821.0], [1.6971198E12, 197.66666666666666], [1.6971231E12, 2968992.0], [1.69711986E12, 683.0], [1.69712016E12, 29949.0], [1.69712004E12, 8000.888888888889]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[1.6971201E12, 95.25], [1.69711992E12, 137.5], [1.69712016E12, 85.0], [1.69712004E12, 168.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[1.69711998E12, 290.5], [1.6971198E12, 112.66666666666667], [1.6971231E12, 2947847.0], [1.69711986E12, 159.0], [1.69712004E12, 1742.2222222222224]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[1.69712076E12, 62074.0], [1.6971231E12, 2946713.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[1.6971207E12, 62095.0], [1.69712016E12, 19485.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[1.6971201E12, 18202.6], [1.69711992E12, 783.3333333333333], [1.69711998E12, 883.5], [1.6971198E12, 635.0], [1.6971231E12, 2958108.055555555], [1.69712016E12, 22578.470588235294], [1.69711974E12, 222.66666666666666], [1.69712004E12, 16377.142857142857]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[1.69711992E12, 205.5], [1.69711998E12, 204.55555555555554], [1.6971198E12, 117.0], [1.6971231E12, 2952343.0], [1.69712016E12, 6127.5], [1.69711974E12, 138.66666666666666], [1.69712004E12, 1401.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[1.6971201E12, 24645.5], [1.69711992E12, 163.5], [1.69711998E12, 334.0], [1.6971198E12, 87.0], [1.6971231E12, 2953292.095238095], [1.69712016E12, 14907.0], [1.69711974E12, 150.33333333333334], [1.69712004E12, 1705.142857142857]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[1.69711968E12, 813.8888888888889], [1.69711974E12, 2269.5164835164833]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[1.6971201E12, 80.75], [1.69711992E12, 128.5], [1.69712016E12, 83.0], [1.69712004E12, 368.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[1.6971201E12, 72.5], [1.69711992E12, 156.5], [1.69712016E12, 70.0], [1.69712004E12, 158.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[1.6971201E12, 75.0], [1.69711992E12, 150.0], [1.69712016E12, 186.0], [1.69712004E12, 501.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[1.6971201E12, 73.5], [1.69711992E12, 147.5], [1.69712016E12, 56.0], [1.69712004E12, 172.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[1.69712046E12, 75.0], [1.69712004E12, 33.0]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[1.69711968E12, 1473.3333333333333], [1.69711974E12, 1082.5051546391749]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[1.6971201E12, 138.75], [1.69711992E12, 339.0], [1.69712016E12, 73.0], [1.69712004E12, 361.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[1.6971201E12, 79.0], [1.69711992E12, 115.5], [1.69712016E12, 120.0], [1.69712004E12, 155.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[1.6971201E12, 15771.0], [1.69712058E12, 62087.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[1.69711992E12, 61377.26315789473], [1.6971198E12, 27145.625], [1.69711986E12, 60385.50943396225], [1.69711974E12, 2873.4500000000003]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[1.6971201E12, 67.25], [1.69711992E12, 176.5], [1.69712016E12, 303.0], [1.69712004E12, 189.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[1.69711974E12, 3519.8500000000004]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[1.6971201E12, 70.0], [1.69711992E12, 123.0], [1.69712016E12, 59.0], [1.69712004E12, 153.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[1.6971201E12, 110.0], [1.69711992E12, 300.5], [1.69712016E12, 306.0], [1.69712004E12, 493.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[1.6971201E12, 108.44444444444444], [1.69711992E12, 768.0], [1.69711998E12, 335.0], [1.69711986E12, 1379.5], [1.69712016E12, 164.0]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[1.6971201E12, 116.75], [1.69711992E12, 115.0], [1.69712016E12, 78.0], [1.69712004E12, 128.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[1.69711974E12, 3255.6799999999994]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[1.6971201E12, 63.0], [1.69711992E12, 160.5], [1.69712016E12, 107.0], [1.69712004E12, 188.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[1.6971201E12, 83.75], [1.69711992E12, 114.5], [1.69712016E12, 46.0], [1.69712004E12, 245.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[1.6971201E12, 147.75], [1.69711992E12, 134.5], [1.69712016E12, 57.0], [1.69712004E12, 224.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[1.69711992E12, 60124.625], [1.69711998E12, 60152.91836734693], [1.6971198E12, 17433.375], [1.69711986E12, 60120.8], [1.69711974E12, 4410.142857142857], [1.69712004E12, 31540.47826086957]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[1.69711974E12, 5226.490000000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[1.6971201E12, 80101.18749999999], [1.69711992E12, 61140.8], [1.69711998E12, 60681.25], [1.6971198E12, 44535.0], [1.69711986E12, 60268.625], [1.69711974E12, 7395.5], [1.69712004E12, 10493.571428571433]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[1.6971201E12, 9426.0], [1.6971231E12, 2966070.0], [1.69712064E12, 62085.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[1.69711974E12, 8640.900000000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[1.69711992E12, 60876.471698113215], [1.69711998E12, 60760.210526315794], [1.6971198E12, 29971.615384615387], [1.69711986E12, 60222.75], [1.69711974E12, 4349.714285714285]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[1.69711998E12, 194.0], [1.6971198E12, 190.66666666666666], [1.69711986E12, 186.0], [1.69712004E12, 86.88888888888889]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[1.6971201E12, 47370.0], [1.69711998E12, 60651.0], [1.6971231E12, 2966050.6666666665], [1.69712016E12, 23978.0], [1.69712022E12, 80448.0], [1.69712004E12, 2840.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[1.6971198E12, 54631.15254237288], [1.69711986E12, 60239.21052631579], [1.69711974E12, 7667.136363636364]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[1.69711998E12, 242.5], [1.6971198E12, 163.33333333333334], [1.69711986E12, 222.0], [1.69712004E12, 681.6666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[1.69711968E12, 1048.5], [1.69711974E12, 4767.510416666667]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[1.69711998E12, 222.5], [1.6971198E12, 145.0], [1.6971231E12, 2947979.0], [1.69711986E12, 213.0], [1.69712016E12, 21659.0], [1.69712004E12, 1912.2222222222222]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[1.6971201E12, 8378.0], [1.69711998E12, 182.0], [1.6971198E12, 100.0], [1.6971231E12, 2948521.3333333335], [1.69711986E12, 223.0], [1.69712016E12, 20847.5], [1.69712004E12, 4756.222222222223]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[1.69711998E12, 154.5], [1.6971198E12, 123.66666666666667], [1.69711986E12, 161.0], [1.69712004E12, 868.4444444444446]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[1.6971201E12, 159.25], [1.69711992E12, 172.0], [1.69712016E12, 79.0], [1.69712004E12, 157.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[1.6971198E12, 38320.59090909091], [1.69711974E12, 8415.564102564103]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[1.6971201E12, 75.75], [1.69711992E12, 291.5], [1.69712016E12, 103.0], [1.69712004E12, 138.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[1.6971201E12, 147.25], [1.69711992E12, 255.5], [1.69712016E12, 166.0], [1.69712004E12, 2417.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[1.69711968E12, 838.17]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[1.69711968E12, 872.0], [1.69711974E12, 1064.8749999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[1.69711968E12, 993.0], [1.69711974E12, 1089.5353535353543]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[1.69711968E12, 933.28125], [1.69711974E12, 2324.1323529411766]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[1.69711968E12, 783.6363636363636], [1.69711974E12, 2597.884615384615]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[1.69712046E12, 62098.0], [1.6971231E12, 2972863.0], [1.69712004E12, 23608.0]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[1.69711974E12, 867.8900000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[1.69711974E12, 2280.2800000000007]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[1.69711974E12, 1203.7899999999997]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[1.6971201E12, 64136.71428571428], [1.69711998E12, 60071.5], [1.6971198E12, 28824.0], [1.6971231E12, 2950025.5], [1.69711986E12, 60064.0], [1.69712004E12, 42738.88888888889]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[1.6971201E12, 69142.2380952381], [1.69711992E12, 60987.125], [1.69711998E12, 60664.0], [1.6971231E12, 2973419.0], [1.69711986E12, 60248.333333333336], [1.69712016E12, 54186.25], [1.69711974E12, 11441.25], [1.69712004E12, 22948.272727272724]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[1.69711968E12, 662.3846153846155], [1.69711974E12, 2480.9885057471265]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[1.6971201E12, 29461.39534883721], [1.69711992E12, 60863.0], [1.69711998E12, 60431.75], [1.6971198E12, 60311.0], [1.6971231E12, 2967060.076923077], [1.69712016E12, 29516.894736842103], [1.69711974E12, 4225.666666666667], [1.69712004E12, 11912.25]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[1.69711968E12, 724.7826086956521], [1.69711974E12, 2559.7037037037035]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[1.69711974E12, 1157.6900000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[1.6971201E12, 107.75], [1.69711992E12, 137.0], [1.69712016E12, 78.0], [1.69712004E12, 189.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[1.6971201E12, 11207.0], [1.69711998E12, 322.5], [1.69712034E12, 62069.0], [1.69712004E12, 2921.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[1.6971201E12, 56577.5], [1.69711992E12, 60693.0], [1.6971198E12, 30195.0], [1.69711986E12, 60154.0], [1.69712004E12, 22052.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[1.69712028E12, 62064.0], [1.6971201E12, 15931.0], [1.69711998E12, 549.5], [1.6971231E12, 2951756.0], [1.69712004E12, 14184.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[1.6971201E12, 41660.0], [1.6971204E12, 62083.0], [1.69712004E12, 17432.5]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[1.69711968E12, 746.07]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[1.69711992E12, 1363.6399999999999], [1.69711998E12, 1411.0000000000005], [1.6971198E12, 306.1538461538461], [1.69711986E12, 536.625], [1.69711974E12, 629.2857142857142], [1.69712004E12, 806.6666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[1.6971201E12, 17100.0], [1.69711992E12, 60328.0], [1.6971231E12, 2964987.6], [1.69712016E12, 24781.0], [1.69712004E12, 34311.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[1.6971201E12, 38185.22222222222], [1.69711992E12, 60703.0], [1.69711998E12, 60849.0], [1.6971231E12, 2975115.0], [1.69711986E12, 60325.5], [1.69712016E12, 30973.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[1.69711968E12, 5147.9]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[1.6971201E12, 78.25], [1.69711992E12, 113.5], [1.69712016E12, 67.0], [1.69712004E12, 536.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[1.6971201E12, 55649.0], [1.69712052E12, 62074.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[1.69711992E12, 320.0], [1.69711998E12, 494.55555555555554], [1.6971198E12, 348.0], [1.69712016E12, 107.5], [1.69711974E12, 647.6666666666666], [1.69712004E12, 250.28571428571428]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[1.69712082E12, 62084.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[1.6971201E12, 63.5], [1.69711992E12, 151.0], [1.69712016E12, 66.0], [1.69712004E12, 179.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[1.69711968E12, 2201.38]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[1.69711968E12, 925.6899999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[1.69711968E12, 1066.710843373494], [1.69711974E12, 2951.4705882352946]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[1.69711974E12, 1162.0900000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6971231E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69711968E12, "maxY": 61377.26315789473, "series": [{"data": [[1.69711998E12, 229.0], [1.6971198E12, 163.66666666666666], [1.69711986E12, 268.0], [1.69712004E12, 584.1111111111111]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[1.6971201E12, 1351.6666666666667], [1.69711998E12, 821.0], [1.6971198E12, 197.66666666666666], [1.6971231E12, 1867.0], [1.69711986E12, 683.0], [1.69712016E12, 1662.3333333333335], [1.69712004E12, 8000.777777777777]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[1.6971201E12, 85.75], [1.69711992E12, 124.5], [1.69712016E12, 81.0], [1.69712004E12, 128.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[1.69711998E12, 290.5], [1.6971198E12, 112.66666666666667], [1.6971231E12, 806.0], [1.69711986E12, 159.0], [1.69712004E12, 1742.2222222222224]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[1.69712076E12, 0.0], [1.6971231E12, 555.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[1.6971207E12, 0.0], [1.69712016E12, 5822.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[1.6971201E12, 1549.6], [1.69711992E12, 660.3333333333334], [1.69711998E12, 746.0], [1.6971198E12, 414.0], [1.6971231E12, 1025.5], [1.69712016E12, 1003.5882352941177], [1.69711974E12, 126.33333333333333], [1.69712004E12, 14351.42857142857]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[1.69711992E12, 205.5], [1.69711998E12, 204.55555555555554], [1.6971198E12, 117.0], [1.6971231E12, 4886.75], [1.69712016E12, 614.5], [1.69711974E12, 138.66666666666666], [1.69712004E12, 1401.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[1.6971201E12, 874.0], [1.69711992E12, 163.5], [1.69711998E12, 334.0], [1.6971198E12, 86.0], [1.6971231E12, 763.5238095238094], [1.69712016E12, 328.5], [1.69711974E12, 150.0], [1.69712004E12, 1705.142857142857]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[1.69711968E12, 784.2222222222222], [1.69711974E12, 2180.681318681319]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[1.6971201E12, 76.5], [1.69711992E12, 110.5], [1.69712016E12, 71.0], [1.69712004E12, 306.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[1.6971201E12, 68.25], [1.69711992E12, 147.5], [1.69712016E12, 70.0], [1.69712004E12, 136.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[1.6971201E12, 66.25], [1.69711992E12, 138.0], [1.69712016E12, 186.0], [1.69712004E12, 477.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[1.6971201E12, 69.25], [1.69711992E12, 137.0], [1.69712016E12, 56.0], [1.69712004E12, 166.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[1.69712046E12, 75.0], [1.69712004E12, 32.5]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[1.69711968E12, 1461.3333333333333], [1.69711974E12, 1070.752577319587]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[1.6971201E12, 138.75], [1.69711992E12, 338.5], [1.69712016E12, 73.0], [1.69712004E12, 361.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[1.6971201E12, 79.0], [1.69711992E12, 114.5], [1.69712016E12, 118.0], [1.69712004E12, 155.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[1.6971201E12, 2011.0], [1.69712058E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[1.69711992E12, 61377.26315789473], [1.6971198E12, 27145.25], [1.69711986E12, 60385.50943396225], [1.69711974E12, 2873.25]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[1.6971201E12, 67.25], [1.69711992E12, 176.5], [1.69712016E12, 58.0], [1.69712004E12, 189.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[1.69711974E12, 3519.67]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[1.6971201E12, 70.0], [1.69711992E12, 123.0], [1.69712016E12, 59.0], [1.69712004E12, 153.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[1.6971201E12, 94.25], [1.69711992E12, 291.5], [1.69712016E12, 136.0], [1.69712004E12, 409.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[1.6971201E12, 108.44444444444444], [1.69711992E12, 768.0], [1.69711998E12, 335.0], [1.69711986E12, 1379.5], [1.69712016E12, 164.0]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[1.6971201E12, 116.75], [1.69711992E12, 114.0], [1.69712016E12, 78.0], [1.69712004E12, 128.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[1.69711974E12, 3255.41]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[1.6971201E12, 63.0], [1.69711992E12, 160.5], [1.69712016E12, 107.0], [1.69712004E12, 188.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[1.6971201E12, 81.75], [1.69711992E12, 111.5], [1.69712016E12, 46.0], [1.69712004E12, 245.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[1.6971201E12, 82.75], [1.69711992E12, 120.0], [1.69712016E12, 56.0], [1.69712004E12, 223.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[1.69711992E12, 60124.49999999999], [1.69711998E12, 60152.91836734693], [1.6971198E12, 17432.875], [1.69711986E12, 60120.8], [1.69711974E12, 4410.0], [1.69712004E12, 10467.04347826087]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[1.69711974E12, 5226.11]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[1.6971201E12, 51619.75], [1.69711992E12, 61140.8], [1.69711998E12, 60681.25], [1.6971198E12, 44534.666666666664], [1.69711986E12, 60268.625], [1.69711974E12, 7395.25], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[1.6971201E12, 373.0], [1.6971231E12, 16921.0], [1.69712064E12, 0.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[1.69711974E12, 8640.51]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[1.69711992E12, 60876.471698113215], [1.69711998E12, 60760.210526315794], [1.6971198E12, 29971.230769230773], [1.69711986E12, 60222.75], [1.69711974E12, 4349.571428571428]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[1.69711998E12, 194.0], [1.6971198E12, 190.66666666666666], [1.69711986E12, 186.0], [1.69712004E12, 77.22222222222223]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[1.6971201E12, 26094.0], [1.69711998E12, 60651.0], [1.6971231E12, 1401.0], [1.69712016E12, 377.0], [1.69712022E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[1.6971198E12, 54631.1186440678], [1.69711986E12, 60239.21052631579], [1.69711974E12, 7666.818181818182]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[1.69711998E12, 221.0], [1.6971198E12, 145.0], [1.69711986E12, 219.0], [1.69712004E12, 631.4444444444445]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[1.69711968E12, 1048.5], [1.69711974E12, 4767.489583333334]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[1.69711998E12, 222.5], [1.6971198E12, 145.0], [1.6971231E12, 547.0], [1.69711986E12, 213.0], [1.69712016E12, 372.0], [1.69712004E12, 1912.2222222222222]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[1.6971201E12, 494.0], [1.69711998E12, 182.0], [1.6971198E12, 100.0], [1.6971231E12, 854.0], [1.69711986E12, 223.0], [1.69712016E12, 731.5], [1.69712004E12, 4756.111111111111]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[1.69711998E12, 154.5], [1.6971198E12, 123.33333333333333], [1.69711986E12, 161.0], [1.69712004E12, 868.4444444444446]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[1.6971201E12, 79.25], [1.69711992E12, 151.0], [1.69712016E12, 67.0], [1.69712004E12, 98.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[1.6971198E12, 38320.31818181818], [1.69711974E12, 8415.25641025641]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[1.6971201E12, 67.25], [1.69711992E12, 269.0], [1.69712016E12, 80.0], [1.69712004E12, 65.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[1.6971201E12, 135.25], [1.69711992E12, 245.5], [1.69712016E12, 159.0], [1.69712004E12, 2393.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[1.69711968E12, 826.3799999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[1.69711968E12, 852.0], [1.69711974E12, 1040.34375]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[1.69711968E12, 993.0], [1.69711974E12, 1088.3434343434344]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[1.69711968E12, 913.1249999999999], [1.69711974E12, 2273.0882352941167]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[1.69711968E12, 769.8181818181819], [1.69711974E12, 2575.6538461538453]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[1.69712046E12, 0.0], [1.6971231E12, 1038.5], [1.69712004E12, 23607.5]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[1.69711974E12, 867.66]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[1.69711974E12, 2265.1100000000006]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[1.69711974E12, 1203.7899999999997]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[1.6971201E12, 34429.71428571429], [1.69711998E12, 60071.5], [1.6971198E12, 28823.333333333336], [1.6971231E12, 52.0], [1.69711986E12, 60064.0], [1.69712004E12, 6673.888888888888]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[1.6971201E12, 41401.79365079364], [1.69711992E12, 60986.87499999999], [1.69711998E12, 60664.0], [1.6971231E12, 1357.5], [1.69711986E12, 60248.333333333336], [1.69712016E12, 12419.25], [1.69711974E12, 11440.75], [1.69712004E12, 5530.818181818182]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[1.69711968E12, 600.6153846153846], [1.69711974E12, 2443.44827586207]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[1.6971201E12, 10594.60465116279], [1.69711992E12, 60863.0], [1.69711998E12, 60431.75], [1.6971198E12, 60311.0], [1.6971231E12, 890.6153846153846], [1.69712016E12, 1980.3157894736844], [1.69711974E12, 4225.666666666667], [1.69712004E12, 4664.5]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[1.69711968E12, 684.6739130434783], [1.69711974E12, 2470.5370370370374]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[1.69711974E12, 1156.7699999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[1.6971201E12, 74.0], [1.69711992E12, 123.0], [1.69712016E12, 70.0], [1.69712004E12, 179.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[1.6971201E12, 915.0], [1.69711998E12, 270.0], [1.69712034E12, 0.0], [1.69712004E12, 1652.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[1.6971201E12, 19952.999999999996], [1.69711992E12, 60693.0], [1.6971198E12, 30194.5], [1.69711986E12, 60154.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[1.69712028E12, 0.0], [1.6971201E12, 866.0], [1.69711998E12, 549.5], [1.6971231E12, 191.0], [1.69712004E12, 14184.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[1.6971201E12, 13218.5], [1.6971204E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[1.69711968E12, 737.83]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[1.69711992E12, 1295.1399999999999], [1.69711998E12, 1347.5000000000002], [1.6971198E12, 234.30769230769232], [1.69711986E12, 502.25], [1.69711974E12, 421.1428571428571], [1.69712004E12, 713.5]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[1.6971201E12, 870.75], [1.69711992E12, 60328.0], [1.6971231E12, 612.6], [1.69712016E12, 619.0], [1.69712004E12, 30271.5]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[1.6971201E12, 19464.666666666668], [1.69711992E12, 60703.0], [1.69711998E12, 60849.0], [1.6971231E12, 882.0], [1.69711986E12, 60325.5], [1.69712016E12, 2015.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[1.69711968E12, 5146.740000000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[1.6971201E12, 70.25], [1.69711992E12, 100.0], [1.69712016E12, 56.0], [1.69712004E12, 444.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[1.6971201E12, 35012.5], [1.69712052E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[1.69711992E12, 320.0], [1.69711998E12, 494.55555555555554], [1.6971198E12, 348.0], [1.69712016E12, 107.5], [1.69711974E12, 647.6666666666666], [1.69712004E12, 250.28571428571428]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[1.69712082E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[1.6971201E12, 59.0], [1.69711992E12, 125.0], [1.69712016E12, 59.0], [1.69712004E12, 154.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[1.69711968E12, 2172.960000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[1.69711968E12, 914.7099999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[1.69711968E12, 1018.4698795180725], [1.69711974E12, 2924.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[1.69711974E12, 1159.4999999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6971231E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69711968E12, "maxY": 62098.0, "series": [{"data": [[1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.69711986E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[1.6971201E12, 1002.6666666666667], [1.69711998E12, 365.0], [1.6971198E12, 42.333333333333336], [1.6971231E12, 472.0], [1.69711986E12, 523.0], [1.69712016E12, 655.0], [1.69712004E12, 4879.666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.6971231E12, 0.0], [1.69711986E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[1.69712076E12, 62074.0], [1.6971231E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[1.6971207E12, 62095.0], [1.69712016E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[1.6971201E12, 707.9], [1.69711992E12, 304.0], [1.69711998E12, 248.25000000000003], [1.6971198E12, 202.0], [1.6971231E12, 0.0], [1.69712016E12, 28.41176470588235], [1.69711974E12, 0.0], [1.69712004E12, 8266.857142857143]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[1.69711992E12, 0.0], [1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.6971231E12, 0.0], [1.69712016E12, 0.0], [1.69711974E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[1.6971201E12, 245.5], [1.69711992E12, 0.0], [1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.6971231E12, 0.0], [1.69712016E12, 0.0], [1.69711974E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[1.69711968E12, 0.0], [1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[1.69712046E12, 61.0], [1.69712004E12, 19.0]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[1.69711968E12, 0.0], [1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[1.6971201E12, 1446.0], [1.69712058E12, 62087.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[1.69711992E12, 566.3684210526316], [1.6971198E12, 0.0], [1.69711986E12, 270.52830188679246], [1.69711974E12, 139.15]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[1.6971201E12, 69.11111111111111], [1.69711992E12, 512.0], [1.69711998E12, 119.0], [1.69711986E12, 1213.5], [1.69712016E12, 62.0]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[1.69711974E12, 99.88999999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[1.69711992E12, 0.0], [1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.69711986E12, 0.0], [1.69711974E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[1.6971201E12, 6389.249999999999], [1.69711992E12, 327.8], [1.69711998E12, 549.625], [1.6971198E12, 0.0], [1.69711986E12, 0.0], [1.69711974E12, 0.0], [1.69712004E12, 413.6428571428571]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.6971231E12, 0.0], [1.69712064E12, 62085.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[1.69711992E12, 509.4339622641509], [1.69711998E12, 647.3157894736843], [1.6971198E12, 16.615384615384617], [1.69711986E12, 0.0], [1.69711974E12, 31.285714285714285]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.69711986E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[1.6971201E12, 6793.0], [1.69711998E12, 297.0], [1.6971231E12, 0.0], [1.69712016E12, 0.0], [1.69712022E12, 0.0], [1.69712004E12, 201.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[1.6971198E12, 170.05084745762716], [1.69711986E12, 104.3157894736842], [1.69711974E12, 130.04545454545456]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.69711986E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[1.69711968E12, 703.5], [1.69711974E12, 3882.624999999999]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.6971231E12, 0.0], [1.69711986E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.6971231E12, 0.0], [1.69711986E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 783.6666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.69711986E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[1.6971198E12, 14.727272727272727], [1.69711974E12, 40.923076923076934]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[1.6971201E12, 57.5], [1.69711992E12, 123.5], [1.69712016E12, 49.0], [1.69712004E12, 1387.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[1.69711968E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[1.69711968E12, 0.0], [1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[1.69711968E12, 0.0], [1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[1.69711968E12, 0.0], [1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[1.69711968E12, 0.0], [1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[1.69712046E12, 62098.0], [1.6971231E12, 261.0], [1.69712004E12, 3545.0]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711998E12, 0.0], [1.6971198E12, 0.0], [1.6971231E12, 0.0], [1.69711986E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[1.6971201E12, 5598.444444444445], [1.69711992E12, 756.75], [1.69711998E12, 529.2], [1.6971231E12, 954.5], [1.69711986E12, 112.66666666666667], [1.69712016E12, 1286.5], [1.69711974E12, 0.0], [1.69712004E12, 421.6363636363636]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[1.69711968E12, 0.0], [1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[1.6971201E12, 1835.093023255814], [1.69711992E12, 248.66666666666666], [1.69711998E12, 252.0], [1.6971198E12, 226.0], [1.6971231E12, 344.84615384615387], [1.69712016E12, 740.9473684210527], [1.69711974E12, 309.3333333333333], [1.69712004E12, 1265.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[1.69711968E12, 0.0], [1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[1.6971201E12, 482.0], [1.69711998E12, 0.0], [1.69712034E12, 62069.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.6971198E12, 0.0], [1.69711986E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[1.69712028E12, 62064.0], [1.6971201E12, 0.0], [1.69711998E12, 290.0], [1.6971231E12, 0.0], [1.69712004E12, 7975.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.6971204E12, 62083.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[1.69711968E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[1.69711992E12, 449.3200000000001], [1.69711998E12, 877.625], [1.6971198E12, 69.53846153846155], [1.69711986E12, 246.12499999999997], [1.69711974E12, 28.571428571428573], [1.69712004E12, 335.5]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[1.6971201E12, 456.0], [1.69711992E12, 181.5], [1.6971231E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 338.5]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[1.6971201E12, 2848.777777777778], [1.69711992E12, 438.0], [1.69711998E12, 732.0], [1.6971231E12, 435.0], [1.69711986E12, 0.0], [1.69712016E12, 1300.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[1.69711968E12, 1162.7999999999995]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[1.6971201E12, 3819.5], [1.69712052E12, 62074.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[1.69711992E12, 194.0], [1.69711998E12, 248.77777777777777], [1.6971198E12, 267.0], [1.69712016E12, 85.5], [1.69711974E12, 434.0], [1.69712004E12, 204.2857142857143]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[1.69712082E12, 62084.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[1.6971201E12, 0.0], [1.69711992E12, 0.0], [1.69712016E12, 0.0], [1.69712004E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[1.69711968E12, 1324.06]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[1.69711968E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[1.69711968E12, 0.0], [1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[1.69711974E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6971231E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 46.0, "minX": 1.69711968E12, "maxY": 47216.0, "series": [{"data": [[1.6971201E12, 352.0], [1.69712046E12, 75.0], [1.69711992E12, 2713.0], [1.69711998E12, 6653.0], [1.6971198E12, 37627.0], [1.69711986E12, 2271.0], [1.69711968E12, 9061.0], [1.69712016E12, 306.0], [1.69711974E12, 15947.0], [1.69712004E12, 47216.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6971201E12, 157.0], [1.69712046E12, 75.0], [1.69711992E12, 2174.7], [1.69711998E12, 1169.4], [1.6971198E12, 26964.2], [1.69711986E12, 1022.700000000002], [1.69711968E12, 3746.200000000001], [1.69712016E12, 256.20000000000016], [1.69711974E12, 8050.200000000005], [1.69712004E12, 10534.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6971201E12, 352.0], [1.69712046E12, 75.0], [1.69711992E12, 2712.43], [1.69711998E12, 6653.0], [1.6971198E12, 37627.0], [1.69711986E12, 2271.0], [1.69711968E12, 8478.880000000001], [1.69712016E12, 306.0], [1.69711974E12, 13611.8], [1.69712004E12, 32732.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6971201E12, 271.0], [1.69712046E12, 75.0], [1.69711992E12, 2433.199999999998], [1.69711998E12, 1392.25], [1.6971198E12, 34343.399999999994], [1.69711986E12, 2271.0], [1.69711968E12, 6406.1], [1.69712016E12, 305.4], [1.69711974E12, 11134.399999999996], [1.69712004E12, 15653.5]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6971201E12, 50.0], [1.69712046E12, 75.0], [1.69711992E12, 100.0], [1.69711998E12, 91.0], [1.6971198E12, 87.0], [1.69711986E12, 159.0], [1.69711968E12, 75.0], [1.69712016E12, 46.0], [1.69711974E12, 63.0], [1.69712004E12, 49.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6971201E12, 74.0], [1.69712046E12, 75.0], [1.69711992E12, 478.5], [1.69711998E12, 394.0], [1.6971198E12, 5122.0], [1.69711986E12, 472.0], [1.69711968E12, 943.0], [1.69712016E12, 83.0], [1.69711974E12, 1938.0], [1.69712004E12, 468.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69712046E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 76.0, "minX": 1.0, "maxY": 2952822.0, "series": [{"data": [[2.0, 441.0], [3.0, 1402.0], [4.0, 231.0], [5.0, 303.0], [6.0, 577.0], [7.0, 763.0], [8.0, 173.0], [9.0, 9296.0], [10.0, 1486.5], [11.0, 1265.0], [12.0, 324.0], [13.0, 139.5], [14.0, 79.0], [15.0, 724.5], [16.0, 4253.0], [17.0, 76.0], [18.0, 1809.0], [19.0, 84.0], [20.0, 147.5], [21.0, 325.0], [22.0, 5607.0], [23.0, 2220.0], [24.0, 4770.0], [25.0, 2514.5], [26.0, 2207.0], [27.0, 2675.0], [29.0, 3604.0], [31.0, 1751.0], [33.0, 904.0], [32.0, 2210.0], [34.0, 1967.0], [35.0, 10893.0], [37.0, 6320.0], [38.0, 2496.0], [41.0, 2725.0], [40.0, 807.0], [43.0, 2901.5], [42.0, 12064.0], [48.0, 9072.0], [50.0, 1602.0], [55.0, 790.0], [54.0, 5543.5], [57.0, 1780.0], [61.0, 511.0], [60.0, 2214.5], [68.0, 549.5], [71.0, 1260.0], [69.0, 1026.0], [73.0, 1154.0], [72.0, 1199.0], [74.0, 1147.0], [83.0, 832.0], [86.0, 1134.0], [84.0, 1794.0], [85.0, 905.0], [96.0, 901.0], [98.0, 732.0], [103.0, 1173.0], [1.0, 2271.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 60150.0], [32.0, 61888.0], [35.0, 60262.0], [37.0, 60299.0], [40.0, 60809.0], [3.0, 60310.0], [4.0, 60324.0], [5.0, 60147.0], [89.0, 2952822.0], [6.0, 23978.0], [110.0, 10391.5], [7.0, 60349.0], [8.0, 21453.0], [9.0, 17351.0], [10.0, 60172.5], [11.0, 60321.0], [12.0, 60114.0], [13.0, 60154.0], [14.0, 18924.0], [15.0, 36936.0], [1.0, 60651.0], [16.0, 60216.0], [17.0, 68588.0], [19.0, 60115.0], [21.0, 60108.0], [22.0, 60309.5], [27.0, 60595.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 110.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 61888.0, "series": [{"data": [[2.0, 441.0], [3.0, 1321.0], [4.0, 207.0], [5.0, 288.0], [6.0, 577.0], [7.0, 685.5], [8.0, 173.0], [9.0, 9295.0], [10.0, 1416.0], [11.0, 1048.0], [12.0, 241.0], [13.0, 117.0], [14.0, 74.0], [15.0, 701.5], [16.0, 4253.0], [17.0, 68.0], [18.0, 1758.5], [19.0, 76.0], [20.0, 104.5], [21.0, 303.0], [22.0, 5607.0], [23.0, 2220.0], [24.0, 4769.0], [25.0, 2474.5], [26.0, 2175.5], [27.0, 2645.0], [29.0, 3603.5], [31.0, 1706.0], [33.0, 875.5], [32.0, 2124.0], [34.0, 1914.5], [35.0, 10893.0], [37.0, 6318.5], [38.0, 2478.0], [41.0, 2707.0], [40.0, 773.5], [43.0, 2874.0], [42.0, 12064.0], [48.0, 9071.5], [50.0, 1602.0], [55.0, 775.0], [54.0, 5543.5], [57.0, 1749.0], [61.0, 495.0], [60.0, 2191.0], [68.0, 538.5], [71.0, 1256.0], [69.0, 1026.0], [73.0, 1142.5], [72.0, 1189.5], [74.0, 1147.0], [83.0, 816.0], [86.0, 1130.5], [84.0, 1794.0], [85.0, 905.0], [96.0, 888.5], [98.0, 722.0], [103.0, 1166.0], [1.0, 2271.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 60097.0], [32.0, 61888.0], [35.0, 60262.0], [37.0, 60299.0], [40.0, 60809.0], [3.0, 56064.0], [4.0, 54086.0], [5.0, 52188.0], [89.0, 553.0], [6.0, 2874.0], [110.0, 0.0], [7.0, 55471.5], [8.0, 1237.0], [9.0, 1252.0], [10.0, 974.5], [11.0, 52059.0], [12.0, 60114.0], [13.0, 60113.0], [14.0, 953.0], [15.0, 2178.0], [1.0, 60095.0], [16.0, 60216.0], [17.0, 16826.0], [19.0, 60115.0], [21.0, 60108.0], [22.0, 60309.5], [27.0, 60595.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 110.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69711968E12, "maxY": 30.8, "series": [{"data": [[1.69712028E12, 0.016666666666666666], [1.69711992E12, 3.3], [1.69711998E12, 2.8], [1.69712058E12, 0.016666666666666666], [1.69712052E12, 0.016666666666666666], [1.69711986E12, 1.9666666666666666], [1.69712016E12, 1.3166666666666667], [1.69712022E12, 0.016666666666666666], [1.69712076E12, 0.016666666666666666], [1.6971201E12, 4.416666666666667], [1.69712046E12, 0.03333333333333333], [1.6971204E12, 0.016666666666666666], [1.6971198E12, 2.6666666666666665], [1.6971207E12, 0.016666666666666666], [1.69711968E12, 13.6], [1.69712064E12, 0.016666666666666666], [1.69711974E12, 30.8], [1.69712034E12, 0.016666666666666666], [1.69712004E12, 4.45]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69712076E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69711968E12, "maxY": 30.783333333333335, "series": [{"data": [[1.6971231E12, 1.65], [1.69712004E12, 1.6666666666666667]], "isOverall": false, "label": "Non HTTP response code: javax.net.ssl.SSLException", "isController": false}, {"data": [[1.6971201E12, 1.4833333333333334], [1.69712046E12, 0.016666666666666666], [1.69711992E12, 1.6666666666666667], [1.69711998E12, 1.2], [1.6971198E12, 1.45], [1.69711986E12, 0.3], [1.69711968E12, 11.95], [1.69712016E12, 0.38333333333333336], [1.69711974E12, 30.783333333333335], [1.69712004E12, 2.4833333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69712022E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketTimeoutException", "isController": false}, {"data": [[1.69712028E12, 0.016666666666666666], [1.69712076E12, 0.016666666666666666], [1.69712046E12, 0.016666666666666666], [1.6971204E12, 0.016666666666666666], [1.69712058E12, 0.016666666666666666], [1.69712052E12, 0.016666666666666666], [1.6971207E12, 0.016666666666666666], [1.69712064E12, 0.016666666666666666], [1.69712034E12, 0.016666666666666666], [1.69712082E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.conn.HttpHostConnectException", "isController": false}, {"data": [[1.6971201E12, 2.933333333333333], [1.69712016E12, 0.9333333333333333], [1.69712004E12, 0.016666666666666666]], "isOverall": false, "label": "502", "isController": false}, {"data": [[1.69711992E12, 1.6666666666666667], [1.69711998E12, 1.5666666666666667], [1.6971198E12, 1.2166666666666666], [1.69711986E12, 1.6666666666666667], [1.69712004E12, 0.11666666666666667]], "isOverall": false, "label": "504", "isController": false}, {"data": [[1.69712004E12, 0.16666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6971231E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69711968E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.69711992E12, 0.03333333333333333], [1.69711998E12, 0.15], [1.6971198E12, 0.016666666666666666], [1.69711974E12, 0.05], [1.69712004E12, 0.11666666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-63-success", "isController": false}, {"data": [[1.6971231E12, 0.06666666666666667], [1.69712016E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-63-failure", "isController": false}, {"data": [[1.69711974E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51-success", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.6971198E12, 0.05], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.15]], "isOverall": false, "label": "Tenders_Page/_next/image/-67-success", "isController": false}, {"data": [[1.6971198E12, 0.016666666666666666], [1.69711974E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79-success", "isController": false}, {"data": [[1.6971201E12, 0.016666666666666666], [1.69712034E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-101-failure", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87-success", "isController": false}, {"data": [[1.69712082E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-110-failure", "isController": false}, {"data": [[1.6971201E12, 1.05], [1.69711992E12, 0.13333333333333333], [1.69711998E12, 0.08333333333333333], [1.6971231E12, 0.03333333333333333], [1.69711986E12, 0.05], [1.69712016E12, 0.06666666666666667], [1.69712004E12, 0.18333333333333332]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60-failure", "isController": false}, {"data": [[1.69711992E12, 0.03333333333333333], [1.69711998E12, 0.15], [1.6971198E12, 0.016666666666666666], [1.69712016E12, 0.03333333333333333], [1.69711974E12, 0.05], [1.69712004E12, 0.11666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-65-success", "isController": false}, {"data": [[1.69711968E12, 0.06666666666666667], [1.69711974E12, 1.6]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40-success", "isController": false}, {"data": [[1.6971198E12, 0.16666666666666666], [1.69711974E12, 1.3]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50-success", "isController": false}, {"data": [[1.6971201E12, 0.26666666666666666], [1.69711992E12, 0.08333333333333333], [1.69711998E12, 0.13333333333333333], [1.6971198E12, 0.03333333333333333], [1.69711986E12, 0.13333333333333333], [1.69712004E12, 0.9333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58-failure", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.69712004E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-101-success", "isController": false}, {"data": [[1.69711992E12, 0.8333333333333334], [1.69711998E12, 0.26666666666666666], [1.6971198E12, 0.21666666666666667], [1.69711986E12, 0.13333333333333333], [1.69711974E12, 0.11666666666666667], [1.69712004E12, 0.1]], "isOverall": false, "label": "Tenders_Page/_next/image/-57-success", "isController": false}, {"data": [[1.69711974E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49-success", "isController": false}, {"data": [[1.6971201E12, 0.03333333333333333], [1.69712052E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105-failure", "isController": false}, {"data": [[1.69711968E12, 0.05], [1.69711974E12, 1.6166666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46-success", "isController": false}, {"data": [[1.6971231E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-72-failure", "isController": false}, {"data": [[1.6971198E12, 0.2]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50-failure", "isController": false}, {"data": [[1.69712076E12, 0.016666666666666666], [1.6971231E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109-failure", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96-success", "isController": false}, {"data": [[1.6971201E12, 0.016666666666666666], [1.69711998E12, 0.03333333333333333], [1.6971231E12, 0.05], [1.69712016E12, 0.016666666666666666], [1.69712022E12, 0.016666666666666666], [1.69712004E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99-failure", "isController": false}, {"data": [[1.6971198E12, 0.11666666666666667], [1.69711974E12, 0.36666666666666664]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54-success", "isController": false}, {"data": [[1.6971198E12, 0.8666666666666667], [1.69711986E12, 0.31666666666666665]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54-failure", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.6971198E12, 0.05], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.15]], "isOverall": false, "label": "Tenders_Page/_next/image/-72-success", "isController": false}, {"data": [[1.6971231E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-67-failure", "isController": false}, {"data": [[1.69711992E12, 0.05], [1.69711998E12, 0.13333333333333333], [1.6971198E12, 0.016666666666666666], [1.69711974E12, 0.05], [1.69712004E12, 0.11666666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-64-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88-success", "isController": false}, {"data": [[1.6971201E12, 0.16666666666666666], [1.6971231E12, 0.6], [1.69712016E12, 0.2833333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-64-failure", "isController": false}, {"data": [[1.6971201E12, 0.016666666666666666], [1.6971231E12, 0.016666666666666666], [1.69712064E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108-failure", "isController": false}, {"data": [[1.69711968E12, 0.15], [1.69711974E12, 1.5166666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36-success", "isController": false}, {"data": [[1.69711968E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30-success", "isController": false}, {"data": [[1.69711968E12, 0.36666666666666664], [1.69711974E12, 1.3]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37-success", "isController": false}, {"data": [[1.6971201E12, 0.7166666666666667], [1.69711992E12, 0.05], [1.69711998E12, 0.13333333333333333], [1.6971198E12, 0.016666666666666666], [1.6971231E12, 0.21666666666666667], [1.69712016E12, 0.31666666666666665], [1.69712004E12, 0.13333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61-failure", "isController": false}, {"data": [[1.69711992E12, 0.31666666666666665], [1.69711986E12, 0.8833333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56-failure", "isController": false}, {"data": [[1.6971198E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76-success", "isController": false}, {"data": [[1.6971198E12, 0.13333333333333333], [1.69711974E12, 0.11666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59-success", "isController": false}, {"data": [[1.69711968E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32-success", "isController": false}, {"data": [[1.6971198E12, 0.13333333333333333], [1.69711974E12, 0.3333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85-success", "isController": false}, {"data": [[1.69711968E12, 0.016666666666666666], [1.69711974E12, 1.65]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89-success", "isController": false}, {"data": [[1.69711992E12, 0.13333333333333333], [1.69711998E12, 0.8166666666666667], [1.69711986E12, 0.08333333333333333], [1.69712004E12, 0.38333333333333336]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59-failure", "isController": false}, {"data": [[1.6971201E12, 0.13333333333333333], [1.69711992E12, 0.016666666666666666], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.05]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76-failure", "isController": false}, {"data": [[1.69711968E12, 0.7666666666666667], [1.69711974E12, 0.9]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34-success", "isController": false}, {"data": [[1.6971201E12, 0.05], [1.6971231E12, 0.016666666666666666], [1.69712016E12, 0.05], [1.69712004E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-68-failure", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.6971198E12, 0.05], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.13333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-68-success", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.6971198E12, 0.05], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.15]], "isOverall": false, "label": "Tenders_Page/_next/image/-73-success", "isController": false}, {"data": [[1.69711974E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48-success", "isController": false}, {"data": [[1.69712004E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-104-failure", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80-success", "isController": false}, {"data": [[1.6971201E12, 0.15], [1.69711992E12, 0.016666666666666666], [1.69711998E12, 0.016666666666666666], [1.6971231E12, 0.016666666666666666], [1.69711986E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75-failure", "isController": false}, {"data": [[1.69711974E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52-success", "isController": false}, {"data": [[1.69711968E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29-success", "isController": false}, {"data": [[1.69711974E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92-success", "isController": false}, {"data": [[1.69712046E12, 0.016666666666666666], [1.69712004E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-104-success", "isController": false}, {"data": [[1.69711968E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33-success", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.6971198E12, 0.05], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.15]], "isOverall": false, "label": "Tenders_Page/_next/image/-70-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93-success", "isController": false}, {"data": [[1.69711974E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-43-success", "isController": false}, {"data": [[1.69711974E12, 0.05]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61-success", "isController": false}, {"data": [[1.6971201E12, 0.15], [1.69711992E12, 0.016666666666666666], [1.69711998E12, 0.016666666666666666], [1.69711986E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-77-success", "isController": false}, {"data": [[1.6971198E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.6971231E12, 0.08333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78-failure", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.6971198E12, 0.05], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.15]], "isOverall": false, "label": "Tenders_Page/_next/image/-69-success", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.6971198E12, 0.05], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.15]], "isOverall": false, "label": "Tenders_Page/_next/image/-74-success", "isController": false}, {"data": [[1.6971201E12, 0.03333333333333333], [1.6971204E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102-failure", "isController": false}, {"data": [[1.69711968E12, 0.5333333333333333], [1.69711974E12, 1.1333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84-success", "isController": false}, {"data": [[1.6971201E12, 0.11666666666666667], [1.69711998E12, 0.03333333333333333], [1.6971198E12, 0.016666666666666666], [1.6971231E12, 0.03333333333333333], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.15]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66-failure", "isController": false}, {"data": [[1.69711968E12, 1.3833333333333333], [1.69711974E12, 0.2833333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39-success", "isController": false}, {"data": [[1.69711974E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53-success", "isController": false}, {"data": [[1.69712046E12, 0.016666666666666666], [1.6971231E12, 0.03333333333333333], [1.69712004E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103-failure", "isController": false}, {"data": [[1.69711968E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95-success", "isController": false}, {"data": [[1.6971201E12, 0.03333333333333333], [1.69712058E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106-failure", "isController": false}, {"data": [[1.69711974E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86-success", "isController": false}, {"data": [[1.69711992E12, 0.03333333333333333], [1.69711998E12, 0.15], [1.6971198E12, 0.016666666666666666], [1.69711974E12, 0.05], [1.69712004E12, 0.11666666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-62-success", "isController": false}, {"data": [[1.69712028E12, 0.016666666666666666], [1.6971201E12, 0.016666666666666666], [1.6971231E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-100-failure", "isController": false}, {"data": [[1.69711992E12, 0.8833333333333333], [1.69711998E12, 0.31666666666666665], [1.6971198E12, 0.08333333333333333], [1.69711986E12, 0.13333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55-failure", "isController": false}, {"data": [[1.69712004E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94-success", "isController": false}, {"data": [[1.6971207E12, 0.016666666666666666], [1.69712016E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107-failure", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.69712004E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-100-success", "isController": false}, {"data": [[1.6971201E12, 0.03333333333333333], [1.6971231E12, 0.35], [1.69712016E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-62-failure", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97-success", "isController": false}, {"data": [[1.69711998E12, 0.03333333333333333], [1.6971198E12, 0.05], [1.69711986E12, 0.016666666666666666], [1.69712004E12, 0.15]], "isOverall": false, "label": "Tenders_Page/_next/image/-71-success", "isController": false}, {"data": [[1.6971201E12, 0.016666666666666666], [1.6971231E12, 0.05], [1.69712016E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-71-failure", "isController": false}, {"data": [[1.69711974E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-42-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90-success", "isController": false}, {"data": [[1.6971201E12, 0.06666666666666667], [1.69711992E12, 0.03333333333333333], [1.69712016E12, 0.016666666666666666], [1.69712004E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83-success", "isController": false}, {"data": [[1.69711974E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60-success", "isController": false}, {"data": [[1.69711968E12, 0.06666666666666667], [1.69711974E12, 1.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41-success", "isController": false}, {"data": [[1.69711968E12, 0.21666666666666667], [1.69711974E12, 1.45]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38-success", "isController": false}, {"data": [[1.6971198E12, 0.13333333333333333], [1.69711974E12, 0.11666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6971231E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69711968E12, "maxY": 30.783333333333335, "series": [{"data": [[1.6971201E12, 1.4833333333333334], [1.69712046E12, 0.016666666666666666], [1.69711992E12, 1.6666666666666667], [1.69711998E12, 1.2], [1.6971198E12, 1.45], [1.69711986E12, 0.3], [1.69711968E12, 11.95], [1.69712016E12, 0.38333333333333336], [1.69711974E12, 30.783333333333335], [1.69712004E12, 2.4833333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.69712028E12, 0.016666666666666666], [1.69711992E12, 1.6666666666666667], [1.69711998E12, 1.5666666666666667], [1.69712058E12, 0.016666666666666666], [1.69712052E12, 0.016666666666666666], [1.6971231E12, 1.65], [1.69711986E12, 1.6666666666666667], [1.69712016E12, 0.9333333333333333], [1.69712022E12, 0.016666666666666666], [1.69712082E12, 0.016666666666666666], [1.69712076E12, 0.016666666666666666], [1.6971201E12, 2.933333333333333], [1.69712046E12, 0.016666666666666666], [1.6971204E12, 0.016666666666666666], [1.6971198E12, 1.2166666666666666], [1.6971207E12, 0.016666666666666666], [1.69712064E12, 0.016666666666666666], [1.69712034E12, 0.016666666666666666], [1.69712004E12, 1.9666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6971231E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
