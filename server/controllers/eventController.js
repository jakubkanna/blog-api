const asyncHandler = require("express-async-handler");
const Event = require("../config/models/event");

const eventController = {
  get_events: asyncHandler(async (req, res) => {
    const events = await Event.find().sort({ timestamp: -1 });
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "Events not found" });
    }
    res.status(200).json(events);
  }),

  get_event: asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
      .populate("post", "title _id")
      .populate("images");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  }),

  get_images: asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id).populate("images");

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    const images = event.images;
    res.status(200).json([...images]);
  }),

  update_event: asyncHandler(async (req, res) => {
    req.body.modified_date = Date.now();

    if (req.body.post === "") req.body.post = null;

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });

    res.status(200).json(updatedEvent);
    console.log(updatedEvent);
  }),

  create_event: asyncHandler(async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ newEvent, message: "Event created successfully" });
  }),

  delete_event: asyncHandler(async (req, res) => {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event deleted successfully" });
  }),
};
module.exports = eventController;
