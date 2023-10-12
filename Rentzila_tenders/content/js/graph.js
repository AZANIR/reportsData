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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 59.0, "series": [{"data": [[2600.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[1100.0, 5.0], [600.0, 7.0], [1200.0, 2.0], [300.0, 3.0], [700.0, 19.0], [800.0, 24.0], [100.0, 1.0], [900.0, 21.0], [1000.0, 15.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[600.0, 2.0], [700.0, 17.0], [2900.0, 1.0], [3100.0, 1.0], [200.0, 4.0], [800.0, 14.0], [900.0, 6.0], [3800.0, 1.0], [1000.0, 4.0], [1100.0, 4.0], [300.0, 6.0], [1200.0, 2.0], [1400.0, 3.0], [1500.0, 7.0], [400.0, 4.0], [1600.0, 2.0], [1700.0, 8.0], [500.0, 13.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 5.0], [600.0, 7.0], [300.0, 2.0], [700.0, 11.0], [800.0, 16.0], [400.0, 7.0], [200.0, 5.0], [100.0, 4.0], [900.0, 21.0], [1000.0, 16.0], [500.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[1100.0, 17.0], [1200.0, 9.0], [1300.0, 5.0], [700.0, 4.0], [800.0, 6.0], [900.0, 34.0], [1000.0, 25.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[1100.0, 13.0], [1200.0, 11.0], [600.0, 2.0], [1300.0, 11.0], [1400.0, 12.0], [700.0, 1.0], [1500.0, 7.0], [1600.0, 3.0], [800.0, 12.0], [900.0, 10.0], [1000.0, 18.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[1100.0, 17.0], [1200.0, 5.0], [600.0, 2.0], [1300.0, 4.0], [1400.0, 8.0], [700.0, 4.0], [1500.0, 1.0], [800.0, 9.0], [900.0, 14.0], [1000.0, 35.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[1100.0, 4.0], [600.0, 7.0], [300.0, 5.0], [700.0, 12.0], [400.0, 1.0], [800.0, 19.0], [200.0, 6.0], [900.0, 24.0], [1000.0, 17.0], [500.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[1100.0, 6.0], [1200.0, 2.0], [600.0, 2.0], [700.0, 7.0], [800.0, 23.0], [400.0, 1.0], [900.0, 17.0], [1000.0, 41.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[1100.0, 17.0], [1200.0, 13.0], [600.0, 14.0], [300.0, 5.0], [1300.0, 2.0], [700.0, 8.0], [800.0, 3.0], [200.0, 1.0], [400.0, 2.0], [900.0, 23.0], [1000.0, 11.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[1100.0, 3.0], [600.0, 5.0], [1200.0, 3.0], [700.0, 20.0], [800.0, 23.0], [400.0, 1.0], [200.0, 3.0], [100.0, 2.0], [900.0, 19.0], [1000.0, 15.0], [500.0, 6.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[1100.0, 4.0], [1200.0, 9.0], [1300.0, 14.0], [1400.0, 11.0], [1500.0, 12.0], [1600.0, 12.0], [1700.0, 14.0], [1800.0, 13.0], [900.0, 4.0], [1900.0, 3.0], [1000.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[2300.0, 2.0], [2400.0, 3.0], [2500.0, 2.0], [2600.0, 3.0], [2700.0, 4.0], [2800.0, 2.0], [2900.0, 6.0], [3000.0, 5.0], [3100.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [4100.0, 1.0], [4300.0, 2.0], [1200.0, 2.0], [1300.0, 10.0], [1400.0, 14.0], [1500.0, 32.0], [1600.0, 5.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[2100.0, 4.0], [2200.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [2600.0, 5.0], [2700.0, 2.0], [2800.0, 4.0], [2900.0, 2.0], [3100.0, 1.0], [3300.0, 1.0], [3200.0, 1.0], [3800.0, 1.0], [4100.0, 1.0], [1300.0, 4.0], [1400.0, 8.0], [1500.0, 26.0], [1600.0, 14.0], [1700.0, 13.0], [1800.0, 4.0], [1900.0, 3.0], [2000.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 3.0], [2500.0, 1.0], [2800.0, 3.0], [2700.0, 1.0], [2900.0, 9.0], [3000.0, 2.0], [3200.0, 1.0], [900.0, 1.0], [4400.0, 1.0], [1100.0, 4.0], [1200.0, 4.0], [1300.0, 4.0], [1400.0, 10.0], [1500.0, 20.0], [1600.0, 14.0], [1700.0, 7.0], [1800.0, 10.0], [1900.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[9200.0, 1.0], [9000.0, 1.0], [3300.0, 3.0], [3200.0, 1.0], [3400.0, 4.0], [3500.0, 3.0], [3600.0, 2.0], [3700.0, 7.0], [3800.0, 4.0], [3900.0, 4.0], [4000.0, 2.0], [4100.0, 2.0], [4200.0, 3.0], [4300.0, 3.0], [4400.0, 5.0], [4500.0, 4.0], [4700.0, 2.0], [4800.0, 1.0], [4900.0, 4.0], [5000.0, 3.0], [5100.0, 4.0], [5200.0, 4.0], [5300.0, 5.0], [5400.0, 3.0], [5500.0, 6.0], [5600.0, 5.0], [5700.0, 4.0], [5800.0, 3.0], [5900.0, 1.0], [6000.0, 4.0], [6100.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[2200.0, 1.0], [600.0, 12.0], [700.0, 20.0], [800.0, 17.0], [200.0, 2.0], [900.0, 20.0], [1000.0, 9.0], [1100.0, 5.0], [1200.0, 5.0], [300.0, 2.0], [400.0, 2.0], [100.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[2300.0, 1.0], [600.0, 2.0], [700.0, 5.0], [3000.0, 2.0], [800.0, 13.0], [900.0, 9.0], [1000.0, 12.0], [1100.0, 6.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 4.0], [1500.0, 15.0], [1600.0, 8.0], [1700.0, 8.0], [1800.0, 3.0], [1900.0, 4.0], [2000.0, 6.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[2100.0, 3.0], [2200.0, 4.0], [2300.0, 3.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2800.0, 3.0], [2700.0, 6.0], [2900.0, 3.0], [3000.0, 1.0], [3100.0, 2.0], [3700.0, 3.0], [3900.0, 1.0], [4000.0, 4.0], [4200.0, 2.0], [4100.0, 2.0], [1300.0, 11.0], [1400.0, 17.0], [1500.0, 15.0], [1600.0, 5.0], [1700.0, 6.0], [1800.0, 2.0], [2000.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[1100.0, 15.0], [1200.0, 18.0], [1300.0, 59.0], [1400.0, 4.0], [1500.0, 2.0], [3400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[1100.0, 10.0], [1200.0, 15.0], [1300.0, 41.0], [1400.0, 20.0], [1500.0, 3.0], [1600.0, 2.0], [1700.0, 4.0], [1800.0, 1.0], [1000.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[2100.0, 13.0], [2300.0, 7.0], [2200.0, 31.0], [2400.0, 3.0], [2500.0, 7.0], [2600.0, 5.0], [2700.0, 16.0], [2800.0, 18.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 9.0], [1300.0, 18.0], [1400.0, 17.0], [1500.0, 10.0], [3000.0, 1.0], [1600.0, 24.0], [1700.0, 12.0], [1800.0, 7.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[1300.0, 2.0], [1400.0, 10.0], [1500.0, 9.0], [1600.0, 5.0], [1700.0, 5.0], [1800.0, 2.0], [2000.0, 2.0], [2100.0, 5.0], [2200.0, 7.0], [2300.0, 5.0], [2400.0, 1.0], [2500.0, 4.0], [2600.0, 5.0], [2800.0, 10.0], [2700.0, 3.0], [2900.0, 6.0], [3000.0, 2.0], [3100.0, 2.0], [3300.0, 2.0], [3400.0, 1.0], [3500.0, 1.0], [3800.0, 2.0], [3900.0, 2.0], [4000.0, 2.0], [4100.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[8300.0, 1.0], [9300.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 4.0], [1500.0, 3.0], [1600.0, 2.0], [1700.0, 4.0], [1800.0, 4.0], [1900.0, 5.0], [2000.0, 3.0], [2100.0, 4.0], [2200.0, 3.0], [2300.0, 10.0], [2400.0, 4.0], [2500.0, 6.0], [2600.0, 6.0], [2800.0, 8.0], [2700.0, 2.0], [2900.0, 5.0], [3000.0, 4.0], [3100.0, 1.0], [3300.0, 2.0], [3200.0, 1.0], [3400.0, 3.0], [3500.0, 3.0], [3600.0, 2.0], [3700.0, 1.0], [3800.0, 1.0], [4000.0, 3.0], [4100.0, 1.0], [4200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[2100.0, 2.0], [2600.0, 1.0], [3000.0, 1.0], [1000.0, 3.0], [1100.0, 6.0], [1200.0, 3.0], [1300.0, 9.0], [1400.0, 27.0], [1500.0, 6.0], [1600.0, 11.0], [1700.0, 13.0], [1800.0, 9.0], [1900.0, 6.0], [2000.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[0.0, 5.0], [600.0, 5.0], [300.0, 12.0], [700.0, 13.0], [800.0, 15.0], [400.0, 9.0], [200.0, 9.0], [100.0, 8.0], [900.0, 10.0], [1000.0, 3.0], [500.0, 11.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-1", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-0", "isController": false}, {"data": [[2100.0, 3.0], [2200.0, 2.0], [700.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [800.0, 1.0], [900.0, 4.0], [3600.0, 1.0], [1000.0, 11.0], [1100.0, 11.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 7.0], [1500.0, 26.0], [1600.0, 8.0], [1700.0, 3.0], [1800.0, 3.0], [1900.0, 6.0], [2000.0, 8.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[2100.0, 2.0], [2200.0, 6.0], [600.0, 2.0], [2500.0, 1.0], [2600.0, 1.0], [700.0, 10.0], [800.0, 28.0], [900.0, 2.0], [1000.0, 12.0], [1100.0, 2.0], [300.0, 1.0], [1300.0, 2.0], [1400.0, 4.0], [1500.0, 7.0], [1600.0, 8.0], [1800.0, 4.0], [1900.0, 2.0], [500.0, 4.0], [2000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[2100.0, 5.0], [2300.0, 4.0], [2200.0, 5.0], [2400.0, 4.0], [2500.0, 1.0], [2600.0, 2.0], [2700.0, 12.0], [2800.0, 5.0], [2900.0, 13.0], [3000.0, 7.0], [3100.0, 7.0], [3300.0, 1.0], [3400.0, 1.0], [3900.0, 1.0], [1200.0, 3.0], [1300.0, 2.0], [1400.0, 5.0], [1500.0, 10.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 3.0], [1900.0, 3.0], [7500.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[1100.0, 13.0], [1200.0, 27.0], [1300.0, 42.0], [1400.0, 9.0], [900.0, 1.0], [1000.0, 8.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[1100.0, 7.0], [1200.0, 14.0], [1300.0, 25.0], [1400.0, 26.0], [1500.0, 20.0], [1600.0, 8.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[700.0, 1.0], [800.0, 5.0], [900.0, 7.0], [1000.0, 12.0], [1100.0, 10.0], [1200.0, 4.0], [1300.0, 4.0], [1400.0, 18.0], [1500.0, 10.0], [1600.0, 14.0], [1700.0, 9.0], [1800.0, 5.0], [1900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[1100.0, 15.0], [1200.0, 6.0], [1300.0, 11.0], [1400.0, 13.0], [700.0, 1.0], [1500.0, 11.0], [1600.0, 13.0], [800.0, 5.0], [1700.0, 2.0], [900.0, 7.0], [1000.0, 16.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 29.0], [1300.0, 33.0], [1400.0, 27.0], [1500.0, 6.0], [1600.0, 1.0], [1700.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[1100.0, 17.0], [1200.0, 32.0], [1300.0, 29.0], [700.0, 1.0], [800.0, 3.0], [900.0, 7.0], [1000.0, 11.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[1100.0, 26.0], [1200.0, 9.0], [600.0, 2.0], [1300.0, 1.0], [700.0, 4.0], [800.0, 13.0], [900.0, 18.0], [1000.0, 26.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[700.0, 1.0], [800.0, 3.0], [900.0, 3.0], [1000.0, 8.0], [1100.0, 7.0], [1200.0, 1.0], [1300.0, 6.0], [1400.0, 12.0], [1500.0, 10.0], [1600.0, 11.0], [1700.0, 24.0], [1800.0, 11.0], [1900.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[1100.0, 11.0], [2300.0, 1.0], [1200.0, 15.0], [2500.0, 2.0], [1300.0, 49.0], [2600.0, 1.0], [1400.0, 10.0], [2700.0, 1.0], [1500.0, 8.0], [1600.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[1100.0, 10.0], [1200.0, 12.0], [1300.0, 10.0], [700.0, 3.0], [1400.0, 1.0], [800.0, 15.0], [900.0, 23.0], [1000.0, 26.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[2100.0, 5.0], [2200.0, 8.0], [2300.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2900.0, 2.0], [3100.0, 1.0], [900.0, 1.0], [3600.0, 1.0], [1000.0, 3.0], [1100.0, 2.0], [1200.0, 1.0], [1300.0, 3.0], [1400.0, 7.0], [1500.0, 21.0], [1600.0, 4.0], [1700.0, 10.0], [1800.0, 11.0], [1900.0, 9.0], [2000.0, 8.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[1100.0, 2.0], [2600.0, 1.0], [1400.0, 5.0], [2800.0, 1.0], [1500.0, 14.0], [1600.0, 20.0], [1700.0, 26.0], [1800.0, 30.0], [1900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[1100.0, 11.0], [1200.0, 14.0], [1300.0, 27.0], [1400.0, 18.0], [1500.0, 14.0], [1600.0, 8.0], [3300.0, 1.0], [1700.0, 3.0], [1000.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[1100.0, 14.0], [1200.0, 28.0], [1300.0, 25.0], [1400.0, 29.0], [1500.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[9100.0, 1.0], [2500.0, 7.0], [2600.0, 6.0], [700.0, 5.0], [2800.0, 1.0], [3100.0, 1.0], [800.0, 8.0], [3300.0, 1.0], [900.0, 6.0], [1000.0, 14.0], [4200.0, 2.0], [1100.0, 11.0], [1200.0, 1.0], [5100.0, 1.0], [1300.0, 8.0], [1400.0, 5.0], [5400.0, 1.0], [1500.0, 16.0], [6100.0, 1.0], [1600.0, 3.0], [6500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[0.0, 6.0], [600.0, 2.0], [700.0, 2.0], [200.0, 34.0], [800.0, 11.0], [900.0, 11.0], [1000.0, 2.0], [300.0, 7.0], [1400.0, 2.0], [1500.0, 1.0], [100.0, 15.0], [1600.0, 3.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[2100.0, 14.0], [2300.0, 10.0], [2200.0, 12.0], [2400.0, 1.0], [1300.0, 2.0], [1700.0, 1.0], [1800.0, 11.0], [1900.0, 20.0], [2000.0, 29.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 26.0], [2200.0, 1.0], [1200.0, 30.0], [1300.0, 18.0], [1400.0, 2.0], [700.0, 1.0], [800.0, 2.0], [900.0, 7.0], [1000.0, 12.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 2.0], [1300.0, 5.0], [1400.0, 3.0], [1500.0, 6.0], [1600.0, 1.0], [1700.0, 6.0], [1800.0, 3.0], [1900.0, 4.0], [2000.0, 1.0], [2100.0, 5.0], [2300.0, 8.0], [2200.0, 7.0], [2400.0, 2.0], [2500.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [2800.0, 3.0], [2900.0, 4.0], [3000.0, 10.0], [3100.0, 4.0], [3200.0, 1.0], [3300.0, 2.0], [3500.0, 3.0], [3700.0, 1.0], [3800.0, 4.0], [3900.0, 2.0], [4000.0, 2.0], [4200.0, 2.0], [4100.0, 4.0], [4400.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 1.0], [1300.0, 8.0], [1400.0, 6.0], [1500.0, 4.0], [1600.0, 2.0], [1700.0, 6.0], [1800.0, 8.0], [1900.0, 4.0], [2100.0, 1.0], [2200.0, 1.0], [2300.0, 2.0], [2400.0, 1.0], [2500.0, 2.0], [2600.0, 2.0], [2800.0, 6.0], [2700.0, 2.0], [2900.0, 14.0], [3000.0, 2.0], [3100.0, 5.0], [3200.0, 2.0], [3300.0, 1.0], [3400.0, 5.0], [3500.0, 2.0], [3700.0, 1.0], [3600.0, 1.0], [3800.0, 2.0], [3900.0, 2.0], [4100.0, 3.0], [4200.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[1100.0, 8.0], [600.0, 4.0], [300.0, 1.0], [1300.0, 1.0], [700.0, 12.0], [800.0, 22.0], [400.0, 2.0], [900.0, 27.0], [1000.0, 21.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[600.0, 23.0], [700.0, 14.0], [3000.0, 1.0], [200.0, 16.0], [800.0, 1.0], [300.0, 22.0], [1300.0, 1.0], [1500.0, 1.0], [400.0, 6.0], [1700.0, 1.0], [1800.0, 1.0], [500.0, 12.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [600.0, 32.0], [2400.0, 1.0], [700.0, 25.0], [200.0, 11.0], [1000.0, 1.0], [300.0, 11.0], [1300.0, 2.0], [400.0, 9.0], [100.0, 1.0], [1600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 8.0], [1300.0, 11.0], [1400.0, 35.0], [1500.0, 40.0], [1600.0, 1.0], [1700.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[600.0, 20.0], [1200.0, 5.0], [300.0, 8.0], [2500.0, 2.0], [700.0, 3.0], [2700.0, 1.0], [400.0, 11.0], [800.0, 1.0], [200.0, 1.0], [1800.0, 1.0], [500.0, 45.0], [1000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[2100.0, 2.0], [2200.0, 2.0], [2300.0, 5.0], [2400.0, 4.0], [2500.0, 5.0], [2600.0, 12.0], [2800.0, 4.0], [2900.0, 4.0], [3000.0, 4.0], [3300.0, 3.0], [900.0, 6.0], [3900.0, 1.0], [1000.0, 12.0], [1100.0, 8.0], [1200.0, 11.0], [1300.0, 5.0], [1400.0, 3.0], [1500.0, 2.0], [1600.0, 2.0], [1700.0, 2.0], [1800.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[1100.0, 18.0], [1200.0, 2.0], [600.0, 3.0], [700.0, 7.0], [800.0, 16.0], [400.0, 1.0], [900.0, 26.0], [1000.0, 25.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 15.0], [1200.0, 23.0], [1300.0, 39.0], [1400.0, 1.0], [900.0, 8.0], [1000.0, 13.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[2100.0, 30.0], [2200.0, 16.0], [2300.0, 46.0], [2400.0, 6.0], [1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [1300.0, 5.0], [1400.0, 5.0], [1500.0, 14.0], [1600.0, 18.0], [1700.0, 24.0], [1800.0, 29.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[2100.0, 4.0], [2200.0, 2.0], [600.0, 7.0], [700.0, 3.0], [200.0, 9.0], [800.0, 10.0], [900.0, 7.0], [1000.0, 4.0], [300.0, 16.0], [1400.0, 1.0], [1500.0, 3.0], [100.0, 3.0], [400.0, 12.0], [1600.0, 3.0], [1700.0, 1.0], [1800.0, 2.0], [1900.0, 5.0], [500.0, 6.0], [2000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[1100.0, 32.0], [1200.0, 40.0], [600.0, 2.0], [300.0, 2.0], [1300.0, 5.0], [1400.0, 1.0], [700.0, 1.0], [800.0, 2.0], [200.0, 1.0], [900.0, 2.0], [1000.0, 12.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[2100.0, 3.0], [2200.0, 4.0], [2500.0, 1.0], [2700.0, 2.0], [2900.0, 2.0], [3000.0, 2.0], [3300.0, 1.0], [4000.0, 1.0], [1200.0, 1.0], [1300.0, 7.0], [1400.0, 13.0], [1500.0, 31.0], [1600.0, 11.0], [1700.0, 9.0], [1800.0, 4.0], [1900.0, 4.0], [2000.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[1100.0, 22.0], [1200.0, 33.0], [1300.0, 24.0], [1400.0, 4.0], [900.0, 2.0], [1000.0, 15.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 3.0], [600.0, 9.0], [300.0, 8.0], [700.0, 12.0], [800.0, 15.0], [400.0, 8.0], [200.0, 9.0], [100.0, 6.0], [900.0, 19.0], [1000.0, 5.0], [500.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 4.0], [2500.0, 1.0], [2600.0, 1.0], [2800.0, 9.0], [2700.0, 5.0], [2900.0, 3.0], [3000.0, 5.0], [3100.0, 9.0], [3400.0, 1.0], [3900.0, 2.0], [4000.0, 2.0], [1000.0, 1.0], [1100.0, 3.0], [1200.0, 3.0], [1300.0, 5.0], [1400.0, 8.0], [1500.0, 15.0], [1600.0, 6.0], [1700.0, 8.0], [1800.0, 6.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[1100.0, 25.0], [1200.0, 26.0], [1300.0, 20.0], [1400.0, 6.0], [800.0, 3.0], [900.0, 6.0], [1000.0, 14.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 9300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 357.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 3936.0, "series": [{"data": [[0.0, 357.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 3936.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 2311.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 83.11361310133066, "minX": 1.6971189E12, "maxY": 100.0, "series": [{"data": [[1.69711896E12, 100.0], [1.69711902E12, 83.11361310133066], [1.6971189E12, 100.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711902E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 84.0, "minX": 1.0, "maxY": 4818.019999999998, "series": [{"data": [[100.0, 2649.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[100.0, 2649.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0-Aggregated", "isController": false}, {"data": [[16.0, 133.0], [68.0, 782.0], [74.0, 875.0], [90.0, 795.0], [44.0, 353.0], [95.0, 1040.5], [94.0, 859.0], [98.0, 793.6666666666666], [100.0, 896.8902439024391], [27.0, 307.0], [56.0, 537.0], [59.0, 662.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[94.82000000000002, 860.22]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149-Aggregated", "isController": false}, {"data": [[100.0, 365.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[100.0, 365.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1-Aggregated", "isController": false}, {"data": [[100.0, 993.7999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[100.0, 993.7999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125-Aggregated", "isController": false}, {"data": [[32.0, 426.5], [37.0, 472.0], [44.0, 326.75], [46.0, 601.0], [49.0, 628.0], [48.0, 604.0], [51.0, 569.5], [50.0, 566.0], [57.0, 736.0], [56.0, 638.8333333333333], [59.0, 658.0], [60.0, 604.0], [4.0, 418.5], [71.0, 713.0], [68.0, 799.8333333333334], [75.0, 884.0], [74.0, 933.5], [85.0, 906.6000000000001], [91.0, 974.3333333333334], [90.0, 1003.0], [95.0, 1070.0], [94.0, 980.0], [92.0, 959.0], [99.0, 889.6666666666666], [98.0, 871.1666666666667], [100.0, 974.9999999999999], [10.0, 108.33333333333333], [11.0, 238.0], [15.0, 159.0], [16.0, 133.5], [27.0, 350.0], [28.0, 241.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[72.71000000000001, 764.7599999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153-Aggregated", "isController": false}, {"data": [[100.0, 1042.8199999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[100.0, 1042.8199999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114-Aggregated", "isController": false}, {"data": [[95.0, 1034.0], [100.0, 1178.767676767677]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[99.95, 1177.3200000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143-Aggregated", "isController": false}, {"data": [[85.0, 964.0], [95.0, 1071.0], [100.0, 1070.3265306122446]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[99.8, 1069.2699999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147-Aggregated", "isController": false}, {"data": [[35.0, 537.0], [45.0, 535.0], [44.0, 388.0], [46.0, 590.0], [50.0, 594.0], [56.0, 691.5], [59.0, 653.0], [61.0, 849.0], [62.0, 798.0], [69.0, 746.0], [68.0, 795.8], [74.0, 875.0], [73.0, 861.0], [72.0, 664.0], [76.0, 883.0], [86.0, 926.0], [85.0, 971.5], [91.0, 980.0], [90.0, 882.6666666666666], [95.0, 1075.5], [94.0, 861.4], [93.0, 968.5], [92.0, 1001.5], [98.0, 989.4], [100.0, 916.4634146341464], [8.0, 303.0], [11.0, 219.0], [27.0, 305.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[80.91000000000003, 818.1199999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154-Aggregated", "isController": false}, {"data": [[69.0, 715.0], [35.0, 464.0], [73.0, 1035.0], [85.0, 1028.0], [95.0, 1058.0], [94.0, 1068.0], [93.0, 1018.0], [98.0, 994.0], [49.0, 630.0], [100.0, 961.5444444444441]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[97.85999999999999, 956.0699999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148-Aggregated", "isController": false}, {"data": [[100.0, 926.7600000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[100.0, 926.7600000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115-Aggregated", "isController": false}, {"data": [[10.0, 127.0], [44.0, 237.0], [46.0, 554.0], [51.0, 565.0], [50.0, 610.0], [13.0, 180.0], [56.0, 605.0], [73.0, 872.0], [72.0, 654.0], [86.0, 903.0], [85.0, 845.0], [90.0, 803.0], [95.0, 1032.6666666666667], [94.0, 931.0], [98.0, 900.6666666666666], [100.0, 879.9264705882355], [27.0, 260.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[91.99, 834.8200000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146-Aggregated", "isController": false}, {"data": [[100.0, 1510.6499999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[100.0, 1510.6499999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141-Aggregated", "isController": false}, {"data": [[100.0, 2030.51]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[100.0, 2030.51]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132-Aggregated", "isController": false}, {"data": [[100.0, 1915.3900000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[100.0, 1915.3900000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128-Aggregated", "isController": false}, {"data": [[100.0, 1868.8999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[100.0, 1868.8999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137-Aggregated", "isController": false}, {"data": [[100.0, 4818.019999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[100.0, 4818.019999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93-Aggregated", "isController": false}, {"data": [[32.0, 435.0], [34.0, 524.5], [37.0, 501.0], [10.0, 106.0], [44.0, 342.0], [57.0, 2250.0], [56.0, 699.0], [59.0, 657.0], [69.0, 732.0], [68.0, 791.5], [72.0, 663.5], [18.0, 255.0], [87.0, 874.0], [85.0, 883.1666666666666], [91.0, 976.0], [90.0, 819.2], [95.0, 1081.6666666666667], [94.0, 883.3333333333334], [93.0, 1017.0], [99.0, 871.25], [98.0, 886.25], [100.0, 893.7924528301883], [27.0, 343.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[87.26999999999997, 838.9700000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152-Aggregated", "isController": false}, {"data": [[100.0, 1370.3500000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[100.0, 1370.3500000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124-Aggregated", "isController": false}, {"data": [[100.0, 2149.66]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[100.0, 2149.66]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133-Aggregated", "isController": false}, {"data": [[100.0, 1330.1399999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[100.0, 1330.1399999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97-Aggregated", "isController": false}, {"data": [[100.0, 1352.7799999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[100.0, 1352.7799999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103-Aggregated", "isController": false}, {"data": [[100.0, 2473.9299999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[100.0, 2473.9299999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95-Aggregated", "isController": false}, {"data": [[100.0, 1543.0900000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[100.0, 1543.0900000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107-Aggregated", "isController": false}, {"data": [[100.0, 2449.55]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[100.0, 2449.55]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135-Aggregated", "isController": false}, {"data": [[100.0, 2686.8299999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[100.0, 2686.8299999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130-Aggregated", "isController": false}, {"data": [[100.0, 1599.3300000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[100.0, 1599.3300000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136-Aggregated", "isController": false}, {"data": [[2.0, 92.0], [4.0, 398.5], [8.0, 287.5], [10.0, 103.5], [11.0, 148.0], [12.0, 209.0], [13.0, 203.0], [14.0, 176.0], [15.0, 158.0], [16.0, 154.0], [17.0, 86.0], [18.0, 84.0], [27.0, 323.33333333333337], [28.0, 249.0], [29.0, 217.0], [30.0, 199.0], [31.0, 189.0], [33.0, 433.0], [32.0, 417.0], [35.0, 544.0], [34.0, 462.0], [37.0, 494.5], [38.0, 467.0], [45.0, 595.0], [44.0, 357.3333333333333], [47.0, 550.0], [46.0, 563.0], [49.0, 557.0], [48.0, 538.0], [51.0, 579.0], [50.0, 595.0], [57.0, 736.0], [56.0, 604.2], [59.0, 680.0], [58.0, 671.0], [61.0, 830.0], [60.0, 605.0], [63.0, 809.0], [62.0, 811.0], [71.0, 714.0], [69.0, 744.0], [68.0, 782.2], [75.0, 885.0], [74.0, 890.0], [73.0, 629.0], [72.0, 691.0], [76.0, 908.0], [87.0, 913.0], [86.0, 925.0], [85.0, 885.8888888888889], [91.0, 1000.0], [90.0, 839.5], [89.0, 883.0], [95.0, 1012.0], [94.0, 861.0], [93.0, 968.0], [92.0, 959.0], [99.0, 907.0], [98.0, 836.0], [96.0, 1063.0], [100.0, 763.0], [1.0, 98.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[51.699999999999996, 565.8599999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155-Aggregated", "isController": false}, {"data": [[100.0, 624.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-1", "isController": false}, {"data": [[100.0, 624.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-1-Aggregated", "isController": false}, {"data": [[100.0, 693.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-0", "isController": false}, {"data": [[100.0, 693.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-0-Aggregated", "isController": false}, {"data": [[100.0, 1578.5199999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[100.0, 1578.5199999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127-Aggregated", "isController": false}, {"data": [[100.0, 1227.2299999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[100.0, 1227.2299999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123-Aggregated", "isController": false}, {"data": [[100.0, 2460.6699999999987]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[100.0, 2460.6699999999987]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131-Aggregated", "isController": false}, {"data": [[100.0, 1280.2099999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[100.0, 1280.2099999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102-Aggregated", "isController": false}, {"data": [[100.0, 1408.2500000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[100.0, 1408.2500000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101-Aggregated", "isController": false}, {"data": [[100.0, 1376.4399999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[100.0, 1376.4399999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142-Aggregated", "isController": false}, {"data": [[100.0, 1290.6100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[100.0, 1290.6100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144-Aggregated", "isController": false}, {"data": [[100.0, 1379.9699999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[100.0, 1379.9699999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104-Aggregated", "isController": false}, {"data": [[100.0, 1201.8400000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[100.0, 1201.8400000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112-Aggregated", "isController": false}, {"data": [[68.0, 789.0], [86.0, 928.0], [98.0, 845.5], [100.0, 1032.5833333333337]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[99.5, 1025.3600000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145-Aggregated", "isController": false}, {"data": [[100.0, 1514.5800000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[100.0, 1514.5800000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140-Aggregated", "isController": false}, {"data": [[100.0, 1398.9699999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[100.0, 1398.9699999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91-Aggregated", "isController": false}, {"data": [[100.0, 1057.9799999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[100.0, 1057.9799999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109-Aggregated", "isController": false}, {"data": [[100.0, 1814.0699999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[100.0, 1814.0699999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126-Aggregated", "isController": false}, {"data": [[100.0, 1728.49]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[100.0, 1728.49]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92-Aggregated", "isController": false}, {"data": [[100.0, 1404.2199999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[100.0, 1404.2199999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108-Aggregated", "isController": false}, {"data": [[100.0, 1313.0900000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[100.0, 1313.0900000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99-Aggregated", "isController": false}, {"data": [[100.0, 1762.84]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[100.0, 1762.84]], "isOverall": false, "label": "Tenders_Page/dns-query-120-Aggregated", "isController": false}, {"data": [[100.0, 549.8500000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[100.0, 549.8500000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-121-Aggregated", "isController": false}, {"data": [[100.0, 2065.2000000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[100.0, 2065.2000000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94-Aggregated", "isController": false}, {"data": [[100.0, 1201.65]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[100.0, 1201.65]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113-Aggregated", "isController": false}, {"data": [[100.0, 2583.9700000000007]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[100.0, 2583.9700000000007]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134-Aggregated", "isController": false}, {"data": [[100.0, 2487.0599999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[100.0, 2487.0599999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139-Aggregated", "isController": false}, {"data": [[68.0, 817.0], [35.0, 448.0], [85.0, 947.25], [90.0, 1015.0], [95.0, 1096.0], [98.0, 892.0], [100.0, 927.6477272727271], [27.0, 309.0], [56.0, 688.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[96.64999999999999, 913.7600000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150-Aggregated", "isController": false}, {"data": [[100.0, 593.9700000000001]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[100.0, 593.9700000000001]], "isOverall": false, "label": "Tenders_Page/tr/-119-Aggregated", "isController": false}, {"data": [[100.0, 665.2600000000001]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[100.0, 665.2600000000001]], "isOverall": false, "label": "Tenders_Page/tr/-118-Aggregated", "isController": false}, {"data": [[100.0, 1473.6499999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[100.0, 1473.6499999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98-Aggregated", "isController": false}, {"data": [[100.0, 671.03]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[100.0, 671.03]], "isOverall": false, "label": "Tenders_Page/tr/-117-Aggregated", "isController": false}, {"data": [[100.0, 1918.7099999999996]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[100.0, 1918.7099999999996]], "isOverall": false, "label": "Tenders_Page/tr/-116-Aggregated", "isController": false}, {"data": [[68.0, 771.0], [90.0, 838.0], [95.0, 1049.0], [92.0, 983.0], [49.0, 613.0], [100.0, 971.3894736842105]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[98.94000000000001, 965.36]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151-Aggregated", "isController": false}, {"data": [[100.0, 1232.42]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[100.0, 1232.42]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110-Aggregated", "isController": false}, {"data": [[100.0, 2273.269999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[100.0, 2273.269999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96-Aggregated", "isController": false}, {"data": [[100.0, 1669.2800000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[100.0, 1669.2800000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105-Aggregated", "isController": false}, {"data": [[100.0, 864.0700000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[100.0, 864.0700000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122-Aggregated", "isController": false}, {"data": [[100.0, 1142.9999999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[100.0, 1142.9999999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111-Aggregated", "isController": false}, {"data": [[100.0, 1778.87]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[100.0, 1778.87]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129-Aggregated", "isController": false}, {"data": [[100.0, 1217.1899999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[100.0, 1217.1899999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106-Aggregated", "isController": false}, {"data": [[32.0, 423.0], [2.0, 100.5], [35.0, 465.0], [34.0, 512.0], [44.0, 350.625], [47.0, 551.0], [48.0, 580.0], [50.0, 600.0], [57.0, 725.0], [56.0, 589.7500000000001], [59.0, 650.5], [58.0, 691.0], [62.0, 899.0], [68.0, 796.0], [74.0, 884.0], [73.0, 892.0], [76.0, 918.5], [85.0, 856.6999999999998], [91.0, 976.5], [90.0, 850.3333333333334], [95.0, 1080.0], [94.0, 880.2], [93.0, 932.0], [92.0, 956.0], [99.0, 868.0], [98.0, 913.3333333333334], [100.0, 972.4285714285714], [8.0, 290.6666666666667], [10.0, 113.25], [11.0, 145.0], [16.0, 112.0], [27.0, 290.4285714285714], [29.0, 213.0], [31.0, 627.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[62.92000000000001, 660.94]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156-Aggregated", "isController": false}, {"data": [[100.0, 2169.4200000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[100.0, 2169.4200000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138-Aggregated", "isController": false}, {"data": [[100.0, 1195.1100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}, {"data": [[100.0, 1195.1100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 7343.55, "minX": 1.6971189E12, "maxY": 1029785.8, "series": [{"data": [[1.69711896E12, 1029785.8], [1.69711902E12, 221497.15], [1.6971189E12, 516362.65]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69711896E12, 47615.916666666664], [1.69711902E12, 7343.55], [1.6971189E12, 13026.383333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711902E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 365.0, "minX": 1.6971189E12, "maxY": 4818.019999999998, "series": [{"data": [[1.69711896E12, 2649.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[1.69711896E12, 935.5], [1.69711902E12, 857.0833333333329]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[1.69711896E12, 365.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[1.69711896E12, 993.7999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[1.69711902E12, 764.7599999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[1.69711896E12, 1042.8199999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[1.69711896E12, 1214.5287356321842], [1.69711902E12, 928.3076923076923]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[1.69711896E12, 1135.376623376623], [1.69711902E12, 847.9565217391305]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[1.69711902E12, 818.1199999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[1.69711896E12, 1002.8749999999999], [1.69711902E12, 924.8666666666668]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[1.69711896E12, 926.7600000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[1.69711902E12, 834.8200000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[1.69711896E12, 1521.8265306122444], [1.69711902E12, 963.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[1.69711896E12, 2030.51]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[1.69711896E12, 1915.3900000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[1.69711896E12, 1868.8999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[1.6971189E12, 4818.019999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[1.69711902E12, 838.9700000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[1.69711896E12, 1370.3500000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[1.69711896E12, 2149.66]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[1.6971189E12, 1330.1399999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[1.6971189E12, 1352.7799999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[1.6971189E12, 2473.9299999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[1.6971189E12, 1543.0900000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[1.69711896E12, 2449.55]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[1.69711896E12, 2686.8299999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[1.69711896E12, 1604.363636363637], [1.69711902E12, 1101.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[1.69711902E12, 565.8599999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[1.69711896E12, 624.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-1", "isController": false}, {"data": [[1.69711896E12, 693.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-0", "isController": false}, {"data": [[1.69711896E12, 1578.5199999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[1.69711896E12, 1227.2299999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[1.69711896E12, 2460.6699999999987]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[1.6971189E12, 1280.2099999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[1.6971189E12, 1408.2500000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[1.69711896E12, 1399.7473684210522], [1.69711902E12, 933.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[1.69711896E12, 1325.0666666666668], [1.69711902E12, 980.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[1.6971189E12, 1379.9699999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[1.69711896E12, 1201.8400000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[1.69711896E12, 1082.523076923077], [1.69711902E12, 919.1999999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[1.69711896E12, 1537.1562500000002], [1.69711902E12, 972.75]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[1.6971189E12, 1398.9699999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[1.69711896E12, 1057.9799999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[1.69711896E12, 1814.0699999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[1.6971189E12, 1728.49]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[1.69711896E12, 1446.3333333333333], [1.6971189E12, 1400.0549450549445]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[1.6971189E12, 1313.0900000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[1.69711896E12, 1762.84]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[1.69711896E12, 549.8500000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[1.6971189E12, 2065.2000000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[1.69711896E12, 1201.65]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[1.69711896E12, 2583.9700000000007]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[1.69711896E12, 2487.0599999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[1.69711896E12, 1052.6315789473686], [1.69711902E12, 881.1851851851851]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[1.69711896E12, 593.9700000000001]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[1.69711896E12, 665.2600000000001]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[1.6971189E12, 1473.6499999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[1.69711896E12, 671.03]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[1.69711896E12, 1918.7099999999996]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[1.69711896E12, 1032.0000000000002], [1.69711902E12, 890.2127659574465]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[1.69711896E12, 1239.061855670104], [1.6971189E12, 1017.6666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[1.6971189E12, 2273.269999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[1.69711896E12, 1090.0], [1.6971189E12, 1687.1958762886597]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[1.69711896E12, 864.0700000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[1.69711896E12, 1142.9999999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[1.69711896E12, 1778.87]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[1.69711896E12, 1189.4999999999998], [1.6971189E12, 1255.4285714285713]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[1.69711902E12, 660.94]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[1.69711896E12, 2169.4200000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[1.6971189E12, 1195.1100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711902E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 365.0, "minX": 1.6971189E12, "maxY": 4758.33, "series": [{"data": [[1.69711896E12, 2649.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[1.69711896E12, 935.5], [1.69711902E12, 855.4895833333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[1.69711896E12, 365.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[1.69711896E12, 988.3299999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[1.69711902E12, 761.8899999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[1.69711896E12, 1042.49]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[1.69711896E12, 1209.850574712644], [1.69711902E12, 927.6923076923077]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[1.69711896E12, 1134.8051948051946], [1.69711902E12, 847.9565217391305]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[1.69711902E12, 817.7399999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[1.69711896E12, 1002.125], [1.69711902E12, 924.8666666666668]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[1.69711896E12, 926.6499999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[1.69711902E12, 834.7399999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[1.69711896E12, 1497.7755102040808], [1.69711902E12, 962.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[1.69711896E12, 1982.7000000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[1.69711896E12, 1872.15]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[1.69711896E12, 1778.42]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[1.6971189E12, 4758.33]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[1.69711902E12, 838.1199999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[1.69711896E12, 1338.2999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[1.69711896E12, 2127.59]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[1.6971189E12, 1316.5000000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[1.6971189E12, 1352.5799999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[1.6971189E12, 2455.53]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[1.6971189E12, 1536.029999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[1.69711896E12, 2382.8099999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[1.69711896E12, 2584.990000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[1.69711896E12, 1533.6969696969702], [1.69711902E12, 1100.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[1.69711902E12, 565.5300000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[1.69711896E12, 624.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-1", "isController": false}, {"data": [[1.69711896E12, 693.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-0", "isController": false}, {"data": [[1.69711896E12, 1569.6799999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[1.69711896E12, 1225.6300000000008]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[1.69711896E12, 2349.83]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[1.6971189E12, 1266.2699999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[1.6971189E12, 1387.7799999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[1.69711896E12, 1390.6736842105267], [1.69711902E12, 933.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[1.69711896E12, 1309.4777777777776], [1.69711902E12, 961.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[1.6971189E12, 1377.8599999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[1.69711896E12, 1201.5499999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[1.69711896E12, 1081.96923076923], [1.69711902E12, 917.1999999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[1.69711896E12, 1475.6145833333333], [1.69711902E12, 878.25]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[1.6971189E12, 1348.5300000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[1.69711896E12, 1055.5900000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[1.69711896E12, 1801.1600000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[1.6971189E12, 1690.3699999999992]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[1.69711896E12, 1446.3333333333333], [1.6971189E12, 1399.373626373627]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[1.6971189E12, 1308.39]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[1.69711896E12, 1762.83]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[1.69711896E12, 549.8500000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[1.6971189E12, 2050.1000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[1.69711896E12, 1201.4599999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[1.69711896E12, 2475.9099999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[1.69711896E12, 2450.73]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[1.69711896E12, 1052.6315789473686], [1.69711902E12, 876.7283950617283]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[1.69711896E12, 587.7300000000001]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[1.69711896E12, 665.2499999999999]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[1.6971189E12, 1455.9900000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[1.69711896E12, 671.03]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[1.69711896E12, 1915.0599999999997]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[1.69711896E12, 1031.9622641509434], [1.69711902E12, 889.7659574468084]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[1.69711896E12, 1224.6804123711338], [1.6971189E12, 1015.6666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[1.6971189E12, 2250.9200000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[1.69711896E12, 1083.6666666666667], [1.6971189E12, 1680.5360824742272]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[1.69711896E12, 860.4599999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[1.69711896E12, 1138.7200000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[1.69711896E12, 1757.9899999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[1.69711896E12, 1189.068965517241], [1.6971189E12, 1255.071428571428]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[1.69711902E12, 659.8999999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[1.69711896E12, 2128.56]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[1.6971189E12, 1184.1000000000008]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711902E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6971189E12, "maxY": 3231.049999999999, "series": [{"data": [[1.69711896E12, 1369.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[1.69711896E12, 25.8]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[1.69711896E12, 169.89000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[1.69711896E12, 81.18]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[1.6971189E12, 3231.049999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[1.69711896E12, 16.46]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[1.69711896E12, 70.27]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[1.69711896E12, 160.23999999999987]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[1.69711896E12, 381.02999999999986]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-1", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-119-0", "isController": false}, {"data": [[1.69711896E12, 31.009999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[1.69711896E12, 22.82]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[1.69711896E12, 231.12]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[1.69711896E12, 52.870000000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[1.69711896E12, 1221.8500000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[1.69711896E12, 17.910000000000007]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[1.69711896E12, 1205.98]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[1.69711896E12, 37.389999999999986]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[1.69711896E12, 0.0], [1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[1.69711902E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[1.69711896E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[1.6971189E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711902E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 84.0, "minX": 1.6971189E12, "maxY": 9376.0, "series": [{"data": [[1.69711896E12, 9376.0], [1.69711902E12, 2250.0], [1.6971189E12, 9285.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69711896E12, 2697.0], [1.69711902E12, 1063.0], [1.6971189E12, 2390.2000000000003]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69711896E12, 4071.7500000000027], [1.69711902E12, 1201.22], [1.6971189E12, 5684.180000000002]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69711896E12, 3031.25], [1.69711902E12, 1103.1], [1.6971189E12, 3731.0999999999995]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69711896E12, 87.0], [1.69711902E12, 84.0], [1.6971189E12, 873.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69711896E12, 1341.0], [1.69711902E12, 864.0], [1.6971189E12, 1442.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711902E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 178.0, "minX": 8.0, "maxY": 5496.0, "series": [{"data": [[8.0, 250.5], [17.0, 3100.0], [20.0, 2889.5], [25.0, 4440.0], [28.0, 3895.0], [29.0, 3570.0], [30.0, 3036.5], [31.0, 2811.0], [35.0, 2240.0], [34.0, 2897.0], [36.0, 2814.0], [37.0, 1926.0], [39.0, 2435.5], [38.0, 2829.5], [40.0, 2804.0], [43.0, 2317.0], [44.0, 5496.0], [45.0, 1980.0], [47.0, 2377.0], [49.0, 2240.0], [48.0, 1057.5], [50.0, 178.0], [53.0, 1575.0], [52.0, 1541.5], [54.0, 2056.5], [55.0, 1796.5], [57.0, 1617.5], [59.0, 1794.0], [60.0, 1535.0], [61.0, 1432.0], [63.0, 1620.0], [62.0, 1688.0], [66.0, 1595.0], [67.0, 1424.5], [65.0, 1421.5], [64.0, 1601.0], [70.0, 1210.0], [71.0, 1330.5], [68.0, 1558.0], [73.0, 1363.0], [72.0, 1339.5], [75.0, 1071.0], [76.0, 1350.0], [79.0, 1156.0], [80.0, 1267.5], [81.0, 1069.0], [83.0, 1214.0], [85.0, 1220.0], [87.0, 1042.0], [84.0, 899.5], [89.0, 855.0], [92.0, 698.5], [94.0, 711.0], [95.0, 1260.0], [99.0, 917.0], [102.0, 985.0], [100.0, 840.0], [107.0, 1033.0], [105.0, 444.0], [110.0, 890.5], [115.0, 553.0], [133.0, 898.0], [212.0, 345.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 212.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 178.0, "minX": 8.0, "maxY": 5433.5, "series": [{"data": [[8.0, 250.5], [17.0, 2850.0], [20.0, 2782.5], [25.0, 4348.0], [28.0, 3831.0], [29.0, 3359.0], [30.0, 2929.5], [31.0, 2805.0], [35.0, 2180.0], [34.0, 2835.0], [36.0, 2796.0], [37.0, 1788.0], [39.0, 2420.0], [38.0, 2818.5], [40.0, 2780.5], [43.0, 2291.0], [44.0, 5433.5], [45.0, 1968.0], [47.0, 2356.0], [49.0, 2226.0], [48.0, 1053.5], [50.0, 178.0], [53.0, 1565.0], [52.0, 1525.5], [54.0, 2042.0], [55.0, 1750.5], [57.0, 1589.5], [59.0, 1754.0], [60.0, 1523.5], [61.0, 1429.0], [63.0, 1592.0], [62.0, 1620.0], [66.0, 1585.0], [67.0, 1413.5], [65.0, 1419.0], [64.0, 1589.5], [70.0, 1202.0], [71.0, 1328.5], [68.0, 1536.0], [73.0, 1352.0], [72.0, 1325.0], [75.0, 1058.0], [76.0, 1350.0], [79.0, 1156.0], [80.0, 1267.5], [81.0, 1066.0], [83.0, 1210.0], [85.0, 1210.0], [87.0, 1032.0], [84.0, 899.5], [89.0, 853.0], [92.0, 698.5], [94.0, 707.0], [95.0, 1259.0], [99.0, 914.0], [102.0, 985.0], [100.0, 837.5], [107.0, 1031.0], [105.0, 444.0], [110.0, 890.0], [115.0, 553.0], [133.0, 897.0], [212.0, 343.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 212.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 14.616666666666667, "minX": 1.6971189E12, "maxY": 64.9, "series": [{"data": [[1.69711896E12, 64.9], [1.69711902E12, 14.616666666666667], [1.6971189E12, 30.55]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711902E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.6971189E12, "maxY": 64.86666666666666, "series": [{"data": [[1.69711896E12, 64.86666666666666], [1.69711902E12, 16.283333333333335], [1.6971189E12, 28.883333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69711896E12, 0.03333333333333333]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711902E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6971189E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128-success", "isController": false}, {"data": [[1.69711902E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103-success", "isController": false}, {"data": [[1.69711896E12, 0.8833333333333333], [1.69711902E12, 0.7833333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151-success", "isController": false}, {"data": [[1.69711902E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99-success", "isController": false}, {"data": [[1.69711896E12, 0.15], [1.6971189E12, 1.5166666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98-success", "isController": false}, {"data": [[1.69711896E12, 1.6333333333333333], [1.69711902E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109-success", "isController": false}, {"data": [[1.69711902E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-117-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-119-success", "isController": false}, {"data": [[1.69711896E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-116-0-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91-success", "isController": false}, {"data": [[1.69711896E12, 0.31666666666666665], [1.69711902E12, 1.35]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100-success", "isController": false}, {"data": [[1.69711896E12, 1.6166666666666667], [1.6971189E12, 0.05]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110-success", "isController": false}, {"data": [[1.69711896E12, 1.5], [1.69711902E12, 0.16666666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104-success", "isController": false}, {"data": [[1.69711896E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-119-0-success", "isController": false}, {"data": [[1.69711896E12, 1.45], [1.69711902E12, 0.21666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/dns-query-120-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122-success", "isController": false}, {"data": [[1.69711896E12, 1.0833333333333333], [1.69711902E12, 0.5833333333333334]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113-success", "isController": false}, {"data": [[1.69711902E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123-success", "isController": false}, {"data": [[1.69711902E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129-success", "isController": false}, {"data": [[1.69711896E12, 0.06666666666666667], [1.69711902E12, 1.6]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149-success", "isController": false}, {"data": [[1.69711896E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-116-1-success", "isController": false}, {"data": [[1.69711896E12, 0.05], [1.6971189E12, 1.6166666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-116-success", "isController": false}, {"data": [[1.69711896E12, 1.6], [1.69711902E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140-success", "isController": false}, {"data": [[1.69711902E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155-success", "isController": false}, {"data": [[1.69711896E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-119-1-success", "isController": false}, {"data": [[1.69711896E12, 0.6666666666666666], [1.69711902E12, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-118-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102-success", "isController": false}, {"data": [[1.69711896E12, 1.5833333333333333], [1.69711902E12, 0.08333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96-success", "isController": false}, {"data": [[1.69711896E12, 0.9666666666666667], [1.6971189E12, 0.7]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126-success", "isController": false}, {"data": [[1.69711896E12, 1.2833333333333334], [1.69711902E12, 0.38333333333333336]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/dns-query-121-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132-success", "isController": false}, {"data": [[1.6971189E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92-success", "isController": false}, {"data": [[1.69711896E12, 1.65], [1.69711902E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138-success", "isController": false}, {"data": [[1.69711896E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711902E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 16.283333333333335, "minX": 1.6971189E12, "maxY": 64.9, "series": [{"data": [[1.69711896E12, 64.9], [1.69711902E12, 16.283333333333335], [1.6971189E12, 28.883333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711902E12, "title": "Total Transactions Per Second"}},
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
