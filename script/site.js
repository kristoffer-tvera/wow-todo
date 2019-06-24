;;;var classes = [];
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

var dummy1 = {
    id: 0,
    name: 'Test1',
    class: classes[2]
};

var dummy2 = {
    id: 1,
    name: 'Test2',
    class: classes[7]
};

var data = {
    characters: [],
    tasks: [],
    status: []
};

data.characters = [dummy1, dummy2];
data.tasks = ['Oondasta', 'Sha'];
data.status = [];

for (var i = 0; i < data.tasks.length; i++) {
    data.status[i] = [];
    for (var j = 0; j < data.characters.length; j++) {
        data.status[i][j] = false;
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
        class: classes[charClass]
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
        classColors: function (playerclass) {
            return 'color: ' + playerclass.text + '; background-color: ' + playerclass.color + ';';
        }
    }
})