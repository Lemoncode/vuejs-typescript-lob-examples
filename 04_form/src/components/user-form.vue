<template type="ts">
 <form>
    <v-text-field
        v-model="user.name"
        label="Name"
        />
    <v-text-field
        v-model="user.username"
        label="Nickname"
        />
    <v-text-field
        v-model="user.email"
        label="EMail"
        />
    <v-btn
      @click="submit"
    >
      save
    </v-btn>
 </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/rest-api';


@Component({
  components: {},
})
export default class UserForm extends Vue {
  @Prop() public user!: User;

  public save() {
    console.log(this.user);
  }


}
</script>
