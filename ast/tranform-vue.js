const { baseParse } = require('@vue/compiler-core')
const transform = require('../plugins/babel-tranform-memberExpression')
const babel = require('@babel/core')
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const spinner = ora('Loading... \n').start()
const resolve = p => path.resolve(__dirname, p)

const COMPONENT_BASE_PATH = '../components'
const UNI_BASE_PATH = '../uni-components'
const SCRIPT = 'script'

const NORMAL_ATTR = 6

function readVueFile(path) {
  if (
    !fs.existsSync(
      resolve(`${COMPONENT_BASE_PATH}/${path}`)
    )
  ) {
    spinner.fail('未找到该组件，请确认！')
    return
  }
  return fs.readFileSync(
    resolve(`${COMPONENT_BASE_PATH}/${path}`),
    {
      encoding: 'utf8',
    }
  )
}

function compilerCode(code) {
  const vueAst = baseParse(code)

  let template = ''
  let style = ''
  let script = ''

  function concatCode(type, ast) {
    let code = ``
    ast.children
      .filter(child => {
        return child.tag === type
      })
      .forEach(t => {
        code += t.loc.source
      })
    return code
  }

  function transformJs(ast) {
    let code = ''
    ast.children
      .filter(child => {
        return child.tag === SCRIPT
      })
      .forEach(s => {
        s.children.forEach(js => {
          code += `
<script>
${
  babel.transform(js.loc.source, {
    plugins: [transform],
  }).code
}
</script>
`
        })
      })
    return code
  }

  style = concatCode('style', vueAst)
  script = transformJs(vueAst)

  vueAst.children
    .filter(child => {
      return child.tag === 'template'
    })
    .forEach(c => {
      template += genTemplate(c).code
    })
  return {
    template,
    style,
    script,
  }
}

function generateVueFile(
  path,
  { template, script, style }
) {
  const name = path.split('.')[0]
  const dirPath = `${UNI_BASE_PATH}/${name}`

  !fs.existsSync(resolve(dirPath)) &&
    fs.mkdirSync(resolve(dirPath))
  fs.writeFile(
    resolve(`${dirPath}/index.vue`),
    template + script + style,
    {},
    err => {
      if (err) {
        throw err
      }
      spinner.succeed('执行完毕')
    }
  )
}

const run = () => {
  const args = process.argv.slice(2)
  console.log(args)
  if (!args[0]) {
    spinner.fail(
      `请加上组件名称参数。\n npm run transform component.name \n e: npm run transform button`
    )
    return
  }
  generateVueFile(
    `${args[0]}.vue`,
    compilerCode(readVueFile(`${args[0]}/index.vue`))
  )
}

run()

function createCodegenContext(ast) {
  const context = {
    code: ``,
    push(code) {
      context.code += code
    },
    source: ast.loc.source,
    newline(n = 2) {
      context.push('\n' + ` `.repeat(n))
    },
  }

  return context
}

function genTemplate(ast) {
  const context = createCodegenContext(ast)
  const { push, newline } = context

  push('<template>')
  newline()

  genHTML(ast, context)

  push('</template>')
  newline()
  return context
}

function genHTML(ast, context) {
  const { push, newline } = context
  ast.children.forEach(child => {
    const { tag, isSelfClosing, props } = child
    if (tag) {
      if (isSelfClosing) {
        push(`<${tag}`)
        injectProps(props, context)
        if (tag === 'img') {
          injectProps(injectImgMode(), context)
        }
        push(`/>`)
        newline()
      } else {
        push(`<${tag}`)
        injectProps(props, context)
        push(`>`)
        if (child.children && child.children.length) {
          genHTML(child, context)
        }
        push(`</${tag}>`)
        newline()
      }
    } else {
      push(child.loc.source)
    }
  })
}

function injectProps(props, context) {
  const { push } = context
  props.forEach(prop => {
    push(` `)
    const { type, name, value, loc } = prop
    if (type === NORMAL_ATTR) {
      value
        ? push(`${name}=${value.loc.source}`)
        : push(`${name}`)
    } else {
      push(loc.source)
    }
  })
}

function injectImgMode() {
  return [
    {
      name: 'mode',
      value: {
        loc: {
          source: '"widthFix"',
        },
      },
      type: NORMAL_ATTR,
    },
  ]
}
