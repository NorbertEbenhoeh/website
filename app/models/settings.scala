package models

import controllers.Users._
import play.api.libs.json.Json
import reactivemongo.api.collections.default.BSONCollection
import reactivemongo.bson.{BSONDocumentReader, BSONDocument, BSONDocumentWriter}
import play.modules.reactivemongo.json.BSONFormats._
import play.api.libs.concurrent.Execution.Implicits._

/**
 * Created by Norbert on 01.08.2014.
 */
case class Setting ( visibility: String,
                      message: Boolean,
                      feature: Boolean,
                      exeChange: Boolean,
                      tpChange: Boolean,
                      dates: Boolean)

object Setting {
  implicit val settingsFormat = Json.format[Setting]

  implicit object SettingsBSONWriter extends BSONDocumentWriter[Setting] {
    def write(settings: Setting): BSONDocument =
      BSONDocument(
        "visibility" -> settings.visibility,
        "message" -> settings.message,
        "feature" -> settings.feature,
        "exeChange" -> settings.exeChange,
        "tpChange" -> settings.tpChange,
        "dates" -> settings.dates
      )
  }

  implicit object SettingsBSONReader extends BSONDocumentReader[Setting] {
    def read(doc: BSONDocument): Setting =
      Setting(
        doc.getAs[String]("visibility").get,
        doc.getAs[Boolean]("message").get,
        doc.getAs[Boolean]("feature").get,
        doc.getAs[Boolean]("exeChange").get,
        doc.getAs[Boolean]("tpChange").get,
        doc.getAs[Boolean]("dates").get
      )
  }

  val collection: BSONCollection = db[BSONCollection]("users")

  def getSettingsInfo(user: User) = {
    (user.settings.get.visibility, user.settings.get.message, user.settings.get.feature,
      user.settings.get.exeChange, user.settings.get.tpChange, user.settings.get.dates)
  }

  // updates a single setting by giving the users email, the setting to update and the new value
  def updateSingleSetting(email: String, setting: String, value: String) = {
    if (setting == "visibility_All" || setting == "visibility_Friends" || setting == "visibility_Groups") {
      val lvs = setting.split("_")
      val selector = BSONDocument("email" -> email)
      val modifier = BSONDocument(
        "$set" -> BSONDocument(
          "settings.visibility" -> lvs(1)
        )
      )
      collection.update(selector, modifier)
    }
    else {
      val lvb = value match {
        case "true" => true
        case "false"=> false
      }
      val selector = BSONDocument("email" -> email)
      val modifier = BSONDocument(
        "$set" -> BSONDocument(
          "settings." + setting -> lvb
        )
      )
      collection.update(selector, modifier)
    }
  }
}