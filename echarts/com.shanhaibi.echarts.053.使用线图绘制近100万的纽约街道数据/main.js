(async function () {
    await ShanhaiBI.initSettings({
        "format": [
            {
                name: "line-color",
                alias: "线条颜色",
                type: "color",
                default: "#ffa500"
            }
        ]
    })

    let ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
    let dom = document.getElementById("container");
    let myChart = echarts.init(dom);

    var CHUNK_COUNT = 32;
    var dataCount = 0;
    
    let option = {
        progressive: 20000,
        backgroundColor: "#111",
        geo: {
            center: [-74.04327099998152, 40.86737600240287],
            zoom: 360,
            map: 'world',
            roam: true,
            silent: true,
            itemStyle: {
                color: 'transparent',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1
            }
        },
        series: [
            {
                type: 'lines',
                coordinateSystem: 'geo',
                blendMode: 'lighter',
                dimensions: ['value'],
                data: new Float64Array(),
                polyline: true,
                large: true,
                lineStyle: {
                    color: await ShanhaiBI.getSetting("line-color"),
                    width: 0.5,
                    opacity: 0.3
                }
            }
        ]
    };
    fetchData(0);

    option && myChart.setOption(option);

    function fetchData(idx) {
        if (idx >= CHUNK_COUNT) {
            return;
        }
        var dataURL =
            ROOT_PATH + '/data/asset/data/links-ny/links_ny_' + idx + '.bin';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', dataURL, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (e) {
            var rawData = new Float32Array(this.response);
            var data = new Float64Array(rawData.length - 2);
            var offsetX = rawData[0];
            var offsetY = rawData[1];
            var off = 0;
            var addedDataCount = 0;
            for (var i = 2; i < rawData.length;) {
                var count = rawData[i++];
                data[off++] = count;
                for (var k = 0; k < count; k++) {
                    var x = rawData[i++] + offsetX;
                    var y = rawData[i++] + offsetY;
                    data[off++] = x;
                    data[off++] = y;
                    addedDataCount++;
                }
            }
            myChart.appendData({
                seriesIndex: 0,
                data: data
            });
            dataCount += addedDataCount;
            fetchData(idx + 1);
        };
        xhr.send();
    }
})();