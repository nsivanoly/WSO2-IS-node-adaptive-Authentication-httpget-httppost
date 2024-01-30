// Define the URIs for the claims
var claimFname = 'http://wso2.org/claims/addresses';
var claimLname = 'http://wso2.org/claims/country';

// Define the login request function
var onLoginRequest = function(context) {
    // Execute step 1 of the authentication flow
    executeStep(1, {
        onSuccess: function(context) {
            // Retrieve the known subject and username from the context
            subject = context.currentKnownSubject;
            var username = context.steps[1].subject.username;

            // Prompt the user for additional information using a generic form
            prompt("genericForm", {
                "username": username,
                "inputs": [{"id": "fname", "label": "First Name"}, {"id": "lname", "label": "Last Name"}]
            }, {
                onSuccess: function(context) {
                    // Retrieve the first name and last name from the form submission
                    var fname = context.request.params.fname[0];
                    var lname = context.request.params.lname[0];

                    // Perform an HTTP POST request to validate the user information
                    httpPost('http://localhost:3000/validate', {"fname": fname, 'lname': lname}, {
                        onSuccess : function(context, data) {
                            // Handle the successful response from the validation endpoint
                            Log.info('--------------- Received data from MJ');
                            var jurisdiction = data.jurisdiction;
                            var company_id = data.company_id;

                            // Update the claims in the subject with validated information
                            subject.claims[claimFname] = jurisdiction;
                            subject.claims[claimLname] = company_id;
                        }, onFail : function(context, data) {
                            // Handle the failure to call the validation URL
                            Log.info('--------------- Failed to call URL');
                        }
                    });
                }
            });
        }
    });
};
