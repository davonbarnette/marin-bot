module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/frames/test-frame',
      handler: 'frame.testFrame',
      config: {
        policies: []
      },
    },
  ],
};
