/**
 * Adaptive Script for GET request
 * @param context
 */
function onLoginRequest(context) {
    executeStep(1, {
        onSuccess: function (context) {
            var user = context.steps[1].subject;
            var email = user.localClaims['http://wso2.org/claims/emailaddress'];
            var organization = user.localClaims['http://wso2.org/claims/organization'];

            httpGet('http://localhost:3000/validate?email=' + email + '&organization=' + organization, {
                onSuccess : function(context, data) {
                    Log.info('--------------- Received mfa_required ' + data.mfa.required);
                    if (data.mfa.required) {
                        executeStep(2);
                    }
                }, onFail : function(context, data) {
                    Log.info('--------------- Failed to call URL');
                }
            });
        }
    });
}

/**
 * Adaptive Script for POST request
 * @param context
 */
function onLoginRequest(context) {
    executeStep(1, {
        onSuccess: function (context) {
            var user = context.steps[1].subject;
            var email = user.localClaims['http://wso2.org/claims/emailaddress'];
            var organization = user.localClaims['http://wso2.org/claims/organization'];

            httpPost('http://localhost:3000/validate', {"email": email, 'organization': organization}, {
                onSuccess : function(context, data) {
                    Log.info('--------------- Received mfa_required ' + data.mfa.required);
                    if (data.mfa.required) {
                        executeStep(2);
                    }
                }, onFail : function(context, data) {
                    Log.info('--------------- Failed to call URL');
                }
            });
        }
    });
}
