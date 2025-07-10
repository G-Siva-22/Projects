const { prrojectTeam } = require('../../models');
const { ErrorMessages } = require('../../constants/errorMessages');

// Create a new project team member
const createProjectTeamMember = async (req, res) => {
    const { projectId } = req.params;
    const { userId, role } = req.body;

    try {
        if (!userId || !role) {
            return res.status(400).json({ error: ErrorMessages.MISSING_FIELDS });
        }

        const projectTeamMember = await prrojectTeam.create({
            project_id: projectId,
            user_id: userId,
            role
        });

        return res.status(201).json({ success: true, projectTeamMember });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Get all project team members for a project
const getAllProjectTeamMembers = async (req, res) => {
    const { projectId } = req.params;

    try {
        const projectTeamMembers = await prrojectTeam.findAll({
            where: { project_id: projectId }
        });

        if (!projectTeamMembers) {
            return res.status(404).json({ error: ErrorMessages.PROJECT_TEAM_MEMBER_NOT_FOUND });
        }

        return res.status(200).json({ success: true, projectTeamMembers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Get a specific project team member by ID
const getProjectTeamMemberById = async (req, res) => {
    const { projectTeamMemberId } = req.params;

    try {
        const projectTeamMember = await prrojectTeam.findByPk(projectTeamMemberId);
        if (!projectTeamMember) {
            return res.status(404).json({ error: ErrorMessages.PROJECT_TEAM_MEMBER_NOT_FOUND });
        }

        return res.status(200).json({ success: true, projectTeamMember });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Update a specific project team member by ID
const updateProjectTeamMember = async (req, res) => {
    const { projectTeamMemberId } = req.params;
    const { userId, role } = req.body;

    try {
        const projectTeamMember = await prrojectTeam.findByPk(projectTeamMemberId);
        if (!projectTeamMember) {
            return res.status(404).json({ error: ErrorMessages.PROJECT_TEAM_MEMBER_NOT_FOUND });
        }

        if (userId) projectTeamMember.user_id = userId;
        if (role) projectTeamMember.role = role;

        await projectTeamMember.save();

        return res.status(200).json({ success: true, projectTeamMember });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Delete a specific project team member by ID
const deleteProjectTeamMember = async (req, res) => {
    const { projectTeamMemberId } = req.params;

    try {
        const projectTeamMember = await prrojectTeam.findByPk(projectTeamMemberId);
        if (!projectTeamMember) {
            return res.status(404).json({ error: ErrorMessages.PROJECT_TEAM_MEMBER_NOT_FOUND });
        }

        await projectTeamMember.destroy();

        return res.status(200).json({ success: true, message: 'Project team member deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

module.exports = {
    createProjectTeamMember,
    getAllProjectTeamMembers,
    getProjectTeamMemberById,
    updateProjectTeamMember,
    deleteProjectTeamMember
};