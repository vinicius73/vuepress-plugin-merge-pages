# vuepress-plugin-merge-pages

> VuePress Plugin: Merge Markdown files in a single Markdown

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
          filter: ({ path }) => path.includes('/printable-page/') // optional
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

Filter pages of bundle. Receive `page` and return `boolean`

```js
{
  content: String,
  path: String,
}
```