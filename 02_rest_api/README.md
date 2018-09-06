## Intro

In this sample we are gong to read the list of users shown in the able from a rest-api.

## Steps

- Let's install _axios_

```bash
npm install axios --save
```

- Let's create an api section

_./src/rest-api/index.ts_

```typescript
import axios from 'axios';

export const fetchUsers = (): Promise<[]> => {
  const promise = new Promise<[]>((resolve, reject) => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => {
      // JSON responses are automatically parsed.
      resolve(response.data);
    });
  });

  return promise;
};
```

- Now we use our _Home_ page as a container (will do the ajax call and store it as data), then we will pass it down as prop 
to the _users-table_ component.

_./src/views/Home.vue_

```diff
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersTable from '@/components/users-table.vue';
+ import {fetchUsers} from '@/rest-api';

@Component({
  components: {
    UsersTable,
  },
})
export default class Home extends Vue {
+  public users = [];

+  public created() {
+    fetchUsers().then((data) => {
+      this.users = data;
+    });
+  }
}
</script>
```

- Now it's time to pass down users as a prop to the users table. Let's import the property decorator.

_./src/components/users-table.vue_

```diff
<script lang="ts">
- import { Component, Vue } from 'vue-property-decorator';
+ import { Component, Vue, Prop } from 'vue-property-decorator';
import {fetchUsers} from '@/rest-api';
```

- Let's add the users member variable as a prop, and remove the old _users_ local variable.

_./src/components/users-table.vue_

```diff
export default class UsersTable extends UsersTableProps {
+  @Prop() users: any[] = [];

//...
-  public users = [
-    {
-      id: 1,
-      name: 'John Doe',
-      username: 'John',
-      email: 'john@contoso.com',
-    },
-    {
-      id: 2,
-      name: 'Mark Daemon',
-      username: 'Mark',
-      email: 'mark@foo.com',
-    },
-  ];
```

- Let's feed the users props from _home_ to _users_ table.

_./src/views/Home.vue_

```diff
<template type="ts">
  <div class="home">
    <h3>Hello from home page</h3>
-    <UsersTable />
+    <UsersTable :users="users"/>    
  </div>
</template>
```

- Now we can run the sample and see the results.

```
npm run serve
```
