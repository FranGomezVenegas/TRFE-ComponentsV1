# StagesView Component

`StagesView` is a custom LitElement component designed to display a series of stages in a process, highlighting the current stage.

## Properties

### `stages`
- **Type:** `Array`
- **Required:** Yes
- **Description:** An array of objects representing the stages of the process. Each object should have the following properties:
  - `name`: `String` - The name of the stage (e.g., 'Assigned', 'Started', 'Completed', 'Approved').

### `currentstage`
- **Type:** `Number`
- **Required:** Yes
- **Description:** The index of the current stage, starting from 0.

### `data`
- **Type:** `Object`
- **Required:** Yes
- **Description:** An object containing detailed data about the stages and the current stage. It should have the following properties:
  - `stages`: `Array` - An array of stage objects, similar to the `stages` property.
  - `currentStageName`: `String` - The name of the current stage.
  - `currentState`: `Number` - The index of the current stage, starting from 0.

### `lang`
- **Type:** `String`
- **Required:** No
- **Default:** `'en'`
- **Description:** The language code used for localization. If not provided, it defaults to English ('en').

## Example Usage

```html
<stages-view
  .stages="${[
    { name: 'Assigned' },
    { name: 'Started' },
    { name: 'Completed' },
    { name: 'Approved' }
  ]}"
  .currentstage="${1}"
  .data="${{
    stages: [
      { name: 'Assigned' },
      { name: 'Started' },
      { name: 'Completed' },
      { name: 'Approved' }
    ],
    currentStageName: 'Assigned',
    currentState: 0
  }}"
  lang="en"
></stages-view>
