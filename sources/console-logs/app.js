console.log('Some log message');
console.info('Some INFO message');
console.warn('Some WARN message');
console.error('Some ERROR message');
console.log('--------------------------------------');

const style = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;'
console.log("%cHooray", style);
console.log('\x1B[41;93;4mANSI escape sequences\x1B[m');
console.log('--------------------------------------');

const label = 'Adolescent Irradiated Espionage Tortoises';
console.group(label);
console.info('Leo');
console.info('Mike');
console.info('Don');
console.info('Raph');
console.groupEnd();
console.log('--------------------------------------');


const timeline1 = 'New York 2012';
const timeline2 = 'Camp Lehigh 1970';
console.group(timeline1);
console.info('Mind');
console.info('Time');
console.group(timeline2);
console.info('Space');
console.info('Extra Pym Particles');
console.groupEnd();
console.groupEnd();
console.log('--------------------------------------');

const people = [
    {
        first: 'René',
        last: 'Magritte',
    },
    {
        first: 'Chaim',
        last: 'Soutine',
        birthday: '18930113',
    },
    {
        first: 'Henri',
        last: 'Matisse',
    }
];
console.table(people);
console.log('--------------------------------------');

console.time();
for (let i = 0; i < 100000; i++) {
    let square = i ** 2;
}
console.timeEnd();
console.log('--------------------------------------');

console.dir(document.body);
