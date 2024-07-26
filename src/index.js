var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var app = {};

// const waterMarkText = "Funny Charts";
// const canvas = document.createElement("canvas");
// const ctx = canvas.getContext("2d");
// canvas.width = canvas.height = 100;
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
// ctx.globalAlpha = 0.1;
// ctx.font = "20px Microsoft Yahei";
// ctx.translate(50, 50);
// ctx.rotate(-Math.PI / 4);
// ctx.fillText(waterMarkText, 0, 0);

var option;

var data = [
  { value: 40, name: "Lost ball 😱" },
  { value: 25, name: "Complaining 🤬" },
  { value: 20, name: "Hitting the ball 🏌️‍♂️" },
  { value: 15, name: "Nature break 🌳" },
];


var chart_title = "How a Golfer\nSpends Their Time";


option = {
  title: {
    text: chart_title,
    left: "center",
    textStyle: {
      fontSize: 70,
    },
    top: 100,
  },
  tooltip: {
    trigger: "item",
  },
  toolbox: {
    show: true,
    feature: {
      restore: {},
      saveAsImage: {},
    },
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: ["10%", "20%"],
      center: ["50%", "50%"],
      top: 100,
      // left: auto,
      label: {
        show: true,
        alignTo: "edge",
        minMargin: 80,
        edgeDistance: 50,
        lineHeight: 50,
        fontSize: 40,
        formatter: "{b}\n{d}%",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLayout: function (params) {
        const isLeft = params.labelRect.x < myChart.getWidth() / 2;
        const points = params.labelLinePoints;
        // Update the end point.
        points[2][0] = isLeft
          ? params.labelRect.x
          : params.labelRect.x + params.labelRect.width;
        return {
          labelLinePoints: points,
        };
      },
      data: data,
    },
  ],
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
