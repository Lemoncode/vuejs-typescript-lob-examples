<template>
 <form>
    <v-text-field
      :value="user.name"
      label="Name"
      @input.native="userUpdate('name', $event.target.value)"
    />
    <v-text-field
      :value="user.username"
      label="Nickname"
      @input.native="userUpdate('username', $event.target.value)"
    />
    <v-text-field
      :value="user.email"
      label="EMail"
      @input.native="userUpdate('email', $event.target.value)"
    />
    <v-btn @click="$emit('onSave')">save</v-btn>
 </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/rest-api';

@Component({
  components: {}
})
export default class UserForm extends Vue {
  @Prop() public user!: User;
  @Prop() public userUpdate!: Function;
}
</script>
