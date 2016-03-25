package controllers

import models.Secured
import play.api.mvc.Controller
import play.modules.reactivemongo.MongoController
import views._


/**
 * Created by Norbert on 04.09.2014.
 */
object Exercises extends Controller with MongoController with Secured {

  def exercises = IsAuthenticatedUser { user => implicit request =>
    Ok(html.exercises.exercises(user.nickname))
  }

  def editExercises = IsAuthenticatedUser { user => implicit request =>
    Ok(html.exercises.editExercises(user.nickname))
  }

  def viewExercises = IsAuthenticatedUser { user => implicit request =>
    val nickname = user.nickname
    Ok(html.exercises.viewExercises(nickname))
  }

}
