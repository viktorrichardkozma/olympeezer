const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@entityTypes': path.resolve(__dirname, 'src/entityTypes/'),
      '@factories': path.resolve(__dirname, 'src/components/factories/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@icons': path.resolve(__dirname, 'src/assets/icons/'),
      '@redux': path.resolve(__dirname, 'src/redux/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    }
  }
}
