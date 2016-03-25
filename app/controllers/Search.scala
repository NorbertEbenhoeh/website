package controllers

import models.Secured
import play.api.mvc.Controller
import play.modules.reactivemongo.MongoController
import views._

/**
 * Created by Norbert on 04.09.2014.
 */
object Search extends Controller with MongoController with Secured {

  def search = IsAuthenticatedUser { user => implicit request =>
    Ok(html.search(user.nickname))
  }

}
