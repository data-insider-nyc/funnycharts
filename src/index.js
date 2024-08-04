var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var option;

var chart_title = "How a Golfer\nSpends Their Time";
var data = [
  { value: 40, name: "Lost ball 😱" },
  { value: 25, name: "Complaining 🤬" },
  { value: 20, name: "Hitting the ball 🏌️‍♂️" },
  { value: 15, name: "Nature break 🌳" },
];

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
    show: false,
    trigger: "item",
  },
  toolbox: {
    show: true,
    feature: {
      // restore: {},
      // saveAsImage: {},
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
          fontSize: 50,
          fontWeight: "bold",
        },
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

// Set the options to the chart
myChart.setOption(option);

// Resize the chart on window resize
window.addEventListener("resize", function () {
  myChart.resize();
});

function highlightLoop() {
  let currentIndex = -1;
  const dataLen = option.series[0].data.length;

  setInterval(() => {
    // Cancel highlight of previous slice
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });

    // Move to the next slice
    currentIndex = (currentIndex + 1) % dataLen;

    // Highlight the current slice
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });

    // Optionally, display tooltip for the current slice
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
  }, 1000); // Change slice every 2 seconds
}

// Start the highlight loop
highlightLoop();
