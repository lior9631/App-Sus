
function store(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function load(key, defaultValue = null) {
    var value = localStorage[key];
    if (!value) return defaultValue
    else return JSON.parse(value);
}

export default {
    store,
    load
}