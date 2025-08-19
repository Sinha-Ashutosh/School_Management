const { response } = require('express');
const { SchoolServices } = require('../services/index');

const schoolServices = new SchoolServices();

const create = async (req, res) => {
    try{
        const school = await schoolServices.createSchool(req.body);
        return res.status(201).json({
            data: school,
            success: true,
            message: 'Successfully created a school',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to create a school',
            err: error
        });
    }
}

const destroy = async (req, res) => {
    try{
        const school = await schoolServices.deleteSchool(req.params.id);
        return res.status(200).json({
            data: school,
            success: true,
            message: 'Successfully deleted a school',
            err: {}
        });   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to delete a school',
            err: error
        });
    }   
}

// GET --> /city/:id
const get = async (req, res) => {
    try{ 
        const school = await schoolServices.getSchool(req.params.id);
        return res.status(200).json({
            data: school,
            success: true,
            message: 'Successfully fetched a school',
            err: {}
        });   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to get a school',
            err: error
        });
    }
}

// Patch --> /city/:id --> req.body
const update = async (req, res) => {
    try{
         const school = await schoolServices.updateSchool(req.params.id, req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched a school',
            err: {}
        });   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update a school',
            err: error
        });
    }
}

const listSchools = async (req, res) => {
    try {
        const { lat, lng } = req.userLocation;
        const radius = req.query.radius ? parseFloat(req.query.radius) : null;

        const schools = await schoolServices.listSchools(lat, lng, radius);

        const formattedSchools = schools.map(schools => ({
        id: schools.id,
        name: schools.name,
        address: schools.address,
        latitude: schools.latitude,
        longitude: schools.longitude,
        distance: `${parseFloat(schools.distance).toFixed(2)} km`,
        }));

        return res.status(200).json({
            data: formattedSchools,
            success: true,
            message: 'Successfully fetched the nearby schools',
            err: {}
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports = {
    create,
    destroy,
    update,
    get,
    listSchools
}