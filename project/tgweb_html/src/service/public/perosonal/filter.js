const Mobile = navigator.userAgent.toLowerCase();
let position;

if (/iphone|ipad|ipod/.test(Mobile)) {
    position = 'fixed';
} else if (/android/.test(Mobile)) {
    position = 'absolute';
}


export default position