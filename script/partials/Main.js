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

var addcharform = document.querySelector('#addcharform');
if (addcharform) {
    addcharform.addEventListener('submit', function (e) {
        e.preventDefault();

        var form = e.target;
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
        $('#addchar').modal('hide');
    })
}

function RemoveCharacter(index) {
    for (var i = 0; i < data.status.length; i++) {
        data.status[i].splice(index, 1);
    }

    data.characters.splice(index, 1);
}

var addtask = document.querySelector('#addtaskform');
if (addtask) {
    addtask.addEventListener('submit', function (e) {
        e.preventDefault();

        var form = e.target;
        var formData = new FormData(form);

        var taskName = formData.get('taskname');

        var defaultValues = [];
        for (var i = 0; i < data.characters.length; i++) {
            defaultValues.push(false);
        }

        data.status.push(defaultValues);
        data.tasks.push(taskName);

        form.reset();
        $('#addtask').modal('hide');
    });
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

var importdataform = document.querySelector('#importdataform');
if (importdataform) {
    importdataform.addEventListener('submit', function (e) {
        e.preventDefault();

        var form = e.target;
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
            $('#importdata').modal('hide');
            alert('Successfully imported data');
        } catch (error) {
            alert('Failed during import, data looks invalid');
        }
    });
}

$('#exportdata').on('shown.bs.modal', function () {
    var textarea = document.getElementById('exportdatatextarea');
    if (textarea) {
        textarea.value = JSON.stringify(data);
    }
})

var updateTimeout;
function UpdateLocalStorage() {
    if (LocalStorageAvailable()) {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(function () {
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

var characterModal = new Vue({
    el: '#addchar',
    data: {
        availableClassIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    methods: {
        getClassFromId: function (id) {
            return GetClassFromId(id);
        }
    }
})