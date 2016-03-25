package models

import controllers.routes
import play.api._
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._

import views._
import models._

/**
 * Created by Norbert on 06.08.2014.
 */
/**********************************
  *** Provide security features. ***
  **********************************/
trait Secured {

  /**
   * Retrieve the connected user email.
   */
  def username(request: RequestHeader) = request.session.get(Security.username)

  /**
   * Redirect to login if the user in not authorized.
   */
  def onUnauthorized(request: RequestHeader) = Results.Redirect(routes.Application.login)


  /**
   * Action for authenticated users.
   */
  def IsAuthenticated(f: => String => Request[AnyContent] => Result) = Security.Authenticated(username, onUnauthorized) { user =>
    Action(request => f(user)(request))
  }

  def IsAuthenticatedUser(f: User => Request[AnyContent] => Result) = IsAuthenticated{ email => implicit request =>
    User.findOneByEmail(email).map { user =>
      f(user)(request)
    }.getOrElse(onUnauthorized(request))
  }

}
