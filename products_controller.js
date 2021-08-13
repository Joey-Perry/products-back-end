const db = (req) => req.app.get('db');

const create = (req, res) => {

    const { name, description, price, image_url } = req.body;
    db(req).create_product([name, description, price, image_url])
        .then(res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.status(500).send(`Uh oh! Something went wrong...${err}`)
        })
};

const getOne = (req, res) => {

    const { id } = req.params;

    db(req).read_product(id)
        .then(product => res.status(200).send(product))
        .catch(err => {
            console.log(err);
            res.status(500).send(`Uh oh! Something went wrong...${err}`)
        })
};

const getAll = (req, res) => {
    db(req).read_products()
        .then(products => res.status(200).send(products))
        .catch(err => {
            console.log(err);
            res.status(500).send(`Uh oh! Something went wrong...${err}`)
        })
};

const update = (req, res) => {

    const { id } = req.params;
    const { desc } = req.query;

    db(req).update_product([id, desc])
    .then(res.sendStatus(200))
    .catch(err => {
            console.log(err);
            res.status(500).send(`Uh oh! Something went wrong...${err}`)
        })
};

const deleteProduct = (req, res) => {

    const { id } = req.params;

    db(req).delete_product(id)
    .then(res.sendStatus(200))
    .catch(err => {
            console.log(err);
            res.status(500).send(`Uh oh! Something went wrong...${err}`)
        })
};

module.exports = {
    create, getOne, getAll, update, deleteProduct
};