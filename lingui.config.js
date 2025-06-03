/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'te', 'hi'],
  catalogs: [
    {
      path: '<rootDir>/apps/mobile/locales/{locale}/messages',
      include: ['apps/mobile'],
    },
  ],
  format: 'po',
  compileNamespace: 'ts',
}
