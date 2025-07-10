const { JoinRequest } = require('../../models');
const { Project } = require('../../models');
const { JoinRequestStatus } = require('../../constants/joinRequestStatus');
const { ErrorMessages } = require('../../constants/errorMessages');

// Request to join a project
const requestJoinProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.user;

  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: ErrorMessages.PROJECT_NOT_FOUND });
    }

    const existingRequest = await JoinRequest.findOne({
      where: { project_id: projectId, user_id: userId }
    });
    if (existingRequest) {
      return res.status(400).json({ error: ErrorMessages.JOIN_REQUEST_ALREADY_EXISTS });
    }

    const joinRequest = await JoinRequest.create({
      project_id: projectId,
      user_id: userId,
      status: JoinRequestStatus.PENDING
    });

    return res.status(201).json({ success: true, joinRequest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

//Approve or deny join request 
const approveJoinRequest = async (req, res) => {
  const {reqId } = req.params;
  const { status } = req.body;

  try {
    const joinRequest = await JoinRequest.findByPk(reqId) ; 
    if (!joinRequest) {
      return res.status(404).json({ error: ErrorMessages.JOIN_REQUEST_NOT_FOUND });
    }
    joinRequest.status = status;
    await joinRequest.save();
    return res.status(200).json({ success: true, joinRequest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });

  }
}

// Approve or deny join request
const handleJoinRequest = async (req, res) => {
  const { joinRequestId } = req.params;
  const { status } = req.body;

  try {
    const joinRequest = await JoinRequest.findByPk(joinRequestId);
    if (!joinRequest) {
      return res.status(404).json({ error: ErrorMessages.JOIN_REQUEST_ALREADY_EXISTS });
    }

    if (![JoinRequestStatus.APPROVED, JoinRequestStatus.REJECTED].includes(status)) {
      return res.status(400).json({ error: ErrorMessages.MISSING_FIELDS });
    }

    joinRequest.status = status;
    await joinRequest.save();

    return res.status(200).json({ success: true, joinRequest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

module.exports = {
  requestJoinProject,
  handleJoinRequest
};
