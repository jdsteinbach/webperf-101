// Markdown
const markdownIt = require('markdown-it')
const markdownItHighlightJS = require('markdown-it-highlightjs')
const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
}

module.exports = eleventyConfig => {
  eleventyConfig.addCollection('slides', collection => {
    return collection
      .getAllSorted()
      .filter(page => {
        return page.inputPath.match(/^\.\/src\/slides/) !== null
      })
      .sort((a, b) => {
        return a.inputPath < b.inputPath ? -1 : 1;
      });
  });

  eleventyConfig.addFilter('data_attrs', attrs => {
    if (!attrs) return;

    if (typeof attrs !== 'object') return;

    if (Object.keys(attrs).length < 1) return;

    const keys = [];

    Object.keys(attrs).map(key => {
      if (key.indexOf('data-') === 0) {
        keys.push(`${key}="${attrs[key]}"`);
      }
    });

    if (keys.length < 1) return;

    return keys.join(' ');
  });

  eleventyConfig.addShortcode('link', (title, url) => {
    return `<a href="${url}" class="link"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="link__icon"><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V3h-6c-.55 0-1 .45-1 1z"></path></svg><span class="sr-only">${title}</span></a>`;
  });

  eleventyConfig.setLibrary('md', markdownIt(mdOptions).use(markdownItHighlightJS));

  eleventyConfig.addPassthroughCopy({
    './node_modules/reveal.js/css/': 'css',
    './node_modules/reveal.js/js/': 'js',
    './node_modules/reveal.js/plugin/': 'plugin'
  });
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/fonts');

  eleventyConfig.addWatchTarget('./src/_includes/theme/**/*.scss')

  return {
    templateFormats: [
      'liquid',
      'md',
      'html',
      '11ty.js'
    ],
    dir: {
      input: './src'
    }
  };
};
