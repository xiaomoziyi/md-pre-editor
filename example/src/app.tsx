import React, { Component } from 'react'
import { MdEditor } from '../../src/index'
// import Editor from '../../dist'
import * as styles from './app.module.scss'
import value from '../static/help.md'

interface IS {
  value: string
  mobile: boolean
  language: string
}


class App extends Component<{}, IS> {

  private $vm = React.createRef<MdEditor>()

  constructor(props: any) {
    super(props)

    this.state = {
      value: '',
      mobile: false,
      language: 'en'
    }
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    setTimeout(() => {
      this.setState({
        value
      })
    }, 200)
  }

  resize() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      this.setState({
        mobile: false
      })
    } else {
      this.setState({
        mobile: true
      })
    }
  }

  handleChange(value: string) {
    this.setState({
      value
    })
  }

  handleSave(value: string) {
    console.log('触发保存事件', value)
  }

  addImg($file: File) {
    this.$vm.current.$img2Url($file.name, 'file_url')
    console.log($file)
  }

  render() {
    const { value, mobile, language } = this.state
    const customLang: any = {
      placeholder: '开始编辑...',
      undo: '上一步',
      redo: '下一步',
      h1: '一级标题',
      h2: '二级标题',
      h3: '三级标题',
      h4: '四级标题',
      h5: '五级标题',
      h6: '六级标题',
      para: '段落',
      italic: '斜体',
      bold: '粗体',
      bolditalic: '斜粗体',
      delline: '删除线',
      underline: '下划线',
      keytext: '键盘文本',
      superscript: '上标',
      subscript: '下标',
      marktag: '高亮标签',
      table: '表格',
      quote: '引用',
      img: '添加图片链接',
      link: '链接',
      list: '列表',
      orderlist: '有序列表',
      disorderlist: '无序列表',
      checklist: '勾选框列表',
      inlinecode: '行内代码',
      code: '代码块',
      collapse: '折叠块',
      katex: 'KaTeX',
      save: '保存',
      preview: '预览',
      singleColumn: '单栏',
      doubleColumn: '双栏',
      fullscreenOn: '全屏编辑',
      fullscreenOff: '退出全屏',
      addImgLink: '添加图片链接',
      addImg: '上传图片',
      toc: '生成大纲'
    }
    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <div>
            <h1>md-pre-editor</h1>
          </div>
          <div className={styles.topRight}>
            <a
              href="https://github.com/xiaomoziyi/md-pre-editor"
              title="https://github.com/xiaomoziyi/md-pre-editor"
              target="_blank"
            >
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2481"
                width="45"
                height="45"
              >
                <path
                  d="M569.6 659.2c12.8-3.2 25.6-3.2 38.4-6.4 38.4-9.6 70.4-28.8 86.4-64 19.2-38.4 22.4-76.8 12.8-118.4-3.2-19.2-12.8-32-25.6-48-3.2-3.2-3.2-6.4-3.2-9.6 6.4-25.6 6.4-48-3.2-73.6 0-3.2-3.2-6.4-9.6-6.4-16 0-28.8 6.4-41.6 12.8s-22.4 12.8-32 19.2c-3.2 3.2-6.4 3.2-9.6 3.2-51.2-12.8-99.2-12.8-150.4 0-3.2 0-6.4 0-9.6-3.2-22.4-12.8-41.6-25.6-67.2-28.8-16-3.2-16-3.2-19.2 12.8-6.4 22.4-6.4 44.8 0 67.2v6.4c-28.8 32-35.2 73.6-28.8 112 3.2 12.8 3.2 22.4 6.4 35.2 16 44.8 48 70.4 96 83.2 12.8 3.2 25.6 6.4 41.6 9.6-9.6 9.6-16 25.6-19.2 38.4 0 3.2-3.2 3.2-3.2 3.2-32 12.8-67.2 9.6-89.6-25.6-9.6-16-22.4-28.8-44.8-32h-16c-6.4 0-6.4 6.4-3.2 9.6l6.4 6.4c16 9.6 28.8 25.6 35.2 44.8 12.8 28.8 35.2 41.6 67.2 44.8 12.8 0 28.8 0 44.8-3.2v60.8c0 9.6-9.6 16-22.4 12.8-25.6-9.6-51.2-22.4-76.8-38.4-96-67.2-147.2-160-140.8-278.4 6.4-147.2 115.2-265.6 259.2-294.4 166.4-32 326.4 70.4 371.2 233.6 41.6 160-51.2 326.4-204.8 377.6-16 6.4-25.6 0-25.6-19.2v-76.8c3.2-25.6 0-48-19.2-67.2z"
                  fill="#FFFFFF"
                  p-id="2482"
                ></path>
              </svg>
            </a>
            <select
              value={language}
              onChange={(e) => {
                this.setState({
                  language: e.target.value
                })
                this.forceUpdate()
              }}
            >
              <option value="en">English</option>
              <option value="zh-CN">中文(简体)</option>
              <option value="zh-TW">中文(繁體)</option>
              <option value="jp">日本語</option>
            </select>
          </div>
        </div>

        <div className={styles.editor}>
          {mobile && (
            <MdEditor
              ref={this.$vm}
              height="500px"
              toolbar={{
                h1: true,
                h2: true,
                h3: true,
                save: true,
                preview: true
              }}
              value={value}
              subfield={false}
              onChange={value => this.handleChange(value)}
              onSave={value => this.handleSave(value)}
              language={customLang}
            />
          )}
          {!mobile && (
            <MdEditor
              ref={this.$vm}
              height="700px"
              value={value}
              language={language}
              addImg={($file) => this.addImg($file)}
              onChange={value => this.handleChange(value)}
              onSave={value => this.handleSave(value)}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
