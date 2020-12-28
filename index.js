const https = require('https');
const ua = require('random-useragent');
const client_name = Math.random().toString(2).substr(2,13);
const PandoraBotsMitsukuLink = 'https://www.pandorabots.com/mitsuku/';
const PB_BOTKEY_SEARCH = /(?<=PB_BOTKEY: ")(.*)(?=")/;
const query = encodeURI('e');
var a = https.get(PandoraBotsMitsukuLink, {headers: {
    'User-Agent': ua.getRandom(),
    'Referer': 'https://pornhub.com/',
}}, r => {
    var d='';
    r.on('data', (c) => d+=c);
    r.on('end', () => {b(d.match(PB_BOTKEY_SEARCH));})
})
a.on('error', () => {
    console.log('Oh shit error.')
})
function b(BK) {
    if(BK) {
        if(!query.length) return console.log('Oops, query sucks.');
        var a = https.request('https://miapi.pandorabots.com/talk?botkey='+BK[0]+'&input='+encodeURI(query)+'&client_name='+client_name+'&sessionid=null&channel=6', {headers: {
            'User-Agent': ua.getRandom(),
            'Referer': PandoraBotsMitsukuLink,
        },method:'POST'}, r => {
            var d='';
            r.on('data', (c) => d+=c);
            r.on('end', () => {
                var r;
                try{
                    r=JSON.parse(d);
                }catch{
                    r={'responses': ["<i can't understand it, bro>"]};
                }finally{
                    console.log(r['responses'].join('\n'))
                }
            })
        })
        a.on('error', () => {
            console.log('Error')
        })
        a.end();
    } else return console.log('Oops, the bot key went to hell.');
}