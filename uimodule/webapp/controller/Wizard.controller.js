sap.ui.define(["com/ww/TaskManager/controller/BaseController", 'sap/ui/core/mvc/Controller',
'sap/ui/core/library','sap/ui/model/json/JSONModel',"sap/m/MessageToast","sap/m/MessageBox"], function (Controller, JSONModel, MessageBox) {
    "use strict";


    return Controller.extend("com.ww.TaskManager.controller.wizard", {

        //onInit function used for binding the data to the model/
		onInit: function(){
            const oUserModel = this.getOwnerComponent().getModel("WizardDetails");
        
            //details for the validations//
            const oWDetails = {
                firstname: "",
                lastname: "",
                Email: "",
                PhoneNo: "",
				Address: "",
				profilephoto: "",
				Institution: "",
				Degree: "",
                Major: "",
				Joining: "",
				skills: "",
                profiencylevel: "",
				CompanyNo: "",
                JobTitle: "",
                EmploymentDates: "",
                Responsibilities: "",
                Certificates: "",
                licences: "",
                languagesspokem: ""

        
            }
        
            oUserModel.setProperty("/wizardUp", oWDetails);
        
        
        
        
        },
		

		//function for validating fields//
        onValidateFields: function() {
			const oUserModel = this.getOwnerComponent().getModel("WizardDetails");
			const one = oUserModel.getProperty("/wizardUp");
			var isValid = true;
		  
			var name1 = one.firstname;
			var abc = name1.search(/^[A-Z][a-z]+( ?[A-Z][a-z]+)*$/);
			var name2 = one.lastname;
			var ok = name2.search(/^[A-Z][a-z]+( ?[A-Z][a-z]+)*$/);
			var phone = one.PhoneNo;
			var email = one.Email;
			var address = one.Address;
			var add = address.search(/^[#.0-9a-zA-Z\s,-]+$/);
			var pos = email.search(/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/);
			var inst = one.Institution;
			var maj = one.Major;
			var pl = one.profiencylevel;
			var companyNo = one.CompanyNo;
			var jobtitle = one.JobTitle;
			var responsibilities = one. Responsibilities;

		  
			var oname1 = this.getView().byId("Personname");
			var oname2 = this.getView().byId("Personlastname");
			var oEmail = this.getView().byId("Email");
			var ophone = this.getView().byId("Phone");
			var oaddress = this.getView().byId("address");
			var oinst = this.getView().byId("institution");
			var omaj = this.getView().byId("major");
			var opl = this.getView().byId("profiencylevel");
			var ocompanyNo = this.getView().byId("companyname") ;
			var ojobtitle = this.getView().byId("jobtitle");
			var oresponsibilities = this.getView().byId("responsibility");
		  
			// Logic for validations
			// isvalid = (phone.length >= 10 && phone.length !== "");
			// ophone.setValueState(isvalid ? "Success" : "Error");
		  
			// isvalid = (abc !== -1 && name1 !== "");
			// oname1.setValueState(isvalid ? "Success" : "Error");
		  
			// isvalid = (ok !== -1 && name2 !== "");
			// oname2.setValueState(isvalid ? "Success" : "Error");
		  
			// isvalid = (pos !== -1);
			// oEmail.setValueState(isvalid ? "Success" : "Error");

			// isvalid = (inst !== "");
			// oinst.setValueState(isvalid ? "Success" : "Error");
		  
			// isvalid = (maj !== "");
			// omaj.setValueState(isvalid ? "Success" : "Error");
		  
			// isvalid = (pl !== "");
			// opl.setValueState(isvalid ? "Success" : "Error");

			// isvalid = (companyNo !== "");
			// ocompanyNo.setValueState(isvalid ? "Success" : "Error");
		  
			// isvalid = (jobtitle !== "");
			// ojobtitle.setValueState(isvalid ? "Success" : "Error");
		  
			// isvalid = (responsibilities !== "");
			// oresponsibilities.setValueState(isvalid ? "Success" : "Error");

			

			
		  
			//return isvalid;


            /// logic for validations
			if (phone.length < 10 || phone.length === "") {
				ophone.setValueState("Error");
				isValid = false;
			} else {
				ophone.setValueState("Success");
			}

			if ( abc === -1 || name1 === "") {
				oname1.setValueState("Error");
				isValid = false;
			} else {
				oname1.setValueState("Success");
			}
			if (ok === -1 || name2 === ""){
				oname2.setValueState("Error");
				isValid = false;
			} else {
				oname2.setValueState("Success");
			}

			if (pos === -1) {
				oEmail.setValueState("Error");
				isValid = false;
			} else {
				oEmail.setValueState("Success");
			}

			if (add == -1){
				oaddress.setValueState("Error");
				isValid = false;
			}
			else{
				oaddress.setValueState("Success");
			}
			if (inst === "") {


				oinst.setValueState("Error");
				isValid = false;


			}
			else
			{



				oinst.setValueState("Success");

			}
			
			
			if(maj === ""){
				omaj.setValueState("Error");
				isValid = false;

			}
			else{
				omaj.setValueState("Success")
			}


			if(pl === ""){
				opl.setValueState("Error");
				isValid = false;
			}
			else{
				opl.setValueState("Success");
			}



			if(companyNo === ""){
				ocompanyNo.setValueState("Error");
				isValid = false;

			}
			else{
				ocompanyNo.setValueState("Success");
			}

			if(jobtitle === ""){
				ojobtitle.setValueState("Error");
				isValid = false;

			}
			else{
				ojobtitle.setValueState("Success");
			}

			if(responsibilities === ""){
				oresponsibilities.setValueState("Error");
				isValid = false;

			}
			else{
				oresponsibilities.setValueState("Success");
			}


			return isValid;
		},
		  
		  

         // funtion used for posting the data to the firestore while clicking the finish button//

		onFinish: function() {
			var isValid = this.onValidateFields();
			if (!isValid) {
				sap.m.MessageToast.show("Please fill all the required fields.");
				return;
			}
		
			
		
			const oFirebaseModelData = this.getOwnerComponent().getModel("firebase").getData();
			oFirebaseModelData.firestore.collection("user_details").add(one)
			.then(() => {
				MessageBox.success("Details successfully stored in the database")
			})
			.catch((error) => {
				sap.m.MessageToast.show("Failed to store details in Firebase: ")
			});
		},
		click: function(){
			this.getOwnerComponent().getRouter().navTo("listOfJobs");
		}


		    
				
				
		
		
		
    });
});

