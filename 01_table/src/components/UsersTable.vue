<template>
    <v-data-table
      :headers="headers"
      :items="users"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.id}}</td>
        <td class="text-xs-left">{{props.item.name}}</td>
        <td class="text-xs-left">{{props.item.username}}</td>
        <td class="text-xs-left">{{props.item.email}}</td>
      </template>
    </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UsersTable extends Vue {
  public headers = [
    {
      text: 'Id',
      value: 'id',
    },
    {
      text: 'Name',
      value: 'name',
    },
    {
      text: 'User name',
      value: 'username',
    },
    {
      text: 'EMail',
      value: 'email',
    },
  ];

  public users = [
    {
      id: 1,
      name: 'John Doe',
      username: 'John',
      email: 'john@contoso.com',
    },
    {
      id: 2,
      name: 'Mark Daemon',
      username: 'Mark',
      email: 'mark@foo.com',
    },
  ];
}
</script>
