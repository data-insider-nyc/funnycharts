var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var option;

var chart_title = "Superheroes and Their Quirky Daily Activities";
var data = [
  { value: 35, name: "🦸‍♂️ Saving the world... with snacks" },
  { value: 25, name: "🦸‍♀️ Fashioning new capes for the season" },
  { value: 20, name: "💥 Training for the next big explosion" },
  { value: 10, name: "⚡️ Speeding through the grocery store" },
  { value: 5, name: "🧘‍♂️ Practicing yoga with sidekicks" },
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
        minMargin: 50,
        edgeDistance: 50,
        // lineHeight: 50,
        fontSize: 25,
        formatter: "{b} {d}%",
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
