const router = require("express").Router();
let Supplier = require("../models/Supplier")

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const contact = Number(req.body.contact);
    const products = req.body.products;

    const newSupplier = new Supplier({
        name,
        address,
        contact,
        products
    })
    newSupplier.save().then(() => {
        res.json('supplier added')
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get((req, res) => {
    Supplier.find().then((suppliers) => {
        res.json(suppliers)
    }).catch((err) => {
        console.log(err);
    })
})
router.route("/update/:id").put(async (req, res) => {

    console.log("awa");
    let supplierId = req.params.id;
    const name = req.body.name;
    const address = req.body.address;
    const contact = Number(req.body.contact);
    const products = req.body.products;

    const updateSupplier = {
        name,
        address,
        contact,
        products
    }

    const update = await Supplier.findByIdAndUpdate(supplierId, updateSupplier)
        .then(() => {
            res.status(200).send({ status: "Supplier Updated" });
        }).catch((err => {
            console.log(err);
            res.status(500).send({ status: "Error in Updating", error: err.message })
        }))
})

router.route("/delete/:id").delete(async (req, res) => {
    let supplierId = req.params.id;

    await Supplier.findByIdAndDelete(supplierId)
        .then(() => {
            res.status(200).send({ status: "Supplier Deleted" })
        }).catch((err => {
            console.log(err);
            res.status(500).send({ status: "Error in Deleting", error: err.message })
        }))
})
router.route("/get/:id").get(async (req, res) => {
    let supplierId = req.params.id;
    await Supplier.findById(supplierId)
        .then((supplier) => {
            res.json(supplier)
        }).catch((err => {
            console.log(err);
            res.status(500).send({ status: "Error in Fetching", error: err.message })
        }))
})
router.route("/").get((req, res) => {
    Supplier.find().then((suppliers) => {
        res.json(suppliers)
    }).catch((err) => {
        console.log(err);
    })
})
module.exports = router;