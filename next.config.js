const { withNextVideo } = require('next-video/process')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "sp", "fr"],
    defaultLocale: "en",
  },
};

module.exports = withNextVideo(nextConfig);
