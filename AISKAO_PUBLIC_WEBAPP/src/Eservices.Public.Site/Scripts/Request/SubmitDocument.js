$(document).ready(function () {
    GetSignatureInfoUrl = 'Request/GetSignatureInfo';

    $("#submitValidDocument, #submitInvalidDocument").click(function(){
        $("#submitForm").attr('action', SubmitFormUrl);
        $("#submitForm").submit();
    });

    generateXmlForSigning = function (data) {
        createSignElement(data);
        generateXML(data);
        $("#submitForm").submit();
    }


});