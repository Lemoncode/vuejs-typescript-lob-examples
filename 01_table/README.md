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
+ import Vuetify from 'vuetify'
import App from './App.vue';
import router from './router';

+ // tslint:disable-next-line:no-var-requires
+ require('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false;

+ Vue.use(Vuetify)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
```

- Now let's jump into the _Home.vue_ view and add a material ui table.

_./src/ _
