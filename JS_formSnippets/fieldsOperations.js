// --- Form and entity IDs
let formId = $(".entity-form").attr("id");
let entityID = $("#" + formId + "_EntityID").val();
let entityName = $("#" + formId + "_EntityName").val();

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

// --- getActivities - retrieve related Activities - sample data retrieved  //GetActivitiesDataSet.json
// Almost everything about a data retrieving is async, so function does not return something,
// but there is "success" method definition where is 'res' variable should contain dataset
const getActivities = () => {
    const payload = {
        regarding: {
            Id: entityID, // could be an inner param of a function
            LogicalName: entityName, // could be an inner param of a function
            Name: null,
            KeyAttributes: [], // probably it's possible to pass the attributes names and limit the dataset
            RowVersion: null
        },
        orders: [
            {
                Attribute: 'createdon',
                Alias: null,
                Direction: null
            }
        ],
        page: 1,
        pageSize: "25" // here is the limitation of a count items on a page
    };

    const ajaxOptions = {
        url: '/_portal/148f5676-c9cb-4420-84de-a72b780595cb/EntityActivity/GetActivities',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (res) {
            console.log(res); // 'res' is actually a result - //GetActivitiesDataSet.json
        }
    };

    var deferredAjax = $.Deferred();

    shell.getTokenDeferred().done(function (token) { // request will return error without a token 
        $.extend(ajaxOptions, {
            headers: {
                "__RequestVerificationToken": token
            }
        });

        $.ajax(ajaxOptions)
            .done(function (data, textStatus, jqXHR) {
                validateLoginSession(data, textStatus, jqXHR, deferredAjax.resolve);
            })
            .fail(deferredAjax.reject); //ajax
    });
}