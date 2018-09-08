<template type="ts">
  <div class="home">
    <h3>Edit user: {{ id }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';

@Component({
})
export default class EditUser extends Vue {
  @Prop() public id!: string;
}
</script>
