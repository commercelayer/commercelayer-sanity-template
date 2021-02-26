require('./global-shim')
var h1=document.createElement('h1');
h1.setAttribute('n', 'v');
h1.style.setProperty('color','red');
h1.innerHTML = 'w0f w0f';
h1.classList.add('cls');
console.log(h1.outerHTML);
