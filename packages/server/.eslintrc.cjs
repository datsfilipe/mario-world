module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: 'packages/server/*/tsconfig.json'
      }
    }
  }
}
