public with sharing class XDO_GenericJSONParser {
    public class JSONParseRequest {
        @InvocableVariable(required=true label='JSON String' description='JSON String to be parsed.')
        public String jsonString;
        
        @InvocableVariable(required=true label='Output Object Type' description='API Name of the SObject to be created.')
        public String objectType;
    }

    @InvocableMethod(label='Parse JSON Data to SObject' description='Parse JSON Data for any SObject')
        public static List<SObject> parseJSONData(List<JSONParseRequest> requests) {
        List<SObject> sObjects = new List<SObject>();
        
        for (JSONParseRequest request : requests) {
        String sObjectJSONString = request.jsonString;
        String objectType = request.objectType;
        Type sObjectType = Type.forName('Schema.' + objectType);
        SObject mySObject = (SObject)JSON.deserializeStrict(sObjectJSONString, sObjectType);
        sObjects.add(mySObject);
    }
    
    return sObjects;
    }
}