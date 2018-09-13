<template>
 <form>
    <v-text-field
      :value="user.name"
      ref="name"
      label="Name"
    />
    <v-text-field
      :value="user.username"
      ref="username"
      label="Nickname"
    />
    <v-text-field
      :value="user.email"
      ref="email"
      label="EMail"
    />
    <v-btn @click="onSave">
      save
    </v-btn>
 </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/rest-api';

@Component
export default class UserForm extends Vue {
  @Prop() public user!: User;

  public $refs!: {
    name: any;
    username: any;
    email: any;
  }

  public onSave() {    
    this.$emit('onSave', {
      ...this.user,
      name: this.$refs.name.lazyValue,
      username: this.$refs.username.lazyValue,
      email: this.$refs.email.lazyValue,
    });
  }
}
</script>
