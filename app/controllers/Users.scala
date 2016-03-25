package controllers

import controllers.Settings._
import models._
import org.joda.time.DateTime
import views._
import reactivemongo.bson.BSONObjectID
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.modules.reactivemongo.MongoController

/**
 * The Users controller provides the actions and forms for creating a User.
 * It will be extended for User deleting also.
 */

object Users extends Controller with MongoController with Secured {

  def createUser = Action {
    implicit request => Ok(html.register(createUserForm))
  }

  def createUserForm: Form[User] = Form(
    mapping(
      // Form requires a nickname of at least 2 and max 20 chars
      "nickname" -> text(minLength=2,maxLength=20).verifying("Nickname cannot be empty", nickname => User.verifyNickname(nickname)),
      // Validate the email by play api
      "email" -> email,
      // two fields for the confirmation of the password
      "passwords" -> tuple (
        "password" -> (nonEmptyText(minLength=6,maxLength=50) verifying (passwordPattern)),
        "repeatPassword" -> nonEmptyText(minLength=6,maxLength=50)
      ).verifying(
          "Passwords don't match!", passwords => passwords._1 == passwords._2
        )
    )
    { // Binding: Create a User from the mapping result
      (nickname,email,passwords) => User(BSONObjectID.generate,email,passwords._1,nickname.trim,"","",Some(Address("","")),Some(Setting("All", true, false ,false ,false , false)),Some(DateTime.now),Some(DateTime.now))
    }
    {
      user => Some(user.nickname, user.email, (user.password,""))
    } verifying("The E-Mail is already used!", user => User.register(user) // maybe the nickname should be unique too?
      )
  )

  def submitCreateUser = Action {
    implicit request =>
      createUserForm.bindFromRequest.fold(
        formWithErrors => BadRequest(html.register(formWithErrors)),
        user => Redirect(routes.Application.index).withSession(Security.username -> user.email)
      )
  }

  def submitDeleteAccount = IsAuthenticatedUser {user => implicit request =>
    deleteAccountForm(user.email).bindFromRequest.fold(
      formWithErrors => BadRequest(views.html.account.settings(accountForm(user.email).fill(User.getAccountInfo(user)),
        settingsForm(user.email).fill(Setting.getSettingsInfo(user)),views.html.account.deleteAccount(formWithErrors))),
      user => Redirect(routes.Application.login).withNewSession.flashing(
        "success" -> "Your acoount has been deleted!"
      )
    )
  }

  def changeEmailForm(userEmail: String) = Form(
    tuple(
      "password" -> nonEmptyText.verifying("Password is not correct!",
        result => result match {
          case (password) => User.authenticate(userEmail, password).isDefined
        }
      ),
      "email" -> email.verifying("E-Mail did not change!", result => result match {
        case (email) => userEmail != email
      }
      )
    ) verifying ("E-Mail is already taken!", result => result match {
      case (password, email) => User.changeEmail(userEmail, email)
    }
      )
  )

  def submitChangeEmail = IsAuthenticatedUser {user => implicit request =>
    changeEmailForm(user.email).bindFromRequest.fold(
      formWithErrors => BadRequest(html.account.settings(accountForm(user.email).fill(User.getAccountInfo(user)),
        settingsForm(user.email).fill(Setting.getSettingsInfo(user)),html.account.changeEmail(formWithErrors))),
      user => Redirect(routes.Settings.settings).withSession(Security.username -> user._2)
    )
  }
  def changePasswordForm(userEmail: String) = Form(
    tuple(
      "oldPassword" -> nonEmptyText.verifying("Password is not correct!", result => result match {
        case (oldPassword) => User.authenticate(userEmail, oldPassword).isDefined
      }
      ),
      "passwords" -> tuple (
        "password" -> (nonEmptyText(minLength=6,maxLength=50) verifying (Users.passwordPattern)),
        "repeatPassword" -> nonEmptyText()
      ).verifying(
          "Passwords don't match!", passwords => passwords._1 == passwords._2
        )
    ) verifying ("Password did not change!", result => result match {
      case (oldPassword, passwords) => User.changePassword(userEmail,oldPassword,passwords._1)
    }
      )
  )

  def submitChangePassword = IsAuthenticatedUser {user => implicit request =>
    changePasswordForm(user.email).bindFromRequest.fold(
      formWithErrors => BadRequest(html.account.settings(accountForm(user.email).fill(User.getAccountInfo(user)),settingsForm(user.email).fill(Setting.getSettingsInfo(user)),html.account.changePassword(formWithErrors))),
      user => Redirect(routes.Settings.settings)
    )
  }

  def deleteAccountForm(userEmail: String) = Form(
    single(
      "password" -> nonEmptyText.verifying("Password is not correct!",
        result => result match {
          case (password) => User.deleteAccount(userEmail, password)
        }
      )
    )
  )

  def updateAccount = IsAuthenticatedUser { user => implicit request =>
    val field = request.body.asText.get
    field match {
      case "password" => {Ok(html.account.changePassword(changePasswordForm(user.email)))}
      case "email" => {Ok(html.account.changeEmail(changeEmailForm(user.email)))}
      case "delete" => {Ok(html.account.deleteAccount(deleteAccountForm(user.email)))}
      case _ => {Ok}
    }

  }

  def account = TODO

  def accountForm(userEmail: String) =
    Form(
      tuple(
        "nickname" -> text(minLength=2,maxLength=20).verifying("Nickname cannot be empty", nickname => User.verifyNickname(nickname)) ,
        "firstname" -> text(maxLength=20),
        "lastname" -> text(maxLength=20),
        "city" -> text(maxLength=20),
        "country" -> text(maxLength=20)
      ) verifying ("Nickname can not be empty!", result => result match {
        case (nickname, firstname, lastname, city, country) => User.updateAccount(userEmail, nickname, firstname, lastname, city, country)
      }
        )
    )

  def changeAccount = IsAuthenticatedUser { user => implicit request =>
    accountForm(user.email).bindFromRequest.fold(
      formWithErrors => BadRequest(html.account.settings(formWithErrors,settingsForm(user.email).fill(Setting.getSettingsInfo(user)),views.html.test("dummy"))),
      user => Redirect(routes.Settings.settings)
    )
  }

  // This pattern can be used for checking the password. It can be edited for stronger password check.
  def passwordPattern = pattern("""^([A-Za-z0-9])(?!.*\s)\w{0,255}$""".r, error="There are only letters, numbers and underscores allowed!")
  // This pattern can be used for checking various input fields that requires at least one character. Commented because it maybe is not necessary to disallow characters for regular input fields
  //val inputPattern = pattern("""^([\u00c0-\u01ffA-Za-z0-9'\-])(?!.*\s)\w{0,255}$""".r, error="There are only letters, numbers and underscores allowed!")



}
