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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 88.0, "series": [{"data": [[0.0, 6.0], [300.0, 9.0], [600.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [100.0, 29.0], [200.0, 49.0], [400.0, 3.0], [800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[0.0, 9.0], [1100.0, 1.0], [2300.0, 2.0], [600.0, 3.0], [300.0, 4.0], [1300.0, 1.0], [200.0, 14.0], [100.0, 66.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[0.0, 52.0], [8200.0, 1.0], [300.0, 8.0], [1300.0, 2.0], [1400.0, 2.0], [1500.0, 2.0], [100.0, 19.0], [200.0, 10.0], [400.0, 2.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[0.0, 42.0], [300.0, 4.0], [600.0, 1.0], [700.0, 1.0], [100.0, 39.0], [200.0, 9.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[0.0, 23.0], [68200.0, 1.0], [62000.0, 17.0], [62100.0, 3.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[0.0, 23.0], [62000.0, 21.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[8500.0, 1.0], [9100.0, 1.0], [600.0, 1.0], [2400.0, 1.0], [700.0, 1.0], [200.0, 24.0], [900.0, 1.0], [1000.0, 3.0], [4500.0, 1.0], [300.0, 42.0], [100.0, 3.0], [400.0, 10.0], [6700.0, 1.0], [7100.0, 1.0], [7900.0, 2.0], [500.0, 7.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[0.0, 82.0], [300.0, 1.0], [700.0, 1.0], [100.0, 12.0], [200.0, 2.0], [2000.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[0.0, 70.0], [4200.0, 1.0], [300.0, 3.0], [600.0, 6.0], [200.0, 3.0], [100.0, 10.0], [800.0, 3.0], [400.0, 2.0], [1600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[0.0, 1.0], [2200.0, 1.0], [600.0, 4.0], [700.0, 5.0], [200.0, 15.0], [800.0, 6.0], [900.0, 4.0], [1000.0, 3.0], [1100.0, 3.0], [300.0, 17.0], [1400.0, 4.0], [1500.0, 3.0], [400.0, 13.0], [100.0, 6.0], [1700.0, 1.0], [500.0, 14.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[0.0, 47.0], [300.0, 6.0], [600.0, 2.0], [5100.0, 1.0], [1300.0, 1.0], [332900.0, 1.0], [100.0, 31.0], [200.0, 6.0], [400.0, 4.0], [15200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[0.0, 45.0], [35100.0, 1.0], [2400.0, 1.0], [188900.0, 1.0], [100.0, 42.0], [200.0, 8.0], [15200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[0.0, 46.0], [300.0, 2.0], [41300.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [100.0, 37.0], [200.0, 8.0], [400.0, 1.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[0.0, 47.0], [35000.0, 1.0], [300.0, 5.0], [40100.0, 1.0], [25100.0, 1.0], [100.0, 32.0], [200.0, 9.0], [400.0, 1.0], [112900.0, 1.0], [116900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[0.0, 37.0], [600.0, 1.0], [11000.0, 1.0], [700.0, 2.0], [3100.0, 1.0], [200.0, 3.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [300.0, 4.0], [79900.0, 1.0], [1300.0, 1.0], [5300.0, 1.0], [400.0, 1.0], [100.0, 14.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 1.0], [300.0, 21.0], [600.0, 3.0], [1300.0, 1.0], [700.0, 6.0], [400.0, 15.0], [100.0, 10.0], [200.0, 17.0], [800.0, 3.0], [900.0, 2.0], [500.0, 19.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[0.0, 65.0], [300.0, 2.0], [700.0, 1.0], [100.0, 23.0], [200.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[0.0, 65.0], [700.0, 2.0], [100.0, 22.0], [200.0, 9.0], [400.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[0.0, 12.0], [1213600.0, 4.0], [11000.0, 1.0], [1213300.0, 10.0], [1213700.0, 2.0], [1213400.0, 1.0], [7400.0, 1.0], [60100.0, 7.0], [60400.0, 2.0], [62000.0, 20.0], [62100.0, 1.0], [1213500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[700.0, 2.0], [900.0, 1.0], [1000.0, 3.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 1.0], [1800.0, 1.0], [2000.0, 1.0], [2100.0, 1.0], [2400.0, 2.0], [2500.0, 1.0], [2600.0, 5.0], [2700.0, 3.0], [2900.0, 2.0], [3000.0, 1.0], [3200.0, 1.0], [3400.0, 2.0], [3600.0, 1.0], [3700.0, 1.0], [3800.0, 3.0], [3900.0, 1.0], [4300.0, 1.0], [4200.0, 1.0], [4100.0, 1.0], [4500.0, 1.0], [4600.0, 2.0], [4700.0, 1.0], [5000.0, 1.0], [4900.0, 1.0], [5100.0, 1.0], [5400.0, 1.0], [5500.0, 1.0], [5600.0, 1.0], [5800.0, 1.0], [5700.0, 1.0], [6000.0, 1.0], [6200.0, 1.0], [6500.0, 1.0], [7800.0, 1.0], [8000.0, 1.0], [8200.0, 1.0], [8700.0, 1.0], [8900.0, 1.0], [9100.0, 1.0], [9000.0, 1.0], [8800.0, 1.0], [9500.0, 1.0], [10600.0, 1.0], [13500.0, 1.0], [13700.0, 1.0], [15300.0, 1.0], [100.0, 2.0], [29600.0, 1.0], [31200.0, 1.0], [31000.0, 1.0], [32100.0, 1.0], [200.0, 3.0], [60100.0, 18.0], [300.0, 1.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[0.0, 62.0], [300.0, 1.0], [100.0, 27.0], [400.0, 3.0], [200.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[0.0, 1.0], [8700.0, 3.0], [8600.0, 1.0], [9000.0, 2.0], [9200.0, 2.0], [8900.0, 1.0], [600.0, 11.0], [9600.0, 1.0], [9500.0, 1.0], [9400.0, 2.0], [9900.0, 1.0], [700.0, 4.0], [800.0, 3.0], [900.0, 6.0], [1000.0, 4.0], [1100.0, 5.0], [1200.0, 2.0], [1500.0, 1.0], [100.0, 7.0], [1600.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [2000.0, 1.0], [2300.0, 2.0], [2500.0, 2.0], [2600.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [2900.0, 3.0], [200.0, 9.0], [300.0, 9.0], [6300.0, 1.0], [400.0, 5.0], [7900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[0.0, 60.0], [131800.0, 1.0], [300.0, 3.0], [100.0, 25.0], [200.0, 9.0], [400.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[0.0, 63.0], [300.0, 2.0], [700.0, 1.0], [100.0, 20.0], [200.0, 12.0], [400.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[0.0, 56.0], [291500.0, 1.0], [169000.0, 1.0], [3100.0, 2.0], [200.0, 5.0], [800.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3700.0, 5.0], [3600.0, 1.0], [900.0, 3.0], [3800.0, 1.0], [3900.0, 4.0], [62000.0, 3.0], [1000.0, 1.0], [66200.0, 1.0], [67600.0, 1.0], [300.0, 1.0], [79100.0, 1.0], [1400.0, 1.0], [400.0, 2.0], [100.0, 7.0]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[0.0, 59.0], [600.0, 1.0], [5100.0, 1.0], [100.0, 29.0], [200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[8600.0, 1.0], [8800.0, 1.0], [9000.0, 1.0], [600.0, 5.0], [700.0, 3.0], [800.0, 4.0], [900.0, 5.0], [1000.0, 9.0], [1100.0, 7.0], [1200.0, 5.0], [1300.0, 5.0], [1400.0, 1.0], [1500.0, 2.0], [100.0, 5.0], [1600.0, 1.0], [1900.0, 2.0], [2100.0, 1.0], [2300.0, 7.0], [2400.0, 2.0], [2500.0, 2.0], [2600.0, 2.0], [2700.0, 5.0], [2800.0, 1.0], [3100.0, 1.0], [200.0, 4.0], [3300.0, 1.0], [3500.0, 1.0], [3800.0, 1.0], [4000.0, 1.0], [4200.0, 1.0], [4600.0, 1.0], [300.0, 4.0], [400.0, 4.0], [6600.0, 1.0], [8000.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[0.0, 63.0], [300.0, 1.0], [600.0, 1.0], [100.0, 29.0], [200.0, 4.0], [400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[0.0, 53.0], [268000.0, 1.0], [300.0, 3.0], [600.0, 1.0], [360700.0, 1.0], [100.0, 25.0], [200.0, 13.0], [400.0, 1.0], [55000.0, 1.0], [107600.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[0.0, 61.0], [300.0, 1.0], [700.0, 2.0], [200.0, 9.0], [100.0, 22.0], [400.0, 3.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [17000.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [100.0, 2.0], [1600.0, 1.0], [2000.0, 3.0], [2200.0, 1.0], [36100.0, 1.0], [37700.0, 1.0], [2500.0, 1.0], [39200.0, 1.0], [39000.0, 1.0], [41300.0, 1.0], [48700.0, 4.0], [48200.0, 3.0], [47600.0, 1.0], [51100.0, 1.0], [200.0, 1.0], [54700.0, 1.0], [60000.0, 51.0], [60100.0, 1.0], [3900.0, 1.0], [4200.0, 1.0], [4600.0, 2.0], [4700.0, 1.0], [4800.0, 1.0], [5000.0, 1.0], [4900.0, 2.0], [5200.0, 1.0], [6300.0, 1.0], [400.0, 2.0], [6500.0, 1.0], [7500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[600.0, 6.0], [700.0, 4.0], [11000.0, 2.0], [11100.0, 4.0], [11200.0, 1.0], [11300.0, 3.0], [11500.0, 1.0], [11800.0, 1.0], [12200.0, 1.0], [12100.0, 1.0], [11900.0, 1.0], [12400.0, 1.0], [12600.0, 1.0], [800.0, 7.0], [12900.0, 4.0], [13000.0, 1.0], [13300.0, 3.0], [13200.0, 2.0], [13600.0, 2.0], [13400.0, 1.0], [13700.0, 3.0], [14200.0, 1.0], [14300.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 4.0], [1500.0, 3.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 5.0], [2000.0, 3.0], [2300.0, 6.0], [2200.0, 1.0], [2400.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [200.0, 6.0], [300.0, 5.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[11100.0, 1.0], [11300.0, 1.0], [13100.0, 1.0], [13600.0, 1.0], [13800.0, 1.0], [13400.0, 1.0], [900.0, 1.0], [2000.0, 3.0], [39100.0, 1.0], [43500.0, 1.0], [44800.0, 1.0], [46700.0, 1.0], [47100.0, 1.0], [46600.0, 1.0], [45700.0, 1.0], [47400.0, 1.0], [47900.0, 1.0], [60000.0, 27.0], [60100.0, 45.0], [60400.0, 1.0], [60300.0, 4.0], [60700.0, 1.0], [60200.0, 1.0], [4800.0, 1.0], [4900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[0.0, 15.0], [11000.0, 1.0], [100.0, 7.0], [62000.0, 18.0], [62500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[600.0, 3.0], [800.0, 3.0], [1000.0, 2.0], [1100.0, 2.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [2000.0, 5.0], [2400.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [3400.0, 2.0], [3500.0, 5.0], [3600.0, 4.0], [3700.0, 1.0], [3800.0, 1.0], [3900.0, 1.0], [4300.0, 7.0], [4100.0, 5.0], [4200.0, 3.0], [4400.0, 4.0], [4600.0, 1.0], [4700.0, 2.0], [4900.0, 1.0], [5100.0, 1.0], [5000.0, 1.0], [5200.0, 1.0], [6300.0, 1.0], [8500.0, 1.0], [8700.0, 1.0], [8200.0, 1.0], [9800.0, 2.0], [10700.0, 1.0], [10300.0, 1.0], [11500.0, 2.0], [11400.0, 4.0], [11600.0, 1.0], [12100.0, 1.0], [12300.0, 1.0], [12700.0, 4.0], [13100.0, 1.0], [12800.0, 1.0], [12900.0, 1.0], [13700.0, 1.0], [200.0, 3.0], [400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[600.0, 1.0], [10400.0, 1.0], [11700.0, 1.0], [800.0, 2.0], [13200.0, 1.0], [13100.0, 1.0], [13400.0, 1.0], [13700.0, 2.0], [13800.0, 1.0], [13900.0, 1.0], [14200.0, 1.0], [14300.0, 1.0], [15200.0, 1.0], [16000.0, 1.0], [17400.0, 1.0], [1200.0, 1.0], [54000.0, 1.0], [55400.0, 1.0], [60000.0, 52.0], [59500.0, 1.0], [60100.0, 21.0], [60300.0, 1.0], [5200.0, 1.0], [6100.0, 1.0], [400.0, 1.0], [6700.0, 1.0], [6800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[0.0, 74.0], [300.0, 1.0], [400.0, 2.0], [100.0, 22.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[1220900.0, 1.0], [1216300.0, 1.0], [60100.0, 33.0], [61100.0, 5.0], [61000.0, 1.0], [60900.0, 1.0], [60200.0, 3.0], [60400.0, 1.0], [60600.0, 1.0], [63200.0, 2.0], [61500.0, 2.0], [63400.0, 4.0], [63100.0, 3.0], [63000.0, 2.0], [62900.0, 2.0], [63300.0, 1.0], [62800.0, 4.0], [62700.0, 2.0], [63800.0, 1.0], [63900.0, 1.0], [65300.0, 1.0], [64800.0, 1.0], [64300.0, 1.0], [63700.0, 2.0], [66400.0, 1.0], [65700.0, 1.0], [65600.0, 1.0], [70400.0, 2.0], [72900.0, 1.0], [70300.0, 1.0], [89900.0, 1.0], [97300.0, 2.0], [110500.0, 1.0], [109900.0, 1.0], [110300.0, 1.0], [110100.0, 1.0], [109500.0, 1.0], [1229000.0, 1.0], [113500.0, 2.0], [113400.0, 1.0], [112000.0, 1.0], [111600.0, 1.0], [113000.0, 2.0], [489800.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[900.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [1900.0, 1.0], [2300.0, 1.0], [2200.0, 1.0], [2600.0, 2.0], [2900.0, 1.0], [3100.0, 1.0], [3300.0, 1.0], [3800.0, 1.0], [3900.0, 1.0], [4000.0, 2.0], [4100.0, 1.0], [4200.0, 1.0], [4500.0, 1.0], [4600.0, 1.0], [5100.0, 1.0], [5600.0, 1.0], [6000.0, 1.0], [6800.0, 1.0], [7400.0, 1.0], [7300.0, 1.0], [7900.0, 1.0], [8000.0, 1.0], [9200.0, 1.0], [9400.0, 1.0], [10100.0, 2.0], [10200.0, 1.0], [10700.0, 1.0], [10400.0, 1.0], [10800.0, 1.0], [11500.0, 1.0], [12200.0, 1.0], [12000.0, 1.0], [12900.0, 1.0], [13100.0, 1.0], [13200.0, 3.0], [13300.0, 2.0], [13500.0, 1.0], [13800.0, 1.0], [13400.0, 1.0], [14100.0, 1.0], [15300.0, 1.0], [15800.0, 1.0], [16600.0, 1.0], [21400.0, 1.0], [42800.0, 1.0], [45400.0, 1.0], [47100.0, 1.0], [48200.0, 1.0], [47600.0, 1.0], [52000.0, 2.0], [52400.0, 1.0], [51300.0, 1.0], [51900.0, 1.0], [51400.0, 2.0], [53500.0, 2.0], [54100.0, 1.0], [55200.0, 1.0], [53600.0, 2.0], [53800.0, 1.0], [60000.0, 12.0], [60200.0, 4.0], [60100.0, 6.0], [300.0, 2.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[0.0, 15.0], [300.0, 3.0], [600.0, 1.0], [700.0, 1.0], [200.0, 7.0], [100.0, 72.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[600.0, 14.0], [700.0, 13.0], [200.0, 2.0], [800.0, 8.0], [900.0, 6.0], [1000.0, 3.0], [1100.0, 2.0], [300.0, 8.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 1.0], [400.0, 20.0], [1700.0, 1.0], [500.0, 18.0]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[0.0, 51.0], [200.0, 6.0], [100.0, 41.0], [1000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[0.0, 85.0], [100.0, 13.0], [200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[0.0, 73.0], [300.0, 3.0], [600.0, 2.0], [700.0, 1.0], [100.0, 16.0], [200.0, 3.0], [400.0, 2.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[0.0, 41.0], [300.0, 5.0], [1500.0, 1.0], [100.0, 38.0], [400.0, 3.0], [200.0, 11.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[700.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [1100.0, 2.0], [1200.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1900.0, 1.0], [2200.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3600.0, 1.0], [3800.0, 2.0], [4000.0, 1.0], [4200.0, 2.0], [4100.0, 1.0], [4300.0, 1.0], [4500.0, 1.0], [4600.0, 3.0], [4400.0, 1.0], [4700.0, 1.0], [4800.0, 1.0], [4900.0, 3.0], [5300.0, 1.0], [5700.0, 1.0], [8200.0, 1.0], [9700.0, 2.0], [10000.0, 4.0], [9800.0, 1.0], [10100.0, 1.0], [10600.0, 1.0], [10700.0, 1.0], [10300.0, 1.0], [11100.0, 1.0], [11000.0, 4.0], [11200.0, 3.0], [10900.0, 1.0], [11300.0, 1.0], [11600.0, 3.0], [11900.0, 1.0], [11800.0, 1.0], [12500.0, 1.0], [12300.0, 2.0], [13000.0, 1.0], [13100.0, 2.0], [12800.0, 1.0], [13300.0, 2.0], [12900.0, 1.0], [13200.0, 1.0], [13400.0, 1.0], [13600.0, 1.0], [13800.0, 1.0], [13700.0, 1.0], [14000.0, 1.0], [14300.0, 1.0], [14100.0, 1.0], [14600.0, 1.0], [14900.0, 1.0], [16100.0, 1.0], [17100.0, 2.0], [21300.0, 1.0], [21400.0, 1.0], [37400.0, 1.0], [44800.0, 1.0], [50600.0, 1.0], [51900.0, 1.0], [53500.0, 1.0], [55200.0, 1.0], [54000.0, 1.0], [55500.0, 1.0], [55400.0, 1.0], [60000.0, 1.0], [300.0, 2.0], [400.0, 2.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[0.0, 48.0], [300.0, 6.0], [40100.0, 1.0], [163100.0, 1.0], [45700.0, 1.0], [25200.0, 1.0], [100.0, 31.0], [200.0, 9.0], [400.0, 1.0], [55400.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[159200.0, 2.0], [164400.0, 1.0], [173600.0, 1.0], [700.0, 1.0], [219200.0, 1.0], [900.0, 1.0], [161300.0, 1.0], [166100.0, 2.0], [167300.0, 1.0], [173300.0, 7.0], [3200.0, 1.0], [3300.0, 1.0], [219300.0, 1.0], [3700.0, 1.0], [3900.0, 1.0], [4100.0, 1.0], [69100.0, 1.0], [68900.0, 1.0], [68700.0, 3.0], [68300.0, 1.0], [5800.0, 1.0], [5700.0, 1.0], [6100.0, 1.0], [7200.0, 1.0], [124700.0, 1.0], [124900.0, 1.0], [161400.0, 1.0], [164600.0, 1.0], [167000.0, 2.0], [173400.0, 7.0], [172600.0, 1.0], [14800.0, 2.0], [100.0, 20.0], [138700.0, 1.0], [35100.0, 1.0], [153100.0, 2.0], [39900.0, 1.0], [161500.0, 1.0], [166300.0, 2.0], [200.0, 4.0], [64500.0, 2.0], [68800.0, 5.0], [68400.0, 2.0], [67800.0, 1.0], [71600.0, 2.0], [119800.0, 3.0], [124600.0, 1.0], [126000.0, 1.0], [124200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[0.0, 20.0], [100.0, 65.0], [400.0, 4.0], [200.0, 7.0], [500.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[0.0, 3.0], [600.0, 7.0], [700.0, 8.0], [200.0, 10.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [300.0, 12.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [400.0, 17.0], [100.0, 9.0], [1900.0, 2.0], [500.0, 24.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[600.0, 2.0], [700.0, 2.0], [200.0, 19.0], [800.0, 2.0], [900.0, 1.0], [1000.0, 4.0], [300.0, 20.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 2.0], [400.0, 27.0], [100.0, 10.0], [500.0, 8.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[0.0, 4.0], [1100.0, 1.0], [300.0, 22.0], [600.0, 1.0], [1300.0, 2.0], [100.0, 12.0], [200.0, 25.0], [400.0, 16.0], [800.0, 3.0], [900.0, 1.0], [500.0, 8.0], [1000.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[0.0, 1.0], [600.0, 3.0], [700.0, 6.0], [200.0, 14.0], [800.0, 1.0], [1000.0, 3.0], [300.0, 20.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [1500.0, 2.0], [100.0, 21.0], [400.0, 14.0], [500.0, 9.0], [2000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[0.0, 7.0], [600.0, 4.0], [1213300.0, 9.0], [800.0, 1.0], [1000.0, 1.0], [1213600.0, 3.0], [100.0, 13.0], [1213800.0, 2.0], [1900.0, 2.0], [31400.0, 4.0], [31500.0, 2.0], [31200.0, 2.0], [31300.0, 2.0], [31100.0, 2.0], [50000.0, 1.0], [200.0, 1.0], [62000.0, 11.0], [70100.0, 2.0], [4700.0, 1.0], [4900.0, 1.0], [80000.0, 3.0], [5300.0, 1.0], [5400.0, 1.0], [5600.0, 2.0], [90000.0, 2.0], [6100.0, 2.0], [6200.0, 1.0], [100000.0, 2.0], [6500.0, 2.0], [1213900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[0.0, 5.0], [300.0, 12.0], [600.0, 2.0], [700.0, 2.0], [1500.0, 1.0], [400.0, 9.0], [100.0, 34.0], [200.0, 30.0], [800.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[300.0, 16.0], [600.0, 6.0], [700.0, 1.0], [100.0, 29.0], [200.0, 26.0], [400.0, 9.0], [800.0, 5.0], [500.0, 8.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[0.0, 19.0], [600.0, 2.0], [300.0, 2.0], [700.0, 1.0], [100.0, 42.0], [200.0, 14.0], [400.0, 10.0], [800.0, 4.0], [900.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[4600.0, 1.0], [5000.0, 1.0], [14000.0, 1.0], [60000.0, 88.0], [60300.0, 1.0], [60600.0, 1.0], [60500.0, 1.0], [60100.0, 4.0], [61300.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[38200.0, 1.0], [10000.0, 1.0], [10700.0, 1.0], [11200.0, 1.0], [13000.0, 1.0], [51600.0, 1.0], [14200.0, 1.0], [60000.0, 2.0], [60100.0, 61.0], [60200.0, 25.0], [60300.0, 1.0], [60900.0, 1.0], [5100.0, 1.0], [21400.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[700.0, 11.0], [200.0, 18.0], [800.0, 8.0], [900.0, 3.0], [1000.0, 5.0], [1100.0, 2.0], [300.0, 13.0], [1200.0, 1.0], [1300.0, 1.0], [100.0, 17.0], [400.0, 8.0], [1600.0, 1.0], [500.0, 12.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[42700.0, 1.0], [11000.0, 1.0], [3000.0, 1.0], [13100.0, 1.0], [51600.0, 1.0], [60000.0, 1.0], [60200.0, 10.0], [60100.0, 74.0], [60600.0, 3.0], [60500.0, 1.0], [60300.0, 1.0], [60400.0, 1.0], [60800.0, 2.0], [4100.0, 1.0], [4600.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[0.0, 6.0], [600.0, 2.0], [700.0, 2.0], [200.0, 10.0], [800.0, 3.0], [3500.0, 1.0], [900.0, 5.0], [1000.0, 2.0], [300.0, 6.0], [1200.0, 2.0], [1300.0, 4.0], [1400.0, 2.0], [1500.0, 5.0], [100.0, 22.0], [400.0, 13.0], [1800.0, 2.0], [500.0, 12.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[0.0, 1.0], [300.0, 30.0], [700.0, 4.0], [200.0, 27.0], [800.0, 1.0], [400.0, 9.0], [100.0, 22.0], [500.0, 6.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[0.0, 54.0], [300.0, 5.0], [40000.0, 1.0], [100.0, 32.0], [200.0, 4.0], [400.0, 1.0], [55000.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[0.0, 1.0], [700.0, 2.0], [455300.0, 1.0], [1100.0, 3.0], [1300.0, 1.0], [1400.0, 1.0], [435200.0, 1.0], [1800.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [3400.0, 1.0], [4300.0, 1.0], [80700.0, 1.0], [5200.0, 1.0], [5800.0, 1.0], [5900.0, 1.0], [6000.0, 2.0], [6100.0, 1.0], [6300.0, 2.0], [6400.0, 1.0], [6500.0, 1.0], [6600.0, 1.0], [6700.0, 2.0], [6800.0, 2.0], [110300.0, 1.0], [7000.0, 1.0], [12000.0, 1.0], [12700.0, 1.0], [1355900.0, 1.0], [13100.0, 1.0], [13400.0, 1.0], [14600.0, 1.0], [16200.0, 1.0], [16600.0, 1.0], [16400.0, 1.0], [1244000.0, 1.0], [20900.0, 1.0], [100.0, 23.0], [29600.0, 1.0], [30000.0, 1.0], [30800.0, 1.0], [38300.0, 2.0], [37900.0, 1.0], [1234000.0, 1.0], [40000.0, 1.0], [200.0, 2.0], [60100.0, 1.0], [61300.0, 2.0], [60300.0, 1.0], [62000.0, 2.0], [300.0, 5.0], [87200.0, 1.0], [100400.0, 1.0], [1193800.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[8600.0, 1.0], [8200.0, 1.0], [0.0, 6.0], [8800.0, 1.0], [60000.0, 73.0], [60100.0, 3.0], [60700.0, 1.0], [60500.0, 4.0], [60200.0, 5.0], [61700.0, 1.0], [61800.0, 2.0], [62100.0, 1.0], [4200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[138400.0, 1.0], [600.0, 6.0], [1800.0, 1.0], [484800.0, 1.0], [2400.0, 1.0], [168500.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [4000.0, 2.0], [4100.0, 1.0], [4300.0, 2.0], [4400.0, 2.0], [70300.0, 1.0], [80700.0, 2.0], [86900.0, 2.0], [88100.0, 3.0], [98100.0, 2.0], [7100.0, 1.0], [7300.0, 1.0], [7200.0, 1.0], [118300.0, 1.0], [22700.0, 1.0], [100.0, 14.0], [26400.0, 1.0], [26700.0, 1.0], [29000.0, 1.0], [1332200.0, 1.0], [30500.0, 1.0], [30600.0, 2.0], [138300.0, 1.0], [1334100.0, 1.0], [35900.0, 1.0], [38800.0, 1.0], [38900.0, 2.0], [39100.0, 1.0], [39400.0, 1.0], [40600.0, 1.0], [39300.0, 1.0], [39200.0, 1.0], [49400.0, 1.0], [50200.0, 1.0], [50300.0, 1.0], [200.0, 7.0], [59900.0, 1.0], [60800.0, 1.0], [61100.0, 1.0], [62000.0, 1.0], [300.0, 3.0], [85600.0, 1.0], [400.0, 6.0], [110200.0, 1.0], [118000.0, 1.0], [1213900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[484500.0, 1.0], [60000.0, 20.0], [60200.0, 1.0], [484300.0, 2.0], [62100.0, 2.0], [62300.0, 1.0], [62000.0, 5.0], [67200.0, 1.0], [73200.0, 2.0], [70400.0, 1.0], [70100.0, 1.0], [73300.0, 1.0], [72000.0, 1.0], [72200.0, 1.0], [72300.0, 1.0], [71900.0, 3.0], [73100.0, 1.0], [72900.0, 2.0], [72800.0, 2.0], [72700.0, 2.0], [72500.0, 1.0], [72400.0, 3.0], [74400.0, 1.0], [75900.0, 1.0], [75000.0, 1.0], [76500.0, 1.0], [73800.0, 1.0], [77800.0, 2.0], [74900.0, 1.0], [74100.0, 1.0], [76200.0, 1.0], [79800.0, 1.0], [79700.0, 1.0], [79200.0, 2.0], [79300.0, 2.0], [79400.0, 1.0], [78300.0, 1.0], [78400.0, 1.0], [85800.0, 5.0], [86300.0, 3.0], [86800.0, 1.0], [87200.0, 2.0], [90100.0, 1.0], [100100.0, 1.0], [455400.0, 1.0], [130400.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[0.0, 16.0], [300.0, 4.0], [700.0, 1.0], [100.0, 60.0], [200.0, 11.0], [400.0, 4.0], [800.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[300.0, 7.0], [700.0, 1.0], [200.0, 78.0], [400.0, 3.0], [100.0, 11.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[0.0, 25.0], [60000.0, 1.0], [60100.0, 55.0], [61100.0, 3.0], [60200.0, 5.0], [60400.0, 3.0], [60600.0, 4.0], [60500.0, 1.0], [121000.0, 1.0], [62900.0, 1.0], [63500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[0.0, 16.0], [12900.0, 1.0], [43600.0, 1.0], [61100.0, 2.0], [60000.0, 1.0], [60100.0, 30.0], [60200.0, 16.0], [60900.0, 2.0], [61000.0, 1.0], [60800.0, 2.0], [60500.0, 1.0], [60300.0, 2.0], [61400.0, 4.0], [60400.0, 4.0], [61500.0, 5.0], [63100.0, 1.0], [64600.0, 1.0], [64700.0, 1.0], [65200.0, 1.0], [65000.0, 1.0], [64900.0, 1.0], [63500.0, 1.0], [68100.0, 1.0], [68500.0, 1.0], [5000.0, 1.0], [6300.0, 1.0], [7300.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[700.0, 7.0], [800.0, 2.0], [900.0, 3.0], [1000.0, 2.0], [1100.0, 2.0], [1200.0, 3.0], [1300.0, 2.0], [1400.0, 5.0], [1600.0, 3.0], [1700.0, 3.0], [1800.0, 8.0], [1900.0, 9.0], [2000.0, 5.0], [2100.0, 4.0], [2200.0, 5.0], [2300.0, 2.0], [2400.0, 5.0], [2500.0, 5.0], [2600.0, 2.0], [2800.0, 7.0], [2700.0, 5.0], [2900.0, 2.0], [3000.0, 3.0], [3100.0, 2.0], [3200.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[0.0, 25.0], [2500.0, 4.0], [2600.0, 1.0], [2700.0, 2.0], [2900.0, 1.0], [3100.0, 1.0], [200.0, 8.0], [3800.0, 2.0], [300.0, 7.0], [327400.0, 1.0], [100.0, 39.0], [400.0, 1.0], [1900.0, 6.0], [2000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[0.0, 8.0], [1182100.0, 9.0], [1182200.0, 3.0], [454900.0, 2.0], [60000.0, 13.0], [61900.0, 2.0], [62000.0, 18.0], [73300.0, 2.0], [72800.0, 2.0], [72400.0, 4.0], [72500.0, 2.0], [73500.0, 1.0], [71900.0, 3.0], [72000.0, 1.0], [72200.0, 1.0], [72300.0, 2.0], [99700.0, 1.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[0.0, 61.0], [1100.0, 1.0], [700.0, 1.0], [5500.0, 1.0], [3000.0, 1.0], [200.0, 6.0], [100.0, 24.0], [3300.0, 1.0], [3200.0, 2.0], [3700.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[0.0, 22.0], [100.0, 1.0], [62000.0, 20.0], [63000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[0.0, 48.0], [300.0, 3.0], [600.0, 1.0], [40200.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [100.0, 33.0], [200.0, 8.0], [400.0, 2.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[1100.0, 2.0], [300.0, 24.0], [600.0, 5.0], [100.0, 9.0], [200.0, 14.0], [400.0, 29.0], [800.0, 2.0], [900.0, 1.0], [500.0, 12.0], [1000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[0.0, 16.0], [300.0, 2.0], [700.0, 1.0], [100.0, 64.0], [200.0, 12.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[0.0, 3.0], [600.0, 3.0], [2500.0, 1.0], [200.0, 16.0], [800.0, 5.0], [1000.0, 4.0], [1100.0, 3.0], [300.0, 24.0], [1200.0, 4.0], [1300.0, 2.0], [1400.0, 2.0], [1500.0, 3.0], [100.0, 15.0], [400.0, 9.0], [500.0, 6.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[0.0, 1.0], [300.0, 20.0], [1400.0, 2.0], [400.0, 23.0], [200.0, 26.0], [100.0, 9.0], [800.0, 2.0], [900.0, 1.0], [500.0, 14.0], [1000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1355900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 794.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 4674.0, "series": [{"data": [[0.0, 4674.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 794.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 853.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [[3.0, 1534.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 29.964285714285726, "minX": 1.69719888E12, "maxY": 100.0, "series": [{"data": [[1.69719894E12, 100.0], [1.69720104E12, 29.964285714285726], [1.69720074E12, 64.0], [1.69719924E12, 99.82535211267597], [1.69720044E12, 67.61538461538461], [1.69719954E12, 80.18867924528298], [1.69720014E12, 77.0], [1.69719984E12, 77.0], [1.69720032E12, 71.35714285714286], [1.69719966E12, 77.0], [1.69720002E12, 77.0], [1.69720056E12, 66.0], [1.69719942E12, 95.68955223880606], [1.69720026E12, 76.54545454545455], [1.69719972E12, 77.0], [1.69719996E12, 77.0], [1.69720086E12, 59.25], [1.69719912E12, 100.0], [1.69720008E12, 77.0], [1.6971999E12, 77.0], [1.69719888E12, 97.24035874439461], [1.69720098E12, 57.0], [1.697199E12, 100.0], [1.69720068E12, 65.6], [1.6971993E12, 96.90267175572521], [1.69720038E12, 68.57142857142857], [1.6971996E12, 77.0], [1.69720092E12, 58.0], [1.69719906E12, 100.0], [1.69720062E12, 66.0], [1.69719936E12, 96.0], [1.6972008E12, 63.142857142857146], [1.69719918E12, 100.0], [1.6972005E12, 66.0], [1.69719948E12, 88.35693215339235], [1.6972002E12, 77.0], [1.69719978E12, 77.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69720104E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 3.0, "maxY": 1355998.0, "series": [{"data": [[85.0, 0.0], [84.0, 0.0], [95.0, 232.5], [93.0, 168.0], [97.0, 244.56521739130434], [96.0, 295.6333333333333], [100.0, 273.84375000000006]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[96.7, 252.85000000000002]], "isOverall": false, "label": "Tenders_Page/_next/image/-69-Aggregated", "isController": false}, {"data": [[85.0, 0.5], [84.0, 0.0], [95.0, 156.375], [97.0, 172.6956521739131], [96.0, 359.1935483870968], [100.0, 244.74999999999994]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[96.72999999999999, 241.91000000000003]], "isOverall": false, "label": "Tenders_Page/_next/image/-68-Aggregated", "isController": false}, {"data": [[77.0, 383.764705882353], [95.0, 420.6666666666667], [99.0, 97.0], [98.0, 84.0], [97.0, 70.0], [96.0, 157.23529411764707], [100.0, 55.857142857142854]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[83.40999999999998, 308.13000000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80-Aggregated", "isController": false}, {"data": [[85.0, 0.0], [84.0, 0.25], [95.0, 99.0], [93.0, 50.0], [97.0, 178.0], [96.0, 160.45161290322582], [100.0, 160.5625]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[96.71, 149.49999999999997]], "isOverall": false, "label": "Tenders_Page/_next/image/-67-Aggregated", "isController": false}, {"data": [[58.0, 62060.0], [63.0, 62032.0], [66.0, 62081.0], [64.0, 62015.25], [69.0, 65165.5], [68.0, 62052.0], [79.0, 0.0], [78.0, 0.0], [77.0, 62073.5], [76.0, 62031.0], [83.0, 0.0], [82.0, 0.0], [80.0, 0.0], [86.0, 0.0], [85.0, 0.0], [84.0, 0.0], [91.0, 1.0], [90.0, 0.0], [89.0, 0.3333333333333333], [95.0, 45.0], [93.0, 0.5], [99.0, 50.0], [98.0, 44.0], [97.0, 46.0], [96.0, 61.0], [100.0, 46.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[79.6136363636364, 29764.386363636368]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109-Aggregated", "isController": false}, {"data": [[60.0, 62081.0], [63.0, 62032.0], [66.0, 62039.66666666667], [64.0, 62031.0], [69.0, 62041.0], [79.0, 0.0], [78.0, 0.0], [77.0, 62056.62500000001], [76.0, 62057.0], [83.0, 0.0], [82.0, 0.0], [80.0, 0.0], [86.0, 0.0], [85.0, 1.0], [84.0, 0.0], [91.0, 0.0], [90.0, 0.0], [89.0, 0.0], [95.0, 51.5], [93.0, 0.0], [99.0, 46.0], [98.0, 87.0], [97.0, 47.0], [96.0, 47.0], [100.0, 48.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[80.22727272727275, 29622.363636363632]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107-Aggregated", "isController": false}, {"data": [[99.0, 307.0], [98.0, 323.5], [97.0, 374.44999999999993], [96.0, 2848.5238095238096], [100.0, 375.26785714285717]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[98.51000000000002, 892.77]], "isOverall": false, "label": "Tenders_Page/_next/image/-64-Aggregated", "isController": false}, {"data": [[99.0, 54.0], [98.0, 52.5], [97.0, 62.85000000000001], [96.0, 266.952380952381], [100.0, 73.30357142857144]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[98.51000000000002, 111.26999999999998]], "isOverall": false, "label": "Tenders_Page/_next/image/-63-Aggregated", "isController": false}, {"data": [[99.0, 104.0], [98.0, 53.5], [97.0, 150.45], [96.0, 417.23809523809524], [100.0, 170.3035714285714]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[98.51000000000002, 215.18999999999997]], "isOverall": false, "label": "Tenders_Page/_next/image/-62-Aggregated", "isController": false}, {"data": [[100.0, 606.4399999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[100.0, 606.4399999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36-Aggregated", "isController": false}, {"data": [[77.0, 5000.463768115942], [95.0, 2662.875], [99.0, 210.0], [98.0, 119.0], [97.0, 67.33333333333333], [96.0, 133.36363636363637], [100.0, 77.28571428571429]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[83.17, 3688.74]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85-Aggregated", "isController": false}, {"data": [[77.0, 2856.085714285715], [95.0, 7280.142857142857], [99.0, 104.0], [98.0, 100.0], [97.0, 59.666666666666664], [96.0, 128.1818181818182], [100.0, 69.42857142857143]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[82.99000000000001, 2531.6599999999985]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86-Aggregated", "isController": false}, {"data": [[77.0, 210.6470588235294], [95.0, 7068.166666666666], [99.0, 72.0], [98.0, 86.0], [97.0, 93.0], [96.0, 130.92857142857142], [100.0, 77.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[83.37999999999998, 595.42]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84-Aggregated", "isController": false}, {"data": [[77.0, 3322.249999999999], [95.0, 20132.0], [99.0, 77.0], [98.0, 94.0], [97.0, 54.0], [96.0, 160.8181818181818], [100.0, 73.14285714285714]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[82.62999999999995, 3424.759999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88-Aggregated", "isController": false}, {"data": [[66.0, 61.0], [68.0, 283.75], [77.0, 420.9767441860466], [83.0, 79979.0], [86.0, 0.0], [91.0, 1.0], [90.0, 1.0], [89.0, 0.0], [95.0, 11079.0], [93.0, 0.2], [97.0, 52.0], [96.0, 690.3333333333334], [100.0, 58.25]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[81.18918918918915, 1553.6351351351352]], "isOverall": false, "label": "Tenders_Page/tr/-104-Aggregated", "isController": false}, {"data": [[100.0, 435.80999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[100.0, 435.80999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46-Aggregated", "isController": false}, {"data": [[77.0, 125.06493506493509], [99.0, 56.0], [98.0, 62.0], [97.0, 63.666666666666664], [96.0, 92.81818181818183], [100.0, 61.142857142857146]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[81.72999999999998, 113.87999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92-Aggregated", "isController": false}, {"data": [[77.0, 129.44155844155844], [99.0, 63.0], [98.0, 67.0], [97.0, 70.5], [96.0, 81.91666666666667], [100.0, 66.71428571428572]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[81.72, 116.88000000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95-Aggregated", "isController": false}, {"data": [[32.0, 1213356.0], [36.0, 1213683.0], [42.0, 1213741.0], [49.0, 1213652.0], [3.0, 1213400.0], [51.0, 1213457.0], [52.0, 1213313.0], [66.0, 62037.857142857145], [64.0, 62101.0], [68.0, 62035.0], [79.0, 0.0], [78.0, 11061.0], [77.0, 62043.18181818182], [83.0, 0.0], [82.0, 33793.5], [80.0, 1.0], [86.0, 0.0], [85.0, 1.0], [84.0, 60138.0], [91.0, 1.0], [90.0, 0.0], [89.0, 0.33333333333333337], [95.0, 60469.0], [93.0, 0.5], [99.0, 60137.0], [98.0, 60169.0], [97.0, 60141.0], [96.0, 60147.0], [6.0, 1213397.0], [100.0, 60140.0], [7.0, 1213395.0], [13.0, 1213388.0], [18.0, 1213680.0], [23.0, 1213377.0], [29.0, 1213754.0], [30.0, 1213504.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[66.09677419354838, 382357.16129032266]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106-Aggregated", "isController": false}, {"data": [[100.0, 15247.490000000003]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[100.0, 15247.490000000003]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56-Aggregated", "isController": false}, {"data": [[77.0, 123.07792207792205], [99.0, 48.0], [98.0, 82.0], [97.0, 45.0], [96.0, 103.41666666666667], [100.0, 74.57142857142857]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[81.72, 114.60000000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94-Aggregated", "isController": false}, {"data": [[100.0, 2208.6400000000003]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[100.0, 2208.6400000000003]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51-Aggregated", "isController": false}, {"data": [[77.0, 1834.636363636363], [99.0, 50.0], [98.0, 74.0], [97.0, 63.666666666666664], [96.0, 112.36363636363635], [100.0, 69.42857142857143]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[81.72999999999998, 1433.04]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90-Aggregated", "isController": false}, {"data": [[77.0, 131.46753246753244], [99.0, 74.0], [98.0, 100.0], [97.0, 68.0], [96.0, 112.58333333333334], [100.0, 61.42857142857142]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[81.72, 122.14000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97-Aggregated", "isController": false}, {"data": [[77.0, 119060.66666666666], [83.0, 1.0], [82.0, 72732.0], [85.0, 0.33333333333333337], [84.0, 0.6923076923076923], [89.0, 1.0], [95.0, 15.777777777777779], [93.0, 1.0], [98.0, 74.0], [97.0, 93.8], [96.0, 2050.935483870968], [100.0, 123.66666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[92.85000000000001, 9262.01]], "isOverall": false, "label": "Tenders_Page/tr/-77-Aggregated", "isController": false}, {"data": [[77.0, 190.92207792207805], [99.0, 79.0], [98.0, 56.0], [97.0, 59.0], [96.0, 83.58333333333333], [100.0, 65.14285714285715]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[81.72, 164.13000000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96-Aggregated", "isController": false}, {"data": [[100.0, 1862.18]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[100.0, 1862.18]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53-Aggregated", "isController": false}, {"data": [[77.0, 129.97402597402595], [99.0, 65.0], [98.0, 64.0], [97.0, 59.0], [96.0, 75.58333333333334], [100.0, 61.42857142857142]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[81.72, 115.92000000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98-Aggregated", "isController": false}, {"data": [[77.0, 9822.539473684212], [83.0, 55098.0], [99.0, 52.0], [98.0, 77.0], [97.0, 63.666666666666664], [96.0, 145.54545454545453], [100.0, 73.14285714285715]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[81.78999999999996, 8040.4400000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91-Aggregated", "isController": false}, {"data": [[77.0, 160.11688311688314], [99.0, 54.0], [98.0, 79.0], [97.0, 67.5], [96.0, 79.0], [100.0, 67.57142857142858]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[81.72, 140.17999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93-Aggregated", "isController": false}, {"data": [[100.0, 39234.399999999994]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[100.0, 39234.399999999994]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59-Aggregated", "isController": false}, {"data": [[100.0, 5188.809999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[100.0, 5188.809999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49-Aggregated", "isController": false}, {"data": [[99.0, 60149.5], [98.0, 60370.333333333336], [97.0, 60139.428571428565], [100.0, 51285.82558139537]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[99.69, 52532.660000000025]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58-Aggregated", "isController": false}, {"data": [[66.0, 62041.24999999999], [64.0, 62061.5], [79.0, 0.0], [78.0, 0.0], [77.0, 62207.555555555555], [76.0, 62042.0], [83.0, 0.0], [82.0, 5537.0], [80.0, 0.0], [86.0, 0.0], [85.0, 0.0], [84.0, 1.0], [91.0, 0.0], [90.0, 0.0], [89.0, 0.33333333333333337], [95.0, 156.0], [93.0, 0.0], [99.0, 142.0], [98.0, 156.0], [97.0, 145.0], [96.0, 181.0], [100.0, 144.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[80.77272727272728, 29921.840909090904]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108-Aggregated", "isController": false}, {"data": [[100.0, 4962.799999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[100.0, 4962.799999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52-Aggregated", "isController": false}, {"data": [[100.0, 48388.75]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[100.0, 48388.75]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55-Aggregated", "isController": false}, {"data": [[85.0, 0.0], [84.0, 0.25], [95.0, 80.18181818181819], [93.0, 50.0], [97.0, 85.36363636363633], [96.0, 99.32142857142857], [100.0, 103.49999999999999]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[96.66000000000003, 89.03999999999999]], "isOverall": false, "label": "Tenders_Page/_next/image/-74-Aggregated", "isController": false}, {"data": [[69.0, 489855.0], [17.0, 1216326.0], [77.0, 72117.3698630137], [97.0, 60144.0], [96.0, 60748.4375], [3.0, 1229006.0], [100.0, 60142.2], [26.0, 1220928.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[79.65999999999998, 108136.57]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99-Aggregated", "isController": false}, {"data": [[100.0, 27450.8]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[100.0, 27450.8]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54-Aggregated", "isController": false}, {"data": [[85.0, 0.0], [84.0, 0.0], [95.0, 133.29999999999998], [93.0, 101.0], [97.0, 149.0869565217391], [96.0, 194.50000000000003], [100.0, 150.84375000000003]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[96.67999999999999, 151.35999999999999]], "isOverall": false, "label": "Tenders_Page/_next/image/-73-Aggregated", "isController": false}, {"data": [[100.0, 671.81]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[100.0, 671.81]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40-Aggregated", "isController": false}, {"data": [[85.0, 0.0], [84.0, 0.0], [95.0, 87.875], [97.0, 105.56521739130433], [96.0, 124.70967741935483], [100.0, 179.125]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[96.72999999999999, 127.28999999999994]], "isOverall": false, "label": "Tenders_Page/_next/image/-72-Aggregated", "isController": false}, {"data": [[85.0, 0.5], [84.0, 0.0], [95.0, 59.875], [97.0, 63.130434782608695], [96.0, 113.80645161290325], [100.0, 83.18749999999999]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[96.72999999999999, 81.21999999999997]], "isOverall": false, "label": "Tenders_Page/_next/image/-71-Aggregated", "isController": false}, {"data": [[85.0, 0.0], [84.0, 0.25], [95.0, 94.85714285714286], [93.0, 54.0], [97.0, 107.04347826086955], [96.0, 140.6451612903226], [100.0, 113.0625]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[96.71, 111.58999999999997]], "isOverall": false, "label": "Tenders_Page/_next/image/-70-Aggregated", "isController": false}, {"data": [[77.0, 156.30882352941177], [99.0, 83.0], [98.0, 70.0], [97.0, 121.66666666666667], [96.0, 216.0], [100.0, 85.57142857142857]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[83.43999999999998, 160.65999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83-Aggregated", "isController": false}, {"data": [[100.0, 12885.04]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[100.0, 12885.04]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50-Aggregated", "isController": false}, {"data": [[77.0, 2366.246575342466], [82.0, 50596.5], [95.0, 32685.5], [99.0, 61.0], [98.0, 216.0], [97.0, 66.0], [96.0, 159.0], [100.0, 78.28571428571428]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[82.19000000000003, 3420.720000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89-Aggregated", "isController": false}, {"data": [[77.0, 123089.4029850746], [82.0, 39993.0], [99.0, 137.0], [98.0, 175.0], [97.0, 118.0], [96.0, 1954.5500000000002], [100.0, 142.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[83.49, 83277.33999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79-Aggregated", "isController": false}, {"data": [[33.0, 44.0], [34.0, 84.5], [37.0, 109.0], [40.0, 104.66666666666667], [41.0, 75.0], [46.0, 53.0], [47.0, 57.0], [50.0, 88.0], [54.0, 117.0], [56.0, 129.0], [63.0, 109.0], [64.0, 76.0], [65.0, 90.0], [67.0, 94.0], [69.0, 107.0], [70.0, 111.75], [72.0, 121.0], [77.0, 135.0], [78.0, 136.0], [82.0, 140.0], [84.0, 74.0], [88.0, 87.0], [89.0, 112.5], [90.0, 126.0], [95.0, 111.5], [96.0, 164.5], [98.0, 148.0], [100.0, 220.01886792452825], [24.0, 59.5], [28.0, 69.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[82.81999999999998, 164.77]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30-Aggregated", "isController": false}, {"data": [[100.0, 534.7700000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[100.0, 534.7700000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41-Aggregated", "isController": false}, {"data": [[100.0, 465.04]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[100.0, 465.04]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45-Aggregated", "isController": false}, {"data": [[100.0, 410.62]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[100.0, 410.62]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35-Aggregated", "isController": false}, {"data": [[100.0, 478.81]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[100.0, 478.81]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37-Aggregated", "isController": false}, {"data": [[8.0, 1213395.0], [38.0, 1213684.0], [44.0, 1213337.0], [11.0, 1213390.0], [49.0, 1213323.0], [48.0, 1213679.0], [15.0, 1213622.0], [66.0, 62055.25], [16.0, 1213891.0], [4.0, 1213399.0], [68.0, 62041.5], [77.0, 33578.930232558145], [19.0, 1213927.0], [20.0, 1213378.0], [86.0, 0.0], [91.0, 0.0], [90.0, 1.0], [89.0, 1.0], [95.0, 166.5], [93.0, 83.4], [97.0, 158.0], [96.0, 427.66666666666663], [100.0, 160.0], [31.0, 1213523.0]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[72.05617977528091, 226375.595505618]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103-Aggregated", "isController": false}, {"data": [[100.0, 285.6100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[100.0, 285.6100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48-Aggregated", "isController": false}, {"data": [[100.0, 343.52999999999986]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[100.0, 343.52999999999986]], "isOverall": false, "label": "Tenders_Page/_next/image/-43-Aggregated", "isController": false}, {"data": [[100.0, 261.8099999999999]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[100.0, 261.8099999999999]], "isOverall": false, "label": "Tenders_Page/_next/image/-42-Aggregated", "isController": false}, {"data": [[85.0, 60061.5], [95.0, 60055.625], [97.0, 60058.043478260865], [96.0, 60094.29032258065], [100.0, 53457.15624999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[96.77, 57957.01]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66-Aggregated", "isController": false}, {"data": [[99.0, 60168.0], [97.0, 60145.5], [96.0, 60161.42857142857], [100.0, 54952.25925925925]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[99.30999999999999, 55941.42999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60-Aggregated", "isController": false}, {"data": [[100.0, 511.87000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[100.0, 511.87000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38-Aggregated", "isController": false}, {"data": [[99.0, 60138.0], [98.0, 60360.5], [97.0, 60171.05], [96.0, 60271.28571428571], [100.0, 54986.23214285712]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[98.51000000000002, 57292.05999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61-Aggregated", "isController": false}, {"data": [[100.0, 615.17]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[100.0, 615.17]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34-Aggregated", "isController": false}, {"data": [[100.0, 317.75999999999993]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[100.0, 317.75999999999993]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44-Aggregated", "isController": false}, {"data": [[77.0, 142.77142857142854], [83.0, 47578.0], [95.0, 143.8], [99.0, 66.0], [98.0, 72.0], [97.0, 54.333333333333336], [96.0, 155.0909090909091], [100.0, 60.285714285714285]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[82.75, 1082.98]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87-Aggregated", "isController": false}, {"data": [[66.0, 62093.0], [69.0, 445309.5], [68.0, 62052.0], [77.0, 18075.564516129034], [5.0, 1244097.0], [43.0, 1234083.0], [46.0, 1193818.0], [97.0, 149.0], [96.0, 777.3125], [100.0, 141.4], [26.0, 1193875.0], [56.0, 1355998.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[79.2765957446808, 89050.6595744681]], "isOverall": false, "label": "Tenders_Page/_next/image/-101-Aggregated", "isController": false}, {"data": [[82.0, 60057.666666666664], [80.0, 60048.0], [85.0, 20017.0], [84.0, 38213.63636363636], [95.0, 60045.333333333336], [97.0, 60054.444444444445], [96.0, 60296.61702127659], [100.0, 50918.130434782615]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[94.74999999999997, 54463.06000000003]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76-Aggregated", "isController": false}, {"data": [[69.0, 484815.0], [68.0, 62062.0], [77.0, 38874.79710144927], [97.0, 199.0], [96.0, 979.875], [24.0, 1213977.0], [100.0, 260.4], [53.0, 1332207.0], [55.0, 1334187.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[80.53608247422677, 73474.09278350516]], "isOverall": false, "label": "Tenders_Page/_next/image/-100-Aggregated", "isController": false}, {"data": [[66.0, 62036.0], [69.0, 477173.0], [68.0, 62049.0], [77.0, 78011.60344827588], [86.0, 60047.0], [91.0, 60042.0], [90.0, 60044.0], [89.0, 60048.5], [95.0, 60046.0], [93.0, 60084.2], [97.0, 60042.0], [96.0, 60781.0], [100.0, 60049.75]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[80.7078651685393, 90642.75280898878]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102-Aggregated", "isController": false}, {"data": [[34.0, 60.0], [40.0, 89.5], [49.0, 58.0], [52.0, 104.0], [53.0, 89.0], [54.0, 94.0], [55.0, 116.0], [56.0, 105.0], [59.0, 137.0], [60.0, 155.0], [63.0, 87.0], [64.0, 82.0], [66.0, 75.0], [72.0, 109.5], [78.0, 131.0], [87.0, 79.0], [88.0, 86.0], [89.0, 109.0], [93.0, 133.0], [95.0, 123.5], [98.0, 132.0], [100.0, 235.83561643835614]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[91.31, 200.15999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32-Aggregated", "isController": false}, {"data": [[100.0, 254.46999999999994]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[100.0, 254.46999999999994]], "isOverall": false, "label": "Tenders_Page/_next/image/-57-Aggregated", "isController": false}, {"data": [[78.0, 60138.0], [77.0, 30247.333333333336], [83.0, 1.0], [82.0, 0.5], [80.0, 60160.11764705883], [85.0, 52324.91304347826], [84.0, 4296.214285714284], [89.0, 0.0], [95.0, 60193.0], [93.0, 0.0], [99.0, 60149.0], [98.0, 60233.0], [97.0, 60242.0], [96.0, 60654.299999999996], [100.0, 60414.142857142855]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[87.58000000000001, 45854.450000000004]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78-Aggregated", "isController": false}, {"data": [[83.0, 60129.0], [82.0, 3812.333333333333], [80.0, 1.0], [85.0, 0.0], [84.0, 9251.538461538461], [89.0, 60193.0], [95.0, 61633.09090909092], [93.0, 68362.5], [98.0, 60233.0], [97.0, 60164.49999999999], [96.0, 60752.32258064515], [100.0, 50520.24999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[93.65, 48961.259999999995]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75-Aggregated", "isController": false}, {"data": [[89.0, 516.0], [90.0, 571.0], [100.0, 1980.428571428572]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[99.78999999999996, 1951.6899999999996]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33-Aggregated", "isController": false}, {"data": [[77.0, 5382.514705882352], [99.0, 53.0], [98.0, 64.0], [97.0, 66.66666666666667], [96.0, 1033.3], [100.0, 67.42857142857143]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[83.43999999999998, 3874.6599999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82-Aggregated", "isController": false}, {"data": [[33.0, 1182186.0], [35.0, 1182182.0], [36.0, 1182178.0], [38.0, 1182182.0], [41.0, 1182173.0], [46.0, 1182148.0], [52.0, 1182142.0], [56.0, 1182121.0], [66.0, 62031.875], [69.0, 454955.0], [79.0, 60070.0], [78.0, 60043.0], [77.0, 69856.79310344829], [83.0, 0.0], [82.0, 60058.0], [80.0, 60058.0], [86.0, 0.0], [85.0, 60039.0], [91.0, 0.0], [90.0, 0.0], [89.0, 20021.666666666664], [95.0, 60052.5], [93.0, 0.0], [96.0, 61301.666666666664], [100.0, 60045.25], [9.0, 1182221.0], [10.0, 1182228.0], [14.0, 1182217.0], [24.0, 1182198.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[72.67567567567566, 250306.91891891893]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105-Aggregated", "isController": false}, {"data": [[99.0, 76.0], [98.0, 70.0], [97.0, 101.5], [96.0, 1368.0000000000005], [100.0, 114.41071428571429]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[98.51000000000002, 373.81]], "isOverall": false, "label": "Tenders_Page/tr/-65-Aggregated", "isController": false}, {"data": [[57.0, 62077.0], [59.0, 62036.0], [58.0, 62029.0], [60.0, 62034.0], [63.0, 62039.0], [67.0, 62034.0], [66.0, 62021.0], [64.0, 62047.0], [71.0, 62043.0], [69.0, 63092.0], [68.0, 62057.0], [73.0, 62041.0], [79.0, 0.0], [78.0, 0.0], [77.0, 62033.0], [76.0, 62072.0], [83.0, 0.0], [82.0, 0.0], [80.0, 0.0], [86.0, 0.0], [85.0, 1.0], [84.0, 0.0], [91.0, 0.0], [90.0, 0.0], [89.0, 0.33333333333333337], [95.0, 48.0], [93.0, 0.0], [99.0, 53.0], [98.0, 45.0], [97.0, 49.0], [96.0, 60.0], [100.0, 105.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[78.8409090909091, 29645.272727272724]], "isOverall": false, "label": "Tenders_Page/_next/image/-110-Aggregated", "isController": false}, {"data": [[77.0, 195.66176470588243], [82.0, 40243.0], [95.0, 196.75], [99.0, 50.0], [98.0, 92.0], [97.0, 73.0], [96.0, 115.81818181818181], [100.0, 81.42857142857143]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[83.21999999999998, 573.2700000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81-Aggregated", "isController": false}, {"data": [[37.0, 218.0], [40.0, 241.2], [52.0, 308.0], [56.0, 293.6], [59.0, 349.3333333333333], [60.0, 319.5], [65.0, 591.0], [67.0, 296.0], [69.0, 339.0], [70.0, 344.4], [75.0, 297.0], [77.0, 339.0], [78.0, 356.0], [79.0, 363.0], [84.0, 458.0], [88.0, 404.0], [90.0, 424.0], [94.0, 410.0], [95.0, 411.0], [96.0, 413.0], [97.0, 396.0], [98.0, 407.0], [100.0, 599.4761904761906], [18.0, 164.0], [21.0, 194.0], [26.0, 192.6], [28.0, 184.33333333333334], [30.0, 167.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[77.02000000000001, 434.8400000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29-Aggregated", "isController": false}, {"data": [[34.0, 69.0], [40.0, 83.5], [41.0, 75.5], [45.0, 72.0], [55.0, 106.0], [56.0, 111.0], [63.0, 104.0], [67.0, 107.0], [75.0, 115.0], [77.0, 137.5], [78.0, 136.0], [79.0, 169.0], [84.0, 157.0], [87.0, 79.0], [89.0, 109.5], [90.0, 134.0], [94.0, 132.0], [95.0, 129.0], [97.0, 137.5], [98.0, 127.0], [100.0, 224.03278688524588], [30.0, 55.0], [31.0, 70.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[87.52, 178.16]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31-Aggregated", "isController": false}, {"data": [[100.0, 534.6299999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[100.0, 534.6299999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39-Aggregated", "isController": false}, {"data": [[100.0, 403.54]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}, {"data": [[100.0, 403.54]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.69719888E12, "maxY": 589499.1166666667, "series": [{"data": [[1.69719894E12, 107443.31666666667], [1.69720104E12, 3191.383333333333], [1.69720074E12, 334.6], [1.69719924E12, 78174.98333333334], [1.69720044E12, 495.85], [1.69719954E12, 1100.1], [1.69720014E12, 525.8], [1.69719984E12, 23819.566666666666], [1.69720032E12, 688.9], [1.69719966E12, 224489.75], [1.69720002E12, 531.75], [1.69720056E12, 489.9], [1.69719942E12, 72096.6], [1.69720026E12, 525.8], [1.69719972E12, 21226.366666666665], [1.69719996E12, 1713.7666666666667], [1.69720086E12, 191.2], [1.69719912E12, 34439.21666666667], [1.69720008E12, 537.7], [1.6971999E12, 4876.5], [1.69719888E12, 589499.1166666667], [1.69720098E12, 47.8], [1.697199E12, 54698.666666666664], [1.69720068E12, 478.0], [1.6971993E12, 139316.41666666666], [1.69720038E12, 647.15], [1.6971996E12, 222851.88333333333], [1.69720092E12, 95.6], [1.69719906E12, 49166.166666666664], [1.69720062E12, 478.0], [1.69719936E12, 151177.2], [1.6972008E12, 334.6], [1.69719918E12, 53210.433333333334], [1.6972005E12, 489.9], [1.69719948E12, 21211.566666666666], [1.6972002E12, 382.4], [1.69719978E12, 30573.05]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69719894E12, 5310.816666666667], [1.69720104E12, 0.0], [1.69720074E12, 0.0], [1.69719924E12, 4475.666666666667], [1.69720044E12, 32.65], [1.69719954E12, 240.25], [1.69720014E12, 0.0], [1.69719984E12, 1091.1], [1.69720032E12, 0.0], [1.69719966E12, 5332.35], [1.69720002E12, 10.883333333333333], [1.69720056E12, 21.766666666666666], [1.69719942E12, 4280.716666666666], [1.69720026E12, 0.0], [1.69719972E12, 798.95], [1.69719996E12, 111.28333333333333], [1.69720086E12, 0.0], [1.69719912E12, 2289.9], [1.69720008E12, 21.766666666666666], [1.6971999E12, 387.3833333333333], [1.69719888E12, 18035.133333333335], [1.69720098E12, 0.0], [1.697199E12, 2375.0666666666666], [1.69720068E12, 0.0], [1.6971993E12, 5940.85], [1.69720038E12, 10.883333333333333], [1.6971996E12, 5056.366666666667], [1.69720092E12, 0.0], [1.69719906E12, 2188.983333333333], [1.69720062E12, 0.0], [1.69719936E12, 5313.716666666666], [1.6972008E12, 0.0], [1.69719918E12, 2786.2833333333333], [1.6972005E12, 21.766666666666666], [1.69719948E12, 1272.3333333333333], [1.6972002E12, 0.0], [1.69719978E12, 1259.4166666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69720104E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69719888E12, "maxY": 1293457.0, "series": [{"data": [[1.69719894E12, 256.0], [1.69719942E12, 230.11111111111111], [1.69719924E12, 225.77777777777777], [1.69719906E12, 194.0], [1.69719936E12, 317.99999999999994], [1.69719918E12, 394.70000000000005], [1.697199E12, 220.0], [1.69719948E12, 80.77777777777777], [1.6971993E12, 237.40740740740736], [1.69719912E12, 191.6]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[1.69719894E12, 113.75], [1.69719942E12, 790.4444444444445], [1.69719924E12, 159.22222222222223], [1.69719906E12, 152.66666666666666], [1.69719936E12, 183.13043478260875], [1.69719918E12, 453.69999999999993], [1.697199E12, 132.0], [1.69719948E12, 52.44444444444444], [1.6971993E12, 168.92592592592598], [1.69719912E12, 163.4]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[1.69719942E12, 298.1111111111111], [1.69719924E12, 77.66666666666667], [1.69719972E12, 77.5], [1.69719906E12, 55.5], [1.69719936E12, 119.30000000000003], [1.69719984E12, 81.5], [1.69719918E12, 54.0], [1.69719966E12, 100.54545454545455], [1.697199E12, 45.0], [1.6971993E12, 70.6], [1.6971996E12, 724.516129032258]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[1.69719894E12, 130.5], [1.69719942E12, 99.0], [1.69719924E12, 114.33333333333333], [1.69719906E12, 85.0], [1.69719936E12, 181.56521739130432], [1.69719918E12, 272.70000000000005], [1.697199E12, 97.0], [1.69719948E12, 29.88888888888889], [1.6971993E12, 165.77777777777777], [1.69719912E12, 101.6]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[1.69720074E12, 62017.333333333336], [1.69719924E12, 48.0], [1.69719954E12, 0.0], [1.69720032E12, 62035.0], [1.69720068E12, 62009.0], [1.6971993E12, 45.0], [1.69720038E12, 65174.0], [1.69719942E12, 61.0], [1.69720026E12, 62066.28571428572], [1.69720092E12, 62075.0], [1.69720062E12, 62081.0], [1.6972008E12, 62032.0], [1.69719948E12, 7.153846153846154], [1.6972002E12, 62039.0], [1.69720086E12, 62045.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[1.69720074E12, 62031.0], [1.69719924E12, 47.0], [1.69719954E12, 0.0], [1.69720014E12, 62071.25], [1.69720032E12, 62041.0], [1.69720068E12, 62036.0], [1.6971993E12, 67.0], [1.69720056E12, 62051.5], [1.69719942E12, 47.0], [1.69720026E12, 62057.0], [1.69720062E12, 62027.0], [1.6972008E12, 62032.0], [1.69719948E12, 7.999999999999999], [1.6972002E12, 62042.0], [1.69720086E12, 62081.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[1.69719894E12, 200.4], [1.69719942E12, 6185.888888888889], [1.69719924E12, 335.62962962962973], [1.69719906E12, 409.2], [1.69719936E12, 363.88888888888886], [1.69719918E12, 650.6666666666666], [1.697199E12, 378.3333333333333], [1.6971993E12, 363.4782608695652], [1.69719912E12, 286.8]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[1.69719894E12, 60.2], [1.69719942E12, 548.2222222222222], [1.69719924E12, 61.96296296296297], [1.69719906E12, 78.2], [1.69719936E12, 56.666666666666664], [1.69719918E12, 132.11111111111111], [1.697199E12, 63.666666666666664], [1.6971993E12, 61.695652173913054], [1.69719912E12, 51.9]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[1.69719894E12, 57.2], [1.69719942E12, 889.5555555555555], [1.69719924E12, 182.74074074074073], [1.69719906E12, 85.0], [1.69719936E12, 67.1111111111111], [1.69719918E12, 370.77777777777777], [1.697199E12, 59.0], [1.6971993E12, 137.43478260869566], [1.69719912E12, 58.9]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[1.69719888E12, 606.4399999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[1.69719942E12, 2662.875], [1.69719924E12, 119.66666666666666], [1.69719972E12, 189.5], [1.69719906E12, 70.0], [1.69719936E12, 139.7], [1.69719984E12, 111040.0], [1.69719918E12, 157.0], [1.69719966E12, 94.72727272727275], [1.697199E12, 47.5], [1.6971993E12, 78.2], [1.6971996E12, 271.19354838709677]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[1.69719942E12, 2633.833333333333], [1.69719924E12, 69.66666666666667], [1.69719972E12, 161.5], [1.69719906E12, 76.5], [1.69719936E12, 135.99999999999997], [1.69719984E12, 81.66666666666667], [1.69719918E12, 98.0], [1.69719966E12, 86.6969696969697], [1.697199E12, 65.0], [1.69719948E12, 35158.0], [1.6971993E12, 65.8], [1.6971996E12, 6140.53125]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[1.69719942E12, 195.62500000000003], [1.69719924E12, 73.33333333333333], [1.69719972E12, 142.5], [1.69719906E12, 85.5], [1.69719936E12, 128.0], [1.69719984E12, 81.0], [1.69719918E12, 124.0], [1.69719966E12, 95.21212121212122], [1.697199E12, 48.0], [1.69719948E12, 41332.0], [1.6971993E12, 86.0], [1.6971996E12, 346.2903225806452]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[1.69719942E12, 8497.333333333334], [1.69719924E12, 90.0], [1.69719972E12, 80.0], [1.69719906E12, 73.5], [1.69719936E12, 170.70000000000002], [1.69719984E12, 51.0], [1.69719918E12, 51.0], [1.69719966E12, 87.60606060606062], [1.697199E12, 60.5], [1.69719948E12, 37584.0], [1.6971993E12, 63.6], [1.6971996E12, 6941.1176470588225]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[1.69720008E12, 311.0], [1.6971999E12, 98.0], [1.69720044E12, 324.0], [1.69719984E12, 589.0], [1.69720002E12, 5381.0], [1.6971993E12, 52.0], [1.69720038E12, 163.0], [1.69720056E12, 60.0], [1.69719942E12, 1204.3333333333333], [1.69719996E12, 97.25], [1.69719936E12, 176.33333333333334], [1.69719918E12, 67.5], [1.6972005E12, 62.0], [1.69719948E12, 7588.416666666666], [1.69719978E12, 525.2777777777778], [1.69719912E12, 49.0]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[1.69719888E12, 435.80999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[1.69719924E12, 67.0], [1.69719972E12, 59.5], [1.69719906E12, 56.0], [1.69719936E12, 92.81818181818183], [1.69719984E12, 70.5], [1.69719918E12, 46.0], [1.69719966E12, 78.61764705882355], [1.697199E12, 62.5], [1.6971993E12, 63.25], [1.69719978E12, 152.0], [1.6971996E12, 177.88888888888894]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[1.69719924E12, 69.33333333333333], [1.69719972E12, 114.5], [1.69719906E12, 60.0], [1.69719936E12, 85.18181818181817], [1.69719984E12, 60.25], [1.69719918E12, 58.0], [1.69719966E12, 69.76470588235294], [1.697199E12, 72.0], [1.6971993E12, 63.5], [1.69719978E12, 235.0], [1.6971996E12, 191.38888888888889]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[1.69720008E12, 62029.0], [1.69720104E12, 1213487.2222222225], [1.69719924E12, 60138.5], [1.69720044E12, 62035.0], [1.69719954E12, 15729.8], [1.69720014E12, 62044.0], [1.69720002E12, 62059.25], [1.69720068E12, 62060.0], [1.6971993E12, 60155.0], [1.69720056E12, 62031.666666666664], [1.69719942E12, 60147.0], [1.69720062E12, 62039.5], [1.6972005E12, 62072.0], [1.69719948E12, 13929.230769230771], [1.6972002E12, 62039.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[1.69719894E12, 4484.08510638298], [1.69719906E12, 60137.333333333336], [1.69719888E12, 421.3333333333333], [1.697199E12, 8758.153846153844], [1.69719912E12, 60139.666666666664]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[1.69719924E12, 84.0], [1.69719972E12, 72.0], [1.69719906E12, 54.0], [1.69719936E12, 106.18181818181816], [1.69719984E12, 60.25], [1.69719918E12, 47.0], [1.69719966E12, 71.41176470588236], [1.697199E12, 81.5], [1.6971993E12, 61.25], [1.69719978E12, 76.0], [1.6971996E12, 183.00000000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[1.69719894E12, 3854.3921568627457], [1.69719888E12, 495.7142857142857]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[1.69719924E12, 67.33333333333333], [1.69719972E12, 79.0], [1.69719906E12, 56.0], [1.69719936E12, 112.36363636363635], [1.69719984E12, 75.5], [1.69719918E12, 68.0], [1.69719966E12, 3953.382352941176], [1.697199E12, 77.0], [1.6971993E12, 66.25], [1.69719978E12, 124.0], [1.6971996E12, 174.1111111111111]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[1.69719924E12, 61.333333333333336], [1.69719972E12, 119.5], [1.69719906E12, 65.0], [1.69719936E12, 116.9090909090909], [1.69719984E12, 108.25], [1.69719918E12, 79.0], [1.69719966E12, 72.7941176470588], [1.697199E12, 55.5], [1.6971993E12, 75.25], [1.69719978E12, 150.0], [1.6971996E12, 189.6111111111111]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[1.69719894E12, 43.0], [1.69719942E12, 2697.3043478260865], [1.69719924E12, 218.6], [1.69719972E12, 291578.0], [1.69719936E12, 201.44444444444446], [1.69719918E12, 78.0], [1.697199E12, 32.5], [1.69719948E12, 3730.5128205128203], [1.6971993E12, 93.8], [1.69719912E12, 80.0], [1.6971996E12, 84557.2]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[1.69719924E12, 75.0], [1.69719972E12, 58.5], [1.69719906E12, 71.0], [1.69719936E12, 84.72727272727272], [1.69719984E12, 53.5], [1.69719918E12, 55.0], [1.69719966E12, 76.05882352941175], [1.697199E12, 56.5], [1.6971993E12, 61.25], [1.69719978E12, 101.0], [1.6971996E12, 324.5277777777778]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[1.69719894E12, 2390.1126760563393], [1.69719888E12, 569.655172413793]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[1.69719924E12, 76.0], [1.69719972E12, 89.0], [1.69719906E12, 50.5], [1.69719936E12, 77.72727272727273], [1.69719984E12, 65.75], [1.69719918E12, 65.0], [1.69719966E12, 67.44117647058823], [1.697199E12, 50.5], [1.6971993E12, 58.5], [1.69719978E12, 193.0], [1.6971996E12, 196.69444444444443]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[1.69719924E12, 70.66666666666667], [1.69719972E12, 95.5], [1.69719906E12, 85.5], [1.69719936E12, 139.20000000000002], [1.69719984E12, 90231.0], [1.69719918E12, 80.0], [1.69719966E12, 93.03030303030303], [1.697199E12, 50.5], [1.69719948E12, 55098.0], [1.6971993E12, 95.4], [1.69719978E12, 268038.0], [1.6971996E12, 3174.7222222222226]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[1.69719924E12, 68.33333333333333], [1.69719972E12, 128.0], [1.69719906E12, 59.5], [1.69719936E12, 81.90909090909092], [1.69719984E12, 53.5], [1.69719918E12, 60.0], [1.69719966E12, 75.05882352941177], [1.697199E12, 71.5], [1.6971993E12, 65.25], [1.69719978E12, 226.0], [1.6971996E12, 252.25]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[1.69719894E12, 3632.9444444444443], [1.69719924E12, 60047.0], [1.69719906E12, 50531.96296296296], [1.69719888E12, 376.8], [1.69719918E12, 60061.555555555555], [1.697199E12, 3293.0], [1.69719912E12, 60051.565217391304]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[1.69719894E12, 12535.485714285714], [1.69719888E12, 1232.907692307692]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[1.69719894E12, 13930.777777777777], [1.69719924E12, 60215.0], [1.69719906E12, 60046.666666666664], [1.69719888E12, 1760.5], [1.69719918E12, 60198.78260869565], [1.697199E12, 49019.6], [1.6971993E12, 60149.55555555556], [1.69719912E12, 60088.074074074066]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[1.69720008E12, 62437.0], [1.69720074E12, 62061.5], [1.69719924E12, 143.0], [1.69719954E12, 2214.8], [1.69720014E12, 62022.5], [1.69720068E12, 62044.5], [1.6971993E12, 150.5], [1.69720056E12, 62025.0], [1.69719942E12, 181.0], [1.69720026E12, 62042.0], [1.69720062E12, 62046.0], [1.6972005E12, 62039.0], [1.69719948E12, 24.153846153846153], [1.6972002E12, 62030.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[1.69719894E12, 6674.188405797103], [1.69719888E12, 1153.5806451612905]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[1.69719894E12, 12210.611111111113], [1.69719906E12, 60070.15384615385], [1.69719888E12, 831.6], [1.69719918E12, 60143.666666666664], [1.697199E12, 59712.48484848484], [1.69719912E12, 60144.11111111111]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[1.69719894E12, 228.75], [1.69719942E12, 76.88888888888889], [1.69719924E12, 108.88888888888889], [1.69719906E12, 54.666666666666664], [1.69719936E12, 107.8695652173913], [1.69719918E12, 82.7], [1.697199E12, 49.0], [1.69719948E12, 26.77777777777778], [1.6971993E12, 80.66666666666664], [1.69719912E12, 75.4]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[1.6971999E12, 97363.0], [1.69720104E12, 1222086.6666666667], [1.69719924E12, 60143.0], [1.69719984E12, 113052.5], [1.69720032E12, 489855.0], [1.69719966E12, 61185.67741935483], [1.6971993E12, 60140.0], [1.69719942E12, 61026.90909090909], [1.69719972E12, 64523.18518518518], [1.69719906E12, 60139.0], [1.69719936E12, 60136.75], [1.69719978E12, 108518.16666666666], [1.69719912E12, 60145.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[1.69719894E12, 9263.8085106383], [1.69719906E12, 60184.11111111112], [1.69719888E12, 1273.75], [1.697199E12, 54773.09375]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[1.69719894E12, 231.25], [1.69719942E12, 131.88888888888889], [1.69719924E12, 138.55555555555554], [1.69719906E12, 104.66666666666667], [1.69719936E12, 213.34782608695653], [1.69719918E12, 142.50000000000003], [1.697199E12, 90.0], [1.69719948E12, 42.55555555555555], [1.6971993E12, 141.9259259259259], [1.69719912E12, 165.2]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[1.69719888E12, 671.81]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[1.69719894E12, 98.5], [1.69719942E12, 117.8888888888889], [1.69719924E12, 113.88888888888889], [1.69719906E12, 86.33333333333333], [1.69719936E12, 126.30434782608694], [1.69719918E12, 342.3], [1.697199E12, 93.0], [1.69719948E12, 26.77777777777778], [1.6971993E12, 103.33333333333331], [1.69719912E12, 107.6]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[1.69719894E12, 90.0], [1.69719942E12, 198.88888888888889], [1.69719924E12, 53.22222222222222], [1.69719906E12, 55.333333333333336], [1.69719936E12, 79.91304347826087], [1.69719918E12, 130.4], [1.697199E12, 73.0], [1.69719948E12, 18.555555555555557], [1.6971993E12, 61.666666666666664], [1.69719912E12, 56.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[1.69719894E12, 150.25], [1.69719942E12, 58.666666666666664], [1.69719924E12, 72.11111111111111], [1.69719906E12, 60.0], [1.69719936E12, 167.86956521739134], [1.69719918E12, 179.79999999999998], [1.697199E12, 54.0], [1.69719948E12, 52.22222222222221], [1.6971993E12, 99.33333333333333], [1.69719912E12, 67.2]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[1.69719942E12, 358.1111111111111], [1.69719924E12, 94.66666666666667], [1.69719972E12, 271.5], [1.69719906E12, 54.5], [1.69719936E12, 100.49999999999999], [1.69719984E12, 139.0], [1.69719918E12, 184.0], [1.69719966E12, 84.27272727272727], [1.697199E12, 52.5], [1.6971993E12, 105.4], [1.6971996E12, 226.67741935483872]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[1.69719894E12, 10408.052631578948], [1.69719888E12, 1070.0], [1.697199E12, 53493.555555555555]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[1.69719942E12, 25247.0], [1.69719924E12, 78.33333333333333], [1.69719972E12, 79.5], [1.69719906E12, 103.5], [1.69719936E12, 162.3], [1.69719984E12, 69.33333333333333], [1.69719918E12, 74.0], [1.69719966E12, 86.84848484848484], [1.697199E12, 46.5], [1.69719948E12, 47105.666666666664], [1.6971993E12, 108.0], [1.6971996E12, 4842.942857142856]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[1.69719942E12, 4134.333333333333], [1.69719924E12, 155.0], [1.69719972E12, 219282.5], [1.69719906E12, 151.5], [1.69719936E12, 173.6], [1.69719984E12, 734.0], [1.69719918E12, 129.0], [1.69719966E12, 162996.60606060608], [1.697199E12, 117.0], [1.69719948E12, 39993.0], [1.6971993E12, 135.0], [1.6971996E12, 78348.48387096776]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[1.69719888E12, 164.77]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[1.69719888E12, 534.7700000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[1.69719888E12, 465.04]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[1.69719888E12, 410.62]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[1.69719888E12, 478.81]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[1.69720008E12, 62036.5], [1.6971999E12, 44523.529411764706], [1.69720104E12, 1213535.3333333335], [1.69720044E12, 62041.666666666664], [1.69719984E12, 50047.0], [1.69720002E12, 62036.0], [1.6971993E12, 158.0], [1.69720038E12, 62041.0], [1.69720056E12, 62044.5], [1.69719942E12, 330.75], [1.69719996E12, 95057.0], [1.69719936E12, 469.33333333333337], [1.69719918E12, 153.0], [1.6972005E12, 62066.0], [1.69719948E12, 53.45454545454546], [1.69719978E12, 3922.777777777778], [1.69719912E12, 167.0]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[1.69719888E12, 285.6100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[1.69719888E12, 343.52999999999986]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[1.69719888E12, 261.8099999999999]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[1.69719894E12, 6956.75], [1.69719942E12, 60212.11111111111], [1.69719924E12, 60057.555555555555], [1.69719906E12, 60047.666666666664], [1.69719936E12, 60048.47826086957], [1.69719918E12, 60184.5], [1.697199E12, 60050.0], [1.69719948E12, 60057.77777777778], [1.6971993E12, 60056.59259259259], [1.69719912E12, 60049.2]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[1.69719894E12, 12289.714285714284], [1.69719924E12, 60259.34782608695], [1.69719906E12, 60168.600000000006], [1.69719888E12, 1423.0], [1.69719936E12, 60172.555555555555], [1.69719918E12, 60174.25925925926], [1.697199E12, 54030.6], [1.6971993E12, 60143.22222222222], [1.69719912E12, 60149.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[1.69719888E12, 511.87000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[1.69719894E12, 7210.4], [1.69719942E12, 60417.33333333334], [1.69719924E12, 60182.51851851852], [1.69719906E12, 60168.6], [1.69719936E12, 60169.11111111111], [1.69719918E12, 60268.222222222226], [1.697199E12, 51461.666666666664], [1.6971993E12, 60166.95652173913], [1.69719912E12, 60146.6]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[1.69719888E12, 615.17]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[1.69719888E12, 317.75999999999993]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[1.69719942E12, 143.8], [1.69719924E12, 64.66666666666667], [1.69719972E12, 93.0], [1.69719906E12, 70.0], [1.69719936E12, 164.5], [1.69719984E12, 70.33333333333333], [1.69719918E12, 49.0], [1.69719966E12, 86.0], [1.697199E12, 52.5], [1.69719948E12, 47578.0], [1.6971993E12, 59.2], [1.6971996E12, 211.21874999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[1.6971999E12, 65950.0], [1.69720104E12, 1244374.2], [1.69719924E12, 121.0], [1.69720044E12, 62072.5], [1.69719984E12, 87213.0], [1.69720032E12, 445309.5], [1.69719966E12, 138.63636363636365], [1.6971993E12, 151.33333333333334], [1.69719942E12, 1023.181818181818], [1.69719972E12, 16162.444444444445], [1.69719996E12, 105385.0], [1.69719906E12, 174.0], [1.69719936E12, 256.5], [1.69719978E12, 11769.000000000005], [1.69719912E12, 119.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[1.69719894E12, 7498.25], [1.69719942E12, 60548.21739130436], [1.69719924E12, 60064.1], [1.69719906E12, 60043.0], [1.69719954E12, 60057.333333333336], [1.69719936E12, 60054.37037037036], [1.69719918E12, 60058.6], [1.69719948E12, 36030.0], [1.6971993E12, 60054.444444444445], [1.69719912E12, 60049.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[1.6971999E12, 119427.0], [1.69720104E12, 1293457.0], [1.69719924E12, 302.0], [1.69719984E12, 108228.55555555556], [1.69719966E12, 1778.111111111111], [1.6971993E12, 192.33333333333334], [1.69720038E12, 273438.5], [1.69719942E12, 1317.4545454545455], [1.69719972E12, 33464.583333333336], [1.69719906E12, 308.5], [1.69719936E12, 251.75], [1.69719978E12, 36995.32142857142], [1.69719912E12, 191.5]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[1.69719984E12, 76021.41666666669], [1.69720032E12, 455446.0], [1.69720002E12, 62076.0], [1.6971993E12, 60042.0], [1.69720038E12, 315468.8], [1.69719942E12, 61140.0], [1.69719996E12, 130407.0], [1.69719936E12, 60058.333333333336], [1.69719918E12, 60045.0], [1.6972005E12, 62036.0], [1.69719948E12, 60063.090909090904], [1.69719978E12, 80702.26315789473], [1.69719912E12, 60054.5]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[1.69719888E12, 200.15999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[1.69719894E12, 193.44444444444443], [1.69719906E12, 252.76923076923077], [1.69719888E12, 435.8], [1.69719918E12, 253.11111111111114], [1.697199E12, 258.57575757575756], [1.69719912E12, 267.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[1.69719942E12, 61264.99999999999], [1.69719924E12, 60830.333333333336], [1.69719906E12, 60136.0], [1.69719954E12, 60158.8888888889], [1.69719936E12, 60155.899999999994], [1.69719984E12, 121051.0], [1.69719918E12, 60139.0], [1.69719966E12, 60430.0], [1.697199E12, 60073.0], [1.69719948E12, 31454.72727272725], [1.6971993E12, 60220.2], [1.6971996E12, 0.75]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[1.69719894E12, 10162.0], [1.69719942E12, 60832.85185185186], [1.69719924E12, 60342.4], [1.69719954E12, 3812.666666666667], [1.69719936E12, 60186.77777777778], [1.69719918E12, 60191.0], [1.697199E12, 51863.0], [1.69719948E12, 37694.710526315794], [1.6971993E12, 60164.49999999999], [1.69719912E12, 60141.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[1.69719888E12, 1951.6899999999996]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[1.69719942E12, 2167.5555555555557], [1.69719924E12, 62.0], [1.69719972E12, 361.5], [1.69719906E12, 56.5], [1.69719936E12, 111.0], [1.69719984E12, 163767.0], [1.69719918E12, 111.0], [1.69719966E12, 121.51515151515153], [1.697199E12, 57.5], [1.6971993E12, 62.4], [1.6971996E12, 1088.5161290322578]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[1.69720008E12, 62040.0], [1.69720104E12, 1182181.3333333333], [1.69719924E12, 60043.5], [1.69720044E12, 62035.0], [1.69719954E12, 60057.25], [1.69720014E12, 62027.5], [1.69719984E12, 72539.72222222222], [1.69720002E12, 62050.25], [1.69720038E12, 454955.0], [1.69720056E12, 62042.0], [1.69719942E12, 61301.666666666664], [1.69719996E12, 71459.0], [1.69720062E12, 62027.5], [1.69719936E12, 60048.0], [1.69719918E12, 60047.0], [1.6972005E12, 62027.0], [1.69719948E12, 16378.272727272726]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[1.69719894E12, 118.2], [1.69719942E12, 3069.222222222222], [1.69719924E12, 106.92592592592594], [1.69719906E12, 92.4], [1.69719936E12, 93.55555555555556], [1.69719918E12, 156.0], [1.697199E12, 113.66666666666667], [1.6971993E12, 99.69565217391303], [1.69719912E12, 93.8]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[1.69719924E12, 79.0], [1.69720044E12, 62045.5], [1.69719954E12, 0.0], [1.69720032E12, 62054.85714285714], [1.69720098E12, 62077.0], [1.69720068E12, 62021.0], [1.6971993E12, 47.0], [1.69720038E12, 63092.0], [1.69719942E12, 60.0], [1.69720026E12, 62033.0], [1.69720092E12, 62029.0], [1.6972008E12, 62041.0], [1.69719948E12, 7.538461538461539], [1.69720086E12, 62035.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[1.69719942E12, 196.75], [1.69719924E12, 95.0], [1.69719972E12, 492.5], [1.69719906E12, 58.5], [1.69719936E12, 113.30000000000001], [1.69719984E12, 63.0], [1.69719918E12, 104.0], [1.69719966E12, 84.18181818181817], [1.697199E12, 57.0], [1.69719948E12, 40243.0], [1.6971993E12, 90.4], [1.6971996E12, 303.74193548387103]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[1.69719888E12, 434.8400000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[1.69719888E12, 178.16]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[1.69719888E12, 534.6299999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[1.69719888E12, 403.54]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69720104E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69719888E12, "maxY": 291578.0, "series": [{"data": [[1.69719894E12, 176.0], [1.69719942E12, 121.88888888888889], [1.69719924E12, 112.22222222222223], [1.69719906E12, 71.66666666666667], [1.69719936E12, 146.17391304347828], [1.69719918E12, 175.6], [1.697199E12, 52.0], [1.69719948E12, 32.55555555555556], [1.6971993E12, 111.44444444444444], [1.69719912E12, 93.2]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[1.69719894E12, 113.5], [1.69719942E12, 790.4444444444445], [1.69719924E12, 159.11111111111111], [1.69719906E12, 152.33333333333334], [1.69719936E12, 183.08695652173915], [1.69719918E12, 453.69999999999993], [1.697199E12, 132.0], [1.69719948E12, 52.33333333333334], [1.6971993E12, 168.88888888888889], [1.69719912E12, 163.4]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[1.69719942E12, 180.2222222222222], [1.69719924E12, 68.0], [1.69719972E12, 69.5], [1.69719906E12, 51.0], [1.69719936E12, 101.6], [1.69719984E12, 56.5], [1.69719918E12, 52.0], [1.69719966E12, 81.24242424242424], [1.697199E12, 44.5], [1.6971993E12, 63.4], [1.6971996E12, 588.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[1.69719894E12, 130.5], [1.69719942E12, 98.88888888888889], [1.69719924E12, 114.22222222222221], [1.69719906E12, 85.0], [1.69719936E12, 181.56521739130432], [1.69719918E12, 272.70000000000005], [1.697199E12, 97.0], [1.69719948E12, 29.777777777777786], [1.6971993E12, 165.7407407407408], [1.69719912E12, 101.6]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[1.69720074E12, 0.0], [1.69719924E12, 48.0], [1.69719954E12, 0.0], [1.69720032E12, 0.0], [1.69720068E12, 0.0], [1.6971993E12, 45.0], [1.69720038E12, 0.0], [1.69719942E12, 61.0], [1.69720026E12, 0.0], [1.69720092E12, 0.0], [1.69720062E12, 0.0], [1.6972008E12, 0.0], [1.69719948E12, 6.923076923076923], [1.6972002E12, 0.0], [1.69720086E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[1.69720074E12, 0.0], [1.69719924E12, 47.0], [1.69719954E12, 0.0], [1.69720014E12, 0.0], [1.69720032E12, 0.0], [1.69720068E12, 0.0], [1.6971993E12, 67.0], [1.69720056E12, 0.0], [1.69719942E12, 47.0], [1.69720026E12, 0.0], [1.69720062E12, 0.0], [1.6972008E12, 0.0], [1.69719948E12, 7.923076923076922], [1.6972002E12, 0.0], [1.69720086E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[1.69719894E12, 110.2], [1.69719942E12, 4887.777777777777], [1.69719924E12, 224.07407407407408], [1.69719906E12, 258.8], [1.69719936E12, 231.88888888888889], [1.69719918E12, 435.77777777777777], [1.697199E12, 266.0], [1.6971993E12, 228.73913043478265], [1.69719912E12, 194.79999999999998]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[1.69719894E12, 60.2], [1.69719942E12, 548.2222222222222], [1.69719924E12, 61.96296296296297], [1.69719906E12, 78.2], [1.69719936E12, 56.666666666666664], [1.69719918E12, 132.11111111111111], [1.697199E12, 63.666666666666664], [1.6971993E12, 61.695652173913054], [1.69719912E12, 51.9]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[1.69719894E12, 57.2], [1.69719942E12, 889.5555555555555], [1.69719924E12, 182.74074074074073], [1.69719906E12, 85.0], [1.69719936E12, 67.1111111111111], [1.69719918E12, 370.6666666666667], [1.697199E12, 59.0], [1.6971993E12, 137.39130434782612], [1.69719912E12, 58.9]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[1.69719888E12, 293.7800000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[1.69719942E12, 121.99999999999999], [1.69719924E12, 110.66666666666666], [1.69719972E12, 180.0], [1.69719906E12, 64.0], [1.69719936E12, 124.4], [1.69719984E12, 3255.666666666667], [1.69719918E12, 153.0], [1.69719966E12, 69.75757575757575], [1.697199E12, 46.0], [1.6971993E12, 72.6], [1.6971996E12, 179.35483870967744]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[1.69719942E12, 2619.5], [1.69719924E12, 63.33333333333333], [1.69719972E12, 153.0], [1.69719906E12, 74.5], [1.69719936E12, 120.3], [1.69719984E12, 72.66666666666667], [1.69719918E12, 86.0], [1.69719966E12, 82.84848484848487], [1.697199E12, 62.0], [1.69719948E12, 35152.0], [1.6971993E12, 63.4], [1.6971996E12, 1558.125]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[1.69719942E12, 146.0], [1.69719924E12, 66.33333333333333], [1.69719972E12, 140.0], [1.69719906E12, 81.0], [1.69719936E12, 121.5], [1.69719984E12, 76.5], [1.69719918E12, 104.0], [1.69719966E12, 79.24242424242425], [1.697199E12, 43.5], [1.69719948E12, 174.0], [1.6971993E12, 82.8], [1.6971996E12, 263.483870967742]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[1.69719942E12, 8441.666666666666], [1.69719924E12, 84.33333333333333], [1.69719972E12, 76.5], [1.69719906E12, 63.0], [1.69719936E12, 154.9], [1.69719984E12, 47.333333333333336], [1.69719918E12, 50.0], [1.69719966E12, 76.03030303030305], [1.697199E12, 59.0], [1.69719948E12, 30065.5], [1.6971993E12, 61.4], [1.6971996E12, 124.44117647058829]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[1.69720008E12, 311.0], [1.6971999E12, 98.0], [1.69720044E12, 324.0], [1.69719984E12, 589.0], [1.69720002E12, 5381.0], [1.6971993E12, 52.0], [1.69720038E12, 163.0], [1.69720056E12, 60.0], [1.69719942E12, 1204.3333333333333], [1.69719996E12, 97.25], [1.69719936E12, 176.33333333333334], [1.69719918E12, 67.5], [1.6972005E12, 62.0], [1.69719948E12, 6664.916666666667], [1.69719978E12, 525.2777777777778], [1.69719912E12, 49.0]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[1.69719888E12, 313.79999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[1.69719924E12, 67.0], [1.69719972E12, 59.5], [1.69719906E12, 56.0], [1.69719936E12, 92.81818181818183], [1.69719984E12, 68.0], [1.69719918E12, 46.0], [1.69719966E12, 77.70588235294117], [1.697199E12, 62.0], [1.6971993E12, 63.25], [1.69719978E12, 100.0], [1.6971996E12, 173.36111111111111]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[1.69719924E12, 69.33333333333333], [1.69719972E12, 111.5], [1.69719906E12, 60.0], [1.69719936E12, 85.18181818181817], [1.69719984E12, 58.0], [1.69719918E12, 54.0], [1.69719966E12, 68.79411764705884], [1.697199E12, 72.0], [1.6971993E12, 63.5], [1.69719978E12, 65.0], [1.6971996E12, 172.9444444444444]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[1.69720008E12, 0.0], [1.69720104E12, 0.0], [1.69719924E12, 60138.5], [1.69720044E12, 0.0], [1.69719954E12, 12028.8], [1.69720014E12, 0.0], [1.69720002E12, 0.0], [1.69720068E12, 0.0], [1.6971993E12, 60155.0], [1.69720056E12, 0.0], [1.69719942E12, 60146.0], [1.69720062E12, 0.0], [1.6972005E12, 0.0], [1.69719948E12, 13928.923076923078], [1.6972002E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[1.69719894E12, 4484.000000000001], [1.69719906E12, 60137.333333333336], [1.69719888E12, 421.1111111111111], [1.697199E12, 8758.038461538461], [1.69719912E12, 60139.666666666664]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[1.69719924E12, 84.0], [1.69719972E12, 72.0], [1.69719906E12, 54.0], [1.69719936E12, 105.45454545454545], [1.69719984E12, 59.5], [1.69719918E12, 47.0], [1.69719966E12, 70.97058823529412], [1.697199E12, 81.5], [1.6971993E12, 61.0], [1.69719978E12, 72.0], [1.6971996E12, 170.52777777777774]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[1.69719894E12, 3854.2156862745105], [1.69719888E12, 495.51020408163265]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[1.69719924E12, 67.33333333333333], [1.69719972E12, 71.5], [1.69719906E12, 50.0], [1.69719936E12, 110.54545454545455], [1.69719984E12, 69.75], [1.69719918E12, 68.0], [1.69719966E12, 92.20588235294116], [1.697199E12, 77.0], [1.6971993E12, 66.25], [1.69719978E12, 96.0], [1.6971996E12, 172.8888888888889]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[1.69719924E12, 59.0], [1.69719972E12, 117.5], [1.69719906E12, 63.0], [1.69719936E12, 107.72727272727273], [1.69719984E12, 76.5], [1.69719918E12, 73.0], [1.69719966E12, 62.23529411764705], [1.697199E12, 55.0], [1.6971993E12, 74.25], [1.69719978E12, 108.0], [1.6971996E12, 165.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[1.69719894E12, 43.0], [1.69719942E12, 2697.3043478260865], [1.69719924E12, 218.6], [1.69719972E12, 291578.0], [1.69719936E12, 201.44444444444446], [1.69719918E12, 78.0], [1.697199E12, 32.5], [1.69719948E12, 3729.846153846154], [1.6971993E12, 93.7], [1.69719912E12, 80.0], [1.6971996E12, 33805.8]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[1.69719924E12, 74.66666666666667], [1.69719972E12, 58.5], [1.69719906E12, 71.0], [1.69719936E12, 84.63636363636364], [1.69719984E12, 51.5], [1.69719918E12, 55.0], [1.69719966E12, 75.61764705882351], [1.697199E12, 54.5], [1.6971993E12, 61.0], [1.69719978E12, 74.0], [1.6971996E12, 321.83333333333337]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[1.69719894E12, 2389.9859154929586], [1.69719888E12, 569.5517241379309]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[1.69719924E12, 76.0], [1.69719972E12, 89.0], [1.69719906E12, 50.5], [1.69719936E12, 77.72727272727273], [1.69719984E12, 61.5], [1.69719918E12, 65.0], [1.69719966E12, 67.20588235294117], [1.697199E12, 50.5], [1.6971993E12, 58.5], [1.69719978E12, 148.0], [1.6971996E12, 192.69444444444446]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[1.69719924E12, 70.66666666666667], [1.69719972E12, 86.5], [1.69719906E12, 84.5], [1.69719936E12, 129.60000000000002], [1.69719984E12, 90229.5], [1.69719918E12, 80.0], [1.69719966E12, 82.96969696969698], [1.697199E12, 50.5], [1.69719948E12, 55097.0], [1.6971993E12, 95.4], [1.69719978E12, 9741.0], [1.6971996E12, 148.2777777777778]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[1.69719924E12, 66.0], [1.69719972E12, 114.5], [1.69719906E12, 55.5], [1.69719936E12, 74.18181818181819], [1.69719984E12, 50.75], [1.69719918E12, 60.0], [1.69719966E12, 71.1764705882353], [1.697199E12, 70.5], [1.6971993E12, 63.25], [1.69719978E12, 92.0], [1.6971996E12, 218.13888888888886]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[1.69719894E12, 3632.722222222222], [1.69719924E12, 60047.0], [1.69719906E12, 50531.96296296296], [1.69719888E12, 376.6], [1.69719918E12, 60061.555555555555], [1.697199E12, 3293.0], [1.69719912E12, 60051.565217391304]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[1.69719894E12, 12535.285714285716], [1.69719888E12, 1232.753846153846]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[1.69719894E12, 13930.333333333334], [1.69719924E12, 60215.0], [1.69719906E12, 60046.666666666664], [1.69719888E12, 1760.5], [1.69719918E12, 60198.78260869565], [1.697199E12, 49019.6], [1.6971993E12, 60149.55555555556], [1.69719912E12, 60088.074074074066]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[1.69720008E12, 0.0], [1.69720074E12, 0.0], [1.69719924E12, 143.0], [1.69719954E12, 0.0], [1.69720014E12, 0.0], [1.69720068E12, 0.0], [1.6971993E12, 150.5], [1.69720056E12, 0.0], [1.69719942E12, 181.0], [1.69720026E12, 0.0], [1.69720062E12, 0.0], [1.6972005E12, 0.0], [1.69719948E12, 24.0], [1.6972002E12, 0.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[1.69719894E12, 6673.898550724637], [1.69719888E12, 1153.258064516129]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[1.69719894E12, 12210.444444444443], [1.69719906E12, 60070.15384615385], [1.69719888E12, 831.4], [1.69719918E12, 60143.666666666664], [1.697199E12, 59712.393939393936], [1.69719912E12, 60144.11111111111]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[1.69719894E12, 228.75], [1.69719942E12, 76.33333333333331], [1.69719924E12, 70.33333333333333], [1.69719906E12, 54.666666666666664], [1.69719936E12, 105.21739130434784], [1.69719918E12, 82.0], [1.697199E12, 49.0], [1.69719948E12, 26.555555555555554], [1.6971993E12, 78.11111111111111], [1.69719912E12, 75.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[1.6971999E12, 97363.0], [1.69720104E12, 0.0], [1.69719924E12, 60143.0], [1.69719984E12, 113052.5], [1.69720032E12, 0.0], [1.69719966E12, 61185.67741935483], [1.6971993E12, 60140.0], [1.69719942E12, 61026.90909090909], [1.69719972E12, 64523.18518518518], [1.69719906E12, 60139.0], [1.69719936E12, 60136.75], [1.69719978E12, 108518.16666666666], [1.69719912E12, 60145.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[1.69719894E12, 9263.510638297874], [1.69719906E12, 60184.11111111112], [1.69719888E12, 1273.5833333333333], [1.697199E12, 54772.81250000001]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[1.69719894E12, 174.5], [1.69719942E12, 83.44444444444443], [1.69719924E12, 85.88888888888889], [1.69719906E12, 56.0], [1.69719936E12, 138.30434782608697], [1.69719918E12, 83.2], [1.697199E12, 49.0], [1.69719948E12, 26.666666666666668], [1.6971993E12, 90.25925925925927], [1.69719912E12, 115.8]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[1.69719888E12, 671.81]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[1.69719894E12, 98.5], [1.69719942E12, 117.8888888888889], [1.69719924E12, 113.88888888888889], [1.69719906E12, 86.33333333333333], [1.69719936E12, 126.30434782608694], [1.69719918E12, 342.3], [1.697199E12, 93.0], [1.69719948E12, 26.77777777777778], [1.6971993E12, 103.33333333333331], [1.69719912E12, 107.6]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[1.69719894E12, 90.0], [1.69719942E12, 198.77777777777774], [1.69719924E12, 53.22222222222222], [1.69719906E12, 55.333333333333336], [1.69719936E12, 79.91304347826087], [1.69719918E12, 130.4], [1.697199E12, 73.0], [1.69719948E12, 18.444444444444443], [1.6971993E12, 61.666666666666664], [1.69719912E12, 56.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[1.69719894E12, 150.25], [1.69719942E12, 58.666666666666664], [1.69719924E12, 72.11111111111111], [1.69719906E12, 60.0], [1.69719936E12, 167.86956521739134], [1.69719918E12, 179.79999999999998], [1.697199E12, 54.0], [1.69719948E12, 52.1111111111111], [1.6971993E12, 99.29629629629629], [1.69719912E12, 67.2]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[1.69719942E12, 325.7777777777778], [1.69719924E12, 80.66666666666667], [1.69719972E12, 268.0], [1.69719906E12, 48.0], [1.69719936E12, 91.30000000000001], [1.69719984E12, 121.5], [1.69719918E12, 124.0], [1.69719966E12, 76.63636363636364], [1.697199E12, 45.5], [1.6971993E12, 99.0], [1.6971996E12, 169.00000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[1.69719894E12, 10407.368421052632], [1.69719888E12, 1069.8], [1.697199E12, 53493.333333333336]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[1.69719942E12, 69.0], [1.69719924E12, 67.0], [1.69719972E12, 60.5], [1.69719906E12, 90.5], [1.69719936E12, 140.7], [1.69719984E12, 64.33333333333333], [1.69719918E12, 60.0], [1.69719966E12, 75.96969696969697], [1.697199E12, 41.5], [1.69719948E12, 46812.666666666664], [1.6971993E12, 100.2], [1.6971996E12, 4790.799999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[1.69719942E12, 4098.888888888889], [1.69719924E12, 144.33333333333334], [1.69719972E12, 9692.0], [1.69719906E12, 145.5], [1.69719936E12, 160.6], [1.69719984E12, 729.0], [1.69719918E12, 125.0], [1.69719966E12, 3.484848484848485], [1.697199E12, 108.5], [1.69719948E12, 0.0], [1.6971993E12, 120.6], [1.6971996E12, 62711.32258064517]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[1.69719888E12, 133.06]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[1.69719888E12, 288.44999999999993]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[1.69719888E12, 457.69999999999993]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[1.69719888E12, 259.79]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[1.69719888E12, 311.23]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[1.69720008E12, 0.0], [1.6971999E12, 44523.294117647056], [1.69720104E12, 0.0], [1.69720044E12, 0.0], [1.69719984E12, 50047.0], [1.69720002E12, 0.0], [1.6971993E12, 158.0], [1.69720038E12, 0.0], [1.69720056E12, 0.0], [1.69719942E12, 330.75], [1.69719996E12, 95057.0], [1.69719936E12, 469.33333333333337], [1.69719918E12, 152.5], [1.6972005E12, 0.0], [1.69719948E12, 53.0], [1.69719978E12, 3922.6111111111104], [1.69719912E12, 167.0]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[1.69719888E12, 284.1300000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[1.69719888E12, 299.09000000000015]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[1.69719888E12, 261.8099999999999]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[1.69719894E12, 6956.25], [1.69719942E12, 60212.11111111111], [1.69719924E12, 60057.555555555555], [1.69719906E12, 60047.666666666664], [1.69719936E12, 60048.47826086957], [1.69719918E12, 60184.5], [1.697199E12, 60050.0], [1.69719948E12, 60057.77777777778], [1.6971993E12, 60056.59259259259], [1.69719912E12, 60049.2]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[1.69719894E12, 12289.142857142857], [1.69719924E12, 60259.34782608695], [1.69719906E12, 60168.600000000006], [1.69719888E12, 1423.0], [1.69719936E12, 60172.555555555555], [1.69719918E12, 60174.25925925926], [1.697199E12, 54030.6], [1.6971993E12, 60143.22222222222], [1.69719912E12, 60148.88888888889]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[1.69719888E12, 262.9499999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[1.69719894E12, 7210.2], [1.69719942E12, 60417.33333333334], [1.69719924E12, 60182.51851851852], [1.69719906E12, 60168.6], [1.69719936E12, 60169.0], [1.69719918E12, 60268.222222222226], [1.697199E12, 51461.666666666664], [1.6971993E12, 60166.95652173913], [1.69719912E12, 60146.6]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[1.69719888E12, 346.8300000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[1.69719888E12, 313.86999999999983]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[1.69719942E12, 86.8], [1.69719924E12, 58.0], [1.69719972E12, 84.0], [1.69719906E12, 68.5], [1.69719936E12, 146.8], [1.69719984E12, 64.0], [1.69719918E12, 46.0], [1.69719966E12, 67.87878787878788], [1.697199E12, 48.0], [1.69719948E12, 42553.0], [1.6971993E12, 52.6], [1.6971996E12, 145.53124999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[1.6971999E12, 63200.0], [1.69720104E12, 72343.8], [1.69719924E12, 73.0], [1.69720044E12, 0.0], [1.69719984E12, 37624.0], [1.69720032E12, 0.0], [1.69719966E12, 96.36363636363636], [1.6971993E12, 106.66666666666667], [1.69719942E12, 667.1818181818181], [1.69719972E12, 9728.0], [1.69719996E12, 70347.5], [1.69719906E12, 148.0], [1.69719936E12, 157.25], [1.69719978E12, 8263.114285714282], [1.69719912E12, 74.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[1.69719894E12, 7498.25], [1.69719942E12, 60548.17391304348], [1.69719924E12, 60064.0], [1.69719906E12, 60042.0], [1.69719954E12, 60057.333333333336], [1.69719936E12, 60054.37037037036], [1.69719918E12, 60058.6], [1.69719948E12, 36030.0], [1.6971993E12, 60054.444444444445], [1.69719912E12, 60049.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[1.6971999E12, 119427.0], [1.69720104E12, 0.0], [1.69719924E12, 302.0], [1.69719984E12, 108228.55555555556], [1.69719966E12, 1778.111111111111], [1.6971993E12, 192.33333333333334], [1.69720038E12, 0.0], [1.69719942E12, 1317.4545454545455], [1.69719972E12, 33464.583333333336], [1.69719906E12, 308.5], [1.69719936E12, 251.75], [1.69719978E12, 36995.32142857142], [1.69719912E12, 191.5]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[1.69719984E12, 76021.38888888888], [1.69720032E12, 0.0], [1.69720002E12, 0.0], [1.6971993E12, 60042.0], [1.69720038E12, 0.0], [1.69719942E12, 61140.0], [1.69719996E12, 130407.0], [1.69719936E12, 60058.333333333336], [1.69719918E12, 60045.0], [1.6972005E12, 0.0], [1.69719948E12, 60063.090909090904], [1.69719978E12, 80702.26315789473], [1.69719912E12, 60054.5]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[1.69719888E12, 156.27000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[1.69719894E12, 100.0], [1.69719906E12, 197.65384615384613], [1.69719888E12, 224.8], [1.69719918E12, 188.0], [1.697199E12, 205.030303030303], [1.69719912E12, 203.55555555555554]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[1.69719942E12, 61264.99999999999], [1.69719924E12, 60830.333333333336], [1.69719906E12, 60136.0], [1.69719954E12, 60158.8888888889], [1.69719936E12, 60155.899999999994], [1.69719984E12, 121051.0], [1.69719918E12, 60139.0], [1.69719966E12, 60430.0], [1.697199E12, 60073.0], [1.69719948E12, 31454.681818181798], [1.6971993E12, 60220.2], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[1.69719894E12, 10161.5], [1.69719942E12, 60832.85185185186], [1.69719924E12, 60342.4], [1.69719954E12, 0.0], [1.69719936E12, 60186.77777777778], [1.69719918E12, 60191.0], [1.697199E12, 51863.0], [1.69719948E12, 37694.60526315791], [1.6971993E12, 60164.49999999999], [1.69719912E12, 60141.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[1.69719888E12, 1951.4600000000003]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[1.69719942E12, 1861.4444444444443], [1.69719924E12, 53.666666666666664], [1.69719972E12, 329.0], [1.69719906E12, 50.0], [1.69719936E12, 99.5], [1.69719984E12, 4895.5], [1.69719918E12, 104.0], [1.69719966E12, 113.1818181818182], [1.697199E12, 47.5], [1.6971993E12, 51.8], [1.6971996E12, 985.6451612903224]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[1.69720008E12, 0.0], [1.69720104E12, 0.0], [1.69719924E12, 60043.5], [1.69720044E12, 0.0], [1.69719954E12, 60057.0], [1.69720014E12, 0.0], [1.69719984E12, 72539.72222222222], [1.69720002E12, 0.0], [1.69720038E12, 0.0], [1.69720056E12, 0.0], [1.69719942E12, 61301.666666666664], [1.69719996E12, 24929.750000000004], [1.69720062E12, 0.0], [1.69719936E12, 60048.0], [1.69719918E12, 60047.0], [1.6972005E12, 0.0], [1.69719948E12, 16378.272727272726]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[1.69719894E12, 118.2], [1.69719942E12, 3069.222222222222], [1.69719924E12, 106.92592592592594], [1.69719906E12, 92.4], [1.69719936E12, 93.55555555555556], [1.69719918E12, 155.88888888888889], [1.697199E12, 113.66666666666667], [1.6971993E12, 99.69565217391303], [1.69719912E12, 93.8]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[1.69719924E12, 79.0], [1.69720044E12, 0.0], [1.69719954E12, 0.0], [1.69720032E12, 0.0], [1.69720098E12, 0.0], [1.69720068E12, 0.0], [1.6971993E12, 47.0], [1.69720038E12, 0.0], [1.69719942E12, 60.0], [1.69720026E12, 0.0], [1.69720092E12, 0.0], [1.6972008E12, 0.0], [1.69719948E12, 7.384615384615384], [1.69720086E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[1.69719942E12, 139.25000000000003], [1.69719924E12, 90.33333333333333], [1.69719972E12, 490.0], [1.69719906E12, 54.5], [1.69719936E12, 91.4], [1.69719984E12, 58.0], [1.69719918E12, 79.0], [1.69719966E12, 76.84848484848484], [1.697199E12, 53.0], [1.69719948E12, 40234.0], [1.6971993E12, 75.2], [1.6971996E12, 260.8709677419356]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[1.69719888E12, 415.18000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[1.69719888E12, 152.71999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[1.69719888E12, 331.54]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[1.69719888E12, 379.74999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69720104E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69719888E12, "maxY": 455446.0, "series": [{"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-69", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 339.2222222222222], [1.69719924E12, 104.33333333333333], [1.69719906E12, 95.0], [1.69719936E12, 109.26086956521738], [1.69719918E12, 280.3], [1.697199E12, 85.0], [1.69719948E12, 34.77777777777778], [1.6971993E12, 105.92592592592592], [1.69719912E12, 108.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-68", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.1111111111111111], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-67", "isController": false}, {"data": [[1.69720074E12, 62017.333333333336], [1.69719924E12, 0.0], [1.69719954E12, 0.0], [1.69720032E12, 62035.0], [1.69720068E12, 62009.0], [1.6971993E12, 0.0], [1.69720038E12, 65174.0], [1.69719942E12, 0.0], [1.69720026E12, 62066.28571428572], [1.69720092E12, 62075.0], [1.69720062E12, 62081.0], [1.6972008E12, 62032.0], [1.69719948E12, 0.15384615384615385], [1.6972002E12, 62039.0], [1.69720086E12, 62045.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109", "isController": false}, {"data": [[1.69720074E12, 62031.0], [1.69719924E12, 0.0], [1.69719954E12, 0.0], [1.69720014E12, 62071.25], [1.69720032E12, 62041.0], [1.69720068E12, 62036.0], [1.6971993E12, 0.0], [1.69720056E12, 62051.5], [1.69719942E12, 0.0], [1.69720026E12, 62057.0], [1.69720062E12, 62027.0], [1.6972008E12, 62032.0], [1.69719948E12, 0.0], [1.6972002E12, 62042.0], [1.69720086E12, 62081.0]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 2682.8888888888887], [1.69719924E12, 102.81481481481481], [1.69719906E12, 108.8], [1.69719936E12, 103.11111111111111], [1.69719918E12, 174.88888888888889], [1.697199E12, 145.66666666666666], [1.6971993E12, 107.3913043478261], [1.69719912E12, 95.7]], "isOverall": false, "label": "Tenders_Page/_next/image/-64", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-63", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-62", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 81.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 10.666666666666668], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 6761.7941176470595]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88", "isController": false}, {"data": [[1.69720008E12, 251.0], [1.6971999E12, 75.94117647058825], [1.69720044E12, 237.0], [1.69719984E12, 574.0], [1.69720002E12, 3123.0], [1.6971993E12, 37.0], [1.69720038E12, 115.0], [1.69720056E12, 45.5], [1.69719942E12, 1091.0], [1.69719996E12, 80.75], [1.69719936E12, 82.33333333333333], [1.69719918E12, 47.0], [1.6972005E12, 45.5], [1.69719948E12, 7573.166666666667], [1.69719978E12, 329.50000000000006], [1.69719912E12, 33.0]], "isOverall": false, "label": "Tenders_Page/tr/-104", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 2.4117647058823524], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719978E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719978E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95", "isController": false}, {"data": [[1.69720008E12, 62028.75], [1.69720104E12, 30708.61111111111], [1.69719924E12, 92.5], [1.69720044E12, 62035.0], [1.69719954E12, 3720.0], [1.69720014E12, 62044.0], [1.69720002E12, 62059.25], [1.69720068E12, 62060.0], [1.6971993E12, 94.5], [1.69720056E12, 62031.666666666664], [1.69719942E12, 96.0], [1.69720062E12, 62039.5], [1.6972005E12, 62071.0], [1.69719948E12, 65.53846153846153], [1.6972002E12, 62039.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719906E12, 91.77777777777777], [1.69719888E12, 0.0], [1.697199E12, 115.69230769230771], [1.69719912E12, 92.55555555555556]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719978E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 9.25], [1.69719918E12, 0.0], [1.69719966E12, 10.38235294117647], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719978E12, 39.0], [1.6971996E12, 1.0555555555555558]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719978E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 2298.608695652174], [1.69719924E12, 132.2], [1.69719972E12, 75950.0], [1.69719936E12, 131.77777777777777], [1.69719918E12, 44.666666666666664], [1.697199E12, 16.5], [1.69719948E12, 3720.461538461538], [1.6971993E12, 59.800000000000004], [1.69719912E12, 64.0], [1.6971996E12, 63841.4]], "isOverall": false, "label": "Tenders_Page/tr/-77", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719978E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719978E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.69719978E12, 278.0], [1.6971996E12, 2992.3333333333335]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.69719978E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719888E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719924E12, 107.44444444444444], [1.69719906E12, 0.0], [1.69719888E12, 0.0], [1.69719918E12, 102.17391304347824], [1.697199E12, 0.0], [1.6971993E12, 101.33333333333333], [1.69719912E12, 38.74074074074073]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58", "isController": false}, {"data": [[1.69720008E12, 62437.0], [1.69720074E12, 62061.5], [1.69719924E12, 93.5], [1.69719954E12, 2214.8], [1.69720014E12, 62022.25], [1.69720068E12, 62044.5], [1.6971993E12, 104.0], [1.69720056E12, 62025.0], [1.69719942E12, 132.0], [1.69720026E12, 62042.0], [1.69720062E12, 62046.0], [1.6972005E12, 62039.0], [1.69719948E12, 15.461538461538462], [1.6972002E12, 62030.0]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719906E12, 10.615384615384619], [1.69719888E12, 0.0], [1.69719918E12, 97.33333333333333], [1.697199E12, 0.0], [1.69719912E12, 95.77777777777777]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-74", "isController": false}, {"data": [[1.6971999E12, 16447.0], [1.69720104E12, 35463.333333333336], [1.69719924E12, 96.0], [1.69719984E12, 33716.5], [1.69720032E12, 87257.0], [1.69719966E12, 124.3225806451613], [1.6971993E12, 88.33333333333333], [1.69719942E12, 121.72727272727273], [1.69719972E12, 445.77777777777766], [1.69719906E12, 94.5], [1.69719936E12, 92.5], [1.69719978E12, 95.75], [1.69719912E12, 96.5]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719906E12, 133.44444444444446], [1.69719888E12, 0.0], [1.697199E12, 5.6875]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-73", "isController": false}, {"data": [[1.69719888E12, 478.66999999999996]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-72", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.11111111111111113], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-71", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-70", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 37.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719888E12, 0.0], [1.697199E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 4.114285714285714]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89", "isController": false}, {"data": [[1.69719942E12, 3197.6666666666665], [1.69719924E12, 51.666666666666664], [1.69719972E12, 260.0], [1.69719906E12, 38.5], [1.69719936E12, 73.19999999999999], [1.69719984E12, 541.0], [1.69719918E12, 56.0], [1.69719966E12, 162993.75757575757], [1.697199E12, 42.0], [1.69719948E12, 39993.0], [1.6971993E12, 39.4], [1.6971996E12, 78080.74193548388]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37", "isController": false}, {"data": [[1.69720008E12, 62036.0], [1.6971999E12, 30826.823529411773], [1.69720104E12, 30748.999999999996], [1.69720044E12, 62041.666666666664], [1.69719984E12, 19926.0], [1.69720002E12, 62036.0], [1.6971993E12, 98.0], [1.69720038E12, 62041.0], [1.69720056E12, 62044.5], [1.69719942E12, 231.5], [1.69719996E12, 30786.75], [1.69719936E12, 219.0], [1.69719918E12, 98.5], [1.6972005E12, 62066.0], [1.69719948E12, 34.54545454545455], [1.69719978E12, 1203.4999999999998], [1.69719912E12, 109.5]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-43", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-42", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719924E12, 205.43478260869563], [1.69719906E12, 120.8], [1.69719888E12, 0.0], [1.69719936E12, 121.77777777777777], [1.69719918E12, 99.44444444444444], [1.697199E12, 21.0], [1.6971993E12, 94.44444444444444], [1.69719912E12, 98.55555555555557]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 100.88888888888889], [1.69719924E12, 130.14814814814812], [1.69719906E12, 112.6], [1.69719936E12, 115.55555555555556], [1.69719918E12, 98.22222222222223], [1.697199E12, 0.0], [1.6971993E12, 115.99999999999999], [1.69719912E12, 96.9]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 1.125]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87", "isController": false}, {"data": [[1.6971999E12, 30317.75], [1.69720104E12, 20862.0], [1.69719924E12, 0.0], [1.69720044E12, 62072.5], [1.69719984E12, 0.0], [1.69720032E12, 445309.5], [1.69719966E12, 0.0], [1.6971993E12, 0.0], [1.69719942E12, 0.0], [1.69719972E12, 0.0], [1.69719996E12, 30971.5], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719978E12, 460.1714285714285], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-101", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719906E12, 0.0], [1.69719954E12, 0.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76", "isController": false}, {"data": [[1.6971999E12, 34710.5], [1.69720104E12, 36748.666666666664], [1.69719924E12, 209.0], [1.69719984E12, 38480.0], [1.69719966E12, 164.27777777777777], [1.6971993E12, 90.66666666666667], [1.69720038E12, 70807.5], [1.69719942E12, 315.0], [1.69719972E12, 13733.666666666668], [1.69719906E12, 108.5], [1.69719936E12, 131.75], [1.69719978E12, 17524.07142857143], [1.69719912E12, 99.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-100", "isController": false}, {"data": [[1.69719984E12, 1425.1666666666667], [1.69720032E12, 455446.0], [1.69720002E12, 62076.0], [1.6971993E12, 0.0], [1.69720038E12, 72311.2], [1.69719942E12, 0.0], [1.69719996E12, 30518.0], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.6972005E12, 62036.0], [1.69719948E12, 0.0], [1.69719978E12, 0.0], [1.69719912E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719906E12, 97.0], [1.69719888E12, 0.0], [1.69719918E12, 92.44444444444444], [1.697199E12, 101.8181818181818], [1.69719912E12, 94.66666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-57", "isController": false}, {"data": [[1.69719942E12, 313.0], [1.69719924E12, 722.0], [1.69719906E12, 93.0], [1.69719954E12, 101.22222222222221], [1.69719936E12, 102.8], [1.69719984E12, 41244.0], [1.69719918E12, 94.0], [1.69719966E12, 379.0], [1.697199E12, 0.0], [1.69719948E12, 60.772727272727266], [1.6971993E12, 130.8], [1.6971996E12, 0.75]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78", "isController": false}, {"data": [[1.69719894E12, 0.0], [1.69719942E12, 114.25925925925927], [1.69719924E12, 292.0], [1.69719954E12, 3812.666666666667], [1.69719936E12, 129.55555555555554], [1.69719918E12, 90.66666666666667], [1.697199E12, 0.0], [1.69719948E12, 1342.8157894736842], [1.6971993E12, 108.4], [1.69719912E12, 90.0]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75", "isController": false}, {"data": [[1.69719888E12, 558.6299999999999]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 90.5], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 132.0], [1.69719918E12, 0.0], [1.69719966E12, 40.272727272727266], [1.697199E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 359.6774193548386]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82", "isController": false}, {"data": [[1.69720008E12, 62040.0], [1.69720104E12, 0.0], [1.69719924E12, 0.0], [1.69720044E12, 62035.0], [1.69719954E12, 0.0], [1.69720014E12, 62027.5], [1.69719984E12, 0.0], [1.69720002E12, 62050.25], [1.69720038E12, 454955.0], [1.69720056E12, 62042.0], [1.69719942E12, 0.0], [1.69719996E12, 46529.25], [1.69720062E12, 62027.5], [1.69719936E12, 0.0], [1.69719918E12, 0.0], [1.6972005E12, 62026.666666666664], [1.69719948E12, 0.0]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105", "isController": false}, {"data": [[1.69719894E12, 89.6], [1.69719942E12, 2895.6666666666665], [1.69719924E12, 83.5925925925926], [1.69719906E12, 71.0], [1.69719936E12, 68.22222222222221], [1.69719918E12, 115.11111111111111], [1.697199E12, 92.33333333333333], [1.6971993E12, 74.4782608695652], [1.69719912E12, 74.5]], "isOverall": false, "label": "Tenders_Page/tr/-65", "isController": false}, {"data": [[1.69719924E12, 0.0], [1.69720044E12, 62045.5], [1.69719954E12, 0.0], [1.69720032E12, 62054.85714285714], [1.69720098E12, 62077.0], [1.69720068E12, 62021.0], [1.6971993E12, 0.0], [1.69720038E12, 63091.0], [1.69719942E12, 0.0], [1.69720026E12, 62033.0], [1.69720092E12, 62029.0], [1.6972008E12, 62041.0], [1.69719948E12, 0.0], [1.69720086E12, 62035.0]], "isOverall": false, "label": "Tenders_Page/_next/image/-110", "isController": false}, {"data": [[1.69719942E12, 0.0], [1.69719924E12, 0.0], [1.69719972E12, 0.0], [1.69719906E12, 0.0], [1.69719936E12, 0.0], [1.69719984E12, 0.0], [1.69719918E12, 0.0], [1.69719966E12, 0.0], [1.697199E12, 0.0], [1.69719948E12, 0.0], [1.6971993E12, 0.0], [1.6971996E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81", "isController": false}, {"data": [[1.69719888E12, 270.38]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39", "isController": false}, {"data": [[1.69719888E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69720104E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 17.0, "minX": 1.69719888E12, "maxY": 360757.0, "series": [{"data": [[1.69720008E12, 545.0], [1.69719894E12, 39122.0], [1.6971999E12, 168536.0], [1.69719924E12, 757.0], [1.69720044E12, 378.0], [1.69719888E12, 3535.0], [1.69719984E12, 360757.0], [1.69719966E12, 131865.0], [1.69720002E12, 5381.0], [1.697199E12, 59524.0], [1.6971993E12, 633.0], [1.69720038E12, 163.0], [1.6971996E12, 188922.0], [1.69720056E12, 74.0], [1.69719942E12, 25247.0], [1.69719972E12, 291578.0], [1.69719996E12, 110355.0], [1.69719906E12, 54789.0], [1.69719936E12, 881.0], [1.69719918E12, 1412.0], [1.6972005E12, 76.0], [1.69719948E12, 79979.0], [1.69719978E12, 268038.0], [1.69719912E12, 446.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69720008E12, 545.0], [1.69719894E12, 13361.0], [1.6971999E12, 76579.60000000002], [1.69719924E12, 315.20000000000005], [1.69720044E12, 378.0], [1.69719888E12, 1177.4000000000005], [1.69719984E12, 110119.20000000017], [1.69719966E12, 138.39999999999998], [1.69720002E12, 5381.0], [1.697199E12, 52073.8], [1.6971993E12, 256.2000000000001], [1.69720038E12, 163.0], [1.6971996E12, 729.2000000000003], [1.69720056E12, 74.0], [1.69719942E12, 3955.0], [1.69719972E12, 39336.4], [1.69719996E12, 110355.0], [1.69719906E12, 38932.50000000001], [1.69719936E12, 286.20000000000005], [1.69719918E12, 614.4000000000001], [1.6972005E12, 76.0], [1.69719948E12, 55205.1], [1.69719978E12, 60794.200000000004], [1.69719912E12, 271.6]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69720008E12, 545.0], [1.69719894E12, 21390.0], [1.6971999E12, 168536.0], [1.69719924E12, 696.0], [1.69720044E12, 378.0], [1.69719888E12, 2750.8100000000027], [1.69719984E12, 360757.0], [1.69719966E12, 4124.540000000003], [1.69720002E12, 5381.0], [1.697199E12, 56618.01999999997], [1.6971993E12, 512.3200000000002], [1.69720038E12, 163.0], [1.6971996E12, 124772.93], [1.69720056E12, 74.0], [1.69719942E12, 21580.399999999863], [1.69719972E12, 291578.0], [1.69719996E12, 110355.0], [1.69719906E12, 53675.47999999999], [1.69719936E12, 685.8699999999997], [1.69719918E12, 1271.7500000000025], [1.6972005E12, 76.0], [1.69719948E12, 79979.0], [1.69719978E12, 268038.0], [1.69719912E12, 446.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69720008E12, 545.0], [1.69719894E12, 14088.199999999999], [1.6971999E12, 150979.59999999974], [1.69719924E12, 413.4], [1.69720044E12, 378.0], [1.69719888E12, 1790.0499999999984], [1.69719984E12, 195159.59999999945], [1.69719966E12, 186.39999999999986], [1.69720002E12, 5381.0], [1.697199E12, 54055.5], [1.6971993E12, 350.49999999999994], [1.69720038E12, 163.0], [1.6971996E12, 3833.1499999999987], [1.69720056E12, 74.0], [1.69719942E12, 5943.599999999997], [1.69719972E12, 193774.19999999902], [1.69719996E12, 110355.0], [1.69719906E12, 48451.09999999999], [1.69719936E12, 346.39999999999964], [1.69719918E12, 914.549999999999], [1.6972005E12, 76.0], [1.69719948E12, 74666.09999999998], [1.69719978E12, 86253.2], [1.69719912E12, 307.9499999999999]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69720008E12, 77.0], [1.69719894E12, 40.0], [1.6971999E12, 65.0], [1.69719924E12, 43.0], [1.69720044E12, 248.0], [1.69719888E12, 44.0], [1.69719984E12, 42.0], [1.69719966E12, 37.0], [1.69720002E12, 5381.0], [1.697199E12, 17.0], [1.6971993E12, 40.0], [1.69720038E12, 163.0], [1.6971996E12, 39.0], [1.69720056E12, 46.0], [1.69719942E12, 47.0], [1.69719972E12, 48.0], [1.69719996E12, 71.0], [1.69719906E12, 41.0], [1.69719936E12, 38.0], [1.69719918E12, 46.0], [1.6972005E12, 48.0], [1.69719948E12, 44.0], [1.69719978E12, 55.0], [1.69719912E12, 45.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69720008E12, 311.0], [1.69719894E12, 4413.0], [1.6971999E12, 102.0], [1.69719924E12, 81.0], [1.69720044E12, 346.0], [1.69719888E12, 364.0], [1.69719984E12, 67.0], [1.69719966E12, 71.0], [1.69720002E12, 5381.0], [1.697199E12, 272.0], [1.6971993E12, 94.0], [1.69720038E12, 163.0], [1.6971996E12, 174.5], [1.69720056E12, 60.0], [1.69719942E12, 232.0], [1.69719972E12, 189.5], [1.69719996E12, 120.0], [1.69719906E12, 106.0], [1.69719936E12, 108.0], [1.69719918E12, 149.5], [1.6972005E12, 62.0], [1.69719948E12, 142.0], [1.69719978E12, 3869.0], [1.69719912E12, 99.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69720056E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1213389.0, "series": [{"data": [[2.0, 232.0], [3.0, 200.0], [4.0, 285.0], [5.0, 142.5], [6.0, 125.5], [7.0, 104.0], [8.0, 81.0], [9.0, 94.0], [10.0, 71.0], [11.0, 92.0], [12.0, 239.0], [13.0, 80.0], [14.0, 80.0], [15.0, 79.0], [16.0, 704.0], [17.0, 90.0], [18.0, 61.0], [19.0, 92.0], [20.0, 96.5], [21.0, 6018.0], [22.0, 71.0], [23.0, 169.5], [24.0, 75.0], [25.0, 65.5], [26.0, 153.0], [27.0, 151.0], [28.0, 160.0], [29.0, 318.0], [30.0, 95.5], [31.0, 333.0], [33.0, 1231.5], [35.0, 238.0], [34.0, 99.5], [37.0, 254.0], [36.0, 120.0], [39.0, 127.0], [38.0, 428.0], [41.0, 118.0], [40.0, 146.5], [43.0, 775.0], [44.0, 75.5], [45.0, 179.0], [46.0, 123.5], [48.0, 1329.5], [49.0, 93.0], [52.0, 68.0], [54.0, 101.0], [57.0, 118194.5], [59.0, 102.0], [60.0, 156.0], [61.0, 3844.5], [62.0, 1019.0], [64.0, 114.0], [71.0, 448.0], [74.0, 116.0], [79.0, 311.0], [82.0, 74.5], [81.0, 169.0], [87.0, 133.0], [94.0, 187.0], [97.0, 173.0], [99.0, 80.0], [103.0, 109.0], [107.0, 143.0], [115.0, 275.0], [122.0, 453.5], [121.0, 445.0], [140.0, 347.0], [148.0, 366.5], [144.0, 286.0], [166.0, 432.0], [175.0, 384.0], [176.0, 524.5], [177.0, 402.0], [191.0, 423.0], [234.0, 168.0], [1.0, 15817.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 62027.5], [3.0, 60236.0], [4.0, 62030.0], [5.0, 60139.0], [6.0, 60102.5], [7.0, 60097.5], [8.0, 60052.0], [9.0, 60154.0], [10.0, 60057.0], [11.0, 60046.0], [12.0, 60054.0], [13.0, 60053.0], [14.0, 60142.0], [15.0, 0.5], [16.0, 60051.0], [17.0, 60052.5], [18.0, 60046.0], [19.0, 60224.5], [20.0, 31466.5], [21.0, 6564.0], [22.0, 60141.0], [23.0, 60147.0], [24.0, 60149.0], [25.0, 164651.0], [26.0, 60176.5], [27.0, 60165.5], [28.0, 60056.0], [29.0, 60455.5], [30.0, 60180.5], [31.0, 60179.0], [34.0, 60066.0], [35.0, 60244.0], [37.0, 60136.0], [36.0, 112953.0], [38.0, 60160.5], [39.0, 166241.0], [41.0, 60148.0], [40.0, 1496.0], [43.0, 61388.5], [44.0, 1.0], [45.0, 30348.5], [46.0, 60069.5], [49.0, 60058.5], [52.0, 167037.0], [57.0, 72899.0], [56.0, 1213389.0], [59.0, 60057.0], [60.0, 60143.5], [61.0, 61170.0], [64.0, 60143.0], [71.0, 173411.5], [74.0, 60056.0], [79.0, 60147.0], [82.0, 60050.0], [81.0, 116948.0], [87.0, 124222.0], [107.0, 107668.0], [152.0, 0.0], [1.0, 60219.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 234.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 118194.5, "series": [{"data": [[2.0, 188.5], [3.0, 187.0], [4.0, 206.0], [5.0, 108.0], [6.0, 114.5], [7.0, 95.0], [8.0, 75.0], [9.0, 90.0], [10.0, 63.0], [11.0, 79.5], [12.0, 187.0], [13.0, 70.0], [14.0, 71.0], [15.0, 79.0], [16.0, 698.0], [17.0, 68.0], [18.0, 54.0], [19.0, 92.0], [20.0, 96.5], [21.0, 3735.0], [22.0, 57.0], [23.0, 111.5], [24.0, 69.5], [25.0, 60.5], [26.0, 124.5], [27.0, 134.0], [28.0, 108.0], [29.0, 318.0], [30.0, 91.5], [31.0, 222.5], [33.0, 1228.0], [35.0, 187.5], [34.0, 94.0], [37.0, 138.0], [36.0, 94.0], [39.0, 99.0], [38.0, 290.0], [41.0, 110.5], [40.0, 122.0], [43.0, 452.0], [44.0, 75.5], [45.0, 177.0], [46.0, 107.5], [48.0, 1329.0], [49.0, 75.0], [52.0, 67.0], [54.0, 95.0], [57.0, 118194.5], [59.0, 99.0], [60.0, 144.0], [61.0, 3811.0], [62.0, 1018.5], [64.0, 100.0], [71.0, 391.5], [74.0, 111.0], [79.0, 194.0], [82.0, 72.5], [81.0, 142.5], [87.0, 119.0], [94.0, 149.5], [97.0, 139.0], [99.0, 80.0], [103.0, 107.0], [107.0, 126.0], [115.0, 214.0], [122.0, 353.5], [121.0, 375.0], [140.0, 316.5], [148.0, 262.5], [144.0, 261.5], [166.0, 320.5], [175.0, 312.0], [176.0, 358.0], [177.0, 312.0], [191.0, 248.0], [234.0, 163.5], [1.0, 10395.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 0.0], [3.0, 60060.0], [4.0, 0.0], [5.0, 60095.0], [6.0, 60067.0], [7.0, 60052.0], [8.0, 60052.0], [9.0, 60154.0], [10.0, 60049.0], [11.0, 156.0], [12.0, 60054.0], [13.0, 60046.5], [14.0, 60135.0], [15.0, 0.0], [16.0, 60051.0], [17.0, 60052.5], [18.0, 60046.0], [19.0, 60224.5], [20.0, 31466.5], [21.0, 6564.0], [22.0, 60141.0], [23.0, 60147.0], [24.0, 60146.5], [25.0, 0.0], [26.0, 60176.5], [27.0, 60153.5], [28.0, 60056.0], [29.0, 60455.5], [30.0, 60179.0], [31.0, 60179.0], [34.0, 60066.0], [35.0, 60244.0], [37.0, 60136.0], [36.0, 0.0], [38.0, 60160.5], [39.0, 0.0], [41.0, 60148.0], [40.0, 1496.0], [43.0, 61388.5], [44.0, 0.0], [45.0, 30348.5], [46.0, 60069.5], [49.0, 60058.5], [52.0, 0.0], [57.0, 72899.0], [56.0, 0.0], [59.0, 60057.0], [60.0, 60143.5], [61.0, 61170.0], [64.0, 60143.0], [71.0, 0.0], [74.0, 60056.0], [79.0, 60146.0], [82.0, 60050.0], [81.0, 0.0], [87.0, 0.0], [107.0, 0.0], [152.0, 0.0], [1.0, 60046.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 234.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69719888E12, "maxY": 38.833333333333336, "series": [{"data": [[1.69719894E12, 8.916666666666666], [1.69720074E12, 0.11666666666666667], [1.69719924E12, 5.883333333333334], [1.69720044E12, 0.18333333333333332], [1.69719954E12, 0.8], [1.69720014E12, 0.18333333333333332], [1.69719984E12, 2.183333333333333], [1.69720032E12, 0.11666666666666667], [1.69719966E12, 12.15], [1.69720002E12, 0.2], [1.69720056E12, 0.2], [1.69719942E12, 5.566666666666666], [1.69720026E12, 0.16666666666666666], [1.69719972E12, 1.4833333333333334], [1.69719996E12, 0.25], [1.69720086E12, 0.03333333333333333], [1.69719912E12, 3.3], [1.69720008E12, 0.21666666666666667], [1.6971999E12, 0.6833333333333333], [1.69719888E12, 38.833333333333336], [1.697199E12, 3.783333333333333], [1.69720068E12, 0.13333333333333333], [1.6971993E12, 8.7], [1.69720038E12, 0.21666666666666667], [1.6971996E12, 11.383333333333333], [1.69720092E12, 0.016666666666666666], [1.69719906E12, 3.6166666666666667], [1.69720062E12, 0.16666666666666666], [1.69719936E12, 9.1], [1.6972008E12, 0.05], [1.69719918E12, 4.2], [1.6972005E12, 0.2], [1.69719948E12, 5.433333333333334], [1.6972002E12, 0.13333333333333333], [1.69719978E12, 2.316666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69720092E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69719888E12, "maxY": 37.166666666666664, "series": [{"data": [[1.69720104E12, 0.9333333333333333], [1.69719966E12, 0.5333333333333333], [1.69719948E12, 0.016666666666666666], [1.6971996E12, 0.11666666666666667]], "isOverall": false, "label": "Non HTTP response code: javax.net.ssl.SSLException", "isController": false}, {"data": [[1.69720008E12, 0.03333333333333333], [1.69719894E12, 8.916666666666666], [1.6971999E12, 0.38333333333333336], [1.69719924E12, 4.25], [1.69720044E12, 0.05], [1.69719888E12, 37.166666666666664], [1.69719984E12, 1.2166666666666666], [1.69719966E12, 11.083333333333334], [1.69720002E12, 0.016666666666666666], [1.697199E12, 2.8833333333333333], [1.6971993E12, 7.083333333333333], [1.69720038E12, 0.016666666666666666], [1.6971996E12, 11.133333333333333], [1.69720056E12, 0.03333333333333333], [1.69719942E12, 3.9166666666666665], [1.69719972E12, 1.0333333333333334], [1.69719996E12, 0.1], [1.69719906E12, 2.1666666666666665], [1.69719936E12, 7.466666666666667], [1.69719918E12, 2.5], [1.6972005E12, 0.03333333333333333], [1.69719948E12, 0.7666666666666667], [1.69719978E12, 1.5], [1.69719912E12, 1.6]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69720032E12, 0.016666666666666666], [1.69720038E12, 0.06666666666666667]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketTimeoutException", "isController": false}, {"data": [[1.69720008E12, 0.18333333333333332], [1.69720074E12, 0.11666666666666667], [1.69720044E12, 0.16666666666666666], [1.69720014E12, 0.18333333333333332], [1.69720032E12, 0.16666666666666666], [1.69720002E12, 0.18333333333333332], [1.69720098E12, 0.016666666666666666], [1.69720068E12, 0.16666666666666666], [1.69720038E12, 0.11666666666666667], [1.6971996E12, 0.06666666666666667], [1.69720056E12, 0.16666666666666666], [1.69720026E12, 0.18333333333333332], [1.69719996E12, 0.05], [1.69720092E12, 0.03333333333333333], [1.69720062E12, 0.16666666666666666], [1.6972008E12, 0.11666666666666667], [1.6972005E12, 0.16666666666666666], [1.6972002E12, 0.13333333333333333], [1.69720086E12, 0.06666666666666667]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.conn.HttpHostConnectException", "isController": false}, {"data": [[1.69719942E12, 0.06666666666666667], [1.6971999E12, 0.2833333333333333], [1.69719996E12, 0.06666666666666667], [1.69719936E12, 0.05], [1.69719984E12, 0.016666666666666666], [1.69719918E12, 0.03333333333333333], [1.69719948E12, 0.06666666666666667], [1.6971993E12, 0.016666666666666666], [1.69719978E12, 0.3], [1.69719912E12, 0.03333333333333333]], "isOverall": false, "label": "404", "isController": false}, {"data": [[1.6971999E12, 0.016666666666666666], [1.69719924E12, 1.6666666666666667], [1.69719954E12, 0.43333333333333335], [1.69719984E12, 0.95], [1.69719966E12, 0.5333333333333333], [1.697199E12, 0.9], [1.6971993E12, 1.6333333333333333], [1.69719942E12, 1.6], [1.69719972E12, 0.45], [1.69719996E12, 0.03333333333333333], [1.69719906E12, 1.45], [1.69719936E12, 1.5833333333333333], [1.69719918E12, 1.6666666666666667], [1.69719948E12, 1.35], [1.69719978E12, 0.5166666666666667], [1.69719912E12, 1.6666666666666667]], "isOverall": false, "label": "504", "isController": false}, {"data": [[1.69720032E12, 0.05], [1.69720038E12, 0.03333333333333333]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.conn.ConnectTimeoutException", "isController": false}, {"data": [[1.69719954E12, 0.45], [1.69719948E12, 3.45], [1.6971996E12, 0.06666666666666667]], "isOverall": false, "label": "Non HTTP response code: java.net.UnknownHostException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69720104E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69719888E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.69719966E12, 0.5333333333333333], [1.69719948E12, 0.016666666666666666], [1.6971996E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79-failure", "isController": false}, {"data": [[1.69719894E12, 0.08333333333333333], [1.69719942E12, 0.15], [1.69719924E12, 0.45], [1.69719906E12, 0.08333333333333333], [1.69719936E12, 0.15], [1.69719918E12, 0.15], [1.697199E12, 0.05], [1.6971993E12, 0.38333333333333336], [1.69719912E12, 0.16666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-63-success", "isController": false}, {"data": [[1.69719894E12, 0.85], [1.69719888E12, 0.8166666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map/-51-success", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667], [1.69719942E12, 0.15], [1.69719924E12, 0.15], [1.69719906E12, 0.05], [1.69719936E12, 0.38333333333333336], [1.69719918E12, 0.16666666666666666], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.05], [1.6971993E12, 0.45], [1.69719912E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-67-success", "isController": false}, {"data": [[1.69719894E12, 0.15], [1.69719888E12, 0.06666666666666667], [1.697199E12, 0.13333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58-success", "isController": false}, {"data": [[1.69719942E12, 0.15], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.016666666666666666], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.016666666666666666], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.45]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/87.png-79-success", "isController": false}, {"data": [[1.69720104E12, 0.08333333333333333], [1.69720044E12, 0.03333333333333333], [1.69720032E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-101-failure", "isController": false}, {"data": [[1.69719942E12, 0.08333333333333333], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.05], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.69719948E12, 0.03333333333333333], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/86.png-87-success", "isController": false}, {"data": [[1.69720026E12, 0.016666666666666666], [1.69720044E12, 0.03333333333333333], [1.69720092E12, 0.016666666666666666], [1.69719954E12, 0.08333333333333333], [1.69720032E12, 0.11666666666666667], [1.6972008E12, 0.06666666666666667], [1.69720098E12, 0.016666666666666666], [1.69719948E12, 0.18333333333333332], [1.69720068E12, 0.03333333333333333], [1.69720038E12, 0.016666666666666666], [1.69720086E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-110-failure", "isController": false}, {"data": [[1.69719924E12, 0.38333333333333336], [1.69719906E12, 0.16666666666666666], [1.69719936E12, 0.15], [1.69719918E12, 0.45], [1.697199E12, 0.05], [1.6971993E12, 0.15], [1.69719912E12, 0.15]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60-failure", "isController": false}, {"data": [[1.69719894E12, 0.08333333333333333], [1.69719942E12, 0.15], [1.69719924E12, 0.45], [1.69719906E12, 0.08333333333333333], [1.69719936E12, 0.15], [1.69719918E12, 0.15], [1.697199E12, 0.05], [1.6971993E12, 0.38333333333333336], [1.69719912E12, 0.16666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-65-success", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/v4/fullHashes:find-40-success", "isController": false}, {"data": [[1.69719894E12, 1.2666666666666666], [1.69719888E12, 0.25], [1.697199E12, 0.13333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50-success", "isController": false}, {"data": [[1.69719924E12, 0.15], [1.69719906E12, 0.15], [1.69719918E12, 0.38333333333333336], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.15], [1.69719912E12, 0.45]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-58-failure", "isController": false}, {"data": [[1.69719942E12, 0.18333333333333332], [1.6971999E12, 0.06666666666666667], [1.69719924E12, 0.016666666666666666], [1.69719972E12, 0.15], [1.69719996E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.06666666666666667], [1.69719984E12, 0.016666666666666666], [1.69719966E12, 0.18333333333333332], [1.6971993E12, 0.05], [1.69719978E12, 0.5833333333333334], [1.69719912E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-101-success", "isController": false}, {"data": [[1.69719894E12, 0.3], [1.69719906E12, 0.43333333333333335], [1.69719888E12, 0.08333333333333333], [1.69719918E12, 0.15], [1.697199E12, 0.55], [1.69719912E12, 0.15]], "isOverall": false, "label": "Tenders_Page/_next/image/-57-success", "isController": false}, {"data": [[1.69719894E12, 0.5833333333333334], [1.69719888E12, 1.0833333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-49-success", "isController": false}, {"data": [[1.69720008E12, 0.016666666666666666], [1.69720104E12, 0.2], [1.69719924E12, 0.03333333333333333], [1.69720044E12, 0.016666666666666666], [1.69719954E12, 0.06666666666666667], [1.69720014E12, 0.03333333333333333], [1.69719984E12, 0.3], [1.69720002E12, 0.06666666666666667], [1.69720038E12, 0.03333333333333333], [1.69720056E12, 0.03333333333333333], [1.69719942E12, 0.05], [1.69719996E12, 0.06666666666666667], [1.69720062E12, 0.03333333333333333], [1.69719936E12, 0.016666666666666666], [1.69719918E12, 0.03333333333333333], [1.6972005E12, 0.05], [1.69719948E12, 0.18333333333333332]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/-105-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/689.png-46-success", "isController": false}, {"data": [[1.69719948E12, 0.1]], "isOverall": false, "label": "Tenders_Page/_next/image/-72-failure", "isController": false}, {"data": [[1.697199E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-50-failure", "isController": false}, {"data": [[1.69719942E12, 0.016666666666666666], [1.69719924E12, 0.03333333333333333], [1.69719948E12, 0.03333333333333333], [1.6971993E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-110-success", "isController": false}, {"data": [[1.69720026E12, 0.11666666666666667], [1.69720074E12, 0.05], [1.69720092E12, 0.016666666666666666], [1.69719954E12, 0.08333333333333333], [1.69720062E12, 0.03333333333333333], [1.69720032E12, 0.016666666666666666], [1.6972008E12, 0.03333333333333333], [1.69719948E12, 0.18333333333333332], [1.6972002E12, 0.016666666666666666], [1.69720068E12, 0.016666666666666666], [1.69720038E12, 0.03333333333333333], [1.69720086E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109-failure", "isController": false}, {"data": [[1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.18333333333333332], [1.69719984E12, 0.06666666666666667], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.5666666666666667], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.06666666666666667], [1.69719978E12, 0.016666666666666666], [1.6971996E12, 0.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/86.png-96-success", "isController": false}, {"data": [[1.6971999E12, 0.016666666666666666], [1.69720104E12, 0.05], [1.69719924E12, 0.016666666666666666], [1.69719984E12, 0.03333333333333333], [1.69720032E12, 0.016666666666666666], [1.69719966E12, 0.5166666666666667], [1.6971993E12, 0.05], [1.69719942E12, 0.18333333333333332], [1.69719972E12, 0.45], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.06666666666666667], [1.69719978E12, 0.2], [1.69719912E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-99-failure", "isController": false}, {"data": [[1.69719894E12, 0.7833333333333333], [1.69719888E12, 0.2], [1.697199E12, 0.31666666666666665]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54-success", "isController": false}, {"data": [[1.69719906E12, 0.15], [1.697199E12, 0.21666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-54-failure", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667], [1.69719942E12, 0.15], [1.69719924E12, 0.15], [1.69719906E12, 0.05], [1.69719936E12, 0.38333333333333336], [1.69719918E12, 0.16666666666666666], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.05], [1.6971993E12, 0.45], [1.69719912E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-72-success", "isController": false}, {"data": [[1.69719948E12, 0.1]], "isOverall": false, "label": "Tenders_Page/_next/image/-67-failure", "isController": false}, {"data": [[1.69719894E12, 0.08333333333333333], [1.69719942E12, 0.15], [1.69719924E12, 0.45], [1.69719906E12, 0.08333333333333333], [1.69719936E12, 0.15], [1.69719918E12, 0.15], [1.697199E12, 0.05], [1.6971993E12, 0.38333333333333336], [1.69719912E12, 0.16666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-64-success", "isController": false}, {"data": [[1.69719942E12, 0.05], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.05], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.69719948E12, 0.03333333333333333], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88-success", "isController": false}, {"data": [[1.6971996E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/86.png-88-failure", "isController": false}, {"data": [[1.69719942E12, 0.016666666666666666], [1.69719924E12, 0.03333333333333333], [1.69719948E12, 0.03333333333333333], [1.6971993E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108-success", "isController": false}, {"data": [[1.69720008E12, 0.06666666666666667], [1.69720056E12, 0.016666666666666666], [1.69720026E12, 0.03333333333333333], [1.69720074E12, 0.03333333333333333], [1.69719954E12, 0.08333333333333333], [1.69720014E12, 0.06666666666666667], [1.69720062E12, 0.05], [1.6972005E12, 0.03333333333333333], [1.69719948E12, 0.18333333333333332], [1.6972002E12, 0.016666666666666666], [1.69720068E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/images/landlord-icon.svg-108-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/689.png-36-success", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/172.png-30-success", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/689.png-37-success", "isController": false}, {"data": [[1.69719942E12, 0.016666666666666666], [1.69719924E12, 0.03333333333333333], [1.69719948E12, 0.03333333333333333], [1.6971993E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-109-success", "isController": false}, {"data": [[1.69719942E12, 0.15], [1.69719924E12, 0.45], [1.69719906E12, 0.08333333333333333], [1.69719936E12, 0.15], [1.69719918E12, 0.15], [1.697199E12, 0.016666666666666666], [1.6971993E12, 0.38333333333333336], [1.69719912E12, 0.16666666666666666]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61-failure", "isController": false}, {"data": [[1.69719906E12, 0.15], [1.69719912E12, 0.15]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56-failure", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76-success", "isController": false}, {"data": [[1.69719894E12, 0.3], [1.69719906E12, 0.26666666666666666], [1.69719888E12, 0.08333333333333333], [1.697199E12, 0.15]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59-success", "isController": false}, {"data": [[1.6971996E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/171.png-32-success", "isController": false}, {"data": [[1.69719894E12, 0.7833333333333333], [1.69719888E12, 0.15], [1.697199E12, 0.43333333333333335]], "isOverall": false, "label": "Tenders_Page/api/units/map/-56-success", "isController": false}, {"data": [[1.69719942E12, 0.13333333333333333], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.05], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5166666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/86.png-85-success", "isController": false}, {"data": [[1.69719948E12, 0.1]], "isOverall": false, "label": "Tenders_Page/_next/image/-73-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/689.png-45-success", "isController": false}, {"data": [[1.69719942E12, 0.016666666666666666], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.05], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.69719948E12, 0.05], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5833333333333334]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/89.png-89-success", "isController": false}, {"data": [[1.69719924E12, 0.15], [1.69719906E12, 0.18333333333333332], [1.69719918E12, 0.15], [1.69719912E12, 0.38333333333333336]], "isOverall": false, "label": "Tenders_Page/api/units/map/-59-failure", "isController": false}, {"data": [[1.69719942E12, 0.38333333333333336], [1.69719924E12, 0.16666666666666666], [1.69719906E12, 0.016666666666666666], [1.69719954E12, 0.05], [1.69719936E12, 0.45], [1.69719918E12, 0.08333333333333333], [1.69719948E12, 0.25], [1.6971993E12, 0.15], [1.69719912E12, 0.05]], "isOverall": false, "label": "Tenders_Page/api/units/map/-76-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/690.png-34-success", "isController": false}, {"data": [[1.69719948E12, 0.1]], "isOverall": false, "label": "Tenders_Page/_next/image/-68-failure", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667], [1.69719942E12, 0.15], [1.69719924E12, 0.15], [1.69719906E12, 0.05], [1.69719936E12, 0.38333333333333336], [1.69719918E12, 0.16666666666666666], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.05], [1.6971993E12, 0.45], [1.69719912E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-68-success", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667], [1.69719942E12, 0.15], [1.69719924E12, 0.15], [1.69719906E12, 0.05], [1.69719936E12, 0.38333333333333336], [1.69719918E12, 0.16666666666666666], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.05], [1.6971993E12, 0.45], [1.69719912E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-73-success", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/691.png-48-success", "isController": false}, {"data": [[1.69719948E12, 0.18333333333333332]], "isOverall": false, "label": "Tenders_Page/tr/-104-failure", "isController": false}, {"data": [[1.69719942E12, 0.15], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.03333333333333333], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5166666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/88.png-80-success", "isController": false}, {"data": [[1.69719942E12, 0.45], [1.69719924E12, 0.08333333333333333], [1.69719954E12, 0.05], [1.69719936E12, 0.15], [1.69719918E12, 0.05], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.6333333333333333], [1.6971993E12, 0.16666666666666666], [1.69719912E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75-failure", "isController": false}, {"data": [[1.69719894E12, 1.15], [1.69719888E12, 0.5166666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-52-success", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/171.png-29-success", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/691.png-47-success", "isController": false}, {"data": [[1.69719948E12, 0.1]], "isOverall": false, "label": "Tenders_Page/_next/image/-74-failure", "isController": false}, {"data": [[1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.06666666666666667], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.69719948E12, 0.016666666666666666], [1.6971993E12, 0.08333333333333333], [1.69719978E12, 0.016666666666666666], [1.6971996E12, 0.5833333333333334]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/87.png-91-success", "isController": false}, {"data": [[1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.18333333333333332], [1.69719984E12, 0.06666666666666667], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.5666666666666667], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.06666666666666667], [1.69719978E12, 0.016666666666666666], [1.6971996E12, 0.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/89.png-98-success", "isController": false}, {"data": [[1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.18333333333333332], [1.69719984E12, 0.06666666666666667], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.5666666666666667], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.06666666666666667], [1.69719978E12, 0.016666666666666666], [1.6971996E12, 0.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/87.png-92-success", "isController": false}, {"data": [[1.69720008E12, 0.03333333333333333], [1.6971999E12, 0.2833333333333333], [1.69720044E12, 0.05], [1.69719984E12, 0.016666666666666666], [1.69720002E12, 0.016666666666666666], [1.6971993E12, 0.016666666666666666], [1.69720038E12, 0.016666666666666666], [1.69720056E12, 0.03333333333333333], [1.69719942E12, 0.05], [1.69719996E12, 0.06666666666666667], [1.69719936E12, 0.05], [1.69719918E12, 0.03333333333333333], [1.6972005E12, 0.03333333333333333], [1.69719948E12, 0.016666666666666666], [1.69719978E12, 0.3], [1.69719912E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/tr/-104-success", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-33-success", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667], [1.69719942E12, 0.15], [1.69719924E12, 0.15], [1.69719906E12, 0.05], [1.69719936E12, 0.38333333333333336], [1.69719918E12, 0.16666666666666666], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.05], [1.6971993E12, 0.45], [1.69719912E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-70-success", "isController": false}, {"data": [[1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.18333333333333332], [1.69719984E12, 0.06666666666666667], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.5666666666666667], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.06666666666666667], [1.69719978E12, 0.016666666666666666], [1.6971996E12, 0.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/88.png-93-success", "isController": false}, {"data": [[1.69719948E12, 0.6166666666666667], [1.6971996E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-77-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-43-success", "isController": false}, {"data": [[1.69719894E12, 0.08333333333333333], [1.697199E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-61-success", "isController": false}, {"data": [[1.69719894E12, 0.03333333333333333], [1.69719942E12, 0.38333333333333336], [1.69719924E12, 0.08333333333333333], [1.69719972E12, 0.016666666666666666], [1.69719936E12, 0.15], [1.69719918E12, 0.05], [1.697199E12, 0.03333333333333333], [1.69719948E12, 0.03333333333333333], [1.6971993E12, 0.16666666666666666], [1.69719912E12, 0.016666666666666666], [1.6971996E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-77-success", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66-success", "isController": false}, {"data": [[1.69719942E12, 0.15], [1.69719924E12, 0.05], [1.69719906E12, 0.03333333333333333], [1.69719954E12, 0.3], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.016666666666666666], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.016666666666666666], [1.697199E12, 0.03333333333333333], [1.69719948E12, 0.7333333333333333], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-78-failure", "isController": false}, {"data": [[1.69719894E12, 0.03333333333333333], [1.697199E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-75-success", "isController": false}, {"data": [[1.69719948E12, 0.1]], "isOverall": false, "label": "Tenders_Page/_next/image/-69-failure", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667], [1.69719942E12, 0.15], [1.69719924E12, 0.15], [1.69719906E12, 0.05], [1.69719936E12, 0.38333333333333336], [1.69719918E12, 0.16666666666666666], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.05], [1.6971993E12, 0.45], [1.69719912E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-69-success", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667], [1.69719942E12, 0.15], [1.69719924E12, 0.15], [1.69719906E12, 0.05], [1.69719936E12, 0.38333333333333336], [1.69719918E12, 0.16666666666666666], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.05], [1.6971993E12, 0.45], [1.69719912E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-74-success", "isController": false}, {"data": [[1.69719984E12, 0.6], [1.69720032E12, 0.016666666666666666], [1.69720002E12, 0.03333333333333333], [1.6971993E12, 0.016666666666666666], [1.69720038E12, 0.08333333333333333], [1.69719942E12, 0.06666666666666667], [1.69719996E12, 0.016666666666666666], [1.69719936E12, 0.05], [1.69719918E12, 0.03333333333333333], [1.6972005E12, 0.03333333333333333], [1.69719948E12, 0.18333333333333332], [1.69719978E12, 0.31666666666666665], [1.69719912E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-102-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/690.png-35-success", "isController": false}, {"data": [[1.69719942E12, 0.13333333333333333], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.03333333333333333], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.69719948E12, 0.016666666666666666], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5166666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/88.png-84-success", "isController": false}, {"data": [[1.69719942E12, 0.15], [1.69719924E12, 0.15], [1.69719906E12, 0.05], [1.69719936E12, 0.38333333333333336], [1.69719918E12, 0.16666666666666666], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.15], [1.6971993E12, 0.45], [1.69719912E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-66-failure", "isController": false}, {"data": [[1.69719948E12, 0.1]], "isOverall": false, "label": "Tenders_Page/_next/image/-70-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1198/691.png-39-success", "isController": false}, {"data": [[1.69719894E12, 1.1833333333333333], [1.69719888E12, 0.48333333333333334]], "isOverall": false, "label": "Tenders_Page/api/units/map/-53-success", "isController": false}, {"data": [[1.69720008E12, 0.03333333333333333], [1.6971999E12, 0.2833333333333333], [1.69720104E12, 0.25], [1.69720044E12, 0.05], [1.69719984E12, 0.016666666666666666], [1.69720002E12, 0.016666666666666666], [1.6971993E12, 0.016666666666666666], [1.69720038E12, 0.016666666666666666], [1.69720056E12, 0.03333333333333333], [1.69719942E12, 0.06666666666666667], [1.69719996E12, 0.06666666666666667], [1.69719936E12, 0.05], [1.69719918E12, 0.03333333333333333], [1.6972005E12, 0.03333333333333333], [1.69719948E12, 0.18333333333333332], [1.69719978E12, 0.3], [1.69719912E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/data/agFThXjCqXxZlEtNEZYm2/shepovoz-zernovoz/730/unit.json-103-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/173.png-31-success", "isController": false}, {"data": [[1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.18333333333333332], [1.69719984E12, 0.06666666666666667], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.5666666666666667], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.06666666666666667], [1.69719978E12, 0.016666666666666666], [1.6971996E12, 0.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/86.png-95-success", "isController": false}, {"data": [[1.69720008E12, 0.06666666666666667], [1.69720104E12, 0.3], [1.69719924E12, 0.03333333333333333], [1.69720044E12, 0.03333333333333333], [1.69719954E12, 0.08333333333333333], [1.69720014E12, 0.016666666666666666], [1.69720002E12, 0.06666666666666667], [1.69720068E12, 0.03333333333333333], [1.6971993E12, 0.03333333333333333], [1.69720056E12, 0.05], [1.69719942E12, 0.016666666666666666], [1.69720062E12, 0.03333333333333333], [1.6972005E12, 0.016666666666666666], [1.69719948E12, 0.21666666666666667], [1.6972002E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/api/auth/users/348/units/-106-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1199/690.png-44-success", "isController": false}, {"data": [[1.69719942E12, 0.1], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.05], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.69719948E12, 0.016666666666666666], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/149/89.png-86-success", "isController": false}, {"data": [[1.69719894E12, 0.08333333333333333], [1.69719942E12, 0.15], [1.69719924E12, 0.45], [1.69719906E12, 0.08333333333333333], [1.69719936E12, 0.15], [1.69719918E12, 0.15], [1.697199E12, 0.05], [1.6971993E12, 0.38333333333333336], [1.69719912E12, 0.16666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/image/-62-success", "isController": false}, {"data": [[1.69720104E12, 0.05], [1.69720038E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-100-failure", "isController": false}, {"data": [[1.69719906E12, 0.43333333333333335], [1.69719918E12, 0.15], [1.697199E12, 0.5], [1.69719912E12, 0.15]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55-failure", "isController": false}, {"data": [[1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.18333333333333332], [1.69719984E12, 0.06666666666666667], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.5666666666666667], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.06666666666666667], [1.69719978E12, 0.016666666666666666], [1.6971996E12, 0.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/151/88.png-94-success", "isController": false}, {"data": [[1.69720056E12, 0.03333333333333333], [1.69720026E12, 0.016666666666666666], [1.69720074E12, 0.03333333333333333], [1.69719954E12, 0.08333333333333333], [1.69720014E12, 0.06666666666666667], [1.69720062E12, 0.016666666666666666], [1.69720032E12, 0.03333333333333333], [1.6972008E12, 0.016666666666666666], [1.69719948E12, 0.18333333333333332], [1.6972002E12, 0.06666666666666667], [1.69720068E12, 0.05], [1.69720086E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107-failure", "isController": false}, {"data": [[1.69719942E12, 0.18333333333333332], [1.6971999E12, 0.03333333333333333], [1.69719924E12, 0.016666666666666666], [1.69719972E12, 0.2], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.06666666666666667], [1.69719984E12, 0.15], [1.69719966E12, 0.3], [1.6971993E12, 0.05], [1.69719978E12, 0.4666666666666667], [1.69719912E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-100-success", "isController": false}, {"data": [[1.69719942E12, 0.016666666666666666], [1.69719924E12, 0.03333333333333333], [1.69719948E12, 0.03333333333333333], [1.6971993E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/static/chunks/pages/products/%5Bproduct%5D-b30966a75ae7278d.js-107-success", "isController": false}, {"data": [[1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.18333333333333332], [1.69719984E12, 0.06666666666666667], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.5666666666666667], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.06666666666666667], [1.69719978E12, 0.016666666666666666], [1.6971996E12, 0.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/147/89.png-97-success", "isController": false}, {"data": [[1.69719894E12, 0.06666666666666667], [1.69719942E12, 0.15], [1.69719924E12, 0.15], [1.69719906E12, 0.05], [1.69719936E12, 0.38333333333333336], [1.69719918E12, 0.16666666666666666], [1.697199E12, 0.016666666666666666], [1.69719948E12, 0.05], [1.6971993E12, 0.45], [1.69719912E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/_next/image/-71-success", "isController": false}, {"data": [[1.69719948E12, 0.1]], "isOverall": false, "label": "Tenders_Page/_next/image/-71-failure", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/_next/image/-42-success", "isController": false}, {"data": [[1.69719942E12, 0.13333333333333333], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.03333333333333333], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.69719948E12, 0.016666666666666666], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5166666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/87.png-81-success", "isController": false}, {"data": [[1.69719942E12, 0.15], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.03333333333333333], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5166666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/88.png-82-success", "isController": false}, {"data": [[1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.18333333333333332], [1.69719984E12, 0.06666666666666667], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.5666666666666667], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.06666666666666667], [1.69719978E12, 0.016666666666666666], [1.6971996E12, 0.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/150/89.png-90-success", "isController": false}, {"data": [[1.69719942E12, 0.15], [1.69719924E12, 0.05], [1.69719972E12, 0.03333333333333333], [1.69719906E12, 0.03333333333333333], [1.69719936E12, 0.16666666666666666], [1.69719984E12, 0.03333333333333333], [1.69719918E12, 0.016666666666666666], [1.69719966E12, 0.55], [1.697199E12, 0.03333333333333333], [1.6971993E12, 0.08333333333333333], [1.6971996E12, 0.5166666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/8/148/87.png-83-success", "isController": false}, {"data": [[1.69719894E12, 0.11666666666666667], [1.69719888E12, 0.016666666666666666], [1.697199E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-60-success", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1196/690.png-41-success", "isController": false}, {"data": [[1.69719888E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/11/1197/691.png-38-success", "isController": false}, {"data": [[1.69719894E12, 0.3], [1.69719888E12, 0.08333333333333333], [1.697199E12, 0.05]], "isOverall": false, "label": "Tenders_Page/api/units/map-user-coords_2/-55-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69720104E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69719888E12, "maxY": 37.166666666666664, "series": [{"data": [[1.69720008E12, 0.03333333333333333], [1.69719894E12, 8.916666666666666], [1.6971999E12, 0.38333333333333336], [1.69719924E12, 4.25], [1.69720044E12, 0.05], [1.69719888E12, 37.166666666666664], [1.69719984E12, 1.2166666666666666], [1.69719966E12, 11.083333333333334], [1.69720002E12, 0.016666666666666666], [1.697199E12, 2.8833333333333333], [1.6971993E12, 7.083333333333333], [1.69720038E12, 0.016666666666666666], [1.6971996E12, 11.133333333333333], [1.69720056E12, 0.03333333333333333], [1.69719942E12, 3.9166666666666665], [1.69719972E12, 1.0333333333333334], [1.69719996E12, 0.1], [1.69719906E12, 2.1666666666666665], [1.69719936E12, 7.466666666666667], [1.69719918E12, 2.5], [1.6972005E12, 0.03333333333333333], [1.69719948E12, 0.7666666666666667], [1.69719978E12, 1.5], [1.69719912E12, 1.6]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.69720104E12, 0.9333333333333333], [1.69720074E12, 0.11666666666666667], [1.69719924E12, 1.6666666666666667], [1.69720044E12, 0.16666666666666666], [1.69719954E12, 0.8833333333333333], [1.69720014E12, 0.18333333333333332], [1.69719984E12, 0.9666666666666667], [1.69720032E12, 0.23333333333333334], [1.69719966E12, 1.0666666666666667], [1.69720002E12, 0.18333333333333332], [1.69720056E12, 0.16666666666666666], [1.69719942E12, 1.6666666666666667], [1.69720026E12, 0.18333333333333332], [1.69719972E12, 0.45], [1.69719996E12, 0.15], [1.69720086E12, 0.06666666666666667], [1.69719912E12, 1.7], [1.69720008E12, 0.18333333333333332], [1.6971999E12, 0.3], [1.69720098E12, 0.016666666666666666], [1.697199E12, 0.9], [1.69720068E12, 0.16666666666666666], [1.6971993E12, 1.65], [1.69720038E12, 0.21666666666666667], [1.6971996E12, 0.25], [1.69720092E12, 0.03333333333333333], [1.69719906E12, 1.45], [1.69720062E12, 0.16666666666666666], [1.69719936E12, 1.6333333333333333], [1.6972008E12, 0.11666666666666667], [1.69719918E12, 1.7], [1.6972005E12, 0.16666666666666666], [1.69719948E12, 4.883333333333334], [1.6972002E12, 0.13333333333333333], [1.69719978E12, 0.8166666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69720104E12, "title": "Total Transactions Per Second"}},
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
