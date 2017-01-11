# Sweets
Flexible declarative web framework for real-time projects

## Toffee with nuts
Adds cache busting tag

### Tags
#### cachebust
Adds md5 hash to the end of the file. Also **makes a copy of the file with hash in the name**

`{% cachebust filepath, url %}`


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
