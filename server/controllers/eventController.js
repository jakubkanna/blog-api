const asyncHandler = require("express-async-handler");
const Event = require("../config/models/event");

const eventController = {
  get_events: asyncHandler(async (req, res) => {
    const events = await Event.find().sort({ timestamp: -1 }); //{ start_date: -1 }
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "Events not found" });
    }
    res.status(200).json(events);
  }),

  update_event: asyncHandler(async (req, res) => {
    req.body.modified_date = Date.now();

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

    res.status(200).json(updatedEvent);
  }),

  create_event: asyncHandler(async (req, res) => {
    const newEvent = new Event(req.body);
    //errors will be thrown by asyncHandler
    await newEvent.save();
    res.status(201).json({ newEvent, message: "Event created successfully" });
  }),

  delete_event: asyncHandler(async (req, res) => {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  }),
};
module.exports = eventController;
