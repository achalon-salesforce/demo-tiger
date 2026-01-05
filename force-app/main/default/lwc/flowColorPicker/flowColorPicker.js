import { LightningElement, api } from 'lwc';

export default class FlowColorPicker extends LightningElement {
    @api label;
    @api required;
    @api defaultValue;
    @api value;
    @api readOnly = false;

    connectedCallback() {
        if (this.defaultValue && !this.value) {
            this.value = this.defaultValue;
        }
    }

    handleColorChange(event) {
        this.value = event.target.value;
        this.dispatchEvent(new CustomEvent('valuechange', {
            detail: { value: this.value }
        }));
    }

    @api
    validate() {
        if (this.required && !this.value) {
            return {
                isValid: false,
                errorMessage: 'Please select a color'
            };
        }
        return { isValid: true };
    }
}