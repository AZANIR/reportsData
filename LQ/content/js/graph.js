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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 95.0, "series": [{"data": [[0.0, 7.0], [100.0, 93.0]], "isOverall": false, "label": "/_next/image/-172", "isController": false}, {"data": [[0.0, 44.0], [100.0, 56.0]], "isOverall": false, "label": "/_next/image/-171", "isController": false}, {"data": [[0.0, 36.0], [300.0, 1.0], [600.0, 3.0], [700.0, 1.0], [200.0, 3.0], [100.0, 54.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "/_next/static/chunks/pages/privacy-policy-acad0aee1f8a2872.js-233", "isController": false}, {"data": [[0.0, 52.0], [100.0, 48.0]], "isOverall": false, "label": "/_next/image/-170", "isController": false}, {"data": [[300.0, 5.0], [100.0, 75.0], [400.0, 1.0], [200.0, 19.0]], "isOverall": false, "label": "/api/v2/documents/search-226", "isController": false}, {"data": [[300.0, 4.0], [200.0, 19.0], [100.0, 76.0], [400.0, 1.0]], "isOverall": false, "label": "/api/v2/documents/search-227", "isController": false}, {"data": [[600.0, 14.0], [200.0, 54.0], [100.0, 21.0], [800.0, 8.0], [500.0, 3.0]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-163", "isController": false}, {"data": [[0.0, 12.0], [600.0, 2.0], [100.0, 65.0], [200.0, 15.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "/_next/image/-206", "isController": false}, {"data": [[0.0, 12.0], [700.0, 1.0], [1500.0, 1.0], [100.0, 66.0], [800.0, 1.0], [200.0, 13.0], [900.0, 6.0]], "isOverall": false, "label": "/_next/image/-205", "isController": false}, {"data": [[2200.0, 1.0], [1100.0, 1.0], [300.0, 12.0], [600.0, 5.0], [1300.0, 1.0], [700.0, 8.0], [800.0, 4.0], [100.0, 12.0], [200.0, 44.0], [400.0, 8.0], [3800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "/_next/image/-249", "isController": false}, {"data": [[0.0, 7.0], [1100.0, 2.0], [1500.0, 1.0], [800.0, 4.0], [400.0, 2.0], [100.0, 79.0], [900.0, 2.0], [1000.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "/_next/image/-204", "isController": false}, {"data": [[0.0, 2.0], [300.0, 8.0], [2400.0, 1.0], [600.0, 2.0], [700.0, 3.0], [100.0, 44.0], [200.0, 33.0], [400.0, 1.0], [800.0, 1.0], [1800.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "/_next/image/-248", "isController": false}, {"data": [[0.0, 13.0], [1100.0, 5.0], [200.0, 16.0], [100.0, 66.0]], "isOverall": false, "label": "/_next/image/-203", "isController": false}, {"data": [[0.0, 3.0], [300.0, 9.0], [700.0, 1.0], [400.0, 9.0], [200.0, 20.0], [100.0, 54.0], [500.0, 4.0]], "isOverall": false, "label": "/_next/static/media/Spin.df15a301.svg-222", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 10.0], [600.0, 3.0], [700.0, 2.0], [400.0, 4.0], [200.0, 31.0], [100.0, 38.0], [800.0, 3.0], [900.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "/_next/image/-247", "isController": false}, {"data": [[0.0, 6.0], [600.0, 3.0], [2400.0, 2.0], [700.0, 9.0], [200.0, 9.0], [900.0, 5.0], [1000.0, 3.0], [1100.0, 4.0], [300.0, 2.0], [1200.0, 2.0], [100.0, 45.0], [1600.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "/_next/image/-209", "isController": false}, {"data": [[0.0, 3.0], [2300.0, 1.0], [600.0, 10.0], [300.0, 3.0], [2400.0, 1.0], [1300.0, 2.0], [700.0, 8.0], [100.0, 52.0], [200.0, 15.0], [400.0, 3.0], [800.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "/_next/image/-208", "isController": false}, {"data": [[0.0, 8.0], [300.0, 12.0], [100.0, 71.0], [200.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "/_next/image/-207", "isController": false}, {"data": [[0.0, 12.0], [200.0, 3.0], [100.0, 85.0]], "isOverall": false, "label": "/_next/image/-165", "isController": false}, {"data": [[0.0, 17.0], [300.0, 2.0], [700.0, 2.0], [800.0, 2.0], [200.0, 20.0], [100.0, 54.0], [400.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "/_next/static/chunks/pages/contacts-35642fc97e509742.js-228", "isController": false}, {"data": [[0.0, 17.0], [100.0, 39.0], [200.0, 44.0]], "isOverall": false, "label": "/_next/image/-162", "isController": false}, {"data": [[0.0, 30.0], [100.0, 70.0]], "isOverall": false, "label": "/_next/image/-169", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 1.0], [1300.0, 5.0], [1400.0, 1.0], [100.0, 80.0], [200.0, 5.0], [400.0, 2.0], [500.0, 5.0]], "isOverall": false, "label": "/_next/image/-202", "isController": false}, {"data": [[1100.0, 2.0], [300.0, 21.0], [1200.0, 3.0], [600.0, 3.0], [700.0, 1.0], [1400.0, 1.0], [400.0, 11.0], [200.0, 38.0], [100.0, 12.0], [800.0, 2.0], [1700.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "/_next/image/-246", "isController": false}, {"data": [[0.0, 27.0], [100.0, 73.0]], "isOverall": false, "label": "/_next/image/-168", "isController": false}, {"data": [[300.0, 2.0], [100.0, 55.0], [200.0, 37.0], [800.0, 5.0], [900.0, 1.0]], "isOverall": false, "label": "/_next/image/-201", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0], [200.0, 24.0], [800.0, 3.0], [900.0, 2.0], [1000.0, 2.0], [1100.0, 2.0], [300.0, 11.0], [400.0, 6.0], [100.0, 39.0], [1700.0, 1.0], [1800.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "/_next/image/-245", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 84.0], [200.0, 8.0], [500.0, 4.0]], "isOverall": false, "label": "/_next/image/-167", "isController": false}, {"data": [[0.0, 18.0], [1200.0, 3.0], [1300.0, 26.0], [1400.0, 3.0], [100.0, 36.0], [200.0, 7.0], [900.0, 1.0], [1800.0, 1.0], [1000.0, 5.0]], "isOverall": false, "label": "/_next/image/-200", "isController": false}, {"data": [[0.0, 48.0], [100.0, 45.0], [200.0, 7.0]], "isOverall": false, "label": "/_next/image/-166", "isController": false}, {"data": [[100.0, 69.0], [200.0, 31.0]], "isOverall": false, "label": "/_next/image/-161", "isController": false}, {"data": [[0.0, 18.0], [200.0, 10.0], [100.0, 72.0]], "isOverall": false, "label": "/_next/image/-160", "isController": false}, {"data": [[300.0, 16.0], [600.0, 4.0], [1300.0, 1.0], [200.0, 65.0], [400.0, 8.0], [100.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "/g/collect?v=2&tid=G-0RYFMW13ZL&gtm=45je3ab0&_p=2116546750&cid=1373326669.1697116895&ul=uk-ua&sr=1536x864&_eu=AEA&dl=https%3A%2F%2Fluxequality.letkabackend.click%2Fcase-studies%2F&dr=https%3A%2F%2Fluxequality.letkabackend.click%2F&sid=1697116895&sct=1&seg=1&dt=IT%20Case%20Studies%20%7C%20Luxe%20Quality&_s=2-223", "isController": false}, {"data": [[0.0, 2.0], [300.0, 11.0], [600.0, 30.0], [700.0, 3.0], [100.0, 6.0], [200.0, 11.0], [400.0, 32.0], [500.0, 5.0]], "isOverall": false, "label": "/_next/static/css/cbd65f856dbf3e21.css-215", "isController": false}, {"data": [[0.0, 22.0], [300.0, 4.0], [600.0, 1.0], [100.0, 65.0], [200.0, 7.0], [400.0, 1.0]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-251", "isController": false}, {"data": [[0.0, 6.0], [100.0, 48.0], [200.0, 46.0]], "isOverall": false, "label": "/_next/image/-159", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 3.0], [300.0, 20.0], [1200.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [400.0, 8.0], [100.0, 16.0], [200.0, 40.0], [800.0, 1.0], [900.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "/_next/image/-236", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [700.0, 1.0], [200.0, 15.0], [100.0, 80.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "/api/v2-224", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [700.0, 2.0], [100.0, 65.0], [200.0, 27.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "/_next/static/css/5d869858990e49ff.css-164", "isController": false}, {"data": [[0.0, 18.0], [100.0, 78.0], [200.0, 4.0]], "isOverall": false, "label": "/_next/image/-198", "isController": false}, {"data": [[0.0, 29.0], [100.0, 62.0], [800.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [1800.0, 3.0], [1900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "/_next/image/-197", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0], [600.0, 3.0], [700.0, 4.0], [200.0, 18.0], [100.0, 63.0], [800.0, 2.0]], "isOverall": false, "label": "/_next/image/-196", "isController": false}, {"data": [[0.0, 18.0], [1100.0, 12.0], [1200.0, 1.0], [100.0, 51.0], [200.0, 9.0], [1800.0, 3.0], [1900.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "/_next/image/-195", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 55.0], [1200.0, 1.0], [700.0, 24.0], [800.0, 5.0], [900.0, 4.0], [500.0, 10.0]], "isOverall": false, "label": "/api/v2-225", "isController": false}, {"data": [[0.0, 34.0], [100.0, 33.0], [200.0, 33.0]], "isOverall": false, "label": "/_next/image/-158", "isController": false}, {"data": [[600.0, 3.0], [2500.0, 1.0], [700.0, 1.0], [200.0, 35.0], [800.0, 4.0], [900.0, 3.0], [1000.0, 1.0], [1100.0, 2.0], [300.0, 28.0], [1200.0, 1.0], [1300.0, 1.0], [400.0, 12.0], [100.0, 5.0], [500.0, 3.0]], "isOverall": false, "label": "/_next/image/-235", "isController": false}, {"data": [[300.0, 63.0], [200.0, 9.0], [400.0, 25.0], [500.0, 3.0]], "isOverall": false, "label": "/_next/image/-157", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [300.0, 8.0], [400.0, 6.0], [200.0, 15.0], [100.0, 65.0], [500.0, 3.0]], "isOverall": false, "label": "/_next/static/chunks/pages/case-studies/%5Buid%5D-0235c985b6686f83.js-221", "isController": false}, {"data": [[0.0, 27.0], [300.0, 2.0], [100.0, 65.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-252", "isController": false}, {"data": [[0.0, 11.0], [300.0, 5.0], [100.0, 52.0], [200.0, 31.0], [500.0, 1.0]], "isOverall": false, "label": "/_next/image/-199", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [600.0, 2.0], [2500.0, 1.0], [700.0, 20.0], [1500.0, 1.0], [100.0, 20.0], [200.0, 13.0], [400.0, 29.0], [800.0, 1.0], [500.0, 9.0], [2000.0, 1.0]], "isOverall": false, "label": "/_next/static/css/a6f7e359f7dbdb6d.css-214", "isController": false}, {"data": [[0.0, 13.0], [300.0, 5.0], [600.0, 1.0], [700.0, 2.0], [200.0, 17.0], [100.0, 60.0], [500.0, 2.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/healthcare-bcc367f49e962b69.js-229", "isController": false}, {"data": [[0.0, 38.0], [300.0, 1.0], [100.0, 51.0], [200.0, 10.0]], "isOverall": false, "label": "/_next/image/-190", "isController": false}, {"data": [[300.0, 1.0], [100.0, 85.0], [200.0, 12.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "/api/v2/documents/search-243", "isController": false}, {"data": [[0.0, 11.0], [300.0, 2.0], [600.0, 1.0], [200.0, 15.0], [100.0, 62.0], [400.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/e-commerce-eaab52b163b20c61.js-231", "isController": false}, {"data": [[300.0, 6.0], [700.0, 1.0], [200.0, 11.0], [100.0, 82.0]], "isOverall": false, "label": "/api/v2/documents/search-244", "isController": false}, {"data": [[0.0, 19.0], [300.0, 2.0], [600.0, 6.0], [100.0, 58.0], [400.0, 3.0], [500.0, 12.0]], "isOverall": false, "label": "/_next/image/-194", "isController": false}, {"data": [[700.0, 1.0], [800.0, 1.0], [2900.0, 1.0], [3400.0, 2.0], [3700.0, 2.0], [3600.0, 1.0], [3800.0, 2.0], [4600.0, 1.0], [5400.0, 1.0], [5500.0, 1.0], [5700.0, 2.0], [6200.0, 1.0], [6600.0, 1.0], [6900.0, 1.0], [6800.0, 2.0], [6700.0, 1.0], [7000.0, 1.0], [7100.0, 2.0], [7300.0, 1.0], [7400.0, 1.0], [7200.0, 1.0], [7500.0, 1.0], [7800.0, 1.0], [7700.0, 1.0], [8100.0, 2.0], [8200.0, 1.0], [8300.0, 1.0], [9100.0, 1.0], [8900.0, 1.0], [9400.0, 1.0], [9700.0, 3.0], [9300.0, 3.0], [9600.0, 1.0], [9800.0, 1.0], [10000.0, 2.0], [10200.0, 2.0], [9900.0, 1.0], [10700.0, 1.0], [10600.0, 1.0], [10300.0, 1.0], [10500.0, 1.0], [10800.0, 1.0], [11500.0, 1.0], [11300.0, 2.0], [11800.0, 1.0], [12200.0, 1.0], [12700.0, 1.0], [12900.0, 2.0], [13300.0, 1.0], [13100.0, 3.0], [13000.0, 2.0], [13700.0, 3.0], [13600.0, 1.0], [13800.0, 1.0], [13500.0, 1.0], [14100.0, 1.0], [13900.0, 1.0], [14300.0, 1.0], [14500.0, 2.0], [14700.0, 1.0], [14400.0, 1.0], [14600.0, 2.0], [15600.0, 1.0], [15700.0, 1.0], [15500.0, 1.0], [16000.0, 1.0], [15900.0, 1.0], [16700.0, 2.0], [16500.0, 1.0], [16800.0, 1.0], [17000.0, 1.0], [17900.0, 2.0], [17500.0, 1.0], [18100.0, 1.0], [19000.0, 1.0], [18800.0, 1.0]], "isOverall": false, "label": "/_next/static/chunks/797-18c400db763eb22a.js-213", "isController": false}, {"data": [[0.0, 2.0], [300.0, 5.0], [100.0, 66.0], [200.0, 22.0], [400.0, 5.0]], "isOverall": false, "label": "/_next/image/-193", "isController": false}, {"data": [[0.0, 13.0], [1100.0, 2.0], [1200.0, 3.0], [600.0, 1.0], [100.0, 78.0], [800.0, 3.0]], "isOverall": false, "label": "/_next/image/-192", "isController": false}, {"data": [[0.0, 10.0], [1100.0, 1.0], [300.0, 20.0], [100.0, 61.0], [200.0, 5.0], [900.0, 3.0]], "isOverall": false, "label": "/_next/image/-191", "isController": false}, {"data": [[0.0, 95.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "/success.txt-240", "isController": false}, {"data": [[0.0, 95.0], [300.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "/success.txt-241", "isController": false}, {"data": [[600.0, 4.0], [700.0, 8.0], [800.0, 9.0], [900.0, 12.0], [1000.0, 5.0], [1100.0, 7.0], [1200.0, 4.0], [1300.0, 6.0], [1400.0, 6.0], [1500.0, 4.0], [1600.0, 2.0], [1700.0, 5.0], [1800.0, 1.0], [1900.0, 4.0], [2000.0, 4.0], [2100.0, 3.0], [2300.0, 1.0], [2400.0, 2.0], [2500.0, 1.0], [2600.0, 1.0], [4000.0, 1.0], [4100.0, 1.0], [5000.0, 1.0], [5300.0, 1.0], [5700.0, 1.0], [400.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf-217", "isController": false}, {"data": [[0.0, 20.0], [300.0, 4.0], [200.0, 10.0], [100.0, 66.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketplace-77437c68984ecd13.js-232", "isController": false}, {"data": [[0.0, 18.0], [300.0, 2.0], [100.0, 80.0]], "isOverall": false, "label": "/_next/image/-187", "isController": false}, {"data": [[0.0, 28.0], [300.0, 20.0], [100.0, 52.0]], "isOverall": false, "label": "/_next/image/-186", "isController": false}, {"data": [[0.0, 28.0], [300.0, 3.0], [100.0, 66.0], [200.0, 3.0]], "isOverall": false, "label": "/_next/image/-185", "isController": false}, {"data": [[0.0, 35.0], [100.0, 65.0]], "isOverall": false, "label": "/_next/image/-184", "isController": false}, {"data": [[0.0, 14.0], [100.0, 86.0]], "isOverall": false, "label": "/_next/image/-189", "isController": false}, {"data": [[0.0, 10.0], [300.0, 7.0], [100.0, 82.0], [200.0, 1.0]], "isOverall": false, "label": "/_next/image/-188", "isController": false}, {"data": [[0.0, 10.0], [300.0, 3.0], [100.0, 70.0], [200.0, 12.0], [400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "/_next/static/css/59ae46ebdb9b2558.css-238", "isController": false}, {"data": [[0.0, 17.0], [300.0, 4.0], [100.0, 78.0], [200.0, 1.0]], "isOverall": false, "label": "/_next/image/-183", "isController": false}, {"data": [[0.0, 36.0], [100.0, 64.0]], "isOverall": false, "label": "/_next/image/-182", "isController": false}, {"data": [[0.0, 34.0], [100.0, 66.0]], "isOverall": false, "label": "/_next/image/-181", "isController": false}, {"data": [[0.0, 56.0], [100.0, 44.0]], "isOverall": false, "label": "/_next/image/-180", "isController": false}, {"data": [[0.0, 12.0], [300.0, 9.0], [600.0, 1.0], [700.0, 1.0], [200.0, 11.0], [100.0, 61.0], [400.0, 5.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/fintech-2922fd056459d217.js-230", "isController": false}, {"data": [[200.0, 9.0], [100.0, 91.0]], "isOverall": false, "label": "/api/v2-242", "isController": false}, {"data": [[0.0, 2.0], [600.0, 13.0], [700.0, 4.0], [200.0, 19.0], [800.0, 3.0], [900.0, 4.0], [1000.0, 1.0], [1100.0, 3.0], [300.0, 5.0], [1300.0, 1.0], [100.0, 32.0], [400.0, 5.0], [500.0, 8.0]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-211", "isController": false}, {"data": [[600.0, 3.0], [700.0, 2.0], [200.0, 26.0], [800.0, 4.0], [3500.0, 1.0], [900.0, 3.0], [3900.0, 1.0], [1000.0, 5.0], [1100.0, 3.0], [300.0, 16.0], [1200.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [1600.0, 2.0], [400.0, 19.0], [100.0, 7.0], [500.0, 4.0]], "isOverall": false, "label": "/_next/image/-219", "isController": false}, {"data": [[600.0, 1.0], [700.0, 7.0], [200.0, 16.0], [800.0, 5.0], [3500.0, 1.0], [900.0, 3.0], [1000.0, 2.0], [1100.0, 2.0], [300.0, 25.0], [1200.0, 1.0], [1300.0, 2.0], [1500.0, 1.0], [400.0, 14.0], [100.0, 5.0], [1600.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [500.0, 12.0]], "isOverall": false, "label": "/_next/image/-218", "isController": false}, {"data": [[300.0, 17.0], [600.0, 2.0], [400.0, 5.0], [200.0, 69.0], [100.0, 4.0], [500.0, 3.0]], "isOverall": false, "label": "/v4/fullHashes:find-234", "isController": false}, {"data": [[0.0, 26.0], [100.0, 74.0]], "isOverall": false, "label": "/_next/image/-176", "isController": false}, {"data": [[0.0, 62.0], [100.0, 38.0]], "isOverall": false, "label": "/_next/image/-175", "isController": false}, {"data": [[300.0, 13.0], [600.0, 5.0], [700.0, 1.0], [200.0, 46.0], [400.0, 6.0], [100.0, 28.0], [500.0, 1.0]], "isOverall": false, "label": "/-220", "isController": false}, {"data": [[0.0, 12.0], [200.0, 13.0], [100.0, 72.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "/_next/static/css/20a83c45c1ae9f97.css-237", "isController": false}, {"data": [[0.0, 36.0], [100.0, 63.0], [200.0, 1.0]], "isOverall": false, "label": "/_next/image/-174", "isController": false}, {"data": [[0.0, 10.0], [100.0, 82.0], [200.0, 8.0]], "isOverall": false, "label": "/_next/image/-173", "isController": false}, {"data": [[0.0, 1.0], [300.0, 11.0], [600.0, 8.0], [700.0, 2.0], [100.0, 36.0], [400.0, 6.0], [200.0, 32.0], [800.0, 1.0], [1800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "/_next/image/-250", "isController": false}, {"data": [[0.0, 18.0], [100.0, 72.0], [200.0, 10.0]], "isOverall": false, "label": "/_next/image/-179", "isController": false}, {"data": [[0.0, 14.0], [600.0, 6.0], [300.0, 13.0], [700.0, 2.0], [100.0, 22.0], [200.0, 21.0], [400.0, 17.0], [800.0, 1.0], [500.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "/_next/image/-212", "isController": false}, {"data": [[0.0, 14.0], [100.0, 86.0]], "isOverall": false, "label": "/_next/image/-178", "isController": false}, {"data": [[0.0, 61.0], [300.0, 2.0], [100.0, 37.0]], "isOverall": false, "label": "/canonical.html-239", "isController": false}, {"data": [[0.0, 15.0], [100.0, 85.0]], "isOverall": false, "label": "/_next/image/-177", "isController": false}, {"data": [[0.0, 12.0], [2300.0, 1.0], [600.0, 6.0], [2400.0, 1.0], [700.0, 8.0], [200.0, 3.0], [800.0, 1.0], [900.0, 3.0], [3600.0, 1.0], [1000.0, 1.0], [1100.0, 2.0], [300.0, 5.0], [1300.0, 2.0], [1400.0, 2.0], [100.0, 39.0], [400.0, 5.0], [1600.0, 3.0], [500.0, 4.0], [2000.0, 1.0]], "isOverall": false, "label": "/_next/image/-210", "isController": false}, {"data": [[0.0, 6.0], [1100.0, 1.0], [300.0, 7.0], [600.0, 4.0], [1300.0, 1.0], [700.0, 8.0], [200.0, 21.0], [100.0, 5.0], [800.0, 8.0], [400.0, 13.0], [900.0, 1.0], [500.0, 25.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketing-c2c36989b4610793.js-216", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 19000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 100.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 8471.0, "series": [{"data": [[0.0, 8471.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 846.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 183.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [[3.0, 100.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 91.15697916666689, "minX": 1.69711698E12, "maxY": 91.15697916666689, "series": [{"data": [[1.69711698E12, 91.15697916666689]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711698E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 27.0, "minX": 1.0, "maxY": 16848.0, "series": [{"data": [[100.0, 131.46000000000004]], "isOverall": false, "label": "/_next/image/-172", "isController": false}, {"data": [[100.0, 131.46000000000004]], "isOverall": false, "label": "/_next/image/-172-Aggregated", "isController": false}, {"data": [[100.0, 108.52999999999999]], "isOverall": false, "label": "/_next/image/-171", "isController": false}, {"data": [[100.0, 108.52999999999999]], "isOverall": false, "label": "/_next/image/-171-Aggregated", "isController": false}, {"data": [[39.0, 119.0], [41.0, 419.5], [44.0, 73.0], [51.0, 136.0], [53.0, 94.0], [57.0, 104.0], [60.0, 294.0], [63.0, 80.0], [62.0, 95.0], [66.0, 124.66666666666667], [70.0, 144.77777777777777], [69.0, 82.0], [68.0, 106.0], [79.0, 142.2], [78.0, 81.0], [77.0, 86.0], [76.0, 120.33333333333333], [82.0, 236.0], [80.0, 117.5], [86.0, 82.5], [84.0, 92.0], [88.0, 108.0], [95.0, 125.0], [93.0, 133.5], [92.0, 176.5], [99.0, 96.38461538461537], [100.0, 217.40000000000003]], "isOverall": false, "label": "/_next/static/chunks/pages/privacy-policy-acad0aee1f8a2872.js-233", "isController": false}, {"data": [[83.00999999999998, 158.77000000000004]], "isOverall": false, "label": "/_next/static/chunks/pages/privacy-policy-acad0aee1f8a2872.js-233-Aggregated", "isController": false}, {"data": [[100.0, 116.88999999999996]], "isOverall": false, "label": "/_next/image/-170", "isController": false}, {"data": [[100.0, 116.88999999999996]], "isOverall": false, "label": "/_next/image/-170-Aggregated", "isController": false}, {"data": [[52.0, 154.0], [54.0, 169.5], [58.0, 170.0], [61.0, 143.0], [63.0, 164.0], [64.0, 145.0], [70.0, 159.75], [79.0, 153.33333333333334], [78.0, 147.0], [77.0, 156.71428571428572], [76.0, 151.75], [83.0, 301.5], [82.0, 219.8], [80.0, 267.5], [86.0, 169.0], [84.0, 149.0], [90.0, 190.0], [88.0, 170.25], [95.0, 160.0], [93.0, 177.5], [92.0, 165.0], [99.0, 168.0], [98.0, 166.0], [96.0, 155.0], [100.0, 199.87179487179486]], "isOverall": false, "label": "/api/v2/documents/search-226", "isController": false}, {"data": [[88.18000000000002, 186.19]], "isOverall": false, "label": "/api/v2/documents/search-226-Aggregated", "isController": false}, {"data": [[51.0, 170.0], [52.0, 181.5], [57.0, 192.0], [58.0, 189.0], [61.0, 150.0], [70.0, 161.57142857142856], [68.0, 169.0], [79.0, 154.0], [78.0, 164.0], [77.0, 164.88888888888889], [76.0, 149.0], [83.0, 302.0], [82.0, 228.2], [80.0, 215.5], [86.0, 164.5], [84.0, 155.0], [90.0, 194.0], [88.0, 192.5], [95.0, 159.0], [93.0, 171.5], [92.0, 189.0], [99.0, 193.0], [98.0, 162.0], [97.0, 152.0], [100.0, 203.71052631578942]], "isOverall": false, "label": "/api/v2/documents/search-227", "isController": false}, {"data": [[87.32000000000005, 188.74]], "isOverall": false, "label": "/api/v2/documents/search-227-Aggregated", "isController": false}, {"data": [[100.0, 343.20000000000005]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-163", "isController": false}, {"data": [[100.0, 343.20000000000005]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-163-Aggregated", "isController": false}, {"data": [[100.0, 184.61999999999995]], "isOverall": false, "label": "/_next/image/-206", "isController": false}, {"data": [[100.0, 184.61999999999995]], "isOverall": false, "label": "/_next/image/-206-Aggregated", "isController": false}, {"data": [[100.0, 212.18]], "isOverall": false, "label": "/_next/image/-205", "isController": false}, {"data": [[100.0, 212.18]], "isOverall": false, "label": "/_next/image/-205-Aggregated", "isController": false}, {"data": [[39.0, 200.0], [38.0, 255.0], [41.0, 239.33333333333334], [44.0, 154.0], [51.0, 287.75], [53.0, 249.8], [52.0, 294.0], [54.0, 175.0], [57.0, 293.3333333333333], [56.0, 617.0], [58.0, 204.0], [61.0, 171.0], [63.0, 187.0], [62.0, 245.0], [70.0, 323.0], [68.0, 265.0], [79.0, 496.3333333333333], [77.0, 676.0], [76.0, 476.8], [82.0, 397.0], [80.0, 435.0], [86.0, 682.5], [84.0, 245.0], [95.0, 228.0], [93.0, 958.3333333333334], [92.0, 306.0], [99.0, 1007.5], [97.0, 377.5], [6.0, 636.0], [100.0, 571.25], [7.0, 516.0], [8.0, 319.0], [12.0, 231.0], [19.0, 671.0], [21.0, 264.25], [22.0, 253.0], [24.0, 226.66666666666666], [26.0, 599.0], [27.0, 525.5], [29.0, 289.0], [30.0, 267.5]], "isOverall": false, "label": "/_next/image/-249", "isController": false}, {"data": [[58.12000000000001, 438.73]], "isOverall": false, "label": "/_next/image/-249-Aggregated", "isController": false}, {"data": [[100.0, 237.04000000000008]], "isOverall": false, "label": "/_next/image/-204", "isController": false}, {"data": [[100.0, 237.04000000000008]], "isOverall": false, "label": "/_next/image/-204-Aggregated", "isController": false}, {"data": [[32.0, 170.0], [38.0, 100.5], [41.0, 262.55555555555554], [40.0, 709.0], [51.0, 245.0], [53.0, 198.5], [52.0, 154.5], [57.0, 176.0], [61.0, 377.0], [60.0, 144.0], [4.0, 183.0], [71.0, 294.0], [70.0, 375.0], [68.0, 174.75], [79.0, 342.57142857142856], [78.0, 169.0], [77.0, 714.0], [76.0, 295.4], [84.0, 212.33333333333334], [88.0, 264.0], [95.0, 205.0], [93.0, 280.0], [92.0, 386.0], [99.0, 777.25], [98.0, 198.0], [97.0, 374.0], [6.0, 381.3333333333333], [100.0, 992.5], [7.0, 239.0], [11.0, 189.0], [15.0, 160.0], [19.0, 208.0], [21.0, 570.0], [22.0, 174.6], [24.0, 174.33333333333334], [26.0, 211.0], [29.0, 187.0], [30.0, 218.0], [31.0, 214.0]], "isOverall": false, "label": "/_next/image/-248", "isController": false}, {"data": [[56.19000000000004, 294.59999999999997]], "isOverall": false, "label": "/_next/image/-248-Aggregated", "isController": false}, {"data": [[100.0, 203.81]], "isOverall": false, "label": "/_next/image/-203", "isController": false}, {"data": [[100.0, 203.81]], "isOverall": false, "label": "/_next/image/-203-Aggregated", "isController": false}, {"data": [[70.0, 130.0], [79.0, 176.33333333333331], [77.0, 105.0], [76.0, 145.5], [83.0, 477.3333333333333], [82.0, 205.66666666666666], [80.0, 271.0], [86.0, 121.5], [84.0, 113.0], [91.0, 169.0], [88.0, 140.5], [95.0, 129.2], [93.0, 158.0], [92.0, 334.0], [99.0, 134.875], [97.0, 224.0], [96.0, 173.0], [100.0, 303.4883720930232]], "isOverall": false, "label": "/_next/static/media/Spin.df15a301.svg-222", "isController": false}, {"data": [[92.53999999999999, 233.60999999999996]], "isOverall": false, "label": "/_next/static/media/Spin.df15a301.svg-222-Aggregated", "isController": false}, {"data": [[32.0, 450.16666666666663], [39.0, 261.0], [38.0, 903.0], [41.0, 306.5], [40.0, 192.0], [42.0, 303.0], [44.0, 180.0], [51.0, 244.0], [53.0, 397.5], [52.0, 163.0], [57.0, 208.16666666666669], [56.0, 403.0], [61.0, 165.33333333333334], [63.0, 203.0], [70.0, 183.75], [68.0, 210.57142857142858], [79.0, 546.3333333333334], [77.0, 176.0], [76.0, 205.75], [82.0, 405.5], [80.0, 542.0], [86.0, 173.0], [84.0, 182.25], [88.0, 870.6666666666666], [95.0, 214.5], [93.0, 268.0], [92.0, 225.0], [99.0, 271.0], [97.0, 336.5], [100.0, 373.75], [11.0, 200.0], [12.0, 136.0], [24.0, 133.0], [27.0, 255.0], [31.0, 763.0]], "isOverall": false, "label": "/_next/image/-247", "isController": false}, {"data": [[66.27000000000002, 312.20000000000005]], "isOverall": false, "label": "/_next/image/-247-Aggregated", "isController": false}, {"data": [[100.0, 475.84]], "isOverall": false, "label": "/_next/image/-209", "isController": false}, {"data": [[100.0, 475.84]], "isOverall": false, "label": "/_next/image/-209-Aggregated", "isController": false}, {"data": [[100.0, 358.7499999999999]], "isOverall": false, "label": "/_next/image/-208", "isController": false}, {"data": [[100.0, 358.7499999999999]], "isOverall": false, "label": "/_next/image/-208-Aggregated", "isController": false}, {"data": [[100.0, 177.94000000000005]], "isOverall": false, "label": "/_next/image/-207", "isController": false}, {"data": [[100.0, 177.94000000000005]], "isOverall": false, "label": "/_next/image/-207-Aggregated", "isController": false}, {"data": [[100.0, 124.75999999999998]], "isOverall": false, "label": "/_next/image/-165", "isController": false}, {"data": [[100.0, 124.75999999999998]], "isOverall": false, "label": "/_next/image/-165-Aggregated", "isController": false}, {"data": [[51.0, 245.66666666666669], [57.0, 131.0], [56.0, 156.0], [60.0, 127.5], [66.0, 124.0], [71.0, 83.0], [70.0, 94.0], [68.0, 96.5], [79.0, 110.5], [77.0, 121.33333333333333], [76.0, 118.83333333333333], [82.0, 288.6], [80.0, 147.0], [86.0, 131.0], [84.0, 91.25], [88.0, 111.0], [95.0, 781.0], [93.0, 134.5], [92.0, 223.4], [99.0, 111.0], [98.0, 145.0], [97.0, 188.0], [96.0, 169.0], [100.0, 255.94736842105266]], "isOverall": false, "label": "/_next/static/chunks/pages/contacts-35642fc97e509742.js-228", "isController": false}, {"data": [[86.68000000000002, 195.64999999999998]], "isOverall": false, "label": "/_next/static/chunks/pages/contacts-35642fc97e509742.js-228-Aggregated", "isController": false}, {"data": [[56.0, 125.0], [62.0, 67.0], [63.0, 70.0], [64.0, 88.5], [66.0, 84.0], [68.0, 74.66666666666667], [69.0, 78.0], [75.0, 98.0], [76.0, 101.0], [78.0, 105.0], [95.0, 239.0], [96.0, 192.0], [100.0, 196.85937500000006]], "isOverall": false, "label": "/_next/image/-162", "isController": false}, {"data": [[91.62999999999998, 176.13000000000002]], "isOverall": false, "label": "/_next/image/-162-Aggregated", "isController": false}, {"data": [[100.0, 123.9]], "isOverall": false, "label": "/_next/image/-169", "isController": false}, {"data": [[100.0, 123.9]], "isOverall": false, "label": "/_next/image/-169-Aggregated", "isController": false}, {"data": [[100.0, 262.02000000000004]], "isOverall": false, "label": "/_next/image/-202", "isController": false}, {"data": [[100.0, 262.02000000000004]], "isOverall": false, "label": "/_next/image/-202-Aggregated", "isController": false}, {"data": [[39.0, 389.8], [41.0, 150.0], [40.0, 250.6], [51.0, 308.1428571428571], [52.0, 228.33333333333334], [57.0, 282.66666666666663], [56.0, 436.0], [61.0, 215.8], [63.0, 196.0], [71.0, 572.0], [70.0, 221.0], [68.0, 230.0], [79.0, 569.5], [77.0, 711.0], [76.0, 204.0], [82.0, 716.0], [80.0, 763.6666666666666], [88.0, 312.0], [95.0, 333.5], [93.0, 803.3333333333334], [99.0, 267.6666666666667], [97.0, 738.0], [96.0, 547.0], [6.0, 674.0], [100.0, 366.0], [7.0, 307.0], [8.0, 226.0], [12.0, 246.0], [19.0, 270.5], [24.0, 344.6666666666667], [27.0, 235.0], [29.0, 428.0], [30.0, 269.0]], "isOverall": false, "label": "/_next/image/-246", "isController": false}, {"data": [[61.34000000000002, 398.48]], "isOverall": false, "label": "/_next/image/-246-Aggregated", "isController": false}, {"data": [[100.0, 137.37000000000003]], "isOverall": false, "label": "/_next/image/-168", "isController": false}, {"data": [[100.0, 137.37000000000003]], "isOverall": false, "label": "/_next/image/-168-Aggregated", "isController": false}, {"data": [[100.0, 230.08999999999992]], "isOverall": false, "label": "/_next/image/-201", "isController": false}, {"data": [[100.0, 230.08999999999992]], "isOverall": false, "label": "/_next/image/-201-Aggregated", "isController": false}, {"data": [[32.0, 200.0], [39.0, 259.0], [41.0, 202.27272727272725], [49.0, 105.0], [51.0, 501.5], [53.0, 200.33333333333334], [52.0, 236.33333333333334], [58.0, 342.5], [61.0, 249.5], [60.0, 570.0], [63.0, 191.25], [70.0, 194.0], [68.0, 159.5], [79.0, 196.5], [77.0, 500.5], [83.0, 701.5], [82.0, 709.25], [80.0, 534.4], [84.0, 197.5], [90.0, 202.0], [88.0, 861.0], [95.0, 191.5], [92.0, 930.0], [99.0, 1119.6], [98.0, 392.5], [97.0, 362.0], [96.0, 170.0], [100.0, 372.375], [7.0, 313.0], [8.0, 175.0], [11.0, 218.0], [19.0, 718.0], [22.0, 308.5], [29.0, 228.375], [30.0, 272.0]], "isOverall": false, "label": "/_next/image/-245", "isController": false}, {"data": [[63.56999999999999, 364.7300000000003]], "isOverall": false, "label": "/_next/image/-245-Aggregated", "isController": false}, {"data": [[100.0, 149.3]], "isOverall": false, "label": "/_next/image/-167", "isController": false}, {"data": [[100.0, 149.3]], "isOverall": false, "label": "/_next/image/-167-Aggregated", "isController": false}, {"data": [[100.0, 596.6899999999997]], "isOverall": false, "label": "/_next/image/-200", "isController": false}, {"data": [[100.0, 596.6899999999997]], "isOverall": false, "label": "/_next/image/-200-Aggregated", "isController": false}, {"data": [[100.0, 114.59000000000002]], "isOverall": false, "label": "/_next/image/-166", "isController": false}, {"data": [[100.0, 114.59000000000002]], "isOverall": false, "label": "/_next/image/-166-Aggregated", "isController": false}, {"data": [[76.0, 105.66666666666667], [97.0, 239.71428571428572], [100.0, 178.8]], "isOverall": false, "label": "/_next/image/-161", "isController": false}, {"data": [[99.06999999999996, 180.87000000000006]], "isOverall": false, "label": "/_next/image/-161-Aggregated", "isController": false}, {"data": [[99.0, 245.33333333333334], [100.0, 149.5360824742268]], "isOverall": false, "label": "/_next/image/-160", "isController": false}, {"data": [[99.96999999999998, 152.41000000000003]], "isOverall": false, "label": "/_next/image/-160-Aggregated", "isController": false}, {"data": [[63.0, 572.0], [70.0, 246.0], [79.0, 265.6], [78.0, 185.0], [77.0, 272.5], [76.0, 255.0], [82.0, 544.3333333333333], [80.0, 572.7142857142857], [84.0, 293.5], [88.0, 258.6], [95.0, 242.5], [93.0, 232.16666666666666], [92.0, 272.5], [99.0, 262.6], [98.0, 238.0], [97.0, 303.0], [96.0, 657.0], [100.0, 275.34883720930236]], "isOverall": false, "label": "/g/collect?v=2&tid=G-0RYFMW13ZL&gtm=45je3ab0&_p=2116546750&cid=1373326669.1697116895&ul=uk-ua&sr=1536x864&_eu=AEA&dl=https%3A%2F%2Fluxequality.letkabackend.click%2Fcase-studies%2F&dr=https%3A%2F%2Fluxequality.letkabackend.click%2F&sid=1697116895&sct=1&seg=1&dt=IT%20Case%20Studies%20%7C%20Luxe%20Quality&_s=2-223", "isController": false}, {"data": [[91.52, 311.1599999999998]], "isOverall": false, "label": "/g/collect?v=2&tid=G-0RYFMW13ZL&gtm=45je3ab0&_p=2116546750&cid=1373326669.1697116895&ul=uk-ua&sr=1536x864&_eu=AEA&dl=https%3A%2F%2Fluxequality.letkabackend.click%2Fcase-studies%2F&dr=https%3A%2F%2Fluxequality.letkabackend.click%2F&sid=1697116895&sct=1&seg=1&dt=IT%20Case%20Studies%20%7C%20Luxe%20Quality&_s=2-223-Aggregated", "isController": false}, {"data": [[100.0, 467.71]], "isOverall": false, "label": "/_next/static/css/cbd65f856dbf3e21.css-215", "isController": false}, {"data": [[100.0, 467.71]], "isOverall": false, "label": "/_next/static/css/cbd65f856dbf3e21.css-215-Aggregated", "isController": false}, {"data": [[32.0, 121.0], [34.0, 148.0], [36.0, 146.0], [39.0, 157.14285714285714], [41.0, 122.0], [40.0, 177.0], [46.0, 122.0], [49.0, 105.0], [3.0, 69.0], [51.0, 149.42857142857142], [53.0, 123.0], [54.0, 172.0], [57.0, 165.0], [58.0, 107.0], [61.0, 600.0], [60.0, 271.0], [63.0, 150.0], [66.0, 135.0], [4.0, 114.0], [70.0, 163.5], [68.0, 142.0], [79.0, 142.0], [77.0, 164.28571428571428], [82.0, 213.0], [86.0, 142.66666666666666], [84.0, 102.0], [91.0, 164.0], [93.0, 168.0], [92.0, 172.4], [99.0, 138.0], [98.0, 240.0], [97.0, 256.0], [96.0, 195.0], [6.0, 204.5], [100.0, 140.0], [7.0, 213.0], [8.0, 141.0], [12.0, 80.0], [16.0, 108.0], [1.0, 66.0], [17.0, 106.5], [19.0, 108.5], [21.0, 77.75], [22.0, 117.0], [24.0, 74.0], [29.0, 147.2]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-251", "isController": false}, {"data": [[52.30000000000002, 151.74000000000012]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-251-Aggregated", "isController": false}, {"data": [[64.0, 89.0], [65.0, 94.0], [69.0, 74.66666666666667], [76.0, 109.25], [97.0, 256.53846153846155], [100.0, 165.09090909090904]], "isOverall": false, "label": "/_next/image/-159", "isController": false}, {"data": [[96.65999999999998, 169.85000000000005]], "isOverall": false, "label": "/_next/image/-159-Aggregated", "isController": false}, {"data": [[39.0, 357.0], [41.0, 196.0], [49.0, 396.0], [51.0, 329.25], [53.0, 252.0], [52.0, 281.2], [57.0, 243.2], [56.0, 390.0], [58.0, 251.0], [61.0, 266.5], [60.0, 281.0], [71.0, 346.0], [70.0, 254.25], [68.0, 191.5], [79.0, 627.0], [78.0, 471.0], [77.0, 338.8333333333333], [76.0, 223.0], [82.0, 562.0], [80.0, 568.5], [84.0, 220.5], [95.0, 278.1666666666667], [93.0, 515.75], [92.0, 689.0], [99.0, 338.4], [96.0, 370.0], [100.0, 419.4736842105263], [22.0, 359.0], [24.0, 285.5], [29.0, 287.0]], "isOverall": false, "label": "/_next/image/-236", "isController": false}, {"data": [[76.11999999999999, 359.03999999999996]], "isOverall": false, "label": "/_next/image/-236-Aggregated", "isController": false}, {"data": [[57.0, 182.5], [56.0, 153.0], [61.0, 144.0], [70.0, 147.66666666666666], [68.0, 155.5], [79.0, 183.16666666666669], [78.0, 160.0], [77.0, 162.5], [76.0, 155.66666666666666], [83.0, 192.66666666666666], [82.0, 205.0], [80.0, 181.0], [86.0, 190.5], [84.0, 150.5], [91.0, 173.0], [90.0, 177.0], [88.0, 370.0], [95.0, 160.33333333333334], [93.0, 168.0], [92.0, 209.25], [99.0, 159.25], [97.0, 163.0], [96.0, 156.0], [100.0, 223.92307692307693]], "isOverall": false, "label": "/api/v2-224", "isController": false}, {"data": [[88.79999999999997, 197.83000000000007]], "isOverall": false, "label": "/api/v2-224-Aggregated", "isController": false}, {"data": [[100.0, 211.17999999999995]], "isOverall": false, "label": "/_next/static/css/5d869858990e49ff.css-164", "isController": false}, {"data": [[100.0, 211.17999999999995]], "isOverall": false, "label": "/_next/static/css/5d869858990e49ff.css-164-Aggregated", "isController": false}, {"data": [[100.0, 126.44]], "isOverall": false, "label": "/_next/image/-198", "isController": false}, {"data": [[100.0, 126.44]], "isOverall": false, "label": "/_next/image/-198-Aggregated", "isController": false}, {"data": [[100.0, 247.06]], "isOverall": false, "label": "/_next/image/-197", "isController": false}, {"data": [[100.0, 247.06]], "isOverall": false, "label": "/_next/image/-197-Aggregated", "isController": false}, {"data": [[100.0, 222.5900000000001]], "isOverall": false, "label": "/_next/image/-196", "isController": false}, {"data": [[100.0, 222.5900000000001]], "isOverall": false, "label": "/_next/image/-196-Aggregated", "isController": false}, {"data": [[100.0, 426.01]], "isOverall": false, "label": "/_next/image/-195", "isController": false}, {"data": [[100.0, 426.01]], "isOverall": false, "label": "/_next/image/-195-Aggregated", "isController": false}, {"data": [[57.0, 662.0], [58.0, 1218.0], [61.0, 553.0], [60.0, 1170.0], [66.0, 654.0], [70.0, 631.0], [68.0, 573.0], [79.0, 657.0], [77.0, 631.6], [76.0, 595.5], [83.0, 676.6], [82.0, 967.25], [80.0, 807.3333333333334], [86.0, 665.0], [88.0, 734.5], [95.0, 623.0], [93.0, 638.25], [92.0, 668.3333333333334], [99.0, 631.3333333333334], [98.0, 667.0], [97.0, 721.0], [96.0, 666.3333333333334], [100.0, 703.9250000000002]], "isOverall": false, "label": "/api/v2-225", "isController": false}, {"data": [[89.67000000000006, 701.08]], "isOverall": false, "label": "/api/v2-225-Aggregated", "isController": false}, {"data": [[44.0, 99.33333333333333], [56.0, 124.28571428571428], [58.0, 81.66666666666667], [61.0, 82.33333333333333], [62.0, 85.33333333333333], [65.0, 91.66666666666667], [66.0, 80.0], [69.0, 81.2], [76.0, 105.2], [77.0, 94.0], [96.0, 240.55555555555554], [97.0, 195.0], [100.0, 179.56603773584908]], "isOverall": false, "label": "/_next/image/-158", "isController": false}, {"data": [[86.20000000000003, 155.29]], "isOverall": false, "label": "/_next/image/-158-Aggregated", "isController": false}, {"data": [[32.0, 335.0], [41.0, 150.0], [49.0, 359.0], [51.0, 394.0], [53.0, 227.0], [52.0, 322.6666666666667], [57.0, 427.75], [56.0, 626.0], [58.0, 248.0], [61.0, 243.0], [63.0, 322.0], [71.0, 341.0], [70.0, 361.4], [68.0, 244.66666666666666], [79.0, 422.42857142857144], [77.0, 598.25], [76.0, 343.5], [82.0, 380.8], [80.0, 955.0], [86.0, 599.6666666666666], [84.0, 265.0], [88.0, 209.0], [95.0, 469.66666666666663], [93.0, 1010.0], [99.0, 435.7142857142857], [97.0, 255.25], [96.0, 603.5], [100.0, 545.8571428571428], [29.0, 509.33333333333337]], "isOverall": false, "label": "/_next/image/-235", "isController": false}, {"data": [[78.91, 435.13]], "isOverall": false, "label": "/_next/image/-235-Aggregated", "isController": false}, {"data": [[36.0, 319.0], [43.0, 356.0], [44.0, 373.0], [49.0, 384.0], [50.0, 385.0], [52.0, 347.0], [53.0, 375.75], [54.0, 369.0], [56.0, 323.0], [57.0, 363.0], [58.0, 337.5], [60.0, 323.0], [62.0, 374.75], [63.0, 331.0], [65.0, 325.8], [66.0, 291.5], [69.0, 329.0], [70.0, 291.0], [74.0, 326.0], [77.0, 322.6], [97.0, 437.15384615384613], [98.0, 418.3333333333333], [99.0, 345.0], [100.0, 388.969696969697], [31.0, 301.5]], "isOverall": false, "label": "/_next/image/-157", "isController": false}, {"data": [[79.64999999999999, 372.33]], "isOverall": false, "label": "/_next/image/-157-Aggregated", "isController": false}, {"data": [[70.0, 105.5], [79.0, 171.0], [77.0, 182.0], [76.0, 131.5], [83.0, 468.0], [82.0, 153.6], [80.0, 237.0], [86.0, 150.6], [84.0, 117.0], [91.0, 168.5], [88.0, 126.0], [95.0, 159.75], [93.0, 152.25], [92.0, 200.33333333333334], [99.0, 128.125], [98.0, 175.0], [97.0, 318.5], [96.0, 188.0], [100.0, 271.15909090909093]], "isOverall": false, "label": "/_next/static/chunks/pages/case-studies/%5Buid%5D-0235c985b6686f83.js-221", "isController": false}, {"data": [[93.11000000000001, 215.03]], "isOverall": false, "label": "/_next/static/chunks/pages/case-studies/%5Buid%5D-0235c985b6686f83.js-221-Aggregated", "isController": false}, {"data": [[2.0, 68.0], [3.0, 68.0], [4.0, 72.0], [5.0, 114.0], [6.0, 369.0], [7.0, 278.0], [8.0, 104.0], [11.0, 120.33333333333333], [12.0, 84.0], [15.0, 76.33333333333333], [16.0, 109.0], [17.0, 107.0], [19.0, 105.0], [20.0, 65.0], [21.0, 73.0], [22.0, 80.0], [24.0, 123.0], [25.0, 103.0], [26.0, 103.0], [27.0, 92.0], [28.0, 179.0], [29.0, 177.0], [30.0, 120.0], [31.0, 118.0], [33.0, 148.0], [32.0, 112.0], [34.0, 147.0], [37.0, 118.0], [36.0, 146.0], [39.0, 88.0], [38.0, 112.0], [41.0, 175.0], [40.0, 121.0], [43.0, 79.0], [42.0, 86.0], [45.0, 121.0], [44.0, 75.0], [47.0, 118.0], [46.0, 120.0], [49.0, 105.0], [48.0, 107.0], [51.0, 171.0], [53.0, 124.0], [52.0, 87.0], [55.0, 159.0], [54.0, 173.0], [57.0, 126.0], [56.0, 158.0], [58.0, 104.0], [61.0, 74.0], [60.0, 134.0], [63.0, 81.0], [62.0, 93.0], [66.0, 135.0], [65.0, 142.0], [64.0, 144.0], [71.0, 380.0], [70.0, 85.0], [69.0, 87.0], [68.0, 85.0], [79.0, 134.0], [78.0, 75.0], [77.0, 197.0], [76.0, 137.4], [83.0, 475.0], [82.0, 210.5], [80.0, 295.0], [86.0, 85.0], [84.0, 114.0], [91.0, 171.0], [90.0, 126.0], [89.0, 126.0], [88.0, 121.0], [95.0, 114.5], [93.0, 140.0], [92.0, 160.0], [99.0, 172.0], [98.0, 250.0], [97.0, 170.0], [96.0, 193.0], [100.0, 147.0], [1.0, 81.0]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-252", "isController": false}, {"data": [[50.76000000000002, 133.5999999999999]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-252-Aggregated", "isController": false}, {"data": [[100.0, 182.15]], "isOverall": false, "label": "/_next/image/-199", "isController": false}, {"data": [[100.0, 182.15]], "isOverall": false, "label": "/_next/image/-199-Aggregated", "isController": false}, {"data": [[100.0, 484.3499999999999]], "isOverall": false, "label": "/_next/static/css/a6f7e359f7dbdb6d.css-214", "isController": false}, {"data": [[100.0, 484.3499999999999]], "isOverall": false, "label": "/_next/static/css/a6f7e359f7dbdb6d.css-214-Aggregated", "isController": false}, {"data": [[47.0, 110.0], [51.0, 103.5], [53.0, 122.5], [58.0, 111.0], [63.0, 88.0], [70.0, 158.23076923076923], [68.0, 87.0], [79.0, 196.5], [78.0, 135.75], [77.0, 190.33333333333334], [76.0, 165.0], [82.0, 230.66666666666666], [80.0, 271.2], [86.0, 128.66666666666666], [84.0, 107.6], [91.0, 166.5], [88.0, 144.0], [93.0, 320.0], [92.0, 334.0], [99.0, 96.5], [97.0, 182.0], [96.0, 194.0], [100.0, 229.02857142857144]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/healthcare-bcc367f49e962b69.js-229", "isController": false}, {"data": [[85.69000000000004, 187.93999999999994]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/healthcare-bcc367f49e962b69.js-229-Aggregated", "isController": false}, {"data": [[100.0, 144.49000000000007]], "isOverall": false, "label": "/_next/image/-190", "isController": false}, {"data": [[100.0, 144.49000000000007]], "isOverall": false, "label": "/_next/image/-190-Aggregated", "isController": false}, {"data": [[41.0, 154.77777777777777], [40.0, 184.0], [51.0, 167.99999999999997], [52.0, 163.0], [57.0, 163.0], [58.0, 189.0], [61.0, 148.37499999999997], [70.0, 172.49999999999997], [68.0, 166.66666666666666], [79.0, 170.0], [77.0, 163.5], [76.0, 155.0], [80.0, 237.0], [86.0, 170.0], [84.0, 145.6], [90.0, 190.0], [88.0, 205.5], [93.0, 182.25], [99.0, 179.0], [98.0, 162.0], [97.0, 146.0], [100.0, 249.64285714285714], [15.0, 146.0], [19.0, 187.0], [29.0, 167.0]], "isOverall": false, "label": "/api/v2/documents/search-243", "isController": false}, {"data": [[70.19999999999999, 179.82]], "isOverall": false, "label": "/api/v2/documents/search-243-Aggregated", "isController": false}, {"data": [[36.0, 145.0], [39.0, 147.5], [41.0, 116.0], [48.0, 108.0], [51.0, 171.0], [52.0, 87.0], [54.0, 174.0], [57.0, 133.33333333333334], [61.0, 96.0], [60.0, 160.0], [63.0, 149.0], [70.0, 124.33333333333334], [68.0, 115.0], [79.0, 186.66666666666666], [77.0, 148.11111111111111], [83.0, 473.6], [82.0, 204.0], [80.0, 268.8333333333333], [86.0, 144.0], [84.0, 116.0], [91.0, 170.0], [88.0, 126.0], [93.0, 139.0], [99.0, 259.25], [98.0, 238.5], [96.0, 193.0], [100.0, 212.54166666666669]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/e-commerce-eaab52b163b20c61.js-231", "isController": false}, {"data": [[81.10000000000001, 197.2999999999999]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/e-commerce-eaab52b163b20c61.js-231-Aggregated", "isController": false}, {"data": [[39.0, 182.0], [41.0, 147.14285714285714], [44.0, 150.2], [51.0, 174.375], [54.0, 170.0], [57.0, 186.0], [58.0, 189.0], [63.0, 160.0], [70.0, 168.90909090909088], [68.0, 169.0], [78.0, 166.0], [77.0, 160.0], [83.0, 292.4], [80.0, 260.5], [86.0, 189.75], [84.0, 162.0], [88.0, 172.33333333333334], [95.0, 793.0], [93.0, 160.0], [92.0, 210.0], [99.0, 165.25], [98.0, 162.0], [97.0, 167.0], [96.0, 156.0], [100.0, 219.7692307692308], [12.0, 145.33333333333334], [15.0, 145.0], [24.0, 159.0], [29.0, 143.5]], "isOverall": false, "label": "/api/v2/documents/search-244", "isController": false}, {"data": [[68.72999999999998, 188.37]], "isOverall": false, "label": "/api/v2/documents/search-244-Aggregated", "isController": false}, {"data": [[100.0, 233.83999999999995]], "isOverall": false, "label": "/_next/image/-194", "isController": false}, {"data": [[100.0, 233.83999999999995]], "isOverall": false, "label": "/_next/image/-194-Aggregated", "isController": false}, {"data": [[82.0, 15992.333333333334], [80.0, 14643.0], [86.0, 15795.0], [84.0, 16712.0], [95.0, 14802.0], [93.0, 16288.25], [92.0, 15176.666666666666], [99.0, 14474.57142857143], [98.0, 13538.5], [97.0, 16848.0], [100.0, 8737.394366197184]], "isOverall": false, "label": "/_next/static/chunks/797-18c400db763eb22a.js-213", "isController": false}, {"data": [[97.92, 10661.69]], "isOverall": false, "label": "/_next/static/chunks/797-18c400db763eb22a.js-213-Aggregated", "isController": false}, {"data": [[100.0, 186.54999999999998]], "isOverall": false, "label": "/_next/image/-193", "isController": false}, {"data": [[100.0, 186.54999999999998]], "isOverall": false, "label": "/_next/image/-193-Aggregated", "isController": false}, {"data": [[100.0, 220.83]], "isOverall": false, "label": "/_next/image/-192", "isController": false}, {"data": [[100.0, 220.83]], "isOverall": false, "label": "/_next/image/-192-Aggregated", "isController": false}, {"data": [[100.0, 218.60999999999993]], "isOverall": false, "label": "/_next/image/-191", "isController": false}, {"data": [[100.0, 218.60999999999993]], "isOverall": false, "label": "/_next/image/-191-Aggregated", "isController": false}, {"data": [[39.0, 41.0], [38.0, 29.0], [41.0, 36.333333333333336], [49.0, 38.0], [51.0, 43.16666666666667], [53.0, 39.0], [52.0, 39.0], [57.0, 43.2], [56.0, 27.0], [61.0, 54.0], [66.0, 28.0], [71.0, 41.166666666666664], [70.0, 38.25], [68.0, 40.5], [79.0, 168.0], [77.0, 43.4], [82.0, 54.5], [80.0, 54.0], [90.0, 62.5], [93.0, 44.714285714285715], [92.0, 53.333333333333336], [99.0, 44.75], [98.0, 61.0], [96.0, 51.666666666666664], [100.0, 59.37500000000001], [21.0, 35.0], [24.0, 46.0], [29.0, 33.0]], "isOverall": false, "label": "/success.txt-240", "isController": false}, {"data": [[73.68, 51.010000000000005]], "isOverall": false, "label": "/success.txt-240-Aggregated", "isController": false}, {"data": [[39.0, 53.0], [38.0, 29.0], [41.0, 45.666666666666664], [44.0, 37.0], [49.0, 32.0], [51.0, 40.8], [53.0, 35.0], [52.0, 34.5], [57.0, 45.5], [56.0, 42.5], [60.0, 38.0], [66.0, 36.0], [71.0, 33.5], [70.0, 45.25], [68.0, 47.142857142857146], [79.0, 34.5], [77.0, 35.4], [82.0, 43.5], [80.0, 245.0], [90.0, 58.0], [88.0, 63.6], [95.0, 51.5], [93.0, 38.0], [92.0, 126.42857142857143], [99.0, 45.25], [98.0, 35.0], [96.0, 84.0], [100.0, 60.56249999999999], [21.0, 31.666666666666668], [22.0, 39.0], [29.0, 52.0]], "isOverall": false, "label": "/success.txt-241", "isController": false}, {"data": [[73.18000000000004, 53.190000000000026]], "isOverall": false, "label": "/success.txt-241-Aggregated", "isController": false}, {"data": [[79.0, 1137.5], [78.0, 2684.0], [83.0, 1549.0], [80.0, 868.0], [86.0, 922.0], [84.0, 1027.3333333333333], [95.0, 1140.6666666666667], [93.0, 1694.8], [92.0, 1189.5], [99.0, 1359.5], [98.0, 1878.0], [100.0, 1524.7540983606555]], "isOverall": false, "label": "/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf-217", "isController": false}, {"data": [[96.39, 1447.4799999999998]], "isOverall": false, "label": "/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf-217-Aggregated", "isController": false}, {"data": [[39.0, 100.0], [41.0, 79.0], [40.0, 181.0], [51.0, 121.0], [53.0, 118.0], [52.0, 122.0], [57.0, 108.0], [58.0, 109.0], [61.0, 90.5], [63.0, 82.33333333333333], [70.0, 106.625], [68.0, 110.125], [79.0, 113.5], [78.0, 136.0], [77.0, 87.16666666666666], [82.0, 165.0], [80.0, 225.5], [86.0, 151.0], [84.0, 105.6], [91.0, 162.0], [88.0, 144.0], [93.0, 168.0], [92.0, 333.5], [99.0, 126.0909090909091], [97.0, 268.0], [100.0, 197.6]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketplace-77437c68984ecd13.js-232", "isController": false}, {"data": [[82.13, 149.31]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketplace-77437c68984ecd13.js-232-Aggregated", "isController": false}, {"data": [[100.0, 137.06000000000003]], "isOverall": false, "label": "/_next/image/-187", "isController": false}, {"data": [[100.0, 137.06000000000003]], "isOverall": false, "label": "/_next/image/-187-Aggregated", "isController": false}, {"data": [[100.0, 174.12]], "isOverall": false, "label": "/_next/image/-186", "isController": false}, {"data": [[100.0, 174.12]], "isOverall": false, "label": "/_next/image/-186-Aggregated", "isController": false}, {"data": [[100.0, 145.16000000000008]], "isOverall": false, "label": "/_next/image/-185", "isController": false}, {"data": [[100.0, 145.16000000000008]], "isOverall": false, "label": "/_next/image/-185-Aggregated", "isController": false}, {"data": [[100.0, 125.35999999999997]], "isOverall": false, "label": "/_next/image/-184", "isController": false}, {"data": [[100.0, 125.35999999999997]], "isOverall": false, "label": "/_next/image/-184-Aggregated", "isController": false}, {"data": [[100.0, 140.63]], "isOverall": false, "label": "/_next/image/-189", "isController": false}, {"data": [[100.0, 140.63]], "isOverall": false, "label": "/_next/image/-189-Aggregated", "isController": false}, {"data": [[100.0, 156.57999999999998]], "isOverall": false, "label": "/_next/image/-188", "isController": false}, {"data": [[100.0, 156.57999999999998]], "isOverall": false, "label": "/_next/image/-188-Aggregated", "isController": false}, {"data": [[33.0, 148.0], [41.0, 115.0], [40.0, 180.0], [44.0, 79.0], [49.0, 106.0], [51.0, 158.28571428571428], [53.0, 163.5], [52.0, 78.0], [54.0, 173.0], [57.0, 122.0], [56.0, 119.0], [58.0, 121.0], [60.0, 155.0], [63.0, 148.0], [70.0, 128.91666666666666], [68.0, 86.0], [79.0, 141.33333333333334], [78.0, 109.0], [77.0, 148.33333333333334], [83.0, 449.0], [82.0, 207.0], [80.0, 292.5], [95.0, 131.0], [93.0, 158.71428571428572], [92.0, 291.6666666666667], [99.0, 98.0], [98.0, 230.0], [97.0, 264.0], [100.0, 230.421052631579], [22.0, 106.33333333333333], [27.0, 145.0]], "isOverall": false, "label": "/_next/static/css/59ae46ebdb9b2558.css-238", "isController": false}, {"data": [[75.13999999999999, 178.21]], "isOverall": false, "label": "/_next/static/css/59ae46ebdb9b2558.css-238-Aggregated", "isController": false}, {"data": [[100.0, 140.26000000000002]], "isOverall": false, "label": "/_next/image/-183", "isController": false}, {"data": [[100.0, 140.26000000000002]], "isOverall": false, "label": "/_next/image/-183-Aggregated", "isController": false}, {"data": [[100.0, 120.95000000000003]], "isOverall": false, "label": "/_next/image/-182", "isController": false}, {"data": [[100.0, 120.95000000000003]], "isOverall": false, "label": "/_next/image/-182-Aggregated", "isController": false}, {"data": [[100.0, 116.13000000000004]], "isOverall": false, "label": "/_next/image/-181", "isController": false}, {"data": [[100.0, 116.13000000000004]], "isOverall": false, "label": "/_next/image/-181-Aggregated", "isController": false}, {"data": [[100.0, 116.50999999999998]], "isOverall": false, "label": "/_next/image/-180", "isController": false}, {"data": [[100.0, 116.50999999999998]], "isOverall": false, "label": "/_next/image/-180-Aggregated", "isController": false}, {"data": [[41.0, 79.0], [40.0, 181.0], [48.0, 108.0], [51.0, 162.0], [56.0, 86.0], [61.0, 98.5], [60.0, 163.0], [63.0, 150.0], [66.0, 477.0], [70.0, 143.41666666666666], [68.0, 119.5], [79.0, 143.5], [78.0, 135.0], [77.0, 184.75], [83.0, 455.5], [82.0, 194.0], [80.0, 302.0], [86.0, 131.0], [84.0, 98.0], [91.0, 161.0], [95.0, 734.0], [93.0, 172.5], [92.0, 220.0], [99.0, 182.87500000000003], [100.0, 215.93333333333334]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/fintech-2922fd056459d217.js-230", "isController": false}, {"data": [[83.86, 193.46]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/fintech-2922fd056459d217.js-230-Aggregated", "isController": false}, {"data": [[32.0, 142.0], [34.0, 148.0], [41.0, 167.0], [42.0, 148.0], [44.0, 149.25], [51.0, 167.2], [53.0, 146.0], [52.0, 149.0], [54.0, 170.0], [56.0, 152.0], [58.0, 183.0], [61.0, 154.0], [63.0, 153.5], [64.0, 141.5], [70.0, 168.4], [79.0, 160.0], [78.0, 156.0], [77.0, 152.33333333333334], [76.0, 171.0], [82.0, 227.5], [86.0, 203.6], [91.0, 174.0], [88.0, 160.0], [95.0, 157.33333333333334], [93.0, 181.0], [92.0, 162.5], [99.0, 169.5], [97.0, 154.0], [100.0, 169.78571428571428], [19.0, 156.33333333333334], [22.0, 149.0], [29.0, 142.0]], "isOverall": false, "label": "/api/v2-242", "isController": false}, {"data": [[71.65999999999998, 164.9399999999999]], "isOverall": false, "label": "/api/v2-242-Aggregated", "isController": false}, {"data": [[100.0, 413.85]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-211", "isController": false}, {"data": [[100.0, 413.85]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-211-Aggregated", "isController": false}, {"data": [[79.0, 903.0], [77.0, 179.75], [76.0, 272.0], [83.0, 679.5], [82.0, 816.3333333333334], [80.0, 428.0], [86.0, 201.0], [84.0, 285.5], [90.0, 178.0], [88.0, 207.66666666666666], [95.0, 1339.6666666666665], [93.0, 451.5], [92.0, 1074.0], [99.0, 404.0], [98.0, 375.3333333333333], [97.0, 382.5], [96.0, 1076.0], [100.0, 593.5399999999998]], "isOverall": false, "label": "/_next/image/-219", "isController": false}, {"data": [[94.39999999999998, 583.3199999999998]], "isOverall": false, "label": "/_next/image/-219-Aggregated", "isController": false}, {"data": [[79.0, 481.5], [77.0, 341.5], [82.0, 628.0], [86.0, 992.3333333333334], [84.0, 269.0], [90.0, 191.5], [88.0, 374.57142857142856], [95.0, 2142.5], [93.0, 318.8], [92.0, 404.0], [99.0, 632.111111111111], [97.0, 1127.0], [96.0, 405.0], [100.0, 577.5272727272729]], "isOverall": false, "label": "/_next/image/-218", "isController": false}, {"data": [[95.44, 582.9500000000003]], "isOverall": false, "label": "/_next/image/-218-Aggregated", "isController": false}, {"data": [[41.0, 251.0], [44.0, 178.0], [51.0, 200.0], [52.0, 207.5], [57.0, 214.0], [61.0, 196.0], [63.0, 203.0], [71.0, 308.0], [70.0, 241.16666666666669], [68.0, 247.0], [79.0, 349.5], [77.0, 253.5], [76.0, 225.5], [82.0, 603.75], [80.0, 393.75], [86.0, 301.0], [84.0, 252.2], [88.0, 283.5], [95.0, 271.0], [93.0, 246.0], [92.0, 273.0], [99.0, 263.42857142857144], [100.0, 291.21875]], "isOverall": false, "label": "/v4/fullHashes:find-234", "isController": false}, {"data": [[84.57000000000004, 287.3500000000001]], "isOverall": false, "label": "/v4/fullHashes:find-234-Aggregated", "isController": false}, {"data": [[100.0, 145.61]], "isOverall": false, "label": "/_next/image/-176", "isController": false}, {"data": [[100.0, 145.61]], "isOverall": false, "label": "/_next/image/-176-Aggregated", "isController": false}, {"data": [[100.0, 105.50999999999998]], "isOverall": false, "label": "/_next/image/-175", "isController": false}, {"data": [[100.0, 105.50999999999998]], "isOverall": false, "label": "/_next/image/-175-Aggregated", "isController": false}, {"data": [[70.0, 162.5], [79.0, 284.0], [77.0, 175.0], [76.0, 217.0], [82.0, 456.8], [80.0, 410.3333333333333], [86.0, 189.33333333333334], [84.0, 189.0], [90.0, 188.0], [88.0, 228.6], [95.0, 241.66666666666666], [93.0, 257.5], [92.0, 226.5], [99.0, 219.0], [98.0, 226.0], [97.0, 220.5], [100.0, 275.5681818181819]], "isOverall": false, "label": "/-220", "isController": false}, {"data": [[93.58999999999999, 273.2199999999999]], "isOverall": false, "label": "/-220-Aggregated", "isController": false}, {"data": [[41.0, 118.0], [44.0, 85.0], [46.0, 120.0], [51.0, 168.66666666666666], [53.0, 154.66666666666666], [52.0, 95.0], [55.0, 160.0], [54.0, 172.0], [57.0, 124.0], [61.0, 97.0], [60.0, 156.66666666666666], [63.0, 149.0], [66.0, 129.0], [64.0, 145.0], [70.0, 100.1], [68.0, 107.0], [79.0, 132.16666666666666], [78.0, 132.0], [77.0, 188.25], [83.0, 412.0], [82.0, 151.0], [80.0, 260.25], [86.0, 118.5], [84.0, 106.0], [95.0, 125.5], [93.0, 168.25], [99.0, 108.75], [98.0, 205.5], [97.0, 256.0], [96.0, 246.4], [100.0, 193.1], [29.0, 163.0]], "isOverall": false, "label": "/_next/static/css/20a83c45c1ae9f97.css-237", "isController": false}, {"data": [[77.69, 163.03999999999996]], "isOverall": false, "label": "/_next/static/css/20a83c45c1ae9f97.css-237-Aggregated", "isController": false}, {"data": [[100.0, 117.63000000000002]], "isOverall": false, "label": "/_next/image/-174", "isController": false}, {"data": [[100.0, 117.63000000000002]], "isOverall": false, "label": "/_next/image/-174-Aggregated", "isController": false}, {"data": [[100.0, 146.24]], "isOverall": false, "label": "/_next/image/-173", "isController": false}, {"data": [[100.0, 146.24]], "isOverall": false, "label": "/_next/image/-173-Aggregated", "isController": false}, {"data": [[39.0, 267.0], [38.0, 327.0], [41.0, 415.0], [40.0, 217.33333333333331], [51.0, 371.0], [52.0, 182.0], [54.0, 175.0], [57.0, 175.0], [58.0, 186.33333333333334], [61.0, 333.0], [60.0, 631.0], [63.0, 195.0], [4.0, 160.5], [70.0, 454.3333333333333], [68.0, 390.75], [79.0, 181.0], [78.0, 183.0], [77.0, 289.83333333333337], [82.0, 579.6666666666666], [86.0, 323.0], [88.0, 1078.0], [95.0, 210.0], [93.0, 397.0], [92.0, 464.4], [99.0, 272.5], [97.0, 276.0], [6.0, 455.0], [100.0, 141.0], [7.0, 348.0], [8.0, 240.0], [11.0, 235.0], [15.0, 163.0], [1.0, 137.0], [19.0, 197.33333333333334], [21.0, 198.0], [22.0, 136.66666666666666], [24.0, 202.0], [27.0, 207.5], [29.0, 186.0], [30.0, 171.0]], "isOverall": false, "label": "/_next/image/-250", "isController": false}, {"data": [[53.630000000000024, 307.8700000000001]], "isOverall": false, "label": "/_next/image/-250-Aggregated", "isController": false}, {"data": [[100.0, 128.1400000000001]], "isOverall": false, "label": "/_next/image/-179", "isController": false}, {"data": [[100.0, 128.1400000000001]], "isOverall": false, "label": "/_next/image/-179-Aggregated", "isController": false}, {"data": [[100.0, 304.77]], "isOverall": false, "label": "/_next/image/-212", "isController": false}, {"data": [[100.0, 304.77]], "isOverall": false, "label": "/_next/image/-212-Aggregated", "isController": false}, {"data": [[100.0, 131.24]], "isOverall": false, "label": "/_next/image/-178", "isController": false}, {"data": [[100.0, 131.24]], "isOverall": false, "label": "/_next/image/-178-Aggregated", "isController": false}, {"data": [[32.0, 98.0], [39.0, 335.0], [41.0, 68.0], [40.0, 87.0], [43.0, 78.0], [44.0, 73.0], [49.0, 65.5], [51.0, 96.0], [53.0, 83.6], [57.0, 107.33333333333333], [56.0, 69.5], [58.0, 100.5], [62.0, 81.0], [66.0, 67.0], [70.0, 84.0909090909091], [68.0, 103.0], [79.0, 111.75], [77.0, 77.4], [76.0, 72.66666666666666], [82.0, 133.66666666666666], [95.0, 89.0], [93.0, 96.28571428571428], [92.0, 106.0], [99.0, 74.4], [97.0, 105.0], [96.0, 123.5], [100.0, 134.81250000000003], [22.0, 64.0], [24.0, 113.0]], "isOverall": false, "label": "/canonical.html-239", "isController": false}, {"data": [[74.48, 99.58000000000006]], "isOverall": false, "label": "/canonical.html-239-Aggregated", "isController": false}, {"data": [[100.0, 136.17999999999992]], "isOverall": false, "label": "/_next/image/-177", "isController": false}, {"data": [[100.0, 136.17999999999992]], "isOverall": false, "label": "/_next/image/-177-Aggregated", "isController": false}, {"data": [[100.0, 508.6299999999999]], "isOverall": false, "label": "/_next/image/-210", "isController": false}, {"data": [[100.0, 508.6299999999999]], "isOverall": false, "label": "/_next/image/-210-Aggregated", "isController": false}, {"data": [[100.0, 476.1399999999998]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketing-c2c36989b4610793.js-216", "isController": false}, {"data": [[100.0, 476.1399999999998]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketing-c2c36989b4610793.js-216-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 85305.0, "minX": 1.69711698E12, "maxY": 1553764.15, "series": [{"data": [[1.69711698E12, 1553764.15]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69711698E12, 85305.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711698E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 51.010000000000005, "minX": 1.69711698E12, "maxY": 10661.69, "series": [{"data": [[1.69711698E12, 131.46000000000004]], "isOverall": false, "label": "/_next/image/-172", "isController": false}, {"data": [[1.69711698E12, 108.52999999999999]], "isOverall": false, "label": "/_next/image/-171", "isController": false}, {"data": [[1.69711698E12, 158.77000000000004]], "isOverall": false, "label": "/_next/static/chunks/pages/privacy-policy-acad0aee1f8a2872.js-233", "isController": false}, {"data": [[1.69711698E12, 116.88999999999996]], "isOverall": false, "label": "/_next/image/-170", "isController": false}, {"data": [[1.69711698E12, 186.19]], "isOverall": false, "label": "/api/v2/documents/search-226", "isController": false}, {"data": [[1.69711698E12, 188.74]], "isOverall": false, "label": "/api/v2/documents/search-227", "isController": false}, {"data": [[1.69711698E12, 343.20000000000005]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-163", "isController": false}, {"data": [[1.69711698E12, 184.61999999999995]], "isOverall": false, "label": "/_next/image/-206", "isController": false}, {"data": [[1.69711698E12, 212.18]], "isOverall": false, "label": "/_next/image/-205", "isController": false}, {"data": [[1.69711698E12, 438.73]], "isOverall": false, "label": "/_next/image/-249", "isController": false}, {"data": [[1.69711698E12, 237.04000000000008]], "isOverall": false, "label": "/_next/image/-204", "isController": false}, {"data": [[1.69711698E12, 294.59999999999997]], "isOverall": false, "label": "/_next/image/-248", "isController": false}, {"data": [[1.69711698E12, 203.81]], "isOverall": false, "label": "/_next/image/-203", "isController": false}, {"data": [[1.69711698E12, 233.60999999999996]], "isOverall": false, "label": "/_next/static/media/Spin.df15a301.svg-222", "isController": false}, {"data": [[1.69711698E12, 312.20000000000005]], "isOverall": false, "label": "/_next/image/-247", "isController": false}, {"data": [[1.69711698E12, 475.84]], "isOverall": false, "label": "/_next/image/-209", "isController": false}, {"data": [[1.69711698E12, 358.7499999999999]], "isOverall": false, "label": "/_next/image/-208", "isController": false}, {"data": [[1.69711698E12, 177.94000000000005]], "isOverall": false, "label": "/_next/image/-207", "isController": false}, {"data": [[1.69711698E12, 124.75999999999998]], "isOverall": false, "label": "/_next/image/-165", "isController": false}, {"data": [[1.69711698E12, 195.64999999999998]], "isOverall": false, "label": "/_next/static/chunks/pages/contacts-35642fc97e509742.js-228", "isController": false}, {"data": [[1.69711698E12, 176.13000000000002]], "isOverall": false, "label": "/_next/image/-162", "isController": false}, {"data": [[1.69711698E12, 123.9]], "isOverall": false, "label": "/_next/image/-169", "isController": false}, {"data": [[1.69711698E12, 262.02000000000004]], "isOverall": false, "label": "/_next/image/-202", "isController": false}, {"data": [[1.69711698E12, 398.48]], "isOverall": false, "label": "/_next/image/-246", "isController": false}, {"data": [[1.69711698E12, 137.37000000000003]], "isOverall": false, "label": "/_next/image/-168", "isController": false}, {"data": [[1.69711698E12, 230.08999999999992]], "isOverall": false, "label": "/_next/image/-201", "isController": false}, {"data": [[1.69711698E12, 364.7300000000003]], "isOverall": false, "label": "/_next/image/-245", "isController": false}, {"data": [[1.69711698E12, 149.3]], "isOverall": false, "label": "/_next/image/-167", "isController": false}, {"data": [[1.69711698E12, 596.6899999999997]], "isOverall": false, "label": "/_next/image/-200", "isController": false}, {"data": [[1.69711698E12, 114.59000000000002]], "isOverall": false, "label": "/_next/image/-166", "isController": false}, {"data": [[1.69711698E12, 180.87000000000006]], "isOverall": false, "label": "/_next/image/-161", "isController": false}, {"data": [[1.69711698E12, 152.41000000000003]], "isOverall": false, "label": "/_next/image/-160", "isController": false}, {"data": [[1.69711698E12, 311.1599999999998]], "isOverall": false, "label": "/g/collect?v=2&tid=G-0RYFMW13ZL&gtm=45je3ab0&_p=2116546750&cid=1373326669.1697116895&ul=uk-ua&sr=1536x864&_eu=AEA&dl=https%3A%2F%2Fluxequality.letkabackend.click%2Fcase-studies%2F&dr=https%3A%2F%2Fluxequality.letkabackend.click%2F&sid=1697116895&sct=1&seg=1&dt=IT%20Case%20Studies%20%7C%20Luxe%20Quality&_s=2-223", "isController": false}, {"data": [[1.69711698E12, 467.71]], "isOverall": false, "label": "/_next/static/css/cbd65f856dbf3e21.css-215", "isController": false}, {"data": [[1.69711698E12, 151.74000000000012]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-251", "isController": false}, {"data": [[1.69711698E12, 169.85000000000005]], "isOverall": false, "label": "/_next/image/-159", "isController": false}, {"data": [[1.69711698E12, 359.03999999999996]], "isOverall": false, "label": "/_next/image/-236", "isController": false}, {"data": [[1.69711698E12, 197.83000000000007]], "isOverall": false, "label": "/api/v2-224", "isController": false}, {"data": [[1.69711698E12, 211.17999999999995]], "isOverall": false, "label": "/_next/static/css/5d869858990e49ff.css-164", "isController": false}, {"data": [[1.69711698E12, 126.44]], "isOverall": false, "label": "/_next/image/-198", "isController": false}, {"data": [[1.69711698E12, 247.06]], "isOverall": false, "label": "/_next/image/-197", "isController": false}, {"data": [[1.69711698E12, 222.5900000000001]], "isOverall": false, "label": "/_next/image/-196", "isController": false}, {"data": [[1.69711698E12, 426.01]], "isOverall": false, "label": "/_next/image/-195", "isController": false}, {"data": [[1.69711698E12, 701.08]], "isOverall": false, "label": "/api/v2-225", "isController": false}, {"data": [[1.69711698E12, 155.29]], "isOverall": false, "label": "/_next/image/-158", "isController": false}, {"data": [[1.69711698E12, 435.13]], "isOverall": false, "label": "/_next/image/-235", "isController": false}, {"data": [[1.69711698E12, 372.33]], "isOverall": false, "label": "/_next/image/-157", "isController": false}, {"data": [[1.69711698E12, 215.03]], "isOverall": false, "label": "/_next/static/chunks/pages/case-studies/%5Buid%5D-0235c985b6686f83.js-221", "isController": false}, {"data": [[1.69711698E12, 133.5999999999999]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-252", "isController": false}, {"data": [[1.69711698E12, 182.15]], "isOverall": false, "label": "/_next/image/-199", "isController": false}, {"data": [[1.69711698E12, 484.3499999999999]], "isOverall": false, "label": "/_next/static/css/a6f7e359f7dbdb6d.css-214", "isController": false}, {"data": [[1.69711698E12, 187.93999999999994]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/healthcare-bcc367f49e962b69.js-229", "isController": false}, {"data": [[1.69711698E12, 144.49000000000007]], "isOverall": false, "label": "/_next/image/-190", "isController": false}, {"data": [[1.69711698E12, 179.82]], "isOverall": false, "label": "/api/v2/documents/search-243", "isController": false}, {"data": [[1.69711698E12, 197.2999999999999]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/e-commerce-eaab52b163b20c61.js-231", "isController": false}, {"data": [[1.69711698E12, 188.37]], "isOverall": false, "label": "/api/v2/documents/search-244", "isController": false}, {"data": [[1.69711698E12, 233.83999999999995]], "isOverall": false, "label": "/_next/image/-194", "isController": false}, {"data": [[1.69711698E12, 10661.69]], "isOverall": false, "label": "/_next/static/chunks/797-18c400db763eb22a.js-213", "isController": false}, {"data": [[1.69711698E12, 186.54999999999998]], "isOverall": false, "label": "/_next/image/-193", "isController": false}, {"data": [[1.69711698E12, 220.83]], "isOverall": false, "label": "/_next/image/-192", "isController": false}, {"data": [[1.69711698E12, 218.60999999999993]], "isOverall": false, "label": "/_next/image/-191", "isController": false}, {"data": [[1.69711698E12, 51.010000000000005]], "isOverall": false, "label": "/success.txt-240", "isController": false}, {"data": [[1.69711698E12, 53.190000000000026]], "isOverall": false, "label": "/success.txt-241", "isController": false}, {"data": [[1.69711698E12, 1447.4799999999998]], "isOverall": false, "label": "/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf-217", "isController": false}, {"data": [[1.69711698E12, 149.31]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketplace-77437c68984ecd13.js-232", "isController": false}, {"data": [[1.69711698E12, 137.06000000000003]], "isOverall": false, "label": "/_next/image/-187", "isController": false}, {"data": [[1.69711698E12, 174.12]], "isOverall": false, "label": "/_next/image/-186", "isController": false}, {"data": [[1.69711698E12, 145.16000000000008]], "isOverall": false, "label": "/_next/image/-185", "isController": false}, {"data": [[1.69711698E12, 125.35999999999997]], "isOverall": false, "label": "/_next/image/-184", "isController": false}, {"data": [[1.69711698E12, 140.63]], "isOverall": false, "label": "/_next/image/-189", "isController": false}, {"data": [[1.69711698E12, 156.57999999999998]], "isOverall": false, "label": "/_next/image/-188", "isController": false}, {"data": [[1.69711698E12, 178.21]], "isOverall": false, "label": "/_next/static/css/59ae46ebdb9b2558.css-238", "isController": false}, {"data": [[1.69711698E12, 140.26000000000002]], "isOverall": false, "label": "/_next/image/-183", "isController": false}, {"data": [[1.69711698E12, 120.95000000000003]], "isOverall": false, "label": "/_next/image/-182", "isController": false}, {"data": [[1.69711698E12, 116.13000000000004]], "isOverall": false, "label": "/_next/image/-181", "isController": false}, {"data": [[1.69711698E12, 116.50999999999998]], "isOverall": false, "label": "/_next/image/-180", "isController": false}, {"data": [[1.69711698E12, 193.46]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/fintech-2922fd056459d217.js-230", "isController": false}, {"data": [[1.69711698E12, 164.9399999999999]], "isOverall": false, "label": "/api/v2-242", "isController": false}, {"data": [[1.69711698E12, 413.85]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-211", "isController": false}, {"data": [[1.69711698E12, 583.3199999999998]], "isOverall": false, "label": "/_next/image/-219", "isController": false}, {"data": [[1.69711698E12, 582.9500000000003]], "isOverall": false, "label": "/_next/image/-218", "isController": false}, {"data": [[1.69711698E12, 287.3500000000001]], "isOverall": false, "label": "/v4/fullHashes:find-234", "isController": false}, {"data": [[1.69711698E12, 145.61]], "isOverall": false, "label": "/_next/image/-176", "isController": false}, {"data": [[1.69711698E12, 105.50999999999998]], "isOverall": false, "label": "/_next/image/-175", "isController": false}, {"data": [[1.69711698E12, 273.2199999999999]], "isOverall": false, "label": "/-220", "isController": false}, {"data": [[1.69711698E12, 163.03999999999996]], "isOverall": false, "label": "/_next/static/css/20a83c45c1ae9f97.css-237", "isController": false}, {"data": [[1.69711698E12, 117.63000000000002]], "isOverall": false, "label": "/_next/image/-174", "isController": false}, {"data": [[1.69711698E12, 146.24]], "isOverall": false, "label": "/_next/image/-173", "isController": false}, {"data": [[1.69711698E12, 307.8700000000001]], "isOverall": false, "label": "/_next/image/-250", "isController": false}, {"data": [[1.69711698E12, 128.1400000000001]], "isOverall": false, "label": "/_next/image/-179", "isController": false}, {"data": [[1.69711698E12, 304.77]], "isOverall": false, "label": "/_next/image/-212", "isController": false}, {"data": [[1.69711698E12, 131.24]], "isOverall": false, "label": "/_next/image/-178", "isController": false}, {"data": [[1.69711698E12, 99.58000000000006]], "isOverall": false, "label": "/canonical.html-239", "isController": false}, {"data": [[1.69711698E12, 136.17999999999992]], "isOverall": false, "label": "/_next/image/-177", "isController": false}, {"data": [[1.69711698E12, 508.6299999999999]], "isOverall": false, "label": "/_next/image/-210", "isController": false}, {"data": [[1.69711698E12, 476.1399999999998]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketing-c2c36989b4610793.js-216", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711698E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69711698E12, "maxY": 860.0299999999999, "series": [{"data": [[1.69711698E12, 131.46000000000004]], "isOverall": false, "label": "/_next/image/-172", "isController": false}, {"data": [[1.69711698E12, 108.52999999999999]], "isOverall": false, "label": "/_next/image/-171", "isController": false}, {"data": [[1.69711698E12, 158.77000000000004]], "isOverall": false, "label": "/_next/static/chunks/pages/privacy-policy-acad0aee1f8a2872.js-233", "isController": false}, {"data": [[1.69711698E12, 116.88999999999996]], "isOverall": false, "label": "/_next/image/-170", "isController": false}, {"data": [[1.69711698E12, 184.43999999999997]], "isOverall": false, "label": "/api/v2/documents/search-226", "isController": false}, {"data": [[1.69711698E12, 188.70999999999998]], "isOverall": false, "label": "/api/v2/documents/search-227", "isController": false}, {"data": [[1.69711698E12, 343.08]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-163", "isController": false}, {"data": [[1.69711698E12, 184.61999999999995]], "isOverall": false, "label": "/_next/image/-206", "isController": false}, {"data": [[1.69711698E12, 212.18]], "isOverall": false, "label": "/_next/image/-205", "isController": false}, {"data": [[1.69711698E12, 319.4499999999999]], "isOverall": false, "label": "/_next/image/-249", "isController": false}, {"data": [[1.69711698E12, 237.03]], "isOverall": false, "label": "/_next/image/-204", "isController": false}, {"data": [[1.69711698E12, 268.46]], "isOverall": false, "label": "/_next/image/-248", "isController": false}, {"data": [[1.69711698E12, 203.76999999999992]], "isOverall": false, "label": "/_next/image/-203", "isController": false}, {"data": [[1.69711698E12, 233.59]], "isOverall": false, "label": "/_next/static/media/Spin.df15a301.svg-222", "isController": false}, {"data": [[1.69711698E12, 312.19000000000005]], "isOverall": false, "label": "/_next/image/-247", "isController": false}, {"data": [[1.69711698E12, 475.8299999999999]], "isOverall": false, "label": "/_next/image/-209", "isController": false}, {"data": [[1.69711698E12, 358.71999999999997]], "isOverall": false, "label": "/_next/image/-208", "isController": false}, {"data": [[1.69711698E12, 177.92000000000002]], "isOverall": false, "label": "/_next/image/-207", "isController": false}, {"data": [[1.69711698E12, 124.75999999999998]], "isOverall": false, "label": "/_next/image/-165", "isController": false}, {"data": [[1.69711698E12, 195.64]], "isOverall": false, "label": "/_next/static/chunks/pages/contacts-35642fc97e509742.js-228", "isController": false}, {"data": [[1.69711698E12, 176.13000000000002]], "isOverall": false, "label": "/_next/image/-162", "isController": false}, {"data": [[1.69711698E12, 123.9]], "isOverall": false, "label": "/_next/image/-169", "isController": false}, {"data": [[1.69711698E12, 262.00999999999993]], "isOverall": false, "label": "/_next/image/-202", "isController": false}, {"data": [[1.69711698E12, 285.99]], "isOverall": false, "label": "/_next/image/-246", "isController": false}, {"data": [[1.69711698E12, 137.37000000000003]], "isOverall": false, "label": "/_next/image/-168", "isController": false}, {"data": [[1.69711698E12, 230.07999999999993]], "isOverall": false, "label": "/_next/image/-201", "isController": false}, {"data": [[1.69711698E12, 332.48999999999995]], "isOverall": false, "label": "/_next/image/-245", "isController": false}, {"data": [[1.69711698E12, 149.3]], "isOverall": false, "label": "/_next/image/-167", "isController": false}, {"data": [[1.69711698E12, 596.6899999999997]], "isOverall": false, "label": "/_next/image/-200", "isController": false}, {"data": [[1.69711698E12, 114.59000000000002]], "isOverall": false, "label": "/_next/image/-166", "isController": false}, {"data": [[1.69711698E12, 180.87000000000006]], "isOverall": false, "label": "/_next/image/-161", "isController": false}, {"data": [[1.69711698E12, 152.41000000000003]], "isOverall": false, "label": "/_next/image/-160", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/g/collect?v=2&tid=G-0RYFMW13ZL&gtm=45je3ab0&_p=2116546750&cid=1373326669.1697116895&ul=uk-ua&sr=1536x864&_eu=AEA&dl=https%3A%2F%2Fluxequality.letkabackend.click%2Fcase-studies%2F&dr=https%3A%2F%2Fluxequality.letkabackend.click%2F&sid=1697116895&sct=1&seg=1&dt=IT%20Case%20Studies%20%7C%20Luxe%20Quality&_s=2-223", "isController": false}, {"data": [[1.69711698E12, 467.6099999999999]], "isOverall": false, "label": "/_next/static/css/cbd65f856dbf3e21.css-215", "isController": false}, {"data": [[1.69711698E12, 151.6699999999999]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-251", "isController": false}, {"data": [[1.69711698E12, 169.85000000000005]], "isOverall": false, "label": "/_next/image/-159", "isController": false}, {"data": [[1.69711698E12, 258.79]], "isOverall": false, "label": "/_next/image/-236", "isController": false}, {"data": [[1.69711698E12, 190.28000000000006]], "isOverall": false, "label": "/api/v2-224", "isController": false}, {"data": [[1.69711698E12, 211.07000000000002]], "isOverall": false, "label": "/_next/static/css/5d869858990e49ff.css-164", "isController": false}, {"data": [[1.69711698E12, 126.43000000000002]], "isOverall": false, "label": "/_next/image/-198", "isController": false}, {"data": [[1.69711698E12, 247.06]], "isOverall": false, "label": "/_next/image/-197", "isController": false}, {"data": [[1.69711698E12, 222.5900000000001]], "isOverall": false, "label": "/_next/image/-196", "isController": false}, {"data": [[1.69711698E12, 426.01]], "isOverall": false, "label": "/_next/image/-195", "isController": false}, {"data": [[1.69711698E12, 699.37]], "isOverall": false, "label": "/api/v2-225", "isController": false}, {"data": [[1.69711698E12, 155.29]], "isOverall": false, "label": "/_next/image/-158", "isController": false}, {"data": [[1.69711698E12, 348.9699999999999]], "isOverall": false, "label": "/_next/image/-235", "isController": false}, {"data": [[1.69711698E12, 372.3199999999998]], "isOverall": false, "label": "/_next/image/-157", "isController": false}, {"data": [[1.69711698E12, 215.02]], "isOverall": false, "label": "/_next/static/chunks/pages/case-studies/%5Buid%5D-0235c985b6686f83.js-221", "isController": false}, {"data": [[1.69711698E12, 133.5]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-252", "isController": false}, {"data": [[1.69711698E12, 182.15]], "isOverall": false, "label": "/_next/image/-199", "isController": false}, {"data": [[1.69711698E12, 484.24999999999994]], "isOverall": false, "label": "/_next/static/css/a6f7e359f7dbdb6d.css-214", "isController": false}, {"data": [[1.69711698E12, 187.86999999999998]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/healthcare-bcc367f49e962b69.js-229", "isController": false}, {"data": [[1.69711698E12, 144.49000000000007]], "isOverall": false, "label": "/_next/image/-190", "isController": false}, {"data": [[1.69711698E12, 179.69999999999993]], "isOverall": false, "label": "/api/v2/documents/search-243", "isController": false}, {"data": [[1.69711698E12, 197.27999999999997]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/e-commerce-eaab52b163b20c61.js-231", "isController": false}, {"data": [[1.69711698E12, 188.15999999999994]], "isOverall": false, "label": "/api/v2/documents/search-244", "isController": false}, {"data": [[1.69711698E12, 233.83]], "isOverall": false, "label": "/_next/image/-194", "isController": false}, {"data": [[1.69711698E12, 860.0299999999999]], "isOverall": false, "label": "/_next/static/chunks/797-18c400db763eb22a.js-213", "isController": false}, {"data": [[1.69711698E12, 186.54]], "isOverall": false, "label": "/_next/image/-193", "isController": false}, {"data": [[1.69711698E12, 220.7999999999999]], "isOverall": false, "label": "/_next/image/-192", "isController": false}, {"data": [[1.69711698E12, 218.60999999999993]], "isOverall": false, "label": "/_next/image/-191", "isController": false}, {"data": [[1.69711698E12, 51.00000000000001]], "isOverall": false, "label": "/success.txt-240", "isController": false}, {"data": [[1.69711698E12, 53.16999999999999]], "isOverall": false, "label": "/success.txt-241", "isController": false}, {"data": [[1.69711698E12, 428.6499999999999]], "isOverall": false, "label": "/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf-217", "isController": false}, {"data": [[1.69711698E12, 149.26999999999998]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketplace-77437c68984ecd13.js-232", "isController": false}, {"data": [[1.69711698E12, 137.06000000000003]], "isOverall": false, "label": "/_next/image/-187", "isController": false}, {"data": [[1.69711698E12, 174.12]], "isOverall": false, "label": "/_next/image/-186", "isController": false}, {"data": [[1.69711698E12, 145.16000000000008]], "isOverall": false, "label": "/_next/image/-185", "isController": false}, {"data": [[1.69711698E12, 125.35999999999997]], "isOverall": false, "label": "/_next/image/-184", "isController": false}, {"data": [[1.69711698E12, 140.63]], "isOverall": false, "label": "/_next/image/-189", "isController": false}, {"data": [[1.69711698E12, 156.57999999999998]], "isOverall": false, "label": "/_next/image/-188", "isController": false}, {"data": [[1.69711698E12, 178.18]], "isOverall": false, "label": "/_next/static/css/59ae46ebdb9b2558.css-238", "isController": false}, {"data": [[1.69711698E12, 140.26000000000002]], "isOverall": false, "label": "/_next/image/-183", "isController": false}, {"data": [[1.69711698E12, 120.94000000000001]], "isOverall": false, "label": "/_next/image/-182", "isController": false}, {"data": [[1.69711698E12, 116.13000000000004]], "isOverall": false, "label": "/_next/image/-181", "isController": false}, {"data": [[1.69711698E12, 116.49999999999997]], "isOverall": false, "label": "/_next/image/-180", "isController": false}, {"data": [[1.69711698E12, 193.3599999999999]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/fintech-2922fd056459d217.js-230", "isController": false}, {"data": [[1.69711698E12, 163.89]], "isOverall": false, "label": "/api/v2-242", "isController": false}, {"data": [[1.69711698E12, 413.67]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-211", "isController": false}, {"data": [[1.69711698E12, 516.3600000000001]], "isOverall": false, "label": "/_next/image/-219", "isController": false}, {"data": [[1.69711698E12, 434.3400000000001]], "isOverall": false, "label": "/_next/image/-218", "isController": false}, {"data": [[1.69711698E12, 287.3500000000001]], "isOverall": false, "label": "/v4/fullHashes:find-234", "isController": false}, {"data": [[1.69711698E12, 145.61]], "isOverall": false, "label": "/_next/image/-176", "isController": false}, {"data": [[1.69711698E12, 105.50999999999998]], "isOverall": false, "label": "/_next/image/-175", "isController": false}, {"data": [[1.69711698E12, 273.01999999999987]], "isOverall": false, "label": "/-220", "isController": false}, {"data": [[1.69711698E12, 163.00999999999996]], "isOverall": false, "label": "/_next/static/css/20a83c45c1ae9f97.css-237", "isController": false}, {"data": [[1.69711698E12, 117.62000000000005]], "isOverall": false, "label": "/_next/image/-174", "isController": false}, {"data": [[1.69711698E12, 146.24]], "isOverall": false, "label": "/_next/image/-173", "isController": false}, {"data": [[1.69711698E12, 256.44999999999993]], "isOverall": false, "label": "/_next/image/-250", "isController": false}, {"data": [[1.69711698E12, 128.12000000000006]], "isOverall": false, "label": "/_next/image/-179", "isController": false}, {"data": [[1.69711698E12, 304.77]], "isOverall": false, "label": "/_next/image/-212", "isController": false}, {"data": [[1.69711698E12, 131.23000000000002]], "isOverall": false, "label": "/_next/image/-178", "isController": false}, {"data": [[1.69711698E12, 99.58000000000006]], "isOverall": false, "label": "/canonical.html-239", "isController": false}, {"data": [[1.69711698E12, 136.14999999999998]], "isOverall": false, "label": "/_next/image/-177", "isController": false}, {"data": [[1.69711698E12, 508.6299999999999]], "isOverall": false, "label": "/_next/image/-210", "isController": false}, {"data": [[1.69711698E12, 476.12]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketing-c2c36989b4610793.js-216", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711698E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69711698E12, "maxY": 508.77000000000015, "series": [{"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-172", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-171", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/privacy-policy-acad0aee1f8a2872.js-233", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-170", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/api/v2/documents/search-226", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/api/v2/documents/search-227", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-163", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-206", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-205", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-249", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-204", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-248", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-203", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/media/Spin.df15a301.svg-222", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-247", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-209", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-208", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-207", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-165", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/contacts-35642fc97e509742.js-228", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-162", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-169", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-202", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-246", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-168", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-201", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-245", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-167", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-200", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-166", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-161", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-160", "isController": false}, {"data": [[1.69711698E12, 226.32999999999998]], "isOverall": false, "label": "/g/collect?v=2&tid=G-0RYFMW13ZL&gtm=45je3ab0&_p=2116546750&cid=1373326669.1697116895&ul=uk-ua&sr=1536x864&_eu=AEA&dl=https%3A%2F%2Fluxequality.letkabackend.click%2Fcase-studies%2F&dr=https%3A%2F%2Fluxequality.letkabackend.click%2F&sid=1697116895&sct=1&seg=1&dt=IT%20Case%20Studies%20%7C%20Luxe%20Quality&_s=2-223", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/css/cbd65f856dbf3e21.css-215", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-251", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-159", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-236", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/api/v2-224", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/css/5d869858990e49ff.css-164", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-198", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-197", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-196", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-195", "isController": false}, {"data": [[1.69711698E12, 508.77000000000015]], "isOverall": false, "label": "/api/v2-225", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-158", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-235", "isController": false}, {"data": [[1.69711698E12, 236.79]], "isOverall": false, "label": "/_next/image/-157", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/case-studies/%5Buid%5D-0235c985b6686f83.js-221", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-252", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-199", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/css/a6f7e359f7dbdb6d.css-214", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/healthcare-bcc367f49e962b69.js-229", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-190", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/api/v2/documents/search-243", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/e-commerce-eaab52b163b20c61.js-231", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/api/v2/documents/search-244", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-194", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/797-18c400db763eb22a.js-213", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-193", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-192", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-191", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/success.txt-240", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/success.txt-241", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf-217", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketplace-77437c68984ecd13.js-232", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-187", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-186", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-185", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-184", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-189", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-188", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/css/59ae46ebdb9b2558.css-238", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-183", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-182", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-181", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-180", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/fintech-2922fd056459d217.js-230", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/api/v2-242", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-211", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-219", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-218", "isController": false}, {"data": [[1.69711698E12, 202.40000000000003]], "isOverall": false, "label": "/v4/fullHashes:find-234", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-176", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-175", "isController": false}, {"data": [[1.69711698E12, 209.54999999999993]], "isOverall": false, "label": "/-220", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/css/20a83c45c1ae9f97.css-237", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-174", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-173", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-250", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-179", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-212", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-178", "isController": false}, {"data": [[1.69711698E12, 49.969999999999985]], "isOverall": false, "label": "/canonical.html-239", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-177", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/image/-210", "isController": false}, {"data": [[1.69711698E12, 0.0]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketing-c2c36989b4610793.js-216", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711698E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 27.0, "minX": 1.69711698E12, "maxY": 19068.0, "series": [{"data": [[1.69711698E12, 19068.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69711698E12, 553.8999999999996]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69711698E12, 4075.5099999999675]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69711698E12, 831.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69711698E12, 27.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69711698E12, 161.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711698E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 115.0, "minX": 3.0, "maxY": 729.0, "series": [{"data": [[583.0, 125.0], [622.0, 158.0], [658.0, 131.0], [40.0, 448.0], [704.0, 115.0], [743.0, 124.0], [3.0, 305.0], [48.0, 346.0], [50.0, 662.5], [63.0, 253.5], [65.0, 571.0], [68.0, 729.0], [69.0, 508.0], [73.0, 147.0], [76.0, 210.5], [83.0, 247.0], [88.0, 606.5], [93.0, 397.0], [110.0, 267.0], [117.0, 270.0], [120.0, 176.0], [145.0, 227.0], [147.0, 179.0], [181.0, 163.5], [190.0, 374.5], [184.0, 198.0], [187.0, 293.0], [196.0, 453.0], [195.0, 181.0], [205.0, 212.0], [222.0, 187.0], [229.0, 154.0], [232.0, 169.5], [248.0, 199.0], [285.0, 156.5], [17.0, 278.0], [330.0, 230.0], [20.0, 139.0], [27.0, 403.0], [454.0, 157.0], [451.0, 134.0], [497.0, 159.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[147.0, 177.0], [40.0, 333.0], [181.0, 207.0], [184.0, 243.0], [187.0, 446.0], [48.0, 192.0], [195.0, 197.0], [50.0, 357.0], [205.0, 225.5], [222.0, 220.0], [63.0, 199.0], [248.0, 394.0], [65.0, 194.0], [68.0, 211.0], [285.0, 170.0], [76.0, 284.5], [83.0, 223.0], [93.0, 218.0], [27.0, 258.0], [110.0, 235.0], [117.0, 221.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 743.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 114.0, "minX": 3.0, "maxY": 724.0, "series": [{"data": [[583.0, 125.0], [622.0, 158.0], [658.0, 131.0], [40.0, 429.0], [704.0, 115.0], [743.0, 124.0], [3.0, 305.0], [48.0, 318.0], [50.0, 544.5], [63.0, 219.5], [65.0, 486.0], [68.0, 724.0], [69.0, 492.0], [73.0, 146.0], [76.0, 209.5], [83.0, 157.0], [88.0, 606.5], [93.0, 380.0], [110.0, 254.0], [117.0, 178.0], [120.0, 165.0], [145.0, 227.0], [147.0, 171.0], [181.0, 158.5], [190.0, 341.5], [184.0, 177.0], [187.0, 242.0], [196.0, 453.0], [195.0, 169.0], [205.0, 207.0], [222.0, 173.5], [229.0, 151.0], [232.0, 161.0], [248.0, 170.0], [285.0, 151.0], [17.0, 245.0], [330.0, 230.0], [20.0, 114.0], [27.0, 391.0], [454.0, 157.0], [451.0, 134.0], [497.0, 159.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[147.0, 176.5], [40.0, 333.0], [181.0, 207.0], [184.0, 242.0], [187.0, 446.0], [48.0, 192.0], [195.0, 197.0], [50.0, 356.5], [205.0, 225.5], [222.0, 220.0], [63.0, 198.0], [248.0, 393.5], [65.0, 194.0], [68.0, 211.0], [285.0, 169.5], [76.0, 284.5], [83.0, 222.5], [93.0, 218.0], [27.0, 258.0], [110.0, 235.0], [117.0, 221.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 743.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 160.0, "minX": 1.69711698E12, "maxY": 160.0, "series": [{"data": [[1.69711698E12, 160.0]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711698E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.69711698E12, "maxY": 156.66666666666666, "series": [{"data": [[1.69711698E12, 156.66666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "204", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69711698E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.69711698E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-245-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-251-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-183-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-168-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-185-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketing-c2c36989b4610793.js-216-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-166-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/e-commerce-eaab52b163b20c61.js-231-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-198-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-249-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-194-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/healthcare-bcc367f49e962b69.js-229-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-179-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/case-studies/%5Buid%5D-0235c985b6686f83.js-221-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/canonical.html-239-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf-217-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/css/20a83c45c1ae9f97.css-237-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-219-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-196-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-206-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-181-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-190-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-207-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-177-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-250-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-192-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-235-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/success.txt-241-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-189-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/g/collect?v=2&tid=G-0RYFMW13ZL&gtm=45je3ab0&_p=2116546750&cid=1373326669.1697116895&ul=uk-ua&sr=1536x864&_eu=AEA&dl=https%3A%2F%2Fluxequality.letkabackend.click%2Fcase-studies%2F&dr=https%3A%2F%2Fluxequality.letkabackend.click%2F&sid=1697116895&sct=1&seg=1&dt=IT%20Case%20Studies%20%7C%20Luxe%20Quality&_s=2-223-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-204-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-158-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-161-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-175-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-209-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-171-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/api/v2/documents/search-244-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-187-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/fintech-2922fd056459d217.js-230-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-202-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-200-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-247-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/api/v2/documents/search-227-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/v4/fullHashes:find-234-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-173-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/css/5d869858990e49ff.css-164-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-199-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-169-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/css/cbd65f856dbf3e21.css-215-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-182-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/css/59ae46ebdb9b2558.css-238-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-212-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-197-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/contacts-35642fc97e509742.js-228-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-184-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-218-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-167-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/css/a6f7e359f7dbdb6d.css-214-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/media/Spin.df15a301.svg-222-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-193-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-165-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-210-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/industries/marketplace-77437c68984ecd13.js-232-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-178-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-205-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-180-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/api/v2-225-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-195-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/api/v2-242-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/api/v2-224-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-160-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/api/v2/documents/search-226-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-176-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-191-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-208-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-174-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-236-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-162-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-163-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/797-18c400db763eb22a.js-213-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-159-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-203-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/success.txt-240-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-157-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-170-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/%5Bservice%5D-6c3b67218d74b90c.js-211-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-248-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-188-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/blog/%5Buid%5D-a8da6eab06234027.js-252-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-201-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-172-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-186-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/static/chunks/pages/privacy-policy-acad0aee1f8a2872.js-233-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/api/v2/documents/search-243-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/-220-failure", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "/_next/image/-246-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711698E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.69711698E12, "maxY": 158.33333333333334, "series": [{"data": [[1.69711698E12, 158.33333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.69711698E12, 1.6666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69711698E12, "title": "Total Transactions Per Second"}},
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
