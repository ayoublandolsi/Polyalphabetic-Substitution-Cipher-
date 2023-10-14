let cryp = {};
let decryp = {};

function genererNouvelleCle() {
    const letterFrequencies = {
        'a': 8.17, 'b': 1.49, 'c': 2.78, 'd': 4.25, 'e': 12.70, 'f': 2.23, 'g': 2.02, 'h': 6.09, 'i': 6.97,
        'j': 0.15, 'k': 0.77, 'l': 4.03, 'm': 2.41, 'n': 6.75, 'o': 7.51, 'p': 1.93, 'q': 0.10, 'r': 5.99,
        's': 6.33, 't': 9.06, 'u': 2.76, 'v': 0.98, 'w': 2.36, 'x': 0.15, 'y': 1.97, 'z': 0.07
    };
    const message = document.getElementById('message').value.toLowerCase();
    let messageLength;

    if (message.length > 25) {
        messageLength = 24;
    } else {
        messageLength = message.length;
    }
const sortedLetters = Object.keys(letterFrequencies).sort((a, b) => letterFrequencies[b] - letterFrequencies[a]);
const alph = sortedLetters.join('');
console.log(alph)
    const key = alph.slice(messageLength) + alph.slice(0, messageLength) ;
console.log(key);
    cryp = {};
    decryp = {};

    for (let i = 0; i < alph.length; i++) {
        cryp[alph[i]] = key[i];
        decryp[key[i]] = alph[i];
    }

}

function chiffrer() {
    genererNouvelleCle();
    const message = document.getElementById('message').value.toLowerCase();
    let resultat = '';
    let etapes = '';

    for (let haref of message) {
        if (cryp.hasOwnProperty(haref)) {
            resultat += cryp[haref];
            etapes += `${haref} → ${cryp[haref]} | `;
        } else {
            resultat += haref;
            etapes += `${haref} (inchangé) | `;
        }
    }

    document.getElementById('resultat').textContent = 'Message chiffré : ' + resultat;
    document.getElementById('etapes-chiffrement').textContent = 'Étapes de Chiffrement : ' + etapes;
}

function dechiffrer() {
    genererNouvelleCle();
    const mess = document.getElementById('message').value.toLowerCase();
    let resultat = '';
    let etat = '';

    for (let haref of mess) {
        if (decryp.hasOwnProperty(haref)) {
            resultat += decryp[haref];
            etat += `${haref} → ${decryp[haref]} | `;
        } else {
            resultat += haref;
            etat += `${haref} (inchangé) | `;
        }
    }

    document.getElementById('resultat').textContent = 'Message déchiffré : ' + resultat;
    document.getElementById('etape').textContent = 'Étapes de Déchiffrement : ' + etat;
    
    cryptoanalyse();  
}


function cryptoanalyse() {
    genererNouvelleCle()
    let substitutionTableHTML = '';

    for (let haref in decryp) {
        substitutionTableHTML += `<tr><td>${haref}</td><td>${decryp[haref]}</td></tr>`;
    }

    document.getElementById('table').innerHTML = substitutionTableHTML;
}
