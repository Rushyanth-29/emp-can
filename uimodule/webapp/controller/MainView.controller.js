sap.ui.define(

        ["com/ww/TaskManager/controller/BaseController","sap/ui/core/mvc/Controller","sap/m/MessageBox"], // Dependency: Importing the BaseController module
    
       
    
        function (BaseController,Controller,MessageBox) { // Factory function with Controller as a parameter
    
            "use strict";
    
           
    
            // Returning a new controller class that extends BaseController
    
            return BaseController.extend("com.ww.TaskManager.controller.MainView", {
    
                onPressSignIn: function(){
    
                    this.getOwnerComponent().getRouter().navTo("signnext");
    
                },
    
                   
    
    
    
    
                onPressSignUp: function() {
    
    
    
    
                    const emailInput = this.getView().byId("emailInput1");
    
                    const passwordInput = this.getView().byId("pwdInput");
    
                    const email = emailInput.getValue();
    
                    const password = passwordInput.getValue();
    
                    const oFirebaseModelData = this.getOwnerComponent().getModel("firebase").getData();
    
                    // Query the Firebase collection to check if the provided email and password exist
    
                    oFirebaseModelData.fireauth.signInWithEmailAndPassword(email, password)
    
      .then((userCredential) => {
    
        MessageBox.success("Login successful!");
    
    
    
    
        var user = userCredential.user;
    
        this.getOwnerComponent().getRouter().navTo("Wizard");
    
        // ...
    
      })
    
      .catch((error) => {
    
        var errorCode = error.code;
    
        var errorMessage = error.message;
    
        MessageBox.error("Invalid email or password");
    
      });
    
                   
    
                       
    
    
    
    
                }
    
    
    
    
               
    
                /**
    
    
    
    
                * Method Name:onPressSignIn
    
                *Description:Method for navigating to the "signnext" route
    
                *Author:Sarat
    
                *Created on:11-05-2023
    
    
    
    
                **/
    
             
    
            });
    
        }
    
    );