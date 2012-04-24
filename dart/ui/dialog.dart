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
    modalifier = new Element.tag('div');
    modalifier.classes.add('modalifier');
    
    dialogFrame = new Element.tag('div');
    dialogFrame.classes.add('dialog');

    Element textDisplay = new Element.tag('div');
    textDisplay.classes.add('dialogText');
    textDisplay.innerHTML = text;
    dialogFrame.nodes.add(textDisplay);    
    
    dialogFrame.nodes.add(content);
     
    Element buttonBar = new Element.tag('div');
    buttonBar.classes.add('dialogButtonBar');
    dialogFrame.nodes.add(buttonBar);
    
    if (cancelButtonText != null) {
      Element cancelButton = new Element.tag('a');
      cancelButton.classes.add('dialogCancelButton');
      cancelButton.innerHTML = cancelButtonText;
      cancelButton.on.click.add((Event event) {
        dialogCallback(cancelButtonText);
        event.preventDefault();
      });
      buttonBar.nodes.add(cancelButton);
    }
    
    if (okButtonText != null) {
      Element okButton = new Element.tag('a');
      okButton.classes.add('dialogOkButton');
      okButton.innerHTML = okButtonText;
      okButton.on.click.add((Event event) {
        dialogCallback(okButtonText);
        event.preventDefault();
      });
      buttonBar.nodes.add(okButton);
    }
    
    modalifier.nodes.add(dialogFrame);
    
    touchMovePreventer = (Event event) => event.preventDefault();
    
    document.on.touchMove.add(touchMovePreventer);
    document.body.classes.add('modalifier-body');
    document.body.nodes.add(modalifier);
  }
  
  void dispose() {
    document.on.touchMove.remove(touchMovePreventer);
    document.body.classes.remove('modalifier-body');
    modalifier.remove();
  }
  
}
