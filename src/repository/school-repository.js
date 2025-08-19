const { Op } = require('sequelize');

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
}

module.exports = SchoolRepository;