
import controllers.Users._
import org.joda.time.DateTime
import play.api._
import reactivemongo.api.collections.default.BSONCollection
import reactivemongo.bson.{BSONDateTime, BSONDocument}
import play.api.libs.concurrent.Execution.Implicits._

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.util.{Success, Failure}

object Global extends GlobalSettings {

  /*override def onStart(app: Application) {

    val collection: BSONCollection = db.collection[BSONCollection]("users")
    Logger.info("Application has started")

    val query1 = BSONDocument(
      "nickname" -> "leon",
      "email" -> "leon@test.de",
      "password" -> "123456",
      "created" -> BSONDateTime(new DateTime().getMillis)
    )

    val future = collection.insert(query1)
    future.onComplete{
      case Failure(e) => throw e
      case Success(lastError) => {
        println("successfully inserted document with lastError = " + lastError)
      }
    }
  }*/

}
