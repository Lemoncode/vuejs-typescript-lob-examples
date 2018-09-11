<template type="ts">
  <div class="home">
    <h3>Hello from home page</h3>
    <UsersTable :users="users" @onEditUser="onEditUser"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersTable from '@/components/users-table.vue';
import { fetchUsers } from '@/rest-api';
import router from '../router';

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

  public onEditUser(userId: number)  {
    router.push({name: 'user', params: { id: userId.toString() }});
  }
}
</script>
