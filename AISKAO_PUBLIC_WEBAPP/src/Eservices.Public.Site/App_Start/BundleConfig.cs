using System.Web;
using System.Web.Optimization;

namespace TechnoLogica.Eservices.Public.Site
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/scripts/libs/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                       "~/scripts/libs/knockout-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrapjs").Include(
                "~/Content/bootstrap/js/bootstrap.js",
                "~/Content/bootstrap/js/bootstrap-tooltip.js",
                "~/Content/bootstrap/js/bootstrap-datetimepicker.js",
                "~/Content/bootstrap/js/bootstrap-datetimepicker.bg.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/scripts/jquery.unobtrusive*",
                        "~/scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/bundles/bootstrapcss").Include(
                       //"~/Content/bootstrap/css/bootstrap.css"
                       ));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                        //"~/Content/Site.css"
                        "~/Content/Theme.css",
                        "~/Content/DocumentEditorStyles.css"
            ));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            //For DocumentEditor
            bundles.Add(new ScriptBundle("~/bundles/libs").Include(
                       "~/scripts/libs/jquery.xdomainrequest.js",
                       "~/scripts/libs/datajs-{version}.js",
                       "~/scripts/libs/q.js",
                       "~/scripts/libs/es5-shim.js",
                       "~/scripts/libs/breeze.js"
                       ));
        }
    }
}