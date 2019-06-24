var classes = [];
classes[0] = { name: 'Warrior', color: '#C79C6E', text: '#000000' };
classes[1] = { name: 'Paladin', color: '#F58CBA', text: '#000000' };
classes[2] = { name: 'Hunter', color: '#ABD473', text: '#000000' };
classes[3] = { name: 'Rogue', color: '#FFF569', text: '#000000' };
classes[4] = { name: 'Priest', color: '#FFFFFF', text: '#000000' };
classes[5] = { name: 'Death Knight', color: '#C41F3B', text: '#FFFFFF' };
classes[6] = { name: 'Shaman', color: '#0070DE', text: '#FFFFFF' };
classes[7] = { name: 'Mage', color: '#40C7EB', text: '#000000' };
classes[8] = { name: 'Warlock', color: '#8787ED', text: '#000000' };
classes[9] = { name: 'Monk', color: '#00FF96', text: '#000000' };
classes[10] = { name: 'Druid', color: '#FF7D0A', text: '#000000' };
classes[11] = { name: 'Demon Hunter', color: '#A330C9', text: '#FFFFFF' };

/*
Initialization (falls back to empty data-obj, if nothing is in localstorage)
*/
var data;
if (LocalStorageAvailable()) {
    var currentData = window.localStorage.getItem('data');
    if (currentData && currentData.length > 0) {
        data = JSON.parse(currentData);
    } else {
        data = {
            characters: [],
            tasks: [],
            status: []
        };
    }
} else {
    data = {
        characters: [],
        tasks: [],
        status: []
    };
    alert('No LocalStorage. Saving/persisting will not be possible (this means: When you close this window, all data dissapears');
}

function LocalStorageAvailable() {
    var pepe = 'meme';
    try {
        localStorage.setItem(pepe, pepe);
        localStorage.removeItem(pepe);
        return true;
    } catch (e) {
        return false;
    }
}

function GetClassFromId(id) {
    switch (id.toString()) {
        case '0': return { name: 'Warrior', color: '#C79C6E', text: '#000000' };
        case '1': return { name: 'Paladin', color: '#F58CBA', text: '#000000' };
        case '2': return { name: 'Hunter', color: '#ABD473', text: '#000000' };
        case '3': return { name: 'Rogue', color: '#FFF569', text: '#000000' };
        case '4': return { name: 'Priest', color: '#FFFFFF', text: '#000000' };
        case '5': return { name: 'Death Knight', color: '#C41F3B', text: '#FFFFFF' };
        case '6': return { name: 'Shaman', color: '#0070DE', text: '#FFFFFF' };
        case '7': return { name: 'Mage', color: '#40C7EB', text: '#000000' };
        case '8': return { name: 'Warlock', color: '#8787ED', text: '#000000' };
        case '9': return { name: 'Monk', color: '#00FF96', text: '#000000' };
        case '10': return { name: 'Druid', color: '#FF7D0A', text: '#000000' };
        case '11': return { name: 'Demon Hunter', color: '#A330C9', text: '#FFFFFF' };
    }
}

function AddCharacter() {
    var form = document.getElementById('addcharform');
    var formData = new FormData(form);

    var charName = formData.get('name');
    var charClass = formData.get('class');

    data.characters.push({
        id: data.characters.length,
        name: charName,
        class: charClass
    });

    for (var i = 0; i < data.status.length; i++) {
        data.status[i].push(false);
    }

    form.reset();
}

function RemoveCharacter(index) {
    for (var i = 0; i < data.status.length; i++) {
        data.status[i].splice(index, 1);
    }

    data.characters.splice(index, 1);
}

function AddTask() {
    var form = document.getElementById('addtaskform');
    var formData = new FormData(form);

    var taskName = formData.get('taskname');

    var defaultValues = [];
    for (var i = 0; i < data.characters.length; i++) {
        defaultValues.push(false);
    }

    data.status.push(defaultValues);
    data.tasks.push(taskName);

    form.reset();
}

function RemoveTask(index) {
    data.tasks.splice(index, 1);
    data.status.splice(index, 1);
}

function ResetCheckboxes() {
    var status = [];
    for (var i = 0; i < data.tasks.length; i++) {
        status[i] = [];
        for (var j = 0; j < data.characters.length; j++) {
            status[i][j] = false;
        }
    }
    data.status = status;
    app.status = status;
}

function Import() {
    var form = document.getElementById('dataform');
    var textarea = form.querySelector('textarea');
    var json = textarea.value;
    if (json === '' || json.trim() === '') {
        alert('no data');
        return;
    }

    try {
        data = JSON.parse(json);
        app.characters = data.characters;
        app.tasks = data.tasks;
        app.status = data.status;

        alert('Successfully imported data');
    } catch (error) {
        alert('Failed during import, data looks invalid');
    }
}

function Export() {
    var form = document.getElementById('dataform');
    var textarea = form.querySelector('textarea');
    textarea.value = JSON.stringify(data);
}

var updateTimeout;
function UpdateLocalStorage() {
    if (LocalStorageAvailable()) {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(function () {
            console.log('dumping to localstorage');
            window.localStorage.setItem('data', JSON.stringify(data));
        }, 100);
    }
}

var app = new Vue({
    el: '#app',
    data: {
        characters: data.characters,
        tasks: data.tasks,
        status: data.status
    },
    methods: {
        removeCharacter: function (index) {
            RemoveCharacter(index);
        },
        removeTask: function (index) {
            RemoveTask(index);
        },
        classColors: function (classId) {
            var wowClass = GetClassFromId(classId);
            return 'color: ' + wowClass.text + '; background-color: ' + wowClass.color + ';';
        }
    },
    watch: {
        characters: function () {
            UpdateLocalStorage();
        },
        tasks: function () {
            UpdateLocalStorage();
        },
        status: function () {
            UpdateLocalStorage();
        }
    }
})