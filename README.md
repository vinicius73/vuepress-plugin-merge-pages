# vuepress-plugin-merge-pages

> VuePress Plugin: Merge Markdown files in a single Markdown

![NPM](https://flat.badgen.net/npm/v/vuepress-plugin-merge-pages?icon=npm)
![NPM](https://flat.badgen.net/npm/dm/vuepress-plugin-merge-pages?icon=npm)
![Codeclimate](https://flat.badgen.net/codeclimate/maintainability/vinicius73/vuepress-plugin-merge-pages?icon=codeclimate)
![Codeclimate](https://flat.badgen.net/codeclimate/coverage/vinicius73/vuepress-plugin-merge-pages?icon=codeclimate)
![lgtm](https://flat.badgen.net/lgtm/grade/g/vinicius73/vuepress-plugin-merge-pages?icon=lgtm)
![github](https://flat.badgen.net/github/status/vinicius73/vuepress-plugin-merge-pages?icon=github)


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
          },
          mergePages: pages => { // optional
            const pageBreak = '<hr class="page-break" />\n\n'
            const initialValue = `# My Printable Page\n\n[[TOC]]\n${pageBreak}`
            return pages
              .reduce((acc, current) => {
                return `${acc}${current.content}\n\n${pageBreak}`
              }, initialValue)
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
- Required: `false`

Page route path, url of target page.

#### bundles[].name

- Type: `String`
- Required: `false`

Name of generated file.

#### bundles[].filter

- Type: `Function => Page[]`
- Required: `false`

Filter pages of bundle. Receive `pages` and return new list of pages
See above example for mor details

##### Page object

```js
// page object
{
  content: String,
  path: String,
}
```

#### bundles[].mergePages

- Type: `Function => String`
- Required: `false`

Custom content merge. Allow interaction with pages to inject custom contents.
See above example for mor details