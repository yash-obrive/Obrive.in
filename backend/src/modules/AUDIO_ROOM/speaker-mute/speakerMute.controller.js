const {
  muteUnmuteService,
} = require(
  "./speakerMute.service"
);

const muteUnmuteController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const result =
        await muteUnmuteService(
          {
            ...req.body,
            actorUserId: req.user.id,
          }
        );

      return res
        .status(200)
        .json(result);
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  muteUnmuteController,
};
