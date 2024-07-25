# RolesAndActions Component

The `RolesAndActions` component is used to display roles and their associated actions in a structured format.

## Properties

### title

- **Type**: `String`
- **Description**: The title of the roles and actions table.
- **Example**: `'Roles and Actions'`

### roles

- **Type**: `Array`
- **Description**: An array of roles to display.
- **Example**: `['Admin', 'User', 'Guest']`

### actions

- **Type**: `Array`
- **Description**: An array of actions associated with the roles.
- **Example**: `['Create', 'Read', 'Update', 'Delete']`

## Usage

### Basic Example

```html
<roles-and-actions
  .title=${'Roles and Actions'}
  .roles=${['Admin', 'User', 'Guest']}
  .actions=${['Create', 'Read', 'Update', 'Delete']}
></roles-and-actions>
