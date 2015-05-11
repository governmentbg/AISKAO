using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Xml.Serialization;
using System.Xml;
using System.ComponentModel;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace TechnoLogica.Eservices.InformationObjects
{
    #region Base entity class
    public partial class InformationObject<T> : System.ComponentModel.INotifyPropertyChanged//, IDataErrorInfo
    {
        private static System.Xml.Serialization.XmlSerializer serializer;

        private static System.Xml.Serialization.XmlSerializer Serializer
        {
            get
            {
                if ((serializer == null))
                {
                    serializer = new System.Xml.Serialization.XmlSerializer(typeof(T));
                }
                return serializer;
            }
        }

        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;

        public virtual void OnPropertyChanged(string info)
        {
            System.ComponentModel.PropertyChangedEventHandler handler = this.PropertyChanged;
            if ((handler != null))
            {
                handler(this, new System.ComponentModel.PropertyChangedEventArgs(info));
            }
        }

        #region Serialize/Deserialize
        /// <summary>
        /// Serializes current InformationObject object into an XML document
        /// </summary>
        /// <returns>string XML value</returns>
        public virtual string Serialize()
        {
            System.IO.StreamReader streamReader = null;
            System.IO.MemoryStream memoryStream = null;
            try
            {
                Type t = this.GetType();
                memoryStream = new System.IO.MemoryStream();

                XmlSerializer xs = new XmlSerializer(t);
                XmlTextWriter ctw = new XmlTextWriter(memoryStream, Encoding.UTF8);
                ctw.Formatting = Formatting.Indented;
                xs.Serialize(ctw, this);


                memoryStream.Seek(0, System.IO.SeekOrigin.Begin);
                streamReader = new System.IO.StreamReader(memoryStream);
                return streamReader.ReadToEnd();
            }
            finally
            {
                if ((streamReader != null))
                {
                    streamReader.Dispose();
                }
                if ((memoryStream != null))
                {
                    memoryStream.Dispose();
                }
            }
        }

        /// <summary>
        /// Deserializes workflow markup into an InformationObject object
        /// </summary>
        /// <param name="xml">string workflow markup to deserialize</param>
        /// <param name="obj">Output InformationObject object</param>
        /// <param name="exception">output Exception value if deserialize failed</param>
        /// <returns>true if this XmlSerializer can deserialize the object; otherwise, false</returns>
        public static bool Deserialize(string xml, out T obj, out System.Exception exception)
        {
            exception = null;
            obj = default(T);
            try
            {
                obj = Deserialize(xml);
                return true;
            }
            catch (System.Exception ex)
            {
                exception = ex;
                return false;
            }
        }

        public static bool Deserialize(string xml, out T obj)
        {
            System.Exception exception = null;
            return Deserialize(xml, out obj, out exception);
        }

        public static T Deserialize(string xml)
        {
            System.IO.StringReader stringReader = null;
            try
            {
                stringReader = new System.IO.StringReader(xml);
                return ((T)(Serializer.Deserialize(System.Xml.XmlReader.Create(stringReader))));
            }
            finally
            {
                if ((stringReader != null))
                {
                    stringReader.Dispose();
                }
            }
        }

        /// <summary>
        /// Serializes current InformationObject object into file
        /// </summary>
        /// <param name="fileName">full path of outupt xml file</param>
        /// <param name="exception">output Exception value if failed</param>
        /// <returns>true if can serialize and save into file; otherwise, false</returns>
        public virtual bool SaveToFile(string fileName, out System.Exception exception)
        {
            exception = null;
            try
            {
                SaveToFile(fileName);
                return true;
            }
            catch (System.Exception e)
            {
                exception = e;
                return false;
            }
        }

        public virtual void SaveToFile(string fileName)
        {
            System.IO.StreamWriter streamWriter = null;
            try
            {
                string xmlString = Serialize();
                System.IO.FileInfo xmlFile = new System.IO.FileInfo(fileName);
                streamWriter = xmlFile.CreateText();
                streamWriter.WriteLine(xmlString);
                streamWriter.Close();
            }
            finally
            {
                if ((streamWriter != null))
                {
                    streamWriter.Dispose();
                }
            }
        }

        /// <summary>
        /// Deserializes xml markup from file into an InformationObject object
        /// </summary>
        /// <param name="fileName">string xml file to load and deserialize</param>
        /// <param name="obj">Output InformationObject object</param>
        /// <param name="exception">output Exception value if deserialize failed</param>
        /// <returns>true if this XmlSerializer can deserialize the object; otherwise, false</returns>
        public static bool LoadFromFile(string fileName, out T obj, out System.Exception exception)
        {
            exception = null;
            obj = default(T);
            try
            {
                obj = LoadFromFile(fileName);
                return true;
            }
            catch (System.Exception ex)
            {
                exception = ex;
                return false;
            }
        }

        public static bool LoadFromFile(string fileName, out T obj)
        {
            System.Exception exception = null;
            return LoadFromFile(fileName, out obj, out exception);
        }

        public static T LoadFromFile(string fileName)
        {
            System.IO.FileStream file = null;
            System.IO.StreamReader sr = null;
            try
            {
                file = new System.IO.FileStream(fileName, FileMode.Open, FileAccess.Read);
                sr = new System.IO.StreamReader(file);
                string xmlString = sr.ReadToEnd();
                sr.Close();
                file.Close();
                return Deserialize(xmlString);
            }
            finally
            {
                if ((file != null))
                {
                    file.Dispose();
                }
                if ((sr != null))
                {
                    sr.Dispose();
                }
            }
        }
        #endregion

        #region Clone method
        /// <summary>
        /// Create a clone of this T object
        /// </summary>
        public virtual T Clone()
        {
            return ((T)(this.MemberwiseClone()));
        }
        #endregion
        
        //#region IDataErrorInfo Members

        //private bool _isInitial = true;
        //private List<string> _initialColumns = new List<string>();

        //public string Error
        //{
        //    get
        //    {
        //        if (_isInitial) 
        //        {
        //            _isInitial = false;
        //            return null;
        //        }
        //        StringBuilder error = new StringBuilder();
        //        ValidationResults results = Validation.Validate(this);
        //        foreach (Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult result in results)
        //        {
        //            error.AppendLine(result.Message);
        //        }
        //        return error.ToString();
        //    }
        //}
        //public string this[string columnName]
        //{
        //    get
        //    {
        //        if (!_initialColumns.Contains(columnName))
        //        {
        //            _initialColumns.Add(columnName);
        //            return null;
        //        }
        //        ValidationResults results = Validation.Validate(this);
        //        foreach (Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult result in results)
        //        {
        //            if (result.Key == columnName)
        //            {
        //                return result.Message;
        //            }
        //        }
        //        return string.Empty;
        //    }
        //}
        //#endregion
    }
    #endregion
}
