<template type="ts">
  <div class="home">
    {{user.name}}
    <UserForm :user="user" @onSave="onSave"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import { User, createDefaultUser, fetchUser} from '@/rest-api';
import UserForm from '@/components/user-form.vue';

@Component({
    components: {
    UserForm,
  },
})
export default class EditUser extends Vue {
  @Prop() public id!: string;
  public user = createDefaultUser();

  public created() {
    fetchUser(+this.id).then((user) => {
      this.user = user;
    });
  }

  public onSave(editingUser: User)  {
    this.user = editingUser;

    console.log('**** Save operation');
    console.log(JSON.stringify(this.user));
    console.log('****');
  }

}
</script>
