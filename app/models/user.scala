package models

import controllers.Users._
import org.joda.time.DateTime
import play.api.libs.json.Json
import models.Address.AddressBSONReader
import reactivemongo.api.collections.default.BSONCollection
import reactivemongo.bson._
import reactivemongo.bson.Producer.nameValue2Producer
import play.modules.reactivemongo.json.BSONFormats._
import play.api.libs.concurrent.Execution.Implicits._
import scala.concurrent.Await
import scala.concurrent.duration._


import scala.util.{Success, Failure}

case class User(
                 id: BSONObjectID = BSONObjectID.generate,
                 email: String,
                 password: String,
                 nickname: String,
                 firstname: String = null,
                 lastname: String = null,
                 address: Option[Address] = Some(Address("","")),
                 settings: Option[Setting] = Some(Setting("All", true, false ,false ,false , false)),
                 created: Option[DateTime] = Some(DateTime.now),
                 updated: Option[DateTime] = Some(DateTime.now))

object User {
  implicit val userFormat = Json.format[User]

  implicit object UserBSONWriter extends BSONDocumentWriter[User] {
    def write(user: User): BSONDocument =
      BSONDocument(
        "_id" -> user.id,
        "email" -> user.email,
        "password" -> user.password,
        "nickname" -> user.nickname,
        "firstname" -> user.firstname,
        "lastname" -> user.lastname,
        "address" -> user.address.getOrElse(new Address("","")),
        "settings" -> user.settings.getOrElse(new Setting("All", true, false ,false ,false , false)),
        "created" -> user.created.map(date => BSONDateTime(date.getMillis)),
        "updated" -> user.updated.map(date => BSONDateTime(date.getMillis))
      )
  }

  implicit object UserBSONReader extends BSONDocumentReader[User] {
    def read(doc: BSONDocument): User =
      User(
        doc.getAs[BSONObjectID]("_id").get,
        doc.getAs[String]("email").get,
        doc.getAs[String]("password").get,
        doc.getAs[String]("nickname").get,
        doc.getAs[String]("firstname").orNull,
        doc.getAs[String]("lastname").orNull,
        doc.getAs[Address]("address"),
        doc.getAs[Setting]("settings"),
        doc.getAs[BSONDateTime]("created").map(date => new DateTime(date.value)),
        doc.getAs[BSONDateTime]("updated").map(date => new DateTime(date.value))
      )
  }

  val collection: BSONCollection = db[BSONCollection]("users")

  def authenticate(email: String, password: String) = {
    val query = BSONDocument(
      "email" -> email,
      "password" -> password
    )
    Await.result(collection.find(query).one[User], 3 seconds)
  }

  def findOneByEmail(email: String) : Option[User] = {
    val query = BSONDocument(
      "email" -> email
    )
    Await.result(collection.find(query).one[User], 3 seconds)
  }

  // Verify that a nickname cannot contain only whitespaces
  def verifyNickname(nickname: String) = {if (nickname.trim.length <= 2) {false} else true}

  // remove this function in time. function "register"
  /*def register2(nickname: String, email: String, password: String) = {
    if (findOneByEmail(email).isDefined) {
      false }
    else {
      val query = BSONDocument(
        "nickname" -> nickname,
        "email" -> email,
        "password" -> password,
        "created" -> BSONDateTime(new DateTime().getMillis)
      )
      val future = collection.insert(query)
      future.onComplete{
        case Failure(e) => throw e
        case Success(lastError) => {
          println("successfully inserted document with lastError = " + lastError)
        }
      }
      true}
  }*/

  def register(user: User) = {
    if (findOneByEmail(user.email).isDefined) {
      false
    }
    else {
      val future = collection.insert(user)
      future.onComplete{
        case Failure(e) => throw e
        case Success(lastError) => {
          println("successfully inserted document with lastError = " + lastError)
        }
      }
      true}
  }

  def changeEmail(oldEmail: String, newEmail: String) = {
    if (findOneByEmail(newEmail).isDefined) {false}
    else {
      val selector = BSONDocument("email" -> oldEmail)
      val modifier = BSONDocument(
        "$set" -> BSONDocument(
          "email" -> newEmail
        )
      )
      collection.update(selector, modifier)
      true}
  }

  def deleteAccount(email: String, password: String) = {
    if (authenticate(email, password).isEmpty) {false}
    else {
      val selector = BSONDocument("email" -> email)
      val futureRemove = collection.remove(selector)
      futureRemove.onComplete{
        case Failure(e) => throw e
        case Success(lastError) => {
          println("successfully remove document")
        }
      }
      true}
  }

  // here a better validation of the Password is necessary. What letters are allowed and what not? A Passwordchecker should be defined
  def changePassword(email: String, oldPassword: String, newPassword: String) = {
    if (oldPassword == newPassword) {false}
    else {
      val selector = BSONDocument("email" -> email)
      val modifier = BSONDocument(
        "$set" -> BSONDocument(
          "password" -> newPassword
        )
      )
      collection.update(selector, modifier)
      true}
  }

  def updateAccount(email: String, nickname: String, firstname: String, lastname: String, city: String, country: String) = {
    val selector = BSONDocument("email" -> email)
    val modifier = BSONDocument(
        "$set" -> BSONDocument(
          "nickname" -> nickname.trim,
          "firstname" -> firstname.trim,
          "lastname" -> lastname.trim,
          "address.city" -> city.trim,
          "address.country" -> country.trim
        )
    )
    collection.update(selector, modifier)
    true
  }

  def getAccountInfo(user: User) = {
    // Checking if the value exists, and if not it returns an empty string. Necessary for filling the Account forms.
    def returnInput(input: String) = {if (input==null){""} else input}

    (user.nickname,returnInput(user.firstname),returnInput(user.lastname),returnInput(user.address.get.city),returnInput(user.address.get.country))
  }
}
