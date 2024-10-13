const Link = require("../models/link");
const fs = require("fs");
const { fileURLToPath } = require("url");

exports.getAllLinks = async (req, res) => {
  try {
    const links = await Link.find({}).sort("priority");
    return res.render("links/index", { links });
  } catch (err) {
    console.log(err.message);
  }
};

exports.addLinkForm = async (req, res) => {
  try {
    return res.render("links/add");
  } catch (error) {
    console.log(err.message);
  }
};

exports.postLink = async (req, res) => {
  try {
    const { name, priority_number } = req.body;
    const data = { name, priority_number: Number(priority_number) };
    const newLink = new Link(data);
    const link = await newLink.save();
    if (!link) {
      req.flash("error", "Cannot add link");
      return res.redirect("/hab/admin/links");
    }
    req.flash("success", "Successfully added new link");
    return res.redirect("/hab/admin/links");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const link = await Link.findById(req.params.link_id);
    if (!link) {
      req.flash("error", "Cannot find this link");
      return res.redirect("/hab/admin/links");
    }
    return res.render("links/edit", { link });
  } catch (error) {
    console.log(error.message);
  }
};

exports.editLink = async (req, res) => {
  try {
    const { name, priority_number } = req.body;
    const update = { name, priority_number: Number(priority_number) };
    const link = await Link.findByIdAndUpdate(req.params.link_id, update);
    if (!link) {
      req.flash("error", "Cannot update this link");
      return res.redirect("/hab/admin/links");
    }
    req.flash("success", "Successfully editted link");
    return res.redirect("/hab/admin/links");
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteLink = async (req, res) => {
  try {
    await Link.findByIdAndRemove(req.params.link_id);
    req.flash("success", "Successfully deleted");
    res.redirect("/hab/admin/links");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllSublinks = async (req, res) => {
  try {
    const link_id = req.params.link_id;
    const link = await Link.findById(link_id);
    if (!link) {
      req.flash("error", "Cannot find this link");
      return res.redirect("/hab/admin/links");
    }
    const sublinks = link.sublinks;
    sublinks.sort(compare);
    return res.render("links/sublinks/index", { link, sublinks });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addSublinkForm = async (req, res) => {
  try {
    const link_id = req.params.link_id;
    const link = await Link.findById(link_id);
    if (!link) {
      req.flash("error", "Cannot find this link");
      return res.redirect("/hab/admin/links");
    }
    return res.render("links/sublinks/add", { link });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postSublink = async (req, res) => {
  try {
    const link_id = req.params.link_id;
    const { name, url, priority_number } = req.body;
    const link = await Link.findById(link_id);
    const path = req.file ? req.file.filename : url;
    if (!link) {
      req.flash("error", "Cannot find this link");
      return res.redirect("/hab/admin/links");
    }
    const sublink = { name, url: path, priority_number };
    let newSublink = link.sublinks.create(sublink);
    //console.log(newSublink);
    link.sublinks.push(newSublink);
    const updatedLink = await link.save();

    if (!updatedLink) {
      req.flash("error", "Cannot find this link");
      return res.redirect("/hab/admin/links");
    }

    req.flash("success", "Successfully added new sublink");
    return res.redirect(`/hab/admin/links/${link_id}/sublinks/add`);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getSublinkEditForm = async (req, res) => {
  try {
    const link_id = req.params.link_id;
    const sublink_id = req.params.sublink_id;
    const link = await Link.findById(link_id);

    if (!link) {
      req.flash("error", "Cannot find this link");
      return res.redirect("/hab/admin/links");
    }

    const sublink = link.sublinks.find((sublink) => sublink.id === sublink_id);
    if (!sublink) {
      req.flash("error", "Cannot find this sublink");
      return res.redirect(`/hab/admin/links/${link_id}/sublinks`);
    }
    return res.render("links/sublinks/edit", { link, sublink });
  } catch (error) {
    console.log(error.message);
  }
};

exports.editSublink = async (req, res) => {
  try {
    const link_id = req.params.link_id;
    const sublink_id = req.params.sublink_id;
    const { name, url, priority_number } = req.body;
    const path = req.file ? req.file.filename : url;
    const link = await Link.findById(link_id);

    if (!link) {
      req.flash("error", "Cannot find this link");
      return res.redirect("/hab/admin/links");
    }

    let sublinks = link.sublinks;

    sublinks.forEach((sublink) => {
      if (sublink.id === sublink_id) {
        sublink.name = name;
        sublink.url = path;
        sublink.priority_number = priority_number;
      }
    });
    link.sublinks = sublinks;
    await link.save();
    req.flash("success", "Successfully editted sublink");
    return res.redirect(`/hab/admin/links/${link_id}/sublinks`);
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteSublink = async (req, res) => {
  try {
    const link_id = req.params.link_id;
    const sublink_id = req.params.sublink_id;

    const link = await Link.findById(link_id);
    if (!link) {
      req.flash("error", "Cannot find this link");
      return res.redirect("/hab/admin/links");
    }
    let sublinks = link.sublinks;
    for (var i = 0; i < sublinks.length; i++) {
      if (sublinks[i].id == sublink_id) {
        if (sublinks[i].url.indexOf("https") == -1) {
          fs.unlinkSync(`uploads/link_pdf/${sublinks[i].url}`);
        }
        break;
      }
    }
    sublinks = sublinks.filter((sublink) => sublink.id != sublink_id);
    link.sublinks = sublinks;
    await link.save();
    req.flash("success", "Successfully deleted sublink");
    return res.redirect(`/hab/admin/links/${link_id}/sublinks`);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getSublink = async (req, res) => {
  try {
    const id = req.params.link_id;
    const subid = req.params.sublink_id;
    const link = await Link.findById(id);
    // console.log(link.sublinks);
    var filepath;
    for (var i = 0; i < link.sublinks.length; i++) {
      if (link.sublinks[i]._id == subid) {
        filepath = link.sublinks[i].url;
        break;
      }
    }
    // const sublink = link.sublinks.findById(subid);

    const filePath1 = "uploads/link_pdf/" + filepath;
    // console.log(filePath1);
    fs.readFile(filePath1, (err, data) => {
      res.contentType("application/pdf");
      return res.send(data);
    });
  } catch (error) {
    console.log(error.message);
  }
};
const compare = (a, b) => {
  //console.log(a, b);
  return a.priority_number - b.priority_number;
};
