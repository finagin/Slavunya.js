# Slavunya.js

* [Install](#install)
* [Usage](#usage)
    * [cookies](#slavunyacookiesname-value-days-secure)
    * [math](#slavunyamathnumber)
        * [in](#slavunyamathnumberinnumbers)
        * [between](#slavunyamathnumberbetweenleft-right)
        * [right](#slavunyamathnumberrighta)
        * [declination](#slavunyamathnumberdeclinationwords)
    * [urlParams](#slavunyaurlparamsname)
    * [defaults](#slavunyadefaultsobj-def)
    * [getRGB](#slavunyagetrgbcolor)

## Install
Add script ```//cdn.rawgit.com/finagin/Slavunya.js/v1.1.1/dist/Slavunya.min.js``` to your code
```html
<body>
    <div class="content">...</div>

    <script src="//cdn.rawgit.com/finagin/Slavunya.js/v1.1.1/dist/Slavunya.min.js"></script>
    <script src="/main.min.js"></script>
</body>
```
## Usage

### Slavunya.cookies(name, [value, [days, [secure]]])
```js
> Slavunya.cookies("page")
< 2

> Slavunya.cookies("page", 3, 7)
< undefined
> Slavunya.cookies("page")
< 3
```
### Slavunya.math(number)
#### Slavunya.math(number).in(...numbers)
```js
> Slavunya.math(2).in(1,2,3)
< true

> Slavunya.math(4).in(1,2,3)
< false

> Slavunya.math(2).in([1, 2, 3])
< true
```
#### Slavunya.math(number).between(left, right)
```js
> Slavunya.math(5).between(1, 10)
< true

> Slavunya.math(15).between(1, 10)
< false
```
#### Slavunya.math(number).right(a)
```js
> Slavunya.math(12345).right(1);
< 5

> Slavunya.math(12345).right(2);
< 45
```
#### Slavunya.math(number).declination(words)
```js
> Slavunya.math(3).declination(["день", "дня", "дней"])
< "дня"

> Slavunya.math(11).declination(["неделя", "недели", "недель"])
< "дней"

> Slavunya.math(21).declination(["месяц", "месяца", "месяцев"])
< "месяцев"
```
### Slavunya.urlParams([name])
``` /index.html?page=2&guest#block=about ```
```js
> Slavunya.urlParams("page");
< 2

> Slavunya.urlParams("block");
< "about"

> Slavunya.urlParams();
< {
      page: 2,
      guest: true,
      block: "about"
  }
```
### Slavunya.defaults(obj, def)
```js
> Slavunya.defaults({
      name:"Igor",
      age: 22,
      city: "Kazan"
  }, {
      country: "Russia",
      city: "Moscow"
  })
< {
      name:"Igor",
      age: 22,
      country: "Russia",
      city: "Kazan"
  }
```
### Slavunya.getRGB(color)
```js
> Slavunya.getRGB("#E6AC0C")
< [230, 172, 12]
```

### Slavunya.toCamelCase(str, [strict])
```js
> Slavunya.toCamelCase("to-camel-case")
< toCamelCase

> Slavunya.toCamelCase("TO-CAMEL-CASE", true)
< toCamelCase
```
