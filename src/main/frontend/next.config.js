module.exports = {
  trailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
       '/tasks/completed': { page: 'tasks/completed'}
    };
  }
};
