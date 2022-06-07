async function allHotels(req, res) {
  const hotels = this.mongo.db.collection("hotels");
  const result = await hotels.find({}).toArray();
  res.code(201).send(result);
}

async function getHotel(req, res) {
  const hotels = this.mongo.db.collection("hotels");

  const result = await hotels.findOne({ _id: req.params.id });
  if (!result) {
    res.code(501).send({ message: "Not found" });
  }
  return res.code(201).send(result);

  // res.send({
  //   name: "Hotel Taj Mahal",
  //   location: "Lucknow",
  //   description:
  //     "Mauris arcu lorem, ultrices vitae facilisis et, feugiat ut tortor. Nulla imperdiet mi sed nibh feugiat, ac eleifend nulla volutpat. Duis vel nisl tortor. Ut eros lacus, convallis tristique ligula in, placerat pharetra mi.",
  // });
}

async function addHotel(req, res) {
  const hotels = this.mongo.db.collection("hotels");
  const { name, location, description } = req.body;

  const hotelInfo = { name, location, description };
  const result = await hotels.insertOne(hotelInfo);
  res.code(201).send(result);
}

async function postReview(req, res) {
  const hotels = this.mongo.db.collection("hotels");
  const { username, review } = req.body;

  const hotel = await hotels.findOne({ _id: req.params.id });
  const result = await hotel.updateOne({
    $push: { "name": username, "given-review": review },
  });

  res.code(201).send(result);
}

module.export = { allHotels, getHotel, addHotel, postReview };
