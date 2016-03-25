package models


import views.html.helper.FieldConstructor
import views.html._


// Own structure of input fields is at views.html.inputConstructorTemplate
object MyHelpers{
  implicit val myFields = FieldConstructor(inputConstructorTemplate.f)
}