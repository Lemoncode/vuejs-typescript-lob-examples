## Intro

In this sample we are going to import Vuetify library and add a table component.

## Steps

- We will take as starting point 00_hello_typescript, copy the content from that project and execute

```bash
npm install
``` 

- We will install _vuetify_ in order to get material ui like components.

```bash
npm install vuetify --save
```

- Let's add roboto framework and load if from a CDN

_./public/index.html_

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
+    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel='stylesheet' type='text/css'>
    <title>my-app</title>
  </head>
```

- Let's indicate our app we are going to use _vuetify_

_./src/main.ts_

```diff
import Vue from 'vue';
+ import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';

+ // tslint:disable-next-line:no-var-requires
+ require('../node_modules/vuetify/dist/vuetify.min.css');

Vue.config.productionTip = false;

+ Vue.use(Vuetify);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
```
- In our _app.vue_ file we need to surround our app in _v-app_ tags.

_./src/App.vue_

```diff
<template>
  <div id="app">
+  <v-app>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
+  </v-app>
  </div>
</template>
```
- Let's create component that will display _users-table_ (just define some harcoded data 
and make use of vuetify _v-data-table_)

_./src/components/UsersTable.vue_

```typescript
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
```

- Now let's jump into the _Home.vue_ view and make use of this component.

_./src/views/Home.vue_

```diff
<template>
  <div class="home">
    <h3>Hello from home page</h3>   
+   <users-table />     
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
+ import UsersTable from '@/components/UsersTable.vue';

+ @Component({
+   components: {
+     UsersTable,
+   },
+ })
export default class Home extends Vue {}
</script>
```

- Let's run the sample.

```bash
npm run serve
```