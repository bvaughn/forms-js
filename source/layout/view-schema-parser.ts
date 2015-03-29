module formsjs {

  /**
   *
   */
  export class ViewSchemaParser {

    /**
     * Parses the incoming view schema and returns an ordered collection of field-views.
     *
     * <p>For example the following nested object {@link ViewSchema}:
     *
     * <p><code>{
     *   name: {inputType: "text", label: "Your name"},
     *   address: {
     *     street: {inputType: "text", label: "Address"},
     *     city: {inputType: "text", label: "City"}
     *   }
     * }</code>
     *
     * <p>Would be converted and returned as follows set of {@link FieldView}:
     *
     * <p><code>[
     *   {fieldName: "name", inputType: "text", label: "Your name"},
     *   {fieldName: "address.street", inputType: "text", label: "Address"},
     *   {fieldName: "address.city", inputType: "text", label: "City"}
     * ]</code>
     */
    public static normalize(viewSchema:ViewSchema|Array<FieldView>):Array<FieldView> {
      var fieldViews:Array<FieldView> = [];

      if (Array.isArray(viewSchema)) {
        fieldViews = <Array<FieldView>> viewSchema;
      } else if (typeof viewSchema === 'object') {
        var fieldNames:Array<string> = formsjs.Flatten.flatten(viewSchema);

        for (var index = 0, length = fieldNames.length; index < length; index++) {
          var fieldName:string = fieldNames[index];
          var fieldView:FieldView = Flatten.read(fieldName, viewSchema);

          if (fieldView && fieldView.hasOwnProperty('inputType')) {
            fieldView.fieldName = fieldName;

            fieldViews.push(fieldView);
          }
        }
      }

      return fieldViews;
    }
  }
}