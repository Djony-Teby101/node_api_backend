const asyncHandle=require('express-async-handler')
const Goal= require('../models/goalsModel')
// @desc get goals.
// @route GET/api/goals
// @access Private
const getGoals=asyncHandle(async(req,res)=>{
    const goals= await Goal.find()

    res.status(200)
       .json(goals)
})

// @desc set goal.
// @route POST/api/goal
// @access Private

const setGoals= asyncHandle(async(req,res)=>{
    if(!req.body.text){
        res.status(400);
        throw Error('please add a text field')
    }
    const goal=await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal)
})

// @desc update goal.
// @route PUT/api/goal/:id
// @access Private

const updateGoal=asyncHandle(async (req,res)=>{
    const goal= await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updateGoal=await Goal.findByIdAndUpdate(req.params.id, req.body,
    {
        new:true,
    })
    res.status(200).json(updateGoal);
})

// @desc delete goal.
// @route DELETE/api/goal/:id
// @access Private

const deleteGoal= asyncHandle(async(req,res)=>{
    const goal= await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //await goal.remove()
    const deleteGoal=await Goal.findByIdAndDelete(req.params.id, req.body,
        {
        new:true,
        })
    res.status(200).json({id:req.params.id, message: ' delete with success!'});
})

module.exports={
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}