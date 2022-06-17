<template>
  <div id="app" class="bg-dark">
    <div class="container-fluid px-0">
      <div class="row justify-content-center w-100">
        <div class="col app-content">
          <nav id="app_nav" class="navbar navbar-expand-lg navbar-dark py-4">
            <div class="container-fluid px-0">
              <div class="navbar-brand ms-1">
                Skills<sup class="title-sup">VR</sup> Test
              </div>
            </div>
          </nav>

          <TabsVue />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabsVue from "./components/Tabs.vue";

export default {
  name: 'App',
  components: {
    TabsVue
  }
}
</script>

<style lang="less">
#app {
  min-height: 100vh;
  .app-content {
    max-width: 1100px;
    #app_nav {
      .navbar-brand {
        font-size: 1.7rem;
        letter-spacing: 0.045rem;
        font-weight: 400;
        .title-sup {
          font-size: 1.1rem;
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
