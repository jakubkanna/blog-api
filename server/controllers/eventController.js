const asyncHandler = require("express-async-handler");
const Event = require("../config/models/event");

const eventController = {
  get_events: asyncHandler(async (req, res) => {
    const posts = await Event.find().sort({ start_date: -1 });
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "Events not found" });
    }
    res.status(200).json(posts);
  }),

  update_event: asyncHandler(async (req, res) => {
    req.body.modified = Date.now();

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully" });
  }),
};
module.exports = eventController;
