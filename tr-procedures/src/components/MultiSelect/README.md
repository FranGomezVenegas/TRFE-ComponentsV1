# multiselect Component

## Properties

### config (Object)
- `maxSelections` (number): Maximum number of selections allowed. (Optional)
- `disabled` (boolean): Indicates if the multiselect is disabled. (Optional)

### options (Array)
- `label` (string): Text representing the option. (Required)
- `value` (string): Value of the option. (Required)
- `selected` (boolean): Indicates if the option is selected by default. (Optional)

## Examples

```html
<multiselect .config=${{ maxSelections: 3, disabled: false }} .options=${[
  { label: "Option 1", value: 'opt1', selected: true },
  { label: "Option 2", value: 'opt2' },
  { label: "Option 3", value: 'opt3' },
  { label: "Option 4", value: 'opt4' }
]}></multiselect>