import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import {
    categoryControlller,
    createCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController,
  } from "./../controllers/categoryController.js";
  


//router object
const router = express.Router();


//routes

//create || post
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//update || psot
router.post('/update-category', requireSignIn, isAdmin, updateCategoryController);

//getAll || get
router.get('/get-cateogry', categoryControlller );

//single category
router.get('/single-category/:slug' , singleCategoryController);

//delete || delete
router.delete('/delete-category', requireSignIn, isAdmin, deleteCategoryController);




export default router;