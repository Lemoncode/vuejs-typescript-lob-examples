# Intro

In this sample we are going to implement a form to edit a given user, we will
simulate a submit operation (writing to the console log the current data).

# Steps

- We will start from previous sample, just copy the sample and execute npm install
s
```bash
npm install
```

- In the _EditUser_ page we received the id of the user being edited.

- First we need to add a new entry to our api to get a fresh copy of 
the user being edited. This time we will type the entity returned inside the promise. Let's append the follwing of the following file at the bottom of the file.

_./src/rest-api/index.ts_

```javascript

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const createDefaultUser = (): User => ({
  id : 0,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
  phone:  '',
  website:  '',
  company: {
    name:  '',
    catchPhrase:  '',
    bs:  '',
  },
});

export const fetchUser = (id: number): Promise<User> => {
  const promise = new Promise<User>((resolve, reject) => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      // JSON responses are automatically parsed.
      resolve(response.data);
    });
  });

  return promise;
};
```

- In the _EditUser_ page, let's hook to the _created_ event and 
place there a call to the _fetchUser_ api method.

_./src/views/EditUser.vue_

```diff
<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
+ import { User, createDefaultUser, fetchUser} from '@/rest-api';

@Component({
})
export default class EditUser extends Vue {
  @Prop() public id!: string;
+  public user = createDefaultUser();

+  public created() {
+    fetchUser(+this.id).then((user) => {
+      this.user = user;
+    });
+  }
}
</script>
```

- Let's create a new component we will call it _UserForm_, this component will accept as property an instance of _User_ entity.

_./src/components/user-form.vue_

```javascript
<template type="ts">
  <span>
  Temporary check: {{user}}
  </span>
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
```

- Let's instantiate the component in the _EditUser_ page, and give a quick try.

_./src/views/EditUser.vue_

```diff
<template type="ts">
  <div class="home">
-    <h3>Edit user: {{ id }}</h3>
+    <UserForm :user="user"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import { User, createDefaultUser, fetchUser} from '@/rest-api';
+ import UserForm from '@/components/user-form.vue';

@Component({
+  components: {
+    UserForm,
+  },
})
export default class EditUser extends Vue {
  @Prop() public id!: string;
  public user = createDefaultUser();

  public created() {
    fetchUser(+this.id).then((user) => {
      this.user = user;
    });
  }

}
</script>
```

- It's time to build a form that will let us view and edit the _User_ entity data,
to bind the data we will make use of _v-model_ (two way binding).

_./src/components/user-form.vue_

```diff
<template type="ts">
-  <span>
-  Temporary check: {{user}}
+ <form>
+    <v-text-field
+        v-model="user.name"
+        label="Name"
+        />
+    <v-text-field
+        v-model="user.username"
+        label="Nickname"
+        />
+    <v-text-field
+        v-model="user.email"
+        label="EMail"
+        />
+ </form>
-  </span>
</template>
```

- To check that data is being updated let's implement a fake _save_ button (this
button will just output through the browser console the data being collected).

- First let's implement the save method.

```diff
export default class UserForm extends Vue {
  @Prop() public user!: User;

+  public save() {
+    console.log(this.user);
+  }
}
```

- Now add the button to the form.

```diff
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
+      <v-btn
+        @click="submit"
+      >
+        save
+      </v-btn>
    
 </form>
```

- So far so good, we have implemented a basic form, in the next sample we will jump
into a more interesting topic: form validation.