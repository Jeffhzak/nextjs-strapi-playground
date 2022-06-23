module.exports = ({ env }) => ({
  // ...
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        thread: {
          field: 'slug',
          references: 'title',
        },
      },
    },
  },
  "rest-cache": {
    config: {
      provider: {
        name: "memory",
        options: {
          max: 32767,
          maxAge: 3600,
        },
      },
      strategy: {
        contentTypes: [
          // list of Content-Types UID to cache
          // "api::category.category",
          // "api::article.article",
          // "api::global.global",
          // "api::homepage.homepage",
        ],
      },
    },
  },
  // ...
});