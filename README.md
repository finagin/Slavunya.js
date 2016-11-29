# Slavunya.js

* [Install](#install)
* Usage
    * [regExp](#slavunyaregexptype-teststring)
    * [getRGB](#slavunyagetrgbcolor)
    * [cookies](#slavunyacookiesname-value-days-secure)
    * [math](#slavunyamathnumber)
        * [in](#slavunyamathnumberinnumbers)
        * [between](#slavunyamathnumberbetweenleft-right)
        * [right](#slavunyamathnumberrighta)
        * [declination](#slavunyamathnumberdeclinationwords)
    * [urlParams](#slavunyaurlparamsname)

## Install
Add script ```//cdn.rawgit.com/finagin/Slavunya.js/master/dist/Slavunya.min.js``` to your code
```html
<body>
    <div class="content">...</div>

    <script src="//cdn.rawgit.com/finagin/Slavunya.js/master/dist/Slavunya.min.js"></script>
    <script src="/main.min.js"></script>
</body>
```
## Usage
### Slavunya.regExp(type, [testString])
```js
> Slavunya.regExp("phone");
< [
       /^((?:\+7|8)\s*(?:\((\d{3})\)|(\d{3})))?\s*(\d{3}[\s-]?\d{2}[\s-]?\d{2})$/
  ]
```
```js
> Slavunya.regExp("phone", "+7 (843) 275-00-00");
< ["+7 (843) 275-00-00", "+7 (843)", "843", null, "275-00-00"]

> Slavunya.regExp("phone", "invalid");
< undefined
```
### Slavunya.getRGB(color)
### Slavunya.cookies(name, [value, [days, [secure]]])
```js
> Slavunya.cookies("page");
< 2

> Slavunya.cookies("page", 3, 7);
< undefined
> Slavunya.cookies("page");
< 3
```
### Slavunya.math(number)
#### Slavunya.math(number).in(...numbers)
```js
> Slavunya.math(2).in(1,2,3)
< true

> Slavunya.math(4).in(1,2,3)
< false

> Slavunya.math(2).in([1,2,3])
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
