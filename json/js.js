$(function() {
  course()// on actualise la liste
  function course(){// actualise et remplie la liste des courses
    $('.course').html("");//vide le contenu de la div course pour pouvoir la remplir avec les nouvelle données
    $.post(//ajax
        'main.php',
        {
            course : "vide"// on envoie la variable vide dans le main.php pour declencher le isset(course)
        },

        function(data){
          if(data){//si la valeur de retour est != de null
              var JSONObject = JSON.parse(data);// on transforme notre string json en objet
              var tab = [];  //pour les doublons
              let doublons = false; //pour les doublons
              for (var i = 0; i < 10; i++) { // check des doublons pour eviter d'afficher plusieurs fois le meme item dans la liste des courses
                for(var x = 0; x < JSONObject[i].ingredients.length; x++){//on parcourt notre tableau de tableau d'ingredients du .json
                  for(var j = 0; j < tab.length; j++){
                    if(tab[j] ==  JSONObject[i].ingredients[x]['name']){//si l'ingredients du json est deja dans le tableau tab alors c'est un doublons et on l'inclus pas dans le tableau tab
                      doublons = true;
                    }
                  }
                  if(!doublons)
                    tab.push(JSONObject[i].ingredients[x]['name']);//si c'est pas un doublons on le push dans le tableau tab

                  doublons = false;
                }
              }
            for (var i = 0; i < tab.length; i++) {//on parcourt le tableau tab et on compare si un ingredients est dans le localStorage
              if(localStorage.getItem(tab[i]) == 1){ // si la valeur(quantité) de l'ingredients est égale a 1
                $('.course').append("<p>"+tab[i]+"<button style=\"margin-left:40px;\" class=\"button\" id=\""+tab[i]+"\">Supprimer</button></p>");
              }
              else if (localStorage.getItem(tab[i]) > 1) { // si la valeur(quantité) de l'ingredients est supérieur a 1
                $('.course').append("<p>"+tab[i]+" x "+ localStorage.getItem(tab[i]) +"<button style=\"margin-left:40px;\" class=\"button\" id=\""+tab[i]+"\">Supprimer</button></p>");
              }
            }
            $('.button').click(function(){//supprime l'element html et localStorage
              localStorage.removeItem($(this).attr('id'));
              course();// on actualise la liste
            });
          }
          else{
            console.log("Failed");//si erreur ajax
          }
        },
      'text'
     );
    }
  let toggle = 0;
  $('p').click(function(){// au clic sur un paragraphe (recette page principale)
    event.stopPropagation();// go google
    $.post(//ajax
          'main.php',
          {
              id : $(this).attr('id')// en envoie comme valeur l'id de l'element donc 1 a 10 car 10 recettes
          },

          function(data){
            if(data){//si la valeur de retour est != de null
                var JSONObject = JSON.parse(data);// string .json en objet
                $('.popupRecipe').append("<h4>"+JSONObject["title"]+"</h4>");//on remplie la popup avec les données retourner du fichier php
                $('.popupRecipe').append("<p id=\"img\">"+JSONObject["image_name"]+"</p>");//on remplie la popup avec les données retourner du fichier php
                $('.popupRecipe').append("<p id=\"instructions\">"+JSONObject["instructions"]+"</p>");//on remplie la popup avec les données retourner du fichier php
                $('.popupRecipe').append("<p id=\"servings\"> Pour "+JSONObject["servings"]+" personnes.</p>");//on remplie la popup avec les données retourner du fichier php
                for (var i = 0; i < JSONObject["ingredients"].length; i++) { // listing des ingredients,quantité,unité de mesure
                  $('.popupRecipe').append("<p id=\""+ i +"\">"+JSONObject["ingredients"][i]['quantity']+"  "+ JSONObject["ingredients"][i]['unit']+ "  " +JSONObject["ingredients"][i]['name']+" </p><p><button style=\"display:block; margin:auto; margin-bottom:20px;\" id=\""+ JSONObject["ingredients"][i]['name']  +"\"  type=\"button\" class=\"btn btn-info\">Ajouter à la liste des courses</button></p>");
                }
                $('.btn-info').click(function(){ // ajouter au panier (localStorage)
                  if(!localStorage.getItem($(this).attr('id'))){//si l'ingredients est pas encore dans le localStorage
                    localStorage.setItem($(this).attr('id'), 1);
                    course();// on actualise la liste
                    //alert("ajouté au panier !");
                  }
                  else if(localStorage.getItem($(this).attr('id')) == 0){//pareil
                    localStorage.setItem($(this).attr('id'), 1);
                    course();// on actualise la liste
                    //alert("ajouté au panier !");
                  }
                  else if(localStorage.getItem($(this).attr('id')) > 0){// si l'ingredients est deja là on incremente la quantité
                      let nb = localStorage.getItem($(this).attr('id'));
                      nb++;
                      localStorage.setItem($(this).attr('id'), nb);
                      course();// on actualise la liste
                      //alert("ajouté au panier !");
                  }

                });
            }
            else{
              console.log("Failed");
            }
          },
        'text'
       );
    toggle = 1;
    $('.popupRecipe').css('display','block');// au clic sur un paragraphe (recettes page principale)
    $('body').css("background","rgba(0, 0, 0, 0.20)");// au clic sur un paragraphe (recettes page principale)
  });

  $('.popupRecipe').click(function(){
    event.stopPropagation();
  })

  $(document).click(function() {// quand la popup est ouverte si on clic en dehors elle ce ferme
      event.stopPropagation();
    if(toggle == 1 ){
      $('.popupRecipe').css("display","none");
      $('.popupRecipe').html("");
      $('body').css("background","rgba(0, 0, 0, 0)");
      toggleTweet = 0;
    }
  });

});
