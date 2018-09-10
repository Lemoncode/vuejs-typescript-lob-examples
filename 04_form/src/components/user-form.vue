<template type="ts">
 <form>
    <v-text-field
        v-model="editingUser.name"
        label="Name"
        />
    <v-text-field
        v-model="editingUser.username"
        label="Nickname"
        />
    <v-text-field
        v-model="editingUser.email"
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

@Component({
  components: {},
})
export default class UserForm extends Vue {
  @Prop() public user!: User;

  public editingUser: User = createDefaultUser();

  @Watch("user")
  doUserWatch(newVal: User, oldVal: User) {
    this.editingUser = _.cloneDeep(newVal);
  }


  public onSave() {
    this.$emit('onSave', this.editingUser);
  }
}
</script>
