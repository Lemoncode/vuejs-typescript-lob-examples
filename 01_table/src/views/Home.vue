<template>
  <div class="home">
    <h3>Hello from home page</h3>
    <users-table/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersTable from '@/components/UsersTable.vue';

@Component({
  components: {
    UsersTable,
  },
})
export default class Home extends Vue {}
</script>
