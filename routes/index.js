const routes = {
  "/": (req = {}, res = {}) => {
    res.render("ui/pages/index/index.js", {
      layout: "ui/layouts/app/index.js",
    });
  },
  "*": (req = {}, res = {}) => {
    res.render("ui/pages/not_found/index.js", {
      layout: "ui/layouts/app/index.js",
    });
  },
};

export default routes;