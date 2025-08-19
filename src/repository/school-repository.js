const { Op, literal } = require('sequelize');

const { School } = require('../models/index');

class SchoolRepository {
    async createSchool({ data }) {
        try{
            const school = await School.create({data});
            return school;
        } catch (error){
            console.log("Something went wrong in the repository level");
            throw {error};
        }
    }

    async deleteCity(schoolId){
        try{
            await School.destroy({
                where: {
                    id: schoolId
                }
            });
            return true;
        }catch (error) {
            console.log("Something went wrong in repository level");
            throw{error};
        }
    }

    async updateSchool(schoolId, data) {
        try{
          const school = await School.findByPk(schoolId);
          school.name = data.name;
          await school.save();
            return school;
        }catch (error) {
            console.log("Somethinng went wrong in repository level");
            throw {error};
        }
    }

    async  getSchool(schoolId) {
        try{
            const school = await School.findByPk(schoolId);
            return school;
        }catch (error) {
            console.log("Somethinng went wrong in repository level");
            throw {error};
        }
    }

    async listSchools(lat, lng, radius = null) {
  try {
    const distanceQuery = `
      6371 * ACOS(
        COS(RADIANS(${lat})) * COS(RADIANS(latitude)) *
        COS(RADIANS(longitude) - RADIANS(${lng})) +
        SIN(RADIANS(${lat})) * SIN(RADIANS(latitude))
      )`;

    const schools = await School.findAll({
      attributes: {
        include: [[literal(distanceQuery), "distance"]],
      },
        ...(radius && { having: literal(`distance < ${radius}`) }),
      order: literal("distance ASC"),
      raw: true, 
    });

    return schools;
  } catch (error) {
    console.log("Something went wrong in the repository layer");
    throw error;
  }
};
}

module.exports = SchoolRepository;