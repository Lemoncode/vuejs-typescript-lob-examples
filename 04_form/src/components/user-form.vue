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
}
</script>
