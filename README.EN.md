# md-pre-editor

> React markdown editor component, support for preview and Tex syntax

###  About Version Number

`x.x.x` --> `Incompatible Update` . `New Features(include Fixing Known Bugs)` . `Fix Bugs`

Base on [for-editor](https://github.com/kkfor/for-editor) and [for-editor-herb](https://github.com/HerbertHe/for-editor-herb)开发。
Because there are some problems with both libraries. Convenient for self-learning and exploration, opened this project. Embrace open source, 
if you like, please give a star to the original project

* [Demo](https://xiaomoziyi.gitee.io/md-pre-editor/)
* [GitHub](https://github.com/xiaomoziyi/md-pre-editor)

> Base on `for-editor 0.3.5`

### What's New

* [x] Toolbar button: quote/paragraph/table/inline code/collapse/katex/list
* [x] Support to render `Tex` Block and Inline `Tex` sentences
* [x] Responsive Layout
* [x] Support Preview Outline for jumping appointed anchor
* [x] Generate TOC
* [x] Support Simplified Chinese, Traditional Chinese, English, Japanese
* [x] Support localization
* [x] Support GitHub Diff Syntax
* [x] Support md Preview

### Documents

* [简体中文](./README.md)

## Install

```shell
# npm
npm install md-pre-editor -save

```

## Use

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { MdEditor, MdPriview }  from 'for-editor-herb'
// MdPriview for reading md file presentations

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state
     // Support default language('en', 'zh-CN', 'zh-TW', 'jp') and localization
    const customLang: any = {
      placeholder: "Begin editing...",
      undo: "Undo",
      redo: "Redo",
      h1: "Header 1",
      h2: "Header 2",
      h3: "Header 3",
      h4: "Header 4",
      h5: "Header 5",
      h6: "Header 6",
      img: "Image Link",
      para: "Paragraphy",
      italic: "Italic",
      bold: "Bold",
      bolditalic: "Bold Italic",
      delline: "Delete Line",
      underline: "Underline",
      keytext: "Keyboard Text",
      superscript: "Superscript",
      subscript: "Subscript",
      marktag: "Mark Tag",
      table: "Table",
      quote: "Quote",
      link: "Link",
      list: "List",
      orderlist: "Order List",
      disorderlist: "Disorder List",
      checklist: "Check List",
      inlinecode: "Inline Code",
      code: "Code",
      collapse: "Collapse",
      katex: "KaTeX",
      save: "Save",
      preview: "Preview",
      singleColumn: "Single Column",
      doubleColumn: "Double Columns",
      fullscreenOn: "FullScreen ON",
      fullscreenOff: "FullScreen OFF",
      addImgLink: "Add Image Link",
      addImg: "Upload Image",
      toc: "Generate TOC"
    }

    const md = `### Test \n success log`
    return （
      <>
        <MdEditor
          language={customLang}
          value={value}
          onChange={() => this.handleChange()}
        />
        <MdPriview value={md} />
      </>
    ）
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## API

### props

| name        | type     | default                     | description                                                                                            |
| ----------- | -------- | --------------------------- | ------------------------------------------------------------------------------------------------------ |
| value       | String   | -                           | value                                                                                                  |
| language    | String / IWords  | en   | Default Language(zh-CN: Simplified Chinese, en: English, zh-TW: Traditional Chinese, jp: Japanese), support localization by following the `interface IWords`     |
| placeholder | String   | Begin editing...            | The default prompt text when the textarea is empty                                                     |
| lineNum     | Boolean  | true                        | Show lineNum                                                                                           |
| style       | Object   | -                           | editor styles                                                                                          |
| height      | String   | 600px                       | editor height                                                                                          |
| preview     | Boolean  | false                       | preview switch                                                                                         |
| expand      | Boolean  | false                       | fullscreen switch                                                                                      |
| subfield    | Boolean  | false                       | true: Double columns - Edit preview same screen(notice: preview: true), Single Columns - otherwise not |
| toolbar     | Object   | As in the following example | toolbars                                                                                               |
| outline     | Boolean  | true                        | Display outline list for markdown                                                                      |
| highlight   | Function | Hljs.highlightAuto          | Hljs (highlight.js)'s function --- highlightAuto                                                       |
| anchor | Boolean | true | Control if the anchor is displayed at the preview |

```js
/*
The default toolbar buttons are all on, if no function block is required, they need to be passed in
  eg: {
    h1: false, // h1
    code: false, // 代码块
    preview: false, // 预览
    para: {
      paragraph: false,
    }
  }
*/
toolbar: {
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    img: true,
    list: true,
    para: {
      paragraph: true,        // control whether the entire section is displayed
      italic: true,
      bold: true,
      bolditalic: true,
      delline: true,
      underline: true,
      keytext: true,
      superscript: true,
      subscript: true,
      marktag: true
    },
    table: true,     
    quote: true,      
    link: true,       
    inlinecode: true,  
    code: true,       
    collapse: true,  
    katex: true,   
    preview: true, 
    expand: true,
    undo: true,
    redo: true,
    save: true,
    subfield: true,   // single-double bar switch
    toc: true         // build outline inserts
}
```

#### Localization

> IWords

```js
interface IWords {
  placeholder: string
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
  h6: string
  undo: string
  redo: string
  list: string
  orderlist: string
  disorderlist: string
  checklist: string
  para: string
  italic: string
  bold: string
  bolditalic: string
  delline: string
  underline: string
  keytext: string
  superscript: string
  subscript: string
  marktag: string
  quote: string
  table: string
  img: string
  link: string
  inlinecode: string
  code: string
  collapse: string
  katex: string
  save: string
  preview: string
  singleColumn: string
  doubleColumn: string
  fullscreenOn: string
  fullscreenOff: string
  addImgLink: string
  addImg: string
  toc: string
}
```

### events

| name     | params        | default | description    |
| -------- | ------------- | ------- | -------------- |
| onChange | String: value | -       | Edit area change callback event    |
| onSave   | String: value | -       | Ctrl+s and click save button callback event       |
| addImg   | File: file    | -       | upload image callback event    |

### upload image

```js
class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.$vm = React.createRef()
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  addImg($file) {
    this.$vm.current.$img2Url($file.name, 'file_url')
    console.log($file)
  }

  render() {
    const { value } = this.state

    return (
      <Editor
        ref={this.$vm}
        value={value}
        addImg={($file) => this.addImg($file)}
        onChange={(value) => this.handleChange(value)}
      />
    )
  }
}
```

### hot key

| name   | description |
| ------ | ----------- |
| tab    | two space    |
| ctrl+s | save         |
| ctrl+z | undo       |
| ctrl+y | redo       |

## Update

* [Update Log](./doc/UPDATELOG.md)

## License

md-pre-editor is [MIT License](./LICENSE)
