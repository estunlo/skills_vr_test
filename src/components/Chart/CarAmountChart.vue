<template>
  <div class="line-container px-5 pb-5 pt-3">
    <button
      id="sort_btn"
      type="button" 
      class="btn mb-4 ms-auto d-block"
      @click="onSortOrderClick"
    >{{ asc ? 'Ascending' : 'Descending' }}
        <i class="bi ms-2" :class="asc ? 'bi-sort-down-alt' : 'bi-sort-down'"></i>
    </button>
    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="carAmountLine.carAmountLineData"
      :chart-id="carAmountLine.chartId"
    />
  </div>
  
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'
import userData from "../../data/quiz.json";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  created () {
    this.initCarAmountLineData();
  },
  components: {
    LineChartGenerator
  },
  data () {
    return {
      userData: userData,
      ascLabels: [],
      preSortedData: [],
      carAmountLine: {
        carAmountLineData: {
          labels: [],
          datasets: [],
        },
        chartId: 'car-amount-line'
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      asc: true
    }
  },
  methods: {
    onSortOrderClick () {
      this.asc = !this.asc
      this.preSortedData = this.preSortedData.reverse();
      this.updateData();
    },
    updateData () {
      this.carAmountLine.carAmountLineData.datasets = [
        {
          label: 'Cars',
          backgroundColor: '#fecba1',
          data: this.preSortedData.map(([key, group]) => group.length)
        }
      ];
      this.carAmountLine.carAmountLineData.labels = this.preSortedData.map(([key, group]) => key);
    },
    initCarAmountLineData () {
      const genderGroup = this.userData.reduce((group, user) => {
        const { gender } = user;
        group[gender] = group[gender] ?? [];
        group[gender].push(user);
        return group
      }, {});

      this.preSortedData = Object.entries(genderGroup).sort((a, b) => {
        return a[1].length - b[1].length
      }).map(([key, group]) => [key, group.filter(u => u['car_make'])]);
      
      this.updateData();
    }
  }
}
</script>
<style lang="less">
  .line-container {
    background-color: #f8f9fa;
    #sort_btn {
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
      &:focus {
        box-shadow: none;
      }
    }    
  }
</style>