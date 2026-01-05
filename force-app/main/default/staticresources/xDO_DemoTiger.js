let COMPANY_NAME = "Default Name";
let TEXT_TO_REPLACE;
    
function replaceTextContent(node) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let replaced = 0;

    while (walker.nextNode()) {
        if (window.location.href.includes('commeditor')) {
            // Skip processing in commeditor
        } else {
            const textNode = walker.currentNode;
            if (textNode.nodeValue.includes(TEXT_TO_REPLACE)) {
                textNode.nodeValue = textNode.nodeValue.replace(new RegExp(TEXT_TO_REPLACE, 'g'), COMPANY_NAME);
                replaced++;
            }
        }
    }
}
    
function replaceAttributes(node) {
    const attributesToCheck = ['title', 'placeholder', 'alt', 'aria-label'];

    if (node.nodeType === 1) {
        attributesToCheck.forEach(attr => {
            if (node.hasAttribute(attr)) {
                const val = node.getAttribute(attr);
                if (val.includes(TEXT_TO_REPLACE)) {
                    node.setAttribute(attr, val.replace(new RegExp(TEXT_TO_REPLACE, 'g'), COMPANY_NAME));
                }
            }
        });
    }
}
    
function scanAndReplace(node) {
    replaceTextContent(node);
    if (node.nodeType === 1) {
        replaceAttributes(node);
        node.querySelectorAll("*").forEach(child => {
            replaceTextContent(child);
            replaceAttributes(child);
        });
    }
}
    
function setCSSVars(siteData) {
    const colorGroups = {
        primaryColor: [
            '--lwc-brandAccessible',
            '--lwc-brandAccessibleActive',
            '--lwc-brandHeader',
            '--lwc-brandPrimary',
            '--lwc-buttonColorBorderBrandPrimary',
            '--lwc-colorBackgroundBrandPrimary',
            '--lwc-colorBackgroundBrandPrimaryActive',
            '--lwc-colorBackgroundBrandPrimaryHover',
            '--lwc-colorBackgroundButtonBrand',
            '--lwc-colorBackgroundButtonBrandActive',
            '--lwc-colorBackgroundButtonBrandHover',
            '--lwc-colorBackgroundButtonDefaultHover',
            '--lwc-colorBackgroundDropDownBrandHover',
            '--lwc-colorBackgroundFeaturedBrandHover',
            '--lwc-colorBackgroundHover',
            '--lwc-colorBackgroundRowHover',
            '--lwc-colorBackgroundRowSelected',
            '--lwc-colorBackgroundShade',
            '--lwc-colorBorderBrand',
            '--lwc-colorBorderBrandHover',
            '--lwc-colorBorderButtonBrand',
            '--lwc-colorBorderSelection',
            '--lwc-colorBrand',
            '--lwc-colorBrandDarker',
            '--lwc-colorTextActionLabelActive',
            '--lwc-colorTextBrand',
            '--lwc-colorTextBrandHover',
            '--lwc-colorTextTabLabelSelected',
            '--lwc-dxpGBrand',
            '--lwc-dxpGBrand1',
            '--lwc-dxpGBrand2',
            '--lwc-dxpGBrand3',
            '--lwc-fillHeaderButtonHover',
            '--lwc-colorTextButtonBrandHover'
        ],
        'accentColor-1': [
            '--lwc-brandTextLink',
            '--lwc-brandTextLinkActive',
            '--lwc-colorTextIconDefaultActive',
            '--lwc-colorTextIconDefaultHover',
            '--lwc-colorTextLink',
            '--lwc-colorTextLinkActive',
            '--lwc-colorTextLinkHover'
        ],
        'accentColor-2': [
            '--lwc-buttonColorBorderPrimary',
            '--lwc-cardColorBorder',
            '--lwc-colorBorder',
            '--lwc-colorBorderButtonDefault',
            '--lwc-colorBorderInput',
            '--lwc-colorBorderSeparatorAlt',
            '--lwc-pageHeaderJoinedColorBorder'
        ],
        'accentColor-3': [
            '--lwc-colorBackgroundIconWaffle',
            '--lwc-dxpGBrandContrast',
            '--lwc-dxpGBrandContrast1',
            '--lwc-dxpGBrandContrast2',
            '--lwc-dxpGBrandContrast3',
            '--lwc-fillHeaderButton'
        ],
        secondaryColor: [
            '--lwc-colorBorderHint',
            '--lwc-colorTextActionLabel',
            '--lwc-colorTextHint',
            '--lwc-colorTextLabel',
            '--lwc-colorTextPlaceholder',
            '--lwc-colorTextWeak',
            '--lwc-tableColorTextHeader',
            '--lwc-colorTextBrandPrimary',
            '--lwc-colorTextButtonBrand',
            '--lwc-colorTextInverse'
        ],
        pageBackgroundColor: [
            '--lwc-colorPageBackground',
            '--lwc-dxpGNeutral',
            '--lwc-dxpGNeutral1',
            '--lwc-dxpGNeutral2',
            '--lwc-dxpGNeutral3',
            '--lwc-dxpGNeutralContrast',
            '--lwc-dxpGNeutralContrast1',
            '--lwc-dxpGNeutralContrast2',
            '--lwc-dxpGNeutralContrast3',
            '--lwc-dxpGRoot',
            '--lwc-dxpGRoot1',
            '--lwc-dxpGRoot2',
            '--lwc-dxpGRoot3'
        ],
        textColor: [
            '--lwc-colorGray13',
            '--lwc-colorTextDefault',
            '--lwc-colorTextPrimary',
            '--lwc-dxpGRootContrast',
            '--lwc-dxpGRootContrast1',
            '--lwc-dxpGRootContrast2',
            '--lwc-dxpGRootContrast3',
            '--lwc-gridTextColor',
            '--lwc-inputStaticColor'
        ]
    };
    
    Object.entries(colorGroups).forEach(([dataKey, tokens]) => {
        const colorValue = siteData.dataset[dataKey];
        if (colorValue) {
            tokens.forEach(token => {
                document.documentElement.style.setProperty(token, colorValue);
            });
        }
    });
    
    const logo = siteData.dataset.logo;
    if (logo && logo !== 'null') {
        document.documentElement.style.setProperty(
            '--lwc-brandLogoImage',
            `url(/sfsites/c${logo}&height=300)`
        );
    }
    const brandImage = siteData.dataset.brandImage;
    if (brandImage && brandImage !== 'null') {
        const bgImageElements = document.querySelectorAll('.bgImage');
        
        document.documentElement.style.setProperty(
            '--lwc-LoginBackgroundImage',
            `url(/sfsites/c${brandImage})`
        );
        
        bgImageElements.forEach(element => {
            try {
                element.style.setProperty('background', `url(/sfsites/c${brandImage}) top center /cover`);
            } catch (error) {
                // Error handling for background setting
            }
        });
    }
}
    
function updateCompanyNameFromSiteData(siteData) {
    if (!siteData) {
        return;
    }

    const rawValue = siteData.dataset?.configName;
    const rawCompanyValue = siteData.dataset?.companyName;
    const rawTextToReplace = siteData.dataset?.textToReplace;

    if (!rawValue) {
        return;
    }

    COMPANY_NAME = rawValue;
    if (rawTextToReplace) {
        TEXT_TO_REPLACE = rawTextToReplace;
    }
    
    setCSSVars(siteData);
    scanAndReplace(document.body);
}

function checkSiteData() {
    const siteData = document.getElementById("site-data");
    
    if (siteData) {
        if (siteData.dataset?.companyName) {
            updateCompanyNameFromSiteData(siteData);
        } else {
            const interval = setInterval(() => {
                const name = siteData.dataset?.companyName;
                if (name) {
                    clearInterval(interval);
                    updateCompanyNameFromSiteData(siteData);
                }
            }, 100);
        }
    }
}

if (document.readyState !== "loading") {
    scanAndReplace(document.body);
}

document.addEventListener("DOMContentLoaded", function () {
    checkSiteData();

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.id === "site-data") {
                    const interval = setInterval(() => {
                        const name = node.dataset?.companyName;
                        if (name) {
                            clearInterval(interval);
                            updateCompanyNameFromSiteData(node);
                        }
                    }, 100);
                }

                scanAndReplace(node);
            });
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    setInterval(() => {
        scanAndReplace(document.body);
    }, 3000);
});