console.log('main');
// this will be our registry of components, normally this would be attached to a global namespace, not attached to window
window.components = {};

function Component (type, id, targetEl) {
    this.type = type;
    this.id = id;
    this.draw = function() {
        const template = processTemplate(this.template, this.id);
        targetEl.innerHTML = template;
    }
}
// process the template to attach any functions calls to the proper component
function processTemplate(template, id) {
    return template.replace(/\$component->/g, 'components.' + id + '.').replace(/{{id}}/g, id);
}
window.load = function(componentType, targetEl) {
    import(`./js/component-${componentType}.js`)
        .then(module => {
            let id = 'c_' + Math.random()
            id = id.replace('.', '');
            const component = new Component(componentType, id, targetEl);
            Object.keys(module).forEach(k => {
                component[k] = module[k];
            });
            components[id] = component;
            component.draw();
        })
        .catch(err => {
            console.log(err.message);
        });
}
const componentFrame = document.getElementById('component-frame');

for (const link of document.querySelectorAll("nav > a")) {
    link.addEventListener('click', e => {
        e.preventDefault();
        const componentId = e.target.dataset.component;
        load(componentId, componentFrame);
    });
}
