var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var option;

var chart_title = "Olympic Spectator Activities in Paris 2024";
var data = [
  { value: 35, name: "🇫🇷 Trying to pronounce French athlete names" },
  { value: 25, name: "🥐 Hunting for the perfect croissant" },
  { value: 20, name: "🤺 Pretending to understand fencing rules" },
  { value: 15, name: "📸 Instagramming every moment" },
  { value: 5, name: "🏅 Actually watching the events" },
];

option = {
  title: {
    text: chart_title,
    left: "center",
    textStyle: {
      fontSize: 70,
      width: 1000,
      overflow: "break",
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
        fontSize: 30,
        formatter: "{b}\n{d}%",
        overflow: "break",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 34, // set 40 if text isn't too long
          fontWeight: "bold",
        },
      },
      // labelLayout: function (params) {
      //   const isLeft = params.labelRect.x < myChart.getWidth() / 2;
      //   const points = params.labelLinePoints;
      //   // Update the end point.
      //   points[2][0] = isLeft
      //     ? params.labelRect.x
      //     : params.labelRect.x + params.labelRect.width;
      //   return {
      //     labelLinePoints: points,
      //   };
      // },
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
  }, 1500); // Change slice every 2 seconds
}

// Start the highlight loop
highlightLoop();
