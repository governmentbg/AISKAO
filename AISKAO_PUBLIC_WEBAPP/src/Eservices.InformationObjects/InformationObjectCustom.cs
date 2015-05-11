using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Xml;
using System.IO;
using System.Xml.Schema;
using System.Xml.Serialization;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace TechnoLogica.Eservices.InformationObjects
{
    [Serializable]
    public partial class InformationObject<T> : IInformationObject
            where T : class
    {
        public static bool ValidateOnPropertyChange { get; set; }

        static InformationObject()
        {
            ValidateOnPropertyChange = false;
        }

        private bool _hasCustomValidationError = false;

        public InformationObject()
        {
            HasCustomValidationError = false;
            CustomErrors = new List<ValidationResult>();
        }

        [XmlIgnore]
        public List<ValidationResult> CustomErrors
        {
            get;
            set;
        }

        [XmlIgnore]
        public bool HasCustomValidationError
        {
            get
            {
                return _hasCustomValidationError;
            }
            set
            {
                if (value != _hasCustomValidationError)
                {
                    _hasCustomValidationError = value;
                    NotifyHasCustomErrors();
                }
            }
        }

        protected void NotifyHasCustomErrors()
        {
            System.ComponentModel.PropertyChangedEventHandler handler = this.PropertyChanged;
            if ((handler != null))
            {
                handler(this, new System.ComponentModel.PropertyChangedEventArgs("HasCustomValidationError"));
                handler(this, new System.ComponentModel.PropertyChangedEventArgs("CustomErrors"));
            }
        }

        public string Validate()
        {
            string result = String.Empty;
            try
            {
                Assembly currentAssembly = Assembly.GetAssembly(this.GetType());
                string[] resourceNames = currentAssembly.GetManifestResourceNames();

                XmlReaderSettings settings = new XmlReaderSettings();
                foreach (var name in resourceNames)
                {
                    if (name.EndsWith("xsd"))
                    {
                        XmlSchema xsd = XmlSchema.Read(currentAssembly.GetManifestResourceStream(name), ValidationSchemaSyntaxCallback);
                        settings.Schemas.Add(xsd);
                    }
                }
                settings.ValidationEventHandler += new ValidationEventHandler(ValidationCallback);
                settings.ValidationType = ValidationType.Schema;
                result = this.Serialize();
                StringReader reader = new StringReader(result);
                XmlDocument doc = new XmlDocument();
                doc.Load(XmlReader.Create(reader, settings));

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return result;
        }

        private void ValidationCallback(object sender, ValidationEventArgs e)
        {

        }

        private void ValidationSchemaSyntaxCallback(object sender, ValidationEventArgs e)
        {

        }
        
        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion

        /// <summary>
        /// Извлича Namespace-а на подадения тип 
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private static string GetNamespace(Type type)
        {
            return (type.GetCustomAttributes(typeof(XmlTypeAttribute), false)[0] as XmlTypeAttribute).Namespace;
        }

        public static T ExtractFirst(XmlDocument xmlDocument, string xpath = "*")
        {
            T result = null;

            XmlNamespaceManager xmlNamespaceManager = new XmlNamespaceManager(new NameTable());
            xmlNamespaceManager.AddNamespace("", xmlDocument.DocumentElement.NamespaceURI);
            string typeNamespace = GetNamespace(typeof(T));
            xmlNamespaceManager.AddNamespace("io", typeNamespace);

            XmlNode node = xmlDocument.DocumentElement.SelectSingleNode(
                xpath,
                xmlNamespaceManager);
            if (node != null && node.ParentNode != null)
            {
                node = node.ParentNode;
                XmlDocument xml = new XmlDocument();
                xml.AppendChild
                (
                    xml.CreateElement
                    (
                        typeof(T).Name,
                        typeNamespace
                    )
                );
                xml.DocumentElement.InnerXml = node.InnerXml;

                MethodInfo method = typeof(T).GetMethod("Deserialize", BindingFlags.FlattenHierarchy | BindingFlags.Static | BindingFlags.Public);
                if (method == null)
                {
                    return null;
                }

                result = (T)method.Invoke(null, new object[] { xml.OuterXml });                
                //result = TerritorialUnitBasicData.Deserialize(xml.OuterXml);
            }
            return result;
        }

        public static IList<T> ExtractAll(XmlDocument xmlDocument, string xpath = "*")
        {
            IList<T> result = new List<T>();

            XmlNamespaceManager xmlNamespaceManager = new XmlNamespaceManager(new NameTable());
            xmlNamespaceManager.AddNamespace("", xmlDocument.DocumentElement.NamespaceURI);
            string typeNamespace = GetNamespace(typeof(T));
            xmlNamespaceManager.AddNamespace("io", typeNamespace);

            MethodInfo method = typeof(T).GetMethod("Deserialize", BindingFlags.FlattenHierarchy | BindingFlags.Static | BindingFlags.Public);
            if (method == null)
            {
                return result;
            }

            XmlNodeList nodes = xmlDocument.DocumentElement.SelectNodes(xpath, xmlNamespaceManager);

            foreach (XmlNode node in nodes)
            {
                XmlNode temp = null;
                if (node != null && node.ParentNode != null)
                {
                    temp = node.ParentNode;
                    XmlDocument xml = new XmlDocument();
                    xml.AppendChild (
                        xml.CreateElement (
                            typeof(T).Name,
                            typeNamespace)
                    );
                    xml.DocumentElement.InnerXml = temp.InnerXml;

                    result.Add((T)method.Invoke(null, new object[] { xml.OuterXml }));
                }
            }
            return result;
        }

        public virtual string ToHtml()
        {
            return ToString();
        }
        
    }
}
