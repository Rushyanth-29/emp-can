sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
  ], function(Controller, JSONModel, Filter, FilterOperator, MessageBox) {
    "use strict";
  
    return Controller.extend("project1.controller.listOfJobs", {
      onInit: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("listOfJobs").attachPatternMatched(this._onObjectMatched, this);
        this._loadData();
        this.onSearch = this.onSearch.bind(this); // bind 'this' to the controller object
      },
      _loadData: function() {
        var that = this;
        var db = firebase.firestore();
        var jobsRef = db.collection("job_posting_details");
        jobsRef.get().then(function(querySnapshot) {
          var jobs = [];
          querySnapshot.forEach(function(doc) {
            var job = doc.data();
            job.id = doc.id;
            jobs.push(job);
          });
          var oModel = new JSONModel({
            jobs: jobs
          });
          that.getView().setModel(oModel, "jobpost");
        }).catch(function(error) {
          MessageBox.error(error.message);
        });
      },
      onSearch: function(oEvent) {
        var sQuery = oEvent.getParameter("query");
        var oFilter = new Filter("Jobtitle", FilterOperator.Contains, sQuery);
        var oList = this.byId("jobList");
        var oBinding = oList.getBinding("items");
        oBinding.filter([oFilter]);
      },
      nav: function(oEvent) {
        var oItem = oEvent.getSource();
        var oBindingContext = oItem.getBindingContext("jobpost");
        var docId = oBindingContext.getProperty("id");
        this.getOwnerComponent().getRouter().navTo("detailpage", {
          docId: docId
        });
        console.log(docId)
      }
      
    });
  });
  