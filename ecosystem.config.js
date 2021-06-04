module.exports = {
  apps: [
    {
      name: 'DeepMAPS-frontend',
      script: './node_modules/nuxt-start/bin/nuxt-start.js',
      port: 9004,
      watch: '.',
      args: 'start -H 0.0.0.0',
      max_memory_restart: '16G',
      log_date_format: 'YYYY-MM=DD HH:mm:ss',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'DeepMAPS-frontend-test',
      script: './node_modules/nuxt-start/bin/nuxt-start.js',
      port: 9006,
      watch: '.',
      args: 'start -H 0.0.0.0',
      max_memory_restart: '16G',
      log_date_format: 'YYYY-MM=DD HH:mm:ss',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
