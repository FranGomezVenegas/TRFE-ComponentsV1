# \<platform-login>
Component login of trazit platform

v2 is basically the same flavour just that the role selection is by clicking one entry in a modal dialog instead of selecting from a list.

## Installation

```bash
npm i platform-login
```

## Usage

```html
<script type="module">
  import 'platform-login/platform-login.js';
</script>

<platform-login></platform-login>
```



## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## Versioning Tracking
[- v2.0.4 use lit instead of lit-element]
[- v2.1.0 Upgrade for material design]
[- v2.2.0 Implemented  recommendations for performance]
[- v2.3.0 Splitted procedures_list from final token then can be invoked separated to allow us refresh this info any time]