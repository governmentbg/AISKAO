using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;

namespace TechnoLogica.Eservices.InformationObjects.DataAnnotation
{
    public class LocalizedDisplayNameAttribute : DisplayNameAttribute
    {
        public LocalizedDisplayNameAttribute() 
        {
        }

        public Type DisplayNameResourceType { get; set; }
        public string DisplayNameResourceName { get; set; }

        public override string DisplayName
        {
            get
            {
                try
                {
                    if (DisplayNameResourceType != null && !string.IsNullOrEmpty(DisplayNameResourceName))
                    {
                        return DisplayNameResourceType.GetProperty(DisplayNameResourceName).GetValue(DisplayNameResourceType, null).ToString();
                    }
                    return base.DisplayName;
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }
    }
}
