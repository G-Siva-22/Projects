// apis/handlers/categoryHandler.js
const { Category } = require('../../models');
const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { sendErrorResponse } = require('../../utils/responseHelper');

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = await Category.create({
      name,
      description,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    });

    res.status(HttpStatusCodeConstants.CREATED).json(newCategory);
  } catch (error) {
    sendErrorResponse(res, error, 'Error creating category', HttpStatusCodeConstants.INTERNAL_SERVER_ERROR);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(HttpStatusCodeConstants.OK).json(categories);
  } catch (error) {
    sendErrorResponse(res, error, 'Error fetching categories', HttpStatusCodeConstants.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { createCategory, getCategories };
