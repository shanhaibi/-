(async function () {
    await ShanhaiBI.initSettings({
        "fields": [
            {
                name: "axis-x",
                type: "axis",
                alias: "x轴数据"
            },
            {
                name: "axis-y",
                alias: "y轴数据",
                type: "axis"
            }
        ],
        "format": [
            {
                name: "yang-line-color",
                alias: "阳线颜色",
                type: "color",
                default: "#ec0000"
            },
            {
                name: "yang-line-border-color",
                alias: "阳线边框色",
                type: "color",
                default: "#8A0000"
            },
            {
                name: "yin-line-border-color",
                alias: "阴线边框色",
                type: "color",
                default: "#008F28"
            },
            {
                name: "yin-line-color",
                alias: "阴线颜色",
                type: "color",
                default: "#00da3c"
            }
        ]
    })

    let dom = document.getElementById("container");
    let myChart = echarts.init(dom);

    let data = await ShanhaiBI.getData();
    let x_axis_data = data.getColumn("axis-x");
    let y_data = data.getColumns("axis-y");
    if (y_data.length < 4 || !x_axis_data.length) {
        x_axis_data = [
            "2013/1/24", "2013/1/25", "2013/1/28", "2013/1/29", "2013/1/30", "2013/1/31",
            "2013/2/1", "2013/2/4", "2013/2/5", "2013/2/6", "2013/2/7", "2013/2/8",
            "2013/2/18", "2013/2/19", "2013/2/20", "2013/2/21", "2013/2/22", "2013/2/25",
            "2013/2/26", "2013/2/27", "2013/2/28", "2013/3/1", "2013/3/4", "2013/3/5",
            "2013/3/6", "2013/3/7", "2013/3/8", "2013/3/11", "2013/3/12", "2013/3/13",
            "2013/3/14", "2013/3/15", "2013/3/18", "2013/3/19", "2013/3/20", "2013/3/21",
            "2013/3/22", "2013/3/25", "2013/3/26", "2013/3/27", "2013/3/28", "2013/3/29",
            "2013/4/1", "2013/4/2", "2013/4/3", "2013/4/8", "2013/4/9", "2013/4/10", "2013/4/11",
            "2013/4/12", "2013/4/15", "2013/4/16", "2013/4/17", "2013/4/18", "2013/4/19", "2013/4/22",
            "2013/4/23", "2013/4/24", "2013/4/25", "2013/4/26", "2013/5/2", "2013/5/3", "2013/5/6",
            "2013/5/7", "2013/5/8", "2013/5/9", "2013/5/10", "2013/5/13", "2013/5/14", "2013/5/15",
            "2013/5/16", "2013/5/17", "2013/5/20", "2013/5/21", "2013/5/22", "2013/5/23", "2013/5/24",
            "2013/5/27", "2013/5/28", "2013/5/29", "2013/5/30", "2013/5/31", "2013/6/3", "2013/6/4",
            "2013/6/5", "2013/6/6", "2013/6/7", "2013/6/13"
        ];
        y_data = [
            [
                2320.26, 2300, 2295.35, 2347.22, 2360.75, 2383.43, 2377.41, 2425.92, 2411, 2432.68, 2430.69, 2416.62,
                2441.91, 2420.26, 2383.49, 2378.82, 2322.94, 2320.62, 2313.74, 2297.77, 2322.32, 2364.54, 2332.08,
                2274.81, 2333.61, 2340.44, 2326.42, 2314.68, 2309.16, 2282.17, 2255.77, 2269.31, 2267.29, 2244.26,
                2257.74, 2318.21, 2321.4, 2334.74, 2318.58, 2299.38, 2273.55, 2238.49, 2229.46, 2234.9, 2232.69,
                2196.24, 2215.47, 2224.93, 2236.98, 2218.09, 2199.91, 2169.63, 2195.03, 2181.82, 2201.12, 2236.4,
                2242.62, 2187.35, 2213.19, 2203.89, 2170.78, 2179.05, 2212.5, 2227.86, 2242.39, 2246.96, 2228.82,
                2247.68, 2238.9, 2217.09, 2221.34, 2249.81, 2286.33, 2297.11, 2303.75, 2293.81, 2281.45, 2286.66,
                2293.4, 2323.54, 2316.25, 2320.74, 2300.21, 2297.1, 2270.71, 2264.43, 2242.26, 2190.1
            ],
            [
                2320.26, 2291.3, 2346.5, 2358.98, 2382.48, 2385.42, 2419.02, 2428.15, 2433.13, 2434.48, 2418.53,
                2432.4, 2421.56, 2382.91, 2397.18, 2325.95, 2314.16, 2325.82, 2293.34, 2313.22, 2365.59, 2359.51,
                2273.4, 2326.31, 2347.18, 2324.29, 2318.61, 2310.59, 2286.6, 2263.97, 2270.28, 2278.4, 2240.02,
                2257.43, 2317.37, 2324.24, 2328.28, 2326.72, 2297.67, 2301.26, 2236.3, 2236.62, 2234.4, 2227.74,
                2225.29, 2211.59, 2225.77, 2226.13, 2219.55, 2206.78, 2181.94, 2194.85, 2193.8, 2197.6, 2244.64,
                2242.17, 2184.54, 2218.32, 2199.31, 2177.91, 2174.12, 2205.5, 2231.17, 2235.57, 2246.3, 2232.97,
                2246.83, 2241.92, 2217.01, 2224.8, 2251.81, 2282.87, 2299.99, 2305.11, 2302.4, 2275.67, 2288.53,
                2293.08, 2321.32, 2324.02, 2317.75, 2300.59, 2299.25, 2272.42, 2270.93, 2242.11, 2210.9, 2148.35
            ],
            [
                2287.3, 2288.26, 2295.35, 2337.35, 2347.89, 2371.23, 2369.57, 2417.58, 2403.3, 2427.7, 2394.22,
                2414.4, 2415.43, 2373.53, 2370.61, 2309.17, 2308.76, 2315.01, 2289.89, 2292.03, 2308.92, 2330.86,
                2259.25, 2270.1, 2321.6, 2304.27, 2314.59, 2296.58, 2264.83, 2253.25, 2253.31, 2250, 2239.21, 2232.02,
                2257.42, 2311.6, 2314.97, 2319.91, 2281.12, 2289, 2232.91, 2228.81, 2227.31, 2220.44, 2217.25, 2180.67,
                2215.47, 2212.56, 2217.26, 2204.44, 2177.39, 2165.78, 2178.47, 2175.44, 2200.58, 2232.26, 2182.81,
                2184.11, 2191.85, 2173.86, 2161.14, 2179.05, 2212.5, 2219.44, 2235.42, 2221.38, 2225.81, 2231.36,
                2205.87, 2213.58, 2210.77, 2248.41, 2281.9, 2290.12, 2292.43, 2274.1, 2270.25, 2283.94, 2281.47,
                2321.17, 2310.49, 2299.37, 2294.11, 2264.76, 2260.87, 2240.07, 2205.07, 2126.22
            ],
            [
                2362.94, 2308.38, 2346.92, 2363.8, 2383.76, 2391.82, 2421.15, 2440.38, 2437.42, 2441.73, 2433.89, 2443.03,
                2444.8, 2427.07, 2397.94, 2378.82, 2330.88, 2338.78, 2340.71, 2324.63, 2366.16, 2369.65, 2333.54, 2328.14,
                2351.44, 2352.02, 2333.67, 2320.96, 2333.29, 2286.33, 2276.22, 2312.08, 2276.05, 2261.31, 2317.86, 2330.81,
                2332, 2344.89, 2319.99, 2323.48, 2273.55, 2246.87, 2243.95, 2253.42, 2241.34, 2212.59, 2234.73, 2233.04,
                2242.48, 2226.26, 2204.99, 2196.43, 2197.51, 2206.03, 2250.11, 2245.12, 2242.62, 2226.12, 2224.63, 2210.58,
                2179.65, 2222.81, 2236.07, 2240.26, 2255.21, 2247.86, 2247.67, 2250.85, 2239.93, 2225.19, 2252.87, 2288.09,
                2309.39, 2305.3, 2314.18, 2304.95, 2292.59, 2301.7, 2322.1, 2334.33, 2325.72, 2325.53, 2313.43, 2297.1,
                2276.86, 2266.69, 2250.63, 2190.1
            ]
        ];
    }
    let y_axis_data = [];
    for (let i = 0; i < y_data[0].length; i++) {
        y_axis_data.push([y_data[0][i], y_data[1][i], y_data[2][i], y_data[3][i]]);
    }

    let option = {
        title: {
            text: '上证指数',
            left: 0
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
            top: '5%',
            textStyle: {
                color: "#aaa"
            }
        },
        grid: {
            top: "10%",
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: x_axis_data,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                top: '90%',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: '日K',
                type: 'candlestick',
                data: y_axis_data,
                itemStyle: {
                    color: await ShanhaiBI.getSetting("yang-line-color"),
                    color0: await ShanhaiBI.getSetting("yin-line-color"),
                    borderColor: await ShanhaiBI.getSetting("yang-line-border-color"),
                    borderColor0: await ShanhaiBI.getSetting("yin-line-border-color")
                },
                markPoint: {
                    label: {
                        formatter: function (param) {
                            return param != null ? Math.round(param.value) + '' : '';
                        }
                    },
                    data: [
                        {
                            name: 'Mark',
                            coord: ['2013/5/31', 2300],
                            value: 2300,
                            itemStyle: {
                                color: 'rgb(41,60,85)'
                            }
                        },
                        {
                            name: 'highest value',
                            type: 'max',
                            valueDim: 'highest'
                        },
                        {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'
                        },
                        {
                            name: 'average value on close',
                            type: 'average',
                            valueDim: 'close'
                        }
                    ],
                    tooltip: {
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],
                    data: [
                        [
                            {
                                name: 'from lowest to highest',
                                type: 'min',
                                valueDim: 'lowest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    show: false
                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            {
                                type: 'max',
                                valueDim: 'highest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    show: false
                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    }
                                }
                            }
                        ],
                        {
                            name: 'min line on close',
                            type: 'min',
                            valueDim: 'close',
                            label: {
                                color: "#fff"
                            }
                        },
                        {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close',
                            label: {
                                color: "#fff"
                            }
                        }
                    ]
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            }
        ]
    };
    myChart.setOption(option);

    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = y_axis_data.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += +y_axis_data[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }
})();