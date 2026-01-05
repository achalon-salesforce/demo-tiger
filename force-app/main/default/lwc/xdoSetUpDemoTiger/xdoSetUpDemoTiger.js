import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class XdoSetUpDemoTiger extends NavigationMixin(LightningElement) {
    currentStep = 'step1';
    @track completedSteps = new Set();
    expandedSections = ['step1', 'step2', 'step3', 'step4'];

    handleComplete(event) {
        const step = event.currentTarget.dataset.step;
        this.completedSteps.add(step);
        
        // Update button to show completion
        const button = event.currentTarget;
        button.label = 'Completed';
        button.iconName = 'utility:check';
        button.disabled = true;
        button.variant = 'success';
        
        // Update current step
        const steps = ['step1', 'step2', 'step3', 'step4'];
        const currentIndex = steps.indexOf(step);
        if (currentIndex < steps.length - 1) {
            this.currentStep = steps[currentIndex + 1];
        }
    }

    navigateToThemes() {
        const baseUrl = window.location.origin;
        window.open(`${baseUrl}/lightning/setup/ThemingAndBranding/home`, '_blank');
    }

    navigateToDigitalExperiences() {
        const baseUrl = window.location.origin;
        window.open(`${baseUrl}/lightning/setup/SetupNetworks/home`, '_blank');
    }

    navigateToDemoTigerKickstarter() {
        const baseUrl = window.location.origin;
        window.open(`${baseUrl}/lightning/page/home`, '_blank');
    }

    navigateToPublicAccessSettings() {
        const baseUrl = window.location.origin;
        window.open(`${baseUrl}/lightning/setup/CustomDomain/home`, '_blank');
    }
}