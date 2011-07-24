

$(document).ready ->
#  $("#tabbar").tmpl(active: "neu").appendTo("#neu").page()
#  $("#tabbar").tmpl(active: "uebersicht").appendTo("#uebersicht").page()
  $("#anmeldenForm").submit ->
    $.cookie("benutzer", $("#benutzer").val())
    $.cookie("passwort", $("#passwort").val())
    false

  $("#zeitEditorForm").submit ->
    $.ajax
      url: '/api/zeiten/',
      dataType: 'text',
      username: $.cookie("benutzer"),
      password: $.cookie("passwort",
      dataType: 'json',
    false

