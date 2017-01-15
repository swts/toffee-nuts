# Sweets
Flexible declarative web framework for real-time projects

## Toffee with nuts
Adds cache busting tag

### Tags
#### cachebust
Looks for file matching pattern `filename*.ext` and returns full url to this file. If no matches found returns url to file.

`{% cachebust filepath, baseurl %}`

##### Exmaple:
`{% cahebust 'static/app.js', '/static' %}`


### Settings
```js
this.template = {
    sweet: "toffee",
    extensions: ["nuts"] // <- add this
    options: {
        path: path.join(this.root, "templates")
    }
};
```
