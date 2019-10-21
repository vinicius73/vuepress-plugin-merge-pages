# vuepress-plugin-merge-pages

> VuePress Plugin: Merge Markdown files in a single Markdown

![NPM](https://flat.badgen.net/npm/v/vuepress-plugin-merge-pages?icon=npm)
![NPM](https://flat.badgen.net/npm/dm/vuepress-plugin-merge-pages?icon=npm)
![Codeclimate](https://flat.badgen.net/codeclimate/maintainability/vinicius73/vuepress-plugin-merge-pages?icon=codeclimate)
![Codeclimate](https://flat.badgen.net/codeclimate/coverage/vinicius73/vuepress-plugin-merge-pages?icon=codeclimate)
![Codeclimate](https://flat.badgen.net/lgtm/grade/g/vinicius73/vuepress-plugin-merge-pages?icon=lgtm)
![Codeclimate](https://flat.badgen.net/github/status/vinicius73/vuepress-plugin-merge-pages?icon=github)


## Install

```bash
yarn add vuepress-plugin-merge-pages -D
npm install vuepress-plugin-merge-pages --save-dev
```

## Usage

```js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-merge-pages',
      {
        bundles: [{
          path: '/printable',
          name: 'print-all-content-page', // optional
          filter: (pages) => { // optional
            return pages.filter(({ path }) => path.includes('/printable-page/'))
          }
        }]
      }
    ]
}
```

### Options

#### bundles

- Type: `Array`
- Required: `true`

List of target merge files.

#### bundles[].path

- Type: `String`
- Required: `true`

Page route path, url of target page.

#### bundles[].name

- Type: `String`
- Required: `false`

Name of generated file.

#### bundles[].filter

- Type: `Function => Boolean`
- Required: `false`

Filter pages of bundle. Receive `pages` and return new list of pages

```js
// page object
{
  content: String,
  path: String,
}
```