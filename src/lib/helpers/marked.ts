import marked from 'marked'
import katex from 'katex'
import Hljs from 'highlight.js'

const markedRender = (content: string, anchor: boolean): string => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  })

  const renderer = new marked.Renderer()

  // 标题解析
  const headingParse = (text: string, level: number) => {
    return `<h${level}>
    <span class="for-heading">${text}</span>
    ${anchor ? `<a href="#${text}" name="${text}" class="for-anchor">#</a>` : ''}
  </h${level}>`
  }

  // latex解析
  const latexBlockParse = (latex: string) => {
    let html: string = katex.renderToString(latex, {
      displayMode: true,
      leqno: false,
      fleqn: false,
      throwOnError: false,
      strict: 'ignore',
      trust: false,
      output: 'html'
    })
    return html
  }

  const latexInlineParse = (latex: string) => {
    let html: string = katex.renderToString(latex, {
      displayMode: false,
      leqno: false,
      fleqn: false,
      throwOnError: false,
      strict: 'ignore',
      trust: false,
      output: 'html'
    })
    return html
  }

  // 段落解析
  const paragraphParse = (text: string) => {
    // const texBlock = new RegExp('(?<=\\$\\$)[\\s\\S]*?(?=\\$\\$)')
    const texBlock = new RegExp('(\\$\\$+)([^\\$\\$]|[^\\$\\$][\\s\\S]*?[^\\$\\$])\\1(?!\\$\\$)')
    const texInline = new RegExp('(\\$+)([^\\$]|[^\\$][\\s\\S]*?[^\\$])\\1(?!\\$)')
    const markTag = new RegExp(/\==.+?\==/g)

    if (texBlock.test(text)) {
      return latexBlockParse(texBlock.exec(text)[2])
    } else if (texInline.test(text)) {
      while (texInline.test(text)) {
        let result: RegExpExecArray = texInline.exec(text)
        text = text.replace(result[0], latexInlineParse(result[2]))
      }
      return `<p>${text}</p>`
    }  else if (markTag.test(text)) {
      let back: string = text
      const markTags: Array<string> = text.match(markTag)
      markTags.forEach(item => {
        back = back.replace(item, `<mark>${item.substr(2, item.length - 4)}</mark>`)
      })
      return `<p>${back}</p>`
    }else {
      return `<p>${text}</p>`
    }
  }

  // 链接解析
  const linkParse = (href: string, title: string, text: string) => {
    return `<a href=${href}
      title=${title || href}
      target='_blank'
      }>${text}</a>`
  }

  const codeParse = (code: string, language: string) => {
    if (language === 'diff') {
      let diffArray: Array<string> = code.split('\n')
      let backDiff: string = ''
      const addDiff = new RegExp('(\\+ )')
      const delDiff = new RegExp('(\\- )')
      const focusDiff = new RegExp('(\\! )')
      const ignoreDiff = new RegExp('(\\# )')
      diffArray.forEach((item: string) => {
        if (addDiff.test(item)) {
          backDiff += `<p class="for-md-diff-add">${item}</p>`
        } else if (delDiff.test(item)) {
          backDiff += `<p class="for-md-diff-del">${item}</p>`
        } else if (focusDiff.test(item)) {
          backDiff += `<p class="for-md-diff-focus">${item}</p>`
        } else if (ignoreDiff.test(item)) {
          backDiff += `<p class="for-md-diff-ignore">${item}</p>`
        } else {
          backDiff += `<p>${item}</p>`
        }
      })
      return `<pre class="for-md-diff"><code>${backDiff}</code></pre>`
    } else {
      return `<pre><code title="${language}" class="language-${language}">${
        Hljs.highlightAuto(code).value
      }</code></pre>`
    }
  }

  renderer.code = codeParse
  renderer.paragraph = paragraphParse
  renderer.link = linkParse
  renderer.heading = headingParse

  return marked(content, { renderer })
}

export default (content: string, anchor: boolean): string => {
  if (typeof content !== 'string' || !content) return ''

  return markedRender(content, anchor)
}
