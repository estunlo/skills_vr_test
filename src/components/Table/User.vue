<template>
  <div class="modal fade" id="user" tabindex="-1" aria-labelledby="userLabel" aria-hidden="true" v-if="user">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="userLabel">User detail</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="([property, value], index) in userDetail" :key="index">
              <div class="ms-2 me-auto">
                <small>{{ property }}: </small>
                <span class="fw-bold ms-2">{{ value }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    userDetail () {
      return Object.entries(this.user).map(([key, value]) => 
        (typeof key === 'string' || key instanceof String) ? 
          [key.toUpperCase().replace('_', ' '), value] : 
          [key, value]);
    }
  }
}
</script>
<style lang="">
    
</style>