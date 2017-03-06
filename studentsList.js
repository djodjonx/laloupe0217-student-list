// Write yout Javascript code in this files
console.log("salut");
var request = new XMLHttpRequest(); //création d'une variable avec la classe XMLHttpRequest
var table = document.getElementById('students'); //créer un éléments le récupérent par son ID


request.open('GET', 'students.json', true); //récpération des données dans le fichier student.json

request.onreadystatechange = function() { //fonction qui se lancera à chaque changement de ready state
    if (request.readyState == 4) { //méthode qui s'effectuera a chaque changement dans notre requète
        if (request.status == 200) { //si la requète 200 (tout c'est bien passé)
            var students = JSON.parse(request.responseText); //créer une variable students qui récupérera les les donnée du fihier JSON en format text


            students.forEach(function (student) { //recherche en boucle dans chaque élément du tableau et donne un nom à la fonction(student)
              let tr = document.createElement('tr') //créer une variable "tr" et créer un ligne a chaque éléments
              tr.innerHTML = `<td>${student.firstname}</td>
                              <td>${student.lastname}</td>
                              <td>${student.sexe}</td>
                              <td>${student.birthdate}</td>
                              <td>${student.city}</td>
                              <td>${student["postal-code"]}</td>
                              <td>${student.adress}</td>
                              <td><a href="#">${student.github}</a></td>
                              <td>${student.email}</td>`

              table.appendChild(tr)               //créer un tr à chaque nouvel élément
            });

        } else {
            dump("Erreur pendant le chargement de la page.\n");
        }
    }
};



request.send(); //lance la requete
