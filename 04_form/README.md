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

- In this sample we are going to use _v-model_ (binding two way), a property
should flow only top to down, if we work binding two way the _user_ property
it will update as well the container user member variable, that's ot a good practice, in this sample we are going to:

- Create a _editingUser_ member variable (local to this component).

- Watch for the _user_ property to change.

- Whenever the _user_ parent property changes, deep clone the object and dump
it into _editingUser_ variable.

Let's install lodash helper library (you could install just deep clone from
lodash).

```bash
npm install lodash --save
```


```bash
npm install @types/lodash --save-dev
```

Let's add the _editingUser_ variable and add a watch for the prop.
_./src/components/user-form.vue_

```diff
import { Component, Vue, Prop } from 'vue-property-decorator';
- import { User } from '@/rest-api';
+ import { User, createDefaultUser } from '@/rest-api';
+ import _ from 'lodash';

@Component({
  components: {},
})

export default class UserForm extends Vue {
  @Prop() public user!: User;
+ public editingUser: User = createDefaultUser();

+  @Watch("user")
+  doUserWatch(newVal: User, oldVal: User) {
+    this.editingUser = _.CloneDeep(newVal);
+  }

}
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
+        v-model="editingUser.name"
+        label="Name"
+        />
+    <v-text-field
+        v-model="editingUser.username"
+        label="Nickname"
+        />
+    <v-text-field
+        v-model="editingUser.email"
+        label="EMail"
+        />
+ </form>
-  </span>
</template>
```

- To check that data is being updated let's implement a fake _save_ button (this
button will just output through the browser console the data being collected).

- First let's implement the save method.

_./src/components/user-form.vue_

```diff
export default class UserForm extends Vue {
  @Prop() public user!: User;

+  public onSave() {
+    console.log('**** Save operation');
+    console.log(JSON.stringify(editingUser.user));
+    console.log('****');
+  }
}
```

- Now add the button to the form.

_./src/components/user-form.vue_

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
+        @click="onSave"
+      >
+        save
+      </v-btn>
    
 </form>
```

- Just to wrap up let's move the save method to the page container.

_./src/views/EditUser.vue_

```diff
export default class EditUser extends Vue {
  @Prop() public id!: string;
  public user = createDefaultUser();

  public created() {
    fetchUser(+this.id).then((user) => {
      this.user = user;
    });
  }

+  public onEditUser(editingUser: User)  {
+    this.user = editingUser;
+
+    console.log('**** Save operation');
+    console.log(JSON.stringify(this.user));
+    console.log('****');
+  }

}
```

- Pass it down to the form component.

_./src/views/EditUser.vue_

```diff
<template type="ts">
  <div class="home">
    {{user.name}}
-    <UserForm :user="user"/>
+    <UserForm :user="user" @save="onSave"/>
  </div>
</template>
```

- Let's call from the onSave child method the associated parent callback
_onSave_ callback.

_./src/components/user-form.vue_

```diff
export default class UserForm extends Vue {
  @Prop() public user!: User;

  public editingUser: User = createDefaultUser();

  @Watch("user")
  doUserWatch(newVal: User, oldVal: User) {
    this.editingUser = _.cloneDeep(newVal);
  }


  public onSave() {
-    console.log('**** Save operation');
-    console.log(JSON.stringify(this.editingUser));
-    console.log('****');
+    this.$emit('onSave', this.editingUser);
  }
}
```

- So far so good, we have implemented a basic form, in the next sample we will implemnent this using callbacks (one way data flow).