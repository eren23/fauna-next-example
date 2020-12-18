const faunadb = require("faunadb");

// your secret hash
const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  const formData = req.body.data;
  try {
    const dbs = await client.query(
      q.Create(q.Collection("customers"), {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: {
            street: formData.streetAdress,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
          telephone: formData.phoneNumber,
          creditCard: {
            network: formData.cardType,
            number: formData.cardNumber,
          },
        },
      })
    );
    res.status(200).json(dbs.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
