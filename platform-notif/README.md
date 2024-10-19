# \<platform-notif>
Component notifications of trazit platform

## Installation

```bash
npm i platform-notif
```

## Usage

```html
<script type="module">
  import 'platform-notif/platform-notif.js';
</script>

<platform-notif></platform-notif>
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
[- v0.0.2 use lit instead of lit-element]
[- v1.0.0 not using old material design]
[- v1.1.0 added minor_messages]
[- v1.2.0 fix for notifs undefined and registry duplicated]