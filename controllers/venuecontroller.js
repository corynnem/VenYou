const { Router } = require("express");
const { Venue } = require("../models");
const { validateUser } = require('../middlewares');
const { toASCII } = require("punycode");

let venuecontroller = Router();


/**
 * @swagger
 * /venue/new:
 *   post:
 *     summary: Someone with a "manager" token can create a new venue
 *     tags: [Venue]
 *     security: 
 *       - VenueAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venue'
 *     responses:
 *       200:
 *         description: "user registered"
 *       500:
 *         description: 'failed to create item'
 */

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



/**
 * @swagger
 * /venue/all:
 *   get:
 *     summary: Someone with a "manager" token can get a list of all Venues
 *     tags: [Venue]
 *     security: 
 *       - ManagerAuth: []
 *     responses:
 *       200:
 *         description: Will return an array of Venue objects and a success message of 'venue created'
 *       500:
 *          description: "failed to create venue"
 * 
 */ 

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






/**
 * @swagger
 * /venue/mine:
 *   get:
 *     summary: Someone with a "manager" token can get their own venues currently attached to their account
 *     tags: [Venue]
 *     security: 
 *       - ManagerAuth: []
 *     responses:
 *       200:
 *         description: Will return an array of venue objects
 *       500:
 *          description: "failed to get venues"
 * 
 */
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
        message: "failed to get venues",
      });
    }
  });
  



/**
 * @swagger
 * /venue/1:
 *   put:
 *     summary: Someone with an "manager" token can delete teams by id
 *     tags: [Venue]
 *     security: 
 *       - ManagerAuth: []
 *     responses:
 *       200:
 *         description: "updated venue info successfully"
 *       404: 
 *         description: "required fields missing, venue not found, or employer is unauthorized to edit"
 *       500:
 *          description: "failed to edit venue info"
 * 
*/
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




/**
 * @swagger
 * /venue/1:
 *   delete:
 *     summary: Someone with an "manager" token can delete venues by id
 *     tags: [Venue]
 *     security: 
 *       - ManagerAuth: []
 *     responses:
 *       200:
 *         description: "removed venue successfully"
 *       404: 
 *         description: "venue not found, or does not belong to user"
 *       500:
 *          description: "failed to remove venue"
 * 
 */ 

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
