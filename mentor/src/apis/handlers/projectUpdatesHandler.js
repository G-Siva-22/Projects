const { ProjectUpdate } = require('../../models');
const { ErrorMessages } = require('../../constants/errorMessages');

// Create a new project update
const createProjectUpdate = async (req, res) => {
    const { projectId } = req.params;
    const { updateDate, content } = req.body;

    try {
        if (!updateDate || !content) {
            return res.status(400).json({ error: ErrorMessages.MISSING_FIELDS });
        }

        const projectUpdate = await ProjectUpdate.create({
            project_id: projectId,
            update_date: updateDate,
            content
        });

        return res.status(201).json({ success: true, projectUpdate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Get all project updates for a project
const getAllProjectUpdates = async (req, res) => {
    const { projectId } = req.params;

    try {
        const projectUpdates = await ProjectUpdate.findAll({
            where: { project_id: projectId }
        });

        if (!projectUpdates) {
            return res.status(404).json({ error: ErrorMessages.PROJECT_UPDATE_NOT_FOUND });
        }

        return res.status(200).json({ success: true, projectUpdates });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Get a specific project update by ID
const getProjectUpdateById = async (req, res) => {
    const { projectUpdateId } = req.params;

    try {
        const projectUpdate = await ProjectUpdate.findByPk(projectUpdateId);
        if (!projectUpdate) {
            return res.status(404).json({ error: ErrorMessages.PROJECT_UPDATE_NOT_FOUND });
        }

        return res.status(200).json({ success: true, projectUpdate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Update a specific project update by ID
const updateProjectUpdate = async (req, res) => {
    const { projectUpdateId } = req.params;
    const { updateDate, content } = req.body;

    try {
        const projectUpdate = await ProjectUpdate.findByPk(projectUpdateId);
        if (!projectUpdate) {
            return res.status(404).json({ error: ErrorMessages.PROJECT_UPDATE_NOT_FOUND });
        }

        if (updateDate) projectUpdate.update_date = updateDate;
        if (content) projectUpdate.content = content;

        await projectUpdate.save();

        return res.status(200).json({ success: true, projectUpdate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

// Delete a specific project update by ID
const deleteProjectUpdate = async (req, res) => {
    const { projectUpdateId } = req.params;

    try {
        const projectUpdate = await ProjectUpdate.findByPk(projectUpdateId);
        if (!projectUpdate) {
            return res.status(404).json({ error: ErrorMessages.PROJECT_UPDATE_NOT_FOUND });
        }

        await projectUpdate.destroy();

        return res.status(200).json({ success: true, message: 'Project update deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
};

module.exports = {
    createProjectUpdate,
    getAllProjectUpdates,
    getProjectUpdateById,
    updateProjectUpdate,
    deleteProjectUpdate
};