sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";
    //configuration
    const firebaseConfig = { 

        apiKey: "AIzaSyBamTtjMEnZsBh2auAPg_u5-LeAD0JdTCI", 
    
        authDomain: "company-management-86e97.firebaseapp.com", 
    
        projectId: "company-management-86e97", 
    
        storageBucket: "company-management-86e97.appspot.com", 
    
        messagingSenderId: "514886574187", 
    
        appId: "1:514886574187:web:9f3123fe792c337e49112e" 
    
      }; 

      return{
        initializeFirebase: function(){
            firebase.initializeApp(firebaseConfig);
    
            const firestore=firebase.firestore();
            const fireauth=firebase.auth();
    
            const oFirebase={
                firestore: firestore,
                fireauth: fireauth
            };
    
    
            const fbModel=new JSONModel(oFirebase);
            return fbModel;
    
          }
      }

      
    
});