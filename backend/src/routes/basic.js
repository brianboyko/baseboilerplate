export const basicRoutes = ({ app, apiRoutes }) => {
  // base route;
  apiRoutes.get("/", (req, res) => {
    res.json({ message: "This is the API" });
  });

  return { app, apiRoutes };
};

export default basicRoutes;
