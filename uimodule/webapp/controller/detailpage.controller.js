sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function(Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("com.ww.TaskManager.controller.detailpage", {
        onInit: function() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detailpage").attachPatternMatched(this._onRouteMatched, this);
        },
        
        _onRouteMatched: function(oEvent) {
            var jobId = oEvent.getParameter("arguments").docId;
            this._loadJobDetails(jobId);
            console.log(jobId)
        },
        
        _loadJobDetails: function(jobId) {
            var that = this;
            var db = firebase.firestore();
            var jobsRef = db.collection("job_posting_details");
            
            jobsRef.doc(jobId).get().then(function(doc) {
              if (doc.exists) {
                var jobData = doc.data();
                jobData.jobId = doc.id;
                var oModel = new JSONModel(jobData);
                that.getView().setModel(oModel, "jobpreview");
                
              } else {
                MessageBox.error("Job not found.");
              }
            }).catch(function(error) {
              MessageBox.error(error.message);
            });
          }
          
    });
});
