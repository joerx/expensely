# Containers vs. Presentational Components

## Container Component
   
- retrieves a reference to the store
- dispatches action to store
- listens to change in state
- renders (presentational) child components
- does not have any visible DOM nodes by itself
- maybe a few blind wrapper divs
- can be constructed using react-redux's `connect()`

```js
// TODO: proper names of arguments
// connect is a higher-order function: it returns another function
// output of 1st and 2nd argument will be passed to child components
// child components are passed in the function returned by `connect()`
const MyContainer = connect(
  function mapStateToProps() {/*...*/},
  function actionsToDispatch() {/*...*/}
)(ChildComponents);
```

## Presentational Component

- has no reference to store
- renders view based on state passed in as props
- can trigger events via event handlers passed as props
- introduces visible state
- e.g. 

```js
<MyButton 
  onClick={myOnClickHandler}  // event is dispatched via local even handler
  label={someLabel} // custom label for generic button
  enabled={state.fetching} // disabled while loading - depends on app state
/>
```
