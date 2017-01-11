# Sweets
Flexible declarative web framework for real-time projects

## Toffee with rum
Adds several useful filters and tags for nunjucks templates environment

### Filters
#### shuffle
Returns shuffled array or object keys array

#### date
Formats date using [moment](http://momentjs.com) library

`{{ time | date("MMM Do YY", [locale]) }}`

### Tags
#### match
Matches string to RegExp and returns true or false or optional values

`{% match text, "^a", ["truthy"], ["falsy"] %}`


### Settings
```js
this.template = {
    sweet: "toffee",
    extensions: ["rum"] // <- add this
    options: {
        path: path.join(this.root, "templates")
    }
};
```
