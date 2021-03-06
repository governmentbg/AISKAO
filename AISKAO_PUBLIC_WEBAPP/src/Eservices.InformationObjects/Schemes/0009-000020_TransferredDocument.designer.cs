// ------------------------------------------------------------------------------
//  <auto-generated>
//    Generated by Xsd2Code. Version 3.3.0.31926
//    <NameSpace>TechnoLogica.Eservices.InformationObjects</NameSpace><Collection>Array</Collection><codeType>CSharp</codeType><EnableDataBinding>True</EnableDataBinding><EnableLazyLoading>False</EnableLazyLoading><TrackingChangesEnable>False</TrackingChangesEnable><GenTrackingClasses>False</GenTrackingClasses><HidePrivateFieldInIDE>False</HidePrivateFieldInIDE><EnableSummaryComment>True</EnableSummaryComment><VirtualProp>False</VirtualProp><IncludeSerializeMethod>True</IncludeSerializeMethod><UseBaseClass>True</UseBaseClass><GenBaseClass>False</GenBaseClass><GenerateCloneMethod>True</GenerateCloneMethod><GenerateDataContracts>False</GenerateDataContracts><CodeBaseTag>Net40</CodeBaseTag><SerializeMethodName>Serialize</SerializeMethodName><DeserializeMethodName>Deserialize</DeserializeMethodName><SaveToFileMethodName>SaveToFile</SaveToFileMethodName><LoadFromFileMethodName>LoadFromFile</LoadFromFileMethodName><GenerateXMLAttributes>True</GenerateXMLAttributes><AutomaticProperties>False</AutomaticProperties><GenerateShouldSerialize>False</GenerateShouldSerialize><DisableDebug>False</DisableDebug><PropNameSpecified>Default</PropNameSpecified><CustomUsings></CustomUsings><ExcludeIncludedTypes>True</ExcludeIncludedTypes><EnableInitializeFields>True</EnableInitializeFields>
//  </auto-generated>
// ------------------------------------------------------------------------------
namespace TechnoLogica.Eservices.InformationObjects {
    using System;
    using System.Diagnostics;
    using System.Xml.Serialization;
    using System.Collections;
    using System.Xml.Schema;
    using System.ComponentModel;
    using System.IO;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Xsd2Code", "3.3.0.31927")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://ereg.egov.bg/segment/0009-000020")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace="http://ereg.egov.bg/segment/0009-000020", IsNullable=true)]
    public partial class TransferredDocument : InformationObject<TransferredDocument> {
        
        private DocumentURI documentURIField;
        
        private string shortTransferDescriptionField;
        
        private string expandedTransferDescriptionField;
        
        private string fileTypeField;
        
        private byte[] fileContentField;
        
        public DocumentURI DocumentURI {
            get {
                return this.documentURIField;
            }
            set {
                if ((this.documentURIField != null)) {
                    if ((documentURIField.Equals(value) != true)) {
                        this.documentURIField = value;
                        this.OnPropertyChanged("DocumentURI");
                    }
                }
                else {
                    this.documentURIField = value;
                    this.OnPropertyChanged("DocumentURI");
                }
            }
        }
        
        public string ShortTransferDescription {
            get {
                return this.shortTransferDescriptionField;
            }
            set {
                if ((this.shortTransferDescriptionField != null)) {
                    if ((shortTransferDescriptionField.Equals(value) != true)) {
                        this.shortTransferDescriptionField = value;
                        this.OnPropertyChanged("ShortTransferDescription");
                    }
                }
                else {
                    this.shortTransferDescriptionField = value;
                    this.OnPropertyChanged("ShortTransferDescription");
                }
            }
        }
        
        public string ExpandedTransferDescription {
            get {
                return this.expandedTransferDescriptionField;
            }
            set {
                if ((this.expandedTransferDescriptionField != null)) {
                    if ((expandedTransferDescriptionField.Equals(value) != true)) {
                        this.expandedTransferDescriptionField = value;
                        this.OnPropertyChanged("ExpandedTransferDescription");
                    }
                }
                else {
                    this.expandedTransferDescriptionField = value;
                    this.OnPropertyChanged("ExpandedTransferDescription");
                }
            }
        }
        
        public string FileType {
            get {
                return this.fileTypeField;
            }
            set {
                if ((this.fileTypeField != null)) {
                    if ((fileTypeField.Equals(value) != true)) {
                        this.fileTypeField = value;
                        this.OnPropertyChanged("FileType");
                    }
                }
                else {
                    this.fileTypeField = value;
                    this.OnPropertyChanged("FileType");
                }
            }
        }
        
        [System.Xml.Serialization.XmlElementAttribute(DataType="base64Binary")]
        public byte[] FileContent {
            get {
                return this.fileContentField;
            }
            set {
                if ((this.fileContentField != null)) {
                    if ((fileContentField.Equals(value) != true)) {
                        this.fileContentField = value;
                        this.OnPropertyChanged("FileContent");
                    }
                }
                else {
                    this.fileContentField = value;
                    this.OnPropertyChanged("FileContent");
                }
            }
        }
    }
}
