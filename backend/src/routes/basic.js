export const basicRoutes = (apiRoutes, db) => {
  // base route;
  apiRoutes.get("/", (req, res) => {
    res.json({ message: "This is the API" });
  });

  apiRoutes.get("/details/:vin/", (req, res) => {
    db.incrementCount(req.params.vin).then(({ view_count }) => {
      res.send({ view_count });
    });
  });

  return apiRoutes;
};

export default basicRoutes;
