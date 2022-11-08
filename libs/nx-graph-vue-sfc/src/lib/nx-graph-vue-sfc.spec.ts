import * as compiler from 'vue/compiler-sfc'
import * as fs from 'fs'
import * as path from 'path'

const simpleComponent = fs.readFileSync(path.resolve(__dirname, './__fixtures__/SimpleComponent.vue'), { encoding: 'utf-8' })
const projectLibrary = '@nx-lab/api-interface'

describe('@vue/sfc-compiler exploration', () => {
  test(`script compiler should find ${projectLibrary}`, () => {
    const importDeclarations = extractImportDeclarations(simpleComponent)
    const moduleNames = findModulesNames(importDeclarations)

    expect(moduleNames).toContain(projectLibrary)
  })
})

function findModulesNames(declarations: unknown[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return declarations.map((declaration) => declaration.source.value)
}

function extractImportDeclarations(source: string) {
  const noSourceMaps =  { sourceMap: false }

  const { errors, descriptor } = compiler.parse(source, noSourceMaps)
  if (errors.length !== 0) {
    throw new Error(`Failed to parse component. Errors: ${JSON.stringify(errors, undefined, 2)}`, )
  }

  const script = compiler.compileScript(descriptor, {
    id: 'irrelevant',
    reactivityTransform: false,
    ...noSourceMaps,
  })
  const ast = script.scriptAst ?? []
  return ast.filter(({type}) => type === 'ImportDeclaration')
}
