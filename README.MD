# Using Rest API for Adaptive Authentication

This is the sample REST API to demonstrate how to use adaptive script to cater the REST API in authentication. 

## Run the Sample API

### Prerequisites

Before starting make sure that the node JS installed on the system.

```shell
    npm i && npm start
```

## Configure the adaptive authentication script
- Log in to the management console using _admin/admin_ credentials. 
- Under the **Service Providers** section, click Add.
- Enter a name for the service provider under **Service Provider Name** and click **Register**.
- Expand **Local and Outbound Configuration** and click **Advanced Authentication**.
- Click **Templates** on the right side of the **Script Based Conditional Authentication** field, and add the following script.
  ```javascript
    function onLoginRequest(context) {
        executeStep(1, {
            onSuccess: function (context) {
                var user = context.steps[1].subject;
                var email = user.localClaims['http://wso2.org/claims/emailaddress'];
    
                httpGet('http://localhost:3000/validate?email=' + email, {
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
    ```
- Add two authentication steps.
    - Creating the first authentication step:
        - Click **Add Authentication Step**.
        - Select **basic** under **Local Authenticators** of Step 1 and click **Add Authenticator** (Adding basic authentication as a first step prompts the user to enter user credentials as the first step of authentication when logging in to the application).
    - Creating the second authentication step:
        - Click **Add Authentication Step**.
        - Select [**Demo Hardware Key**](https://is.docs.wso2.com/en/latest/learn/configuring-a-service-provider-for-adaptive-authentication/) under **Local Authenticators** of Step 2 and click **Add Authenticator**.
- Click Update.

## Let's try it out.
- Access the application
- Click **Login** and enter admin/admin credentials.  You are prompted to use the hardware key after basic authentication according to the authentication step defined in the JavaScript above and the response from the api.
- Enter the 4 digit key given on the screen and click **Sign In**.
- Next, log out of the application and login again as a different user.
