({
    getConfig : function(component) {
        console.log('xdoOverrideSiteDemo: Fetching active configuration');
        var action = component.get("c.getActiveConfig");
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('xdoOverrideSiteDemo: Configuration response state:', state);
            
            if (state === "SUCCESS") {
                var config = response.getReturnValue();
                console.log('xdoOverrideSiteDemo: Configuration loaded:', {
                    name: config.Name,
                    accentColor1: config.xDO_Accent_Color_1_HEX_Code__c,
                    accentColor2: config.xDO_Accent_Color_2_HEX_Code__c,
                    accentColor3: config.xDO_Accent_Color_3_HEX_Code__c,
                    accentColor4: config.xDO_Accent_Color_4_HEX_Code__c,
                    primaryColor: config.xDO_Primary_Color_HEX_Code__c,
                    secondaryColor: config.xDO_Secondary_Color_HEX_Code__c,
                    brandImage: config.xDO_Brand_Image_URL__c,
                    groupImage: config.xDO_Group_Image_URL__c,
                    logo: config.xDO_Logo_URL__c,
                    userImage: config.xDO_User_Image_URL__c,
                });
                
                component.set("v.config", config);
                if (config && config.Name) {
                    console.log('xdoOverrideSiteDemo: Setting university name to:', config.Name);
                    component.set("v.companyName", config.Name);
                } else {
                    console.log('xdoOverrideSiteDemo: No university name found in configuration');
                }
            } else {
                console.error('xdoOverrideSiteDemo: Error loading configuration:', response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})