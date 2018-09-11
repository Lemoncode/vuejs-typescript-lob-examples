<template type="ts">
    <v-data-table
      :headers="headers"
      :items="users"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.id}}</td>
        <td class="text-xs-left">{{props.item.name}}</td>
        <td class="text-xs-left">{{props.item.username}}</td>
        <td class="text-xs-left">{{props.item.email}}</td>
        <td>
          <v-icon
            @click="onEditUser(props.item.id)"
          >
            mdi-pencil
          </v-icon>         
        </td>
      </template>
    </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import router from '../router';

@Component({
  components: {},
})
export default class UsersTable extends Vue {
  @Prop() public users!: any[];

  public headers = [
    {
      text: 'Id',
      align: 'left',
      value: 'id',
    },
    {
      text: 'Name',
      align: 'left',
      value: 'id',
    },
    {
      text: 'User name',
      align: 'left',
      value: 'id',
    },
    {
      text: 'EMail',
      align: 'left',
      value: 'id',
    },
    {
      text: 'Actions',
      align: 'left',
      value: 'Actions',
    },
  ];

  public onEditUser(userId: number) {
    this.$emit('onEditUser', userId);
  }
}
</script>

