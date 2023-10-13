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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 64.0, "series": [{"data": [[1200.0, 1.0], [600.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[300.0, 43.0], [700.0, 1.0], [800.0, 1.0], [100.0, 7.0], [200.0, 26.0], [400.0, 21.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[300.0, 4.0], [600.0, 6.0], [1400.0, 1.0], [700.0, 6.0], [400.0, 33.0], [100.0, 7.0], [200.0, 9.0], [800.0, 4.0], [900.0, 5.0], [500.0, 22.0], [1000.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[0.0, 1.0], [300.0, 44.0], [700.0, 1.0], [400.0, 16.0], [200.0, 19.0], [800.0, 1.0], [100.0, 16.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[0.0, 5.0], [300.0, 43.0], [600.0, 4.0], [1200.0, 1.0], [700.0, 1.0], [100.0, 8.0], [200.0, 17.0], [400.0, 14.0], [900.0, 1.0], [500.0, 4.0], [1000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[300.0, 47.0], [600.0, 3.0], [1200.0, 1.0], [700.0, 1.0], [200.0, 26.0], [100.0, 5.0], [800.0, 4.0], [400.0, 12.0], [900.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[1100.0, 2.0], [300.0, 36.0], [600.0, 1.0], [1200.0, 2.0], [2500.0, 1.0], [200.0, 38.0], [100.0, 9.0], [400.0, 8.0], [800.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[0.0, 1.0], [300.0, 50.0], [600.0, 1.0], [700.0, 1.0], [100.0, 9.0], [400.0, 15.0], [200.0, 20.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[300.0, 39.0], [600.0, 2.0], [200.0, 23.0], [400.0, 19.0], [100.0, 11.0], [900.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 2.0], [300.0, 39.0], [700.0, 1.0], [400.0, 16.0], [200.0, 16.0], [100.0, 8.0], [800.0, 1.0], [900.0, 6.0], [1000.0, 3.0], [500.0, 7.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[300.0, 41.0], [600.0, 2.0], [1200.0, 1.0], [200.0, 23.0], [100.0, 10.0], [400.0, 18.0], [800.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[300.0, 51.0], [600.0, 2.0], [1200.0, 1.0], [700.0, 3.0], [100.0, 8.0], [200.0, 19.0], [800.0, 1.0], [400.0, 6.0], [900.0, 4.0], [500.0, 2.0], [1000.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[300.0, 6.0], [600.0, 6.0], [1300.0, 1.0], [700.0, 2.0], [200.0, 2.0], [100.0, 4.0], [400.0, 32.0], [800.0, 4.0], [1700.0, 1.0], [900.0, 4.0], [500.0, 37.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[600.0, 19.0], [700.0, 12.0], [200.0, 2.0], [800.0, 21.0], [900.0, 9.0], [1000.0, 2.0], [1100.0, 2.0], [300.0, 6.0], [1500.0, 1.0], [100.0, 3.0], [400.0, 4.0], [1800.0, 1.0], [500.0, 18.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[0.0, 1.0], [300.0, 15.0], [600.0, 3.0], [700.0, 5.0], [200.0, 5.0], [800.0, 2.0], [400.0, 34.0], [3400.0, 1.0], [900.0, 3.0], [1000.0, 1.0], [500.0, 30.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[600.0, 5.0], [700.0, 4.0], [800.0, 3.0], [900.0, 15.0], [1000.0, 6.0], [1100.0, 3.0], [1200.0, 2.0], [1300.0, 5.0], [1400.0, 4.0], [1500.0, 1.0], [1600.0, 4.0], [1700.0, 6.0], [1800.0, 1.0], [1900.0, 3.0], [2000.0, 1.0], [2300.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [2700.0, 1.0], [200.0, 10.0], [3200.0, 1.0], [3400.0, 1.0], [3700.0, 1.0], [300.0, 10.0], [400.0, 5.0], [500.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[300.0, 38.0], [600.0, 1.0], [100.0, 9.0], [200.0, 23.0], [400.0, 23.0], [900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[600.0, 11.0], [700.0, 13.0], [200.0, 5.0], [800.0, 9.0], [900.0, 13.0], [1000.0, 6.0], [1100.0, 6.0], [300.0, 5.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [100.0, 3.0], [400.0, 5.0], [1600.0, 2.0], [1800.0, 1.0], [500.0, 17.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 8.0], [300.0, 47.0], [100.0, 5.0], [200.0, 26.0], [400.0, 7.0], [800.0, 1.0], [900.0, 3.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[0.0, 4.0], [2400.0, 2.0], [2600.0, 1.0], [700.0, 2.0], [200.0, 24.0], [800.0, 1.0], [900.0, 5.0], [1100.0, 3.0], [300.0, 20.0], [1200.0, 1.0], [1400.0, 2.0], [100.0, 10.0], [400.0, 14.0], [500.0, 11.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[0.0, 3.0], [1100.0, 2.0], [300.0, 27.0], [600.0, 3.0], [700.0, 1.0], [200.0, 16.0], [100.0, 12.0], [400.0, 22.0], [800.0, 2.0], [900.0, 3.0], [500.0, 7.0], [1000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[0.0, 6.0], [2100.0, 1.0], [600.0, 2.0], [2500.0, 1.0], [700.0, 1.0], [2700.0, 1.0], [200.0, 40.0], [800.0, 4.0], [900.0, 1.0], [1000.0, 2.0], [300.0, 2.0], [1300.0, 3.0], [100.0, 25.0], [400.0, 5.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [500.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[0.0, 4.0], [300.0, 8.0], [600.0, 5.0], [1400.0, 1.0], [100.0, 8.0], [200.0, 12.0], [400.0, 38.0], [800.0, 1.0], [500.0, 20.0], [1000.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[300.0, 16.0], [600.0, 6.0], [700.0, 3.0], [1400.0, 1.0], [100.0, 3.0], [200.0, 5.0], [400.0, 47.0], [800.0, 4.0], [900.0, 1.0], [500.0, 13.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[600.0, 12.0], [700.0, 9.0], [200.0, 4.0], [800.0, 12.0], [900.0, 7.0], [1000.0, 1.0], [300.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [100.0, 2.0], [400.0, 19.0], [1600.0, 1.0], [500.0, 29.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[300.0, 7.0], [600.0, 4.0], [700.0, 10.0], [1500.0, 1.0], [200.0, 3.0], [100.0, 2.0], [800.0, 3.0], [400.0, 52.0], [900.0, 1.0], [500.0, 17.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[0.0, 5.0], [300.0, 26.0], [600.0, 1.0], [700.0, 1.0], [400.0, 11.0], [200.0, 23.0], [800.0, 1.0], [100.0, 30.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 2.0], [300.0, 9.0], [600.0, 15.0], [700.0, 9.0], [400.0, 25.0], [200.0, 6.0], [100.0, 4.0], [800.0, 10.0], [900.0, 2.0], [500.0, 14.0], [1000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[0.0, 4.0], [600.0, 4.0], [700.0, 6.0], [200.0, 15.0], [800.0, 8.0], [900.0, 2.0], [1000.0, 1.0], [1100.0, 1.0], [300.0, 28.0], [1200.0, 2.0], [100.0, 2.0], [400.0, 22.0], [500.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[600.0, 19.0], [300.0, 7.0], [1200.0, 2.0], [700.0, 5.0], [100.0, 3.0], [200.0, 1.0], [400.0, 9.0], [800.0, 13.0], [900.0, 9.0], [500.0, 29.0], [1000.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 19.0], [600.0, 1.0], [700.0, 2.0], [1500.0, 1.0], [200.0, 12.0], [100.0, 11.0], [400.0, 29.0], [800.0, 5.0], [1800.0, 1.0], [900.0, 2.0], [500.0, 16.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-0", "isController": false}, {"data": [[0.0, 4.0], [600.0, 5.0], [2600.0, 1.0], [700.0, 2.0], [200.0, 16.0], [800.0, 1.0], [900.0, 3.0], [1000.0, 2.0], [300.0, 14.0], [100.0, 12.0], [400.0, 21.0], [500.0, 18.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[300.0, 38.0], [2800.0, 1.0], [700.0, 1.0], [200.0, 44.0], [400.0, 4.0], [800.0, 1.0], [100.0, 10.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[300.0, 30.0], [700.0, 4.0], [200.0, 27.0], [400.0, 21.0], [800.0, 12.0], [1700.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[0.0, 6.0], [1100.0, 1.0], [300.0, 13.0], [600.0, 2.0], [700.0, 2.0], [100.0, 15.0], [200.0, 8.0], [800.0, 3.0], [400.0, 29.0], [900.0, 1.0], [500.0, 19.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 1.0], [300.0, 36.0], [600.0, 3.0], [700.0, 1.0], [100.0, 11.0], [200.0, 13.0], [400.0, 22.0], [800.0, 1.0], [900.0, 1.0], [500.0, 8.0], [1000.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[300.0, 50.0], [700.0, 1.0], [1600.0, 1.0], [400.0, 23.0], [100.0, 3.0], [200.0, 15.0], [800.0, 1.0], [1800.0, 1.0], [900.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[300.0, 11.0], [600.0, 4.0], [700.0, 2.0], [200.0, 5.0], [100.0, 2.0], [800.0, 3.0], [400.0, 54.0], [900.0, 1.0], [500.0, 18.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[2100.0, 1.0], [0.0, 2.0], [600.0, 4.0], [700.0, 3.0], [200.0, 25.0], [900.0, 4.0], [1000.0, 1.0], [1100.0, 3.0], [4400.0, 1.0], [300.0, 14.0], [1200.0, 1.0], [1300.0, 3.0], [1400.0, 1.0], [1500.0, 2.0], [100.0, 11.0], [400.0, 14.0], [1600.0, 2.0], [500.0, 8.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[0.0, 2.0], [300.0, 23.0], [600.0, 8.0], [700.0, 3.0], [200.0, 16.0], [400.0, 31.0], [100.0, 8.0], [1800.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 2.0], [300.0, 5.0], [600.0, 6.0], [700.0, 8.0], [100.0, 2.0], [200.0, 8.0], [400.0, 25.0], [800.0, 7.0], [900.0, 6.0], [500.0, 25.0], [1000.0, 4.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[0.0, 1.0], [600.0, 3.0], [2600.0, 1.0], [700.0, 3.0], [200.0, 23.0], [800.0, 5.0], [900.0, 4.0], [1000.0, 2.0], [1100.0, 3.0], [300.0, 19.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [100.0, 10.0], [400.0, 15.0], [1700.0, 1.0], [500.0, 6.0], [2000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[0.0, 7.0], [300.0, 16.0], [600.0, 3.0], [1300.0, 1.0], [100.0, 7.0], [200.0, 12.0], [400.0, 35.0], [900.0, 2.0], [500.0, 17.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[0.0, 6.0], [1100.0, 3.0], [300.0, 19.0], [600.0, 1.0], [200.0, 9.0], [100.0, 16.0], [400.0, 26.0], [800.0, 1.0], [1600.0, 1.0], [900.0, 2.0], [500.0, 15.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[2100.0, 2.0], [1100.0, 1.0], [300.0, 14.0], [600.0, 10.0], [1300.0, 3.0], [700.0, 6.0], [1500.0, 2.0], [400.0, 29.0], [200.0, 4.0], [500.0, 29.0]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[0.0, 51.0], [600.0, 2.0], [200.0, 1.0], [100.0, 45.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[0.0, 1.0], [600.0, 2.0], [200.0, 30.0], [800.0, 3.0], [900.0, 1.0], [1000.0, 4.0], [1100.0, 1.0], [300.0, 16.0], [1300.0, 5.0], [1400.0, 2.0], [100.0, 17.0], [400.0, 7.0], [1700.0, 2.0], [500.0, 9.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[0.0, 1.0], [300.0, 42.0], [600.0, 3.0], [1200.0, 1.0], [700.0, 1.0], [100.0, 11.0], [200.0, 8.0], [400.0, 25.0], [800.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 5.0], [600.0, 7.0], [700.0, 4.0], [1500.0, 1.0], [200.0, 3.0], [100.0, 2.0], [400.0, 35.0], [800.0, 3.0], [900.0, 2.0], [500.0, 37.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[300.0, 31.0], [600.0, 3.0], [700.0, 3.0], [1500.0, 1.0], [200.0, 15.0], [100.0, 2.0], [400.0, 33.0], [800.0, 2.0], [500.0, 10.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[600.0, 2.0], [300.0, 35.0], [700.0, 2.0], [200.0, 17.0], [100.0, 9.0], [400.0, 33.0], [500.0, 2.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[0.0, 22.0], [300.0, 3.0], [200.0, 9.0], [100.0, 64.0], [400.0, 2.0]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[0.0, 35.0], [300.0, 3.0], [600.0, 2.0], [700.0, 1.0], [100.0, 48.0], [400.0, 1.0], [200.0, 10.0]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[0.0, 1.0], [300.0, 17.0], [1400.0, 1.0], [700.0, 2.0], [1500.0, 1.0], [100.0, 12.0], [200.0, 17.0], [400.0, 30.0], [800.0, 1.0], [900.0, 3.0], [500.0, 14.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[0.0, 52.0], [300.0, 1.0], [100.0, 45.0], [200.0, 2.0]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[600.0, 14.0], [300.0, 14.0], [1200.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [400.0, 32.0], [200.0, 1.0], [1600.0, 2.0], [900.0, 2.0], [500.0, 32.0]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[300.0, 42.0], [1200.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [400.0, 40.0], [200.0, 8.0], [800.0, 1.0], [100.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[0.0, 4.0], [600.0, 3.0], [300.0, 15.0], [1300.0, 1.0], [700.0, 1.0], [100.0, 4.0], [200.0, 10.0], [400.0, 48.0], [800.0, 1.0], [900.0, 1.0], [500.0, 12.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[600.0, 5.0], [2500.0, 1.0], [2600.0, 1.0], [700.0, 4.0], [3000.0, 2.0], [200.0, 33.0], [800.0, 2.0], [900.0, 1.0], [1000.0, 2.0], [300.0, 7.0], [1200.0, 1.0], [1300.0, 3.0], [1400.0, 3.0], [1500.0, 2.0], [100.0, 17.0], [400.0, 10.0], [1900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[0.0, 3.0], [600.0, 2.0], [700.0, 2.0], [200.0, 10.0], [800.0, 1.0], [1000.0, 2.0], [1100.0, 2.0], [300.0, 13.0], [1300.0, 1.0], [100.0, 5.0], [400.0, 32.0], [1600.0, 1.0], [500.0, 26.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[0.0, 1.0], [600.0, 7.0], [700.0, 4.0], [200.0, 6.0], [800.0, 5.0], [900.0, 2.0], [1000.0, 3.0], [300.0, 3.0], [1400.0, 1.0], [100.0, 9.0], [400.0, 22.0], [1600.0, 1.0], [500.0, 36.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[0.0, 1.0], [300.0, 12.0], [600.0, 12.0], [700.0, 4.0], [2900.0, 1.0], [800.0, 2.0], [200.0, 8.0], [400.0, 39.0], [100.0, 6.0], [500.0, 15.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[300.0, 12.0], [600.0, 9.0], [1200.0, 1.0], [700.0, 4.0], [100.0, 3.0], [200.0, 2.0], [800.0, 6.0], [400.0, 35.0], [900.0, 5.0], [500.0, 21.0], [1000.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[0.0, 2.0], [300.0, 25.0], [600.0, 1.0], [700.0, 1.0], [100.0, 7.0], [200.0, 16.0], [400.0, 33.0], [900.0, 1.0], [500.0, 14.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[0.0, 7.0], [300.0, 28.0], [700.0, 1.0], [100.0, 31.0], [200.0, 25.0], [400.0, 5.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[300.0, 44.0], [1500.0, 1.0], [200.0, 28.0], [100.0, 1.0], [800.0, 3.0], [400.0, 20.0], [900.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[0.0, 2.0], [600.0, 3.0], [700.0, 1.0], [200.0, 12.0], [800.0, 4.0], [900.0, 1.0], [1000.0, 5.0], [300.0, 21.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [400.0, 21.0], [100.0, 13.0], [500.0, 12.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 92.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 4798.0, "series": [{"data": [[0.0, 4798.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1716.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 92.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 93.35834722994242, "minX": 1.6971987E12, "maxY": 97.56079404466497, "series": [{"data": [[1.69719876E12, 93.35834722994242], [1.6971987E12, 97.56079404466497]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69719876E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 53.0, "minX": 3.0, "maxY": 1433.3484848484854, "series": [{"data": [[100.0, 987.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[100.0, 987.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0-Aggregated", "isController": false}, {"data": [[55.0, 353.5], [59.0, 137.0], [58.0, 315.00000000000006], [65.0, 289.1111111111111], [71.0, 494.0], [69.0, 317.0], [75.0, 392.8333333333333], [73.0, 388.59999999999997], [19.0, 123.0], [82.0, 336.6], [81.0, 342.49999999999994], [87.0, 300.0], [84.0, 299.3333333333333], [90.0, 294.5], [95.0, 291.57142857142856], [94.0, 414.3333333333333], [92.0, 221.0], [98.0, 373.33333333333337], [96.0, 340.25], [100.0, 347.8], [26.0, 186.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[77.60999999999999, 333.54]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149-Aggregated", "isController": false}, {"data": [[100.0, 53.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[100.0, 53.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1-Aggregated", "isController": false}, {"data": [[100.0, 534.48]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[100.0, 534.48]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125-Aggregated", "isController": false}, {"data": [[45.0, 245.66666666666666], [44.0, 222.66666666666666], [46.0, 171.0], [3.0, 109.0], [55.0, 355.5], [58.0, 389.6], [66.0, 148.0], [65.0, 324.54545454545456], [71.0, 497.5], [69.0, 335.6666666666667], [75.0, 365.6666666666667], [73.0, 346.0], [82.0, 462.0], [81.0, 401.5], [87.0, 409.5], [84.0, 395.4], [90.0, 355.6666666666667], [95.0, 353.28571428571433], [94.0, 522.0], [92.0, 526.0], [98.0, 498.6666666666667], [100.0, 321.0], [19.0, 176.8], [20.0, 244.0], [21.0, 214.33333333333334], [23.0, 197.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[62.279999999999994, 325.93999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153-Aggregated", "isController": false}, {"data": [[100.0, 373.01000000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[100.0, 373.01000000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114-Aggregated", "isController": false}, {"data": [[58.0, 236.0], [65.0, 258.0], [69.0, 297.0], [75.0, 342.0], [82.0, 349.125], [81.0, 365.83333333333337], [87.0, 330.4], [84.0, 321.0], [90.0, 347.58823529411757], [95.0, 338.26666666666665], [92.0, 603.8888888888889], [98.0, 365.2857142857143], [96.0, 372.2], [100.0, 377.72222222222223]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[90.97000000000003, 373.3400000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143-Aggregated", "isController": false}, {"data": [[58.0, 194.0], [65.0, 242.0], [75.0, 378.33333333333337], [73.0, 311.0], [82.0, 312.375], [81.0, 326.6666666666667], [87.0, 317.79999999999995], [84.0, 303.5], [90.0, 518.4999999999999], [95.0, 267.0], [94.0, 488.0], [92.0, 610.8], [98.0, 321.2857142857143], [96.0, 307.0], [100.0, 410.50000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[89.26999999999995, 379.58000000000015]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147-Aggregated", "isController": false}, {"data": [[45.0, 252.66666666666666], [44.0, 236.4], [46.0, 212.0], [3.0, 114.66666666666667], [55.0, 304.6666666666667], [58.0, 376.0], [65.0, 318.85714285714283], [71.0, 513.0], [69.0, 338.2], [75.0, 356.5], [73.0, 421.6], [82.0, 452.5], [81.0, 354.3333333333333], [87.0, 389.0], [84.0, 363.0], [90.0, 316.5], [95.0, 320.4], [94.0, 689.0], [93.0, 715.0], [92.0, 655.0], [98.0, 361.0], [96.0, 384.25], [100.0, 335.75], [21.0, 217.0], [23.0, 196.0], [24.0, 193.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[66.72, 342.43999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154-Aggregated", "isController": false}, {"data": [[44.0, 147.0], [46.0, 175.5], [66.0, 177.0], [65.0, 307.0], [71.0, 493.0], [69.0, 315.66666666666663], [75.0, 312.25], [73.0, 405.57142857142856], [82.0, 398.5714285714286], [81.0, 408.4666666666667], [87.0, 338.0], [84.0, 326.24999999999994], [90.0, 258.6666666666667], [95.0, 263.22222222222223], [94.0, 688.5], [92.0, 995.0], [98.0, 338.5], [96.0, 355.6666666666667], [100.0, 373.72727272727275]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[83.07, 353.0299999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148-Aggregated", "isController": false}, {"data": [[100.0, 426.98]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[100.0, 426.98]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115-Aggregated", "isController": false}, {"data": [[45.0, 260.0], [46.0, 218.0], [12.0, 119.0], [55.0, 326.5], [58.0, 307.6666666666667], [65.0, 235.0], [71.0, 499.5], [69.0, 322.40000000000003], [75.0, 420.2], [73.0, 415.2], [19.0, 117.0], [82.0, 451.0], [81.0, 326.5714285714286], [87.0, 364.0], [84.0, 260.0], [90.0, 615.6666666666666], [95.0, 312.2], [94.0, 667.0], [92.0, 620.0], [98.0, 383.0], [96.0, 317.6666666666667], [100.0, 306.8]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[74.75999999999998, 356.36999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146-Aggregated", "isController": false}, {"data": [[75.0, 364.0], [82.0, 367.0], [81.0, 344.0], [87.0, 174.0], [90.0, 431.59999999999997], [95.0, 279.20000000000005], [92.0, 746.1818181818181], [99.0, 514.0], [98.0, 371.0], [96.0, 360.2580645161291], [100.0, 365.03571428571433]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[95.52000000000001, 403.22999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141-Aggregated", "isController": false}, {"data": [[98.0, 445.5], [97.0, 635.0], [96.0, 499.0], [100.0, 549.5833333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[99.89, 547.8499999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132-Aggregated", "isController": false}, {"data": [[98.0, 787.0], [100.0, 703.6262626262627]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[99.98, 704.46]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128-Aggregated", "isController": false}, {"data": [[82.0, 499.0], [87.0, 448.0], [84.0, 404.0], [95.0, 358.00000000000006], [94.0, 558.5], [93.0, 732.0], [92.0, 350.0], [98.0, 478.90322580645164], [96.0, 492.0], [100.0, 633.7058823529413]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[97.26, 529.1000000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137-Aggregated", "isController": false}, {"data": [[33.0, 219.5], [37.0, 224.0], [40.0, 306.5], [42.0, 203.0], [44.0, 430.0], [46.0, 263.0], [48.0, 327.0], [50.0, 404.5], [52.0, 395.0], [55.0, 396.25], [57.0, 330.0], [58.0, 357.0], [64.0, 432.0], [65.0, 468.0], [76.0, 470.0], [81.0, 769.0], [82.0, 501.0], [83.0, 674.0], [84.0, 552.0], [86.0, 558.0], [91.0, 609.0], [98.0, 618.0], [100.0, 1433.3484848484854], [26.0, 231.0], [29.0, 260.0], [31.0, 208.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[85.15000000000003, 1080.1499999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93-Aggregated", "isController": false}, {"data": [[45.0, 250.0], [44.0, 255.83333333333334], [46.0, 211.0], [55.0, 306.3333333333333], [58.0, 371.14285714285717], [65.0, 330.71428571428567], [4.0, 105.0], [71.0, 493.0], [70.0, 519.0], [69.0, 309.875], [75.0, 374.25000000000006], [73.0, 455.8], [82.0, 394.6666666666667], [81.0, 409.0], [87.0, 390.0], [84.0, 369.5], [90.0, 343.5], [89.0, 291.0], [95.0, 298.0], [94.0, 607.0], [92.0, 240.5], [98.0, 517.0], [96.0, 529.6666666666666], [100.0, 303.25], [10.0, 150.0], [11.0, 145.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[71.11000000000004, 354.09999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152-Aggregated", "isController": false}, {"data": [[100.0, 758.1199999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[100.0, 758.1199999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124-Aggregated", "isController": false}, {"data": [[98.0, 344.0], [96.0, 320.0], [100.0, 401.4687500000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[99.86, 398.4500000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133-Aggregated", "isController": false}, {"data": [[100.0, 490.10999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[100.0, 490.10999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97-Aggregated", "isController": false}, {"data": [[100.0, 406.98999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[100.0, 406.98999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103-Aggregated", "isController": false}, {"data": [[35.0, 68.5], [36.0, 63.0], [39.0, 67.0], [40.0, 79.0], [55.0, 162.0], [57.0, 177.0], [58.0, 197.0], [63.0, 200.0], [65.0, 222.0], [69.0, 197.5], [70.0, 202.33333333333334], [71.0, 165.0], [72.0, 194.0], [73.0, 180.0], [74.0, 179.0], [76.0, 195.5], [79.0, 196.0], [81.0, 198.0], [84.0, 195.0], [90.0, 237.5], [100.0, 581.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[90.97000000000003, 475.0999999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95-Aggregated", "isController": false}, {"data": [[100.0, 444.26999999999987]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[100.0, 444.26999999999987]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107-Aggregated", "isController": false}, {"data": [[95.0, 365.6666666666667], [92.0, 694.0], [98.0, 457.2], [96.0, 472.3333333333333], [100.0, 490.87671232876716]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[99.25, 481.86000000000007]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135-Aggregated", "isController": false}, {"data": [[95.0, 449.0], [94.0, 624.0], [98.0, 701.7894736842105], [96.0, 417.0], [100.0, 621.6623376623377]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[99.42000000000003, 631.41]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130-Aggregated", "isController": false}, {"data": [[82.0, 501.0], [81.0, 400.0], [84.0, 405.0], [90.0, 291.5], [95.0, 429.5714285714286], [94.0, 468.2857142857143], [93.0, 681.0], [92.0, 772.6666666666666], [98.0, 504.1538461538462], [96.0, 456.46153846153845], [100.0, 544.7499999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[96.41, 516.6299999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136-Aggregated", "isController": false}, {"data": [[45.0, 256.0], [44.0, 221.62500000000003], [46.0, 237.0], [3.0, 92.0], [55.0, 339.8888888888889], [59.0, 181.0], [58.0, 275.6666666666667], [66.0, 214.0], [65.0, 262.0], [4.0, 115.0], [71.0, 299.0], [70.0, 284.0], [69.0, 247.0], [75.0, 447.0], [73.0, 433.0], [82.0, 382.0], [81.0, 496.83333333333337], [87.0, 393.6666666666667], [84.0, 380.0], [90.0, 331.0], [95.0, 348.0], [94.0, 694.0], [93.0, 737.0], [92.0, 567.5], [99.0, 446.0], [98.0, 319.0], [97.0, 517.0], [96.0, 364.0], [100.0, 389.0], [7.0, 114.0], [8.0, 99.0], [9.0, 153.0], [10.0, 151.0], [11.0, 145.0], [12.0, 127.0], [13.0, 97.0], [19.0, 150.0], [20.0, 258.0], [21.0, 107.0], [22.0, 203.0], [23.0, 202.0], [24.0, 191.0], [25.0, 189.0], [26.0, 188.0], [27.0, 168.0], [28.0, 153.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[52.729999999999976, 282.86]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155-Aggregated", "isController": false}, {"data": [[100.0, 555.6600000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[100.0, 555.6600000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127-Aggregated", "isController": false}, {"data": [[100.0, 476.08000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[100.0, 476.08000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123-Aggregated", "isController": false}, {"data": [[95.0, 446.0], [98.0, 615.8888888888889], [96.0, 477.3333333333333], [100.0, 667.6436781609196]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[99.64999999999999, 655.0600000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131-Aggregated", "isController": false}, {"data": [[100.0, 457.25]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[100.0, 457.25]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102-Aggregated", "isController": false}, {"data": [[100.0, 155.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-1", "isController": false}, {"data": [[100.0, 155.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-1-Aggregated", "isController": false}, {"data": [[100.0, 79.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-0", "isController": false}, {"data": [[100.0, 79.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-0-Aggregated", "isController": false}, {"data": [[100.0, 452.2999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[100.0, 452.2999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101-Aggregated", "isController": false}, {"data": [[69.0, 267.0], [75.0, 341.0], [73.0, 389.0], [87.0, 286.77777777777777], [84.0, 285.0], [90.0, 246.0], [95.0, 264.6857142857143], [94.0, 318.5], [92.0, 442.0], [98.0, 318.8333333333333], [96.0, 318.25], [100.0, 451.8749999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[93.59, 324.73999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142-Aggregated", "isController": false}, {"data": [[65.0, 335.0], [69.0, 323.0], [73.0, 434.0], [82.0, 476.5], [81.0, 984.0], [87.0, 303.1666666666667], [84.0, 326.875], [90.0, 296.6], [95.0, 314.12499999999994], [94.0, 351.25], [93.0, 723.0], [92.0, 862.0], [98.0, 384.14285714285717], [96.0, 412.6666666666667], [100.0, 417.1818181818181]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[92.43999999999997, 464.88000000000017]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144-Aggregated", "isController": false}, {"data": [[100.0, 412.86]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[100.0, 412.86]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104-Aggregated", "isController": false}, {"data": [[100.0, 407.7]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[100.0, 407.7]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112-Aggregated", "isController": false}, {"data": [[55.0, 365.0], [58.0, 353.0], [71.0, 507.0], [70.0, 516.0], [69.0, 267.0], [75.0, 451.3333333333333], [73.0, 428.75], [82.0, 434.5], [81.0, 406.8888888888889], [87.0, 358.1428571428571], [84.0, 345.75], [90.0, 294.25], [95.0, 319.6666666666667], [94.0, 441.0], [92.0, 441.8], [98.0, 426.3333333333333], [96.0, 383.5], [100.0, 612.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[87.28999999999999, 404.23000000000013]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145-Aggregated", "isController": false}, {"data": [[70.0, 516.0], [75.0, 486.0], [81.0, 438.0], [87.0, 450.27272727272725], [90.0, 405.3636363636364], [95.0, 420.92307692307696], [94.0, 599.0], [92.0, 827.0], [98.0, 543.8571428571429], [96.0, 466.8461538461538], [100.0, 501.56000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[94.46999999999998, 472.90999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140-Aggregated", "isController": false}, {"data": [[100.0, 567.7899999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[100.0, 567.7899999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91-Aggregated", "isController": false}, {"data": [[100.0, 415.9400000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[100.0, 415.9400000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109-Aggregated", "isController": false}, {"data": [[100.0, 571.6100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[100.0, 571.6100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126-Aggregated", "isController": false}, {"data": [[86.0, 227.0], [89.0, 273.0], [94.0, 260.0], [99.0, 233.0], [100.0, 529.4895833333335]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[99.68, 518.24]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92-Aggregated", "isController": false}, {"data": [[100.0, 406.97000000000014]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[100.0, 406.97000000000014]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108-Aggregated", "isController": false}, {"data": [[100.0, 412.80999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[100.0, 412.80999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99-Aggregated", "isController": false}, {"data": [[100.0, 584.6700000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[100.0, 584.6700000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-120-Aggregated", "isController": false}, {"data": [[100.0, 114.26]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[100.0, 114.26]], "isOverall": false, "label": "Tenders_Page/dns-query-121-Aggregated", "isController": false}, {"data": [[67.0, 183.0], [75.0, 181.0], [76.0, 178.0], [100.0, 483.8315789473685], [60.0, 166.0], [63.0, 168.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[98.40999999999997, 468.39999999999986]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94-Aggregated", "isController": false}, {"data": [[100.0, 389.5599999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[100.0, 389.5599999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113-Aggregated", "isController": false}, {"data": [[90.0, 466.0], [95.0, 245.0], [92.0, 791.0], [99.0, 521.0], [98.0, 541.9999999999999], [96.0, 483.3684210526317], [100.0, 543.8235294117646]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[98.75999999999998, 533.1400000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134-Aggregated", "isController": false}, {"data": [[87.0, 373.0], [90.0, 315.0], [95.0, 268.25], [92.0, 252.0], [99.0, 520.0], [98.0, 470.7222222222223], [96.0, 401.2352941176471], [100.0, 432.70175438596493]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[98.44000000000003, 424.9099999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139-Aggregated", "isController": false}, {"data": [[44.0, 196.0], [58.0, 395.0], [65.0, 269.2], [71.0, 501.0], [69.0, 331.5555555555556], [75.0, 435.0625], [73.0, 433.0], [82.0, 435.7272727272727], [81.0, 351.2857142857143], [87.0, 330.3333333333333], [84.0, 330.8], [90.0, 338.0], [95.0, 291.7142857142857], [93.0, 722.0], [92.0, 429.3333333333333], [98.0, 432.8], [96.0, 401.16666666666663], [100.0, 365.0], [26.0, 176.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[80.48000000000002, 371.13000000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150-Aggregated", "isController": false}, {"data": [[100.0, 150.33999999999997]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[100.0, 150.33999999999997]], "isOverall": false, "label": "Tenders_Page/tr/-119-Aggregated", "isController": false}, {"data": [[100.0, 143.66]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[100.0, 143.66]], "isOverall": false, "label": "Tenders_Page/tr/-118-Aggregated", "isController": false}, {"data": [[100.0, 419.8100000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[100.0, 419.8100000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98-Aggregated", "isController": false}, {"data": [[100.0, 92.71999999999996]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[100.0, 92.71999999999996]], "isOverall": false, "label": "Tenders_Page/tr/-117-Aggregated", "isController": false}, {"data": [[100.0, 548.3699999999998]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[100.0, 548.3699999999998]], "isOverall": false, "label": "Tenders_Page/tr/-116-Aggregated", "isController": false}, {"data": [[45.0, 253.0], [55.0, 306.0], [71.0, 512.0], [70.0, 515.0], [69.0, 319.00000000000006], [75.0, 434.375], [73.0, 446.25], [82.0, 464.7857142857143], [81.0, 505.0], [87.0, 378.5], [84.0, 360.75], [90.0, 363.8], [95.0, 361.7142857142857], [92.0, 722.3333333333334], [98.0, 435.7142857142857], [96.0, 388.2], [100.0, 566.3636363636364]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[85.15999999999997, 430.78999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151-Aggregated", "isController": false}, {"data": [[100.0, 422.25000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[100.0, 422.25000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110-Aggregated", "isController": false}, {"data": [[44.0, 104.0], [45.0, 115.0], [49.0, 120.0], [56.0, 172.0], [57.0, 189.0], [75.0, 199.0], [76.0, 180.0], [81.0, 201.0], [82.0, 190.0], [92.0, 240.0], [95.0, 249.0], [97.0, 251.0], [96.0, 261.0], [100.0, 642.7857142857142]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[96.3, 572.17]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96-Aggregated", "isController": false}, {"data": [[100.0, 476.99]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[100.0, 476.99]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105-Aggregated", "isController": false}, {"data": [[100.0, 533.4200000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[100.0, 533.4200000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122-Aggregated", "isController": false}, {"data": [[100.0, 487.53]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[100.0, 487.53]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111-Aggregated", "isController": false}, {"data": [[98.0, 589.75], [100.0, 574.7395833333337]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[99.92, 575.3400000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129-Aggregated", "isController": false}, {"data": [[100.0, 388.3599999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[100.0, 388.3599999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106-Aggregated", "isController": false}, {"data": [[45.0, 249.0], [44.0, 175.55555555555554], [46.0, 190.39999999999998], [3.0, 81.66666666666667], [55.0, 309.8], [58.0, 319.81818181818187], [65.0, 253.00000000000003], [69.0, 217.0], [75.0, 392.0], [73.0, 254.0], [82.0, 403.4], [81.0, 343.5], [87.0, 328.0], [84.0, 349.0], [90.0, 297.3333333333333], [95.0, 304.25], [93.0, 710.0], [92.0, 948.0], [98.0, 368.0], [96.0, 376.0], [100.0, 136.0], [12.0, 121.0], [13.0, 95.0], [19.0, 142.2], [23.0, 192.0], [24.0, 186.0], [27.0, 170.0], [28.0, 144.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[57.419999999999995, 268.84000000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156-Aggregated", "isController": false}, {"data": [[87.0, 387.0], [84.0, 309.0], [90.0, 338.0], [95.0, 283.7894736842106], [94.0, 416.0], [98.0, 374.7241379310345], [96.0, 503.4], [100.0, 414.2325581395349]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[97.82000000000001, 380.38]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138-Aggregated", "isController": false}, {"data": [[100.0, 471.46999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}, {"data": [[100.0, 471.46999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 9087.65, "minX": 1.6971987E12, "maxY": 1457296.1666666667, "series": [{"data": [[1.69719876E12, 1457296.1666666667], [1.6971987E12, 364177.2]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69719876E12, 58980.933333333334], [1.6971987E12, 9087.65]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69719876E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 53.0, "minX": 1.6971987E12, "maxY": 2585.5, "series": [{"data": [[1.69719876E12, 987.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[1.69719876E12, 333.54]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[1.69719876E12, 53.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[1.69719876E12, 534.48]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[1.69719876E12, 325.93999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[1.69719876E12, 381.08333333333354], [1.6971987E12, 179.25]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[1.69719876E12, 373.3400000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[1.69719876E12, 379.58000000000015]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[1.69719876E12, 342.43999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[1.69719876E12, 353.0299999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[1.69719876E12, 426.98]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[1.69719876E12, 356.36999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[1.69719876E12, 403.22999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[1.69719876E12, 547.8499999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[1.69719876E12, 704.46]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[1.69719876E12, 529.1000000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[1.6971987E12, 1080.1499999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[1.69719876E12, 354.09999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[1.69719876E12, 758.1199999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[1.69719876E12, 398.4500000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[1.69719876E12, 888.0], [1.6971987E12, 477.80412371134014]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[1.69719876E12, 443.78378378378386], [1.6971987E12, 302.2692307692307]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[1.6971987E12, 475.0999999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[1.69719876E12, 459.3456790123457], [1.6971987E12, 380.00000000000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[1.69719876E12, 481.86000000000007]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[1.69719876E12, 631.41]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[1.69719876E12, 516.6299999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[1.69719876E12, 282.86]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[1.69719876E12, 555.6600000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[1.69719876E12, 476.08000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[1.69719876E12, 655.0600000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[1.69719876E12, 413.08], [1.6971987E12, 471.97333333333324]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[1.69719876E12, 155.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-1", "isController": false}, {"data": [[1.69719876E12, 79.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-0", "isController": false}, {"data": [[1.69719876E12, 403.5], [1.6971987E12, 455.41489361702105]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[1.69719876E12, 324.73999999999995]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[1.69719876E12, 464.88000000000017]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[1.69719876E12, 440.09677419354836], [1.6971987E12, 368.421052631579]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[1.69719876E12, 414.1530612244897], [1.6971987E12, 91.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[1.69719876E12, 404.23000000000013]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[1.69719876E12, 472.90999999999997]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[1.69719876E12, 2585.5], [1.6971987E12, 526.6122448979588]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[1.69719876E12, 421.8247422680412], [1.6971987E12, 225.66666666666669]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[1.69719876E12, 571.6100000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[1.6971987E12, 518.24]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[1.69719876E12, 423.3793103448278], [1.6971987E12, 297.15384615384613]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[1.69719876E12, 474.31914893617017], [1.6971987E12, 358.2641509433962]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[1.69719876E12, 584.6700000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[1.69719876E12, 114.26]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[1.6971987E12, 468.39999999999986]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[1.69719876E12, 394.6145833333333], [1.6971987E12, 268.25]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[1.69719876E12, 533.1400000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[1.69719876E12, 424.9099999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[1.69719876E12, 371.13000000000005]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[1.69719876E12, 150.33999999999997]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[1.69719876E12, 143.66]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[1.69719876E12, 425.9000000000001], [1.6971987E12, 419.1333333333335]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[1.69719876E12, 92.71999999999996]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[1.69719876E12, 548.3699999999998]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[1.69719876E12, 430.78999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[1.69719876E12, 424.90625], [1.6971987E12, 358.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[1.6971987E12, 572.17]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[1.69719876E12, 494.27710843373507], [1.6971987E12, 392.5882352941177]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[1.69719876E12, 533.4200000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[1.69719876E12, 487.53]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[1.69719876E12, 575.3400000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[1.69719876E12, 397.7173913043477], [1.6971987E12, 280.75]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[1.69719876E12, 268.84000000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[1.69719876E12, 380.38]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[1.69719876E12, 504.61111111111103], [1.6971987E12, 452.82812500000006]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69719876E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 53.0, "minX": 1.6971987E12, "maxY": 987.0, "series": [{"data": [[1.69719876E12, 987.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[1.69719876E12, 333.54]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[1.69719876E12, 53.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[1.69719876E12, 471.93999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[1.69719876E12, 322.53999999999985]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[1.69719876E12, 381.07291666666686], [1.6971987E12, 179.25]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[1.69719876E12, 368.94]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[1.69719876E12, 377.64000000000016]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[1.69719876E12, 337.0099999999998]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[1.69719876E12, 346.64000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[1.69719876E12, 426.96000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[1.69719876E12, 349.1600000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[1.69719876E12, 398.0999999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[1.69719876E12, 436.78000000000026]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[1.69719876E12, 510.41999999999985]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[1.69719876E12, 417.18999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[1.6971987E12, 880.7900000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[1.69719876E12, 354.08000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[1.69719876E12, 566.2500000000003]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[1.69719876E12, 398.4500000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[1.69719876E12, 374.0], [1.6971987E12, 281.5463917525773]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[1.69719876E12, 432.17567567567573], [1.6971987E12, 296.69230769230774]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[1.6971987E12, 227.72999999999993]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[1.69719876E12, 412.56790123456796], [1.6971987E12, 363.84210526315786]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[1.69719876E12, 403.81]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[1.69719876E12, 451.42]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[1.69719876E12, 424.7299999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[1.69719876E12, 279.7699999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[1.69719876E12, 501.53]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[1.69719876E12, 470.82999999999987]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[1.69719876E12, 447.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[1.69719876E12, 230.64000000000001], [1.6971987E12, 296.70666666666654]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[1.69719876E12, 155.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-1", "isController": false}, {"data": [[1.69719876E12, 79.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-0", "isController": false}, {"data": [[1.69719876E12, 231.66666666666666], [1.6971987E12, 248.87234042553197]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[1.69719876E12, 323.0999999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[1.69719876E12, 438.8100000000002]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[1.69719876E12, 401.258064516129], [1.6971987E12, 331.18421052631584]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[1.69719876E12, 402.3673469387756], [1.6971987E12, 91.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[1.69719876E12, 397.08000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[1.69719876E12, 348.38999999999993]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[1.69719876E12, 322.5], [1.6971987E12, 310.68367346938777]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[1.69719876E12, 412.63917525773195], [1.6971987E12, 225.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[1.69719876E12, 487.2]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[1.6971987E12, 346.0399999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[1.69719876E12, 423.3793103448278], [1.6971987E12, 297.0769230769231]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[1.69719876E12, 393.8936170212766], [1.6971987E12, 331.62264150943395]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[1.69719876E12, 584.6700000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[1.69719876E12, 114.26]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[1.6971987E12, 279.68999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[1.69719876E12, 394.59375], [1.6971987E12, 268.25]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[1.69719876E12, 397.83]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[1.69719876E12, 402.72999999999996]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[1.69719876E12, 369.02000000000015]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[1.69719876E12, 150.33999999999997]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[1.69719876E12, 143.66]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[1.69719876E12, 291.2], [1.6971987E12, 260.6111111111111]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[1.69719876E12, 91.17000000000003]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[1.69719876E12, 547.3100000000002]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[1.69719876E12, 422.85]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[1.69719876E12, 390.4791666666665], [1.6971987E12, 217.75]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[1.6971987E12, 293.62999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[1.69719876E12, 439.56626506024105], [1.6971987E12, 315.94117647058823]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[1.69719876E12, 443.9899999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[1.69719876E12, 452.43999999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[1.69719876E12, 501.5899999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[1.69719876E12, 387.70652173913055], [1.6971987E12, 263.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[1.69719876E12, 265.5900000000001]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[1.69719876E12, 368.33000000000004]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[1.69719876E12, 273.36111111111114], [1.6971987E12, 259.65624999999994]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69719876E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6971987E12, "maxY": 912.5, "series": [{"data": [[1.69719876E12, 912.5]], "isOverall": false, "label": "Tenders_Page/tr/-116-0", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-116-1", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137", "isController": false}, {"data": [[1.6971987E12, 588.2399999999999]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103", "isController": false}, {"data": [[1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-1", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-117-0", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126", "isController": false}, {"data": [[1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99", "isController": false}, {"data": [[1.69719876E12, 486.5000000000001]], "isOverall": false, "label": "Tenders_Page/dns-query-120", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/dns-query-121", "isController": false}, {"data": [[1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-119", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-118", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/tr/-117", "isController": false}, {"data": [[1.69719876E12, 420.7400000000001]], "isOverall": false, "label": "Tenders_Page/tr/-116", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110", "isController": false}, {"data": [[1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156", "isController": false}, {"data": [[1.69719876E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138", "isController": false}, {"data": [[1.69719876E12, 0.0], [1.6971987E12, 0.0]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69719876E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 15.0, "minX": 1.6971987E12, "maxY": 4404.0, "series": [{"data": [[1.69719876E12, 4404.0], [1.6971987E12, 3735.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69719876E12, 715.0], [1.6971987E12, 1055.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69719876E12, 1275.0999999999976], [1.6971987E12, 2605.4000000000005]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69719876E12, 894.0999999999995], [1.6971987E12, 1478.5]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69719876E12, 15.0], [1.6971987E12, 46.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69719876E12, 401.0], [1.6971987E12, 365.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69719876E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 112.0, "minX": 22.0, "maxY": 877.0, "series": [{"data": [[95.0, 877.0], [112.0, 256.5], [113.0, 822.0], [115.0, 397.0], [123.0, 345.0], [124.0, 504.5], [127.0, 193.0], [129.0, 418.0], [132.0, 724.0], [145.0, 426.0], [153.0, 419.0], [162.0, 282.5], [164.0, 389.5], [169.0, 323.0], [190.0, 511.5], [186.0, 372.0], [195.0, 472.0], [197.0, 544.0], [201.0, 394.0], [203.0, 435.0], [202.0, 449.5], [212.0, 360.0], [215.0, 374.0], [209.0, 437.0], [226.0, 458.5], [224.0, 410.5], [230.0, 419.0], [236.0, 315.5], [247.0, 309.0], [263.0, 347.0], [318.0, 387.0], [22.0, 216.0], [31.0, 112.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 318.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 105.0, "minX": 22.0, "maxY": 752.0, "series": [{"data": [[95.0, 747.0], [112.0, 250.0], [113.0, 752.0], [115.0, 373.0], [123.0, 345.0], [124.0, 408.5], [127.0, 193.0], [129.0, 317.0], [132.0, 653.0], [145.0, 388.0], [153.0, 330.0], [162.0, 263.5], [164.0, 378.0], [169.0, 317.0], [190.0, 427.5], [186.0, 359.0], [195.0, 453.0], [197.0, 449.0], [201.0, 229.0], [203.0, 381.0], [202.0, 386.0], [212.0, 201.0], [215.0, 308.5], [209.0, 360.0], [226.0, 328.5], [224.0, 386.0], [230.0, 384.0], [236.0, 284.0], [247.0, 283.0], [263.0, 335.0], [318.0, 381.5], [22.0, 202.0], [31.0, 105.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 318.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 21.816666666666666, "minX": 1.6971987E12, "maxY": 88.28333333333333, "series": [{"data": [[1.69719876E12, 88.28333333333333], [1.6971987E12, 21.816666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69719876E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.6971987E12, "maxY": 89.9, "series": [{"data": [[1.69719876E12, 89.9], [1.6971987E12, 20.15]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69719876E12, 0.05]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69719876E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6971987E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/42.png-128-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/169.png-153-success", "isController": false}, {"data": [[1.69719876E12, 1.2333333333333334], [1.6971987E12, 0.43333333333333335]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/175.png-103-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/170.png-151-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/170.png-152-success", "isController": false}, {"data": [[1.69719876E12, 0.7833333333333333], [1.6971987E12, 0.8833333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/174.png-99-success", "isController": false}, {"data": [[1.69719876E12, 1.45], [1.6971987E12, 0.21666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/177.png-108-success", "isController": false}, {"data": [[1.69719876E12, 0.16666666666666666], [1.6971987E12, 1.5]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/174.png-98-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/45.png-141-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/44.png-127-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/42.png-139-success", "isController": false}, {"data": [[1.69719876E12, 1.6166666666666667], [1.6971987E12, 0.05]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/175.png-109-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/171.png-154-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-117-success", "isController": false}, {"data": [[1.6971987E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/175.png-93-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-119-success", "isController": false}, {"data": [[1.69719876E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/tr/-116-0-success", "isController": false}, {"data": [[1.69719876E12, 0.1], [1.6971987E12, 1.5666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/177.png-101-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/177.png-115-success", "isController": false}, {"data": [[1.69719876E12, 0.03333333333333333], [1.6971987E12, 1.6333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/175.png-91-success", "isController": false}, {"data": [[1.69719876E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-117-1-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/171.png-150-success", "isController": false}, {"data": [[1.69719876E12, 1.6333333333333333], [1.6971987E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/176.png-112-success", "isController": false}, {"data": [[1.69719876E12, 0.05], [1.6971987E12, 1.6166666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/177.png-97-success", "isController": false}, {"data": [[1.69719876E12, 0.6], [1.6971987E12, 1.0666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/174.png-100-success", "isController": false}, {"data": [[1.69719876E12, 1.6], [1.6971987E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/175.png-110-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/170.png-144-success", "isController": false}, {"data": [[1.69719876E12, 1.0333333333333334], [1.6971987E12, 0.6333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/298/175.png-104-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/171.png-143-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/dns-query-120-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/45.png-133-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/175.png-111-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/43.png-122-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/170.png-145-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/45.png-131-success", "isController": false}, {"data": [[1.69719876E12, 1.6], [1.6971987E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/299/177.png-113-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/169.png-146-success", "isController": false}, {"data": [[1.69719876E12, 1.6], [1.6971987E12, 0.06666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/177.png-114-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/43.png-134-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/44.png-123-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/171.png-156-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/74/45.png-129-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/171.png-149-success", "isController": false}, {"data": [[1.69719876E12, 0.03333333333333333]], "isOverall": false, "label": "Tenders_Page/tr/-116-1-success", "isController": false}, {"data": [[1.69719876E12, 1.3833333333333333], [1.6971987E12, 0.2833333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/176.png-105-success", "isController": false}, {"data": [[1.6971987E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/175.png-95-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-116-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/45.png-140-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/303/169.png-155-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/302/169.png-148-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/tr/-118-success", "isController": false}, {"data": [[1.69719876E12, 0.4166666666666667], [1.6971987E12, 1.25]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/177.png-102-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/301/170.png-142-success", "isController": false}, {"data": [[1.6971987E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/297/176.png-96-success", "isController": false}, {"data": [[1.69719876E12, 1.5333333333333334], [1.6971987E12, 0.13333333333333333]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/174.png-106-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/43.png-126-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/300/169.png-147-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/42.png-137-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/43.png-125-success", "isController": false}, {"data": [[1.6971987E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/296/176.png-94-success", "isController": false}, {"data": [[1.69719876E12, 1.35], [1.6971987E12, 0.31666666666666665]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/294/177.png-107-success", "isController": false}, {"data": [[1.69719876E12, 0.016666666666666666]], "isOverall": false, "label": "Tenders_Page/tr/-117-0-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/dns-query-121-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/75/42.png-132-success", "isController": false}, {"data": [[1.6971987E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/9/295/176.png-92-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/72/44.png-136-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/43.png-135-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/42.png-130-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/76/44.png-138-success", "isController": false}, {"data": [[1.69719876E12, 1.6666666666666667]], "isOverall": false, "label": "Tenders_Page/maps/streets/256/7/73/44.png-124-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69719876E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 20.15, "minX": 1.6971987E12, "maxY": 89.95, "series": [{"data": [[1.69719876E12, 89.95], [1.6971987E12, 20.15]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69719876E12, "title": "Total Transactions Per Second"}},
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
