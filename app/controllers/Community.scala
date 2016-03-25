package controllers

import models.Secured
import play.api.mvc.Controller
import play.modules.reactivemongo.MongoController
import views._

/**
 * Created by Norbert on 04.09.2014.
 */
object Community extends Controller with MongoController with Secured {

  def community = IsAuthenticatedUser { user => implicit request =>
    Ok(html.community(user.nickname))
  }

}
