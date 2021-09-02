### CDN + Responsive

```html
<picture>
  <source
    type="image/avif"
    src="https://cdn.com/trees.avif"
  />
  <img
    srcset="https://cdn.com/w_2000/trees.jpg 2000w,
            https://cdn.com/w_500/trees.jpg 500w"
    src="https://cdn.com/trees.jpg"
    alt="A forest full of trees in fall"
    loading="lazy"
  />
</picture>
```
