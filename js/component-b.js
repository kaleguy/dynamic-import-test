function propertyPanel(componentId) {
   load('propPanel', document.getElementById('component-frame-prop'));
}

// $component-> and {{id}} are preset variables. Could use lodash templating to add more.
const template = `
    <h1>Hello From Component 2</h1>
    <a onclick="$component->customAlert()">Click me for alert</a>
    <a style="cursor:pointer" onclick="$component->propertyPanel('{{id}}')">Properties</a>
    <div 
    style="display:none" 
    class="alert" 
    id="alert_{{id}}">This is a custom alert.</div>
`;

function customAlert() {
    document.getElementById('alert_' + this.id).style.display = 'block';
}

// exported functions will get attached to the component instance
export { template, customAlert, propertyPanel }
