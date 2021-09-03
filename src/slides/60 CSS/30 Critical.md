### "Critical" CSS

* Isolate just enough CSS to style above the fold*
* Inline that critical CSS
* Lazy load the full stylesheet

```html
<link rel="stylesheet" href="styles.css"
      media="print" onload="this.media='all'" />
```


_* There is no fold..._
