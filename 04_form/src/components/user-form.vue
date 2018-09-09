<template type="ts">
 <form>
    <v-text-field
        v-model="user.name"
        label="Name"
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
