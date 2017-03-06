// Write yout Javascript code in this files
console.log("salut");
var request = new XMLHttpRequest();  //création d'une variable avec la classe XMLHttpRequest
request.open('GET', 'students.json', true); //récpération des données dans le fichier student.json
request.onreadystatechange = function () { //fonction qui se lancera à chaque changement de ready state
  if (request.readyState == 4) {  //méthode qui s'effectuera a chaque changement dans notre requète
     if(request.status == 200) {//si la requète 200 (tout c'est bien passé)
var students = JSON.parse(request.responseText);  //créer une variable students qui récupérera les les donnée du fihier JSON en format text
     console.log(students);
   } else {
      dump("Erreur pendant le chargement de la page.\n");
    }
  }
};
request.send()
