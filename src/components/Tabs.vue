<template>
  <div>
    <ul id="app_tabs" class="nav nav-tabs mt-3">
      <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
        <div
          class="nav-link px-4 me-3"
          :class="{ active: currentTab === index }"
          @click="onTabClick(index)"
        >
          {{ tab }}
        </div>
      </li>
    </ul>

    <div class="container-fluid px-0 tab-wrapper">
      <Transition mode="out-in">
        <Table v-if="currentTab === 0" key="table"/>
        <Chart v-else  key="chart"/>
      </Transition>
    </div>
  </div>
</template>

<script>
import Table from './Table/Table.vue';
import Chart from './Chart/Chart.vue'
export default {
  components: {
    Table,
    Chart
  },
  data () {
    return {
      tabs: ["Table", "Charts"],
      currentTab: 0
    }
  },
  methods: {
    onTabClick (index) {
      this.currentTab = index
    }
  },
}
</script>

<style lang="less">
#app_tabs {
  .nav-link {
    color: #d2f4ea;
    cursor: pointer;
    border: none;
    font-size: 1.2rem;
    letter-spacing: 0.05rem;
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>