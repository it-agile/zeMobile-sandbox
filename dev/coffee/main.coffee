window.zeMobile =
  benutzer:
    name: -> $.cookie("benutzer")
    passwort: -> $.cookie("passwort")

    istAngemeldet: ->
      @name() != null

    anmelden: (benutzer, passwort) ->
      $.cookie("benutzer", benutzer)
      $.cookie("passwort", passwort)



$.extend $.mobile.datebox.prototype.options,
  "dateFormat": "dd.mm.YYYY"
  "headerFormat": "dd.mm.YYYY"
  "daysOfWeek": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
  "daysOfWeekShort": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
  "monthsOfYear": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
                   "August", "September", "Oktober", "November", "Dezember"]
  "monthsOfYearShort": ["Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul",
                        "Aug", "Sep", "Okt", "Nov", "Dez"]
  "setDateButtonLabel": "Datum übernehmen"
  "setTimeButtonLabel": "Uhrzeit übernehmen"


$(document).ready ->
  $("#anmeldenForm").submit ->
    window.zeMobile.benutzer.anmelden $("#benutzer").val(), $("#passwort").val()
    $.ajax
      url: '/api/projekte/'
      username: window.zeMobile.benutzer.name()
      password: window.zeMobile.benutzer.passwort()
      dataType: 'json'
      success: (data) ->
        window.zeMobile.projekte = data
    false

  $("#zeitEditor").bind "pagebeforeshow", ->
    projektEditor = $("#projektZeitEditor")[0]
    projektEditor.remove(0) while projektEditor.length > 0
    _.each window.zeMobile.projekte, (projekt) ->
      projektEditor.add new Option(projekt.name, projekt.name)
    projektEditor.selectedIndex = 0
    $("#projektZeitEditor").selectmenu("refresh")


  $("#zeitEditorForm").submit ->
    $.ajax
      url: '/api/zeiten/'
      username: window.zeMobile.benutzer.name()
      password: window.zeMobile.benutzer.passwort()
      dataType: 'json'
    false

