# Intro

In this sample we are going to add a pencil icon on each users table row, and when
the user clicks on that rediret to an edit user page (passing the user ID param in the route).

# Steps

- Let's start from previous sample and install the needed packages.

```bash
npm install
```

- We will use material ui icons, we need to make some configuration:

_./src/main.ts_

```diff
import Vuetify from 'vuetify';

// tslint:disable-next-line:no-var-requires
require('../node_modules/vuetify/dist/vuetify.min.css');

Vue.config.productionTip = false;
- Vue.use(Vuetify);
+ Vue.use(Vuetify,
+ {
+  iconfont: 'mdi',
+ });

new Vue({
```

- Let's add a link to the icons

_./public/index.html_

```diff
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel='stylesheet' type='text/css'>
+   <link href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css" rel="stylesheet">
    <title>my-app</title>
  </head>
```

- Let's add a new column to our grid:

_./src/components/users-table.vue_

```diff
  public headers = [
    {
    text: 'Id',
    align: 'left',
    value: 'id',
    },
    {
    text: 'Name',
    align: 'left',
    value: 'Name',
    },
    {
    text: 'User name',
    align: 'left',
    value: 'User name',
    },
    {
    text: 'EMail',
    align: 'left',
    value: 'EMail',
    },
+    {
+    text: 'Actions',
+    align: 'left',
+    value: 'Actions',
+    },
```

- Let's add a icon in this grid.

```diff
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.id}}</td>
        <td class="text-xs-left">{{props.item.name}}</td>
        <td class="text-xs-left">{{props.item.username}}</td>
        <td class="text-xs-left">{{props.item.email}}</td>
+        <td>
+          <v-icon
+          >
+            mdi-pencil
+          </v-icon>         
+        </td>
      </template>
    </v-data-table>
```

- Let's run the sample and check that the icon is being shown.

```bash
npm run serve
```

- Now it's time to hook on the click event, let's write a console log
to check that is working fine.

- Let's define the method that will hold this value

_./src/components/users-table.vue_

```diff
export default class UsersTable extends Vue {
  @Prop() public users: any[] = [];

+ public onEditUser() {
+   console.log('You clicked on edit user !');
+ }

  public headers = [
```

- Let's hook to this method on the icon click event.

_./src/components/users-table.vue_


```diff
        <td>
          <v-icon
+           @click="onEditUser"          
          >
            mdi-pencil
          </v-icon>         
        </td>
```

- Let's give a quick try and check that the console log message is displayed
whenver we click on the pencil icon.

```
npm run serve
```

- So far so good, but we need to know the Id of the clicked user, let's add a parameter to resolve this:

_./src/components/users-table.vue_

```diff
-  public onEditUser() {
+  public onEditUser(userId) {
-    console.log('You clicked on edit user !');
+    console.log('You clicked on edit user: ', userId);
  }
```

_./src/components/users-table.vue_

```diff
  <v-icon
-    @click="onEditUser"
+    @click="onEditUser(props.item.id)"
  >
```

- Time to double check.

```bash
npm run serve
```

- Let's create a new page we will call it _editUser.vue_

_./src/views/EditUser.vue_

```javascript
<template type="ts">
  <div class="home">
    <h3>Hello from edit user page</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class EditUser extends Vue {
}
</script>
```

- Let's update onEditUser to navigate to that page.

- Add the router import

_./src/components/users-table.vue_

```diff
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
+ import router from '../router';
```

_./src/components/users-table.vue_

```diff
public onEditUser(userId : number)  {
-  console.log('You clicked on edit user: ', userId);
+  router.push({name: 'user'});
}
```

- Let's give a quick try 

```bash
npm run serve
```

- So far so good, now we have pending to navigate passing the param in the route:

- Let's define this param in the EditUser router definition (by using _props: true_
it will automatically inject as a property the _id_ param into the EditUserPage
properties).

_./src/router.ts_

```diff
    {
-      path: '/user',
+      path: '/user/:id',
+      props: true, 
      name: 'user',
      component: () => import(/* webpackChunkName: "editUser" */ './views/EditUser.vue'),
    },
```

- Let's consume it in the EditUser page:

_./src/views/EditUser.vue_

```diff
  <div class="home">
-    <h3>Hello from edit user page</h3>
+    <h3>Edit user: {{ id }}</h3>

  </div>
```

```diff
- import { Component, Vue } from 'vue-property-decorator';
+ import { Component, Vue, Prop  } from 'vue-property-decorator';

@Component({
})
export default class EditUser extends Vue {
+  @Prop() public id!: string;  
}
```

- Time update our push navigation on the user-table component.

_./src/components/users-table.vue_

```diff
  public onEditUser(userId : number)  {
-    router.push({name: 'user'});
+    router.push({name: 'user', params: { id: userId.toString() }});

  }
```

- On the home page let's define an _onEditUserCallback_ and let's 
pass it down to the component.

_./src/components/users-table.vue_

```diff
<template type="ts">
  <div class="home">
    <h3>Hello from home page</h3>
-    <UsersTable :users="users"/>
+    <UsersTable :users="users" @onEditUser="onEditUser"/>
  </div>
</template>
```
```diff
import { Component, Vue } from 'vue-property-decorator';
import UsersTable from '@/components/users-table.vue';
import { fetchUsers } from '@/rest-api';
+ import router from '../router';

export default class Home extends Vue {
  public users = [];

  public created() {
    fetchUsers().then((data) => {
      this.users = data;
    });
  }

+  public onEditUser(userId: number)  {
+    router.push({name: 'user', params: { id: userId.toString() }});
+  }
}
```

- Let's go back to the _user-table_ and replace the navigation with
the parent callback.

_./src/components/users-table.vue_

```diff
  ];

  public onEditUser(userId: number)  {
-    router.push({name: 'user', params: { id: userId.toString() }});
+   this.$emit('onEditUser', userId);
  }
}
</script>
```

- Let's give a try:

```bash
npm run serve
```













