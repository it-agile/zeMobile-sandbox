// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile
// Model: Zeit
// ==========================================================================

zeMobile.Zeit = M.Model.create({
    __name__: 'Zeit', // do not delete this property!

 // Sample model properties:

    firstName: M.Model.attr('String',{
        isRequired:YES
    }),

    lastName: M.Model.attr('String', {
        isRequired:YES
    }),

    zip: M.Model.attr('Integer', {
        isRequired:NO,
        validators: [M.NumberValidator]
    })

}, M.DataProviderLocalStorage);