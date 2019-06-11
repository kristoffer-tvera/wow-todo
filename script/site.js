;;;var classes = [];
classes[0] = { name: 'Warrior', color: '#C79C6E' };
classes[1] = { name: 'Paladin', color: '#F58CBA' };
classes[2] = { name: 'Hunter', color: '#ABD473' };
classes[3] = { name: 'Rogue', color: '#FFF569' };
classes[4] = { name: 'Priest', color: '#FFFFFF' };
classes[5] = { name: 'Death Knight', color: '#C41F3B' };
classes[6] = { name: 'Shaman', color: '#0070DE' };
classes[7] = { name: 'Mage', color: '#40C7EB' };
classes[8] = { name: 'Warlock', color: '#8787ED' };
classes[9] = { name: 'Monk', color: '#00FF96' };
classes[10] = { name: 'Druid', color: '#FF7D0A' };
classes[11] = { name: 'Demon Hunter', color: '#A330C9' };

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

var charData = [dummy1, dummy2];

function AddCharacter() {
    var form = document.getElementById('addcharform');
    var formData = new FormData(form);

    var charName = formData.get('name');
    var charClass = formData.get('class');

    charData.push({
        id: charData.length,
        name: charName,
        class: classes[charClass]
    });

    form.reset();
}

var app = new Vue({
    el: '#app',
    data: {
        characters: charData
    }
})