var ghpages = require('gh-pages');

ghpages.publish('docs/__sapper__/export/svelma-pro', {
  branch: 'gh-pages',
  repo: 'https://github.com/KeiferJu/svelma-pro.git',
  message: 'deploy',
}, function (err) {
  console.log(err);
});