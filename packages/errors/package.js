Package.describe({
    name: 'gcdong:errors',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '用于本app错误提示',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.0.1');
    // api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
    // api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');
    api.use('minimongo', 'client');
    api.use('ecmascript');
    api.mainModule('errors.js');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('gcdong:errors');
    api.mainModule('errors-tests.js');
});
