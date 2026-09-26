const { getRoomsService } = require("./getRooms.service");

const getRoomsController = async (_req, res, next) => {
  try {
    const result = await getRoomsService();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoomsController,
};
