package controllers

import models.Secured
import play.api.mvc.Controller
import play.modules.reactivemongo.MongoController
import views.html

/**
 * Created by Norbert on 04.09.2014.
 */
object Plans extends Controller with MongoController with Secured {

  def plans = IsAuthenticatedUser { user => implicit request =>
    Ok(html.plans.plans(user.nickname))
  }

  def editPlans = IsAuthenticatedUser { user => implicit request =>
    Ok(html.plans.editPlans(user.nickname))
  }

  def viewPlans = IsAuthenticatedUser { user => implicit request =>
    Ok(html.plans.viewPlans(user.nickname))
  }

}
