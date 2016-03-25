package controllers

import models._
import reactivemongo.bson.BSONDocument
import views._
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.modules.reactivemongo.MongoController

/**
 * Created by Norbert on 15.08.2014.
 */
object Settings extends Controller with MongoController with Secured {

  def settings = IsAuthenticatedUser { user => implicit request =>
    Ok(html.account.settings(Users.accountForm(user.email).fill(User.getAccountInfo(user)),settingsForm(user.email).fill(Setting.getSettingsInfo(user)),html.test("dummy"))) // The account information must be pre-filled with the users information
  }


  def settingsForm(userEmail: String) =
    Form(
      tuple(
        "visibility" -> nonEmptyText,
        "message" -> boolean,
        "feature" -> boolean,
        "exeChange" -> boolean,
        "tpChange" -> boolean,
        "dates" -> boolean
      )
    )

  def changeAccount = IsAuthenticatedUser { user => implicit request =>
    Users.accountForm(user.email).bindFromRequest.fold(
      formWithErrors => BadRequest(html.account.settings(formWithErrors,settingsForm(user.email).fill(Setting.getSettingsInfo(user)),html.test("dummy"))),
      user => Redirect(routes.Settings.settings)
    )
  }

  // Take the delivered string from Ajax POST request and update the settings
  def changeSettings = IsAuthenticatedUser {user => implicit request =>
    val pair = request.body.asText.get.split("&")
    Setting.updateSingleSetting(user.email,pair(0),pair(1))
    Ok("")
  }

}
