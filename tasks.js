import Start from 'start'
import reporter from 'start-pretty-reporter'
import env from 'start-env'
import files from 'start-files'
import _clean from 'start-clean'
import read from 'start-read'
import babel from 'start-babel'
import write from 'start-write'
import eslint from 'start-eslint'

const srcDir = './src'
const outDir = './lib'

const stripDirs = (files) => {
  return new Promise(resolve => resolve(
    files.map(file => {
      file.path = file.path.split('/').pop()
      return file
    })
  ))
}

const renameJsx = (files) => {
  return new Promise(resolve => resolve(
    files.map(file => {
      file.path = file.path.replace(/\.jsx$/,'.js')
      return file
    })
  ))
}

const start = Start(reporter())

export const lint = () => start(
  files(srcDir + '/*'),
  eslint()
)

export const clean = () => start(
  files(outDir),
  _clean(),
)

export const buildJs = () => start(
  files(srcDir + '/*'),
  read(),
  babel(),
  renameJsx,
  write(outDir)
)

export const copyMaterialFiles = () => start(
  files([
    'dist/*.js',
    'dist/*.css',
    'src/selectfield/selectfield.scss'
  ], { cwd: 'node_modules/mdl-selectfield/' }),
  read(),
  stripDirs,
  write(outDir)
)

export const build = () => start(
  env('NODE_ENV', 'production'),
  clean,
  lint,
  buildJs,
  copyMaterialFiles
)
