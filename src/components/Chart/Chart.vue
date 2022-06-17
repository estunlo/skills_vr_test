<template>
  <div id="app_chart" class="mt-5">
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item" v-for="([key, tab], index) in Object.entries(chartTabs)" :key="index">
        <div
          class="nav-link px-4"
          :class="{ active: currentTab === index }"
          @click="currentTab = index"
        >
          {{ tab }}
        </div>
      </li>
    </ul>
    <h4 class="mt-5 mb-3">{{ chartTabs[currentTab] }}</h4>
    <div class="chart-section">
      <FemaleAndMaleChart v-if="currentTab === 0" />
      <AgeGroupChart v-else-if="currentTab === 1" />
      <CarAmountChart v-else-if="currentTab === 2"/>
    </div>
    
  </div>
</template>

<script>
import FemaleAndMaleChart from './FemaleAndMaleChart.vue';
import AgeGroupChart from './AgeGroupChart.vue';
import CarAmountChart from './CarAmountChart.vue';

export default {
  components: {
    FemaleAndMaleChart,
    AgeGroupChart,
    CarAmountChart
  },
  data() {
    return {
      chartTabs: {
        0: 'Female and male percentage',
        1: 'Age',
        2: 'Car amount'
      },
      currentTab: 0,
    }
  }
}
</script>
<style lang="less">
#app_chart {
  h4 {
    color: #FFFFFF;
    text-align: center;
  }
  .nav-tabs {
    border-bottom: none;
    .nav-item {
      border-bottom: 1px solid #dee2e6;
      .nav-link {
        color: #d2f4ea;
        cursor: pointer;
        border: none;
        font-size: 1.2rem;
        letter-spacing: 0.05rem;
        border-radius: 0;
        &:hover {
          background-color: #0b755539;
        }
        &.active {
          color: #06281e;
          &:hover {
            background-color: #fff;
          }
        }
      }
    }
  }
  .chart-section {
    max-width: 700px;
    margin: 0 auto
  }
}
</style>