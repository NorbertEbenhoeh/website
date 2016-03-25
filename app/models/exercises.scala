package models

import org.joda.time.DateTime
import play.api.libs.json.Json
import reactivemongo.bson.BSONObjectID

/**
 * Created by Norbert on 05.09.2014.
 */
case class Exercises (
                       id: BSONObjectID = BSONObjectID.generate,
                       title: String,
                       sportstype: String,
                       field: String, //
                       content: String, // will be another case class
                       description: String,
                       difficulty: String,	// enum
                       visibility: String, // enum
                       owner: String, 	// the user that created it
                       version: String,  // everybody can update to the newest version, but don't have to
                       added: Option[DateTime] = Some(DateTime.now),
                       updated: Option[DateTime] = None,
                       deleted: Option[DateTime] = None
                       )

object Exercises {

  //TODO
  
}
