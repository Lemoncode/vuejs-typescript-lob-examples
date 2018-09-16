# Intro

In this sample we are going to implement a form to edit a given user with one way data flow, we will simulate a submit operation (writing to the console log the current data).

# Steps

- We will start from previos sample, just copy the sample and execute npm install.

```bash
npm install
```

- Let's add _userUpdate_ prop and edit how used _user_ prop.

_./src/components/user-form.vue_

```diff
- import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
- import { User, createDefaultUser } from '@/rest-api';
- import _ from 'lodash';
+ import { Component, Vue, Prop } from 'vue-property-decorator';
+ import { User } from '@/rest-api';

@Component({
  components: {},
})
export default class UserForm extends Vue {
  @Prop() public user!: User;
+  @Prop() public userUpdate!: Function;

-  public editingUser: User = createDefaultUser();

-  @Watch("user")
-  doUserWatch(newVal: User, oldVal: User) {
-    this.editingUser = _.cloneDeep(newVal);
-  }

-  public onSave() {
-    this.$emit('onSave', this.editingUser);
-  }
}
```

- It's time to edit the form that will let us view and returned the editions the _User_ entity data.

_./src/components/user-form.vue_

```diff
<template>
  <form>
    <v-text-field
-     v-model="editingUser.name"
+     :value="user.name"
      label="Name"
+     @input.native="userUpdate('name', $event.target.value)"
    />
    <v-text-field
-     v-model="editingUser.username"
+     :value="user.username"
      label="Nickname"
+     @input.native="userUpdate('username', $event.target.value)"  
    />
    <v-text-field
-     v-model="editingUser.email"
+     :value="user.email"
      label="EMail"
+     @input.native="userUpdate('email', $event.target.value)"
    />
    <v-btn
-     @click="onSave"
+     @click="$emit('onSave')"
    >
      save
    </v-btn>
  </form>
</template>
```

- Let's implement the callbacks reception in the page container.

_./src/views/EditUser.vue_

```diff
···
export default class EditUser extends Vue {
  @Prop() public id!: string;
  public user = createDefaultUser();

  public created() {
    fetchUser(+this.id).then((user) => {
      this.user = user;
    });
  }

+  public userUpdate(field: string, value: string): void {
+    this.user = {
+      ...this.user,
+      [field]: value,
+    };
+  }

-  public onEditUser(editingUser: User)  {
-    this.user = editingUser;
-
-    console.log('**** Save operation');
-    console.log(JSON.stringify(this.user));
-    console.log('****');
-  }

-  public onSave(editingUser: User)  {
-    this.user = editingUser;
+  public onSave(): void  {
    console.log('**** Save operation');
    console.log(JSON.stringify(this.user));
    console.log('****');
  }
}
```

- Pass it down to the form component.

_./src/views/EditUser.vue_

```diff
<template>
  <div class="home">
    {{user.name}}
-    <UserForm :user="user" @save="onSave"/>
+    <UserForm
+      :user="user"
+      :user-update="userUpdate"
+      @onSave="onSave"
+    />
  </div>
</template>
```

- Now we will test the code by running `npm run serve`
