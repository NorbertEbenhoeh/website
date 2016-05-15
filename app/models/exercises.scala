package models

import org.joda.time.DateTime
import play.api.libs.json.Json
import reactivemongo.bson.{BSONDateTime, BSONDocument, BSONDocumentReader, BSONDocumentWriter, BSONObjectID}
import controllers.Exercises._
import reactivemongo.api.collections.default.BSONCollection
import play.api.libs.concurrent.Execution.Implicits._
import play.modules.reactivemongo.json.BSONFormats._
import reactivemongo.bson.Producer.nameValue2Producer
import reactivemongo.bson._

/**
 * Created by Norbert on 05.09.2014.
 */
case class Exercise (
                       id: BSONObjectID = BSONObjectID.generate,
                       title: String,
                       sportstype: String = null,
                       field: String = null, //
                       content: String = null, // will be another case class
                       description: String = null,
                       difficulty: String = null,	// enum
                       visibility: String = "private", // enum
                       owner: String = "ich bins", 	// the user that created it
                       version: Int = 1,  // everybody can update to the newest version, but don't have to
                       created: Option[DateTime] = Some(DateTime.now),
                       updated: Option[DateTime] = None,
                       deleted: Option[DateTime] = None
                       )

object Exercise {

  implicit val exerciseFormat = Json.format[Exercise]

  implicit object ExercisesBSONWriter extends BSONDocumentWriter[Exercise] {
    def write(exercise: Exercise): BSONDocument =
      BSONDocument(
        "_id" -> exercise.id,
        "title" -> exercise.title,
        "sportstype" -> exercise.sportstype,
        "field" -> exercise.field,
        "content" -> exercise.content,
        "description" -> exercise.description,
        "difficulty" -> exercise.difficulty,
        "visibility" -> exercise.visibility,
        "owner" -> exercise.owner,
        "version" -> exercise.version,
        "created" -> exercise.created.map(date => BSONDateTime(date.getMillis)),
        "updated" -> exercise.updated.map(date => BSONDateTime(date.getMillis)),
        "deleted" -> exercise.updated.map(date => BSONDateTime(date.getMillis))
      )
  }

  implicit object ExercisesBSONReader extends BSONDocumentReader[Exercise] {
    def read(doc: BSONDocument): Exercise =
      Exercise(
        doc.getAs[BSONObjectID]("_id").get,
        doc.getAs[String]("title").get,
        doc.getAs[String]("sportstype").get,
        doc.getAs[String]("field").get,
        doc.getAs[String]("content").get,
        doc.getAs[String]("description").get,
        doc.getAs[String]("difficulty").get,
        doc.getAs[String]("visibility").get,
        doc.getAs[String]("owner").get,
        doc.getAs[Int]("version").get,
        doc.getAs[BSONDateTime]("created").map(date => new DateTime(date.value)),
        doc.getAs[BSONDateTime]("updated").map(date => new DateTime(date.value)),
        doc.getAs[BSONDateTime]("deleted").map(date => new DateTime(date.value))
      )
  }

  val collection: BSONCollection = db[BSONCollection]("exercise")

  def create(title: String) = {

    collection.insert(Exercise(BSONObjectID.generate,title,"","","","","","private","wer auch immer", 1,Some(DateTime.now),None,None))
  }

  def verifyTitle(title: String) = {if (title.trim.length <= 1) {false} else true}

}
