module.exports = function (router) {

    const test = require('../controllers/test');
    const controller = require('../controllers/controller');
    const user = require('../libs/util/tokenvalidator')

    router.post("/register", controller.register_user);
    router.post('/testroutes', user.checkHeader, test.testRoute);

    router.post("/login", controller.login);

    // Parcel

    router.post("/add-parcel", user.checkHeader, controller.addParcel);

    router.get("/get-all-parcel", user.checkHeader, controller.getAllParcel);

    router.get("/get-parcel-by-id", user.checkHeader, controller.getByParcelId);

    // Customer Query

    router.post("/add-customer-query", user.checkHeader, controller.addCustomerQuery);

    router.get("/get-all-customer-query", user.checkHeader, controller.getAllCustomerQuery);

    router.get("/get-customer-query-by-id", user.checkHeader, controller.getByQueryId);

}