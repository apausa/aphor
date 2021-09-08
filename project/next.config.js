/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.it'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
