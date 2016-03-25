package models

import play.api.libs.json.Json
import reactivemongo.bson._

/**
 * Created by Norbert on 01.08.2014.
 */
case class Address (city: String,
                     country: String)

object Address {
  implicit val addressFormat = Json.format[Address]

  implicit object AddressBSONWriter extends BSONDocumentWriter[Address] {
    def write(address: Address): BSONDocument =
      BSONDocument(
        "city" -> address.city,
        "country" -> address.country
      )
  }

  implicit object AddressBSONReader extends BSONDocumentReader[Address] {
    def read(doc: BSONDocument): Address =
      Address(
        doc.getAs[String]("city").get,
        doc.getAs[String]("country").get
      )
  }
}