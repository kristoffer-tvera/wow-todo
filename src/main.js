import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

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

console.log(GetClassFromId('0'));