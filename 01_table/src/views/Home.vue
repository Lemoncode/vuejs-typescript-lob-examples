<template>
  <div class="home">
    <h1>Hello from home page</h1>    
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {
  public headers = [
    {
    text: 'Id',
    aligh: 'right',
    value: 'id',
    },
    {
    text: 'Name',
    aligh: 'right',
    value: 'id',
    },
    {
    text: 'User name',
    aligh: 'right',
    value: 'id',
    },
    {
    text: 'EMail',
    aligh: 'right',
    value: 'id',
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
