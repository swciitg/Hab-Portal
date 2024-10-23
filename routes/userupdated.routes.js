const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware");
const userController = require("../controllers/userupdated.controller");
const noticeController = require("../controllers/notice.controller");
const ordinanceController = require("../controllers/ordinance.controller");
const formController = require("../controllers/form.controller");
const linkController = require("../controllers/link.controller");

router.get("/", userController.getHome);
router.get("/notices", userController.getNotices);
router.get("/forms", userController.getForms);
router.get("/hostels", userController.getHostels);
router.get("/functionaries", userController.getFunctionaries);
router.get("/ordinances", userController.getOrdinances);
router.get("/utilities", userController.getLinks);

router.get("/notices/:notice_id", noticeController.getOneNotice);
router.get("/ordinances/:ordinance_id", ordinanceController.getOneOrdinance);
router.get("/forms/:id", formController.getOneForm);
router.get("/hostels/:hostel_name", userController.getOneHostel);
router.get("/hostels/:hostel_name/notice/pdf/:id", userController.getOneNotice);
router.get("/hostels/:hostel_name/form/pdf/:id", userController.getOneForm);
router.get("/links/:link_id/:sublink_id", linkController.getSublink);

module.exports = router;
