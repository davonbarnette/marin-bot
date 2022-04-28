module.exports = {
  routes: [
    {
      method: 'PATCH',
      path: '/prints',
      handler: 'print.upsert',
      config: {
        policies: []
      },
    },
  ],
}
