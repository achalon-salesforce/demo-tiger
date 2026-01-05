public without sharing class XDO_OverrideSiteDemoController {
    @AuraEnabled(cacheable=true)
    public static xDO_Demo_Configuration__c getActiveConfig() {
        return [
            SELECT
                Name,
                xDO_Accent_Color_1_HEX_Code__c,
                xDO_Accent_Color_2_HEX_Code__c,
                xDO_Accent_Color_3_HEX_Code__c,
                xDO_Accent_Color_4_HEX_Code__c,
                xDO_Active__c,
                xDO_Brand_Image__c,
                xDO_Brand_Image_URL__c,
                xDO_Group_Image__c,
                xDO_Group_Image_URL__c,
                xDO_Logo__c,
                xDO_Logo_URL__c,
                xDO_Primary_Color_HEX_Code__c,
                xDO_Secondary_Color_HEX_Code__c,
                xDO_User_Image__c,
                xDO_User_Image_URL__c
            FROM xDO_Demo_Configuration__c
            WHERE xDO_Active__c = true AND xDO_Override_Experience_Cloud_Branding__c = true
            LIMIT 1
        ];
    }
}