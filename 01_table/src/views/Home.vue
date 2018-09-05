<template>
  <div class="home">
    <h1>Hello from home page</h1>    
    <UsersTable/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersTable from '@/components/users-table.vue';

@Component({
  components: {
    UsersTable,
  },
})
export default class Home extends Vue {
}
</script>
