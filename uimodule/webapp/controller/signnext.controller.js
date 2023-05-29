sap.ui.define(["com/ww/TaskManager/controller/BaseController", "sap/m/MessageBox"], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("com.ww.TaskManager.controller.signnext", {
            /**

            * Method Name:onPressSign
            *Description:Handler for sign button press, navigates to "RouteMainView" route
            *Author:Sarat
            *Created on:14-05-2023
            **/
        onPressSign: function () {

            this.getOwnerComponent().getRouter().navTo("RouteMainView");
        },

        onInit: function () {
            /**
            * Method Name:onInit
            *Description:Initialization function called when the controller is instantiated
            *Author:Sarat
            *Created on:14-05-2023
            **/
            const oUserModel = this.getOwnerComponent().getModel("userDetails");
            const oDetails = {
                name: "",
                email: "",
                password: "",
                cnfpassword: ""
            };

            oUserModel.setProperty("/SignUpDetails", oDetails);
        },

        onValidateFields: function(){

            const oUserModel = this.getOwnerComponent().getModel("userDetails");// get the model from the manifest.json

            const oDetails = oUserModel.getProperty("/SignUpDetails");
            
            let isValid = true; 


            var t = oDetails.name;//extract name from oDetails
            var n = oDetails.email;//extract email from oDetails
            var pos = n.search(/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/);// regex code of the email
            var pos1 = t.search(/^[A-Z][a-z]+( ?[A-Z][a-z]+)*$/);
            var n22 = oDetails.password;//extract password from oDetails
            var n1 = oDetails.cnfpassword;//extract conform password from oDetails

            var oEmailInput = this.getView().byId("emailInput");
            var oPasswordInput = this.getView().byId("cnfPwdInput");
            var oNameInput = this.getView().byId("nameInput");

            if(t.length < 6 || t=="")
            {
                oNameInput.setValueState("Error");
                isValid = false;

            }
            else{
                oNameInput.setValueState("Success");
                

            }
            if(pos==-1)
            {
                oEmailInput.setValueState("Error");
                isValid = false;
                

            }
            else{
                oEmailInput.setValueState("Success");

            }
            if (n22 == n1 && n22 != "")
            {
                oPasswordInput.setValueState("Success");

            }
            else{
                oPasswordInput.setValueState("Error");
                isValid = false;
            }
            return isValid;
            


        },



        ToSignIn: function () {
            /**
            * Method Name:onInit
            *Description:Handler for sign-in button press, performs user account creation and validation.
            Conditions:
                If  all field are empty or any one of the field is empty it doesnot enter into the database and enters into the if condition
                If condition consists of validations, like name length must be more than 6, email in the correct order eg:xyz@gmail.com, Password and confirm Password mst be same

                If it doesnot satisfies then it goes to else condition
                else condition consists of enters data into the database and validation block.
            *Author:Sarat
            *Created on:14-05-2023
            **/
           var isValid = this.onValidateFields();
           if(!isValid){
            MessageBox.error("please fill all the fields");
            return;
           }
            const oUserModel = this.getOwnerComponent().getModel("userDetails");// get the model from the manifest.json

            const oDetails = oUserModel.getProperty("/SignUpDetails");
            const that = this;
            const user = {
                name: oDetails.name,
                email: oDetails.email
            };



            // Validation logic to create an account for the user
            // var t = oDetails.name;//extract name from oDetails
            // var n = oDetails.email;//extract email from oDetails
            // var pos = n.search(/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/);// regex code of the email
            // var pos1 = t.search(/^[A-Z][a-z]+( ?[A-Z][a-z]+)*$/);
            // var n22 = oDetails.password;//extract password from oDetails
            // var n1 = oDetails.cnfpassword;//extract conform password from oDetails

            // var oEmailInput = this.getView().byId("emailInput");
            // var oPasswordInput = this.getView().byId("cnfPwdInput");
            // var oNameInput = this.getView().byId("nameInput");

            // if ((pos == -1 && n != n1 || pos != -1 && n != n1 || pos == -1 && n == n1 )) {
            //     // Handle validation errors and set value states
            //     if(t.length < 6 || t=="")
            //     {
            //         oNameInput.setValueState("Error");

            //     }
            //     else{
            //         oNameInput.setValueState("Success");

            //     }
               
            //     oEmailInput.setValueState("Error");
            //     oPasswordInput.setValueState("Error");}
            // if((t=="" || n=="" || n1=="" || n22=="") || (t=="" && n=="" && n1=="" && n22=="") || (n22!=n1)){
                
            //     if(t.length < 6 || t=="")
            //     {
            //         oNameInput.setValueState("Error");

            //     }
            //     else{
            //         oNameInput.setValueState("Success");

            //     }
            //     if(pos==-1)
            //     {
            //         oEmailInput.setValueState("Error");

            //     }
            //     else{
            //         oEmailInput.setValueState("Success");

            //     }
            //     if (n22 == n1)
            //     {
            //         oPasswordInput.setValueState("Success");

            //     }
            //     else{
            //         oPasswordInput.setValueState("Error");
            //     }
                

            
            //} 
             
                // Validation passed, set value states to success and proceed with account creation and add 
                
                const oFirebaseModelData = this.getOwnerComponent().getModel("firebase").getData();
                oFirebaseModelData.fireauth.createUserWithEmailAndPassword(oDetails.email, oDetails.password)
                    .then((userCredential) => {
                        // Account created successfully, post user details and show success message
                        that._postToUserDetails(user, userCredential.user.uid);
                        MessageBox.success("User created successfully!");
                    })
                    .catch((error) => {
                        // Error occurred during account creation, show error message
                        MessageBox.error(error.message);
                    });

                // Navigate to "RouteMainView" route
                this.getOwnerComponent().getRouter().navTo("RouteMainView");
            
        },

        _postToUserDetails: function (user, uid) {
            /**

* Method Name:onInit

*Description:Helper function to post user details to

*Author:Sarat

*Created on:14-05-2023

**/


            

            const oFirebaseModelData=this.getOwnerComponent().getModel("firebase").getData();

            oFirebaseModelData.firestore.collection("user_detals").doc(uid).set(user);


        },
       
    });
});
