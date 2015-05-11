using System.Web;
using System.Web.Mvc;
using TechnoLogica.Eservices.Common.ExceptionManagement;

namespace TechnoLogica.Eservices.Public.Site
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            var logger = DependencyResolver.Current.GetService<ILogger>();
            filters.Add(new CustomHandleErrorAttribute(logger));
        }
    }
}