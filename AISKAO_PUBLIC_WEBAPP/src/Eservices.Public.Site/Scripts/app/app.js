(function () {
    var root = this;

    define3rdPartyModules();
    loadPluginsAndBoot();
    
    requirejs.config(
        {
            // Let require.js load all app/custom modules asynchronously as needed.
            // They are all in this folder.
            // If we bundle this folder, this is not needed. But if we don't bundle, we need this.
            /*baseUrl: '/scripts/app',  script default location */

            // List paths to js files that are not in the baseUrl and not in bundles.
            // If we use the non-amd versions of 3rd libs we can bundle them instead.
            // In which case we don't need the paths.
            // Example:
            paths: {
                'libs': '../libs',
                'durandal': '../libs/durandal',
                'transitions': '../libs/durandal/transitions',
                'text': '../libs/durandal/text',
                //'bootstrap': '../../Content/bootstrap/js',
                'segments': 'informationObjects/segments',
                'documents': 'informationObjects/documents',
                'common': 'informationObjects/segments/common',
                'iama': 'informationObjects/segments/iama',
                'babh': 'informationObjects/segments/babh',
                'regix': 'informationObjects/segments/regix',
                'vtarnovo': 'informationObjects/segments/vtarnovo'
            }
        }
    );

    function define3rdPartyModules() {
        // These are already loaded via bundles. 
        // We define them and put them in the root object.
        define('jquery', [], function () { return root.jQuery; });
        define('bootstrap', [], function () { return root.bootstrap; });
        define('ko', [], function () { return root.ko; });
        define('modernizr', [], function () { return root.Modernizr; });
        define('breeze', [], function () { return root.breeze; });
    }

    function loadPluginsAndBoot() {
        // Plugins must be loaded after jQuery and Knockout, 
        // since they depend on them.
        requirejs([
                'ko.bindingHandlers',
                //'libs/ko.debug.helpers',
                'validation/ko.validation.custom',
                'libs/knockout.validation.debug'
        ]);
    }

    require(['jquery', 'ko', 'durandal/app', 'durandal/system', 'durandal/viewLocator', 'informationObjects/ViewModel', 'GlobalParameters'], function ($, ko, app, system, viewLocator, vm, gp) {
        $(document).ready(function () {         
            require(['ko.bindingHandlers', 'libs/knockout.validation.debug'], function (kb) {

                ko.validation.configure({
                    //registerExtenders: true,
                    //messagesOnModified: true,
                    //messageTemplate: null,
                    insertMessages: false,           // automatically inserts validation messages as <span></span>
                   
                    parseInputAttributes: true,    // parses the HTML5 validation attribute from a form element and adds that to the object
                    writeInputAttributes: true,    // adds HTML5 input validation attributes to form elements that ko observable's are bound to
                    
                    decorateElement: true,         // false to keep backward compatibility
                    //errorClass: null,               // single class for error message and element
                    errorElementClass: 'koError',  // class to decorate error element
                    errorMessageClass: 'text-error',  // class to decorate error message

                    grouping: {
                        deep: true,        //by default grouping is shallow
                        observable: true    //and using observables
                    }
                });

                ko.validation.registerExtenders();

                var v = new vm(); 
                ko.applyBindings(v);
                v.loadDocument();

                var viewmodels = 'informationObjects',
                    views = 'templates';

                app.title = "";
                app.start().then(function () {
                    viewLocator.useConvention(viewmodels, views);
                    app.setRoot(v, 'entrance');

                    gp.checkForFlash();
                });

            });
        });
    });

})();