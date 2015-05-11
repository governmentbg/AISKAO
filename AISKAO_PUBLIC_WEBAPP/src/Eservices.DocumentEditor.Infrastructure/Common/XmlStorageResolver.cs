using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Xml;

namespace TechnoLogica.Eservices.DocumentEditor.Infrastructure.Common
{
    /// <summary>
    /// Клас за извличане на XSD схеми
    /// </summary>
    public class EservicesXmlResolver : XmlUrlResolver
    {
        /// <summary>
        /// Поддържащо поле за CachedXSDs
        /// </summary>
        private static Dictionary<string, string> _cachedXSDs;

        /// <summary>
        /// Dicionary кеширащо съдържанието на вече извлечени XSD-та
        /// </summary>
        private static Dictionary<string, string> CachedXSDs
        {
            get
            {
                if (_cachedXSDs == null)
                {
                    _cachedXSDs = new Dictionary<string, string>();
                }
                return _cachedXSDs;
            }
        }

        /// <summary>
        /// Методи за почистване на кеша.
        /// </summary>
        public static void ClearCach()
        {
            lock (CachedXSDs)
            {
                _cachedXSDs = null;
            }
        }

        /// <summary>
        /// Извлича реферирания XML (може да е схема или трансформация)
        /// </summary>
        /// <param name="absoluteUri">URI</param>
        /// <param name="role">Роля</param>
        /// <param name="ofObjectToReturn">Тип на връщания обект</param>
        /// <returns>Извлеченият XML</returns>
        public override object GetEntity(Uri absoluteUri, string role, Type ofObjectToReturn)
        {
            string fileName = Path.GetFileName(absoluteUri.AbsoluteUri);
            lock (CachedXSDs)
            {
                if (!CachedXSDs.ContainsKey(fileName))
                {
                    // Извлича XSD-то по име използвайки посочената в настройките папка 
                    // съдържаща необходимите XSD-та
                    string xsd =
                        new StreamReader(
                            //absoluteUri.AbsolutePath,
                            HostingEnvironment.MapPath(Path.Combine(
                                "~\\bin\\Schemas",
                                fileName)),
                            true
                            ).ReadToEnd();
                    CachedXSDs.Add(fileName, xsd);
                }
                return new StringReader(CachedXSDs[fileName]);
            }
        }        
    }
}