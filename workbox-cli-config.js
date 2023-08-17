module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{png,jpg,html,json,js}'],
  swSrc: 'public/sw-base.js',
  swDest: 'public/service-worker.js',
  globIgnores: ['../workbox-cli-config.js']
};
