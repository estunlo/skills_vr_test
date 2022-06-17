<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="ageBar.ageBarData"
    :chart-id="ageBar.chartId"
  />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import userData from "../../data/quiz.json";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  created () {
    this.initAgeBarData();
  },
  components: {
    Bar
  },
  data () {
    return {
      userData: userData,
      ageBar: {
        ageBarData: {
          labels: [
            '11-20',
            '21-30',
            '31-40',
            '41-50',
            '51-60',
            '61-70',
            '71-80'
          ],
          datasets: [],
        },
        chartId: 'age-bar'
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    initAgeBarData () {
      const ageGroup = this.userData.reduce((group, user) => {
        const { age } = user;
        if (age >= 11 && age <= 20) {
          group['11-20'] = group['11-20'] ?? [];
          group['11-20'].push(user);
        } else if (age >= 21 && age <= 30) {
          group['21-30'] = group['21-30'] ?? [];
          group['21-30'].push(user);
        } else if (age >= 31 && age <= 40) {
          group['31-40'] = group['31-40'] ?? [];
          group['31-40'].push(user);
        } else if (age >= 41 && age <= 50) {
          group['41-50'] = group['41-50'] ?? [];
          group['41-50'].push(user);
        } else if (age >= 51 && age <= 60) {
          group['51-60'] = group['51-60'] ?? [];
          group['51-60'].push(user);  
        } else if (age >= 61 && age <= 70) {
          group['61-70'] = group['61-70'] ?? [];
          group['61-70'].push(user);
        } else if (age >= 71 && age <= 80) {
          group['71-80'] = group['71-80'] ?? [];
          group['71-80'].push(user);
        }
        return group
      }, {});
      this.ageBar.ageBarData.datasets = [
        {
          label: 'User',
          backgroundColor: '#cff4fc',
          data: Object.values(ageGroup).map(g => g.length)
        }
      ]
    }
  }
}
</script>
<style lang="">
    
</style>