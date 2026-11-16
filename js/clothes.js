const conteneur = document.getElementById('collections');
const boutonNouvelle = document.getElementById('new-collection');


document.querySelectorAll('.image').forEach((img) => {
    img.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', img.id);
        e.dataTransfer.effectAllowed = 'copy';
    });
});


function activerZone(box) {
    const boutonSuppr = document.createElement('button');
    boutonSuppr.type = 'button';
    boutonSuppr.className = 'delete-box';
    boutonSuppr.textContent = '×';
    boutonSuppr.setAttribute('aria-label', 'Supprimer cette collection');

    boutonSuppr.addEventListener('click', () => {
        const contientDesImages = box.querySelector('.in-collection');
        if (contientDesImages && !confirm('Supprimer cette collection et ses photos ?')) {
            return;
        }
        box.remove();
    });

    box.append(boutonSuppr);
    box.addEventListener('dragover', (e) => {
        e.preventDefault();
        box.classList.add('drag-over');
    });

    box.addEventListener('dragleave', (e) => {
        if (!box.contains(e.relatedTarget)) {
            box.classList.remove('drag-over');
        }
    });

    box.addEventListener('drop', (e) => {
        e.preventDefault();
        box.classList.remove('drag-over');

        const original = document.getElementById(e.dataTransfer.getData('text/plain'));
        if (!original) return;

        const copie = original.cloneNode();
        copie.removeAttribute('id');
        copie.removeAttribute('draggable');
        copie.classList.remove('image');
        copie.classList.add('in-collection');
        copie.title = 'Cliquer pour retirer';

        copie.addEventListener('click', () => copie.remove());

        box.append(copie);
    });
}


document.querySelectorAll('.box_drag_n_drop').forEach(activerZone);


boutonNouvelle.addEventListener('click', () => {
    const numero = conteneur.querySelectorAll('.box_drag_n_drop').length + 1;

    const box = document.createElement('div');
    box.className = 'box_drag_n_drop';

    const titre = document.createElement('h4');
    titre.textContent = 'Collection ' + numero;

    box.append(titre);
    activerZone(box);
    conteneur.append(box);
});