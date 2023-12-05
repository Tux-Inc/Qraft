<script setup lang="ts">
const chartOptions = {
    chart: {
        height: 350,
        type: "area",
        foreColor: "#fff",
        toolbar: {
            show: false,
        },
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
    },
    xaxis: {
        type: "datetime",
        categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
        ],
    },
    tooltip: {
        x: {
            format: "dd/MM/yy HH:mm",
        },
    },
};
const series = [
    {
        name: "Node 1",
        data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
        name: "Node 2",
        data: [11, 32, 45, 32, 34, 52, 41],
    },
];
</script>

<template>
    <div>
        <ClientOnly>
            <apexchart
                type="area"
                height="250"
                :options="chartOptions"
                :series="series"
            ></apexchart>
        </ClientOnly>
    </div>
</template>
