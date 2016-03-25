package controllers

import javax.inject.{Singleton, Inject}
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import org.slf4j.{LoggerFactory, Logger}
import play.api.mvc._
import views._
import models._


object Application extends Controller with Secured {

  def index = IsAuthenticatedUser { user => implicit request =>
    Ok(html.index(user.email))
  }

  def login = Action {
    implicit request => Ok(html.login(loginForm))
  }

  val loginForm = Form(
    tuple(
      "email" -> text,
      "password" -> text
    ) verifying ("Invalid E-Mail or Password !", result => result match {
      case (email, password) => User.authenticate(email, password).isDefined
    }
      )
  )

  def submitLogin = Action { implicit request =>
    loginForm.bindFromRequest.fold(
      formWithErrors => BadRequest(html.login(formWithErrors)),
      user => Redirect(routes.Application.index).withSession(Security.username -> user._1)
    )
  }

  def logout = Action {
    Redirect(routes.Application.login).withNewSession.flashing(
      "success" -> "You've been logged out"
    )
  }



}
