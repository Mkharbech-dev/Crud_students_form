const form = document.querySelector('form');
var prenom = document.querySelector('#firstname') 
var nom = document.querySelector('#lastname') 
var email = document.querySelector('#email') 
var tel = document.querySelector('#tel') 
var container = document.querySelector('.container')
var tbody = document.querySelector('tbody')
var contenu = document.querySelector('.contenu')
var bouton = document.querySelector('.btn')
var id = 1;
let myRegex = /^[a-zA-Z-\s]+$/;
let tousLesEtudiants = [];
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    //Vérification de mon formulaire
    if(document.querySelector('#firstname').value == ""){;
    document.querySelector('#firstname').style.border= '2px solid red '
    document.querySelector('#firstname').focus();
    alert('Entrer un prénom ')
    return false;
    }else if (myRegex.test(document.querySelector('#firstname').value) == false){
    alert('Saisir uniquement des lettres et des espaces dans le nom ')
    document.querySelector('#firstname').style.border= '2px solid red '
    document.querySelector('#firstname').focus();
    return false;       
    }else{
    document.querySelector('#firstname').style.border= '2px solid green '
    }
    if(document.querySelector('#lastname').value == ""){
    document.querySelector('#lastname').style.border= '2px solid red '
    document.querySelector('#lastname').focus();
    alert('Entrer un nom ')
    return false;
    }else if (myRegex.test(document.querySelector('#lastname').value) == false){
        alert('Saisir uniquement des lettres et des espaces dans le prénom ')
        document.querySelector('#lastname').style.border= '2px solid red '
        document.querySelector('#lastname').focus();
        return false;       
    }else{
    document.querySelector('#lastname').style.border= '2px solid green '
    }
    if(document.querySelector('#email').value == ""){
    document.querySelector('#email').style.border= '2px solid red '
    document.querySelector('#email').focus();
    alert('Entrer un email ')
    return false;
    }else{
    document.querySelector('#email').style.border= '2px solid green '
    }
    if(document.querySelector('#tel').value == ""){
    document.querySelector('#tel').style.border= '2px solid red '
    document.querySelector('#tel').focus();
    alert('Entrer un numéro de téléphone ')
    return false;
    }else{
    document.querySelector('#tel').style.border= '2px solid green '
    }
    // Récupérer les valeurs de mes inputs sous format d'un objet
    var user = {
        'id': id++,
        'prenom': prenom.value,
        'nom': nom.value,
        'email': email.value,
        'tel': tel.value,
    };
    // si le formulaire est bien vérifié appeller les fonctions au dessous
    if (true){
        afficherEtudiant(user)
    }
    // Fonction qui affiche les étudiants dans un tableau
    bouton.addEventListener('click', (e)=>{
       if(bouton.value = "Modifier"){
           bouton.value = "Ajouter"
       }
   })
}) 
// définition de la fonction afficherEtudiant pour afficher l'etudiant
function afficherEtudiant(objet){
    var tousEmail = [];
    var tr = document.createElement('tr')
    tr.innerHTML = `<td>${objet.id}</td>
                    <td>${objet.prenom}</td>
                    <td>${objet.nom}</td>
                    <td>${objet.email}</td>
                    <td>${objet.tel}</td>`;
    const croix = document.createElement('img')
    croix.setAttribute('src', './ressources/images.png') 
    croix.setAttribute('class', 'delete')
    const edit = document.createElement('img')
    edit.setAttribute('src', './ressources/edit.png') 
    edit.setAttribute('class', 'edit')
    tr.appendChild(edit)
    tr.appendChild(croix)
    tr.setAttribute('data-key', objet.id);
    email.setAttribute('data-key', objet.id)       
    tbody.appendChild(tr)
    contenu.classList.remove('d-none')
    tousLesEtudiants.push(tr)
    tousEmail.push(objet.email)
    //Rénitialiser mes inputs
    prenom.focus()
    prenom.value=''
    nom.value =''
    email.value =''
    tel.value ='' 
   //suppression d'un etudiant en utilisant la fonction supprimEtudiant
    croix.addEventListener('click', supprimEtudiant)
    function supprimEtudiant(e){
        tousLesEtudiants.forEach(el => {
        if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
            el.remove();
            // supprimer l'eamil dans le tableau
            for(i=0; i<tousEmail.length; i++){
                    tousEmail[i] = ''
                    console.log(tousEmail[i])
            }
            if(tousLesEtudiants.length == 1){
                contenu.classList.add('d-none')
            }
            tousLesEtudiants = tousLesEtudiants.filter(tr => tr.dataset.key !== el.dataset.key);
        }
        })
    }

    edit.addEventListener('click', editEtudiant)
    function editEtudiant(e){
        tousLesEtudiants.forEach(el => {
        if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
            prenom.value = objet.prenom
            nom.value = objet.nom
            email.value = objet.email
            tel.value = objet.tel
            el.remove()
            // supprimer l'eamil dans le tableau
            for(i=0; i<tousEmail.length; i++){
                    tousEmail[i] = ''
                    console.log(tousEmail[i])  
            }
            bouton.value = 'Modifier'
        }
        })
    }
    //Vérification s'il ya deja un email existant
    document.querySelector('.btn').addEventListener('click', ()=>{
        for(i=0 ; i< tousEmail.length; i++){
            if(document.querySelector('#email').value == tousEmail[i]){
                document.querySelector('#email').style.border= '2px solid red ';
                document.querySelector('#email').focus;
                alert('Email déja existant')
                document.querySelector('#email').value = '';
            }      
        }
    })
}  
