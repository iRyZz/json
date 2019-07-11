<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>MY RECIPES</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="js.js" charset="utf-8"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
      <h1>RecipList</h1>
      <?php
        require_once("main.php");
      ?>
      <div class="recipeList">

      <?php
      $i = 1;
      foreach($json_data as $v){// affiche les nom de recette
      ?>
        <p id="<?= $i?>"><?= $v->title.'<br>' ?> </p>
      <?php
        $i++;
        }
      ?>
      </div>
  <div class="popupRecipe">
  </div>

    <h2 style="text-align:center">Ma liste de course</h2>
    <div class="course">

    </div>
  </body>
</html>
