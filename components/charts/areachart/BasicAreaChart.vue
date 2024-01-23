<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
const series = ref([
  {
    name: "Open Rate",
    data: [0, 5, 6, 8, 25, 9, 8, 24],
  },
  {
    name: "Recurring Payments",
    data: [0, 3, 1, 2, 8, 1, 5, 1],
  },
]);

const labels = ref(["Jan", "Feb", "Mar", "Jun", "Jul", "Aug", "Sep"]);
const chartOptions = computed(() => {
  return {
    chart: {
      type: "area",
      height: 300,
      fontFamily: `inherit`,
      foreColor: "#adb0bb",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#4782FB", "#47C4F4"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: "3",
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00",
        "2018-09-19T01:30:00",
        "2018-09-19T02:30:00",
        "2018-09-19T03:30:00",
        "2018-09-19T04:30:00",
        "2018-09-19T05:30:00",
        "2018-09-19T06:30:00",
      ],
    },
    yaxis: {
      opposite: false,
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: "dark",
    },
  };
});
</script>

<template>
  <apexchart
    type="area"
    height="400px"
    :options="chartOptions"
    :series="series"
  >
  </apexchart>
</template>

<style scoped lang="scss"></style>
