# Containers vs. Presentational Components

## Container Component
   
- retrieves a reference to the store
- dispatches action to store
- listens to change in state
- renders (presentational) child components
- does not have any visible DOM nodes by itself
- maybe a few blind wrapper divs

## Presentational Component

- has no reference to store
- renders view based on state passed in as props
- can trigger events via event handlers passed as props
- introduces visible state
