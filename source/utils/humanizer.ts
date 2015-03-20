module formsjs {

  /**
   * Strings utility.
   */
  export class Humanizer {

    /**
     * Converts text from snake or camel case (e.g. myVariable, my_variable) to a "humanized" case (e.g. My Variable).
     *
     * @param text Snake-case or camel-case string
     * @returns Humanized string (ex. 'My Variable')
     */
    public static humanize(text:string):string {
      if (!text) {
        return '';
      }

      text = text.replace(/[A-Z]/g, function (match) {
        return ' ' + match;
      });

      text = text.replace(/_([a-z])/g, function (match, $1) {
        return ' ' + $1.toUpperCase();
      });

      text = text.replace(/\s+/g, ' ');
      text = text.trim();
      text = text.charAt(0).toUpperCase() + text.slice(1);

      return text;
    }
  }
}