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
  
  void showDialog(DialogCallback dialogCallback) {
    modalifier = new DivElement();
    modalifier.classes.add(Classes.MODALIFIER);
    
    dialogFrame = new DivElement();
    dialogFrame.classes.add(Classes.DIALOG);

    Element textDisplay = new DivElement();
    textDisplay.classes.add(Classes.DIALOG_TEXT);
    textDisplay.text = text;
    dialogFrame.nodes.add(textDisplay);    
    
    dialogFrame.nodes.add(content);
     
    Element buttonBar = new DivElement();
    buttonBar.classes.add(Classes.DIALOG_BUTTON_BAR);
    dialogFrame.nodes.add(buttonBar);
    
    if (cancelButtonText != null) {
      Element cancelButton = new AnchorElement();
      cancelButton.classes.add(Classes.DIALOG_CANCEL_BUTTON);
      cancelButton.text = cancelButtonText;
      cancelButton.on.click.add((Event event) {
        dialogCallback(cancelButtonText);
        event.preventDefault();
      });
      buttonBar.nodes.add(cancelButton);
    }
    
    if (okButtonText != null) {
      Element okButton = new AnchorElement();
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
