/**
 * Rules which are not convient in dev mode, but in publish mod is required.
 */

module.exports = {
    rules: {
        "no-unused-vars": [2, { "vars": "all", "args": "none" }]
    },
    extends: '.eslintrc'
}
