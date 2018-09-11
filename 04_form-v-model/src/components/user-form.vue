<template>
 <form>
    <v-text-field
      label="Name"
      v-model="value.name"
    />
    <v-text-field
        v-model="value.username"
        label="Nickname"
        />
    <v-text-field
      v-model="value.email"
        label="EMail"
        />
    <v-btn
      @click="onSave"
    >
      save
    </v-btn>
 </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { User, createDefaultUser } from '@/rest-api';
import _ from 'lodash';

@Component
export default class UserForm extends Vue {
  @Prop() public value!: any

  public onSave() {    
    this.$router.push('/');
  }
}
</script>
