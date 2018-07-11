# @vueneue/rquery

Simple helper to traverse (CSS selector-like) and manipulate (jQuery like) AST.

Used in: [https://github.com/vueneue/vueneue](https://github.com/vueneue/vueneue)

## Example

Simple example to demonstrate package API

### Source

```js
import foo from './foo';

new Vue({
  router,
  store,
  render: h => h(App),
});

export const store = new Vuex.Store({
  state: {},
});

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./Home.vue'),
    },
  ],
});
```

### Code

```js
import { Recast, RQuery } from '@vueneue/rquery';

const doc = RQuery.parse(source);

// ---------------------------------------------

// Get import
const importFoo = doc.find('import#foo')[0];

// Change imported variable name
importFoo.node.specifiers[0].local.name = 'bar';

// Change from
importFoo.node.source.value = './bar';

// ---------------------------------------------

let router = doc.find('exportDefault new#Router')[0];

// Replace router instanciation to an arrow function
router = router.replace(`() => { return ${Recast.print(router.node)} }`);

// Get Router constructor options
const routerOptions = router.find('{}')[0];

// Get routes array property
const routes = routerOptions.get('routes');

// Create new route definition
const newRoute = RQuery.parse(
  `({
    path: '/about',
    name: 'about',
    component: () => import('./About.vue'),
  })`,
).find('{}')[0].node;

// Add route
routes.append(newRoute);

// ---------------------------------------------

// Find new Vue() options
const vueOptions = doc.find('new#Vue {}')[0];

// Build our new property
const propValue = RQuery.parse('true').find('expr')[0];

// Inject to options
vueOptions.set('test', propValue.node.expression, 2);

// ---------------------------------------------

// Find Vuex options
const vuexOptions = doc.find('export const#store new#Vuex.Store {}')[0];

// Get modules prop
let modules = vuexOptions.get('modules');

if (!modules) {
  modules = vuexOptions
    .set('modules', RQuery.parse('({})').find('{}')[0].node)
    .get('modules');
}

// Module value
const moduleValue = RQuery.parse('({ namespaced: true, state: {} })').find(
  '{}',
)[0];

modules.set('newModule', moduleValue.node);

// ---------------------------------------------

RQuery.print(doc).then(code => {
  console.log(code);
});
```

### Result

```js
import bar from './bar';

new Vue({
  router,
  store,
  test: true,
  render: h => h(App),
});

export const store = new Vuex.Store({
  state: {},

  modules: {
    newModule: { namespaced: true, state: {} },
  },
});

export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('./Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('./About.vue'),
      },
    ],
  });
};
```

## Libraries used

- [recast](https://github.com/benjamn/recast) To parse, manipulate and print code
- [prettier](https://prettier.io/) To format code

## License

**MIT** See: `LICENSE` file
