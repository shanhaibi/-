(async function () {
    await ShanhaiBI.initSettings({
        "format": [
          
            {
                name: "shape-color",
                alias: "图形颜色",
                type: "palette",
                default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
            },
            {
                name: "growth-color",
                alias: "growth颜色设置",
                type: "palette",
                default: ['#c23531', '#314656', '#61a0a8', '#dd8668', '#91c7ae', '#6e7074', '#61a0a8', '#bda29a', '#44525d', '#c4ccd3']
            },
            {
                name: "border-color",
                alias: "边框颜色",
                type: "color",
                default: "#000"
            }
        ]
    })

    let ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
    let dom = document.getElementById("container");
    let myChart = echarts.init(dom);

    let shape_color = await ShanhaiBI.getSetting("shape-color");
    let border_color = await ShanhaiBI.getSetting("border-color");
    let growth_color = await ShanhaiBI.getSetting("growth-color");

    myChart.showLoading();
    const household_america_2012 = 113616229;
    $.get(ROOT_PATH + '/data/asset/data/obama_budget_proposal_2012.json', function (obama_budget_2012) {
        myChart.hideLoading();
        let modes = ['2012Budget', '2011Budget', 'Growth'];
        let option = {
            title: {
                top: 5,
                left: 'center',
                text: 'How $3.7 Trillion is Spent',
                subtext: 'Obama’s 2012 Budget Proposal'
            },
            legend: {
                data: modes,
                selectedMode: 'single',
                top: 55,
                itemGap: 5,
                borderRadius: 5,
                labelStyle: {
                    color: "#aaa"
                }
            },
            tooltip: {},
            series: modes.map(function (mode, idx) {
                let seriesOpt = createSeriesCommon(idx);
                seriesOpt.name = mode;
                seriesOpt.top = 80;
                seriesOpt.visualDimension = idx === 2 ? 2 : undefined;
                seriesOpt.data = buildData(idx, obama_budget_2012);
                seriesOpt.levels = getLevelOption(idx);
                return seriesOpt;
            })
        }
        myChart.setOption(option);
    });
    function buildData(mode, originList) {
        let out = [];
        for (let i = 0; i < originList.length; i++) {
            let node = originList[i];
            let newNode = cloneNodeInfo(node);
            if (!newNode) {
                continue;
            }
            out[i] = newNode;
            let value = newNode.value;
            // Calculate amount per household.
            value[3] = value[0] / household_america_2012;
            // if mode === 0 and mode === 2 do nothing
            if (mode === 1) {
                // Set 'Change from 2010' to value[0].
                let tmp = value[1];
                value[1] = value[0];
                value[0] = tmp;
            }
            if (node.children) {
                newNode.children = buildData(mode, node.children);
            }
        }
        return out;
    }
    function cloneNodeInfo(node) {
        if (!node) {
            return;
        }
        const newNode = {};
        newNode.name = node.name;
        newNode.id = node.id;
        newNode.value = (node.value || []).slice();
        return newNode;
    }
    function getLevelOption(mode) {
        return [
            {
                color:
                    mode === 2 ? growth_color: shape_color,
                colorMappingBy: 'id',
                itemStyle: {
                    borderWidth: 3,
                    gapWidth: 3
                }
            },
            {
                colorAlpha: mode === 2 ? [0.5, 1] : undefined,
                itemStyle: {
                    gapWidth: 1
                }
            }
        ];
    }
    function isValidNumber(num) {
        return num != null && isFinite(num);
    }
    function getTooltipFormatter(mode) {
        let amountIndex = mode === 1 ? 1 : 0;
        let amountIndex2011 = mode === 1 ? 0 : 1;
        return function (info) {
            let value = info.value;
            let amount = value[amountIndex];
            amount = isValidNumber(amount)
                ? echarts.format.addCommas(amount * 1000) + '$'
                : '-';
            let amount2011 = value[amountIndex2011];
            amount2011 = isValidNumber(amount2011)
                ? echarts.format.addCommas(amount2011 * 1000) + '$'
                : '-';
            let perHousehold = value[3];
            perHousehold = isValidNumber(perHousehold)
                ? echarts.format.addCommas(+perHousehold.toFixed(4) * 1000) + '$'
                : '-';
            let change = value[2];
            change = isValidNumber(change) ? change.toFixed(2) + '%' : '-';
            return [
                '<div class="tooltip-title">' +
                echarts.format.encodeHTML(info.name) +
                '</div>',
                '2012 Amount: &nbsp;&nbsp;' + amount + '<br>',
                'Per Household: &nbsp;&nbsp;' + perHousehold + '<br>',
                '2011 Amount: &nbsp;&nbsp;' + amount2011 + '<br>',
                'Change From 2011: &nbsp;&nbsp;' + change
            ].join('');
        };
    }
    function createSeriesCommon(mode) {
        return {
            type: 'treemap',
            tooltip: {
                formatter: getTooltipFormatter(mode)
            },
            label: {
                position: 'insideTopLeft',
                formatter: function (params) {
                    let arr = [
                        '{name|' + params.name + '}',
                        '{hr|}',
                        '{budget|$ ' +
                        echarts.format.addCommas(params.value[0]) +
                        '} {label|budget}'
                    ];
                    mode !== 1 &&
                        arr.push(
                            '{household|$ ' +
                            echarts.format.addCommas(+params.value[3].toFixed(4) * 1000) +
                            '} {label|per household}'
                        );
                    return arr.join('\n');
                },
                rich: {
                    budget: {
                        fontSize: 22,
                        lineHeight: 30,
                        color: 'yellow'
                    },
                    household: {
                        fontSize: 14,
                        color: '#fff'
                    },
                    label: {
                        fontSize: 9,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        color: '#fff',
                        borderRadius: 2,
                        padding: [2, 4],
                        lineHeight: 25,
                        align: 'right'
                    },
                    name: {
                        fontSize: 12,
                        color: '#fff'
                    },
                    hr: {
                        width: '100%',
                        borderColor: 'rgba(255,255,255,0.2)',
                        borderWidth: 0.5,
                        height: 0,
                        lineHeight: 10
                    }
                }
            },
            itemStyle: {
                borderColor: border_color
            },
            levels: getLevelOption(0)
        };
    }
})()