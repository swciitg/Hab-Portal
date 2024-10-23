const express = require("express");
const router = express.Router({ mergeParams: true });
const linkController = require("../controllers/link.controller");
const { isLoggedIn, isAdmin } = require("../middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/link_pdf");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/",isLoggedIn, isAdmin,  linkController.getAllLinks);
router.get("/add",isLoggedIn, isAdmin, linkController.addLinkForm);
router.post("/", isLoggedIn, isAdmin, linkController.postLink);
router.get("/:link_id", isLoggedIn, isAdmin, linkController.getEditForm);
router.put("/:link_id", isLoggedIn, isAdmin, linkController.editLink);
router.delete("/:link_id", isLoggedIn, isAdmin, linkController.deleteLink);

router.get(
  "/:link_id/sublinks",
  isLoggedIn,
  isAdmin,
  linkController.getAllSublinks
);
router.get(
  "/:link_id/sublinks/add",
  isLoggedIn,
  isAdmin,
  linkController.addSublinkForm
);
router.post(
  "/:link_id/sublinks",
  isLoggedIn,
  isAdmin,
  upload.single("sublink"),
  linkController.postSublink
);
router.get(
  "/:link_id/sublinks/:sublink_id",
  isLoggedIn,
  isAdmin,
  linkController.getSublinkEditForm
);
router.get(
  "/pdf/:link_id/:sublink_id",
  isLoggedIn,
  isAdmin,
  linkController.getSublink
);

router.put(
  "/:link_id/sublinks/:sublink_id",
  isLoggedIn,
  isAdmin,
  upload.single("sublink"),
  linkController.editSublink
);
router.delete(
  "/:link_id/sublinks/:sublink_id",
  isLoggedIn,
  isAdmin,
  linkController.deleteSublink
);

module.exports = router;
