<template>
  <div class="home">
    {{user.name}}
    <UserForm v-model="editingUser" @onSave="onSave"/>
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
  public editingUser: User = this.user;

  public created() {
    fetchUser(+this.id).then((user) => {
      this.user = user;
      this.editingUser = JSON.parse(JSON.stringify(this.user));
    });
  }


  public onSave()  {
    this.user = this.editingUser;

    console.log('**** Save operation');
    console.log(JSON.stringify(this.user));
    console.log('****');
  }

}
</script>
