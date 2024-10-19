# \<my-incidents>
Component incidents of trazit platform

## Installation

```bash
npm i my-incidents
```

## Usage

```html
<script type="module">
  import 'my-incidents/my-incidents.js';
</script>

<my-incidents></my-incidents>
```

## Versioning track

v0.0.2 image extension is png, not webp
v0.0.3 label for dialog on closing fixed, should say close it. confirm button is dynamic, once the ticket was confirmed then no longer appears
v0.0.4 For reopen incident, if the dialog has no note element then it should not be put in context for the endpoint
v0.0.5 adopted multi-service
[- v0.0.6 use lit instead of lit-element]
[- v1.0.0 refactor not using mwc and using md]
[- v1.1.0 replaced vaadin-grid by our table]

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
