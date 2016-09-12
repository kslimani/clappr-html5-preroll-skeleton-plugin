# HTML5 preroll ad skeleton plugin for clappr.

HTML5 preroll ad skeleton plugin for [Clappr](https://github.com/clappr/clappr) video player.

This is __only a proof of concept__ which attempt to demonstrate the requirements in order to be able to play an HTML5 video preroll advert on desktop but also __on mobile devices__.

This may not the "way to go" with Clappr to achieve this goal. (only the way i found).

This is also an attempt to push missing/required Clappr features in order to be able to create Ad plugins.

# Usage

Add both Clappr and the plugin scripts to your HTML:

```html
<head>
  <script type="text/javascript" src="http://cdn.clappr.io/latest/clappr.min.js"></script>
  <script type="text/javascript" src="dist/clappr-html5-preroll-plugin.js"></script>
</head>
```

Then just add `ClapprHtml5PrerollPlugin` into the list of plugins of your player instance, and the options for the plugin go in the `html5PrerollPlugin` property as shown below.

```javascript
var player = new Clappr.Player({
  source: "http://your.video/here.mp4",
  plugins: {
    core: [ClapprHtml5PrerollPlugin],
  },
  html5PrerollPlugin: {
    /* plugin configuration */
  }
});
```

# Development

Install dependencies :

```shell
  npm install
```

Dev. build :

```shell
  npm run dev
```

Dist build :

```shell
  npm run dist
```

Watch mode :

```shell
  npm run watch
```

Start HTTP server (http://0.0.0.0:8080/demo/) :

```shell
  npm run demo
```
