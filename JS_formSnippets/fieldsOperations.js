// --- showHideField - change visibitily of a field control
// fieldElement - Jquery-element of field, retrieved by Id
// isVisible - flag of visibility: true - control will be visible; false - control will be hidden
// call of function when you want to show control:
showHideField($('#' + attributeId));
// call of function when you want to hide control:
showHideField($('#new_accountid'), false);
const showHideField = (fieldElement, isVisible = true) => {
    // complete control contains plenty of elements and cotrol itself is not the top
    let fieldControl = $(fieldElement).parents('.control').parent().parent();

    if (isVisible)
        fieldControl.show();
    else
        fieldControl.hide();
}

// --- setLookupField - set lookup value to control automatically
// attributeId - logical name of entity attribute
// lookupValue - object, containing properties of lookup attribute: id, name and entityName as well as lookup value in forms
// call of function:
setLookupField('new_accountid', { id: '52ee31cf-878d-4451-8ee4-fad8d8b75519', name: 'Microsoft', entityName: 'account'});
const setLookupField = (attributeId, lookupValue) => {
    if ($('#' + attributeId).length > 0) {

        $('#' + attributeId).attr('value', lookupValue.id);
        $('#' + attributeId + '_name').attr('value', lookupValue.name);
        $('#' + attributeId + '_entityname').attr('value', lookupValue.entityName);
    }
}