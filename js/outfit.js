const dialog = document.querySelector('#add-dialog')
const file = document.querySelector('#file')
const preview = document.querySelector('#preview')
const confirm = document.querySelector('#confirm')
const cancel = document.querySelector('#cancel')
const zoomImg = document.getElementById('zoom-img')
const zoomDialog = document.getElementById('zoom-dialog')
const buttonZoom = document.getElementById('zoom-close')
const change = document.getElementById('changePhoto')
const zoomFile = document.getElementById('zoom-file');
const viewDialog = document.getElementById('view-dialog');
const viewContent = document.getElementById('view-content');


let grille = null;
let pendingSrc = null;
let imgOuverte = null;

document.querySelectorAll('.add').forEach((bouton) => {
    bouton.addEventListener('click', () => {
        grille = bouton.closest('.outfit_section').querySelector('.grid');
        dialog.showModal();
    });
});

document.querySelectorAll('.favorite').forEach((bouton) => {
    bouton.addEventListener('click', () => {
        bouton.querySelector('.star').classList.toggle('off');
    });
});

file.addEventListener('change', () => {
    const fichier = file.files[0];
    if (!fichier) return;

    pendingSrc = URL.createObjectURL(fichier);
    preview.src = pendingSrc;
    confirm.disabled = false;
});

dialog.addEventListener('close', () => {
    file.value = '';
    preview.removeAttribute('src');
    pendingSrc = null;
    confirm.disabled = true;
});

confirm.addEventListener('click', () => {
    let ajoute = false;
    [...grille.children].forEach((caseGrille) => {
        if (!ajoute && !caseGrille.querySelector('img')){
            const img = document.createElement('img');
            img.src = pendingSrc;
            img.alt = pendingSrc;
            caseGrille.appendChild(img);
            ajoute = true;
            img.addEventListener('click', () => {
                imgOuverte = img;
                zoomImg.src = img.src;
                zoomDialog.showModal();
            });
        }
    });
    dialog.close();
});

change.addEventListener('click', () => {
    zoomFile.click();
});

zoomFile.addEventListener('change', () => {
    const fichier = zoomFile.files[0];
    if (!fichier) return;

    const nouvelleSrc = URL.createObjectURL(fichier);
    imgOuverte.src = nouvelleSrc;
    zoomImg.src = nouvelleSrc;
    zoomFile.value = '';
});


cancel.addEventListener('click', () => {
    dialog.close();
});

buttonZoom.addEventListener('click', () => {
    zoomDialog.close();
});

document.querySelectorAll('.view').forEach((bouton) => {
    bouton.addEventListener('click', () => {
        const carte = bouton.closest('.card');
        viewContent.innerHTML = '';

        carte.querySelectorAll('.grid img').forEach((img) => {
            const copie = document.createElement('img');
            copie.src = img.src;
            copie.alt = '';
            viewContent.append(copie);
        });

        if (!viewContent.children.length) {
            viewContent.textContent = 'Cette tenue est vide.';
        }
        viewDialog.showModal();
    });
});

document.getElementById('view-close').addEventListener('click', () => {
    viewDialog.close();
});


