typedef DialogCallback(String pressedButtonText);

class Dialog {
  final String text;
  final Element content;
  final String okButtonText;
  final String cancelButtonText;
  Element dialogFrame;
  Element modalifier;
  Function touchMovePreventer;
  
  Dialog(this.text, [this.content = null, this.okButtonText='OK', this.cancelButtonText='Abbrechen']);
  
  void show(DialogCallback dialogCallback) {
    modalifier = new Element.tag(Tags.DIV);
    modalifier.classes.add(Classes.MODALIFIER);
    
    dialogFrame = new Element.tag(Tags.DIV);
    dialogFrame.classes.add(Classes.DIALOG);

    Element textDisplay = new Element.tag(Tags.DIV);
    textDisplay.classes.add(Classes.DIALOG_TEXT);
    textDisplay.text = text;
    dialogFrame.nodes.add(textDisplay);    
    
    dialogFrame.nodes.add(content);
     
    Element buttonBar = new Element.tag(Tags.DIV);
    buttonBar.classes.add(Classes.DIALOG_BUTTON_BAR);
    dialogFrame.nodes.add(buttonBar);
    
    if (cancelButtonText != null) {
      Element cancelButton = new Element.tag(Tags.A);
      cancelButton.classes.add(Classes.DIALOG_CANCEL_BUTTON);
      cancelButton.text = cancelButtonText;
      cancelButton.on.click.add((Event event) {
        dialogCallback(cancelButtonText);
        event.preventDefault();
      });
      buttonBar.nodes.add(cancelButton);
    }
    
    if (okButtonText != null) {
      Element okButton = new Element.tag(Tags.A);
      okButton.classes.add(Classes.DIALOG_OK_BUTTON);
      okButton.text = okButtonText;
      okButton.on.click.add((Event event) {
        dialogCallback(okButtonText);
        event.preventDefault();
      });
      buttonBar.nodes.add(okButton);
    }
    
    modalifier.nodes.add(dialogFrame);
    
    touchMovePreventer = (Event event) => event.preventDefault();
    
    document.on.touchMove.add(touchMovePreventer);
    document.body.classes.add(Classes.MODALIFIED);
    document.body.nodes.add(modalifier);
  }
  
  void dispose() {
    document.on.touchMove.remove(touchMovePreventer);
    document.body.classes.remove(Classes.MODALIFIED);
    modalifier.remove();
  }
  
}
