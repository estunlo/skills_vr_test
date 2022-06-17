<template>
  <Pie
    class="mt-5"
    :chart-options="chartOptions"
    :chart-data="fnmPie.fnmPieData"
    :chart-id="fnmPie.chartId"
  />
</template>

<script>
import { Pie } from 'vue-chartjs/legacy';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';
import userData from "../../data/quiz.json";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  created () {
    this.initFemaleAndMalePieData();
  },
  components: {
    Pie
  },
  data () {
    return {
      userData: userData,
      fnmPie: {
        fnmPieData: {
          labels: ['Female', 'Male'],
          datasets: [],
        },
        chartId: 'fnm-pie'
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
     initFemaleAndMalePieData () {
      const femaleCount = this.userData.filter(u => u['gender'] === 'Female').length;
      const maleCount = this.userData.filter(u => u['gender'] === 'Male').length;
      this.fnmPie.fnmPieData.datasets = [
        {
          backgroundColor: ['#79dfc1', '#ffe69c'],
          data: [femaleCount / this.userData.length * 100, maleCount / this.userData.length * 100]
        }
      ]
    }
  }
}
</script>
<style lang="">
    
</style>