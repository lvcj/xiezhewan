const babel = require('@babel/core')
const t = require('@babel/types')

const buildAttrsCall = (attribs, t) => {
  const props = []
  attribs.forEach(attr => {
    const name = attr.name.name
    const value = attr.value
    !t.isJSXExpressionContainer(value) &&
    props.push(t.objectProperty(t.stringLiteral(name), value))
    t.isJSXExpressionContainer(value) &&
    props.push(t.objectProperty(t.stringLiteral(name), value.expression))
  })

  return t.ObjectExpression(props)
}

const jsxVisitor = {
  JSXElement: {
    exit(path, state) {      
      // 获取 jsx 
      const openingPath = path.get("openingElement")
      const children = t.react.buildChildren(openingPath.parent)

      const tagNode = t.identifier(openingPath.node.name.name)

      // 创建 Vue h
      const createElement = t.identifier('h')
      const attrs = buildAttrsCall(openingPath.node.attributes, t)
      // 创建 h(tag,{...attrs},...chidren)
      const callExpr = t.callExpression(createElement, [tagNode, attrs, ...children])
      path.replaceWith(t.inherits(callExpr, path.node))
    }
  },
  JSXAttribute(path) {
    if (t.isJSXElement(path.node.value)) {
      path.node.value = t.jsxExpressionContainer(path.node.value);
    }
  },
  Program: {
    exit(path, state) {
      // 注入 h 函数
      if (path.node.start === 0) {
        path.node.body.unshift(
          t.importDeclaration(
            [t.ImportSpecifier(t.identifier('h'), t.identifier('h'))],
            t.stringLiteral('vue')
          )
        )
      }
    }
  }
}

const transJSX = {
  visitor: jsxVisitor,
  inherits:() => {
    return {
      manipulateOptions(opts, parserOpts) {
        parserOpts.plugins.push("jsx")
      }
    }
  }
}

// ------------------------------ 我是分割线 ------------------------------

const vueJSX = `
  const a = () => (
    <div class="foo" onClick={clickHandler}>
      <input onclick={bar}/>
    </div>
  )
`

const resultjsx = babel.transform(vueJSX, {
  plugins: [
    transJSX,
  ]
})

console.log(resultjsx)

// ------------------------------ 我是分割线 ------------------------------

module.exports = function(babel) {
  return transJSX
}