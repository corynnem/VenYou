const { Router } = require("express");
const { Venue } = require("../models");
const { validateUser } = require('../middlewares');
const { toASCII } = require("punycode");

let venuecontroller = Router();

venuecontroller.post("/new", async (req, res) => {
  const { name, description, email, phoneNum, location, photo, website } = req.body;

  try {
    let newVenue = await Venue.create({
      name,
      description,
      email,
      phoneNum,
      location,
      photo,
      website,
      managerId: req.user.id
    });

    res.json({
      message: "venue created",
      venue: newVenue,
    });
  } catch {
    res.status(500).json({
      message: "failed to create venue",
    });
  }
});




venuecontroller.get("/all", async (req, res) => {
  try {
    let allVenues = await Venue.findAll();
    res.json({
      venues: allVenues,
    });
  } catch (e) {
    res.status(500).json({
      message: "failed get venues",
    });
  }
});



venuecontroller.get("/mine", async (req, res) => {
    try {
      let allVenues = await Venue.findAll({
          where: {
              managerId: req.user.id
          }
      });
      res.json({
        venues: allVenues,
      });
    } catch (e) {
      res.status(500).json({
        message: "failed get venues",
      });
    }
  });
  



 venuecontroller.put('/:id', async (req, res) => {
  const { name, description, email, phoneNum, location, photo, website } = req.body;
     console.log(req.body)
  try {

    const toUpdate = await Venue.findOne({
      where: {
        id: req.params.id,
        managerId: req.user.id
      },
    });
    console.log(toUpdate)

    if (toUpdate && name) {
      toUpdate.name = name; 
      toUpdate.description = description;
      toUpdate.email = email;
      toUpdate.phoneNum = phoneNum;
      toUpdate.location = location;
      toUpdate.photo = photo;
      toUpdate.website = website;
      
      await toUpdate.save();
      
      res.status(200).json({
        message: "updated venue info successfully",
      });
    } else {
      res.status(404).json({
        message:
          "required fields missing, venue not found, or employer is unauthorized to edit",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "failed to edit venue info",
    });
  }
})



 venuecontroller.delete('/:id', async (req, res) => {
  try {
    const venueToRemove = await Venue.findOne({
      where: {
        id: req.params.id,
      },
    });
    venueToRemove
      ? venueToRemove.destroy()
      : res.status(404).json({
          message: "venue not found, or does not belong to user",
        });
    res.status(200).json({
      message: "removed venue successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "failed to remove venue",
    });
  }
});




module.exports = venuecontroller;
