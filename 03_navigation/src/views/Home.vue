<template type="ts">
  <div class="home">
    <h3>Hello from home page</h3>
    <UsersTable :users="users"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersTable from '@/components/users-table.vue';
import { fetchUsers } from '@/rest-api';

@Component({
  components: {
    UsersTable,
  },
})
export default class Home extends Vue {
  public users = [];

  public created() {
    fetchUsers().then((data) => {
      this.users = data;
    });
  }
}
</script>
